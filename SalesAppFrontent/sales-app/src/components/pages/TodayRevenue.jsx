import  { useState, useEffect } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../../config'; // Importing API_BASE_URL from config

function TodayRevenue() {
  const [todayRevenue, setTodayRevenue] = useState(null);

  useEffect(() => {
    const fetchTodayRevenue = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/revenue`);
        if (response.data && response.data.Totalrevenue !== undefined) {
          setTodayRevenue(response.data.Totalrevenue);
        }
      } catch (error) {
        console.error('Error fetching today\'s revenue:', error);
      }
    };

    fetchTodayRevenue();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <>
      <h1>Todays Revenue</h1>
      <div  style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>{todayRevenue !== null ? `RS.${todayRevenue}` : 'Loading...'}</h2>
      </div>
    </>
  );
}

export default TodayRevenue;
