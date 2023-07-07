import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="container-header">
      <div className="header-content">
        <span className="logo">
          <img
            className="logo-img"
            src="./normal Full Logo.png"
            alt="logo"
            style={{ width: "42px" }}
          />
        </span>
        <p className="logo-heading">Huddle App</p>
        <span className="nav-item">
          <Link to="/">Features</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Help Center</Link>
          <Link to="/">Blog</Link>
          <Link to="/">For Business</Link>
          <Link to="/login" className="a login-btn">LogIn</Link>
          <button className="a signup-btn" >Sign Up</button>
        </span>
      </div>
    </div>
  );
};
export default Header;
