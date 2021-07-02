import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
      <div className="nav-container">
        <div className="nav-header"></div>
        <div className="nav-sidebar">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/Orders">Orders</NavLink>
          <NavLink to="/Estimates">Estimates</NavLink>
          <NavLink to="/CreateEstimate">Create Estimate</NavLink>
          <NavLink to="/Routes">Routes</NavLink>
          <NavLink to="/Billing">Billing</NavLink>
          <NavLink to="/Schedules">Schedules</NavLink>
          <NavLink to="/Catalog">Catalog</NavLink>
        </div>
      </div>
    );
}
 
export default Navigation;

