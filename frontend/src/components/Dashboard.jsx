
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as sessionActions from '../store/session';
import './Dashboard.css'
import Modal from "./Modal";
import ModalRoot from "./ModalRoot";
import ModalService from "./ModalService";
import ActivityModal from "./ActivityModal";
import ActivityIndexItem from "./ActivityIndexItem";
import { fetchActivities } from "../store/activities";


function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const activities = useSelector(state => Object.values(state.activities).filter((activity)=>{
    return activity.userId === sessionUser?.id
  }))

  const [show, setShow] = useState(false);


  const addModal = () => {
    ModalService.open(ActivityModal);
  };

  useEffect(()=>{
    dispatch(fetchActivities())
  },[])

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      {/* <div className="live-indicator-grid">
        <div className="live-status-icon-flexbox">
          <i className="fa-solid fa-tower-broadcast fa-3x"></i>
        </div>
        <p className="live-status">No live activities</p>
        <p className="live-learn-more">Learn More</p>
      </div> */}
      <div className="toolbar-flexbox">
        <h1 className="greeting">// HEY...<span className="greeting-subtext">HAVE A MAGICAL DAY 😊</span></h1>
      </div>
      <div className="activity-grid">
        <div className="activity-toolbar">
          <h2 className="activity-index-title">Activities Grid</h2>
          <button onClick={ addModal } className="new-activity-button">New Activity</button>
        </div>
        <div>
          <p>To edit an activity or see its responses, click on its name!</p>
          <br></br>
          <a href={`/now-showing/${sessionUser?.id}`}>
            <p>To get a link to share your live question and to collect responses, click here.</p>
          </a>
          <br></br>


        </div>
        <div className="activity-index-headers">
          <div className="activity-index-header-centered">
            <h3 > Status </h3>
            {/* <i className="fa-regular fa-square"></i> */}
          </div>
          <h3>Name</h3>
          <h3 className="activity-index-header-centered" >Set Live</h3>
          {/* <h3 className="activity-index-header-centered" >Responses</h3> */}
        </div>
        {Object.values(activities).map((activity) => {
          return(
            <ActivityIndexItem
              key={activity.id}
              id={activity.id}
              order={activity.order}
              prompt={activity.prompt}
              modified={activity.updatedAt}
              responses={activity.responses} />
          )
        })}


      </div>
    </>
  );
}

export default Dashboard;
