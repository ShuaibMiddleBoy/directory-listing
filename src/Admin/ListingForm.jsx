import React, { useState } from "react";

const ListingForm = ({ initialData, handleSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="titleName">Title Name:</label>
        <input
          type="text"
          name="titleName"
          id="titleName"
          value={formData.titleName || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="websiteLink">Website Link:</label>
        <input
          type="text"
          name="websiteLink"
          id="websiteLink"
          value={formData.websiteLink || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          value={formData.zipCode || ""}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ListingForm;