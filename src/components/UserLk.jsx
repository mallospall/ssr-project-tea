import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLk({ userState }) {
  const [inputState, setInputState] = useState('');
  const [validPhrase, setValidPhrase] = useState(true);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/godmode', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id: userState.user_id, code: inputState }),
    });
    if (response.ok) {
      navigate('/');
      setValidPhrase(true);
    } else {
      setValidPhrase(false);
    }
  };

  const inputHandler = (e) => {
    setInputState(e.target.value);
  };

  return (
    <>
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
      <form onSubmit={submitHandler}>
        <div className="input-group mb-3" id="adminCode">
          <input onChange={inputHandler} value={inputState} name="code" type="text" className="form-control" placeholder="godmode" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">Button</button>
          </div>
        </div>
      </form>
      {!validPhrase ? <h3 style={{ color: 'red' }}>*Неверное код-слово</h3> : <> </>}

    </>
  );
}

export default UserLk;
