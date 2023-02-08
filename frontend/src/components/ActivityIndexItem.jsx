import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteActivity, fetchActivity, resetResponses } from "../store/activities"
import { updateUserActivity } from "../store/users"
import { IoEllipsisHorizontal } from "react-icons/io5";

// This component only ever mounts on /dashboard
// It displays an activity's meta data:
    // Prompt
    // Response Count
// It allows users to:
    // edit the activity
    // delete the activity
    // reset the responses


const ActivityIndexItem = ({prompt, id}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>(state.session.user.id))
  const user = useSelector((state)=>(state.session.user))
  const responses = useSelector(state => state.responses)
  const [dropdown, setDropdown] = useState(false)



  const responsesForThisActivity = Object.values(responses).filter((response)=>{return response.activityId === id})

  console.log(responsesForThisActivity ? responsesForThisActivity : "")

  console.log(`responses for ${id}`, responsesForThisActivity)

  // Fetches activity and responses based on id, which is passed in as a prop
  useEffect(()=>{
    dispatch(fetchActivity(id));
  },[])


  // Displays live icon or 'make live' button
  let liveIcon
  if (user.liveActivityId == id) {
     liveIcon = <i className="fa-solid fa-tower-broadcast fa-1x"></i>
  } else {
     liveIcon = <button className="live-button" onClick={(e)=>{
      dispatch(updateUserActivity(userId, id))
      }}>
    </button>
  }


  function clearResponses (e) {
    dispatch(resetResponses(id))
  }

  function removeActivity (e) {
    dispatch(deleteActivity(id));
  }


  return (
    <div className="activity-index-item">
          <div className="broadcast-icon-wrapper">
            { liveIcon }
          </div>
          <div className="activity-prompt">
            <Link to={`./activity/${id}`}>{prompt}</Link>
          </div>
          <div className="activity-prompt-broadcast-wrapper">
              <p>{responsesForThisActivity.length}</p>
          </div>
          <div>
            <button className="passive" onClick={e => setDropdown(!dropdown)}>
              <IoEllipsisHorizontal></IoEllipsisHorizontal>
            </button>
            {dropdown && (<div className="activity-dropdown dropdown-section">
              <ul>
                <Link to={`./activity/${id}`}><li>View Responses</li></Link>
                <Link to={`./activity/${id}`}><li>Edit Activity</li></Link>
                <li onClick={clearResponses}>Reset Responses</li>
                <li onClick={removeActivity} className="attention">Delete Activity</li>
              </ul>
            </div>)}
          </div>
    </div>
  )
}


export default ActivityIndexItem
