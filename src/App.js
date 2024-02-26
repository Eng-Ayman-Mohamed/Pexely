import { useState } from "react";
import "./Styles.css";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { createClient } from "pexels";
function App() {
  const [mode, setMode] = useState(false);
  const [data, setData] = useState([]);
  const client = createClient(
    "IF3ZplttUgivSiWjFSwayHIqOX9AJtyrUjyEEZ5MhDlNPlSvc50nleQW"
  );
  const [query, setQuery] = useState("Animals");
  const Dark = () => {
    setMode(!mode);
  };
  async function fetchData() {
    client.photos.search({ query, per_page: 20 }).then((photos) => {
      setData(photos.photos);
    });
  }
  fetchData();
  const handleChange = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
    }

    fetchData();
  };

  return (
    <div className={mode ? "dark bg-slate-900 " : "  "}>
      <nav
        className="fixed w-lvw flex backdrop-blur
       justify-center   mb-5 p-4  
       shadow-lg  lg:text-3xl md:text-2xl sm:text-xl"
      >
        <input
          type="text"
          className=" mt-1 block w-[50vw]  px-3 py-2 bg-inherit 
           border-slate-300 border-2 rounded-3xl shadow-sm
          focus:outline-none focus:border-sky-500 focus:ring-1
           focus:ring-sky-500 dark:text-purple-700 text-center font-serif 
           text-lg
       "
          onKeyDown={handleChange}
        ></input>
        <button
          onClick={Dark}
          className="absolute   right-9 text-lg size-15 
          font-bold px-3 py-2 text-slate-700 rounded-lg 
            dark:text-white "
        >
          {mode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </button>
      </nav>

      <div className="flex flex-col space-y-4 space-x-0 justify-center items-center  ">
        <div className=" h-[4rem] w-lvw lg:h-[5rem] md:h-[4rem]"></div>
        {data.map((animal) => {
          return (
            <img
              key={animal.id}
              className="h-auto w-[80vw] hover:cursor-pointer hover:w-[79vw]"
              src={animal.src.original}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
