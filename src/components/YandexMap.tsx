import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Locate, Search, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

interface YandexMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  selectedLat?: number;
  selectedLng?: number;
}

const DEFAULT_CENTER: [number, number] = [41.2995, 69.2401]; // Toshkent

declare global {
  interface Window { L: any; }
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export const YandexMap = ({ onLocationSelect, selectedLat, selectedLng }: YandexMapProps) => {
  const { t } = useLang();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  // Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Geolocation state
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(false);

  // Load Leaflet CSS + JS dynamically
  useEffect(() => {
    if (window.L) { setLoaded(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uz,ru`,
        { headers: { "Accept-Language": "uz,ru;q=0.9,en;q=0.8" } }
      );
      const data = await res.json();
      return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  }, []);

  const placeMarker = useCallback((lat: number, lng: number, address?: string) => {
    if (!mapInstance.current || !window.L) return;

    const icon = window.L.divIcon({
      html: `<div style="width:32px;height:32px;background:#ef4444;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: "",
    });

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = window.L.marker([lat, lng], { icon }).addTo(mapInstance.current);
    }

    mapInstance.current.setView([lat, lng], 15, { animate: true });

    if (address) {
      onLocationSelect(lat, lng, address);
    } else {
      reverseGeocode(lat, lng).then((addr) => onLocationSelect(lat, lng, addr));
    }
  }, [onLocationSelect, reverseGeocode]);

  // Init map
  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstance.current) return;

    const center: [number, number] =
      selectedLat && selectedLng ? [selectedLat, selectedLng] : DEFAULT_CENTER;

    const map = window.L.map(mapRef.current, { center, zoom: 13, zoomControl: true });
    mapInstance.current = map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    if (selectedLat && selectedLng) {
      const icon = window.L.divIcon({
        html: `<div style="width:32px;height:32px;background:#ef4444;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [32, 32], iconAnchor: [16, 32], className: "",
      });
      markerRef.current = window.L.marker([selectedLat, selectedLng], { icon }).addTo(map);
    }

    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;
      placeMarker(lat, lng);
    });
  }, [loaded]);

  // Address search with debounce
  const handleSearch = (value: string) => {
    setQuery(value);
    setShowResults(false);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (value.trim().length < 3) { setResults([]); return; }

    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&countrycodes=uz&accept-language=uz,ru`,
          { headers: { "Accept-Language": "uz,ru;q=0.9,en;q=0.8" } }
        );
        const data: SearchResult[] = await res.json();
        setResults(data);
        setShowResults(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 600);
  };

  const handleSelectResult = (r: SearchResult) => {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    setQuery(r.display_name);
    setShowResults(false);
    setResults([]);
    placeMarker(lat, lng, r.display_name);
  };

  // Geolocation
  const handleMyLocation = () => {
    if (!navigator.geolocation) { setLocError(true); return; }
    setLocating(true);
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocating(false);
        placeMarker(latitude, longitude);
      },
      () => {
        setLocating(false);
        setLocError(true);
        setTimeout(() => setLocError(false), 3000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  if (!loaded) {
    return (
      <div className="w-full h-[320px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">{t.mapLoading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Search bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => results.length > 0 && setShowResults(true)}
              placeholder={t.mapSearch}
              className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setResults([]); setShowResults(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={handleMyLocation}
            disabled={locating}
            title={t.myLocation}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
              locating
                ? "border-blue-300 bg-blue-50 text-blue-500"
                : locError
                ? "border-red-300 bg-red-50 text-red-500"
                : "border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {locating ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Locate className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Search results dropdown */}
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000] overflow-hidden">
            {searching ? (
              <div className="px-4 py-3 text-sm text-gray-500">{t.searching}</div>
            ) : (
              results.map((r) => (
                <button
                  key={r.place_id}
                  onClick={() => handleSelectResult(r)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 line-clamp-2"
                >
                  <span className="text-gray-700">{r.display_name}</span>
                </button>
              ))
            )}
          </div>
        )}

        {showResults && results.length === 0 && !searching && query.length >= 3 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000] px-4 py-3 text-sm text-gray-400">
            {t.noResults}
          </div>
        )}
      </div>

      {locError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {t.locationError}
        </p>
      )}

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-[280px] rounded-xl overflow-hidden border border-gray-200"
        onClick={() => setShowResults(false)}
      />
      <p className="text-xs text-gray-400 flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        {t.markLocation}
      </p>
    </div>
  );
};
