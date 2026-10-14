// Shared page frame: header with navigation, the current page's content, and a footer.
// <Outlet /> is where React Router renders the page that matches the URL.
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <div className="site">
      <NavBar />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
