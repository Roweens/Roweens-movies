import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadMovie } from '../../features/movie-slice';
import storage from '../../firebase';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Movie } from '../../types/movie';
import { uploadFile } from '../../types/uploadFile';
import { CustomInput } from '../UI/CustomInput';
import styles from './AddMovie.module.scss';

export const AddMovie = () => {
  const [imgSmall, setImgSmall] = useState<File | null>(null);
  const [imgBig, setImgBig] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(0);
  const [movie, setMovie] = useState<Movie | null>(null);

  const dispatch = useTypedDispatch();

  const upload = (items: Array<uploadFile>) => {
    items.forEach((item: uploadFile) => {
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
              return { ...(prev as Movie), [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (!(e instanceof File)) {
      if (e.target.name === 'genres' || e.target.name === 'actors') {
        setMovie({
          ...(movie as Movie),
          [e.target.name]: e.target.value.split(','),
        });
      } else setMovie({ ...(movie as Movie), [e.target.name]: e.target.value });
    }
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgSmall && imgBig && trailer) {
      upload([
        { file: imgSmall, label: 'imgSmall' },
        { file: imgBig, label: 'imgBig' },
        { file: trailer, label: 'trailer' },
      ]);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (movie)
      dispatch(uploadMovie(movie))
        .then(() => {
          toast.success('Added movie successfuly');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
  };

  return (
    <div className={styles.addMovie}>
      <h2 className={styles.addMovieTitle}>Add movie</h2>

      <form className={styles.addMovieForm}>
        <div className={styles.addMovieMain}>
          <div className={styles.addMovieMainFiles}>
            <CustomInput
              type="file"
              id="imgSmall"
              onChange={(e: File | React.ChangeEvent<HTMLInputElement>) =>
                setImgSmall(e as File)
              }
              label="true"
              labelContent="Small image"
              required
            />
            <CustomInput
              type="file"
              id="imgBig"
              onChange={(e: File | React.ChangeEvent<HTMLInputElement>) =>
                setImgBig(e as File)
              }
              label="true"
              labelContent="Big image"
              required
            />
            <CustomInput
              type="file"
              id="trailer"
              onChange={(e: File | React.ChangeEvent<HTMLInputElement>) =>
                setTrailer(e as File)
              }
              label="true"
              labelContent="Trailer"
              required
            />
          </div>

          <div className={styles.addMovieMainInputs}>
            <CustomInput
              type="text"
              name="title"
              onChange={handleChange}
              label="true"
              labelContent="Title"
              required
            />
            <CustomInput
              type="text"
              name="quote"
              onChange={handleChange}
              label="true"
              labelContent="Quote"
              required
            />
            <CustomInput
              type="text"
              name="country"
              onChange={handleChange}
              label="true"
              labelContent="Country"
              required
            />
            <CustomInput
              type="text"
              name="desc"
              onChange={handleChange}
              label="true"
              labelContent="Description"
              required
            />
            <CustomInput
              type="text"
              name="year"
              onChange={handleChange}
              label="true"
              labelContent="Year"
              required
            />
            <CustomInput
              type="text"
              name="limits"
              onChange={handleChange}
              label="true"
              labelContent="Limits"
              required
            />
            <CustomInput
              type="text"
              name="director"
              onChange={handleChange}
              label="true"
              labelContent="Director"
              required
            />
            <CustomInput
              type="text"
              name="actors"
              onChange={handleChange}
              label="true"
              labelContent="Actors"
              required
            />
            <CustomInput
              type="text"
              name="genres"
              onChange={handleChange}
              label="true"
              labelContent="Genres"
              required
            />
            <CustomInput
              type="text"
              name="duration"
              onChange={handleChange}
              label="true"
              labelContent="Duration"
              required
            />
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
