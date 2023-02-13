import './ActivityShow.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom'
import { fetchActivity, deleteActivity, updateActivity, resetResponses, removeActivity } from '../store/activities';
import { clearResponses, fetchResponses, receiveResponse } from '../store/responses';
import consumer from '../consumer';
import BarChart from './charts/BarChart';
import { IoClose, IoArrowBack, IoEllipsisHorizontal } from "react-icons/io5";



// Make the default values of from informed by state
//

const ActivityShow = () => {
  const dispatch = useDispatch();
  let params = useParams();
  let activity = useSelector((state) => state.activities[params.id])
  let responses = useSelector((state) => (state.responses))
  const responseCount = responses.length;
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState([])
  const [display, setDisplay] = useState('question')
  const [dropdown, setDropdown] = useState(false)

  const {id} = { params }

  // responses = Object.values(responses).filter((response)=>(response.activityId == params.id))

  const [formOptions, setFormOptions] = useState({});
  const [prompt, setPrompt] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false)




  // responses = object of objects
  // body contains response

  const transformed = Object.values(responses)?.reduce((acc, cv) => {
    // index into acc with body of cv
    // if it exists, increment value by 1, else set to 1
    // return


    if (acc[cv.body]) {
      acc[cv.body] += 1
    } else {
      acc[cv.body] = 1
    }
    return acc
  }, {})

  const data = Object.values(Object.values(responses).reduce((acc, response) => {
    if (acc[response.body]) {
      acc[response.body].count = acc[response.body].count + 1
      return acc
    } else {
      acc[response.body] = {name: response.body, count: 1}
      return acc
    }
  }, {}))

  const showResponses = (data.length > 0)



  useEffect(()=>{

    if (activity?.options) {
      setFormOptions({...JSON.parse(activity.options)})
      setPrompt(activity.prompt)
    }

    const subscription  = consumer.subscriptions.create(
      { channel: 'ActivityChannel', id: params.id},
      {
        connected: () => {

        },
        received: response => {

          dispatch(receiveResponse(response))


        }
      }
      )
      return () => subscription?.unsubscribe();
    },[ activity?.options ])

    useEffect(()=>{
      dispatch(clearResponses())
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

      e.preventDefault();
      dispatch(deleteActivity(params.id));
      setShouldRedirect(true)

    }

  const handleFormChange = (e, i) => {
   setFormOptions({...formOptions, [`option${i+1}`]: e.target.value})
  }

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(resetResponses(params.id))
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

  }

  function displayActivity(e) {
    e.preventDefault();
    setDisplay('question')
  }

  function displayResponses(e) {
    e.preventDefault();
    setDisplay('responses')
  }


  return (
    <>
    {shouldRedirect && redirect }
    <div className="activity-show-wrapper">
      <div className="activity-show-flex">
        <Link to="/dashboard"><button className="passive close"><IoArrowBack/></button></Link>
        <div className="activity-toggle">
          <p className={display === "question" ? 'active' : ''}
              onClick={e=>setDisplay('question')}
          >Question</p>
          <p className={display === "responses" ? 'active' : ''}
            onClick={e=>setDisplay('responses')}
          >Responses</p>
        </div>
        <button className="passive close" onClick={e=>setDropdown(!dropdown)}>
          <IoEllipsisHorizontal/>
          {dropdown && (<div className="activity-dropdown dropdown-section">
              <ul>
                <li onClick={displayActivity}>Edit Activity</li>
                <li onClick={displayResponses}>View Responses</li>
                <li onClick={handleClear}>Reset Responses</li>
                <li onClick={handleDelete} className="attention">Delete Activity</li>
              </ul>
            </div>)}
        </button>
      </div>
      <ul>
          {errors.map(error => <li className="login-error-item" key={error}>{error}</li>)}
      </ul>
      <ul>
          {success.map(error => <li className="success" key={success}>{success}</li>)}
      </ul>
      <br></br>

      { display === 'question' && (
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
              <div>{/* {todo -- remove div and restyle } */}</div>
              <button className="cta" onClick={handleSubmit} >Publish</button>
            </div>
          </form>
      )}

      { display === 'responses' && (
           <div className="">
            {showResponses && (<>
              <BarChart width={750} height="600" data={data}></BarChart>
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
            </>
            )}

            {!showResponses && (
              <>
                <p className="centered-text">You currently have no responses.</p>
              </>
            )}

           </div>
      )}

    </div>


    </>
  )
}

export default ActivityShow
