import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-tech-primary text-white p-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Surafel Kifle</h2>
          <p className="text-sm text-gray-400">Building the future</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-1 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-400" />
            <span>SurafelKifle17@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-green-400" />
            <span>+251928414106</span>
          </div>
        </div>

        
       
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Developed By Surafel Kifle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
