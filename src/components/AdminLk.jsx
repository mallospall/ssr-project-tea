import React from 'react';

function AdminLk({userState, allTea}) {

    const [inputTea, setInputTea] = useState({
        name: '',
        img: '',
        description: '',
        location: '',
        x: '',
        y: '',
      });
    
      const inputHandler = (e) => {
        setInputTea((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('/tea/add', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(inputTea),
        });
      };
    return (
        <>
        <div>
            <table class="table table-dark">
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
        <label htmlFor="username-input" className="block mar-b-1">Нащвание чая:</label>
        <input
          id="username-input"
          onChange={inputHandler}
          value={inputs.name}
          name="name"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="email-input" className="block mar-b-1">Изображение:</label>
        <input
          id="email-input"
          onChange={inputHandler}
          value={inputs.email}
          name="img"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">Описание:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={inputs.password}
          name="description"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">Адрес:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={inputs.password}
          name="location"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">По X:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={inputs.password}
          name="x"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">По Y:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={inputs.password}
          name="y"
          type="text"
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
        <div>
        {allTea?.map((el) => {
            <div>
                <div class="card" style="width: 18rem;">
                <img src={el.img} class="card-img-top" alt={el.name}/>
                <div class="card-body">
                <h5 class="card-title">{el.name}</h5>
                <p class="card-text">{el.description}</p>
                <button type="button" class="btn btn-outline-success">подробнее</button>
                <button type="button" class="btn btn-outline-danger">удалить</button>
                </div>
                </div>
            </div>
        })}
        </div>
        </>
    
        
    );
}

export default AdminLk;