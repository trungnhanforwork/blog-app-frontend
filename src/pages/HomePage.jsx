import React from "react";

import Hero from "../components/Hero";
import ViewAllJobs from "../components/ViewAllPost";
// import Footer from "./components/Footer";
import HomePosts from "../components/HomePosts";
import InfoBoxes from "../components/InfoBoxes";
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomePosts />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
