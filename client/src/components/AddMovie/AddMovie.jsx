import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSingleFileUpload } from '../../features/auth-slice';
import {
  handleMultipleFileUpload,
  uploadMovie,
} from '../../features/movie-slice';
import styles from './AddMovie.module.scss';

export const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('');
  const [genres, setGenres] = useState('');
  const [imgSmall, setImgSmall] = useState(null);
  const [imgBig, setImgBig] = useState(null);
  const [type, setType] = useState('');
  const [country, setCountry] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [year, setYear] = useState('');
  const [limits, setLimits] = useState('');
  const [actors, setActors] = useState('');
  const [director, setDirector] = useState('');

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();

    const genresArr = genres.split(',');
    const actorsArr = actors.split(',');

    const newMovie = {
      title,
      quote,
      desc,
      duration,
      genres: genresArr,
      type,
      year,
      limits,
      actors: actorsArr,
      director,
      country,
    };

    const data1 = new FormData();
    const filename1 = Date.now() + imgSmall.name;
    data1.append('name', filename1);
    data1.append('file', imgSmall);
    newMovie.imgSmall = filename1;
    dispatch(handleSingleFileUpload(data1));

    const data2 = new FormData();
    const filename2 = Date.now() + imgBig.name;
    data2.append('name', filename2);
    data2.append('file', imgBig);
    newMovie.imgBig = filename2;
    dispatch(handleSingleFileUpload(data2));

    const data3 = new FormData();
    const filename3 = Date.now() + trailer.name;
    data3.append('name', filename3);
    data3.append('file', trailer);
    newMovie.trailer = filename3;
    dispatch(handleSingleFileUpload(data3));

    dispatch(uploadMovie(newMovie));
  };

  return (
    <div className={styles.addMovie}>
      <h2 className={styles.addMovieTitle}>Add movie</h2>

      <form className={styles.addMovieForm} onSubmit={handleUpdate}>
        <div className={styles.addMovieMain}>
          <div className={styles.addMovieMainFiles}>
            <div className={styles.addMovieFileInputWrapper}>
              <label htmlFor="imgSmall" className={styles.addMovieFileLabel}>
                Poster
              </label>
              <input
                type="file"
                name="imgSmall"
                id="imgSmall"
                className={styles.addMovieFileInput}
                onChange={(e) => setImgSmall(e.target.files[0])}
              />
            </div>
            <div className={styles.addMovieFileInputWrapper}>
              <label htmlFor="imgBig" className={styles.addMovieFileLabel}>
                Big image
              </label>
              <input
                type="file"
                name="imgBig"
                id="imgBig"
                className={styles.addMovieFileInput}
                onChange={(e) => setImgBig(e.target.files[0])}
              />
            </div>
            <div className={styles.addMovieFileInputWrapper}>
              <label htmlFor="trailer" className={styles.addMovieFileLabel}>
                Trailer
              </label>
              <input
                type="file"
                name="trailer"
                id="trailer"
                className={styles.addMovieFileInput}
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
          </div>
          <div className={styles.addMovieMainInputs}>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="title" className={styles.addMovieLabel}>
                Title
              </label>
              <input
                type="text"
                id="title"
                className={styles.addMovieInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="quote" className={styles.addMovieLabel}>
                Quote
              </label>
              <input
                type="text"
                id="quote"
                className={styles.addMovieInput}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="country" className={styles.addMovieLabel}>
                Country
              </label>
              <input
                type="text"
                id="country"
                className={styles.addMovieInput}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="desc" className={styles.addMovieLabel}>
                Desc
              </label>
              <input
                type="text"
                id="desc"
                className={styles.addMovieInput}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="year" className={styles.addMovieLabel}>
                Year
              </label>
              <input
                type="text"
                id="year"
                className={styles.addMovieInput}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="text" className={styles.addMovieLabel}>
                Limits
              </label>
              <input
                type="text"
                id="limits"
                className={styles.addMovieInput}
                value={limits}
                onChange={(e) => setLimits(e.target.value)}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="director" className={styles.addMovieLabel}>
                Director
              </label>
              <input
                type="text"
                id="director"
                className={styles.addMovieInput}
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="actors" className={styles.addMovieLabel}>
                Actors
              </label>
              <input
                type="text"
                id="actors"
                className={styles.addMovieInput}
                value={actors}
                onChange={(e) => setActors(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="genres" className={styles.addMovieLabel}>
                Genres
              </label>
              <input
                type="text"
                id="genres"
                className={styles.addMovieInput}
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="duration" className={styles.addMovieLabel}>
                Duration
              </label>
              <input
                type="text"
                id="duration"
                className={styles.addMovieInput}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.addMovieRadioWrapper}>
            <div className={styles.addMovieRadioInput}>
              <input
                type="radio"
                name="type"
                id="type1"
                value="movie"
                onChange={(e) => setType(e.target.value)}
                checked={type === 'movie'}
              />
              <label htmlFor="type1">Movie</label>
            </div>
            <div className={styles.addMovieRadioInput}>
              <input
                type="radio"
                name="type"
                id="type2"
                value="series"
                onChange={(e) => setType(e.target.value)}
                checked={type === 'series'}
              />
              <label htmlFor="type2">Series</label>
            </div>
            <div className={styles.addMovieRadioInput}>
              <input
                type="radio"
                name="type"
                id="type3"
                value="anime"
                onChange={(e) => setType(e.target.value)}
                checked={type === 'anime'}
              />
              <label htmlFor="type3">Anime</label>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.addMovieFormButton}>
          Apply changes
        </button>
      </form>
    </div>
  );
};
