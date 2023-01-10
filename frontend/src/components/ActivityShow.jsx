import './ActivityShow.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchActivity, deleteActivity, updateActivity } from '../store/activities';


// Make the default values of from informed by state
//

const ActivityShow = () => {
  const dispatch = useDispatch();
  let params = useParams();
  let activity = useSelector((state) => state.activities[params.id])

  const [formOptions, setFormOptions] = useState({});
  const [prompt, setPrompt] = useState("")

  useEffect(()=>{
    dispatch(fetchActivity(params.id))
    console.log("in use effect")
    if (activity?.options) {
      setFormOptions({...JSON.parse(activity.options)})
      setPrompt(activity.prompt)
    }
  },[params, activity?.options])

  let options

  if (activity?.options) {
    options = Object.entries(JSON.parse(activity.options))
  }


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteActivity(params.id));
  }

  const handleFormChange = (e, i) => {
   setFormOptions({...formOptions, [`option${i+1}`]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateActivity(params.id, {
      "prompt": prompt,
      "options": JSON.stringify(formOptions)
    }))
  }

  return (
    <>
    <div className="activity-show-wrapper">
      <h1>Activity Show<Link to="/dashboard"> back </Link></h1>
      <button onClick={handleDelete}>Delete</button>
      <form className="activity-show-edit" onSubmit={handleSubmit}>
        <input value={prompt} onChange={(e)=> setPrompt(e.target.value)} />
        {
          options?.map((option, i)=>{return (<input key={i} value={formOptions?.[`option${i+1}`]} onChange={(e)=>{handleFormChange(e, i)}}/>)})
        }
        <button>Update</button>
      </form>


    </div>

    </>
  )
}

export default ActivityShow
