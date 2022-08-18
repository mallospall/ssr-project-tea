import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration({ setAuthState }) {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailState, setEmailState] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('auth/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      const data = await response.json();
      setAuthState(data);
      navigate('/');
    } else {
      setEmailState(!emailState);
    }
  };

  return (
    <div>
      <h1>Registration page</h1>
      {emailState ? (
        <p>
          {' '}
          <font color="red">Такой email уже существует</font>
        </p>
      ) : (<p> </p>)}

      <form onSubmit={submitHandler}>
        <label htmlFor="username-input" className="block mar-b-1">Username:</label>
        <input
          id="username-input"
          onChange={inputHandler}
          value={inputs.name}
          name="name"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="email-input" className="block mar-b-1">Email:</label>
        <input
          id="email-input"
          onChange={inputHandler}
          value={inputs.email}
          name="email"
          type="text"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="password-input" className="block mar-b-1">Password:</label>
        <input
          id="password-input"
          onChange={inputHandler}
          value={inputs.password}
          name="password"
          type="password"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <input
          onChange={inputHandler}
          type="submit"
          value="Зарегистрироваться"
          className="block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
        />
      </form>
    </div>
  );
}

export default Registration;
