import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteBook } from "../libs/services/slices/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BookCard({ book }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const handleDelete = useCallback(
    async (id, title) => {
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
    },
    [dispatch]
  );

  return (
    <div className="border rounded-lg shadow-lg bg-white text-text overflow-hidden">
      <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4umHruI-I3_cA2IP6RhJGSg9JZfW6J8dVw&s"
          alt="book"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-2 pt-4">
        <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">
          {book?.title}
        </h2>
        <div className="w-full px-2 flex justify-between items-center">
          <p className="text-base text-gray-700">{book?.category}</p>
          <p className="text-base text-gray-700 mb-1">{book?.author}</p>
        </div>
      </div>
      {user && user.role === "admin" && isAdminPage && (
        <div className="w-full flex justify-around items-center p-1 py-4">
          <Link
            to={`/admin/edit/${book?.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
          >
          تعديل {" "} <FaEdit className="mr-2" /> 
          </Link>
          <button
            onClick={() => handleDelete(book?.id, book?.title)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
          >
          حذف {" "} <FaTrash className="mr-2" /> 
          </button>
        </div>
      )}
    </div>
  );
}
