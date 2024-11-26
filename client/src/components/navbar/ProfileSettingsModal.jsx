import React from "react";
import "./profilesettingsModal.scss";

const ProfileSettingsModal = ({ onClose }) => {
  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal-container">
        <button className="settings-close-icon" onClick={onClose}>
          X
        </button>
        <h2 className="settings-modal-title">Settings</h2>
        <form>
          <div className="settings-form-group">
            <label className="settings-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="settings-input"
            />
          </div>
          <div className="settings-form-group">
            <label className="settings-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="settings-input"
            />
          </div>
          <div className="settings-form-group">
            <label className="settings-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="settings-input"
            />
          </div>
          <button type="submit" className="settings-submit-button">
            Change Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
