// import { AuthProvider } from './context/AuthContext'
import NewNavbar from "@/components/NewNavbar";
// import "./globals.css";

export const metadata = {
  title: "Your Website",
  description: "Created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <AuthProvider> */}
        <NewNavbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p>© 2024 Your Website. All rights reserved.</p>
          </div>
        </footer>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
