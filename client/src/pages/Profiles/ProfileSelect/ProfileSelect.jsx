import { useContext, useState, useMemo } from 'react';

// components
import Nav from '../../../components/shared/Layout/Navbar/Nav';

// context
import {
  ProfilesDispatchContext,
  ProfilesStateContext,
} from '../../../context/profiles/profilesContext';
import { SELECT_PROFILE } from '../../../reducers/ProfilesReducer/profilesReducerTypes';

// utils
import { ROUTES } from '../../../utils/navigation';
import { useHistory } from 'react-router';

// icons
import PencilIcon from '@material-ui/icons/Create';
import PlusIcon from '@material-ui/icons/AddCircleSharp';

// styles
import { UserIcon, Wrapper } from './ProfileSelect.styles';

export default function ProfileSelect({ location: { state } }) {
  const [manageMode, setManageMode] = useState(() => {
    return state?.manageModeProps ? true : false;
  });

  const { profiles, maxProfileLength } = useContext(ProfilesStateContext);
  const dispatch = useContext(ProfilesDispatchContext);

  const { push } = useHistory();

  const onSelect = (user) => {
    if (manageMode) {
      return push({
        pathname: ROUTES.MANAGE_PROFILE,
        state: {
          profile: user,
        },
      });
    }

    dispatch({ type: SELECT_PROFILE, payload: user });
    push(ROUTES.BROWSE_ALL);
  };

  const onRedirectCreateMode = () => {
    push(ROUTES.CREATE_PROFILE);
  };

  const remainingProfileSlots = useMemo(
    () => maxProfileLength - profiles.length,
    [profiles, maxProfileLength]
  );

  return (
    <>
      <Nav logoOnly />

      <Wrapper manageMode={manageMode} id="profileSelect__wrapper">
        <div className="profiles__container">
          <div className="profiles__gateLabel">Who's Watching?</div>

          <ul className="profiles__list">
            {profiles?.map((user) => (
              <UserIcon
                onClick={() => onSelect(user)}
                manageMode={manageMode}
                key={user.id}
                userImg={user.imgUrl}
              >
                <div className="profiles__avatarWrapper">
                  <div className="profile__userImage" alt={user.name} />
                  {manageMode && (
                    <div className="profiles__pencilIcon--overlay">
                      <PencilIcon
                        className="profile__pencilIcon"
                        fontSize="small"
                      />
                    </div>
                  )}
                </div>
                <span className="profile__name">{user.name}</span>
              </UserIcon>
            ))}

            {/* netflix just shows 1 extra profile slot next to existing ones to create. */}
            {/*  previous approach was really nice but not accuracte:
                        const remainingProfileSlots = [
                         ...Array(maxProfileLength - profiles.length).keys(),
                      ];
                      remainingProfileSlots.map((_, idx) => <UserIcon>...etc</UserIcon>)
           */}

            {remainingProfileSlots !== 0 ? (
              <UserIcon
                onClick={onRedirectCreateMode}
                manageMode={false}
                isCreateProfile
              >
                <div className="profiles__avatarWrapper">
                  <div className="profile__userImage" alt="add profile" />
                  <div className="profiles__pencilIcon--overlay">
                    <PlusIcon className="profile__addIcon" fontSize="large" />
                  </div>
                </div>
                <span className="profile__name">Add Profile</span>
              </UserIcon>
            ) : (
              <></>
            )}
          </ul>
          <div
            className="manage__button"
            onClick={() => setManageMode(!manageMode)}
          >
            {!manageMode ? 'MANAGE PROFILES' : 'DONE'}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
