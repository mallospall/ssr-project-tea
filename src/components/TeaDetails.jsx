import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comment from './Comments';

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

  const navigate = useNavigate();

  const { id } = useParams();

  // const isFavTea = userState.favTeas.includes(teaState);

  useEffect(() => {
    fetch(`/api/teas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTeaState(data);
      });
    if (authState) {
      fetch(`/api/lk/${authState?.id}`)
        .then((res) => res.json())
        .then((data) => setUserState(data));
    // setIsFavState(userState.favTeas.includes(teaState));
    }
  }, []);

  // console.log('>>>>>', userState.favTeas.includes(teaState.id));
  // console.log('>>>>>', userState.favTeas.filter((el) => el.id === teaState.id));
  // console.log('>>>>>', userState.favTeas.filter((el) => el.id === teaState.id)[0].id);

  // useEffect(() => {
  //   setIsFavState(userState.favTeas.filter((el) => el.id === teaState.id)[0].id === teaState.id);
  // }, []);
  // console.log('teaState -> ', teaState);
  // console.log(isFavState);
  // setIsFavState(userState.favTeas.includes(teaState));
  // console.log(isFavState);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/fav/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userState.user_id }),
    });
    if (response.ok) {
      setIsFavState(!isFavState);
    }
  };

  const deleteHandlerAdmin = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/teas/${e.target.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      navigate('/');
      alert('Чай удален');
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/fav/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userState.user_id }),
    });
    if (response.ok) {
      setIsFavState(!isFavState);
    }
  };

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
      {authState
      && (
      <div className="btns_container">

        {userState?.roleName === 'admin'
          ? (
            <>

              <Link to={`/tea/edit/${id}`} type="button" className="btn btn-dark">Редактировать</Link>
              <button onClick={deleteHandlerAdmin} id={teaState.id} type="button" className="btn btn-danger">Удалить</button>
            </>
          )
          : isFavState === true ? <button type="button" onClick={createHandler} className="btn btn-secondary">Добавить в избранное</button> : <button onClick={deleteHandler} type="button" className="btn btn-danger">Удалить из избранного</button>}
      </div>
      ) }
      <Comment id={id} userState={userState} authState={authState} />
    </div>
  );
}

export default TeaDetails;
