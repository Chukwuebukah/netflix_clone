import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

export default function Movie({ item }) {
  const [like, setLike] = React.useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    const checkSavedShow = async () => {
      if (user?.email) {
        const docRef = doc(db, 'users', `${user?.email}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const savedShows = docSnap.data().savedShows;
          const isSaved = savedShows.some((show) => show.id === item.id);
          setLike(isSaved);
          setSaved(isSaved);
        }
      }
    };
    checkSavedShow();
  }, [user, item]);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(!saved);
      await updateDoc(movieID, {
        savedShows: like ? arrayRemove({ id: item.id, title: item.title, img: item.backdrop_path }) : arrayUnion({ id: item.id, title: item.title, img: item.backdrop_path })
      });
    } else {
      alert("Please login to save a movie");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}