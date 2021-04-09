import { useEffect, useState } from 'react';

// utils
import { ROUTES } from '../../../utils/navigation';
import { Redirect } from 'react-router-dom';

// componenst
import { Wrapper } from './ProfileManage.styles';
import Nav from '../../../components/shared/Layout/Navbar/Nav';

export default function ProfileManage({ location: { state } }) {
  const [profileFormData, setProfileFormData] = useState(null);

  const { profile } = state;

  useEffect(() => {
    if (Object.keys(profile) === 0) return;

    const { isKid, name, imgUrl, language } = profile;
    setProfileFormData({ name, isKid, image: imgUrl, language });
  }, [profile]);

  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

  const onSave = () => {};

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
              <button className="profile__button">SAVE</button>
              <button className="profile__button">CANCEL</button>
              <button className="profile__button">DELETE PROFILE</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
