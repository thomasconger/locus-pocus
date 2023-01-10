import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchActivity } from '../store/activities';
import { createResponse } from '../store/responses';
import './ResponseForm.css'



const ResponseForm = () => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const activity = useSelector((state)=>state.activities[id])
  const [choice, setChoice] = useState();

  useEffect((e)=>{
    dispatch(fetchActivity(id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createResponse({
      body: choice,
      activity_id: id
    }))
  }



  return (
    <>
      <div className="response-form-wrapper">
        <h1>Response Form</h1>

        <h2>{activity?.prompt}</h2>

        <form className="response-form" onSubmit={handleSubmit}>
          {activity?.options && Object.values(JSON.parse(activity.options)).map((text, i)=>{
            return (
            <label key={`option${i}`} htmlFor={i}>
              <input id={i} type="radio" checked={text === choice} onChange={e => setChoice(text)}/>
              {text}
            </label>
            )
          })}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default ResponseForm
