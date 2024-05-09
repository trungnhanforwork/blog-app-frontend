import React from "react";
import SearchForm from "./SearchForm";

const Hero = () => {
  // const handleSearch = (searchQuery) => {
  //   console.log("Search Query:", searchQuery);
  // };

  return (
    <section className="bg-blue-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Expand Your Knowledge
          </h1>
          <p className="my-4 text-xl text-white">
            Discover meaningful blogs the that suits your needs.
          </p>
        </div>
        <SearchForm />
      </div>
    </section>
  );
};

export default Hero;
