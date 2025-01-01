import React from "react";

type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallerText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallerText }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallerText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}{" "}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
