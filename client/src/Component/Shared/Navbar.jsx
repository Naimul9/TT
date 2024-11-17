import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src="/Bookish-Haven.png" alt="" />
          <span className="font-extrabold uppercase">TechTrove</span>
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-medium ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>

          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
