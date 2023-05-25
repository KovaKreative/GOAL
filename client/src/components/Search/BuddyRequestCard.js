import React, { useState } from 'react';
import './Search.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchPendingBuddyRequests, fetchSentBuddyRequests } from '../../features/notificationSlice';
import useVisualMode from "../../hooks/useVisualMode.js";
import socket from '../../helpers/socketsHelper';

const EDIT = "EDIT";
const SHOW = "SHOW";
const SENT = "SENT";
// const ERROR = "ERROR";

export default function BuddyRequestCard(props) {
  const { mode, transition, back } = useVisualMode(props.state);
  const [messageValue, setMessageValue] = useState('Add me please');
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      // Fetch pending buddy requests
      await axios.get("/request/incoming").then(res => {
        console.log('PENDING BUDDY REQUEST', res.data);
        dispatch(fetchPendingBuddyRequests(res.data));
      }).catch((err) => {
        console.log(err);
      });

      // Fetch outgoing buddy requests
      await axios.get("/request/outgoing").then(res => {
        console.log('SENT BUDDY REQUEST', res.data);
        dispatch(fetchSentBuddyRequests(res.data));
      }).catch((err) => {
        console.log(err);
      });

    } catch (error) {
      console.error(error);
    }
  };


  function onSendRequest(user, message) {
    axios.post('/search/request', { user: user, requestMessage: message })
      .then((res) => {

        fetchData();
        transition(SENT);
        socket.emit('OUTGOING_REQUEST', user.id);
      });
  }

  // const handleChange = (e) => {
  //   setMessageValue(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendRequest(props.buddy, messageValue);
    setMessageValue('Add me please');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    back(SENT);
    setMessageValue('Add me please');
  };


  return (
    <div className="request-card">
      {mode === SHOW &&
        <>
          <h3>{props.buddy.username}</h3>
          <div className='action'>
            <button onClick={() => transition(EDIT)}>Write a Request Message</button>
            <button onClick={handleSubmit}>Send a Quick Request</button>
          </div>
        </>
      }
      {mode === SENT && <>
        <h3>{props.buddy.username}</h3>
        <h4>Buddy Request Pending</h4>
      </>}
      {mode === EDIT && <>
        <h3>{props.buddy.username}</h3>
        <form className='message-form' onSubmit={handleSubmit}>
          <input
            key="message"
            value={messageValue}
            placeholder={"Find buddy by username"}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
          />
          <div className='message-form-actions'>
            <button  className='btn' type="submit">Send</button>
            <button  className='btn' type="cancel" onClick={handleCancel}>Cancel</button>
          </div>

        </form>
      </>}

    </div>
  );
}