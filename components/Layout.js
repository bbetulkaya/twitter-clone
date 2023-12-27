import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="max-w-lg mx-auto border-r border-l border-twitterBorder min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
