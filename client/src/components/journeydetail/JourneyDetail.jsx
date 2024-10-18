import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJourneyById, fetchSteps, addStep } from "../../redux/journeySlice/journeySlice";
import ModalStep from "./ModalStep";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./journeydetail.scss";

const JourneyDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const journey = useSelector((state) => state.journeys.journey);
  const steps = useSelector((state) => state.journeys.steps);

  const [newStep, setNewStep] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  // Fetch journey and steps data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchJourneyById(id));
      dispatch(fetchSteps(id));
    }
  }, [dispatch, id]);

  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      dispatch(addStep({ goal_id: id, description: newStep }))
        .then(() => {
          setNewStep("");
        });
    }
  };

  const handleOpenModal = (step) => {
    setSelectedStep(step);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStep(null);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="journey-detail-container">
      <div className="journey-detail-header">
        <AiOutlineArrowLeft onClick={goBack} className="back-icon" />
        <h1>Your Journey Starts Here</h1>
      </div>

      {journey && (
        <div className="journey-detail-content">
          <h2>{journey.title}</h2>
          <p>{journey.description}</p>
        </div>
      )}

      {/* Steps List */}
      <div className="steps-list">
        <h3>Steps to Achieve This Goal:</h3>
        <div className="add-step">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="New Step"
          />
          <button onClick={handleAddStep}>Add Step</button>
        </div>
        <ul>
          {steps.map((step) => (
            <li key={step.step_id}>
              <div className="step-description">{step.description}</div>
              <div className="step-actions">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => { /* Add logic to toggle step completion */ }}
                />
                <span onClick={() => handleOpenModal(step)}>View Details</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Step Details */}
      {showModal && selectedStep && (
        <ModalStep step={selectedStep} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default JourneyDetail;
