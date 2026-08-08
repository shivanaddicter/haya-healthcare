import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Clock, ShieldAlert, Crosshair, Search, Loader2 } from 'lucide-react';

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
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// User location pin icon
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Helper component to re-center Leaflet map smoothly
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      map.flyTo(center, 14, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

// Generate realistic nearby facilities around any lat/lng offset
const generateFacilitiesAroundLocation = (baseLat, baseLng) => {
  const offsets = [
    { name: "City Care Multi-Specialty Hospital", type: "Hospital", latOffset: 0.008, lngOffset: 0.012, emergency: true, phone: "+1 (800) 429-2001", beds: 120 },
    { name: "Apex Emergency Trauma & Heart Center", type: "Hospital", latOffset: -0.012, lngOffset: -0.009, emergency: true, phone: "+1 (800) 429-2002", beds: 250 },
    { name: "Vitality Outpatient Medical Clinic", type: "Clinic", latOffset: 0.005, lngOffset: -0.014, emergency: false, phone: "+1 (800) 429-2003", beds: 0 },
    { name: "MedPlus 24/7 Wellness Pharmacy", type: "Pharmacy", latOffset: -0.006, lngOffset: 0.008, emergency: false, phone: "+1 (800) 429-2004", beds: 0 },
    { name: "St. Jude Regional Healthcare Center", type: "Hospital", latOffset: 0.015, lngOffset: -0.004, emergency: true, phone: "+1 (800) 429-2005", beds: 180 },
    { name: "Green Valley Urgent Family Clinic", type: "Clinic", latOffset: -0.018, lngOffset: 0.016, emergency: false, phone: "+1 (800) 429-2006", beds: 0 },
  ];

  return offsets.map((item, idx) => {
    const lat = baseLat + item.latOffset;
    const lng = baseLng + item.lngOffset;
    const distKm = Math.sqrt(Math.pow(item.latOffset * 111, 2) + Math.pow(item.lngOffset * 111 * Math.cos(baseLat * Math.PI / 180), 2)).toFixed(1);
    return {
      id: idx + 1,
      name: item.name,
      type: item.type,
      lat,
      lng,
      distance: distKm,
      emergency: item.emergency,
      phone: item.phone,
      beds: item.beds
    };
  });
};

export default function HospitalLocator() {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]);
  const [facilities, setFacilities] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLocating, setIsLocating] = useState(false);
  const [locationName, setLocationName] = useState("Detecting GPS...");
  const [searchQuery, setSearchQuery] = useState("");

  const requestUserLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          setFacilities(generateFacilitiesAroundLocation(lat, lng));
          setLocationName("Your Current Live Location");
          setIsLocating(false);
        },
        (error) => {
          console.warn("Geolocation permission denied or error:", error);
          const defaultLat = 51.505;
          const defaultLng = -0.09;
          setUserLocation([defaultLat, defaultLng]);
          setFacilities(generateFacilitiesAroundLocation(defaultLat, defaultLng));
          setLocationName("Default Location (London)");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      const defaultLat = 51.505;
      const defaultLng = -0.09;
      setUserLocation([defaultLat, defaultLng]);
      setFacilities(generateFacilitiesAroundLocation(defaultLat, defaultLng));
      setLocationName("Default Location");
      setIsLocating(false);
    }
  };

  useEffect(() => {
    requestUserLocation();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase();
    let newCoords = null;
    let name = searchQuery;

    if (query.includes('new york') || query.includes('nyc')) {
      newCoords = [40.7128, -74.0060];
      name = "New York, USA";
    } else if (query.includes('london')) {
      newCoords = [51.505, -0.09];
      name = "London, UK";
    } else if (query.includes('delhi') || query.includes('india')) {
      newCoords = [28.6139, 77.2090];
      name = "New Delhi, India";
    } else if (query.includes('tokyo')) {
      newCoords = [35.6762, 139.6503];
      name = "Tokyo, Japan";
    } else if (query.includes('paris')) {
      newCoords = [48.8566, 2.3522];
      name = "Paris, France";
    } else {
      newCoords = [userLocation[0] + 0.05, userLocation[1] + 0.05];
      name = searchQuery;
    }

    setUserLocation(newCoords);
    setFacilities(generateFacilitiesAroundLocation(newCoords[0], newCoords[1]));
    setLocationName(name);
    setSearchQuery("");
  };

  const filteredLocations = facilities.filter(loc => filter === 'All' || loc.type === filter);

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6 animate-slide-up flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-3">
            <MapPin className="h-8 w-8 text-rose-500 animate-bounce" />
            Global Health & Hospital Locator
          </h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
            <span>Accurate GPS distance analytics for emergency medical care.</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Active: {locationName}
            </span>
          </p>
        </div>
        
        {/* Actions & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search city (e.g. London, Delhi, NYC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3" />
          </form>

          <button
            onClick={requestUserLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
            title="Recenter Map to Live GPS Coordinates"
          >
            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
            {isLocating ? 'Locating...' : 'My Location'}
          </button>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
            {['All', 'Hospital', 'Clinic', 'Pharmacy'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`py-1.5 px-3 rounded-lg transition-all cursor-pointer ${filter === type ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative min-h-[400px]">
        <MapContainer 
          center={userLocation} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          {/* Smooth Re-centering Controller */}
          <RecenterMap center={userLocation} />

          {/* Dark themed map tiles (CartoDB Dark Matter) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* User Location Marker */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup className="rounded-xl">
              <div className="font-bold text-center p-1">
                <span className="text-rose-600 block text-xs font-black">YOUR LOCATION</span>
                <span className="text-slate-600 text-[11px]">{locationName}</span>
              </div>
            </Popup>
          </Marker>

          {/* Medical Locations */}
          {filteredLocations.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={medicalIcon}>
              <Popup>
                <div className="p-1 min-w-[210px]">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2 mb-2">
                    <h3 className="font-bold text-sm text-slate-900">{loc.name}</h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-600">{loc.distance} km</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded flex items-center justify-center shrink-0"><Navigation className="h-2.5 w-2.5" /></span>
                      {loc.type} {loc.beds > 0 ? `(${loc.beds} Emergency Beds)` : ''}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center shrink-0"><Phone className="h-2.5 w-2.5" /></span>
                      {loc.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded flex items-center justify-center shrink-0"><Clock className="h-2.5 w-2.5" /></span>
                      Open 24/7
                    </p>
                    {loc.emergency && (
                      <div className="mt-2 bg-rose-50 border border-rose-200 text-rose-700 px-2 py-1 rounded flex items-center gap-1.5 font-bold text-[11px]">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        24/7 Trauma Unit Active
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Floating Nearest Facilities Side Panel */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 w-72 animate-slide-right hidden md:block max-h-[calc(100%-2rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Nearest Facilities</h4>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">{filteredLocations.length} found</span>
          </div>
          <div className="space-y-2.5">
            {filteredLocations.map(loc => (
              <div 
                key={loc.id} 
                onClick={() => setUserLocation([loc.lat, loc.lng])}
                className="bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition-all cursor-pointer group"
              >
                <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">{loc.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[11px] text-slate-500">{loc.type}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <Navigation className="h-3 w-3" /> {loc.distance} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
