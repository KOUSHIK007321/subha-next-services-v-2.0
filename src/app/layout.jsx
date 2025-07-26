import "./globals.css";

import Footer from "@/components/Footer";
import NavbarServer from "@/lib/getAuthUser"; // Import the server-side Navbar component
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Subha Cyber Solutions</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white">
          <NavbarServer />
        </header>
        <main className="bg-gray-800 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
