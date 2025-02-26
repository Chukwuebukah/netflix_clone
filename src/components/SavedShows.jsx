import React, { useRef, useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

export default function SavedShows() {
  const [movies, setMovies] = useState([]);
  const slider = useRef(null);
  const { user } = UserAuth();

  const slideLeft = () => {
    if (slider.current) {
      slider.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (slider.current) {
      slider.current.scrollLeft += 500;
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.email), (docSnapshot) => {
      setMovies(docSnapshot.data()?.savedShows || []);
    });
    return unsubscribe;
  }, [user?.email]);

  const deleteShow = async (passedID) => {
    try {
      // Filter out the movie with the given ID
      const updatedShows = movies.filter((item) => item.id !== passedID);
      const movieRef = doc(db, 'users', user.email);
      await updateDoc(movieRef, { savedShows: updatedShows });
    } catch (error) {
      console.error("Error removing show: ", error);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          ref={slider}
          id="slider"
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, index) => (
            <div
              key={item.id || index}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <button
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                  aria-label="Delete show"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
}
