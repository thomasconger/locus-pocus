import { Link } from "react-router-dom"

const ActivityIndexItem = ({order, prompt, modified, responses, id}) => {

  return (
    <div className="activity-index-item">
          <p className="activity-index-detail-order">{order} <i className="fa-regular fa-square"></i></p>
          <p><Link to={`./activity/${id}`}>{prompt}</Link></p>
          <p className="activity-index-detail-centered">{modified}</p>
          <p className="activity-index-detail-centered">{responses}</p>
    </div>
  )
}


export default ActivityIndexItem
