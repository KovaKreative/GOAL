import React from 'react';

import './BuddyView.scss';

import Chat from './Chat';
import BuddyStatus from './BuddyStatus';

function BuddyView(props) {
  return (
    <div className="BuddyView">
      <h3>Productivity Buddy</h3>
      <BuddyStatus name={props.buddy.name} online={props.buddy.online} />
      {/* Buddy progress panel will go here. */}
      <Chat {...props} />
    </div>
  );
}

export default BuddyView;