import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Spinner = ({ spineer = "login" }) => {
  return (
    <>
    <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      </div>
    </>
  );
};

export default Spinner;
