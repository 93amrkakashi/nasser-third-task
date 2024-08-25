import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBooks, fetchBooks } from "../libs/services/slices/booksSlice";

function FilterComponent() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const loading = useSelector((state) => state.books.loading);

  const [filterType, setFilterType] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const authors = useMemo(
    () => [...new Set(books.map((book) => book.author))],
    [books]
  );
  const categories = useMemo(
    () => [...new Set(books.map((book) => book.category))],
    [books]
  );

  const handleFilterTypeChange = useCallback((e) => {
    setFilterType(e.target.value);
    setSelectedValue("");
  }, []);

  const handleValueChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSelectedValue(value);
      dispatch(filterBooks({ filterKey: filterType, filterValue: value }));
    },
    [filterType, dispatch]
  );

  const handleReset = useCallback(() => {
    setFilterType("");
    setSelectedValue("");
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="mb-4 flex flex-col md:flex-row justify-start items-center gap-1 md:gap-4">
      <div className="w-full px-4 md:px-1 mb-2 md:w-[40%]">
        <label className="mr-2">اختر نوع الفلتر : </label>
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="px-1 md:px-4 border rounded bg-white w-[60%]"
        >
          <option value="">اختر نوع الفلتر</option>
          <option value="author">المؤلف</option>
          <option value="category">الفئة</option>
        </select>
      </div>

      <div className="w-full px-4 md:px-1 mb-2 md:w-[40%]">
        <label className="mr-2">
          {filterType === "author" ? "اختر المؤلف : " : "اختر الفئة : "}
        </label>
        <select
          value={selectedValue}
          onChange={handleValueChange}
          className={`px-1 md:px-4 border rounded w-[60%] ${
            !filterType ? "bg-gray-300" : "bg-white"
          }  `}
          disabled={!filterType || loading}
        >
          <option value="">
            اختر {filterType === "author" ? "المؤلف" : "الفئة"}
          </option>
          {filterType === "author" &&
            authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          {filterType === "category" &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={handleReset}
        className="p-2 bg-blue-700 text-white rounded"
        disabled={loading}
      >
        إلغاء الفلترة
      </button>
    </div>
  );
}

export default React.memo(FilterComponent);
