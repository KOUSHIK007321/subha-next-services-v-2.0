// footer.jsx
import React from "react";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const styles = {
  // footer: {
  //   backgroundColor: '#333',
  //   color: '#fff',
  //   textAlign: 'center',
  //   padding: '20px 0',
  // },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  icon: {
    color: "#fff",
    textDecoration: "none",
  },
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold">Subha Cyber Solutions</p>
            <p className="text-sm mt-2">
              © 2025 Subha Cyber Solutions. All rights reserved.
            </p>
          </div>

          {/* <div className="mt-6 sm:mt-0 flex gap-6 justify-center sm:justify-end">
            <a href="#home" className="hover:text-blue-500">Home</a>
            <a href="#about" className="hover:text-blue-500">About</a>
            <a href="#services" className="hover:text-blue-500">Services</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </div> */}

          <div className="mt-6 sm:mt-0" style={styles.iconContainer}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=916291912711&text=Hello,I'm Looking for some services in your website&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <FaWhatsapp size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <FaGithub size={30} />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            Built with ❤️ using Next Js, React & Tailwind CSS by Koushik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
