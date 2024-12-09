import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

// Estilo del mapa
const containerStyle = {
  width: '100%',
  height: '300px',
};

// Coordenadas personalizadas para el marcador
const location = {
  lat: -33.39911608184975, // Latitud
  lng: -70.50612058704495, // Longitud
};

export function MapView() {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location} // Centrar el mapa en las coordenadas personalizadas
      zoom={15} // Ajustar el nivel de zoom
      options={{
        zoomControl: true, // Mostrar los botones de zoom
        zoomControlOptions: { position: 7 }, // Ajustar el tamaño y la posición de los botones
        streetViewControl: false, // Ocultar Street View
        mapTypeControl: false, // Ocultar el control de tipo de mapa
        fullscreenControl: false, // Ocultar el control de pantalla completa
      }}
    >
      <Marker position={location} /> {/* Agregar el marcador en las coordenadas personalizadas */}
    </GoogleMap>
  );
}
