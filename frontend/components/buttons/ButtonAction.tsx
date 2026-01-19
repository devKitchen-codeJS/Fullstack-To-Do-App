import React, { ReactNode } from "react";

type BtnActionProps = {
  children: ReactNode;
  className?: string;
};

const ButtonAction = ({ children, className }: BtnActionProps) => {
  return (
    <div className=''>
      <span className='inline-block bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-muted hover:text-background transition-colors duration-300 cursor-pointer'>
        {children}
      </span>
    </div>
  );
};

export default ButtonAction;
