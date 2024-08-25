import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../libs/services/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";
import { Helmet } from "react-helmet-async";

export default function Signup() {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .min(3, "الاسم يجب أن يكون على الأقل 3 أحرف")
        .max(12, "الاسم لا يمكن أن يتجاوز 12 حرفًا")
        .required("الاسم مطلوب"),
      email: yup
        .string()
        .email("الايميل غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: yup
        .string()
        .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
        .max(32, "كلمة المرور لا يمكن أن تتجاوز 32 حرفًا")
        .required("كلمة المرور مطلوبة"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = useCallback(
    async (data) => {
      try {
        await dispatch(signupUser(data)).unwrap();
        showSuccessToast("تم انشاء الحساب بنجاح!");
        reset();
        navigate("/");
      } catch (err) {
        showErrorToast("حدث خطأ أثناء انشائ الحساب!");
      }
    },
    [dispatch, reset, navigate]
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-white p-4 flex flex-col justify-center items-center">
      <Helmet>
        <title>انشاء حساب جديد</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">إنشاء حساب جديد</h2>
      <form
        className="w-[90%] rounded-lg p-2 min-h-[50vh] mt-4 shadow-lg md:w-[60%] mx-auto flex flex-col justify-around items-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">
            الاسم
          </label>
          <input
            {...register("name")}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">
            كلمة المرور
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-[60%] mx-auto bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        لديك حساب؟{" "}
        <Link to={"/login"} className="text-blue-500 hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
