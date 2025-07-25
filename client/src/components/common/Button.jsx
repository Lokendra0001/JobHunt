import React from "react";

const Button = ({
  type = "button",
  btnName,
  icon: Icon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full flex justify-center py-2 px-4  rounded-md  font-medium   ${className}`}
      {...props}
    >
      <span className="flex gap-1.5 items-center">
        {Icon && <Icon size={20} />}
        {btnName || children}
      </span>
    </button>
  );
};

export default Button;
