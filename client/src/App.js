import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import "./App.scss";

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Survey from './components/Survey';

import { resetSession } from './features/sessionSlice';
import socket from './helpers/socketsHelper';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.session.user);

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        dispatch(resetSession());
        socket.disconnect();
      }
    });
  };

  return (
    <div className="App">
      <Navbar username={userState?.username} onLogout={onLogout} />
      {userState ? <Home /> : <Landing />}
    </div>
  );
};

export default App;