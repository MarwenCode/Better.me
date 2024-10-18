import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOwnJourneys, createJourney } from '../../redux/journeySlice/journeySlice';
import Sidebar from '../../components/sidebar/SideBar';
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

  const handleCreateJourney = (title, description, startDate, endDate) => {
    if (userId) {
      console.log('Dispatching createJourney with:', { title, description, startDate, endDate, user_id: userId });
      dispatch(createJourney({ title, description, startDate, endDate, user_id: userId }));
    }
  };

  const handleDeleteJourney = (journeyId) => {
    if (userId) {
      console.log('Dispatching deleteJourney for ID:', journeyId);
      dispatch(deleteJourney(journeyId)); // Appel de l'action pour supprimer le voyage
    }
  };

  return (
    <div className="journeys-container">
      <Sidebar />
      <div className="journeys-content">
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

                  {/* Start and End Date */}
                  <div className="journey-dates">
                    <label>Start Date: {journey.startDate || "Not set"}</label>
                    <label>End Date: {journey.endDate || "Not set"}</label>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="delete-journey-button"
                    onClick={() => handleDeleteJourney(journey.goal_id)}
                  >
                    Delete Journey
                  </button>

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
            const startDate = e.target.startDate.value;
            const endDate = e.target.endDate.value;
            handleCreateJourney(title, description, startDate, endDate);
          }}>
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="description" placeholder="Description" required />
            <label>Start Date</label>
            <input type="date" name="startDate" />
            <label>End Date</label>
            <input type="date" name="endDate" />
            <button type="submit">Create Journey</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Journeys;


