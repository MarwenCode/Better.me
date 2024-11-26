import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOwnJourneys,
  createJourney,
  deleteJourney,
} from "../../redux/journeySlice/journeySlice";
import SideBar from "../../components/sidebar/SideBar";
import { FaTrashAlt } from "react-icons/fa";
import "./journeys.scss";

const Journeys = () => {
  const dispatch = useDispatch();
  const journeys = useSelector((state) => state.journeys.journeys);
  const status = useSelector((state) => state.journeys.status);
  const error = useSelector((state) => state.journeys.error);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const fetchJourneys = useCallback(() => {
    if (userId) {
      dispatch(fetchOwnJourneys(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchJourneys();
  }, [fetchJourneys]);

  const handleCreateJourney = (title, description, startDate, endDate) => {
    if (userId) {
      // Assurez-vous que startDate et endDate sont au format "YYYY-MM-DD"
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
  
      console.log("Formatted Start Date:", formattedStartDate);
      console.log("Formatted End Date:", formattedEndDate);
  
      dispatch(
        createJourney({
          title,
          description,
          startDate: formattedStartDate,  // Format correct pour l'envoi
          endDate: formattedEndDate,
          user_id: userId,
        })
      );
      setIsModalOpen(false); // Ferme le modal après la création
    }
  };
  

  const handleDeleteJourney = (journeyId) => {
    dispatch(deleteJourney(journeyId))
      .unwrap()
      .then(() => {
        dispatch(fetchOwnJourneys());
      })
      .catch((error) => {
        console.error("Error in deleting journey:", error);
      });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="journeys-container">
      <SideBar />
      <div className="journeys-content">
        <div className="journeys-list">
          <h1>My Journeys</h1>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>{error}</p>}
          {status === "succeeded" && journeys.length === 0 && (
            <p>No journeys found.</p>
          )}
          {status === "succeeded" && journeys.length > 0 && (
            <ul>
              {journeys.map((journey) => (
                <li key={journey.goal_id} className="journey-card">
                  <div
                    className="delete"
                    onClick={() => handleDeleteJourney(journey.goal_id)}>
                    <FaTrashAlt className="delete-icon" />
                    <div className="journey-dates">
                      <label>
                        Start Date:
                        {new Date(journey.startDate).toLocaleDateString() ||
                          "Not set"}
                      </label>
                      <label>
                        End Date:
                        {new Date(journey.endDate).toLocaleDateString() ||
                          "Not set"}
                      </label>
                    </div>
                  </div>
                  <h2>{journey.title}</h2>
                  <p>{journey.description}</p>

                  <Link to={`/journey/${journey.goal_id}`}>View Details</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="side">
          <button className="open-modal-button" onClick={toggleModal}>
            + Add a Journey
          </button>
          <div className="infos">
            <div className="personalPage">
              <span>link page logo </span>
            </div>
            <div className="folowers">
              <span>Followers: </span>
            </div>
            <button>floww or unfollow </button>
          </div>
        </div>

        {/* Modal pour créer un nouveau journey */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Create a New Journey</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  const description = e.target.description.value;
                  const startDate = e.target.startDate.value;
                  const endDate = e.target.endDate.value;
                  handleCreateJourney(title, description, startDate, endDate);
                }}>
                <input type="text" name="title" placeholder="Title" required />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  required
                />
                <label>Start Date</label>
                <input type="date" name="startDate" />
                <label>End Date</label>
                <input type="date" name="endDate" />
                <button type="submit">Create Journey</button>
              </form>
              <button className="close-modal-button" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journeys;
