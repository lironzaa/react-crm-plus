import { GET_USERS, USERS_LOADING } from '../actions/types';

const intialState = {
  users: null,
  loading: false
}

export default function (state = intialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    default:
      return state
  }
}