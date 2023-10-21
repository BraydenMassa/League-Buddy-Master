import { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default DashboardLayout
