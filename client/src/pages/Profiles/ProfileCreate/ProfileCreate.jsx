import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Nav from '../../../components/shared/Layout/Navbar/Nav';
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';
import { getRandomId } from '../../../utils/generateId';
import { ROUTES } from '../../../utils/navigation';
import { Wrapper } from './ProfileCreate.styles';

export default function ProfileCreate() {
  const { maxProfileLength, profiles } = useContext(ProfilesStateContext);
  const [userToCreate, setUserToCreate] = useState({
    name: '',
    isKid: false,
  });

  const { push } = useHistory();

  if (maxProfileLength === profiles?.length) {
    return <Redirect to={ROUTES.SELECT_PROFILE} />;
  }

  const handleCreate = () => {
    // dispatch
    // redirect

    const createdUser = {
      ...userToCreate,
      id: getRandomId(Math.floor(Math.random() * 100) + 50),
    };
  };

  return (
    <>
      <Nav logoOnly />
      <Wrapper>
        <div className="manageProfile__actionsContainer">
          <div className="buttons__container">
            <button className="profile__button" onClick={handleCreate}>
              SAVE
            </button>
            <button
              className="profile__button"
              onClick={() => push(ROUTES.SELECT_PROFILE)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
