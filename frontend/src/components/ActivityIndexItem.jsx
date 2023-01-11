import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateUserActivity } from "../store/users"



const ActivityIndexItem = ({order, prompt, modified, responses, id}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>(state.session.user.id))

  return (
    <div className="activity-index-item">
          <p className="activity-index-detail-order">{order} <i className="fa-regular fa-square"></i></p>
          <div className="activity-prompt">
            <Link to={`./activity/${id}`}>{prompt}</Link>

            <div >
              <button className="activity-prompt-broadcast-wrapper" onClick={(e)=>{dispatch(updateUserActivity(userId, id))}}>
                <i className="fa-solid fa-tower-broadcast fa-1x"></i>
              </button>
            </div>
          </div>
          <p className="activity-index-detail-centered">{modified}</p>
          <p className="activity-index-detail-centered">{responses}</p>
    </div>
  )
}


export default ActivityIndexItem
