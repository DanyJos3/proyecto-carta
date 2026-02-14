import { useMemo } from 'react'
import { motion } from 'framer-motion'

// const photoGlob = import.meta.glob('../assets/photos/photo*.jpg', { eager: true, query: '?url', import: 'default' })

// function getPhotoUrl(i) {
//   const key = `../assets/photos/photo${i}.jpg`
//   const v = photoGlob[key]
//   return (typeof v === 'string' ? v : v?.default) ?? null
// }

const POLAROIDS = [
  // { photoId: 1, caption: 'Este día fui feliz sin darme cuenta' },
  { photoId: 2, caption: 'Golf cito :3' },
  { photoId: 3, caption: 'Armando el rompecabezas o como se llame jaja' },
  { photoId: 4, caption: 'La previa de nuestra primera navidad' },
  { photoId: 5, caption: 'Que alguien le pare' },
  { photoId: 6, caption: 'Yuquitas..' },
  { photoId: 7, caption: 'En Atacames pal face' },
  { photoId: 8, caption: 'Bonitos y gorditos' },
  { photoId: 9, caption: 'Bielita para la calor' },
  { photoId: 10, caption: 'Besitos' },
  { photoId: 11, caption: 'Con los duendes..' },
  { photoId: 12, caption: 'Escapadita' },
  { photoId: 13, caption: 'Día de pezca (lo intentamos)' },
  { photoId: 14, caption: 'Nuestra primera navidad juntos' },
  { photoId: 15, caption: 'Conociendo Yambo' },
  { photoId: 16, caption: 'Nuestros primeros lentes' },
  { photoId: 17, caption: 'Fotitos en el camino' },
  { photoId: 18, caption: 'Miradores en baños' },
  { photoId: 19, caption: 'Fotitos en los 15' },
  { photoId: 20, caption: 'De cumpleaños' },
  { photoId: 21, caption: 'En la puerta de la ciudad (Loja)' },
  { photoId: 22, caption: 'Escuchando a NERVO 🎶' },
  { photoId: 23, caption: 'En la catedral de Cuenca :3' },
  { photoId: 24, caption: 'Primer día de novios' },
  { photoId: 25, caption: 'Jack y Rose (titanic jaja)' },
  // { photoId: 26, caption: 'Nuestra historia en una foto' },
  { photoId: 27, caption: 'Día de pizza' },
  { photoId: 28, caption: 'Visitando China (no importa que digan los envidiosos)' },
  { photoId: 29, caption: 'Primeras aventuras jaja' },
  { photoId: 30, caption: 'Festejando el día de tu macho castigador :v' },
  { photoId: 31, caption: 'Antes de ganarte en el golf cito' },
  { photoId: 32, caption: 'Conociendo Yambo' },
  // { photoId: 33, caption: '' },
  { photoId: 34, caption: 'Apoyando al Nacho ❤️' },
  { photoId: 35, caption: 'Nuestro primer viaje a la playita' },
  { photoId: 36, caption: 'Mojaditos en baños' },
  { photoId: 37, caption: 'Cenita romantica' },
  { photoId: 38, caption: 'Patinando (o haciendo el intento)' },
  { photoId: 39, caption: 'Mirador desbloqueado' },
  { photoId: 40, caption: 'Fotito en el Lago' },
  { photoId: 42, caption: 'Cuando te pedi ser mi novia 😍' },
  { photoId: 43, caption: 'De farra en cuenquita' },
  { photoId: 44, caption: 'Primer carnavalito' },
  { photoId: 45, caption: 'Fotito en los 15' },
  { photoId: 46, caption: 'Tomando un chocolatito 🤤' },
  { photoId: 47, caption: 'Primer encebollado jaja (bueno creo que el segundo)' },
  { photoId: 48, caption: 'Fotito en el Vulqano Park' },
  { photoId: 49, caption: 'Foto random jaja' },
  { photoId: 50, caption: 'En papallacta con el pri' },

  { photoId: 61, caption: 'Iniciando el año' },
  { photoId: 62, caption: 'Ganándote en los bolos' },



]

// const photoUrls = Array.from({ length: 50 }, (_, i) =>
//   // `/public/photos/IMG_${i}.webp`
//   `${import.meta.env.BASE_URL}photos/IMG_${i + 1}.webp`
// )

export default function PolaroidMemories() {
  // const urls = useMemo(() => POLAROIDS.map((p) => getPhotoUrl(p.photoId)), [])

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Nuestros momentos
      </motion.h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {POLAROIDS.map((item, i) => (
          <motion.div
            key={item.photoId}
            className="relative bg-white p-3 pb-12 rounded-lg shadow-xl"
            style={{
              transform: `rotate(${i % 2 === 0 ? -3 : 2}deg)`,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
          >
            <div className="aspect-square overflow-hidden rounded-sm bg-[var(--theme-background)]">
            <img src={ `${import.meta.env.BASE_URL}photos/IMG_${item.photoId}.webp`} alt="" className="w-full h-full object-cover" />
          
              {/* {urls[i] ? (
                <img src={urls[i]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
                  Foto {item.photoId}
                </div>
              )} */}
            </div>
            <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-medium text-[var(--theme-text)]">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
