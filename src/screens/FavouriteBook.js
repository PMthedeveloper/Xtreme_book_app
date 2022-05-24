/* eslint-disable no-unused-vars */
import {
  faArrowCircleRight,
  faCircleDown,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const FavouriteBook = (props) => {
  const [showload, setShowLoad] = useState(false);
  const [page, setPage] = useState(1);
  var bookData = window.localStorage.getItem("favouriteBook");
  bookData = JSON.parse(bookData);
  const handlePagechange = () => {
    setPage(page + 1);
  };
  

  const handleFav = (id) => {
    var newFD = window.localStorage.getItem("favouriteBook");
    newFD = newFD ? JSON.parse(newFD) : [];
    const favData = newFD.findIndex((item) => {
      return item.id === id;
    });
    const newfavData = favData;
    if(newfavData !== -1){
      newFD.splice(newfavData,1);
    }
    window.localStorage.setItem("favouriteBook", JSON.stringify(newFD));
  };
  return (
    <div>
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-left text-gray-900 mb-8 mt-8 mx-24">
        Your Favourite Books
      </h1>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div style={{ marginLeft: "50%", marginRight: "50%" }}>
              <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                className="mr-96"
                strokeWidth={5}
                color="#b30000"
                secondaryColor="#7f007f"
                visible={bookData ? showload : !showload}
              />
            </div>
            {bookData ? (
              bookData.map((book) => {
                return (
                  <div className="p-4 md:w-1/3" key={book.id}>
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      {book.resources.map((res) => {
                        return res.uri.includes("medium") ? (
                          <img
                            key={res.id}
                            className="lg:h-72 lg:w-96 md:h-36 w-full object-contain object-center"
                            src={res.uri}
                            alt="blog"
                          />
                        ) : (
                          <div key={res.id}></div>
                        );
                      })}

                      <div className="p-6">
                        {book.agents.map((res) => {
                          return (
                            <h2
                              key={res.id}
                              className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            >
                              Author: {res.person}
                            </h2>
                          );
                        })}

                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {book.title}
                        </h1>

                        <div className="flex items-center flex-wrap ">
                          <a
                            href={`/book-details/${book.id}/${page}`}
                            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                          >
                            Learn More
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faArrowCircleRight}
                            />
                          </a>
                          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faCircleDown}
                            />
                            {book.downloads}
                          </span>
                          <button onClick={(id) => handleFav(book.id)}>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faDeleteLeft}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No books in Favourite</div>
            )}
          </div>
        </div>
        {bookData ? (
          <div className="mb-24 ml-24 mr-24 mt-16">
            <div className="content-end relative">
              <button
                onClick={handlePagechange}
                className="absolute bottom-0 left-0 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Previous page
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            <div className="content-end relative">
              <button
                onClick={handlePagechange}
                className="absolute bottom-0 right-0 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Next page
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default FavouriteBook;
