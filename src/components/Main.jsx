import React, { useEffect, useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Login from './Login';
// import './yandex-map-restyle-ballon.scss'; // стили для карты и балуна

export function Portal({ children, getHTMLElementId }) {
  // находим искомый HTML по id
  const mount = document.getElementById('root');
  // создаём свой div
  const el = document.createElement('div');

  useEffect(() => {
    // добавляем свой див к искомому элементу
    if (mount) mount.appendChild(el);
    return () => {
      // удаляем элемент от искомого при завершении компоненты
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  // отменяем отрисовку при отсутствии искомого элемента
  if (!mount) return null;
  // собственно, пририсовываем React-элемент в div к искомому HTML
  return createPortal(children, el);
}

function genRC() {
  const r = Math.round((Math.random() * 255)); // red 0 to 255
  const g = Math.round((Math.random() * 255)); // green 0 to 255
  const b = Math.round((Math.random() * 255)); // blue 0 to 255
  return `rgb(${r}, ${g}, ${b})`;
}

function Main(props) {
  const [activePortal, setActivePortal] = useState(false);
  const [teaState, setTeaState] = useState([]);

  useEffect(() => {
    fetch('/api/teas')
      .then((res) => res.json())
      .then((data) => setTeaState(data));
  }, []);
  return (
    <div>
      <YMaps className="map-container" version="2.1.79">
        <div>
          <h1>Выбирайте точку на карте, чтобы узнать больше о конкретном сорте чая!</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [55.75, 37.57], zoom: 9 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
            {teaState.map((tea) => (
              <Placemark
                key={tea.id}
                geometry={[tea.x, tea.y]}
                options={
                  {
                    preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                    iconColor: genRC(), // цвет иконки, можно также задавать в hex
                  }
                }
                properties={
                  {
                    iconContent: tea.id, // пару символов помещается
                    hintContent: `<b>${tea.name}</b>`,
                    // создаём пустой элемент с заданными размерами
                    balloonContent: `<div id="driver-2" class="driver-card"><a href="/tea/${tea.id}"><img src="${tea.img}"</a></div>`,
                  }
                }
                onClick={() => {
                  // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                  setTimeout(() => { setActivePortal(true); }, 0);
                }}
              />
            ))}
          </Map>

          {
            activePortal && (
              <Portal getHTMLElementId="driver-2">
                {/* ставим свой компонент */}
                <Login />
              </Portal>
            )
          }
        </div>
      </YMaps>
    </div>
  );
}

export default Main;
