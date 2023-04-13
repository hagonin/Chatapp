import React from 'react';
import './Profile.scss';
import { icons } from '@utils/constants';
import UserInfoCard from '@components/Profile/UserInfoCard';

interface Props {
  avatar: string;
  username: string;
  about: string;
  phone: string;
}

const Profile: React.FC<Props> = ({ avatar, username, about, phone }) => (
  <div className="profile">
    <img src={avatar} alt="avatar" className="profile__avatar" />
    <h3 className="profile__username">{username}</h3>
    <button className="profile__btn-edit">
      <img src={icons.editUser} alt="edit" />
      Edit Profile
    </button>
    <p className="profile__about limit">{about}</p>
    <UserInfoCard icon={icons.userIcon} label="Name" content={username} />
    <UserInfoCard icon={icons.phone4} label="Phone Number" content={phone} />
    <UserInfoCard icon={icons.tag} label="User Name" content={`@${username}`} />
  </div>
);

export default Profile;
