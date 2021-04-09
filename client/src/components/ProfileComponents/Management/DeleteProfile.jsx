import React from 'react';

export default function DeleteProfile({ stateProps }) {
  const { profileFormData, setManageMode } = stateProps;

  return (
    <div className="manageProfile__actionsContainer">
      <h1>Delete Profile?</h1>
      <div className="manageProfile__metaData entry">
        <div className="profile__avatar">
          <div className="avatar__box">
            <img
              src={profileFormData?.image}
              alt={profileFormData?.name}
              className="avatar__img"
            />
          </div>

          <div className="profile__name">{profileFormData?.name}</div>
        </div>

        <div className="profile__deleteWarning">
          This profile's history - including My List, ratings and activity -
          will be gone forever, and you won't be able to access it again.
        </div>
      </div>

      <div className="buttons__container">
        <button
          className="profile__button"
          onClick={() => setManageMode('edit')}
        >
          KEEP PROFILE
        </button>

        <button className="profile__button">DELETE PROFILE</button>
      </div>
    </div>
  );
}
