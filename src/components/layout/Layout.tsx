import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import Footer from "../navbar/Footer"
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  )
}

export default Layout
