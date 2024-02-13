import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import AdminMenu from "../components/adminMenu/AdminMenu";
import CategoryForm from "../components/form/CategoryForm";
import toast from "react-hot-toast";
import { Modal } from 'antd';
import style from './createCategory.module.css';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [visible, setvisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/category/create-category`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: category }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`${data?.category.name} category is created`);
        setCategory("");
        fetchAllCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/category/update-category/${selected._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setvisible(false);
        fetchAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`Category Deleted Successfully Deleted`);
        fetchAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await fetch(`https://directory-listing-server.vercel.app/api/category/categories`);
      const data = await res.json();
      if (data.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const renderCategories = currentItems.map((c, id) => (
    <tr key={id + 1}>
      <th>{id + 1}</th>
      <td>{c.name}</td>
      <td>
        <button onClick={() => { setvisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
        <button onClick={() => { handleDelete(c._id) }}>Delete</button>
      </td>
    </tr>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </button>
  ));

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.sidebar}>
          <AdminMenu />
        </div>
        <div className={style.mainContent}>
          <h1>Manage Categories</h1>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={category}
            setValue={setCategory}
          />
          <div>
            <table className={style.table}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {renderCategories}
              </tbody>
            </table>
          </div>
          <div className={style.pagination}>
            {renderPageNumbers}
          </div>
        </div>
        <Modal onCancel={() => { setvisible(false) }} footer={null} visible={visible}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;