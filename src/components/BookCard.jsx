import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteBook } from "../libs/services/slices/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";

export default function BookCard({ book }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const handleDelete = useCallback(async (id, title) => {
    try {
      const confirmDelete = window.confirm(
        `هل تريد حقًا حذف كتاب  "${title}"؟`
      );
      if (confirmDelete) {
        dispatch(deleteBook(id));
        showSuccessToast("تم حذف الكتاب بنجاح");
      }
    } catch (err) {
      showErrorToast("حدث خطأ أثناء حذف الكتاب");
    }
  }, [dispatch]);

  return (
    <div className="border rounded-lg shadow bg-white text-text">
      <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center">
        <img
          src="https://blogger.googleusercontent.com/img/a/AVvXsEiXcspfAkMVlfFOu2A-VFcXAiU079l_fr2DrS52y-sSHZLtW99ya3_3frAVK1JEWRlGZ87z_8GsdJpXXXPmNUhukvdCjW4BYRQjidpGd47iKyx1d__czmQ9fXBd27kZt6Ht7KYIhiW2rjRQXvu0ib4AUEHc-ktrZUuNKtpUrqJYVUNGj45Sfzw6LQvC"
          width={150}
          height={150}
          alt="book"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">
          {book?.title}
        </h2>
        <div className="w-full px-2 flex justify-between items-center">
          <p className="text-sm text-gray-700">{book?.category}</p>
          <p className="text-sm text-gray-700 mb-1">{book?.author}</p>
        </div>
      </div>
      {user && user.role === "admin" && isAdminPage && (
        <div className="w-full flex justify-around items-center p-2 py-4">
          <Link
            to={`/admin/edit/${book?.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            تعديل
          </Link>
          <button
            onClick={() => handleDelete(book?.id, book?.title)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            حذف
          </button>
        </div>
      )}
    </div>
  );
}
