import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Clock, ShieldAlert } from 'lucide-react';

// Fix for default Leaflet icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Medical Marker Icon
const medicalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/808/808600.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Mock locations
const LOCATIONS = [
  { id: 1, name: "City Central Hospital", type: "Hospital", lat: 51.505, lng: -0.09, emergency: true, phone: "+1 (555) 123-4567" },
  { id: 2, name: "Westside Clinic", type: "Clinic", lat: 51.51, lng: -0.1, emergency: false, phone: "+1 (555) 987-6543" },
  { id: 3, name: "Sunrise Pharmacy", type: "Pharmacy", lat: 51.515, lng: -0.09, emergency: false, phone: "+1 (555) 456-7890" },
  { id: 4, name: "St. Jude Medical Center", type: "Hospital", lat: 51.49, lng: -0.08, emergency: true, phone: "+1 (555) 321-0987" }
];

export default function HospitalLocator() {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default to London for demo
  const [filter, setFilter] = useState('All');

  // Attempt to get actual user geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // If we successfully get the user's location, we could update state here.
        // For the sake of the mock demo and keeping markers visible, we'll keep the mock coordinates,
        // but this shows how it would function.
        // setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const filteredLocations = LOCATIONS.filter(loc => filter === 'All' || loc.type === filter);

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6 animate-slide-up flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-3">
            <MapPin className="h-8 w-8 text-rose-500" />
            Global Health Locator
          </h1>
          <p className="text-sm text-slate-500 mt-1">Find nearby hospitals, clinics, and 24/7 pharmacies.</p>
        </div>
        
        {/* Filters */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700">
          {['All', 'Hospital', 'Clinic', 'Pharmacy'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`py-2 px-4 rounded-lg transition-all ${filter === type ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
        <MapContainer 
          center={userLocation} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          {/* Dark themed map tiles (CartoDB Dark Matter) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* User Location Marker (Pulse Effect) */}
          <Marker position={userLocation}>
            <Popup className="rounded-xl">
              <div className="font-bold text-center">You are here</div>
            </Popup>
          </Marker>

          {/* Medical Locations */}
          {filteredLocations.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={medicalIcon}>
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-base border-b border-slate-100 pb-2 mb-2">{loc.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-slate-600">
                      <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center shrink-0"><Navigation className="h-3 w-3" /></span>
                      {loc.type}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-md flex items-center justify-center shrink-0"><Phone className="h-3 w-3" /></span>
                      {loc.phone}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center shrink-0"><Clock className="h-3 w-3" /></span>
                      Open 24/7
                    </p>
                    {loc.emergency && (
                      <div className="mt-3 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg flex items-center gap-2 font-bold text-xs">
                        <ShieldAlert className="h-4 w-4" />
                        Emergency Unit Available
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Overlay Overlay Panel */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 w-64 animate-slide-right hidden md:block">
          <h4 className="font-bold text-sm mb-3">Nearest Facilities</h4>
          <div className="space-y-3">
            {filteredLocations.slice(0,3).map(loc => (
              <div key={loc.id} className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 text-xs">
                <div className="font-bold">{loc.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-slate-500">{loc.type}</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1"><Navigation className="h-3 w-3" /> {((Math.random() * 2) + 0.1).toFixed(1)} km</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
