import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateUserActivity } from "../store/users"



const ActivityIndexItem = ({order, prompt, modified, responses, id}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>(state.session.user.id))
  const user = useSelector((state)=>(state.session.user))

  let icon
  if (user.liveActivityId == id) {
     icon = <i className="fa-solid fa-tower-broadcast fa-1x"></i>
  } else {
     icon = ""
  }



  return (
    <div className="activity-index-item">
          <div class="broadcast-icon-wrapper">
            { icon }
          </div>
          <div className="activity-prompt">
            <Link to={`./activity/${id}`}>{prompt}</Link>
          </div>
          <div className="activity-prompt-broadcast-wrapper">
              <button className="live-button" onClick={(e)=>{
                console.log(id)
                dispatch(updateUserActivity(userId, id))
                }}>
              </button>
            </div>
          {/* <p className="activity-index-detail-centered">{modified}</p>
          <p className="activity-index-detail-centered">{responses}</p> */}
    </div>
  )
}


export default ActivityIndexItem
