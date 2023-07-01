import './OptionCard.scss';
import React, { MouseEventHandler } from 'react';

interface Props {
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}
const OptionCard: React.FC<Props> = ({ icon, label, active, onClick }) => {
  return (
    <button
      className={`optionCard ${active ? 'optionCard--active' : ''}`}
      onClick={onClick}
    >
      <span className="optionCard__icon">
        <img src={icon} alt="option icon" />
      </span>
      <span className="optionCard__label">{label}</span>
    </button>
  );
};

export default OptionCard;
