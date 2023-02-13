
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
import { IoPersonAdd, IoAdd } from 'react-icons/io5'

function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const activities = useSelector(state => Object.values(state.activities).filter((activity)=>{
    return activity.userId === sessionUser?.id
  }))

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false)


  const addModal = () => {
    ModalService.open(ActivityModal);
  };

  useEffect(()=>{
    dispatch(fetchActivities())
  },[])

  if (!sessionUser) return <Redirect to="/login" />;

  function copyLink (e) {


    const link = `https://locus-pocus.onrender.com/now-showing/${sessionUser.id}`
    navigator.clipboard.writeText(link)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000 )

  }


  return (
    <>
      <div className="activity-grid">
        <div className="activity-toolbar">
          <div className="title-and-share">
            <h2 className="activity-index-title">My Workspace</h2>
            <button className="passive" onClick={copyLink}> < IoPersonAdd /> { alert ? 'Copied to your clipboard!' : 'Share'}</button>
          </div>
          {/* { IoPersonAdd } */}
          <button onClick={ addModal } className="new-activity-button"> <IoAdd/> Create Activity</button>
        </div>


        <div className="activity-index-headers">
          <div className="activity-index-header-centered">
            <h3 > Status </h3>
          </div>
          <h3>Name</h3>
          <h3 className="activity-index-header-centered" >Responses</h3>
        </div>

        {
          // ACTIVITY INDEX ITEMS
        }

        {Object.values(activities).map((activity) => {
          return(
            <ActivityIndexItem
              key={activity.id}
              id={activity.id}
              prompt={activity.prompt}
              />
          )
        })}


      </div>
    </>
  );
}

export default Dashboard;
