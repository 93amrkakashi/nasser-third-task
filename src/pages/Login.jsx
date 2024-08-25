import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../libs/services/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const schema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email("الايميل غير صالح").required("الايميل مطلوب"),
      password: yup
        .string()
        .min(8, "كلمة السر يجب أن تكون على الأقل 8 حروف")
        .max(32, "كلمة السر لا يمكن أن تتجاوز 32 حرفًا")
        .required("كلمة السر مطلوبة"),
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
        await dispatch(signinUser(data)).unwrap();
        showSuccessToast("تم تسجيل الدخول بنجاح!");
        reset();
        navigate("/");
      } catch (err) {
        showErrorToast("حدث خطأ أثناء تسجيل الدخول");
      }
    },
    [dispatch, reset, navigate]
  );

  return (
    <div className="bg-white p-4 flex flex-col justify-center items-center">
      <Helmet>
        <title>تسجيل الدخول</title>
      </Helmet>
      {loading ? (
        <div>جارٍ التحميل...</div>
      ) : (
        <>
          <h2 className="text-2xl text-center font-bold mb-6">تسجيل الدخول</h2>
          <form
            className="w-[90%] rounded-lg p-2 min-h-[40vh] mt-4 shadow-lg md:w-[60%] mx-auto flex flex-col justify-around items-center"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                {...register("email")}
                type="email"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                {...register("password")}
                type="password"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
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
              {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link to={"/register"} className="text-blue-500 hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
