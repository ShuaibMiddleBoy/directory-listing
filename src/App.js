import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home_page/Home";
import Directory from "./directory_Page/Directory";
import About from "./about_us_page/About";
import Showcase from "./showcase_page/Showcase";
import Gallery from "./gallery_page/Gallery";
import Media from "./media_page/Media";
import Shop from "./shop_page/Shop";
import Marketing from "./marketing_oppurtunity_page/Marketing";
import Ubuntu from "./ubuntu_drive_page/Ubuntu";
import Contact from "./contact_us_page/Contact";
import SignleProduect from "./singleProduct_page/SignleProduect";
import Cart from "./cart_page/Cart";
import Error from "./error_page/Error";
import Register from "./register_page/Register";
import { Toaster } from 'react-hot-toast';
import Login from "./login_page/Login";
import Dashboard from "./User/Dashborad/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPassword from "./forgot_password_page/ForgotPassword";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import CreateCategory from "./Admin/CreateCategory";
import CreateListing from "./Admin/CreateListing";
import Users from "./Admin/Users";
import Profile from "./User/Dashborad/Profile";
import Lists from "./User/Dashborad/Lists";
import UpdateListing from "./Admin/UpdateListing";
import DirectoryListing from './directory_Page/DirectoryListing';
import TitleListing from './directory_Page/TitleListing'; // Import the new component

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home title='Home' />} />
        <Route path="/directory" element={<Directory />} />
        {/* Route for displaying listings for a specific category */}
        <Route path="/directory/:categorySlug" element={<DirectoryListing />} />
        {/* Route for displaying listings for a specific titleName */}
        <Route path="/directory1/:titleName" element={<TitleListing />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="singleproduct/:id" element={<SignleProduect />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/marketing-oppurtunity" element={<Marketing />} />
        <Route path="/ubuntu-drive" element={<Ubuntu />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />}></Route>

        {/* private routes User  */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="/dashboard/user/profile" element={<Profile />}></Route>
          <Route path="/dashboard/user/lists" element={<Lists />}></Route>
        </Route>

        {/* private routes Admin  */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
          <Route path="/dashboard/admin/create-listing" element={<CreateListing />} />
          <Route path="/dashboard/admin/update-listing/:slug" element={<UpdateListing/>}></Route>
          <Route path="/dashboard/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;