import React from 'react';
import './Profile.scss';
import { icons } from '@utils/constants';
import Item from '@components/Profile/Item';
import { useAppSelector } from '@redux/hook';
import selectUserInfo from '@redux/auth/selector';

interface ProfileProps {
  onShowUpdateProfile: () => void;
}
const Profile: React.FC<ProfileProps> = ({ onShowUpdateProfile }) => {
  const user = useAppSelector(selectUserInfo);
  return (
    <div className="profile">
      <p className="profile__about limit">{user.bio}</p>
      <Item icon={icons.userIcon} label="Name" content={user.username} />
      <Item
        icon={icons.phone4}
        label="Phone Number"
        content={user.phone_number}
      />
      <Item icon={icons.tag} label="User Name" content={`@${user.username}`} />
      <button className="profile__btn-edit" onClick={onShowUpdateProfile}>
        <img src={icons.editUser} alt="edit" />
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
