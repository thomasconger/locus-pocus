import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchResponse, deleteResponse, updateResponse } from '../store/responses';
import './EditResponse.css'


const EditResponse = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const response = useSelector(state => ( state.responses?.[id]))
  console.log("RESPONSE")
  console.log(response)

  useEffect(()=>{
    dispatch(fetchResponse(id))
  }

  ,[id])

  const [responseBody, setResponseBody] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteResponse(id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateResponse(id, {
      body: responseBody
    }))
  }

  useEffect(()=>{
    if (response?.body) {
      setResponseBody(response.body);
    }
  }, [response?.body])

  let content

  if (response) {
    content =
    <>

        <h1>Edit Response</h1>
        <p>{id}</p>

        <form onSubmit={handleSubmit}>
          <label>Response Body:
            <input value={responseBody} onChange={(e)=>{setResponseBody(e.target.value)}}/>
          </label>
          <button>Submit</button>
        </form>
        <br/>
        <button onClick={handleDelete}>Delete</button>
    </>
  } else {
    content =
    <>
    <p>No response with this id found.</p>
    </>
  }



  return (
    <>
      <div className="edit-response-wrapper">
        {content}
      </div>
    </>
  )

}

export default EditResponse
