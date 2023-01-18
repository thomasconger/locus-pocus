import csrfFetch from "./csrf";
import { receiveResponses } from "./responses";
// action constants

const RECEIVE_ACTIVITY = 'activity/receiveActivity'
const REMOVE_ACTIVITY = 'activity/removeActivity'
const RECEIVE_ACTIVITIES = 'activity/receiveActivities'
// action creators

export const receiveActivity = (activity) => {
  return {
    type: RECEIVE_ACTIVITY,
    payload: {[activity.id]: activity}
  }
}

export const receiveActivities = (activities) => {
  return {
    type: RECEIVE_ACTIVITIES,
    payload: activities
  }
}

export const removeActivity = (id) => {
  return {
    type: REMOVE_ACTIVITY,
    payload: id
  }
}


// custom selectors


// thunk action creators

export const createActivity = (activity) => async (dispatch) => {
  const response = await csrfFetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(activity)
    }
  )
  const data = await response.json();

  if (response.ok) {
    dispatch(receiveActivity(data.activity))
  }

  return response;
}

export const updateActivity = (id, activity) => async (dispatch) => {
  const response = await csrfFetch(`/api/activities/${id}`,{
    method: 'PATCH',
    body: JSON.stringify(activity)
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveActivity(data.activity))
  }

  return response;
}

export const fetchActivities = ( userId ) => async (dispatch) => {
  const response = await csrfFetch('/api/activities')
  const data = await response.json();
  const formatted = data.reduce((a,v)=>({...a, [v.id]: v}),{});
  if (response.ok) {
    dispatch(receiveActivities(formatted))
  }
  return response;
}

export const fetchActivity = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/activities/${id}`)
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveActivity(data.activity))
    dispatch(receiveResponses(data.responses))
  }
  return response;
}

export const deleteActivity = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/activities/${id}`, {
    "method": "DELETE",
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(removeActivity(id));
  }
  return response;
}

// possible initial state

// Reducer

const initialState = {}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITY:
      return {...state, ...action.payload};
    case RECEIVE_ACTIVITIES:
      return {...state, ...action.payload} ;
    case REMOVE_ACTIVITY:
      const newState = {...state};
      delete newState[action.payload.id]
      return newState;
    default:
      return state;
  }
}

export default activityReducer;
