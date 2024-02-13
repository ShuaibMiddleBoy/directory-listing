import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './directoryListing.module.css';
import Navbar from '../../src/components/navbar/Navbar';
import Header from '../../src/components/header/Header';
import Footer from '../../src/components/footer/Footer';
import { Link } from 'react-router-dom';

const DirectoryListing = () => {
  const { categorySlug } = useParams(); // Get the categorySlug from route parameters
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`https://directory-listing-server.vercel.app/api/category/listings-by-category/${categorySlug}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          setListings(data.listings);
        } else {
          // No listings found for the category
          setListings([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [categorySlug]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <Header/>
    <Navbar/>
 <div className={style.wrapper}>
    <div className={style.mainContainer}>
      <h2>{categorySlug}</h2>
      {listings.length === 0 ? (
        <p>No listings exist for this category.</p>
      ) : (
        <div className={style.directoryListingLists}>
        {listings.map((listing) => (
          <div className={style.list} key={listing._id}>
            <Link to={`/directory1/${listing.titleName}`}>
              <h3>{listing.titleName}</h3>
            </Link>
            <hr style={{padding:"0", margin:"0"}} />
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
        ))}
      </div>
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default DirectoryListing;