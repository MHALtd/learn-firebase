import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  //   New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDirector, setNewMovieDirector] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieAiring, setIsNewMovieAiring] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      // READ THE DATA
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovieList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    // SET THE MOVIE LIST
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        director: newMovieDirector,
        airing: isNewMovieAiring,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Movie Title" onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input type="text" placeholder="Director" onChange={(e) => setNewMovieDirector(e.target.value)} />
        <input type="number" placeholder="Release Date" onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieAiring} onChange={(e) => setIsNewMovieAiring(e.target.checked)} />
        <label>Airing</label> <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Release Year: {movie.releaseDate}</p>
            <p>Director: {movie.director}</p>
            {/* <p>
              Airing: <i>{movie.airing ? "Yes" : "No"}</i>
            </p> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
