import { useContext } from 'react';

// context
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';

//utils
import { COLORS } from '../../../utils/generalUtils';

// styles
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${COLORS.BRIGHT_BLACK};

  .profiles__container {
    max-width: 80%;
  }

  .profiles__gateLabel {
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 30px;

    @media screen and (min-width: 800px) {
      font-size: 3.5vw;
    }
  }

  .profiles__list {
    list-style-type: none;
    margin: 2em 0;
    opacity: 1;
    transition: opacity 0.4s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;

    li {
      img {
        height: 10vw;
        width: 10vw;
        max-height: 200px;
        max-width: 200px;
        min-height: 84px;
        min-width: 84px;
        box-sizing: border-box;
        position: relative;
        text-decoration: none;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 4px;
        border: none;
        border: 0.15em solid transparent;
      }
      &:hover {
        cursor: pointer;

        img {
          border: 0.15em solid #fff;
        }
      }
    }
  }
`;
export default function ProfileSelect() {
  const { profiles } = useContext(ProfilesStateContext);
  return (
    <Wrapper>
      <div className="profiles__container">
        <div className="profiles__gateLabel">Who's Watching?</div>

        <ul className="profiles__list">
          {profiles.map((user) => (
            <li>
              <img src={user.imgUrl} alt={user.name} />
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
