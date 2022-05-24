/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faCircleDown,
  faHeart,
  faStar,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const Bookcard = (props) => {
  const [fav, setFav] = useState(false);
  const [showload, setShowLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [fibookData, setfiBookData] = useState([]);
  const [filterbookData, setfilterBookData] = useState([]);
  useEffect(() => {
    if (props.fbookData.length === 0) {
      setfiBookData(props.bookData);
    } else if (fibookData.length === 0) {
      setfiBookData(fibookData);
    } else {
      setfiBookData(props.fbookData);
    }
  }, [props.fbookData.length, props.bookData, fibookData, props.fbookData]);

  const fetchBooks2 = async () => {
    const filteredBooks = props.bookData.filter((book) => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
    setfilterBookData(filteredBooks);
    await axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?search=${search}`)
      .then((item) => {
        setSearch("");
      })
      .catch((err) => console.log(err));
  };
  const handleFav = (id) => {
    var newFD = window.localStorage.getItem("favouriteBook");
    newFD = newFD ? JSON.parse(newFD) : [];
    const favData = props.bookData.find((item) => item.id === id);
    const newfavData = favData;
    newFD.push(newfavData);
    window.localStorage.setItem("favouriteBook", JSON.stringify(newFD));
    setFav(true);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div class="ml-28 mb-12 flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
        <div class="relative w-full sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
          <input
            onChange={handleChange}
            type="text"
            value={search}
            id="footer-field"
            name="footer-field"
            className=" bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-gray-700 py-1 px-24 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          onClick={fetchBooks2}
          className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          Search
        </button>
        <div></div>
      </div>

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
                visible={props.bookData.length === 0 ? !showload : showload}
              />
            </div>
            {(filterbookData.length === 0 ? fibookData : filterbookData).map(
              (book) => {
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
                            href={`/book-details/${book.id}/${props.page}`}
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
                            {!fav ? (
                              <FontAwesomeIcon className="mx-2" icon={faStar} />
                            ) : (
                              <FontAwesomeIcon
                                className="mx-2 black"
                                icon={faHeart}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="mb-24 ml-24 mr-24 mt-16">
          <div className="content-end relative">
            <button
              onClick={props.handleprePagechange}
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
              onClick={props.handlenextPagechange}
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
      </section>
    </div>
  );
};

export default Bookcard;
