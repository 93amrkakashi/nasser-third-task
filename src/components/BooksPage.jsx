import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import BookCard from "./BookCard";
import { fetchBooks } from "../libs/services/slices/booksSlice";

export default function BooksPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const loading = useSelector((state) => state.books.loading);

  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {}, [books]);

  return (
    <div className="w-full p-4">
      <FilterComponent />
      {loading ? (
        <div className="text-center">يتم تحميل الكتب...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      {isAdminPage && (
        <Link
          to={"/admin/new"}
          className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-lg p-2 px-4"
        >
          اضافة كتاب
        </Link>
      )}
    </div>
  );
}
