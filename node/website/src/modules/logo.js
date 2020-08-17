const box = {
    position: "relative",
    width: "100%",
    height: "100%"
}

const center = {
    position: "absolute",
    margin: "auto",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0"
}

function Logo() {
  return <div style={box}>
      <img src="next-logo.png" alt="next.js logo" style={center} />
  </div>
}

export default Logo
