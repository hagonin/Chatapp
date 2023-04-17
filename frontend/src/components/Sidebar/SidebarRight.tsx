import React from 'react';
import './SideBar.scss';
import { icons, imgs } from '@utils/constants';
import { OptionCard, UserInfoCard } from '@components/Common';
import { useMainContext } from '@context/mainContext';
interface Props {
  isActive: boolean;
  toggleSideBarRight: () => void;
}

const SidebarRight: React.FC<Props> = ({ isActive, toggleSideBarRight }) => {
  const { changeType } = useMainContext();

  return (
    <div
      className={`sideBar__right ${isActive ? 'sideBar__right--active' : ''}`}
    >
      <div className="sideBar__header">
        <h2 className="sideBar__heading">Settings</h2>
        <UserInfoCard
          name="David"
          avatar={imgs.user2}
          phone="12345"
          tag="@tag"
        />
      </div>
      <OptionCard
        label="Edit Profile"
        icon={icons.profile}
        active={false}
        onClick={() => {
          changeType({ title: 'Profile', containerType: 'profile' });
          toggleSideBarRight();
        }}
      />
      <OptionCard
        label="Notifications"
        icon={icons.notifi}
        active={false}
        onClick={() => {
          changeType({ title: 'Notification', containerType: 'notification' });
          toggleSideBarRight();
        }}
      />
      {/* <OptionCard
        label="Privacy and security"
        icon={icons.privacy}
        active={false}
      /> */}
      {/* <OptionCard label="Chat settings" icon={icons.settings} active={true} /> */}
    </div>
  );
};

export default SidebarRight;
