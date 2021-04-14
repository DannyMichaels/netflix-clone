import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';

// components
import Nav from '../../../components/shared/Layout/Navbar/Nav';

// context
import {
  ProfilesDispatchContext,
  ProfilesStateContext,
} from '../../../context/profiles/profilesContext';

// utils
import { getRandomId } from '../../../utils/generateId';
import { ROUTES } from '../../../utils/navigation';
import { IMAGES } from '../../../utils/generalUtils';

// styles
import { Wrapper } from './ProfileCreate.styles';
import { ADD_PROFILE } from '../../../reducers/ProfilesReducer/profilesReducerTypes';

export default function ProfileCreate() {
  const { maxProfileLength, profiles } = useContext(ProfilesStateContext);
  const dispatch = useContext(ProfilesDispatchContext);

  const [userToCreate, setUserToCreate] = useState({
    name: '',
    isKid: false,
    image: IMAGES.YELLOW_AVATAR,
  });

  const { push } = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setUserToCreate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const createdUser = {
      ...userToCreate,
      id: getRandomId(Math.floor(Math.random() * 100) + 98),
    };

    await dispatch({ type: ADD_PROFILE, payload: createdUser });
  };

  if (maxProfileLength === profiles?.length) {
    return <Redirect to={ROUTES.SELECT_PROFILE} />;
  }

  return (
    <>
      <Nav logoOnly />
      <Wrapper>
        <div className="manageProfile__actionsContainer">
          <h1>Add Profile</h1>
          <h2>Add a profile for another person watching Netflix.</h2>

          <div className="manageProfile__metaData entry">
            <div className="profile__avatar">
              <div className="avatar__box">
                <img
                  src={userToCreate.image}
                  alt="Profile Avatar"
                  className="avatar__img"
                />
              </div>
            </div>

            <div className="manageProfile__add--parent">
              <div className="manageProfile__edit--inputs">
                <label htmlFor="name">Profile Name</label>
                <input
                  placeholder="Name"
                  name="name"
                  value={userToCreate.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

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
