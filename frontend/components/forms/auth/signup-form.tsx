"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AuthFormValues } from "./types";
import GoogleButton from "@/components/buttons/GoogleButton";

const initialValues: AuthFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

const SignUpForm = () => {
  const handleSubmit = (values: AuthFormValues) => {
    console.log("Sign up:", values);
  };

  return (
    <div className='w-full max-w-md space-y-6'>
      <h2 className='text-2xl font-semibold text-text-primary'>
        Create account
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

            <button
              type='submit'
              className='w-full bg-primary hover:bg-primary-hover text-background py-2 rounded-lg transition'>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
