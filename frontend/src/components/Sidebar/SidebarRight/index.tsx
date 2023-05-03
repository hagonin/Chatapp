import React from 'react';
import '../SideBar.scss';
import { icons, imgs } from '@utils/constants';
import { OptionCard, UserInfoCard } from '@components/Common';
import Profile from '@components/Profile';
import UpdateProfileForm from '@components/Form/UpdateProfileForm';

interface Props {
  isActive: boolean;
  toggleSideBarRight: () => void;
}

const SidebarRight: React.FC<Props> = ({ isActive, toggleSideBarRight }) => {
  const [showProfile, setShowProfile] = React.useState(false);
  const [showUpdateForm, setShowUpdateForm] = React.useState(false);
  React.useEffect(() => {
    !showProfile && setShowUpdateForm(false);
  }, [showProfile]);

  return (
    <div
      className={`sideBar__right ${isActive ? 'sideBar__right--active' : ''}`}
    >
      <button
        className="sideBar__btn-close"
        onClick={() => {
          toggleSideBarRight();
        }}
      >
        X
      </button>
      <div className="sideBar__header">
        <h2 className="sideBar__heading">Settings</h2>
        <UserInfoCard name="David" avatar={imgs.user2} phone="12345" />
      </div>
      <div
        className="option"
        onMouseEnter={() => setShowProfile(true)}
        onMouseLeave={() => setShowProfile(false)}
      >
        <OptionCard
          label="Edit Profile"
          icon={icons.profile}
          active={showProfile}
        />
        {showProfile && (
          <div className="option__sub">
            {showUpdateForm ? (
              <UpdateProfileForm onHideUpdateForm={() => setShowUpdateForm(false)} />
            ) : (
              <Profile onShowUpdateProfile={() => setShowUpdateForm(true)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
