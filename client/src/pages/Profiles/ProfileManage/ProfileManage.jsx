import { useContext, useEffect, useState } from 'react';

// utils
import { ROUTES } from '../../../utils/navigation';
import { Redirect, useHistory } from 'react-router-dom';

// components
import { Wrapper } from './ProfileManage.styles';
import Nav from '../../../components/shared/Layout/Navbar/Nav';
import { ProfilesDispatchContext } from '../../../context/profiles/profilesContext';

// context/reducers
import { UPDATE_PROFILE } from '../../../reducers/ProfilesReducer/profilesReducerTypes';

export default function ProfileManage({ location: { state } }) {
  const [profileFormData, setProfileFormData] = useState(null);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const dispatch = useContext(ProfilesDispatchContext);
  const { profile } = state;
  const { push } = useHistory();

  useEffect(() => {
    if (Object.keys(profile) === 0) return;

    const { isKid, name, imgUrl, language } = profile;
    setProfileFormData({ name, isKid, image: imgUrl, language });
  }, [profile]);

  const toggleDropdown = () => {
    setIsDropdownShowing(isDropdownShowing ? false : true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setProfileFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = async () => {
    await dispatch({
      type: UPDATE_PROFILE,
      payload: {
        ...profile,
        profileFormData,
      },
    });

    push(ROUTES.BROWSE_ALL);
  };

  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

  return (
    <>
      <Nav onlyLogo />
      <Wrapper>
        <div className="manageProfile__centeredDiv">
          <div className="manageProfile__actionsContainer">
            <h1>Edit Profile</h1>

            {/*  */}
            <div className="manageProfile__metaData entry">
              <div className="profile__avatar">
                <div className="avatar__box">
                  <img
                    src={profileFormData?.image}
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
                    <h2 className="manageProfile__dropdown--label">
                      Language:
                    </h2>

                    <div
                      cols={2}
                      className="manageProfile__dropdown--nfDropDown"
                    >
                      <div
                        role="button"
                        tabindex="0"
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownShowing}
                        className="manageProfile__dropdown--header"
                      >
                        {profileFormData?.language}

                        <span className="manageProfile__dropdown--arrow" />
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
              <button className="profile__button">DELETE PROFILE</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
