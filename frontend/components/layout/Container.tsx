import clsx from "clsx";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx(`container-padding mx-auto w-full py-2`, className)}>
      {children}
    </div>
  );
};

export default Container;
