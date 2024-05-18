import Button from 'react-bootstrap/Button'; // Importing Button component from react-bootstrap
import Form from 'react-bootstrap/Form';  // Importing Form component from react-bootstrap
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../../config'
import { useState } from 'react';
import axios from 'axios';


// Function component for the Add Sales Form
function AddSalesForm() {
  const [formData, setFormData] = useState({
    productName: '', // Initializing last name state
    quantity: '', // Initializing email state
    amount: '', // Initializing password state
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      productName: formData.productName,
      quantity: formData.quantity,
      amount: formData.amount,
    }
    axios.post(`${API_BASE_URL}/add`, requestData)
      .then((result) => {
        if (result.status == 201) {
          Swal.fire({
            icon: 'success',
            title: 'Product Add successfully'
          })

          // Reset form data
          setFormData({
            productName: '',
            quantity: '',
            amount: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred please try again later!'
        })
      })

  };

  return (
    <>
      <h1>ADD SALES ENTRY </h1>
      <br></br>
      <div className="form-container">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicProduct">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product"
              name="productName"
              value={formData.productName} // Binding input value to first name state
              onChange={handleChange} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" placeholder="Quantity"
              name="quantity"
              value={formData.quantity} // Binding input value to first name state
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Amount"
              name="amount"
              value={formData.amount} // Binding input value to first name state
              onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddSalesForm; // Exporting the AddSalesForm component for use in other files