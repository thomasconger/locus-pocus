
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as sessionActions from '../store/session';
import './Dashboard.css'

function Dashboard() {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) return <Redirect to="/login" />;


  return (
    <>
      <div className="live-indicator-grid">
        <div className="live-status-icon-flexbox">
          <i className="fa-solid fa-tower-broadcast fa-3x"></i>
        </div>
        <p className="live-status">No live activities</p>
        <p className="live-learn-more">Learn More</p>
      </div>
      <div className="toolbar-flexbox">
        <button>Activity</button>
        <button>Folder</button>
        <button>Upload</button>
      </div>
      <div className="activity-grid">
        <h2 className="activity-index-title">Activities Grid</h2>
        <div className="activity-index-headers">
          <div className="activity-index-header-right-icon">
            <h3 >Order </h3>
            <i class="fa-regular fa-square"></i>
          </div>
          <h3>Name</h3>
          <h3 className="activity-index-header-centered" >Last Modified</h3>
          <h3 className="activity-index-header-centered" >Responses</h3>
        </div>
        <div className="activity-index-item">
          <p className="activity-index-detail-order">1 <i class="fa-regular fa-square"></i></p>
          <p>First Activity</p>
          <p className="activity-index-detail-centered">01/01/23</p>
          <p className="activity-index-detail-centered">2</p>
        </div>
        <div className="activity-index-item">
          <p className="activity-index-detail-order">2 <i class="fa-regular fa-square"></i></p>
          <p>Second Activity</p>
          <p className="activity-index-detail-centered">01/01/23</p>
          <p className="activity-index-detail-centered">202</p>
        </div>
        <div className="activity-index-item">
          <p className="activity-index-detail-order">3 <i class="fa-regular fa-square"></i></p>
          <p>Third Activity</p>
          <p className="activity-index-detail-centered">01/01/23</p>
          <p className="activity-index-detail-centered">154</p>
        </div>
      </div>

    </>
  );
}

export default Dashboard;
