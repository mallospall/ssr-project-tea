import React, { useEffect, useLayoutEffect } from 'react';
import { Map, YMaps } from 'react-yandex-maps';

function Main(props) {
  return (
    <div>
      <YMaps className="map-container">
        <div>
          My awesome application with maps!
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
        </div>
      </YMaps>
    </div>
  );
}

export default Main;
