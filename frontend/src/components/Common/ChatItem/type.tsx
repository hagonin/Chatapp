import { User } from '@context/roomContext';

// message
interface MessageGo {
  status: 'sent' | 'delivered' | 'read';
}

interface MessageTo {
  quanlity: number;
  status: 'to';
}

interface MessageInfo {
  message: string;
  timestamp: string;
  type: MessageGo | MessageTo;
}

interface Message {
  message: string;
  timestamp: string;
  type: MessageGo | MessageTo;
  onChatting?: (user: User) => void;
  isActive?: boolean;
}

interface Call {
  onCall: () => void;
}

export interface History {
  type: 'missed' | 'incoming' | 'outgoing';
  timestamp: string;
  onCall?: () => void;
  onWatchHistory?: (user: User) => void;
}

export interface Props {
  id: number;
  avatar: string;
  name: string;
  status: boolean;
  timestamp: string | false;
  message?: Message;
  call?: Call;
  history?: History;
}
