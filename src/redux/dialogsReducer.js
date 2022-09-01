const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  messagesData: [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'Hello. How are you?' },
    { id: 3, message: 'I am fine thanks! Where are you from?' },
    { id: 4, message: 'I am from Ukraine. And you?' },
    { id: 5, message: 'I am from Mars!' },
    { id: 6, message: 'Oh my God!)' },
  ],
  dialogsData: [
    { id: 1, name: 'Sasha' },
    { id: 2, name: 'Victor' },
    { id: 3, name: 'Marina' },
    { id: 4, name: 'Steve' },
    { id: 5, name: 'Pavel' },
    { id: 6, name: 'Robo' },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newMessageText,
      };

    case SEND_MESSAGE:
      let text = state.newMessageText;
      return {
        ...state,

        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length + 1, message: text },
        ],
        newMessageText: '',
      };

    default:
      return state;
  }
};

export const sendMessage = () => {
  return {
    type: SEND_MESSAGE,
  };
};

export const updateNewMessageText = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: text,
  };
};

export default dialogsReducer;
