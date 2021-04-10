import { useContext, useState } from 'react';

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

  const remainingProfileSlots = [
    ...Array(maxProfileLength - profiles.length).keys(),
  ];

  return (
    <Wrapper manageMode={manageMode}>
      <div className="profiles__container">
        <div className="profiles__gateLabel">Who's Watching?</div>

        <ul className="profiles__list">
          {profiles.map((user) => (
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

          {remainingProfileSlots.map((user) => (
            <UserIcon onClick={() => onSelect(user)} manageMode={manageMode}>
              <div className="profiles__avatarWrapper">
                <div className="profile__userImage" alt="add profile" />
              </div>
              <span className="profile__name">Add Profile</span>
            </UserIcon>
          ))}
        </ul>
        <div
          className="manage__button"
          onClick={() => setManageMode(!manageMode)}
        >
          {!manageMode ? 'MANAGE PROFILES' : 'DONE'}
        </div>
      </div>
    </Wrapper>
  );
}
