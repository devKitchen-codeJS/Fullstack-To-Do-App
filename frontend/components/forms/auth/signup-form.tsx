"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GoogleButton from "@/components/buttons/GoogleButton";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const SignUpForm = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router = useRouter();
  const redirectToSignIn = () => {
    router.push("/signin");
  };
  const handleSubmit = async (values: typeof initialValues) => {
    const { confirmPassword, ...rest } = values;
    try {
      await axiosInstance.post("/auth/register", rest);
      toast.success("Sign up successful! Please sign in.");
      router.push("/signin");
    } catch (error) {
      const err = error as AxiosError<{ message: string | string[] }>;
      const message = err.response?.data?.message;
      toast.error(Array.isArray(message) ? message.join("\n") : message);
    }
  };

  return (
    <div className='w-full max-w-md space-y-6'>
      <h2 className='text-2xl font-semibold text-text-primary text-center'>
        Welcome aboard!
      </h2>

      <GoogleButton onClick={() => console.log("Google sign up")} />

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

            <div>
              <Field
                name='confirmPassword'
                type='password'
                placeholder='Repeat password'
                className='w-full px-4 py-2 rounded-lg bg-surface border border-border text-text-primary outline-none focus:ring-2 focus:ring-primary'
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className='text-sm text-danger mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-white hover:bg-primary-hover text-background py-2 rounded-lg transition'>
              Sign up
            </button>

            <p
              className='text-center cursor-pointer'
              onClick={redirectToSignIn}>
              Go to Sign in
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
