import { useEffect, useState } from 'react';

// utils
import { ROUTES } from '../../../utils/navigation';
import { Redirect } from 'react-router-dom';

// componenst
import { Wrapper } from './ProfileManage.styles';
import Nav from '../../../components/shared/Layout/Navbar/Nav';

export default function ProfileManage({ location: { state } }) {
  const [userData, setUserData] = useState(null);

  const { profile } = state;

  useEffect(() => {
    if (Object.keys(profile) === 0) return;

    const { isKid, name, imgUrl, language } = profile;
    setUserData({ name, isKid, image: imgUrl, language });
  }, [profile]);

  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

  return (
    <>
      <Nav onlyLogo />
      <Wrapper>
        <div className="manageProfile__centeredDiv">
          <div className="manageProfile__actionsContainer">
            <h1>Edit Profile</h1>
            <div className="manageProfile__metaData entry">
              <div className="profile__avatar">
                <div className="avatar__box">
                  <img
                    src={profile?.imgUrl}
                    alt={profile?.name}
                    className="avatar__img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
