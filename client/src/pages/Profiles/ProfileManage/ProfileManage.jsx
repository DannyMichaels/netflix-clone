import { useEffect, useState } from 'react';

// utils
import { ROUTES } from '../../../utils/navigation';
import { Redirect } from 'react-router-dom';

// components
import { Wrapper } from './ProfileManage.styles';
import Nav from '../../../components/shared/Layout/Navbar/Nav';
import EditProfileForm from '../../../components/ProfileComponents/Management/EditProfileForm';
import DeleteProfile from '../../../components/ProfileComponents/Management/DeleteProfile';

export default function ProfileManage({ location: { state } }) {
  const [profileFormData, setProfileFormData] = useState(null);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [manageMode, setManageMode] = useState('edit');

  const { profile } = state;

  useEffect(() => {
    if (Object.keys(profile) === 0) return;

    const { isKid, name, imgUrl, language } = profile;
    setProfileFormData({ name, isKid, image: imgUrl, language });
  }, [profile]);

  const handleChange = ({ target: { name, value } }) => {
    setProfileFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!state) return <Redirect to={ROUTES.SELECT_PROFILE} />;

  const stateProps = {
    profileFormData,
    setProfileFormData,
    handleChange,
    profile,
    setIsDropdownShowing,
    isDropdownShowing,
    setManageMode,
  };

  const manageJSX =
    manageMode === 'edit' ? (
      <EditProfileForm stateProps={stateProps} />
    ) : (
      <DeleteProfile stateProps={stateProps} />
    );

  return (
    <>
      <Nav onlyLogo />
      <Wrapper isDropdownShowing={isDropdownShowing}>
        <div className="manageProfile__centeredDiv">{manageJSX}</div>
      </Wrapper>
    </>
  );
}
