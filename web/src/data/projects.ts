import type { ImageMetadata } from 'astro';

import woonkamerLed from '../assets/projects/woonkamer-led-plafond.jpg';
import plafondLed from '../assets/projects/plafond-led-lijnen-tv-wand.jpg';
import wandpanelenGang from '../assets/projects/wandpanelen-gang.jpg';
import wandlijstenVisgraat from '../assets/projects/wandlijsten-visgraat.jpg';
import visgraatParket from '../assets/projects/visgraat-parket.jpg';
import keuken from '../assets/projects/keuken-montage.jpg';
import aubergine from '../assets/projects/accentmuur-aubergine.jpg';
import zolder from '../assets/projects/zolderkamer-groen.jpg';
import uitbouw from '../assets/projects/uitbouw-lichtstraten.jpg';
import tvAanbouw from '../assets/projects/tv-wand-in-aanbouw.jpg';
import voortuin from '../assets/projects/voortuin-tegels-hekwerk.jpg';
import doucheMarmer from '../assets/projects/inloopdouche-marmerlook.jpg';
import doucheVisgraat from '../assets/projects/inloopdouche-visgraat.jpg';
import doucheGrootformaat from '../assets/projects/douche-grootformaat-tegels.jpg';
import badkamerLeidingwerk from '../assets/projects/badkamer-leidingwerk.jpg';
import trap from '../assets/projects/trap-bekleed.jpg';
import vloerWand from '../assets/projects/vloer-wand-grootformaat.jpg';
import toilet from '../assets/projects/hangtoilet.jpg';

export type Category =
  | 'Badkamers & sanitair' | 'Tegelwerk' | 'Plafonds & verlichting' | 'Interieur & maatwerk'
  | 'Wandafwerking' | 'Vloeren & trappen' | 'Keuken' | 'Schilderwerk' | 'Buitenwerk';

export interface Project {
  title: string;
  category: Category;
  image: ImageMetadata;
  alt: string;
  /** Slugs van de bijbehorende diensten (voor de dienstpagina's) */
  services: string[];
}

/** Volgorde = volgorde in de galerij. Alleen eigen werk van Sultan Bouw & Renovatie. */
export const projects: Project[] = [
  {
    title: 'Woonkamer met zwevend plafond en LED-lijnen',
    category: 'Plafonds & verlichting',
    image: woonkamerLed,
    alt: 'Woonkamer met verlaagd plafond met LED-lijnen, verlichte wandnissen, haard en tv-wand',
    services: ['stucwerk', 'timmerwerk', 'woningrenovatie'],
  },
  {
    title: 'Inloopdouche in marmerlook',
    category: 'Badkamers & sanitair',
    image: doucheMarmer,
    alt: 'Inloopdouche met grote marmerlook tegels, ingebouwde nis en een lange douchegoot',
    services: ['badkamer-renovatie', 'tegelwerk', 'loodgieterswerk'],
  },
  {
    title: 'Keukenmontage en afwerking',
    category: 'Keuken',
    image: keuken,
    alt: 'Nieuwe keuken met donkere fronten, marmerlook werkblad, zwarte kraan en afzuigkap',
    services: ['keuken-renovatie', 'woningrenovatie'],
  },
  {
    title: 'Trap opnieuw bekleed',
    category: 'Vloeren & trappen',
    image: trap,
    alt: 'Draaitrap bekleed met grijze betonlook treden en aluminium trapneuzen',
    services: ['vloeren', 'tegelwerk', 'reparaties-onderhoud'],
  },
  {
    title: 'Toiletruimte met hangtoilet',
    category: 'Badkamers & sanitair',
    image: toilet,
    alt: 'Toilet met hangtoilet, inbouwreservoir, marmerlook wandtegels en een tegelnis',
    services: ['loodgieterswerk', 'badkamer-renovatie', 'tegelwerk'],
  },
  {
    title: 'Voortuin met keramische tegels en hekwerk',
    category: 'Buitenwerk',
    image: voortuin,
    alt: 'Voortuin met grote grijze keramische tegels, nieuwe stoep en antraciet hekwerk',
    services: ['tegelwerk', 'klussen'],
  },
  {
    title: 'Inloopdouche met visgraattegels',
    category: 'Badkamers & sanitair',
    image: doucheVisgraat,
    alt: 'Inloopdouche met groene wandtegels in visgraatpatroon en een donkere douchevloer met goot',
    services: ['badkamer-renovatie', 'tegelwerk'],
  },
  {
    title: 'Plafond met LED-lijnen en marmerlook tv-wand',
    category: 'Plafonds & verlichting',
    image: plafondLed,
    alt: 'Strak gestuct plafond met ingebouwde LED-lijnen, spots en een tv-wand in marmerlook met zwarte lamellen',
    services: ['stucwerk', 'timmerwerk'],
  },
  {
    title: 'Grootformaat tegels op vloer en wand',
    category: 'Tegelwerk',
    image: vloerWand,
    alt: 'Badkamer in aanbouw met grootformaat marmerlook tegels op vloer en wanden, met tegelnivelleersysteem',
    services: ['tegelwerk', 'badkamer-renovatie'],
  },
  {
    title: 'Klassieke wandpanelen in de gang',
    category: 'Wandafwerking',
    image: wandpanelenGang,
    alt: 'Lange gang met witte klassieke wandlijsten en een houten vloer',
    services: ['timmerwerk', 'schilderwerk'],
  },
  {
    title: 'Badkamer in aanbouw: leidingwerk en tegels',
    category: 'Badkamers & sanitair',
    image: badkamerLeidingwerk,
    alt: 'Badkamer in aanbouw met marmerlook tegels, aansluitingen voor toilet en kranen en een donkere douchewand met nis',
    services: ['loodgieterswerk', 'badkamer-renovatie', 'tegelwerk'],
  },
  {
    title: 'Eiken visgraat parket',
    category: 'Vloeren & trappen',
    image: visgraatParket,
    alt: 'Licht eiken parket in visgraatpatroon in een lichte kamer met groot raam',
    services: ['vloeren'],
  },
  {
    title: 'Douche met grootformaat tegels',
    category: 'Tegelwerk',
    image: doucheGrootformaat,
    alt: 'Douchehoek tijdens het tegelen met donkere marmerlook wandtegels, een rvs-nis en lichte vloertegels',
    services: ['tegelwerk', 'badkamer-renovatie'],
  },
  {
    title: 'Uitbouw met lichtstraten',
    category: 'Interieur & maatwerk',
    image: uitbouw,
    alt: 'Nieuwe uitbouw met twee lichtstraten in het plafond en strak gestucte wanden',
    services: ['stucwerk', 'woningrenovatie', 'deuren-kozijnen'],
  },
  {
    title: 'Wandlijsten en visgraatvloer',
    category: 'Wandafwerking',
    image: wandlijstenVisgraat,
    alt: 'Kamer met witte wandlijsten rondom en een nieuwe visgraatvloer',
    services: ['vloeren', 'timmerwerk', 'schilderwerk'],
  },
  {
    title: 'In aanbouw: tv-wand met nissen',
    category: 'Interieur & maatwerk',
    image: tvAanbouw,
    alt: 'Tv-wand van gipsplaat met nissen en hoekprofielen, tijdens de bouw',
    services: ['timmerwerk', 'klussen'],
  },
  {
    title: 'Accentmuur in aubergine',
    category: 'Schilderwerk',
    image: aubergine,
    alt: 'Strak geschilderde accentwand in diep aubergine naast een groot raam',
    services: ['schilderwerk'],
  },
  {
    title: 'Zolderkamer in diepgroen',
    category: 'Schilderwerk',
    image: zolder,
    alt: 'Zolderkamer met schuine wanden en dakraam, volledig groen geschilderd',
    services: ['schilderwerk', 'deuren-kozijnen'],
  },
];

export const categories = [...new Set(projects.map((p) => p.category))];

export const projectsForService = (slug: string) => projects.filter((p) => p.services.includes(slug));
