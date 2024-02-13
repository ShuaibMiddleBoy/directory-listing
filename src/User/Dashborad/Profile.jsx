import React, { useEffect, useState } from "react";
import UserMenu from "../../components/userMenu/UserMenu";
import style from './profile.module.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const jsonData = localStorage.getItem('auth');
  const data = JSON.parse(jsonData);


  useEffect(() => {
    // Make an API request to fetch user profile data
    fetch(`https://directory-listing-server.vercel.app/api/auth/user-profile`, {
      method: 'GET',
      headers: {
        'Authorization':  data.token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUserProfile(data.user);
      } else {
        // Handle error here
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error here
    });
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.sidebar}>
          <UserMenu />
        </div>
        <div className={style.mainContent}>
          <h1>Your Profile</h1>
          {userProfile ? (
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              <tr>
                <td>{userProfile.firstName} {userProfile.lastName}</td>
                <td>{userProfile.email}</td>
                <td>{userProfile.phone}</td>
              </tr>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;