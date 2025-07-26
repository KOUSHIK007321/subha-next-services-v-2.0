"use server";

// app/components/NavbarServer.js
import  getAuthUser from "@/lib/getAuthUser"; // Import your server-side auth fetching function
import NavbarClient from "@/components/NavbarClient"; // Import the client-side component


export default async function NavbarServer() {
  const authUser = await getAuthUser(); // Fetch authenticated user on the server
  return <NavbarClient authUser={authUser} />;
}
