import { useContext } from 'react';
import { useHistory } from 'react-router';
import { ProfilesDispatchContext } from '../../../context/profiles/profilesContext';
import { UPDATE_PROFILE } from '../../../reducers/ProfilesReducer/profilesReducerTypes';
import { languages } from '../../../utils/generalUtils';
import { makeArrayFromString } from '../../../utils/makeArrayFromString';
import { ROUTES } from '../../../utils/navigation';

export default function EditProfileForm({ stateProps }) {
  const dispatch = useContext(ProfilesDispatchContext);
  const { push } = useHistory();

  const {
    profileFormData,
    setProfileFormData,
    handleChange,
    profile,
    isDropdownShowing,
    setIsDropdownShowing,
    setManageMode,
  } = stateProps;

  const listItemLanguages = makeArrayFromString(languages, 'matchOnlyLetters');

  const toggleDropdown = () => {
    setIsDropdownShowing(isDropdownShowing ? false : true);
  };

  const onSave = async () => {
    const updatedProfile = {
      ...profile,
      ...profileFormData,
    };

    await dispatch({
      type: UPDATE_PROFILE,
      payload: updatedProfile,
    });

    push(ROUTES.SELECT_PROFILE);
  };

  return (
    <div className="manageProfile__actionsContainer">
      <h1>Edit Profile</h1>

      {/*  */}
      <div className="manageProfile__metaData entry">
        <div className="profile__avatar">
          <div className="avatar__box">
            <img
              src={profileFormData?.imgUrl}
              alt={profileFormData?.name}
              className="avatar__img"
            />
          </div>
        </div>

        <div className="manageProfile__edit--parent">
          <div className="manageProfile__edit--inputs">
            <label htmlFor="name">Profile Name</label>
            <input
              name="name"
              value={profileFormData?.name}
              onChange={handleChange}
            />
          </div>

          <div className="manageProfile__edit--dropdowns">
            <div className="manageProfile__edit--dropdown">
              <h2 className="manageProfile__dropdown--label">Language:</h2>

              <div cols={2} className="manageProfile__dropdown--nfDropDown">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownShowing}
                  className="manageProfile__dropdown--header"
                >
                  {profileFormData?.language}

                  <span className="manageProfile__dropdown--arrow" />
                </div>

                <div className="manageProfile__dropdown--submenu">
                  <ul>
                    {listItemLanguages.map((text, idx) => (
                      <li
                        name="language"
                        key={idx}
                        onClick={() => {
                          setProfileFormData((prevState) => ({
                            ...prevState,
                            language: text,
                          }));
                          setIsDropdownShowing(false);
                        }}
                      >
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons__container">
        <button className="profile__button" onClick={onSave}>
          SAVE
        </button>
        <button
          className="profile__button"
          onClick={() => push(ROUTES.SELECT_PROFILE)}
        >
          CANCEL
        </button>

        <button
          className="profile__button"
          onClick={() => setManageMode('delete')}
        >
          DELETE PROFILE
        </button>
      </div>
    </div>
  );
}
