import { Link } from "react-router-dom";

const NotFound = () => {
  return <div>
    <img
      src="https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg"
      alt="Error"
    />
    <p style={{ textAlign: "center" }}>
      <Link to="/">Ir al inicio </Link>
    </p>
  </div>;
}

export default NotFound;
