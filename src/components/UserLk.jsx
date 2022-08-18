import React from 'react';

function UserLk({ userState }) {
  return (
    <div>
      {userState.favTeas.map((tea) => (
        <div key={tea.id} className="card" style={{ width: '18rem' }}>
          <img src={tea.img} className="card-img-top" alt="..." />
          <div className="card-body card">
            <h5 className="card-title">{tea.name}</h5>
            <p className="card-text">{tea.description}</p>
            <a href="" className="btn btn-primary">Переход куда-нибудь</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLk;
