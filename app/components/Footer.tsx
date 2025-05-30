import React from "react";

function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
        <p>&copy; 2025 HIVE. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
