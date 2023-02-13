import csrfFetch from "./csrf"

// action constants

const RECEIVE_RESPONSE = 'responses/receiveResponse'
const RECEIVE_RESPONSES = 'responses/receiveResponses'
const CLEAR_RESPONSES = 'responses/clearResponses'
const FILTER_RESPONSES = 'responses/filterResponses'

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

export function filterResponses (activityId) {
  return {
    type: FILTER_RESPONSES,
    payload: activityId
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

export const fetchResponses = (id) => async (dispatch) => {
  // this is using the activity id
  const response = await csrfFetch(`/api/responses/${id}`)
  const data = await response.json();
  const formatted = data.reduce((a,v)=>({...a, [v.id]: v}),{});
  if (response.ok) {
    dispatch(receiveResponses(formatted))
  }
}

export const fetchResponse = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/responses/${id}`)
  const data = await response.json();
  if (response.ok) {
    dispatch(receiveResponse(data))
  }
}

export const deleteResponse = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/responses/${id}`, {
    "method": "DELETE",
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(clearResponses())
  }
}

export const updateResponse = (id, response) => async (dispatch) => {
  const res = await csrfFetch(`/api/responses/${id}`,{
    method: 'PATCH',
    body: JSON.stringify(response)
  })
  const data = await res.json();
  if (res.ok) {
    dispatch(receiveResponse(data.response))
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
    case FILTER_RESPONSES:
      const filteredAsArray = Object.entries(state).filter(entry => entry[1].activityId !== action.payload)
      const filteredAsObject = filteredAsArray.reduce((acc,entry) => {
        return { ...acc, [entry[1].id]: entry[1]}
      }, {})
      return filteredAsObject
    default:
      return state;
  }
}

export default responseReducer
