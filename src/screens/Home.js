import React from "react";
import Bookcard from "../components/Bookcard";
import FilterModal from "../components/FilterModal";

const Home = () => {
  return (
    <>
      <div>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-left text-gray-900 mb-8 mt-8 mx-24">
          Welcome to Xtreme Books
        </h1>
        <p className="mb-8 mt-8 mx-24">
          Choose among free epub and Kindle eBooks, download them or read them
          online. You will find the world’s great literature here, with focus on
          older works for which U.S. copyright has expired. Thousands of
          volunteers digitized and diligently proofread the eBooks, for you to
          enjoy.
        </p>
        <FilterModal/>
       
      </div>
    </>
  );
};

export default Home;
