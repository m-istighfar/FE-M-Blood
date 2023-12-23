import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between flex-wrap px-4 md:flex-nowrap md:px-10">
          <a
            className="text-white text-sm uppercase font-bold lg:inline-block hidden"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
        </div>
      </nav>
    </>
  );
}
