import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}
// type BtnActionProps = {
//   children: ReactNode;
//   className?: string;
// };

const ButtonAction = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <span className='inline-block bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-muted hover:text-background transition-colors duration-300 cursor-pointer'>
        {children}
      </span>
    </button>
  );
};

export default ButtonAction;
