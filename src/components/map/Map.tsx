import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import search_icon from '../../images/search_icon.svg';
import close_icon from '../../images/close_square_icon.svg';
import DraggableMarker from './DraggableMarker';
import Default_button from '../Default_button/Default_button';
import White_button from '../White_Button/White_Button';
import './Map.css';

type Coords_type = [number, number];

type Map_props = {
  setState: () => void
}

const Map: React.FC<Map_props> = ({ setState }) => {
  const input = useRef<HTMLInputElement>(null);
  const [mapCenter, setMapCenter] = useState<Coords_type>([0, 0]);
  const [zoom, setZoom] = useState<number>(13);
  const [label, setLabel] = useState<string>("");
  const provider = new OpenStreetMapProvider();


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  const ChangeView = ({ center, zoom }: { center: Coords_type; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const handle_clear_input = () => {
    if (input.current) {
      input.current.value = "";
    }
  }

  const get_label = async () => {
    const results = await provider.search({ query: mapCenter.join(",") });
    if (results && results.length > 0) {
      setLabel(results[0].label);
    }
  }

  useEffect(() => {
    get_label();
    if (input.current) {
      input.current.value = label;
      localStorage.setItem('users_address', label);
    }
  }, [mapCenter, label])

  useEffect(() => {
    // Get user's current coordinates
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentPosition: Coords_type = [latitude, longitude];
        setMapCenter(currentPosition);
      },
      error => {
        console.error(error.message);
      }
    );

  }, []);

  async function handleInput() {
    if (input.current) {
      const address = input.current.value;
      const results = await provider.search({ query: address });
      if (results && results.length > 0) {
        const { x, y } = results[0];
        const newPosition: Coords_type = [y, x];
        setMapCenter(newPosition);
        get_label();
      }
    }
  }

  // console.log(mapCenter);

  return (
    <div id="map_container">
      <div id='map_info'>
        <h2>Adding an address</h2>
        <p>Select a point on the map or enter an address</p>
        <div id='info'>
          <div id="input_frame">
            <img onClick={handleInput} id="icon" src={search_icon} alt="search" />
            {input.current && input.current.value !== "" && (
              <img onClick={handle_clear_input} id="close_icon" src={close_icon} alt="close" />
            )}
            <input ref={input} type="text" onChange={handleChangeInput} id="address_input" />
          </div>
          {input.current && input.current.value !== "" ? (
            <Default_button
              setState={setState}
              button_text={'Choose'}
              width={110}
              height={32}
            />
          ) : (
            <White_button
              setState={setState}
              button_text={'Choose'}
              width={110}
              height={32}
            />
          )}
        </div>
      </div>
      <MapContainer
        id="map"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          setZoom={setZoom}
          label={label}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
