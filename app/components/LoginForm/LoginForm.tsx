'use client'
import styles from './LoginForm.module.css'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

interface FormValues {
  username: String
  password: String
}

const validationSchema = yup.object({
  username: yup.string().min(3).max(17).required('Please enter a username'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter a password'),
})

const initialValues: FormValues = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    signIn('cred', {
      username: values.username,
      password: values.password,
      callbackUrl: '/dashboard',
      redirect: false,
    })
    setSubmitting(false)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.form}>
            <h3 className={styles.formHeader}>League Buddy</h3>
            <div className={styles.formInputs}>
              <div className={styles.formInput}>
                <Field
                  className={styles.formField}
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Username'
                />
                <div className={styles.error}>
                  <ErrorMessage
                    className={styles.error}
                    name='username'
                    component='span'
                  />
                </div>
              </div>

              <div className={styles.formInput}>
                <Field
                  className={styles.formField}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                />
                <div className={styles.error}>
                  <ErrorMessage name='password' component='span' />
                </div>
              </div>
            </div>

            <button
              className={styles.btn}
              type='submit'
              disabled={isSubmitting}
            >
              Login
            </button>
            <div className={styles.formRegisterLink}>
              <Link href='/register'>New to League Buddy? Register here</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
