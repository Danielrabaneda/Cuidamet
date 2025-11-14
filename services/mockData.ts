import { Provider, CareCategory, ServiceDescription, Review } from '../types';

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 1,
    name: 'Ana García',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.ELDERLY, CareCategory.CHILDREN],
    coordinates: { latitude: 40.4168, longitude: -3.7038 },
    distance: 0,
    rating: 4.9,
    reviewsCount: 34,
    isPremium: true,
    descriptions: [
      { category: CareCategory.ELDERLY, text: 'Como enfermera con 10 años de experiencia geriátrica, ofrezco cuidados médicos especializados, gestión de medicación y un trato compasivo.' },
      { category: CareCategory.CHILDREN, text: 'Con experiencia pediátrica, brindo un cuidado infantil seguro y estimulante. Paciente y profesional, creo un entorno de confianza para los más pequeños.' }
    ],
    services: ['Gestión de Medicamentos', 'Compañía', 'Asistencia en Movilidad', 'Canguro'],
    hourlyRate: 15,
    location: 'Centro, Madrid',
    verifications: ['DNI Verificado', 'Certificado de Primeros Auxilios', 'Referencias Comprobadas'],
    reviews: [
        { id: 1, authorName: 'Lucía M.', authorPhotoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200', rating: 5, comment: 'Ana es maravillosa. Mi madre la adora. Es puntual, profesional y muy cariñosa. Totalmente recomendable.', date: 'Hace 1 semana' },
        { id: 2, authorName: 'Javier P.', authorPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200', rating: 5, comment: 'Contraté a Ana para cuidar de mis hijos y no puedo estar más contento. Es creativa, responsable y los niños se lo pasan genial con ella.', date: 'Hace 3 semanas' },
        { id: 3, authorName: 'Carmen R.', authorPhotoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200', rating: 4, comment: 'Muy buena profesional, aunque a veces es un poco difícil contactar con ella por la alta demanda que tiene. Por lo demás, todo perfecto.', date: 'Hace 1 mes' }
    ],
    badges: ['Premium', 'Mejor Valorado', 'Respuesta Rápida']
  },
  {
    id: 2,
    name: 'Carlos Rodriguez',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.CHILDREN],
    coordinates: { latitude: 40.4339, longitude: -3.7035 },
    distance: 0,
    rating: 4.5,
    reviewsCount: 18,
    descriptions: [
      { category: CareCategory.CHILDREN, text: 'Educador infantil certificado. Me encanta crear actividades divertidas y educativas que fomenten el desarrollo de los más pequeños. ¡La seguridad es mi prioridad!' }
    ],
    services: ['Tutorías', 'Recogida del colegio', 'Preparación de meriendas', 'Juegos creativos'],
    hourlyRate: 12,
    location: 'Chamberí, Madrid',
    verifications: ['DNI Verificado', 'Certificado de Antecedentes Penales'],
    reviews: [
        { id: 4, authorName: 'Beatriz G.', authorPhotoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200', rating: 5, comment: 'Carlos es un profesor fantástico. Mi hijo ha mejorado mucho en matemáticas gracias a él. Es paciente y sabe cómo motivar a los niños.', date: 'Hace 2 semanas' },
        { id: 5, authorName: 'David S.', authorPhotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200', rating: 4, comment: 'Buen servicio de recogida del colegio. Siempre puntual. A mi hija le cae muy bien.', date: 'Hace 1 mes' },
    ]
  },
  {
    id: 3,
    name: 'Laura Fernandez',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.PETS],
    coordinates: { latitude: 40.4154, longitude: -3.6844 },
    distance: 0,
    rating: 5.0,
    reviewsCount: 42,
    isPremium: true,
    descriptions: [
      { category: CareCategory.PETS, text: 'Técnica veterinaria y amante de los animales de toda la vida. Especializada en paseos de perros, cuidado a domicilio y administración de medicamentos.' }
    ],
    services: ['Paseo de Perros', 'Cuidado a Domicilio', 'Administración de Medicamentos'],
    hourlyRate: 10,
    location: 'Retiro, Madrid',
    verifications: ['DNI Verificado', 'Referencias Comprobadas', 'Formación Veterinaria'],
    reviews: [
      { id: 6, authorName: 'Marta V.', authorPhotoUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200', rating: 5, comment: 'Laura es la mejor cuidadora que podría desear para mis dos perros. Se nota que le apasionan los animales y ellos la adoran. Confianza 100%.', date: 'Hace 5 días' },
      { id: 7, authorName: 'Sergio L.', authorPhotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', rating: 5, comment: 'Impecable. Cuidó de mi gato mientras estaba de vacaciones y me mantuvo informado con fotos todos los días. Un servicio de 10.', date: 'Hace 1 mes' }
    ],
    badges: ['Premium', 'Experta en Mascotas']
  },
  {
    id: 4,
    name: 'David Martinez',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.ELDERLY],
    coordinates: { latitude: 40.4284, longitude: -3.6778 },
    distance: 0,
    rating: 4.0,
    reviewsCount: 8,
    descriptions: [
      { category: CareCategory.ELDERLY, text: 'Cuidador amable y responsable, enfocado en proporcionar una excelente compañía y asistencia en las tareas diarias para mejorar la calidad de vida de las personas mayores.' }
    ],
    services: ['Compras', 'Tareas Domésticas Ligeras', 'Compañía y Conversación'],
    hourlyRate: 13,
    location: 'Salamanca, Madrid',
    verifications: ['DNI Verificado', 'Certificado de Antecedentes Penales'],
    reviews: [
      { id: 8, authorName: 'Elena F.', authorPhotoUrl: 'https://images.unsplash.com/photo-1542596768-5d1d6bf6cf52?q=80&w=200', rating: 4, comment: 'David es muy amable y servicial. Ayudó a mi padre con las compras y le hizo mucha compañía. Un gran apoyo para la familia.', date: 'Hace 2 meses' }
    ]
  },
  {
    id: 5,
    name: 'Sofia Lopez',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.CHILDREN],
    coordinates: { latitude: 40.3995, longitude: -3.7022 },
    distance: 0,
    rating: 4.8,
    reviewsCount: 25,
    descriptions: [
      { category: CareCategory.CHILDREN, text: 'Estudiante de pedagogía con amplia experiencia en el cuidado de niños de todas las edades. Certificada en RCP y primeros auxilios. Creativa y muy paciente.' }
    ],
    services: ['Canguro', 'Ayuda con los Deberes', 'Juego Creativo'],
    hourlyRate: 11,
    location: 'Arganzuela, Madrid',
    verifications: ['DNI Verificado', 'Certificado de Primeros Auxilios'],
    reviews: [
      { id: 9, authorName: 'Pablo N.', authorPhotoUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200', rating: 5, comment: 'Sofía es una canguro excepcional. Mis hijos la adoran. Es puntual, responsable y siempre viene con ideas de juegos nuevos.', date: 'Hace 3 semanas' },
      { id: 10, authorName: 'Cristina A.', authorPhotoUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200', rating: 4.5, comment: 'Muy contentos con Sofía. Nos ha salvado en más de una ocasión con poca antelación. Muy profesional.', date: 'Hace 1 mes' },
    ],
    badges: ['Mejor Valorado']
  },
  {
    id: 6,
    name: 'Javier Perez',
    photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.PETS, CareCategory.ELDERLY],
    coordinates: { latitude: 40.4337, longitude: -3.7155 },
    distance: 0,
    rating: 4.5,
    reviewsCount: 15,
    descriptions: [
      { category: CareCategory.PETS, text: 'Amante de los animales, ofrezco paseos largos y alojamiento en un hogar con jardín. Tu mascota estará en las mejores manos.' },
      { category: CareCategory.ELDERLY, text: 'Ofrezco compañía y asistencia en tareas diarias para personas mayores. Soy responsable, puntual y tengo una gran capacidad de escucha.' }
    ],
    services: ['Alojamiento de Perros', 'Cuidado de Gatos', 'Paseos Diarios', 'Compañía'],
    hourlyRate: 14,
    location: 'Moncloa, Madrid',
    verifications: ['DNI Verificado', 'Referencias Comprobadas'],
    reviews: [
      { id: 11, authorName: 'Raquel G.', authorPhotoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200', rating: 5, comment: 'Javier cuidó de mi perro "Rocky" durante un fin de semana y todo fue genial. Me mandó fotos y se notaba que Rocky estaba feliz. Repetiré sin duda.', date: 'Hace 1 mes' },
      { id: 12, authorName: 'Fernando T.', authorPhotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200', rating: 4, comment: 'Buen conversador y muy atento con mi abuelo. Un gran servicio de compañía.', date: 'Hace 3 meses' }
    ]
  },
    {
    id: 7,
    name: 'Isabel Torres',
    photoUrl: 'https://images.unsplash.com/photo-1618093356247-83321401a4e8?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.ELDERLY],
    coordinates: { latitude: 40.4005, longitude: -3.7441 },
    distance: 0,
    rating: 4.8,
    reviewsCount: 22,
    descriptions: [
        { category: CareCategory.ELDERLY, text: 'Dedicada a ayudar a las personas mayores a vivir de forma cómoda e independiente en su propio hogar. Cuento con formación específica en movilización y cuidado personal.' }
    ],
    services: ['Cuidado Personal', 'Preparación de Comidas', 'Recados'],
    hourlyRate: 14,
    location: 'Latina, Madrid',
    verifications: ['DNI Verificado', 'Certificado de Profesionalidad'],
    reviews: [
        { id: 13, authorName: 'Sonia H.', authorPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200', rating: 5, comment: 'Isabel es una profesional excepcional. Su ayuda con mi abuela ha sido inestimable. Su trato es humano y cercano, y técnicamente es impecable.', date: 'Hace 2 semanas' },
        { id: 14, authorName: 'Andrés V.', authorPhotoUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=200', rating: 4.5, comment: 'Muy contentos con el servicio. Isabel es muy organizada y prepara comidas muy saludables.', date: 'Hace 1 mes' },
    ],
    badges: ['Experta en Mayores']
  },
  {
    id: 8,
    name: 'Miguel Sanchez',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.CHILDREN],
    coordinates: { latitude: 40.4190, longitude: -3.7010 },
    distance: 0,
    rating: 5.0,
    reviewsCount: 11,
    descriptions: [
        { category: CareCategory.CHILDREN, text: 'Padre de dos hijos con pasión por el cuidado infantil. Disponible los fines de semana. Me encanta organizar actividades deportivas y al aire libre.' }
    ],
    services: ['Canguro de Fin de Semana', 'Actividades Deportivas', 'Lectura de Cuentos'],
    hourlyRate: 13,
    location: 'Centro, Madrid',
    verifications: ['DNI Verificado', 'Padre con Experiencia'],
    reviews: [
        { id: 15, authorName: 'Laura J.', authorPhotoUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200', rating: 5, comment: 'Miguel ha sido un descubrimiento. Cuidó de nuestros hijos el sábado y volvieron encantados contando todas las aventuras que habían vivido en el parque. ¡Repetiremos seguro!', date: 'Hace 1 semana' },
    ]
  },
  {
    id: 9,
    name: 'María Dolores Soler',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.ELDERLY],
    coordinates: { latitude: 37.9838, longitude: -1.1307 },
    distance: 0,
    rating: 4.9,
    reviewsCount: 28,
    descriptions: [
        { category: CareCategory.ELDERLY, text: 'Auxiliar de geriatría con más de 15 años de experiencia. Ofrezco un cuidado integral, desde la higiene personal hasta la preparación de dietas específicas y acompañamiento a citas médicas. Mi prioridad es el bienestar y la dignidad de la persona.' }
    ],
    services: ['Aseo e Higiene Personal', 'Control de medicación', 'Preparación de comidas', 'Acompañamiento'],
    hourlyRate: 16,
    location: 'Centro, Murcia',
    verifications: ['DNI Verificado', 'Certificado de Geriatría', 'Referencias Comprobadas'],
    reviews: [
        { id: 16, authorName: 'Familia Sánchez', authorPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200', rating: 5, comment: 'Estamos encantados con Mª Dolores. Es una profesional increíble y trata a mi padre con un cariño excepcional. La recomendamos 100%.', date: 'Hace 2 semanas' },
        { id: 17, authorName: 'Pedro G.', authorPhotoUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200', rating: 4.8, comment: 'Muy responsable y atenta. Se encarga de toda la medicación sin un solo fallo.', date: 'Hace 1 mes' }
    ],
    badges: ['Mejor Valorado']
  },
  {
    id: 10,
    name: 'José Manuel Ruiz',
    photoUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.CHILDREN, CareCategory.PETS],
    coordinates: { latitude: 37.9734, longitude: -1.2185 },
    distance: 0,
    rating: 4.6,
    reviewsCount: 19,
    descriptions: [
        { category: CareCategory.CHILDREN, text: 'Monitor de ocio y tiempo libre. Me encanta organizar juegos y talleres para los niños. También puedo ayudar con los deberes.' },
        { category: CareCategory.PETS, text: 'Gran amante de los perros. Ofrezco paseos largos por la zona del río y mucho juego para que gasten energía.' }
    ],
    services: ['Canguro', 'Ayuda con deberes', 'Paseo de Perros', 'Juegos al aire libre'],
    hourlyRate: 11,
    location: 'Alcantarilla, Murcia',
    verifications: ['DNI Verificado', 'Título de Monitor de Ocio'],
    reviews: [
        { id: 18, authorName: 'Lucía F.', authorPhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', rating: 5, comment: 'Mis hijos se lo pasan genial con José Manuel. Siempre tiene juegos nuevos preparados. Y mi perro vuelve agotado y feliz de sus paseos.', date: 'Hace 3 semanas' },
        { id: 19, authorName: 'Antonio M.', authorPhotoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200', rating: 4, comment: 'Buen cuidador, puntual y responsable.', date: 'Hace 2 meses' }
    ]
  },
  {
    id: 11,
    name: 'Carmen Navarro',
    photoUrl: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.PETS],
    coordinates: { latitude: 37.9790, longitude: -1.1332 },
    distance: 0,
    rating: 5.0,
    reviewsCount: 31,
    descriptions: [
        { category: CareCategory.PETS, text: 'Voluntaria en protectoras de animales. Ofrezco cuidado a domicilio para gatos y otros animales pequeños. Experiencia con medicación oral.' }
    ],
    services: ['Cuidado de gatos a domicilio', 'Alimentación y limpieza', 'Administración de medicación'],
    hourlyRate: 12,
    location: 'El Carmen, Murcia',
    verifications: ['DNI Verificado', 'Referencias de Protectora'],
    reviews: [
        { id: 20, authorName: 'Elena V.', authorPhotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200', rating: 5, comment: 'Carmen es un amor con los animales. Cuidó de mi gata como si fuera suya, mandándome fotos todos los días. ¡Totalmente de fiar!', date: 'Hace 1 semana' }
    ],
    badges: ['Experta en Mascotas']
  },
  {
    id: 12,
    name: 'Francisco López',
    photoUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=400&auto=format&fit=crop',
    categories: [CareCategory.ELDERLY, CareCategory.CHILDREN],
    coordinates: { latitude: 37.9750, longitude: -1.2200 },
    distance: 0,
    rating: 4.7,
    reviewsCount: 14,
    descriptions: [
        { category: CareCategory.ELDERLY, text: 'Ofrezco servicio de acompañamiento y recados para personas mayores. Soy una persona paciente y un buen conversador.' },
        { category: CareCategory.CHILDREN, text: 'Puedo recoger a los niños del colegio y llevarlos a actividades extraescolares. Tengo vehículo propio.' }
    ],
    services: ['Acompañamiento', 'Recados y compras', 'Recogida del colegio', 'Traslados'],
    hourlyRate: 13,
    location: 'Alcantarilla, Murcia',
    verifications: ['DNI Verificado', 'Carnet de Conducir'],
    reviews: [
        { id: 21, authorName: 'Isabel R.', authorPhotoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200', rating: 5, comment: 'Puntualidad y amabilidad. Francisco recoge a mi hijo del colegio y estamos muy tranquilos. Un gran servicio.', date: 'Hace 1 mes' }
    ]
  }
];