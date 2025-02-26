import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

import Movie from "./Movie";

export default function Row({ title, fetchURL, rowID }) {
  const [movies, setMovies] = useState([]);
  const [slider, setSlider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMovies();
  }, [fetchURL]);

  useEffect(() => {
    const sliderElement = document.getElementById(`slider${rowID}`);
    setSlider(sliderElement);
  }, [rowID]);

  const slideLeft = () => {
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={`slider${rowID}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
}