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
    user_id: null,
  });

  useEffect(() => {
    fetch(`/api/lk/${id}`)
      .then((res) => res.json())
      .then((data) => setUserState(data));
  }, []);

  console.log(userState);

  return (
    <div>
      {userState.roleName === 'admin' ? <AdminLk userState={userState} /> : <UserLk userState={userState} />}
    </div>
  );
}

export default Lk;
