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

// icons
import CheckIcon from '@material-ui/icons/Check';

// styles
import { Wrapper } from './ProfileCreate.styles';
import { ADD_PROFILE } from '../../../reducers/ProfilesReducer/profilesReducerTypes';

export default function ProfileCreate() {
  const { maxProfileLength, profiles } = useContext(ProfilesStateContext);
  const dispatch = useContext(ProfilesDispatchContext);

  /* in netflix a user doesn't get to pick image in profile creation, 
  instead it selects an image that hasn't already been used starting from index 0.*/

  const getImage = () => {
    const usedImages = {};

    profiles.map(({ imgUrl }) => (usedImages[imgUrl] = true));
    console.log({ usedImages });
    for (const image of Object.values(IMAGES)) {
      if (!(image in usedImages)) return image;
    }
  };

  const [userToCreate, setUserToCreate] = useState({
    name: '',
    isKid: false,
    imgUrl: getImage(),
  });

  const { push } = useHistory();

  const handleInputChange = ({ target: { name, value } }) => {
    setUserToCreate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleIsKid = () => {
    setUserToCreate((prevState) => ({
      ...prevState,
      isKid: prevState.isKid ? false : true,
    }));
  };

  const handleCreate = async () => {
    if (maxProfileLength === profiles?.length) return;

    const createdUser = {
      ...userToCreate,
      id: getRandomId(Math.floor(Math.random() * 100) + 98),
      language: 'English',
      list: [],
    };

    await dispatch({ type: ADD_PROFILE, payload: createdUser });
    push(ROUTES.SELECT_PROFILE);
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
                  src={userToCreate.imgUrl}
                  alt="Profile Avatar"
                  className="avatar__img"
                />
              </div>
            </div>

            <div className="manageProfile__add--parent">
              <div className="manageProfile__edit--inputs">
                <label
                  htmlFor="name"
                  aria-label="Name"
                  className="manageProfile__name--label"
                >
                  Profile Name
                </label>

                <input
                  placeholder="Name"
                  name="name"
                  value={userToCreate.name}
                  onChange={handleInputChange}
                />

                <div className="manageProfile__optionWrapper">
                  <div className="optionWrapper__addKids--option">
                    <input type="checkbox" />
                    <label htmlFor="isKid" onClick={toggleIsKid}>
                      {userToCreate.isKid && (
                        <div>
                          <CheckIcon className="option__checkIcon" />
                        </div>
                      )}
                    </label>
                    <span tabIndex={0}>Kid?</span>
                  </div>
                </div>
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
