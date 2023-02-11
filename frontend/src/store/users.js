import { receiveActivity } from "./activities"
import csrfFetch from "./csrf"
import { setCurrentUser } from "./session"

// action constants
const RECEIVE_USER = 'users/receiveUser'
const RECEIVE_USERS = 'users/receiveUsers'

// action creators

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    payload: user
  }
}

// thunk action creators

export const fetchUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveUser({[data.user.id]: data.user}))
  }
}

export const fetchUserLiveActivity = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveUser({[data.user.id]: data.user}))
    dispatch(receiveActivity(data.activity))
  }
}

export const updateUserActivity = (userId, activityId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`,{
    "method": "PATCH",
    "body": JSON.stringify({"live_activity_id": activityId})
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(setCurrentUser(data.user))

  }

}


const initialState = {}
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {...state, ...action.payload};
    case RECEIVE_USERS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

export default usersReducer;
