import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Feature is Coming Soon</h1>
      <p className="text-lg mb-10">We're working hard to bring you this feature. Stay tuned!</p>
      <img
        src="https://via.placeholder.com/500x300"
        alt="Coming soon"
        className="w-1/2 mb-10" />
    </div>
  );
};

export default ComingSoon;
