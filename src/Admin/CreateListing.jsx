import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import style from "./createListing.module.css";
import AdminMenu from "../components/adminMenu/AdminMenu";

const CreateListing = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState({
    titleName: "",
    websiteLink: "",
    phone: "",
    address: "",
    zipCode: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Get all categories
  const fetchAllCategories = async () => {
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/category/categories`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Create listing
  const handleCreate = async () => {
    console.log({ category, ...product });
    try {
      const jsonData = localStorage.getItem("auth");
      const parsedata = JSON.parse(jsonData);
      const res = await fetch(`https://directory-listing-server.vercel.app/api/listing/create-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedata.token, // Include the access token in the headers
        },
        body: JSON.stringify({
          category,
          ...product,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success("Listing created successfully");
        // Clear the form fields or reset as needed
        setCategory("");
        setProduct({
          titleName: "",
          websiteLink: "",
          phone: "",
          address: "",
          zipCode: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.sidebar}>
          <AdminMenu />
        </div>
        <div className={style.mainContent}>
          <h1>Create Listing</h1>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select a category"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="titleName"
            value={product.titleName}
            onChange={inputValue}
            placeholder="Enter title name.."
          />

          <input
            type="text"
            name="websiteLink"
            value={product.websiteLink}
            onChange={inputValue}
            placeholder="Enter website link.."
          />

          <input
            type="text"
            name="phone"
            value={product.phone}
            onChange={inputValue}
            placeholder="Enter phone number"
          />

          <textarea
            type="text"
            name="address"
            value={product.address}
            onChange={inputValue}
            placeholder="Enter address.."
          />
          <input
            type="text"
            name="zipCode"
            value={product.zipCode}
            onChange={inputValue}
            placeholder="Enter zip code"
          />

          <button className="btn btn-primary" onClick={handleCreate}>
            Create Listing
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateListing;