import { useContext, useState } from 'react';

// context
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';
import { CurrentProfileContext } from '../../../context/profiles/CurrentProfileContext';

// utils
import { ROUTES } from '../../../utils/navigation';
import { useHistory } from 'react-router';

// icons
import PencilIcon from '@material-ui/icons/Create';

// styles
import { UserIcon, Wrapper } from './ProfileSelect.styles';

export default function ProfileSelect({ children }) {
  const [, setCurrentProfile] = useContext(CurrentProfileContext);
  const [manageMode, setManageMode] = useState(false);
  const { profiles } = useContext(ProfilesStateContext);

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

    setCurrentProfile(user);
    localStorage.setItem('selectedProfile', JSON.stringify(user));
    push(ROUTES.BROWSE_ALL);
  };

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
