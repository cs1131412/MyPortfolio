// Site footer shown on every page.

// Computed once when the app loads rather than on every render.
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {currentYear} Colby Smith</p>
    </footer>
  )
}

export default Footer
