import React from "react";

const Header = () => {
  return (
    
      <div className="min-h-screen bg-purple-50 text-black">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-center py-3 font-semibold">
          🚀 Check out my $1,000,000 journey!
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto mt-10 px-5">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧑‍💻</span>
              <span className="font-bold">Florin Pop</span>
            </div>
            <div className="text-gray-600 space-x-3">
              <a href="#" className="hover:underline">
                Blog
              </a>
              <span>/</span>
              <a href="#" className="hover:underline">
                Projects
              </a>
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-4xl font-bold mt-10">My $1,000,000 Grid</h1>
          <p className="mt-4 text-lg text-gray-700">
            For the{" "}
            <span className="text-purple-600 font-semibold">
              One Million Dollar
            </span>{" "}
            challenge. Each square represents $1,000.
          </p>
        </div>
      </div>
    
  );
};

export default Header;
