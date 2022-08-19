import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditTea(props) {
  const [teaState, setTeaState] = useState([{
    name: '',
    img: '',
    description: '',
    location: '',
    x: 0,
    y: 0,
  }]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/teas/${id}`)
      .then((res) => res.json())
      .then((data) => setTeaState(data));
  }, []);

  const inputHandler = (e) => {
    setTeaState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/teas/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(teaState),
    });
    if (response.ok) {
      navigate('/');
    }
  };
  return (
    <div>
      <h1>Отредактировать чай</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="username-input" className="block mar-b-1">Название чая:</label>
        <input
          id="username-input"
          onChange={inputHandler}
          value={teaState.name}
          name="name"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="email-input" className="block mar-b-1">Изображение:</label>
        <input
          id="email-input"
          onChange={inputHandler}
          value={teaState.img}
          name="img"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">Описание:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={teaState.description}
          name="description"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">Адрес:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={teaState.location}
          name="location"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">По X:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={teaState.x}
          name="x"
          type="number"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">По Y:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={teaState.y}
          name="y"
          type="number"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <input
          onChange={inputHandler}
          type="submit"
          value="Изменить"
          className="block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
        />
      </form>
    </div>

  );
}

export default EditTea;
