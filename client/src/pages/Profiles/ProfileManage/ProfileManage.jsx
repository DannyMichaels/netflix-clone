import { ROUTES } from '../../../utils/navigation';
import { Redirect } from 'react-router-dom';
import { Wrapper } from './ProfileManage.styles';
import Nav from '../../../components/shared/Layout/Navbar/Nav';

export default function ProfileManage({ location: { state } }) {
  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

  const { profile } = state;

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
                    src={profile.imgUrl}
                    alt={profile.name}
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
