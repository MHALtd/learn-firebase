import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  //   New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDirector, setNewMovieDirector] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieAiring, setIsNewMovieAiring] = useState(false);

  // Update Movie
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

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

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

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

    getMovieList();
  }, [onSubmitMovie]);

  return (
    <>
      <div className="submit-movie">
        <input
          className="input-box"
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className="input-box"
          type="text"
          placeholder="Director"
          onChange={(e) => setNewMovieDirector(e.target.value)}
        />
        <input
          className="input-box"
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <div>
          <input type="checkbox" checked={isNewMovieAiring} onChange={(e) => setIsNewMovieAiring(e.target.checked)} />
          <label>Airing</label> <br />
        </div>

        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div className="movie-list">
        {movieList.map((movie) => (
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>Release Year: {movie.releaseDate}</p>
            <p>Director: {movie.director}</p>
            <p>
              Airing: <i>{movie.airing ? "Yes" : "No"}</i>
            </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button> <br />
            <input placeholder="New Title..." onChange={(e) => setUpdatedTitle(e.target.value)} type="text" />
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
