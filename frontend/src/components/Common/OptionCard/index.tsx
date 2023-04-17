import './OptionCard.scss';
import React, { MouseEventHandler } from 'react';

interface Props {
  icon: string;
  label: string;
  onClick: (type: string) => void;
  active: boolean;
}
const OptionCard: React.FC<Props> = ({ icon, label, onClick, active }) => {
  return (
    <button
      className={`optionCard ${active ? 'optionCard--active' : ''}`}
      onClick={() => onClick('a')}
    >
      <span className="optionCard__icon">
        <img src={icon} alt="option icon" />
      </span>
      <span className="optionCard__label">{label}</span>
    </button>
  );
};

export default OptionCard;
