/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ authState, setAuthState }) {
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/auth/logout');
    if (response.ok) {
      setAuthState(null);
      navigate('/');
    }
  };

  return (
    <header role="banner" className="mar-t-5 pad-t-2 pad-b-4 pad-s-1 wrap-float bg-white">
      <div className="max-w-700 center wrap-float">
        <nav className="clearfix mar-b-1">
          <ul className="no-bullets no-margin no-padding right">
            {!authState
              ? (
                <>
                  <li className="pipe-separate t-light-green left"><NavLink to="/registration">registration</NavLink></li>
                  <li className="pipe-separate t-light-green left"><NavLink to="/login">login</NavLink></li>
                  <li className="pipe-separate t-light-green left"><NavLink to="/">home</NavLink></li>
                </>
              )
              : (
                <>
                  <li className="pipe-separate t-light-green left">{authState.name || 'nickname'}</li>
                  <li className="pipe-separate t-light-green left"><NavLink to="/">home</NavLink></li>
                  <li className="pipe-separate t-light-green left"><a onClick={logoutHandler} className="nav-link" href="">logout </a></li>
                </>
              )}
          </ul>
        </nav>

        <div className="logo-container">
          <img src="/images/testLogo.png" alt="tea" className="center block logo" />
          <h1>Tea Blog</h1>

        </div>
      </div>
    </header>
  );
}

export default Header;
