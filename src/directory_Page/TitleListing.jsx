import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./titleListing.module.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const TitleListing = () => {
  const { titleName } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://directory-listing-server.vercel.app/api/listing/by-title/${titleName}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data ", data);

        if (data.success) {
          setListings(data.listings);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [titleName]);

  return (
    <>
      <Header />
      <Navbar />
      <div className={style.mainContainer}>
        <h2>Listings for {titleName}</h2>

        <div className={style.directoryListingLists}>
          {listings.map((listing) => (
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TitleListing;
