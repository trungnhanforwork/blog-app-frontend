import React from "react";

const Hero = () => {
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
        <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-4/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Search on Blog"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
