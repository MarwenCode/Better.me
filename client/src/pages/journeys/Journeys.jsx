import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOwnJourneys, createJourney } from '../../redux/journeySlice/journeySlice';
import "./journeys.scss";

const Journeys = () => {
  const dispatch = useDispatch();
  const journeys = useSelector((state) => state.journeys.journeys);
  const status = useSelector((state) => state.journeys.status);
  const error = useSelector((state) => state.journeys.error);

  const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur depuis le local storage
  const userId = user ? user.id : null;

  const fetchJourneys = useCallback(() => {
    if (userId) {
      console.log('Dispatching fetchOwnJourneys for user ID:', userId);
      dispatch(fetchOwnJourneys(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchJourneys();
  }, [fetchJourneys]);

  const handleCreateJourney = (title, description) => {
    if (userId) {
      console.log('Dispatching createJourney with:', { title, description, user_id: userId });
      dispatch(createJourney({ title, description, user_id: userId }));
    }
  };

  return (
    <div className="journies-container">
      <div className="journeys-list">
        <h1>My Journeys</h1>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>{error}</p>}
        {status === 'succeeded' && journeys.length === 0 && <p>No journeys found.</p>}
        {status === 'succeeded' && journeys.length > 0 && (
          <ul>
            {journeys.map((journey) => (
              <li key={journey.goal_id} className="journey-card">
                <h2>{journey.title}</h2>
                <p>{journey.description}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${journey.progress}%` }}></div>
                </div>
                <div className="progress-percent">{journey.progress}%</div>
                <Link to={`/journey/${journey.goal_id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="journey-form">
        <h2>Add New Journey</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          handleCreateJourney(title, description);
        }}>
          <input type="text" name="title" placeholder="Title" required />
          <input type="text" name="description" placeholder="Description" required />
          <button type="submit">Create Journey</button>

        </form>
      </div>
    </div>
  );
  
};

export default Journeys;

