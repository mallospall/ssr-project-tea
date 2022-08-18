import React from 'react';
import { Map, YMaps } from 'react-yandex-maps';

function Main(props) {
  return (
    <div>
      <YMaps className="map-container">
        <div>
          <h1>Выбирайте точку на карте, чтобы узнать больше о конкретном сорте чая!</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
        </div>
      </YMaps>
    </div>
  );
}

export default Main;
