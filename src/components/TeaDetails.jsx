import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TeaDetails({ authState }) {
  const [teaState, setTeaState] = useState({});
  const [isFavState, setIsFavState] = useState(true);
  const [userState, setUserState] = useState({
    email: '',
    name: '',
    roleName: '',
    favTeas: [],
    user_id: null,
  });

  const { id } = useParams();

  // const isFavTea = userState.favTeas.includes(teaState);

  useEffect(() => {
    fetch(`/api/teas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTeaState(data);
      });
    fetch(`/api/lk/${authState.id}`)
      .then((res) => res.json())
      .then((data) => setUserState(data));
    setIsFavState(userState.favTeas.includes(teaState));
  }, []);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/fav/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userState.user_id }),
    });
    if (response.ok) {
      setTeaState({ name: 'Чай удален из избранного' });
      setIsFavState(!isFavState);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`api/fav/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userState.user_id }),
    });
    if (response.ok) {
      setIsFavState(!isFavState);
    }
  };

  console.log(teaState);

  return (
    <div className="row tea_detail">
      <div className="col-lg-8 col-md-8 col-sm-12 desc" id="tea_detail_block">
        <h3>
          <font color="#3AC1EF">
            ▍
            {teaState?.name}
          </font>
        </h3>
        <img align="center" src={teaState?.img} className="img-fluid" />
        <h1>Описание: </h1>
        <p>
          {teaState?.description}
        </p>
        <h1>Локация: </h1>
        <p>
          {teaState?.location}
        </p>
      </div>
      <div className="btns_container">

        {userState.roleName === 'admin'
          ? (
            <>

              <button type="button" className="btn btn-dark">Редактировать</button>
              <button type="button" className="btn btn-danger">Удалить</button>
            </>
          )
          : isFavState === true ? <button type="button" onClick={createHandler} className="btn btn-secondary">Добавить в избранное</button> : <button onClick={deleteHandler} type="button" className="btn btn-danger">Удалить из избранного</button>}
      </div>

    </div>
  );
}

export default TeaDetails;
