import React, { useEffect, useState } from "react";
import UserMenu from "../../components/userMenu/UserMenu";
import style from "./lists.module.css";
import { Modal, Input, Button, Select } from 'antd';
import toast from "react-hot-toast";

const { Option } = Select;

const Lists = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    titleName: "",
    websiteLink: "",
    phone: "",
    address: "",
    zipCode: "",
  });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const jsonData = localStorage.getItem("auth");
  const data = JSON.parse(jsonData);

  // Define the fetchMyListings function
  const fetchMyListings = async () => {
    try {
      const response = await fetch(`https://directory-listing-server.vercel.app/api/listing/my-listings`, {
        method: "GET",
        headers: {
          Authorization: data.token,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setMyListings(responseData.listings);
        setLoading(false);
      } else {
        // Handle error cases here
        console.error("Failed to fetch user's listings");
      }
    } catch (error) {
      console.error("Error while fetching user's listings:", error);
    }
  };

  useEffect(() => {
    // Call the fetchMyListings function to load the user's listings when the component mounts
    fetchMyListings();

    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  // Define the fetchCategories function
  const fetchCategories = async () => {
    try {
      const response = await fetch(`https://directory-listing-server.vercel.app/api/category/categories`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const openUpdateModal = (listing) => {
    setSelectedListing(listing);
    setFormData({
      category: listing.category ? listing.category._id : "",
      titleName: listing.titleName || "",
      websiteLink: listing.websiteLink || "",
      phone: listing.phone || "",
      address: listing.address || "",
      zipCode: listing.zipCode || "",
    });
    setUpdateModalVisible(true);
  };

  const handleUpdateListing = async () => {
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/listing/update-list/${selectedListing._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`Listing updated successfully`);
        setUpdateModalVisible(false);
        fetchMyListings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteListing = async () => {
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/listing/delete-list/${selectedListing._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw  Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`Listing deleted successfully`);
        setDeleteModalVisible(false);
        await fetchMyListings(); // Ensuring this is awaited
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = myListings.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(myListings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.mainContainer}>
          <div className={style.sidebar}>
            <UserMenu />
          </div>
          <div className={style.mainContent}>
            <h3>Your Lists</h3>
            <div className={style.cards}>
              {currentListings.map((listing) => (
                <div className={style.card} key={listing._id}>
                  <span className={style.listCategory}>
                    <b>Category:</b> {listing.category ? listing.category.name : 'Category Not Available'}
                  </span>
                  <span className={style.Website}>
                    <b>Website:</b> <a href={listing.websiteLink}>{listing.websiteLink}</a>
                  </span>
                  <span className={style.phone}>
                    <b>Phone:</b> {listing.phone}
                  </span>
                  <span className={style.address}>
                    <b>Address:</b> {listing.address}
                  </span>
                  <span className={style.zipCode}>
                    <b>Zip Code:</b> {listing.zipCode}
                  </span>
                  <div>
                    <button onClick={() => openUpdateModal(listing)}>Update</button>
                    <button onClick={() => { setSelectedListing(listing); setDeleteModalVisible(true); }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={style.pagination}>
              <Button onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </Button>
              <span>
                Page {currentPage} of {Math.ceil(myListings.length / itemsPerPage)}
              </span>
              <Button onClick={nextPage} disabled={currentPage === Math.ceil(myListings.length / itemsPerPage)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Update Listing"
        visible={isUpdateModalVisible}
        onOk={handleUpdateListing}
        onCancel={() => setUpdateModalVisible(false)}
      >
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <Select
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
          >
            <Option value="">Select Category</Option>
            {categories.map(category => (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="titleName">Title Name:</label>
          <Input
            type="text"
            name="titleName"
            value={formData.titleName}
            onChange={(e) => setFormData({ ...formData, titleName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="websiteLink">Website Link:</label>
          <Input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <Input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          />
        </div>
      </Modal>

      <Modal
        title="Delete Listing"
        visible={isDeleteModalVisible}
        onOk={handleDeleteListing}
        onCancel={() => setDeleteModalVisible(false)}
      >
        Are you sure you want to delete this listing?
      </Modal>
    </>
  );
};

export default Lists;
