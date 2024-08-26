import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/users";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};


// Signin Thunk
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        return user;
      } else {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Signup Thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const checkEmailResponse = await axios.post(`${API_URL}/check-email`, {
        email: userData.email,
      });

      if (checkEmailResponse.data.exists) {
        return rejectWithValue("هذا الايميل مستخدم بالفعل!.");
      }

      const response = await axios.post(API_URL, userData);
      const user = response.data;
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); 
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
