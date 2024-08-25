import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addBook,
  updateBook,
  fetchBookById,
} from "../libs/services/slices/booksSlice";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";
import { Helmet } from "react-helmet-async";

const AdminBookForm = () => {
  const dispatch = useDispatch();
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup
          .string()
          .min(5, "عنوان الكتاب يجب أن يكون على الأقل 5 أحرف")
          .max(50, "عنوان الكتاب يجب ألا يتجاوز 50 حرفًا")
          .required("عنوان الكتاب مطلوب"),
        author: yup
          .string()
          .min(5, "اسم المؤلف يجب أن يكون على الأقل 5 أحرف")
          .max(50, "اسم المؤلف يجب ألا يتجاوز 50 حرفًا")
          .required("المؤلف مطلوب"),
        category: yup
          .string()
          .min(5, "الفئة يجب أن تكون على الأقل 5 أحرف")
          .max(50, "الفئة يجب ألا تتجاوز 50 حرفًا")
          .required("الفئة مطلوبة"),
        description: yup
          .string()
          .min(6, "الوصف يجب أن يكون على الأقل 6 أحرف")
          .max(500, "الوصف يجب ألا يتجاوز 500 حرفًا")
          .required("الوصف مطلوب"),
      }),
    []
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loadBookData = useCallback(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId)).then((action) => {
        if (action.payload) {
          const { title, author, category, description } = action.payload;
          setValue("title", title);
          setValue("author", author);
          setValue("category", category);
          setValue("description", description);
        }
      });
    }
  }, [bookId, dispatch, setValue]);

  useEffect(() => {
    loadBookData();
  }, [loadBookData]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (bookId) {
          await dispatch(updateBook({ id: bookId, ...data })).unwrap();
          showSuccessToast("تم تحديث الكتاب بنجاح!");
        } else {
          await dispatch(addBook(data)).unwrap();
          showSuccessToast("تم إضافة الكتاب بنجاح!");
        }
        reset();
        navigate("/admin");
      } catch (err) {
        showErrorToast("حدث خطأ أثناء معالجة الطلب");
      }
    },
    [bookId, dispatch, navigate, reset]
  );

  return (
    <div className="bg-white p-4 flex flex-col justify-center items-center">
      <Helmet>
        <title>{bookId ? "تعديل بيانات الكتاب" : "إضافة كتاب جديد"}</title>
      </Helmet>
      <h2 className="text-2xl text-center font-bold mb-6">
        {bookId ? "تعديل بيانات الكتاب" : "اضافة كتاب جديد"}
      </h2>
      <form
        className="w-[90%] md:w-[60%] mx-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            عنوان الكتاب
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="title"
                {...field}
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 mb-2" htmlFor="author">
            المؤلف
          </label>
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="author"
                {...field}
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  errors.author ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            الفئة
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="category"
                {...field}
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  errors.category ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            الوصف
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                id="description"
                {...field}
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  errors.description ? "border-red-500" : ""
                }`}
              ></textarea>
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className={`w-[40%] mx-auto p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
          >
            {bookId ? "تعديل الكتاب" : "إضافة الكتاب"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookForm;
