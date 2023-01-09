import csrfFetch from "./csrf";

// action constants

const RECEIVE_ACTIVITY = 'activity/receiveActivity'
const RECEIVE_ACTIVITIES = 'activity/receiveActivities'

// action creators

export const receiveActivity = (activity) => {
  return {
    type: RECEIVE_ACTIVITY,
    payload: activity
  }
}

export const receiveActivities = (activities) => {
  console.log("in receive activities action creator")
  console.log(activities)
  return {
    type: RECEIVE_ACTIVITIES,
    payload: activities
  }
}

// custom selectors


// thunk action creators

export const createActivity = (activity) => async (dispatch) => {
  console.log("at beginning of create activity")
  const response = await csrfFetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(activity)
    }
  )
  const data = await response.json();
  console.log(data)
  if (response.ok) {
    dispatch(receiveActivity(data.activity))
  }

  return response;
}

export const fetchActivities = ( ) => async (dispatch) => {
  const response = await csrfFetch('/api/activities')
  const data = await response.json();
  const formatted = data.reduce((a,v)=>({...a, [v.id]: v}),{});
  console.log(formatted)
  if (response.ok) {
    dispatch(receiveActivities(formatted))
  }
  return response;
}

// possible initial state

// Reducer

const initialState = {}

const activityReducer = (state = initialState, action) => {
  console.log("in activity reducer")
  switch (action.type) {
    case RECEIVE_ACTIVITY:
      return {...state, [action.payload.id]: action.payload};
    case RECEIVE_ACTIVITIES:
      return {...state, ...action.payload} ;
    default:
      return state;
  }
}

export default activityReducer;
