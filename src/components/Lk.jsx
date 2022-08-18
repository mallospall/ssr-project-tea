import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLk from './AdminLk';
import UserLk from './UserLk';

function Lk({ authState }) {
  const { id } = useParams();
  const [userState, setUserState] = useState({
    email: '',
    name: '',
    roleName: '',
    favTeas: [],
  });

  const [allTea, setAllTea] = useState({
    img: '',
    name: '',
    description: '',
    location: '',
    x: '',
    y: '',
  });

  useEffect(() => {
    fetch(`api/lk/${id}`)
      .then((res) => res.json())
      .then((data) => setUserState(data));
  }, []);

  useEffect(() => {
    fetch('api/teas')
      .then((res) => res.json())
      .then((data) => setAllTea(data));
  }, []);

  return (
    <div>
      {userState.roleName === 'admin' ? <AdminLk userState={userState} allTea={allTea} /> : <UserLk userState={userState} />}
    </div>
  );
}

export default Lk;
