import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import EditTea from './EditTea';
import Lk from './Lk';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';
import Registration from './Registration';
import TeaDetails from './TeaDetails';

function App({ userSession }) {
  const [authState, setAuthState] = useState(userSession || null);
  console.log(authState?.id ?? 'p');
  return (
    <>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Routes>
            <Route path="/" element={<Main authState={authState} />} />
            <Route path="/login" element={<Login setAuthState={setAuthState} />} />
            <Route path="/registration" element={<Registration setAuthState={setAuthState} />} />
            <Route path="/lk/:id" element={<Lk authState={authState} />} />
            <Route path="/tea/:id" element={<TeaDetails authState={authState} />} />
            <Route path="/tea/edit/:id" element={<EditTea />}> </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
