"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Ruler,
  BedDouble,
  Bath,
  CarFront,
  Info,
} from "lucide-react";

// ==========================
// Editable data
// ==========================
const BRAND = {
  name: "Aued Arquitectura",
  tagline: "Arquitectura funcional y atemporal",
  email: "barbaraaued@gmail.com",
  phone: "+54 9 11 6962-1910",
  instagram: "https://instagram.com/auedarquitectura",
  linkedin: "https://linkedin.com/company/auedarquitectura",
};

const CATEGORIES = [
  { key: "residencial", label: "Residencial" },
  { key: "comercial", label: "Comercial" },
  { key: "interiorismo", label: "Interiorismo" },
  { key: "paisajismo", label: "Paisajismo" },
  { key: "concursos", label: "Concursos" },
];

// Helper type (opcional, si usás TS)
// type Specs = {
//   area_m2?: number;
//   dormitorios?: number;
//   banos?: number;
//   cocheras?: number;
//   lote_m2?: number;
//   niveles?: number;
//   estado?: "proyecto" | "en obra" | "construido";
//   rol?: string; // proyecto, dirección, interiorismo, etc.
//   materiales?: string[];
//   servicios?: string[]; // HVAC, domótica, solar, etc
// };

// Cada proyecto puede tener múltiples imágenes y una ficha técnica (specs)
const PROJECTS = [
  {
    id: "p1",
    title: "Puertos del Lago Marinas L34",
    location: "Puertos, Escobar",
    year: 2024,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/puertos-fotos/L34frenteT.jpeg", // reemplazar por tus rutas
    images: [
      "/fotos/puertos-fotos/L34atrasT.jpeg",
      "/fotos/puertos-fotos/L34patioT.jpeg",
      "/fotos/puertos-fotos/L34piletaT.jpeg",
      "/fotos/puertos-fotos/L34quinchoT.jpeg",
      "/fotos/puertos-fotos/L34terrazaT.jpeg",
    ],
    summary:
      "Proyecto de casa al lago central con las mejores visuales, con un terreno de más de 1100m2. Este proyecto se basa en las reglas de Fen Shui, simetría, volúmenes puros, espacios rectos y un eje predominante. Como hito de la casa tenemos el elemento vertical, la escalera que une los tres pisos, y se jerarquiza con lucarnas, que iluminan ese núcleo y lo envuelven desde el cielo hasta la planta baja atravesando los 3 niveles. Se pensó en un volumen puro negro en planta baja que sostiene el segundo rectángulo, que se apoyó y descansa en él, para marcar más esa volumetría se pensó en una línea virtual con una iluminación de LED. Se eligió la piedra de travertino para la envolvente del volumen central del primer piso, dando una impronta de calidad superior. Para la suite y el sector del tercer piso hacemos que el volumen avance y marque presencia en la fachada, y remarcamos de esta forma las mejores visuales de la casa, desde los sectores más importantes de la casa, espacio mirador, así lo llamamos.",
    specs: {
      area_m2: 650,
      dormitorios: 7,
      banos: 10,
      cocheras: 11,
      lote_m2: 1100,
      niveles: 3,
      estado: "construido",
      rol: "Proyecto y Dirección",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p2",
    title: "Nordelta Carpinchos L69",
    location: "Nordelta, Tigre",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/nordelta-fotos/CarpinchoPortada.jpeg",
    images: [
      "/fotos/nordelta-fotos/CarpinchoL69Lateral.jpeg",
      "/fotos/nordelta-fotos/L69puerta.jpeg",
      "/fotos/nordelta-fotos/L69cocina.jpeg",
      "/fotos/nordelta-fotos/L69pileta.jpeg",
    ],
    summary:
      "Casa construida en un terreno de 550m2 pequeño para los m2 totales a desarrollar, se creó un patio, como generador de un espacio verde, dándole de esta forma movimiento al volumen total de la casa. Se diseñó una doble altura provocando más espacio, con ventanales importantes hacia ese patio, proporcionando una relación hacia el exterior. Se usaron dos colores de revestimiento para poder resaltar con color claro el volumen superior y de esa forma crear a la vista juegos de formas y volúmenes, ya que no se tenía espacio para poder hacer retirosvolumétricos, logrando de esa forma un efecto visual, y un corte de volumétrico. En el acceso, se proyectó una puerta pivot  grande, robusta de hierro envuelta con vidrio, dándole la sensación de penetrabilidad del exterior al interior. La iluminación participa en cada sensación de los espacios creados, tiras de LED perimetrales dando amplitud a los espacios.",
    specs: {
      area_m2: 300,
      dormitorios: 6,
      banos: 5,
      cocheras: 4,
      lote_m2: 550,
      estado: "construido",
      rol: "Proyecto, Interiorismo",
      materiales: ["Tarquini", "Porcelanato Madera", "Microcemento"],
      servicios: ["Losa Radiante", "Iluminación LED", "Riego automático"],
    },
  },
  {
    id: "p3",
    title: "Nordelta El Yatch L391",
    location: "Nordelta, Tigre",
    year: 2024,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/yatch-faur/PHOTO-2026-05-28-20-15-28.jpg",
    images: [
      "/fotos/yatch-faur/6fba7b47-eb0d-45c7-b0a7-1636d8f7dde6.JPG",
      "/fotos/yatch-faur/9d69b9c1-43b0-4e5c-9699-b71da16f0081.JPG",
      "/fotos/yatch-faur/a07b7f1e-cc1f-4c3f-9dd2-4d0ec85b6322.JPG",
      "/fotos/yatch-faur/b4a53f38-abae-4a74-9cc6-59d34dcb7605.JPG",
      "/fotos/yatch-faur/c83c9cbb-867f-4654-b5c4-6b006668edc6.JPG",
      "/fotos/yatch-faur/cc6b1be5-d36d-41be-94ac-b824ab3711a4.JPG",
      "/fotos/yatch-faur/cf71e814-3727-47d8-b063-7bf825d9168d.JPG",
      "/fotos/yatch-faur/e4d19b84-efe2-4ebe-8828-70438b4dff9c.JPG",
    ],
    summary:
      "Casa de gran portada pensada con juegos volumetricos armando una envolvente al núcleo central de esparcimiento: patio - pileta -fogón. Todas las visuales estan enfatizando a ese gran espacio central Se trabajo con 2 grandes volúmenes en cuya intersección nacen los espacios de conexion vertical ascensor y escaleras, que hacen de pivot de ambas alas volumetricas Se centra la puerta de acceso principal en el eje de la casa marcando la profundidad del terreno y enmarca el recorrido de camino al muelle. Se pensó en terrazas escalonadas proyectadas para cada espacio sector privado máster suite y sector sky bar 3 piso.",
    specs: {
      area_m2: 600,
      dormitorios: 7,
      banos: 10,
      cocheras: 4,
      lote_m2: 1000,
      niveles: 3,
      estado: "construccion",
      rol: "Proyecto",
      materiales: ["Madera tratada", "Perfiles Doble T", "Tarquini"],
      servicios: [
        "Riego automático",
        "Calefacción por losa",
        "Iluminación LED",
      ],
    },
  },
  {
    id: "p4",
    title: "Nordelta Carpinchos L70",
    location: "Nordelta, Tigre",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/nordelta-fotos/CARPINCHO70/portadal70.jpeg",
    images: [
      "/fotos/nordelta-fotos/CARPINCHO70/L70cocina.jpeg",
      "/fotos/nordelta-fotos/CARPINCHO70/L70pileta.jpeg",
      "/fotos/nordelta-fotos/CARPINCHO70/L70atras.jpeg",
      "/fotos/nordelta-fotos/CARPINCHO70/397e3f7e-5f72-4b4f-8c28-1b6fa1314de0.jpg",
    ],
    summary:
      "Casa con una distribución muy útil de todos los espacios, se crearon todas las habitaciones al contrafrente con vista al río, y los servicios en laterales, un gran play acompaña esta planta alta uniendo los dormitorios con un área central. En planta baja, cocina americana, con una importante isla divisoria del sector. La piscina es un elemento importante, un espacio de descanso, recreación se pensó un espacio más cerrado con banco para descansar. En cuanto a la volumetría se desarrolló un cambio de color en el sector de las aberturas, haciendo un dibujo envolvente con cambio de color para darle una proporción y corte en cada una de las fachadas.",
    specs: {
      area_m2: 300,
      dormitorios: 6,
      banos: 5,
      cocheras: 3,
      lote_m2: 550,
      niveles: 2,
      estado: "construido",
      rol: "Proyecto ejecutivo",
      materiales: ["Wall Panel", "Porcelanato Madera", "Tarquini"],
      servicios: ["Losa Radiante", "Riego Automatico", "Iluminacion Led"],
    },
  },
  {
    id: "p5",
    title: "Puertos del Lago Araucarias L120",
    location: "Puertos, Escobar",
    year: 2024,
    categories: ["residencial", "interiorismo"],
    cover:
      "/fotos/puertos-fotos/ARAUCARIAS/e24798b1-2e3d-46b7-8395-8892a7a9366b.jpg", // reemplazar por tus rutas
    images: [
      "/fotos/puertos-fotos/ARAUCARIAS/814d44ee-0487-4876-b0b8-ed0ea85fa4fb.jpg",
      "/fotos/puertos-fotos/ARAUCARIAS/c31a5e75-b9ae-4339-86bb-1c08b85c766b.jpg",
      "/fotos/puertos-fotos/ARAUCARIAS/d4ce397b-6364-4638-8e5d-d4076986c138.jpg",
      "/fotos/puertos-fotos/ARAUCARIAS/fbed4f72-ae7d-411b-989e-ae81f09f1842.jpg",
    ],
    summary:
      "Casa con vista abierta al centro deportivo, se proyectó un juego de volúmenes, creado por las diagonales del terreno. El hilo conductor del proyecto fue hacer una doble altura con un hogar central. Una pasarela une los sectores principales de la planta alta, habitaciones hacia el frente con servicios laterales y suite principal con vista al deportivo. En planta baja, cocina americana con una gran barra que divide los espacios. Se armó un baño con doble funcionalidad debido a su ubicación centrado en la casa al lado del gimnasio, dándole uso como toilet y vestuario. Y por último, el sector de la cochera se pensó como otro volumen que se yuxtapone con la traza de los volúmenes totales, se optó por hacerlos en hormigón visto, uniéndose al volumen central.",
    specs: {
      area_m2: 278,
      dormitorios: 4,
      banos: 3,
      cocheras: 4,
      lote_m2: 400,
      niveles: 2,
      estado: "construido",
      rol: "Proyecto y Dirección",
      materiales: ["Tarquini", "Porcelanato Madera", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Iluminacion Led",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p6",
    title: "Villa Nueva El Canal L45",
    location: "Villa Nueva, Tigre",
    year: 2024,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/villa-nueva-fotos/L45portada.jpeg",
    images: [
      "/fotos/villa-nueva-fotos/L45interior.jpeg",
      "/fotos/villa-nueva-fotos/L45baño.jpeg",
      "/fotos/villa-nueva-fotos/L45atras.jpeg",
      "/fotos/villa-nueva-fotos/L45lateral.jpeg",
    ],
    summary:
      "Casa en dos plantas ubicada estratégicamente en un terreno con las mejores visuales a un brazo que desemboca en el río, por lo que todo gira en torno a esa dirección, todas las habitaciones dan al río, cocina comedor al río. Se armó una gran galería con parrilla y un útil baño vestuario que logran armar un espacio exterior muy confortable y práctico. Se trabajó con las volumetrías y efectos lumínicos para darle movimiento, se jerarquizó el sector de play con un volumen con cambio de materialidad utilizando un porcellanatto simil madera dándole calidez, a la vista en el de acceso. También se utilizaron dos tonos de colores para el revestimiento exterior para profundiza el quiebre de los dos volúmenes que intervinieron en el diseño del proyecto.",
    specs: {
      area_m2: 300,
      dormitorios: 6,
      banos: 5,
      cocheras: 4,
      lote_m2: 550,
      estado: "construido",
      rol: "Proyecto, Interiorismo",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p7",
    title: "Canton Islas L339",
    location: "Canton, Escobar",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/canton-fotos/L339portada.jpeg",
    images: [
      "/fotos/canton-fotos/CANTON 339/9a5fbaa3-2a58-4c38-a390-99eb291f6d9b.jpg",
      "/fotos/canton-fotos/CANTON 339/aa095215-64b4-46be-86f5-33d35f16fdf3.jpg",
      "/fotos/canton-fotos/CANTON 339/60b6c769-3fea-45c4-b1e3-2f6342f708f4.jpg",
    ],
    summary:
      "Casa en dos plantas ubicada en una isla con una orientación NE, se ubica la piscina lateral con solarium en el sector del retiro, optimizando los m2 de parque. Se refleja una amplitud en el sector del parque, se gana al trabajar el volumen bien sobre la línea de frente interno logrando tener más espacio en el fondo. Se pensó en dos volúmenes, dos cajas que se enciman y armar diferentes espacios, uno bien marcado es el que se genera en el sector del estacionamiento. Se pensó como un todo, trabajando en conjunto, por tal motivo el sector de cochera es parte del ensamble de los volúmenes. Las habitaciones todas con vistas al lago, para preservar intimidad se diseñó una raja en el área de la circulación en planta alta como pasillo distribuidor. En el sector del play también se lo enfatizó despegándolo del volumen de planta baja con otra materialidad el volumen siendo un porcellanato madera y con ventanas laterales dándole más intimidad al interior, y con una importante lucarna proporcionando iluminación natural central. En este caso recurrimos a dos tonalidades de revestimiento para de este modo profundizar y marcar los volúmenes con los cuales se armó el proyecto.",
    specs: {
      area_m2: 300,
      dormitorios: 5,
      banos: 4,
      cochera: 6,
      lote_m2: 450,
      niveles: 2,
      estado: "construido",
      rol: "Proyecto",
      materiales: ["Madera tratada", "Chapa galvanizada"],
    },
  },
  {
    id: "p8",
    title: "Canton Islas L317",
    location: "Canton, Escobar",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/canton-fotos/L317portada.jpeg",
    images: [
      "/fotos/canton-fotos/ISLAS 317/6a0f818a-bfa5-4cf5-a605-94cafaf13e75.jpg",
      "/fotos/canton-fotos/ISLAS 317/83f7451e-e0db-4ed5-908d-fbfbbb984d20.jpg",
      "/fotos/canton-fotos/ISLAS 317/075225dd-114f-49a4-9bea-2b68fe92b269.jpg",
      "/fotos/canton-fotos/ISLAS 317/dfef4cf8-7235-4ca1-aab1-2b50f169031e.jpg",
    ],
    summary:
      "             Casa con una distribución muy útil de todos los espacios, se crearon todas las habitaciones al contrafrente con vista al río, y los servicios en laterales, un gran play acompaña esta planta alta uniendo los dormitorios con un área central. En planta baja, cocina americana, con una importante isla divisoria del sector. La piscina es un elemento importante, un espacio de descanso, recreación se pensó un espacio más cerrado con banco para descansar. En cuanto a la volumetría se desarrolló uncambio de color en el sector de las aberturas, haciendo un dibujo envolvente con cambio de color para darle una proporción  y corte en cada una de las fachadas.",
    specs: {
      area_m2: 300,
      dormitorios: 6,
      banos: 5,
      cocheras: 4,
      lote_m2: 550,
      niveles: 2,
      estado: "construido",
      rol: "Proyecto ejecutivo",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p9",
    title: "Canton Golf L347",
    location: "Canton, Escobar",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover:
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.47 (1).jpeg", // reemplazar por tus rutas
    images: [
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.45 (1).jpeg",
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.45 (2).jpeg",
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.45.jpeg",
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.46 (1).jpeg",
      "/fotos/canton-fotos/GOLF 346/WhatsApp Image 2024-05-09 at 17.00.46 (2).jpeg",
    ],
    summary:
      "Vivienda unifamiliar con énfasis en luz natural, ventilación cruzada y materiales nobles.",
    specs: {
      area_m2: 300,
      dormitorios: 6,
      banos: 5,
      cocheras: 4,
      lote_m2: 500,
      niveles: 2,
      estado: "construido",
      rol: "Proyecto y Dirección",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p10",
    title: "Talar del Lago 2 L126",
    location: "Pacheco, Tigre",
    year: 2008,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/T.D.L-fotos/TALAR 126/3.jpg",
    images: [
      "/fotos/T.D.L-fotos/TALAR 126/1.jpg",
      "/fotos/T.D.L-fotos/TALAR 126/5.jpg",
      "/fotos/T.D.L-fotos/TALAR 126/L126living.jpeg",
    ],
    summary:
      "   Casa en dos plantas con dos volúmenes bien definidas unidos por un elemento vertical. Una gran escalera que hila las dos plantas acompañada con un gran cristal que enmarca este volumen y proporciona iluminación central a la casa. Esta casa se basó en líneas muy simples y se organizó mediante la unión de una circulación que une sector suite privada y habitaciones con un puente que da a la doble altura del gran espacio central, con ventanales que van hasta la doble altura, proporcionando amplitud y mucho aire visual. El sector de la cocina con esa doble altura está separado por un mobiliario. Un gran portón elemento que demarca los diferentes espacios. Estos volúmenes se despegan mediante su alero con una iluminación profundizando y enmarcando cada volumen.",
    specs: {
      area_m2: 300,
      banos: 5,
      cocheras: 4,
      lote_m2: 550,
      estado: "construido",
      rol: "Proyecto, Interiorismo",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p11",
    title: "Talar del Lago 2 L326",
    location: "Pacheco, Tigre",
    year: 2021,
    categories: ["residencial", "interiorismo"],
    cover: "/fotos/T.D.L-fotos/L326portada.jpeg",
    images: [
      "/fotos/T.D.L-fotos/TALAR 326/IMG_20180312_212429_313.jpg",
      "/fotos/T.D.L-fotos/TALAR 326/IMG_20180312_212429_311.jpg",
      "/fotos/T.D.L-fotos/TALAR 326/IMG_20180312_212429_308.jpg",
      "/fotos/T.D.L-fotos/TALAR 326/IMG_20180312_212429_306.jpg",
      "/fotos/T.D.L-fotos/TALAR 326/IMG_20180312_212429_304.jpg",
    ],
    summary:
      "            Casa en tres pisos, ubicada en un gran terreno de forma triangular, amplio en el frente y cerrado en el fondo, por lo que se aprovechó esta forma del terreno para poder ubicar la mayoría de las habitaciones con vista hacia el lago. Se genera como hilo conductor una traza longitudinal, materializada en un gran muro de piedra dándole peso, jerarquía e impronta al diseño. Este eje divide el sector privado con las circulaciones y el servicio. Para darle más iluminación se genera un patio interno con unas grandes palmeras como punto de concentración de las visuales debido a que de frente ves ese gran muro de piedra que trabaja como telón de las palmeras que salen hacia el cielo. Para darle más iluminación y jerarquizar aún más la piedra del muro se desarrolla un gran techo de vidrio que envuelve a la circulación que une la casa del sector de acceso de servicio a sector de acceso principal de la casa.",
    specs: {
      area_m2: 450,
      dormitorios: 8,
      banos: 8,
      cochera: 6,
      lote_m2: 600,
      niveles: 3,
      estado: "construida",
      rol: "Proyecto",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p12",
    title: "Loma Verde San Sebastian L180",
    location: "San Sebastian, Loma Verde",
    year: 2023,
    categories: ["residencial", "interiorismo"],
    cover:
      "/fotos/dept-san:san-seb:elcanal/SAN SEBASTIAN/a81b2af8-4515-4c23-801e-635abe8cd1d0.jpg",
    images: [
      "/fotos/dept-san:san-seb:elcanal/SAN SEBASTIAN/a14034a6-e981-4dff-831f-058972b6961a.jpg",
      "/fotos/dept-san:san-seb:elcanal/SAN SEBASTIAN/0cf2b693-0102-4a77-8915-79fcbd15e650.jpg",
      "/fotos/dept-san:san-seb:elcanal/SAN SEBASTIAN/0add48c7-ae58-4d20-a638-8525e81792ae.jpg",
      "/fotos/dept-san:san-seb:elcanal/SAN SEBASTIAN/70bc1a17-05cc-4130-acf9-69068f373cce.jpg",
    ],
    summary:
      "       Casa en una planta en forma de L, con un ala en donde se ubica lo privado, habitaciones con vista al lago y área húmeda hacia la calle con abertanamientos más pequeños. El sector del living jerarquizamos la altura dándole medio nivel más, obteniendo más amplitud, y se armaron dos lucarnas importantes en el acceso principal y en el centro del living, ganando efectos de luces y sombras durante el día. La cocina es de tipo americana pero con una barra que divide la zona de cocción y filtra visuales hacia el área de trabajo. Para el quincho se pensó como un sector multi propósito, tiene mesada con anafe, en su bajomesada lavarropas y guardilla para cosas varias. Todas sus visuales al lago. En el punto de intersección de los volúmenes se generó el acceso principal de la casa con visual directo al lago mediante un gran ventanal.",
    specs: {
      area_m2: 150,
      dormitorios: 3,
      banos: 3,
      cocheras: 4,
      lote_m2: 250,
      niveles: 1,
      estado: "construido",
      rol: "Proyecto ejecutivo",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Sistema Domotica",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p13",
    title: "Nordelta Local G2 Iluminacion",
    location: "Nordelta, Tigre",
    year: 2022,
    categories: ["comercial", "interiorismo"],
    cover: "/fotos/LOCAL G2 PALERMO/G2nordeltaportada.jpeg", // reemplazar por tus rutas
    images: ["", "", "", "", ""],
    summary:
      "           Local que se desarrolla en un gran galpón de 6 mts de altura, para bajar esa dimensión se pintó todo de negro y se colocaron bandejas, armando una retícula con distribución simétrica para ubicar la línea de artefactos colgantes. Se arma en el fondo un sector de depósito de mercadería, con un gran muro que se envuelve con un diseño de mueble en durlock que se utiliza también para la exposición de parte de los productos embutidos y lámparas de mesas. Se genera en el sector central de forma simétrica un volumen más bajo y blanco que jerarquiza el sector de trabajo, mesas de computadoras, con un cielorraso desmontable con cambio de placas para la exposición de productos aplicados en cielorraso. Para darle calidez los mobiliarios se hicieron en madera reciclada. Y el solado del salón se hizo con un material de alto tránsito color cobre dándole un toque de distinción. En todo su perímetro se armó vidriera de exposición, optimizando los metros lineales de exposición hacia el exterior.",
    specs: {
      area_m2: 150,
      dormitorios: 2,
      banos: 1,
      cocheras: 20,
      lote_m2: 150,
      niveles: 1,
      estado: "construido",
      rol: "Proyecto y Dirección",
      materiales: ["Piedra de Travertino", "Lapacho", "Aberturas DVH"],
      servicios: [
        "Riego automático",
        "Paneles solares",
        "Calefacción por losa",
      ],
    },
  },
  {
    id: "p14",
    title: "Palermo Local G2 Iluminacion",
    location: "Palermo, CABA",
    year: 2021,
    categories: ["comercial", "interiorismo"],
    cover: "/fotos/LOCAL G2 PALERMO/20140502_174857.jpg",
    images: ["", "", ""],
    summary:
      "                Local que se desarrolla en un lugar urbano con mucha presencia de gente, local alto pero no muy ancho por lo que la altura pasa a ser un tema de gran importancia dándole aire y optimizando espacio para exponer productos. Se pintó negro para resaltar las placas blancas de los artefactos que van sobre laterales de paredes. Y el solado del salón se hizo con un material de alto tránsito color cobre dándole un toque de distinción. Su gran vidriera de doble altura da una gran visual al interior que nos permite visualizar casi todo el local.",
    specs: {
      area_m2: 200,
      dormitorios: 3,
      banos: 1,
      cocheras: 1,
      lote_m2: 200,
      estado: "construido",
      rol: "Proyecto, Interiorismo",
      materiales: ["Chapa microperforada", "Petiribí", "Microcemento"],
      servicios: ["Acústica", "Iluminación LED DALI"],
    },
  },
  {
    id: "p15",
    title: "San Isidro Centro de Estetica",
    location: "Pacheco, Tigre",
    year: 2023,
    categories: ["comercial", "interiorismo"],
    cover: "/fotos/CENTRO ESTETICA/0e453d64-f7f3-4d7b-a97c-6552336139a5.jpg",
    images: ["", "", "", "", ""],
    summary:
      "        Local super femenino, se armó el sector de trabajo de exposición para que desde el exterior se aprecie lo que se hace, bellezas de manos y pies. Sobre lateral de acceso se ubica el sector caja con servicio de cafetería y espera. En el fondo se armaron box, para el trabajo más privado, color, pestañas. Se adornó con flores como emblema del lugar y se usó el color bronce como color que da calidez. Las dos arañas de iluminación marcan dos puntos importantes, acceso y nexo del sector público a lo privado.",
    specs: {
      area_m2: 100,
      dormitorios: 3,
      banos: 1,
      cochera: 10,
      lote_m2: 100,
      niveles: 1,
      estado: "construida",
      rol: "Proyecto",
      materiales: ["Madera tratada", "Chapa galvanizada"],
    },
  },
];

// ==========================
// UI Components
// ==========================

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function SpecChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number | string;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs">
      {icon}
      <span className="font-medium">{value}</span>
      <span className="text-neutral-500">{label}</span>
    </div>
  );
}

function SpecsGrid({ specs }: { specs: any }) {
  if (!specs) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <SpecChip
        icon={<Ruler className="h-3.5 w-3.5" />}
        label="m²"
        value={specs.area_m2}
      />
      <SpecChip
        icon={<BedDouble className="h-3.5 w-3.5" />}
        label="dorm"
        value={specs.dormitorios}
      />
      <SpecChip
        icon={<Bath className="h-3.5 w-3.5" />}
        label="baños"
        value={specs.banos}
      />
      <SpecChip
        icon={<CarFront className="h-3.5 w-3.5" />}
        label="autos"
        value={specs.cocheras}
      />
      <SpecChip
        icon={<Ruler className="h-3.5 w-3.5" />}
        label="lote m²"
        value={specs.lote_m2}
      />
      <SpecChip
        icon={<Info className="h-3.5 w-3.5" />}
        label="niveles"
        value={specs.niveles}
      />
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[number];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<"fotos" | "ficha">("fotos");

  const prev = () =>
    setIndex((i) => (i - 1 + project.images.length) % project.images.length);
  const next = () => setIndex((i) => (i + 1) % project.images.length);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header proyecto */}
        <div className="p-4 md:p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-neutral-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {project.year}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab("fotos")}
              className={`rounded-full px-3 py-1.5 text-sm border ${
                tab === "fotos" ? "bg-neutral-900 text-white" : ""
              }`}
            >
              Fotos
            </button>
            <button
              onClick={() => setTab("ficha")}
              className={`rounded-full px-3 py-1.5 text-sm border ${
                tab === "ficha" ? "bg-neutral-900 text-white" : ""
              }`}
            >
              Ficha técnica
            </button>
          </div>
        </div>

        {/* Contenido */}
        {tab === "fotos" ? (
          <div className="relative">
            <img
              src={project.images[index]}
              alt={`${project.title} — imagen ${index + 1}`}
              className="w-full h-[60vh] md:h-[70vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-2">
              <button
                onClick={prev}
                className="rounded-full bg-white/70 hover:bg-white p-3 m-2"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="rounded-full bg-white/70 hover:bg-white p-3 m-2"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="text-sm text-neutral-700">{project.summary}</p>

              {/* Specs principales */}
              <div className="mt-4">
                <SpecsGrid specs={project.specs} />
              </div>

              {/* Listas (materiales, servicios) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.specs?.materiales?.length ? (
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Materiales</p>
                    <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                      {project.specs.materiales.map((m: string) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.specs?.servicios?.length ? (
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Servicios / Sistemas</p>
                    <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                      {project.specs.servicios.map((s: string) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border p-4 text-sm">
                <p className="font-medium">Detalles</p>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-neutral-700">
                  {project.specs?.estado && (
                    <>
                      <span className="text-neutral-500">Estado</span>
                      <span className="capitalize">{project.specs.estado}</span>
                    </>
                  )}
                  {project.specs?.rol && (
                    <>
                      <span className="text-neutral-500">Rol</span>
                      <span>{project.specs.rol}</span>
                    </>
                  )}
                  {project.specs?.niveles && (
                    <>
                      <span className="text-neutral-500">Niveles</span>
                      <span>{project.specs.niveles}</span>
                    </>
                  )}
                  {project.specs?.lote_m2 && (
                    <>
                      <span className="text-neutral-500">Lote</span>
                      <span>{project.specs.lote_m2} m²</span>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border p-4 text-sm">
                <p className="font-medium">Contacto por esta obra</p>
                <p className="mt-1 text-neutral-600">
                  ¿Querés algo similar? Escribinos y contanos tu idea.
                </p>
                <a
                  href="#contacto"
                  className="mt-3 inline-block rounded-full bg-neutral-900 text-white px-4 py-2"
                >
                  Consultar
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof PROJECTS)[number];
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group text-left"
      aria-label={`Abrir proyecto ${project.title}`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-sm">
        <img
          src={project.cover}
          alt={project.title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-medium drop-shadow-sm">
            {project.title}
          </h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs opacity-90">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {project.year}
            </span>
          </div>
        </div>
      </div>
      {/* Specs resumidas debajo de la card */}
      {project.specs ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <SpecChip
            icon={<Ruler className="h-3.5 w-3.5" />}
            label="m²"
            value={project.specs.area_m2}
          />
          <SpecChip
            icon={<BedDouble className="h-3.5 w-3.5" />}
            label="dorm"
            value={project.specs.dormitorios}
          />
          <SpecChip
            icon={<Bath className="h-3.5 w-3.5" />}
            label="baños"
            value={project.specs.banos}
          />
          <SpecChip
            icon={<CarFront className="h-3.5 w-3.5" />}
            label="autos"
            value={project.specs.cocheras}
          />
        </div>
      ) : null}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {project.summary}
      </p>
    </motion.button>
  );
}

export default function LandingArquitecta() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [openProject, setOpenProject] = useState<
    (typeof PROJECTS)[number] | null
  >(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery = q
        ? [p.title, p.location, p.summary, p.categories.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;
      const matchesFilters = activeFilters.length
        ? activeFilters.every((f) => p.categories.includes(f))
        : true;
      return matchesQuery && matchesFilters;
    });
  }, [query, activeFilters]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-neutral-900 text-white grid place-items-center text-sm font-bold">
              AA
            </div>
            <div>
              <p className="font-semibold leading-tight">{BRAND.name}</p>
              <p className="text-xs text-muted-foreground -mt-0.5">
                {BRAND.tagline}
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#proyectos" className="hover:underline">
              Obras
            </a>
            <a href="#estudio" className="hover:underline">
              Estudio
            </a>
            <a href="#contacto" className="hover:underline">
              Contacto
            </a>
          </nav>
          <a
            href="#contacto"
            className="rounded-full border px-3 py-1.5 text-sm hover:shadow-sm"
          >
            Consultanos
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero.jpg" // reemplazá por tu propia imagen en public/
            alt="Hero arquitectura"
            className="h-[72vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-white/0" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Espacios que mejoran la vida
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-2xl text-base md:text-lg text-neutral-700"
          >
            Proyectamos y construimos obras con foco en calidad, eficiencia y
            estética perdurable.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm hover:shadow"
            >
              Ver obras
            </a>
            <a
              href="#contacto"
              className="rounded-full border px-5 py-2.5 text-sm hover:shadow"
            >
              Solicitar propuesta
            </a>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          title="Obras destacadas"
          subtitle="Filtrá por tipología o buscá por nombre, ubicación, año o descripción."
        />

        {/* Filtros y búsqueda */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
              <Filter className="h-4 w-4" />
              Filtros
            </div>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => toggleFilter(c.key)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  activeFilters.includes(c.key)
                    ? "bg-neutral-900 text-white"
                    : "hover:shadow-sm"
                }`}
              >
                {c.label}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button onClick={clearFilters} className="text-sm underline">
                Limpiar
              </button>
            )}
          </div>
          <label className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border py-2.5 pl-9 pr-3 text-sm focus:outline-none"
            />
          </label>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={() => setOpenProject(p)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No se encontraron proyectos para los filtros aplicados.
            </p>
          )}
        </motion.div>
      </section>

      {/* ESTUDIO / ABOUT */}
      <section id="estudio" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            title="El Estudio"
            subtitle="Diseñamos con criterio técnico y sensibilidad por el detalle."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <img
              src="/about.jpg" // reemplazá por tu propia imagen en public/
              alt="Retrato / equipo"
              className="rounded-2xl object-cover h-72 w-full md:h-full"
            />
            <div className="md:col-span-2 text-sm leading-relaxed text-neutral-700">
              <p>
                Nos especializamos en proyectos residenciales y comerciales de
                pequeña y mediana escala. Entregamos obras que optimizan el
                espacio, la luz y el confort térmico, cuidando los costos y el
                cronograma.
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-medium">Servicios</p>
                  <p className="text-neutral-600 mt-1">
                    Proyecto, dirección de obra, interiorismo, paisajismo y
                    gestión municipal.
                  </p>
                </li>
                <li className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-medium">Metodología</p>
                  <p className="text-neutral-600 mt-1">
                    Relevamiento, anteproyecto, ejecutivo, cómputo y pliegos,
                    licitación y obra.
                  </p>
                </li>
                <li className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-medium">Diferenciales</p>
                  <p className="text-neutral-600 mt-1">
                    Eficiencia energética, materiales durables, proveedores
                    confiables.
                  </p>
                </li>
                <li className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-medium">Áreas</p>
                  <p className="text-neutral-600 mt-1">
                    AMBA, Zona Norte, Tigre y proyectos selectos en el interior.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          title="Contacto"
          subtitle="Contanos tu proyecto. Respondemos en 24–48 hs hábiles."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border p-6">
            <h3 className="font-medium">Datos</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${BRAND.email}`} className="underline">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${BRAND.phone}`} className="underline">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a href={BRAND.instagram} target="_blank" className="underline">
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a href={BRAND.linkedin} target="_blank" className="underline">
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-neutral-500"></p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const data = new FormData(form);
              const subject = encodeURIComponent(
                `Consulta desde la web — ${data.get("nombre")}`
              );
              const body = encodeURIComponent(
                `Nombre: ${data.get("nombre")}
Email: ${data.get("email")}
Teléfono: ${data.get("telefono")}

Mensaje:
${data.get("mensaje")}`
              );
              window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
            }}
            className="md:col-span-2 rounded-2xl border p-6 grid gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="grid gap-1 text-sm">
                <span>Nombre</span>
                <input
                  name="nombre"
                  required
                  className="rounded-xl border px-3 py-2"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border px-3 py-2"
                  placeholder="tu@mail.com"
                />
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span>Teléfono</span>
              <input
                name="telefono"
                className="rounded-xl border px-3 py-2"
                placeholder="Ej: +54 9 11 ..."
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Mensaje</span>
              <textarea
                name="mensaje"
                required
                className="min-h-32 rounded-xl border px-3 py-2"
                placeholder="Contanos tu idea, tiempos y presupuesto orientativo."
              />
            </label>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm hover:shadow"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Todos los derechos
            reservados.
          </p>
          <p className="text-xs">
            Sitio diseñado por Mateo Musi — construido con React + Tailwind.
          </p>
        </div>
      </footer>

      {/* Modal de proyecto */}
      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </div>
  );
}

// ==========================
// Cómo personalizar (resumen rápido)
// 1. Agregá en cada proyecto la clave `specs` con los campos que necesites: area_m2, dormitorios, baños, cocheras, lote_m2, niveles, estado, rol, materiales, servicios.
// 2. Las chips de specs se muestran en las cards y completas en la pestaña "Ficha técnica" del modal.
// 3. Las imágenes apuntan a /public. Cambiá las rutas por las tuyas o usá URLs.
// 4. Si usás Next/Image, podés reemplazar <img> por <Image> y configurar dominios remotos.
// 5. Recordá mantener "use client" arriba para usar hooks en App Router.
// ==========================
