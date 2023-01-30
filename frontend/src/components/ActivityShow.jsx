import './ActivityShow.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom'
import { fetchActivity, deleteActivity, updateActivity } from '../store/activities';
import { clearResponses, fetchResponses, receiveResponse } from '../store/responses';
import consumer from '../consumer';



// Make the default values of from informed by state
//

const ActivityShow = () => {
  const dispatch = useDispatch();
  let params = useParams();
  let activity = useSelector((state) => state.activities[params.id])
  let responses = useSelector((state) => (state.responses))
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState([])

  // responses = Object.values(responses).filter((response)=>(response.activityId == params.id))

  const [formOptions, setFormOptions] = useState({});
  const [prompt, setPrompt] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false)


  useEffect(()=>{

    if (activity?.options) {
      setFormOptions({...JSON.parse(activity.options)})
      setPrompt(activity.prompt)
    }

    const subscription  = consumer.subscriptions.create(
      { channel: 'ActivityChannel', id: params.id},
      {
        connected: () => {
          console.log("Connected!")
        },
        received: response => {
          console.log("You've received data!")
          dispatch(receiveResponse(response))

        }
      }
      )
      return () => subscription?.unsubscribe();
    },[ activity?.options ])

    useEffect(()=>{
      dispatch(fetchActivity(params.id));
      // dispatch(fetchResponses(params.id));
      return () => dispatch(clearResponses());
    },[dispatch, params.id])

    if (!sessionUser) return <Redirect to="/login" />;
    let options

    if (activity?.options) {
      options = Object.entries(JSON.parse(activity.options))
    }


    const redirect = (<><Redirect to="/login" /></>)

    const handleDelete = (e) => {
      console.log("handle delete")
      e.preventDefault();
      dispatch(deleteActivity(params.id));
      setShouldRedirect(true)

    }

  const handleFormChange = (e, i) => {
   setFormOptions({...formOptions, [`option${i+1}`]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasNoPrompt = (prompt == '')
    const hasEmptyOption = (Object.values(formOptions).some((item)=>item == ''))

    if (hasNoPrompt) {
      setSuccess([])
      return setErrors(['You must specify a prompt'])
    } else if (hasEmptyOption) {
      setSuccess([])
      return setErrors(['You must provide a value for each option'])
    }

    setErrors([])

    dispatch(updateActivity(params.id, {
      "prompt": prompt,
      "options": JSON.stringify(formOptions)
    }))
    setSuccess(['Success'])
    console.log(success)
  }

  // if (shouldRedirect) {
  //   redirect
  // }

  return (
    <>
    {shouldRedirect && redirect }
    <div className="activity-show-wrapper">
      <div className="activity-show-flex">
        <h1>Activity Show</h1>
        <button>Pretend Clear All Responses</button>
        <Link to="/dashboard"><button className="activity-show-button">back</button></Link>
      </div>
      <ul>
          {errors.map(error => <li className="login-error-item" key={error}>{error}</li>)}
      </ul>
      <ul>
          {success.map(error => <li className="success" key={success}>{success}</li>)}
      </ul>
      <br></br>

      <form className="activity-show-edit" >
        <input className="activity-show-prompt" value={prompt} onChange={(e)=> setPrompt(e.target.value)} />
        {
          options?.map((option, i)=>{return (
          <div className="activity-show-option-wrapper">
            <input className="activity-show-option" key={i} value={formOptions?.[`option${i+1}`]} onChange={(e)=>{handleFormChange(e, i)}}/>
          </div>
          )})
        }
        <div className="activity-show-button-row">
          <button className="activity-show-button" onClick={handleDelete}>Delete</button>
          <button className="activity-show-button-update" onClick={handleSubmit} >Update</button>
        </div>

      </form>
    </div>
    <div className="responses-index-wrapper">
    {/* .filter((response)=>(response.activityId == params.id)). */}
      <h2 className="response-serif"> Edit your activity's responses by clicking on each link → </h2>
      { responses ?
        Object.values(responses).map((response)=>{
          return (<>
            {/* <p>{response.id}</p> */}
            <a href={`/response/${response.id}`} ><p className="responses">{response.body}</p></a>
            {/* <p>{response.createdAt}</p> */}
          </>)
        })
       : "" }
    </div>

    </>
  )
}

export default ActivityShow
