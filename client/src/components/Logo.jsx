// Custom site logo: a filled hexagon with the initials "CS", drawn as inline SVG
// so it scales cleanly and needs no image file.
function Logo({ size = 44 }) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="CS logo"
    >
      {/* Pointy-top hexagon centred in the 100x100 viewBox */}
      <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" className="logo-shape" />
      <text x="50" y="52" className="logo-initials" textAnchor="middle" dominantBaseline="middle">
        CS
      </text>
    </svg>
  )
}

export default Logo
