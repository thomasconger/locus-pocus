import csrfFetch from "./csrf"

// action constants

const RECEIVE_RESPONSE = 'responses/receiveResponse'
const RECEIVE_RESPONSES = 'responses/receiveResponses'
const CLEAR_RESPONSES = 'responses/clearResponses'

// action creators

export const receiveResponse = (response) => {
  return {
    type: RECEIVE_RESPONSE,
    payload: {[response.id]: response}
  }
}

export const receiveResponses = (responses) => {
  return {
    type: RECEIVE_RESPONSES,
    payload: responses
  }
}

export const clearResponses = () => {
  return {
    type: CLEAR_RESPONSES,
    payload: {}
  }
}


// thunk action creators

export const createResponse = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/responses', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveResponse(data.response))
  }
  return response
}

export const fetchResponses = (activity_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/responses/${activity_id}`)
  const data = await response.json();
  const formatted = data.reduce((a,v)=>({...a, [v.id]: v}),{});
  if (response.ok) {
    dispatch(receiveResponses(formatted))
  }
}


// reducer

const initialState = {}

const responseReducer = (state = initialState, action ) => {
  switch (action.type) {
    case RECEIVE_RESPONSE:
      return {...state, ...action.payload};
    case RECEIVE_RESPONSES:
      return {...state, ...action.payload};
    case CLEAR_RESPONSES:
      return {};
    default:
      return state;
  }
}

export default responseReducer
