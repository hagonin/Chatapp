import { Props as ChatItemProps } from "@components/Common/ChatItem/type";
import { HistoryCardProps } from "@components/Common/HistoryCard";
import { Props as MessageProps } from "@components/Common/MessageCard";
import { imgs } from "@utils/constants";

export const callList: ChatItemProps[] = [
    {
        id: 0,
        name: "Ahmet Kadyrow",
        avatar: imgs.user,
        status: false,
        timestamp: false,
        history: { type: 'incoming', timestamp: 'Today, 16:30 (3:54)' }
    },
    {
        id: 1,
        name: "David",
        avatar: imgs.user,
        status: true,
        timestamp: false,
        history: { type: 'outgoing', timestamp: 'Yesterday, 16:30 (3:54)' }
    },
    {
        id: 2,
        name: "David123",
        avatar: imgs.user,
        status: true,
        timestamp: false,
        history: { type: 'missed', timestamp: 'Today, 16:30 (12:54)' }

    }
]

export const chatList: ChatItemProps[] = [
    {
        id: 0,
        name: "Ahmet Kadyrow",
        avatar: imgs.user,
        status: false,
        timestamp: '12:00',
        message: {
            message: 'Hello',
            timestamp: '12:00',
            type: {
                status: 'to',
                quanlity: 3
            }
        }
    },
    {
        id: 1,
        name: "David",
        avatar: imgs.user,
        status: true,
        timestamp: '13:00',
        message: {
            message: 'Nice to talk with you',
            timestamp: '12:00',
            type: {
                status: 'to',
                quanlity: 12
            }
        }
    },
    {
        id: 2,
        name: "David123",
        avatar: imgs.user,
        status: true,
        timestamp: '08:00',
        message: {
            message: 'How are you. kdkdkd. dkkdkdd kdkdkd kdkdk kdkdk',
            timestamp: '12:00',
            type: {
                status: 'sent',
            }
        }

    },
    {
        id: 3,
        name: "David123233",
        avatar: imgs.user,
        status: false,
        timestamp: '3:00',
        message: {
            message: 'I am doing well. How about you?',
            timestamp: '12:00',
            type: {
                status: 'to',
                quanlity: 1
            }
        }

    }
]

export const friendList: ChatItemProps[] = [
    {
        id: 0,
        name: "Ahmet Kadyrow",
        avatar: imgs.user,
        status: false,
        timestamp: '12:00',
    },
    {
        id: 1,
        name: "David",
        avatar: imgs.user,
        status: true,
        timestamp: '12:00',

    },
    {
        id: 2,
        name: "David123",
        avatar: imgs.user,
        status: true,
        timestamp: '12:00',



    },
    {
        id: 3,
        name: "David123233",
        avatar: imgs.user,
        status: true,
        timestamp: '12:00',



    }
]

export const historyList01: HistoryCardProps[] = [
    {
        id: 0,
        timestamp: 'unanswered',
        type: 'missed',
        date: '27/0/2023',
        time: '12:20'
    },
    {
        id: 1,
        timestamp: 'unanswered',
        type: 'missed',
        date: '27/0/2023',
        time: '12:20'
    },
    {
        id: 2,
        timestamp: 'unanswered',
        type: 'missed',
        date: '27/0/2023',
        time: '12:20'
    },
    {
        id: 3,
        timestamp: 'unanswered',
        type: 'missed',
        date: '27/0/2023',
        time: '12:20'
    }
];

export const chatlist01: MessageProps[] = [
    {
        id: 0,
        message: 'Men ertir size barýan...',
        timestamp: '12:00',
        status: 'read',
        type: 'partner'
    },
    {
        id: 1,
        message: 'Men ertir size barýan sssss...',
        timestamp: '12:00',
        status: 'sent',
        type: 'user'
    },
    {
        id: 2,
        message: 'Men ertir size barýan sssss...',
        timestamp: '12:00',
        status: 'sent',
        type: 'partner'
    },
    {
        id: 3,
        message: 'Men ertir size barýan sssss...',
        timestamp: '12:00',
        status: 'sent',
        type: 'user'
    },
];