import {
  SET_USER_AUTH_DATA,
  WIPE_USER_AUTH_DATA,
  SET_CURRENT_USER_DB_DATA,
  SET_CANDIDATE_USERS,
  ADD_CANDIDATE_USER,
  TOGGLE_MATCH,
} from '../constants/action-types';

const initialState = {
  userAuthData: null,
  userDbData: {
    currentUser: null,
    candidateUsers: [],
  },

  // matched is what renders the "you got a match! modal"
  // if it's not null, it's the user of the person you matched with
  matched: null,
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_USER_AUTH_DATA) {
    return {
      ...state,
      userAuthData: action.payload,
    };
  }
  if (action.type === WIPE_USER_AUTH_DATA) {
    return {
      ...state,
      userAuthData: null,
    };
  }
  if (action.type === SET_CURRENT_USER_DB_DATA) {
    return {
      ...state,
      userDbData: {
        ...state.userDbData,
        currentUser: action.payload,
      },
    };
  }
  if (action.type === SET_CANDIDATE_USERS) {
    return {
      ...state,
      userDbData: {
        ...state.userDbData,
        candidateUsers: action.payload,
      },
    };
  }
  if (action.type === ADD_CANDIDATE_USER) {
    return {
      ...state,
      userDbData: {
        ...state.userDbData,
        candidateUsers: [...state.userDbData.candidateUsers, action.payload],
      },
    };
  }
  if (action.type === TOGGLE_MATCH) {
    return {
      ...state,
      matched: action.payload,
    };
  }
  return state;
}

export default rootReducer;
