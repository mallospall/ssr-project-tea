import React from 'react';
import { Link } from 'react-router-dom';

function UserLk({ userState }) {
  return (
    <div className="user_lk">
      <h1>Список ваших любимых сортов чая</h1>
      {userState.favTeas.map((tea) => (
        <div key={tea.id} className="card lk_item" style={{ width: '18rem' }}>
          <img src={tea.img} className="card-img-top" alt="..." />
          <div className="card-body card">
            <h5 className="card-title">{tea.name}</h5>
            <p className="card-text">{tea.description}</p>
            <Link to={`/tea/${tea.id}`} className="btn btn-primary">Подробнее</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLk;
