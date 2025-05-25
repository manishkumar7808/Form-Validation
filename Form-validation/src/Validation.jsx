import React, { useState } from 'react';

function Validation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex = /^[0-9]{12}$/;

  const countries = {
    India: ['Delhi', 'Mumbai', 'Bangalore','Begusarai','Patna'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Birmingham'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters.';
    if (formData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters.';
    if (formData.username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters.';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!formData.phoneCode || !formData.phoneNumber) newErrors.phone = 'Complete phone number required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!panRegex.test(formData.pan)) newErrors.pan = 'Invalid PAN format.';
    if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = 'Aadhar must be 12 digits.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form has been submitted successfully!');
      console.log(formData);
    }
  };

  return (
    <div>
      <h1>Complete Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        <br /><br />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        <br /><br />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        <br /><br />

        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        <br /><br />

        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        <br /><br />

        <label>Phone No:</label>
        <input
          type="text"
          name="phoneCode"
          placeholder="Country Code"
          value={formData.phoneCode}
          onChange={handleChange}
          style={{ width: '100px' }}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        <br /><br />

        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">--Select Country--</option>
          {Object.keys(countries).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
        <br /><br />

        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">--Select City--</option>
          {formData.country && countries[formData.country].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
        <br /><br />

        <label>PAN No:</label>
        <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
        {errors.pan && <span style={{ color: 'red' }}>{errors.pan}</span>}
        <br /><br />

        <label>Aadhar No:</label>
        <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
        {errors.aadhar && <span style={{ color: 'red' }}>{errors.aadhar}</span>}
        <br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Validation;
