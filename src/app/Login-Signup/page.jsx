import React from "react";
import LoginSignupPage from "@/components/NewLoginPage";


import localFont from "next/font/local"; // Import local font

const myFont = localFont({ src: "../../fonts/JungleFlame-nAAv4.otf" });

export default function page() {
  return (
    <div >
      <LoginSignupPage />
    </div>
  );
}
