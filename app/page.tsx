import LoginForm from './components/LoginForm/LoginForm'
import BackgroundImg from './components/BackgroundImg'
import LucianBackgroundImg from '../public/LucianWelcomeImage.jpg'

export default function Home() {
  return (
    <main>
      <BackgroundImg alt='Lucian' source={LucianBackgroundImg} />
      <LoginForm />
    </main>
  )
}
