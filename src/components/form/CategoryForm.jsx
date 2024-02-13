import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="category" className="form-label">
            Add New Category
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="form-control"
            placeholder="Enter New Category here.."
          />
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
