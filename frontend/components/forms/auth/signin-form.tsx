"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import GoogleButton from "@/components/buttons/GoogleButton";
import { AuthFormValues } from "./types";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { saveToken, saveUserData } from "@/utils/tokenUtils";
import { AxiosError } from "axios";
import { toast } from "sonner";

const initialValues: AuthFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

const SignInForm = () => {
  const router = useRouter();

  const redirectToSignUp = () => {
    router.push("/signup");
  };
  const handleSubmit = async (values: AuthFormValues) => {
    try {
      const res = await axiosInstance.post("/auth/login", values);
      const { user, accessToken, refreshToken } = res.data;
      saveUserData(user);
      saveToken({ access_token: accessToken, refresh_token: refreshToken });
      if (res.status === 201) router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string | string[] }>;
      const message = err.response?.data?.message;
      toast.error(Array.isArray(message) ? message.join("\n") : message);
    }
  };

  return (
    <div className='w-full max-w-md space-y-6'>
      <h2 className='text-2xl font-semibold  text-center'>Welcome back!</h2>

      <GoogleButton onClick={() => console.log("Google sign in")} />

      <div className='flex items-center gap-3 text-sm text-text-muted'>
        <div className='flex-1 h-px bg-border' />
        or
        <div className='flex-1 h-px bg-border' />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className='space-y-4'>
            <div>
              <Field
                name='email'
                type='email'
                placeholder='Email'
                className='w-full px-4 py-2 rounded-lg bg-surface border border-border text-text-primary outline-none focus:ring-2 focus:ring-primary'
              />
              {errors.email && touched.email && (
                <p className='text-sm text-danger mt-1'>{errors.email}</p>
              )}
            </div>

            <div>
              <Field
                name='password'
                type='password'
                placeholder='Password'
                className='w-full px-4 py-2 rounded-lg bg-surface border border-border text-text-primary outline-none focus:ring-2 focus:ring-primary'
              />
              {errors.password && touched.password && (
                <p className='text-sm text-danger mt-1'>{errors.password}</p>
              )}
            </div>

            <button
              type='submit'
              className='w-full bg-white hover:bg-white-hover text-background py-2 rounded-lg transition'>
              Sign in
            </button>

            <p
              className='text-center cursor-pointer'
              onClick={redirectToSignUp}>
              Go to Sign up
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
