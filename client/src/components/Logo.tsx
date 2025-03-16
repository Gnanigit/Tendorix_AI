import React from "react";

const Logo = () => {
  return (
    <div className="overflow-hidden flex items-center justify-center space-x-2">
      <img
        src="/tendorix_dark.png"
        alt="Logo"
        className="w-[50px] object-contain"
      />
      <h1 className="text-3xl font-bold text-white">Tendorix</h1>
    </div>
  );
};

export default Logo;
