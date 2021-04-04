import { useContext, useState } from 'react';
// context
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';
import { CurrentProfileContext } from '../../../context/profiles/CurrentProfileContext';

// utils
import { ROUTES } from '../../../utils/navigation';
import { useHistory } from 'react-router';

// styles
import { Wrapper } from './ProfileSelect.styles';

export default function ProfileSelect() {
  const [, setCurrentProfile] = useContext(CurrentProfileContext);
  const [manageMode, setManageMode] = useState(false);
  const { profiles } = useContext(ProfilesStateContext);

  const { push } = useHistory();

  const onSelect = (user) => {
    if (manageMode) return;
    setCurrentProfile(user);
    localStorage.setItem('currentProfile', JSON.stringify(user));
    push(ROUTES.BROWSE_ALL);
  };

  return (
    <Wrapper manageMode={manageMode}>
      <div className="profiles__container">
        <div className="profiles__gateLabel">Who's Watching?</div>

        <ul className="profiles__list">
          {profiles.map((user) => (
            <li onClick={() => onSelect(user)} key={user.id}>
              <img src={user.imgUrl} alt={user.name} />
              <span className="profile__name">{user.name}</span>
            </li>
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
