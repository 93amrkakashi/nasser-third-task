import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await axios.post(API_URL, book, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  const response = await axios.put(`${API_URL}/${book.id}`, book, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const filterBooks = createAsyncThunk(
  "books/filterBooks",
  async ({ filterKey, filterValue }) => {
    const response = await axios.get(`${API_URL}?${filterKey}=${filterValue}`);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Books
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add Book
    builder.addCase(addBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update Book
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete Book
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch Book By Id
    builder.addCase(fetchBookById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      } else {
        state.books.push(action.payload);
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Filter Books
    builder.addCase(filterBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(filterBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default booksSlice.reducer;
