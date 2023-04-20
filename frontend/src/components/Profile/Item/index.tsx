import React from 'react';
import './Item.scss';

interface Props {
  icon: string;
  label: string;
  content: string;
}
const Item: React.FC<Props> = ({ icon, label, content }) => (
  <div className="item">
    <img src={icon} alt="user icon" className="item__icon" />
    <span className="item__label">{label}</span>
    <span className="item__content">{content}</span>
  </div>
);

export default Item;
