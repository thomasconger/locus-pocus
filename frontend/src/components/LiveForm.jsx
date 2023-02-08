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
  const [choice, setChoice] = useState();
  const [display, setDisplay] = useState(true)


  useEffect((e)=>{
    dispatch(fetchUserLiveActivity(userId));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.liveActivityId)
    dispatch(createResponse({
      body: choice,
      activity_id: user.liveActivityId
    }))
    setDisplay(false)
  }



  return (
    <>
      <div className="response-form-wrapper">
        <div className="response-card">

          { !display && (
            <h2>Thank you for submitting. Please wait for a new question.</h2>
          )}

          { display && (<>
            <h2 className="response-prompt">{activity?.prompt}</h2>
            <form className="response-form" onSubmit={handleSubmit}>
            {activity?.options && Object.values(JSON.parse(activity.options)).map((text, i)=>{
              return (
              <label className="response-input" key={`option${i}`} htmlFor={i}>
                <input id={i} type="radio" checked={text === choice} onChange={e => setChoice(text)}/>
                {text}
              </label>
              )
            })}
            <button className="cta">Submit</button>
          </form>
          </>)}
        </div>
      </div>
    </>
  );
}

export default LiveForm
