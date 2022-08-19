import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Comments({ id, userState, authState }) {
  const [comState, setComState] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    fetch(`/api/teas/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComState(data));
  }, []);
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/teas/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      //   body: JSON.stringify(Object.fromEntries([...(new FormData(e.target)), ['userId', userState.user_id]])),
      body: JSON.stringify({ txt: input, userId: userState.user_id }),

    });
    const data = await response.json();
    setComState((prev) => [...prev, data]);
    setInput('');
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="d-flex flex-column col-md-8" id="t-com">
          <div className="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4" />
          <div className="coment-bottom bg-white p-2 px-4">
            <div className="d-flex flex-row add-comment-section mt-4 mb-4">
              {authState
                && (
                <>
                  <img className="img-fluid img-responsive rounded-circle mr-2" src="https://rtc-zdorovie.ru/public/images/noname.jpg" width="38" />
                  <form onSubmit={formHandler} className="form">
                    <input onChange={inputHandler} value={input} type="text" className="form-control mr-3" placeholder="Add comment" name="txt" />
                    <button className="btn btn-primary" type="submit">Comment</button>
                  </form>
                  {' '}

                </>
                )}
              {!authState && <h3 style={{ color: '#3AC1EF' }}>▍Войдите или зарегистрируйтесь, чтобы оставлять комментарии</h3>}

            </div>
            {comState.map((el) => (
              <div key={el.id}>
                <div className="commented-section mt-2">
                  <div className="d-flex flex-row align-items-center commented-user">
                    <h5 className="mr-2">
                      {el?.User.name}
                      {' '}
                    </h5>
                    <span className="dot mb-1" />
                    <span className="mb-1 ml-2">{(el?.createdAt).slice(0, 10)}</span>
                  </div>
                  <div className="comment-text-sm"><span>{el?.text}</span></div>
                </div>
                {' '}

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
