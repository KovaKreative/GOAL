import React from 'react';
import logo from '../images/GOAL-Logo.svg';
import './Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useSelector, useDispatch } from 'react-redux'
import { showGoalListPanel, showBuddyPanel, showNotificationPanel, showAccountSettingsPanel, showSearchPanel } from '../features/viewManagerSlice';


export default function Navbar(props) {
  const dispatch = useDispatch()
  const viewState = useSelector((state) => state.viewManager);
  const user = useSelector(state => state.session.user);
  const username = user?.username;
  const buddy = useSelector(state => state.session.buddy);

  function checkBuddy() {
    if (buddy.id === null) {
      console.log('here', viewState.rightSideBar.currentView);
      dispatch(showSearchPanel());
    } else {
      dispatch(showBuddyPanel());
    }
  }

  return (
    <nav className='nav'>
      <div>
        {username &&
          <FontAwesomeIcon
            className={`iconbtn ${viewState.leftSideBar.currentView === 'goal_list' && viewState.leftSideBar.visibility ? 'active' : undefined}`} onClick={() => dispatch(showGoalListPanel())}
            icon={icon({ name: "bars-staggered" })}
          />
        }
        <img className='logo' src={logo}/>
        <h1>GOAL</h1>
      </div>
      <div>
        {username &&
          <>
            <div className='dropdown'>
              <div className='dropbtn'>
                <h3>{username}</h3>
                <FontAwesomeIcon icon={solid("caret-down")} />
              </div>
              <div className="dropdown-content">
                <button onClick={() => dispatch(showAccountSettingsPanel())}>Account Settings</button>
                <button onClick={props.onLogout}>Log Out</button>
              </div>
            </div>
            <FontAwesomeIcon
              className={`iconbtn-circle ${viewState.rightSideBar.currentView === 'buddy' && viewState.rightSideBar.visibility ? 'active' : undefined}`}
              onClick={() => checkBuddy()}
              icon={solid("user-group")} />
            <FontAwesomeIcon
              className={`iconbtn-circle ${viewState.rightSideBar.currentView === 'notifications' && viewState.rightSideBar.visibility ? 'active' : undefined}`}
              onClick={() => dispatch(showNotificationPanel())}
              icon={solid("bell")} />
          </>
        }
      </div>
    </nav>
  );
}
