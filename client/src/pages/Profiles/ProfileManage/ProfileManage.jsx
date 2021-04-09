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
  const dispatch = useContext(ProfilesDispatchContext);
  const { profile } = state;
  const { push } = useHistory();

  useEffect(() => {
    if (Object.keys(profile) === 0) return;

    const { isKid, name, imgUrl, language } = profile;
    setProfileFormData({ name, isKid, image: imgUrl, language });
  }, [profile]);

  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

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
            </div>
            {/*  */}

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
