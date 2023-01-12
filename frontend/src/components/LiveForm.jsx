import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchActivity } from '../store/activities';
import { createResponse } from '../store/responses';
import { fetchUser, fetchUserLiveActivity } from '../store/users';
import './LiveForm.css'



const LiveForm = () => {

  const dispatch = useDispatch();
  const {userId} = useParams();
  const user = useSelector((state)=>state.users[userId])
  const activity = useSelector((state)=>state.activities[user?.liveActivityId])
  console.log("ACTIVITY")
  console.log(activity)
  const [choice, setChoice] = useState();



  useEffect((e)=>{
    dispatch(fetchUserLiveActivity(userId));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createResponse({
      body: choice,
      activity_id: "1"
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

export default LiveForm
