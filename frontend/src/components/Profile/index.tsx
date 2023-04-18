import React from 'react';
import './Profile.scss';
import { icons } from '@utils/constants';
import { useAuthContext } from '@context/authContext';
import Item from '@components/Profile/Item';

const Profile: React.FC = () => {
  const { user } = useAuthContext();
  const [editting, setEditting] = React.useState(false);
  return (
    <div className="profile">
      <button className="profile__btn-edit">
        <img src={icons.editUser} alt="edit" />
        Edit Profile
      </button>
      <p className="profile__about limit">{user.about}</p>
      <Item icon={icons.userIcon} label="Name" content={user.username} />
      <Item icon={icons.phone4} label="Phone Number" content={user.phone} />
      <Item icon={icons.tag} label="User Name" content={`@${user.username}`} />
    </div>
  );
};

export default Profile;
