/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Bookcard from "./Bookcard";

const FilterModal = () => {
    useEffect(() => {
        fetchBooks();
      });
  const [sortshow, setSortShow] = useState(false);
  const [fbookData, setfBookData] = useState([]);
  const handlesortClose = () => setSortShow(false);
  const handlesortShow = () => setSortShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchBooks = async () => {
    await axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?page=${page}`)
      .then((item) => {
        setBookData(item.data.results);
      })
      .catch((err) => console.log(err));
  };
  const handlenextPagechange = () => {
    setPage(page + 1);
    setBookData([]);
  };
  const handleprePagechange = () => {
    setPage(page - 1);
    setBookData([]);
  };

  const handleFilter = async () => {
    await axios.get(`https://gnikdroy.pythonanywhere.com/api/book/?type=author&languages=&title_contains=&description_contains=&downloads_range_min=&downloads_range_max=&has_bookshelf=&has_resource_type=&has_agent_type=&agent_name_contains=&agent_alias_contains=&agent_webpage_contains=&agent_birth_date_range_min=&agent_birth_date_range_max=&agent_death_date_range_min=&agent_death_date_range_max=`)
  }
  const handleSort = async (e) => {
    setSortShow(false);
    await axios.get(`https://gnikdroy.pythonanywhere.com/api/book/?ordering=${e.target.value}`).then((item) => {
        setfBookData(item.data.results);
    })
  }

  return (
    <div className="content-center">
    <div className="justify-center flex-row flex">
    <button
        onClick={handleShow}
        className="ml-64 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
      >
        Filter
      </button>
      <button
        onClick={handlesortShow}
        className="ml-64 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
      >
        Sort
      </button>
    </div>
      
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="false"
        className={
          !show
            ? `overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center content-center relative hidden`
            : `absolute overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center content-center ml-96 mt-72`
        }
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={handleClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Field Filter
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Title contains:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="false"
        className={
          !sortshow
            ? `overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center content-center relative hidden`
            : `absolute overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center content-center ml-96 mt-72`
        }
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={handlesortClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sort
              </h3>
              <div className="space-y-6">
                <button
                  value={'downloads'}
                  onClick={handleSort}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Downloads - low to high
                </button>
                <button
                  value={'-downloads'}
                  onClick={handleSort}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Downloads - high to low
                </button>
                <button
                  value={'title'}
                  onClick={handleSort}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Title - high to low
                </button>
                <button
                  value={'-title'}
                  onClick={handleSort}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Title - low to high
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Bookcard bookData={bookData} handlenextPagechange={handlenextPagechange} handleprePagechange={handleprePagechange} page={page} fbookData={fbookData}/>
    </div>
    
  );
};

export default FilterModal;
