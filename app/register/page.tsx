import RegisterForm from './RegisterForm/RegisterForm'
import RegisterPageImage from '../../public/RegisterPageImage.jpg'
import BackgroundImg from '../components/BackgroundImg'

const RegisterPage = () => {
  return (
    <main>
      <BackgroundImg
        alt='register page background image'
        source={RegisterPageImage}
      />
      <RegisterForm />
    </main>
  )
}

export default RegisterPage
