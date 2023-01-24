import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchResponse, deleteResponse, updateResponse } from '../store/responses';
import './EditResponse.css'


const EditResponse = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const response = useSelector(state => ( state.responses?.[id]))
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([])

  useEffect(()=>{
    dispatch(fetchResponse(id))
  }

  ,[id])

  const [responseBody, setResponseBody] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteResponse(id));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseBodyIsEmpty = (responseBody == '')
    if (responseBodyIsEmpty) {
      setErrors(['Responses cannot be blank'])
      setSuccess([])
    } else {
      dispatch(updateResponse(id, {
        body: responseBody
      }))
      setErrors([])
      setSuccess(['Success'])
    }
    // setSuccess(['Success'])
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
         <ul>
            {errors?.map(error => <li className="login-error-item" key={error}>{error}</li>)}
          </ul>
          <br></br>
        <ul>
          {success?.map(success => <li className="success" key={success}>{success}</li>)}
        </ul>

        <h1>Edit Response</h1>
        <br></br>
        <form className={'response-edit-form'}onSubmit={handleSubmit}>
          <label>
            <input value={responseBody} onChange={(e)=>{setResponseBody(e.target.value)}}/>
          </label>
          <button>Submit</button>
        </form>
        <br/>
        <button className={'activity-button'} onClick={handleDelete}>Delete</button>
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
