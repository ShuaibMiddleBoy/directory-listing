import React, {useState} from 'react'
import style from "./navbar.module.css";
import { Link , useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Navbar = ({className}) => {
  const { auth, setAuth } = useAuth();
  const [menuIcon, setMenuIcon] = useState();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.clear();
    navigate('/login');
    toast.success('logout successfully!')
  }

  return (
    <div id='top-menu' className={className}>
    <nav className={menuIcon ? `${style.nav} ${style.active}` : style.nav}>
    <ul className={style.ul}>
    <li><Link to="/">Home</Link></li>
      <li><Link to="/about-us">About Us</Link></li>
      <li><Link to="/showcase">Showcase</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      <li><Link to="/directory">Directory</Link></li>
      <li><Link to="/ubuntu-drive">Ubuntu Drive</Link></li>
      <li><Link to="/contact-us">Contact Us</Link></li>
      {
  !auth.user ? (
    <>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </>
  ) : (
    <>
      <li onClick={toggleDropdown} className={style.dropdownToggle}>
        {auth?.user.firstName}
      </li>
      {isDropdownOpen && (
        <ul className={style.dropdownMenu}>
          <li><Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </>
  )
}

    </ul>
    {/* for responsive  */}
    <div className={style.mobile_nav}>
      <img src="https://bmm2022.com/wp-content/uploads/2023/07/BMM-Logo-2.jpeg" alt="" />
      <div className={style.mobile_navbar_btn}>
      <MenuIcon name='menu-outline' className={`${style.mobile_nav_icon}`} onClick={()=>{setMenuIcon(true)}} />
      <CloseIcon name='close-outline' className={`${style.mobile_nav_icon} ${style.close_outline}`} onClick={()=>{setMenuIcon(false)}}/>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Navbar
