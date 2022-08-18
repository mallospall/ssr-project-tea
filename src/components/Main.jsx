import React, { useEffect, useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { createPortal } from 'react-dom';
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

function Main(props) {
  const [activePortal, setActivePortal] = useState(false);
  return (
    <div>
      <YMaps className="map-container" version="2.1.79">
        <div>
          <h1>Выбирайте точку на карте, чтобы узнать больше о конкретном сорте чая!</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [55.75, 37.57], zoom: 9 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
            <Placemark
              geometry={[55.75, 37.60]}
              options={
                {
                  preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                  iconColor: 'green', // цвет иконки, можно также задавать в hex
                }
}
              properties={
                {
                  iconContent: '1', // пару символов помещается
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  // создаём пустой элемент с заданными размерами
                  balloonContent: '<div id="driver-2" class="driver-card"><img src="http://imperatormin.ru/u/userfiles/1/chai-puer-sostav.jpg" /></div>',
                }
}
              onClick={() => {
              // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                setTimeout(() => { setActivePortal(true); }, 0);
              }}
            />
            <Placemark
              geometry={[4.75, 37.60]}
              options={
                {
                  preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                  iconColor: 'green', // цвет иконки, можно также задавать в hex
                }
}
              properties={
                {
                  iconContent: '2', // пару символов помещается
                  hintContent: '<b> Я появляюсь при наведении на метку </b>',
                  // создаём пустой элемент с заданными размерами
                  balloonContent: '<div id="driver-2" class="driver-card"><img src="http://imperatormin.ru/u/userfiles/1/chai-puer-sostav.jpg" /></div>',
                }
}
              onClick={() => {
              // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                setTimeout(() => { setActivePortal(true); }, 0);
              }}
            />
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
