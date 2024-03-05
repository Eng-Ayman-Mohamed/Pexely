import { useState } from "react";
import "./Styles.css";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
const pexely_url = `https://api.pexels.com/v1/search`;

function App() {
  const [mode, setMode] = useState(false);
  const [data, setData] = useState([]);
  const [errmsg, setErrMsg] = useState("");
  const [page, SetPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [query, setQuery] = useState("Animals");
  const Dark = () => {
    setMode(!mode);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          pexely_url + `?page=${page}&per_page=${20}&query=${query}`,
          {
            headers: {
              Authorization:
                "IF3ZplttUgivSiWjFSwayHIqOX9AJtyrUjyEEZ5MhDlNPlSvc50nleQW",
            },
          }
        );
        setData(res.data.photos);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg("Loading Failed");
        }
      }
    }
    fetchData();
  }, [query, page, errmsg]);

  const handleChange = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
    }
  };
  const nextPage = () => {
    SetPage(page + 1);
    console.log(page);
  };
  const prevPage = () => {
    if (page > 1) {
      SetPage(page - 1);
    }
    console.log(page);
  };

  useEffect(() => {
    if (page > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [disabled, page]);

  return (
    <div className={mode ? "dark bg-slate-900 " : "  "}>
      <nav
        className="fixed w-lvw flex backdrop-blur
       justify-center  p-4 vsm:p-1 h-[10vh] vsm:h-14
       shadow-lg z-indx:1 lg:text-3xl md:text-2xl items-center "
      >
        <input
          type="text"
          className=" mt-1 block w-[50vw]  px-3 py-2 bg-inherit 
           border-slate-300 border-2 rounded-3xl shadow-sm vsm:h-8
          focus:outline-none focus:border-sky-500 focus:ring-1
           focus:ring-sky-500 dark:text-purple-700 text-center
            font-serif text-lg sm:text-sm 
       "
          onKeyDown={handleChange}
        ></input>
        <button
          onClick={Dark}
          className=" text-lg size-15 top-2
          font-bold px-3 py-2 text-slate-700 rounded-lg 
            dark:text-white  "
        >
          {mode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </button>
      </nav>

      <div className="flex flex-col space-y-4 space-x-0 justify-center items-center  ">
        <div className=" h-[4rem] w-lvw lg:h-[5rem] md:h-[4rem]"></div>
        {data ? (
          <div className="flex flex-col space-y-4 space-x-0 justify-center items-center  ">
            {data.map((animal) => {
              return (
                <a
                  key={animal.id}
                  href={animal.src.original}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    key={animal.id}
                    className=" img-cover w-[90vw] hover:cursor-pointer scroll-watcher "
                    src={animal.src.original}
                    alt=""
                  />
                </a>
              );
            })}
            <div className="w-[90vw] flex place-content-around p-2">
              <button
                onClick={prevPage}
                className={
                  disabled
                    ? " text-6xl text-slate-400  dark:text-slate-700 cursor-not-allowed "
                    : "text-6xl text-slate-950 dark:text-white "
                }
              >
                ❮
              </button>
              <button
                onClick={nextPage}
                className="text-6xl text-slate-950  dark:text-white  "
              >
                ❯
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
