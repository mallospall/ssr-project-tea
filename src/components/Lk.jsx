import React from 'react';
import AdminLk from './AdminLk';
import UserLk from './UserLk';

function Lk({ role_name }) {
  return (
    <div>
      {role_name === 'admin' ? <AdminLk /> : <UserLk />}
    </div>
  );
}

export default Lk;
