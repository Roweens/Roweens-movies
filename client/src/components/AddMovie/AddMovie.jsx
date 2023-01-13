import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSingleFileUpload } from '../../features/auth-slice';
import {
  handleMultipleFileUpload,
  uploadMovie,
} from '../../features/movie-slice';
import storage from '../../firebase';
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

  const [uploaded, setUploaded] = useState(0);

  const [movie, setMovie] = useState({});

  const dispatch = useDispatch();

  const upload = (items) => {
    items.forEach((item) => {
      const filename = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress + '%');
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'genres' || e.target.name === 'actors') {
      setMovie({ ...movie, [e.target.name]: e.target.value.split(',') });
    } else setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: imgSmall, label: 'imgSmall' },
      { file: imgBig, label: 'imgBig' },
      { file: trailer, label: 'trailer' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(uploadMovie(movie));
  };

  return (
    <div className={styles.addMovie}>
      <h2 className={styles.addMovieTitle}>Add movie</h2>

      <form className={styles.addMovieForm}>
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
                name="title"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="quote" className={styles.addMovieLabel}>
                Quote
              </label>
              <input
                type="text"
                id="quote"
                name="quote"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="country" className={styles.addMovieLabel}>
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="desc" className={styles.addMovieLabel}>
                Desc
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="year" className={styles.addMovieLabel}>
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="text" className={styles.addMovieLabel}>
                Limits
              </label>
              <input
                type="text"
                id="limits"
                name="limits"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="director" className={styles.addMovieLabel}>
                Director
              </label>
              <input
                type="text"
                id="director"
                name="director"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>
            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="actors" className={styles.addMovieLabel}>
                Actors
              </label>
              <input
                type="text"
                id="actors"
                name="actors"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="genres" className={styles.addMovieLabel}>
                Genres
              </label>
              <input
                type="text"
                id="genres"
                name="genres"
                className={styles.addMovieInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.addMovieInputWrapper}>
              <label htmlFor="duration" className={styles.addMovieLabel}>
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className={styles.addMovieInput}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <label htmlFor="type1">Movie</label>
            </div>
            <div className={styles.addMovieRadioInput}>
              <input
                type="radio"
                name="type"
                id="type2"
                value="series"
                onChange={handleChange}
              />
              <label htmlFor="type2">Series</label>
            </div>
            <div className={styles.addMovieRadioInput}>
              <input
                type="radio"
                name="type"
                id="type3"
                value="anime"
                onChange={handleChange}
              />
              <label htmlFor="type3">Anime</label>
            </div>
          </div>
        </div>
        {uploaded === 3 ? (
          <button
            type="submit"
            className={styles.addMovieFormButton}
            onClick={handleSubmit}
          >
            Add movie
          </button>
        ) : (
          <button
            type="submit"
            className={styles.addMovieFormButton}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
};
