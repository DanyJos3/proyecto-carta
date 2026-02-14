import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fotos para los marcadores (misma carpeta que la galería)
const photoGlob = import.meta.glob('../assets/photos/photo*.jpg', { eager: true, query: '?url', import: 'default' })

function getPhotoUrl(i) {
  const key = `../assets/photos/photo${i}.jpg`
  const v = photoGlob[key]
  return (typeof v === 'string' ? v : v?.default) ?? null
}

const ECUADOR_CENTER = [-1.4, -78.4]
const DEFAULT_ZOOM = 7

const ECUADOR_BOUNDS = L.latLngBounds(
  [-5.0, -81.2],
  [1.6, -75.2]
)

const PLACES = [
  { position: [-0.2200, -78.5125], title: 'Centro de Quito', city: 'Quito', description: 'Nuestro Quito 💕' },
  { position: [-0.1850, -78.4820], title: 'La Carolina', city: 'Quito', description: 'Parques y paseos juntos' },
  { position: [-0.2100, -78.4900], title: 'Guápulo', city: 'Quito', description: 'Vistas y cafés' },
  { position: [-0.1700, -78.4750], title: 'Quito Norte', city: 'Quito', description: 'Días por la ciudad' },
  { position: [-0.0022, -78.4558], title: 'Mitad del Mundo', city: 'Quito', description: 'Un pie en cada hemisferio 🌎' },
  { position: [-4.0079, -79.2113], title: 'Loja', city: 'Loja', description: 'La ciudad de los artistas' },
  { position: [-2.9001, -79.0059], title: 'Cuenca', city: 'Cuenca', description: 'Calles empedradas e historia' },
  { position: [0.8708, -79.8488], title: 'Atacames', city: 'Atacames', description: 'Playa y atardeceres 🌊' },
  { position: [0.9667, -79.6167], title: 'Tonsupa', city: 'Tonsupa', description: 'Arena y mar juntos' },
  { position: [-0.3667, -78.1333], title: 'Papallacta', city: 'Papallacta', description: 'Termas y relax' },
  { position: [-0.2333, -79.1667], title: 'Puerto Quito', city: 'Puerto Quito', description: 'Naturaleza y aventura' },
  { position: [-1.6740, -78.6472], title: 'Riobamba', city: 'Riobamba', description: 'Tren y volcanes' },
  { position: [-1.3964, -78.4243], title: 'Baños de Ambato', city: 'Baños', description: 'Cascadas y adrenalina' },
  { position: [-1.2667, -78.5833], title: 'Laguna de Yambo', city: 'Yambo', description: 'Leyendas y paisaje' },
  { position: [0.3392, -78.1222], title: 'Imbabura', city: 'Imbabura', description: 'Verde y lagos' },
  { position: [0.3517, -78.1223], title: 'Ibarra', city: 'Ibarra', description: 'Ciudad blanca' },
  { position: [-0.2117, -78.2667], title: 'Lago San Pablo', city: 'Lago San Pablo', description: 'Un lago contigo' },
]

// Icono del marcador = foto nuestra (circular con borde)
function createPhotoIcon(photoUrl) {

  // const src = photoUrl || 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="%23fce7f3" stroke="%23ec4899" stroke-width="2"/><text x="24" y="28" text-anchor="middle" fill="%239f1239" font-size="20">💕</text></svg>')
  const src = `${import.meta.env.BASE_URL}photos/IMG_39.webp`
  return L.divIcon({
    className: 'photo-marker',
    html: `<span class="marker-photo-wrap"><img src="${src}" alt="" class="marker-photo" /></span>`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  })
}

function MapFitEcuador() {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(ECUADOR_BOUNDS, { padding: [24, 24], maxZoom: 7 })
  }, [map])
  return null
}

function PhotoMarker({ place, icon }) {
  return (
    <Marker position={place.position} icon={icon}>
      <Popup className="cartoon-popup">
        <div className="popup-inner">
          <h3 className="popup-title">{place.title}</h3>
          <p className="popup-city">{place.city}</p>
          <p className="popup-desc">{place.description}</p>
        </div>
      </Popup>
    </Marker>
  )
}

export default function LoveMap() {
  const photoUrls = useMemo(() => {
    const urls = []
    for (let i = 1; i <= 20; i++) {
      const u = getPhotoUrl(i)
      if (u) urls.push(u)
    }
    return urls
  }, [])

  const markers = useMemo(() => {
    return PLACES.map((place, i) => {
      const photoUrl = photoUrls.length > 0
        ? photoUrls[i % photoUrls.length]
        : null
      return { place, icon: createPhotoIcon(photoUrl) }
    })
  }, [photoUrls])

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Los lugares que hemos visitado 🗺️💕
        </motion.h2>
        <p className="text-center text-[var(--theme-text-muted)] mb-8">
          Cada pin es una foto nuestra en ese lugar
        </p>

        <motion.div
          className="map-wrapper rounded-3xl overflow-hidden shadow-2xl border-2 h-[420px] md:h-[520px]"
          style={{ borderColor: 'var(--theme-accent)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MapContainer
            center={ECUADOR_CENTER}
            zoom={DEFAULT_ZOOM}
            className="h-full w-full love-map"
            scrollWheelZoom={true}
            minZoom={6}
            maxZoom={14}
            maxBounds={ECUADOR_BOUNDS}
            maxBoundsViscosity={1}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapFitEcuador />
            {markers.map(({ place, icon }, i) => (
              <PhotoMarker key={`${place.position[0]}-${place.position[1]}-${i}`} place={place} icon={icon} />
            ))}
          </MapContainer>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[...new Set(PLACES.map((p) => p.city))].sort().map((city, i) => (
            <motion.span
              key={city}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              {city}
            </motion.span>
          ))}
        </motion.div>
        <p className="text-center text-[var(--theme-text-muted)] mb-8">
          Por ahora solo en Ecuador, pero quiero conocer el mundo entero contigo
        </p>
      </motion.div>

      <style>{`
        .love-map .leaflet-container {
          font-family: inherit;
          background: #e8f4f8;
          width: 100%
        }
        .photo-marker {
          background: none !important;
          border: none !important;
        }
        .marker-photo-wrap {
          display: block;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          animation: marker-bounce 0.8s ease-out;
        }
        .marker-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .love-map .leaflet-marker-icon {
          transition: transform 0.2s ease;
        }
        .love-map .leaflet-marker-icon:hover .marker-photo-wrap {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        @keyframes marker-bounce {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .cartoon-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          border: 2px solid var(--theme-accent);
          overflow: hidden;
        }
        .cartoon-popup .leaflet-popup-content {
          margin: 12px 16px;
          min-width: 180px;
        }
        .popup-inner { text-align: center; }
        .popup-title {
          font-weight: 700;
          color: var(--theme-text);
          margin: 0;
          font-size: 1rem;
        }
        .popup-city {
          font-size: 0.75rem;
          color: var(--theme-text-muted);
          margin: 2px 0 6px;
        }
        .popup-desc {
          font-size: 0.8rem;
          color: var(--theme-text);
          margin: 0;
          line-height: 1.35;
        }
      `}</style>
    </section>
  )
}
