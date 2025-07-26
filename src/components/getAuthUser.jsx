'use client';

import { parse } from 'cookie';
import { useEffect, useState } from 'react';

// Example page component
const Dashboard = ({ isLoggedIn }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (!loggedIn) {
      // Redirect to login page if not logged in
      window.location.href = '/login';
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <div>Loading...</div>; // You can show a loading screen here while checking.
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* Your protected content */}
    </div>
  );
};

// Server-side function to check cookies
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  // Check if the user is logged in by looking for a specific cookie (e.g., 'auth_token')
  const isLoggedIn = cookies.auth_token ? true : false;
  console.log(isLoggedIn);

  return {
    props: { isLoggedIn },
  };
}

export default Dashboard;
