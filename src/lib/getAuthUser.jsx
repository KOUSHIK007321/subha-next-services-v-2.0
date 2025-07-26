"use server";

import { cookies } from "next/headers.js";
import { decrypt } from "./sessions.js";

import NavbarClient from "@/components/NavbarClient.jsx"; // Import the client-side component
            
export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    console.log("User from session:", user);
    return user;
  }
}

export async function NavbarServer() {
  const authUser = await getAuthUser(); // Fetch authenticated user on the server
  return <NavbarClient authUser={authUser} />;
}

