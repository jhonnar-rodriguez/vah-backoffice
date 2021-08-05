import { Link } from "react-router-dom";

const NotFound = () => {
  return <div>
    <img
      src="https://miro.medium.com/max/1400/1*oTOmPQFJQSOHrYHWnxytgA.png"
      alt="Error"
    />
    <p style={{ textAlign: "center" }}>
      <Link to="/">Ir al inicio </Link>
    </p>
  </div>;
}

export default NotFound;
