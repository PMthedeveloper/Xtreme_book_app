/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const BookDetails = () => {
  const params = useParams();
  const [bookData, setBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState();
  const [showload, setShowLoad] = useState(false);
  const [page, setPage] = useState(params.page);
  useEffect(() => {
    axios.get(`https://gnikdroy.pythonanywhere.com/api/book/?page=${page}`).then((item) => {
      setBookData(item.data.results);
      findData();
    });
  });
  const findData = () => {
    if (bookData.length > 0) {
      bookData.find((elem) => {
        if (params.id == elem.id) {
          setSelectedBook(elem);
            console.log(selectedBook);
          return selectedBook;
        }
      });
    }
  };

  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div style={{ marginLeft: "50%", marginRight: "50%" }}>
              <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                strokeWidth={5}
                color="#b30000"
                secondaryColor="#7f007f"
                visible={selectedBook ? showload : !showload}
              />
            </div>

            {selectedBook &&
              selectedBook.resources.map((res) => {
                return res.uri.includes("medium") ? (
                  <img
                    key={res.id}
                    className="lg:h-96 lg:w-96 md:h-72 w-full object-contain object-center"
                    src={res.uri}
                    alt="blog"
                  />
                ) : (
                  <div key={res.id}></div>
                );
              })}
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {selectedBook &&
                selectedBook.agents.map((res) => {
                  return (
                    <h2
                      key={res.id}
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                    >
                      Author: {res.person}
                    </h2>
                  );
                })}
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {selectedBook && selectedBook.title}
              </h1>
              <div class="flex mb-4">
                <ul>
                  {!selectedBook ? (
                    <></>
                  ) : (
                    <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Subjects
                    </h1>
                  )}

                  {selectedBook &&
                    selectedBook.subjects.map((res) => {
                      return (
                        <>
                          <li>{res}</li>
                        </>
                      );
                    })}
                </ul>
              </div>

              <div class="flex">
                {selectedBook &&
                  selectedBook.resources.map((res) => {
                    return res.uri.includes("htm") ? (
                      <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        <a href={res.uri} target="_blank" rel="noreferrer">
                          Read book
                        </a>
                      </button>
                    ) : (
                      <div></div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
