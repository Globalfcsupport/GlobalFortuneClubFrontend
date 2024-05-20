import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';

const DashBoard = () => {
  const [userData, setUserData] = useState({
    name: '',
    id: '',
    wallet: 0,
    reserveWallet: 0,
  });

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/user'); // Replace with your actual API endpoint
        const data = await response.json();

        // Update state with the fetched data
        setUserData({
          name: data.name,
          id: data.id,
          wallet: data.wallet,
          reserveWallet: data.reserveWallet,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full p-4 space-y-4">
      {/* Blue Background Section */}
      <div className="bg-blue-500 p-4 flex justify-between items-center text-white rounded-lg">
        <div>
          <div className="font-bold">{userData.name}</div>
          <div>ID: {userData.id}</div>
        </div>
        <button className="bg-white text-blue-500 px-4 py-2 rounded">Start</button>
      </div>

      {/* Wallet Section */}
      <div className="bg-white p-4 flex justify-between items-center rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <FaWallet className="text-2xl text-blue-500" />
          <span className="font-bold">My Wallet</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{userData.wallet.toFixed(4)}</span>
          <FaArrowRight className="text-gray-400" />
        </div>
      </div>

      {/* Reserve - My Wallet Section */}
      <div className="bg-white p-4 flex justify-between items-center rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <GiWallet className="text-2xl text-blue-500" />
          <span className="font-bold">Reserve - My Wallet</span>
        </div>
        <div className="bg-blue-500 text-white px-4 py-2 rounded">
          ${userData.reserveWallet.toFixed(2)}
        </div>
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default DashBoard;
