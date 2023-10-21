'use client'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import styles from './RegisterForm.module.css'
import { useRouter } from 'next/navigation'

interface FormValues {
  name: String
  username: String
  password: String
  confirmPassword: String
}

const validationSchema = yup.object({
  name: yup.string().min(1).required('Please enter your name'),
  username: yup.string().min(3).max(17).required('Please enter a username'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter a password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
})

const initialValues: FormValues = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const RegisterForm = () => {
  const router = useRouter()
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        password: values.password,
      }),
    })
    if (result.ok) {
      alert('Account created successfully')
      router.push('/')
    } else {
      alert('Error registering account, please try again')
    }

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
            <h3 className={styles.formHeader}>League Buddy Registration</h3>
            <div className={styles.formInputs}>
              <div className={styles.formInput}>
                <Field
                  className={styles.field}
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Name'
                />
                <div className={styles.error}>
                  <ErrorMessage
                    className={styles.error}
                    name='name'
                    component='span'
                  />
                </div>
              </div>
              <div className={styles.formInput}>
                <Field
                  className={styles.field}
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Username'
                />
                <ErrorMessage name='username' component='span' />
              </div>
              <div className={styles.formInput}>
                <Field
                  className={styles.field}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                />
                <ErrorMessage name='password' component='span' />
              </div>
              <div className={styles.formInput}>
                <Field
                  className={styles.field}
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                />
                <ErrorMessage name='confirmPassword' component='span' />
              </div>
            </div>

            <button
              className={styles.btn}
              type='submit'
              disabled={isSubmitting}
            >
              Register
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
