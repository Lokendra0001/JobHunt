import React from "react";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={`max-w-[1400px] min-h-screen h-full mx-auto sm:px-12 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
