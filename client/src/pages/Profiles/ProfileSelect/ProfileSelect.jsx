import { useContext, useState } from 'react';
// context
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';
import { CurrentProfileContext } from '../../../context/profiles/CurrentProfileContext';

// utils
import { ROUTES } from '../../../utils/navigation';
import { useHistory } from 'react-router';

// styles
import { UserIcon, Wrapper } from './ProfileSelect.styles';

export default function ProfileSelect() {
  const [, setCurrentProfile] = useContext(CurrentProfileContext);
  const [manageMode, setManageMode] = useState(false);
  const { profiles } = useContext(ProfilesStateContext);

  const { push } = useHistory();

  const onSelect = (user) => {
    if (manageMode) return;
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
            <div className="profiles__avatarWrapper">
              <UserIcon
                onClick={() => onSelect(user)}
                key={user.id}
                userImg={user.imgUrl}
              >
                <div className="profile__userImage" alt={user.name} />
                <span className="profile__name">{user.name}</span>
              </UserIcon>
            </div>
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
