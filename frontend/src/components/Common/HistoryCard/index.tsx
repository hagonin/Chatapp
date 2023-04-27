import React from 'react';
import './HistoryCard.scss';
import { icons, imgs } from '@utils/constants';

export interface HistoryCardProps {
  id: number;
  timestamp: string | 'unanswered';
  type: 'outgoing' | 'coming' | 'missed';
  date: string;
  time: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  timestamp,
  type,
  date,
  time,
}) => {
  return (
    <div className="historyCard">
      <span className="historyCard__dater">Today</span>
      <div className="historyCard__timer">
        <span>
          <img src={imgs.phone} />
          Outgoing voice call at 10:34
        </span>
        <span>12mins</span>
      </div>
    </div>
  );
};

export default HistoryCard;
