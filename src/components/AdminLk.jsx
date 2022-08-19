import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminLk({ userState }) {
  const [allTea, setAllTea] = useState([{
    name: '',
    img: '',
    description: '',
    location: '',
    x: 0.00,
    y: 0.00,
  }]);
  const [inputTea, setInputTea] = useState([{
    name: '',
    img: '',
    description: '',
    location: '',
    x: 0.00,
    y: 0.00,
  }]);

  useEffect(() => {
    fetch('/api/teas')
      .then((res) => res.json())
      .then((data) => setAllTea(data));
  }, []);

  console.log(allTea);

  const inputHandler = (e) => {
    setInputTea((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/teas/${e.target.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setAllTea((prev) => (prev.filter((el) => el.id !== Number(e.target.id))));
      alert('Чай удален из списка');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/tea/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputTea),
    });
    const data = await response.json();
    console.log(data);
    setAllTea((prev) => [...prev, data]);
  };
  return (
    <>
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Данные:</th>
              <td>{userState.name}</td>
              <td>{userState.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h1>Добавить новый чай</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="username-input" className="block mar-b-1">Название чая:</label>
          <input
            id="username-input"
            onChange={inputHandler}
            value={inputTea.name}
            name="name"
            type="text"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <label htmlFor="email-input" className="block mar-b-1">Изображение:</label>
          <input
            id="email-input"
            onChange={inputHandler}
            value={inputTea.email}
            name="img"
            type="text"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <label htmlFor="password-input" className="block mar-b-1">Описание:</label>
          <input
            id="password-input"
            onChange={inputHandler}
            value={inputTea.password}
            name="description"
            type="text"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <label htmlFor="password-input" className="block mar-b-1">Адрес:</label>
          <input
            id="password-input"
            onChange={inputHandler}
            value={inputTea.password}
            name="location"
            type="text"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <label htmlFor="password-input" className="block mar-b-1">По X:</label>
          <input
            id="password-input"
            onChange={inputHandler}
            value={inputTea.password}
            name="x"
            type="number"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <label htmlFor="password-input" className="block mar-b-1">По Y:</label>
          <input
            id="password-input"
            onChange={inputHandler}
            value={inputTea.password}
            name="y"
            type="number"
            className="block w-100 no-outline no-border pad-1 mar-b-2"
          />

          <input
            onChange={inputHandler}
            type="submit"
            value="Добавить"
            className="block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
          />
        </form>
      </div>
      <h2>Список всего чая</h2>
      <div className="Cards">
        {allTea?.map((el) => (
          <div key={el.id} className="topCard">
            <div className="card" style={{ width: '18rem' }}>
              <img src={el.img} className="card-img-top" alt={el.name} />
              <div className="card-body">
                <h5 className="card-title">{el.name}</h5>
                <p className="card-text">{el.description}</p>
                <Link to={`/tea/edit/${el.id}`} type="button" className="btn btn-outline-success">редактировать</Link>
                <button onClick={deleteHandler} id={el.id} type="button" className="btn btn-outline-danger">удалить чай из блога</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>

  );
}

export default AdminLk;
