
const ActivityIndexItem = ({order, prompt, modified, responses}) => {

  return (
    <div className="activity-index-item">
          <p className="activity-index-detail-order">{order} <i className="fa-regular fa-square"></i></p>
          <p>{prompt}</p>
          <p className="activity-index-detail-centered">{modified}</p>
          <p className="activity-index-detail-centered">{responses}</p>
    </div>
  )
}


export default ActivityIndexItem
