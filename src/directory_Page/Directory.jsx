import React, { useEffect, useState } from "react";
import style from "./directory.module.css";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import CreateListingForm from "./CreateListingForm";

const Directory = () => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingResponse = await fetch(
          `https://directory-listing-server.vercel.app/api/listing/all-lists`
        );
        const categoryResponse = await fetch(
          `https://directory-listing-server.vercel.app/api/category/categories`
        );

        if (!listingResponse.ok || !categoryResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const listingData = await listingResponse.json();
        const categoryData = await categoryResponse.json();

        if (listingData.success) {
          setListings(listingData.listings);
          setSearchResults(listingData.listings); // Initialize search results
        }

        if (categoryData.success) {
          setCategories(categoryData.categories);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const getCountForCategory = (categoryId) => {
    return listings.filter(
      (listing) => listing.category && listing.category._id === categoryId
    ).length;
  };

  const handleSearch = () => {
    const filteredListings = listings.filter((listing) =>
      listing.titleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredListings);
    setCurrentPage(1); // Reset to the first page after a new search
  };

  const startIndex = (currentPage - 1) * listingsPerPage;
  const endIndex = startIndex + listingsPerPage;
  const displayedListings = searchResults.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(searchResults.length / listingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="directory">
      <Header />
      <Navbar />
      <div className={style.directoryContent}>
      <p>
          Black Money Movement is proactively vetting Black Excellence through
          entrepreneurship. This directory contains 4 – 5 star rated, brick and
          mortar, Black-owned businesses only. When you want to support
          businesses that are owned by African Americans, we ask you to support
          those who work hard to give you the very best that they have to offer.
          (If a company that you know of isn’t listed, send the name of the
          business, the owner’s name, and phone number to:
          blackmoneymovement2022@gmail.com We will connect with them soon
          after). Thanks for your support of this neverending growing
          Black-owned business community of excellence. -BMM
        </p>

        <form className={style.directoryListingForm}>
          <div className={style.first}>
            <input
              type="text"
              placeholder="Search Listings"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="button"
              value="Find Listings"
              onClick={handleSearch}
            />
          </div>
          <div className={style.sec}>
            <input
              type="button"
              value="View All Listing"
            />
            <input
              type="button"
              value="Add Listing"
              onClick={toggleCreateForm}
            />
          </div>
        </form>

        {showCreateForm && <CreateListingForm closeForm={closeCreateForm} />}

        <ul className={style.directoryCategories}>
          {categories.map((category) => (
            <li key={category._id}>
              {category ? (
                <Link to={`/directory/${category.slug}`}>{category.name}</Link>
              ) : (
                <span>Category Not Available</span>
              )}
              &nbsp; ({getCountForCategory(category._id)})
            </li>
          ))}
        </ul>

        <div className={style.directoryListingLists}>
          {displayedListings.length > 0 ? (
            displayedListings.map((listing) => (
              <div className={style.list} key={listing._id}>
                <Link to={`/directory1/${listing.titleName}`}>
                  <h3>{listing.titleName}</h3>
                </Link>
                <hr style={{ padding: "0", margin: "0" }} />
                <div className={style.listDetails}>
                  <table>
                    <tbody>
                      <tr>
                        <td className={style.label}>Listing Category</td>
                        <td className={style.value}>
                          {listing.category ? (
                            <Link to={`/directory/${listing.category.slug}`}>
                              {listing.category.name}
                            </Link>
                          ) : (
                            <span>Category Not Available</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className={style.label}>Website</td>
                        <td className={style.value}>
                          <a href={listing.websiteLink}>{listing.websiteLink}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className={style.label}>Phone</td>
                        <td className={style.value}>{listing.phone}</td>
                      </tr>
                      <tr>
                        <td className={style.label}>Address</td>
                        <td className={style.value}>{listing.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>

        <div className={style.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {Math.ceil(searchResults.length / listingsPerPage)}
          </span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(searchResults.length / listingsPerPage)}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Directory;