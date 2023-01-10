import csrfFetch from "./csrf"

// action constants

const RECEIVE_RESPONSE = 'post/receiveResponse'

// action creators

const receiveResponse = (response) => {
  return {
    type: RECEIVE_RESPONSE,
    payload: {[response.id]: response}
  }
}


// thunk action creators

export const createResponse = (payload) => async (dispatch) => {
  console.log(payload);
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


// reducer

const initialState = {}

const responseReducer = (state = initialState, action ) => {
  switch (action.type) {
    case RECEIVE_RESPONSE:
      return {...state, ...action.payload};
    case "CONSTANT GOES HERE":
      return "";
    default:
      return state;
  }
}

export default responseReducer
