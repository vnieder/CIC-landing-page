import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative min-h-[10vh] bg-[#003594] opacity-90 top-0 left-0 w-full flex items-center justify-between z-10 p-4 text-white">
      <a
        href="https://pitt.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center ml-8 cursor-pointer"
      >
        <img
          src="/image.png"
          alt="University of Pittsburgh Logo"
          className="h-16"
        />
      </a>
      <a
        href="https://www.technology.pitt.edu/about/AWS-CIC"
        className="text-bold text-xl mr-8"
      >
        AWS Cloud Innovation Center
      </a>
    </header>
  );
};

export default Header;
