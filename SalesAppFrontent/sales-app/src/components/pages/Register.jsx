import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../../config'

function Register() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '', // Initializing first name state
    lastName: '', // Initializing last name state
    email: '', // Initializing email state
    password: '', // Initializing password state
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    axios.post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        if (result.status == 201) {
          Swal.fire({
            icon: 'success',
            title: 'User successfully registered'
          })

          // Reset form data
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
        }
      })
      .catch((error) => {
        console.error('Error response:', error.response);
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred please try again later!'
        })
      })

  };

  return (
    <>
      <h1>Registration Form</h1>
      <div className="form-container">
        {/* Form component with onSubmit event */}
        <Form onSubmit={handleSubmit} className="form">
          {/* Form group for First Name */}
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            {/* Input for first name with value and onChange event */}
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName} // Binding input value to first name state
              onChange={handleChange} // Binding onChange event to handleChange function
            />
          </Form.Group>

          {/* Form group for Last Name */}
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            {/* Input for last name with value and onChange event */}
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName} // Binding input value to last name state
              onChange={handleChange} // Binding onChange event to handleChange function
            />
          </Form.Group>

          {/* Form group for Email */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            {/* Input for email with value and onChange event */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email} // Binding input value to email state
              onChange={handleChange} // Binding onChange event to handleChange function
            />
          </Form.Group>

          {/* Form group for Password */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* Input for password with value and onChange event */}
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password} // Binding input value to password state
              onChange={handleChange} // Binding onChange event to handleChange function
            />
          </Form.Group>

          {/* Submit button */}
          <Button variant="primary" type="submit" className="btn-submit">
            Register
          </Button>
        </Form>
        <br />
        <p>OR</p>
        <br />
        <Link to="/Login">Already Register Please Login here</Link>
      </div>
    </>
  );
}

export default Register; // Exporting the Register component
