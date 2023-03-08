import { Link, useLocation } from 'react-router-dom';

export function Watchpage() {
  const location = useLocation();
  const movie = location.state;

  return (
    <div className="watchpage">
      <div className="video-container">
        <Link to={'/movie/' + movie._id}>
          {' '}
          <i className="fa-solid fa-arrow-left-long back-arrow"></i>
        </Link>
        <video className="video" autoPlay controls src={movie.trailer} />
      </div>
    </div>
  );
}
