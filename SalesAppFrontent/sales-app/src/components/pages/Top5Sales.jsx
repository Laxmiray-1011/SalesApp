import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { API_BASE_URL } from '../../config'; // Importing API_BASE_URL from config

function Top5Sales() {
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/top-sales`);
        if (response.data && response.data.topSales) {
          setTopSales(response.data.topSales);
        }
      } catch (error) {
        console.error('Error fetching top sales:', error);
      }
    };

    fetchTopSales();

    // Set up a polling interval to fetch the top sales every X milliseconds
    const intervalId = setInterval(fetchTopSales, 5000); // Fetch every 5 seconds (adjust as needed)

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <>
      <h1>Top 5 Sales</h1>
      <div className="form-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {topSales.length > 0 ? (
              topSales.map((sale, index) => (
                <tr key={sale._id}>
                  <td>{index + 1}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No sales data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Top5Sales;
