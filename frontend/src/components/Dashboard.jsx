
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
      <div className="activity-grid">
        <div className="activity-toolbar">
          <div className="title-and-share">
            <h2 className="activity-index-title">My Workspace</h2>
            <button>Share</button>
          </div>
          <button onClick={ addModal } className="new-activity-button">Create Activity</button>
        </div>


        <div className="activity-index-headers">
          <div className="activity-index-header-centered">
            <h3 > Status </h3>
          </div>
          <h3>Name</h3>
          <h3 className="activity-index-header-centered" >Set Live</h3>
        </div>

        {
          // ACTIVITY INDEX ITEMS
        }

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
