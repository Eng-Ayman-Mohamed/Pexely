import { useState } from "react";
import "./Styles.css";
import "./App.css";
import "./index.css";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageGallery from "react-image-gallery";
const pexely_url = `https://api.pexels.com/v1/search`;

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress style={{ width: "20vw", height: "20vw" }} />
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState(true);
  const [data, setData] = useState([]);
  const [errmsg, setErrMsg] = useState("");
  const [page, SetPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [query, setQuery] = useState("Animals");
  const [loading, setLoading] = useState(true);
  const Dark = () => {
    setMode(!mode);
  };
  /*   const [images, setImages] = useState(); */
  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get(pexely_url + `?page=${page}&per_page=${80}&query=${query}`, {
            headers: {
              Authorization:
                "IF3ZplttUgivSiWjFSwayHIqOX9AJtyrUjyEEZ5MhDlNPlSvc50nleQW",
            },
          })
          .then((res) => {
            setData([]);
            res.data.photos.map((img) => {
              return setData((data) => [
                ...data,
                {
                  original: img.src.original,
                  originalHeight: img.height,
                  originalAlt: img.alt,
                  thumbnail: img.src.tiny,
                  originalWidth: img.width,
                  loading: "lazy",
                },
              ]);
            });
            setLoading(false);
          });
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg("Loading Failed");
        }
      }
    }
    fetchData();
  }, [query, page]);

  const handleChange = (event) => {
    if (event.target.value && event.key === "Enter") {
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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    console.log(width);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  if (errmsg) {
    return <h1>{errmsg}</h1>;
  }
  return (
    <div className={mode ? "dark bg-slate-900 " : "  "}>
      {!loading ? (
        <div className="flex flex-col space-y-4 space-x-0 justify-center items-center  ">
          {width > 1 ? (
            <ImageGallery
              onClick={() => {
                console.log("click");
              }}
              showFullscreenButton="false"
              slideDuration="0"
              loading="lazy"
              items={data}
              style={{ height: "100vh" }}
              thumbnailPosition="left"
            />
          ) : (
            ""
          )}

          <nav
            className="fixed w-fit flex backdrop-blur top-0
       justify-center  p-4  h-[10vh] vsm:h-fit vsm:p-0 vsm:right-10
       z-indx:1 lg:text-3xl md:text-2xl items-center rounded-full "
          >
            <button
              className="p-2 text-4xl dark:text-white "
              onClick={prevPage}
            >
              &laquo;
            </button>
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
              className="p-2 text-4xl dark:text-white "
              onClick={nextPage}
            >
              &raquo;
            </button>
            <button
              onClick={Dark}
              className=" text-lg size-15
            font-bold px-3 py-2 text-slate-700 rounded-lg 
            dark:text-white m-top-0 "
            >
              {mode ? (
                <MdOutlineLightMode style={{ color: "gold" }} />
              ) : (
                <MdDarkMode />
              )}
            </button>
          </nav>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
