import type { ImageMetadata } from 'astro';

import woonkamerLed from '../assets/projects/woonkamer-led-plafond.jpg';
import tvSfeer from '../assets/projects/tv-wand-sfeerverlichting.jpg';
import plafondLed from '../assets/projects/plafond-led-lijnen-tv-wand.jpg';
import wandpanelenGang from '../assets/projects/wandpanelen-gang.jpg';
import wandlijstenVisgraat from '../assets/projects/wandlijsten-visgraat.jpg';
import wandlijstenSfeer from '../assets/projects/wandlijsten-sfeerverlichting.jpg';
import visgraatParket from '../assets/projects/visgraat-parket.jpg';
import keuken from '../assets/projects/keuken-montage.jpg';
import fotobehang from '../assets/projects/fotobehang.jpg';
import aubergine from '../assets/projects/accentmuur-aubergine.jpg';
import zolder from '../assets/projects/zolderkamer-groen.jpg';
import uitbouw from '../assets/projects/uitbouw-lichtstraten.jpg';
import stucwerk from '../assets/projects/stucwerk-sausklaar.jpg';
import boog from '../assets/projects/boogdoorgang-haardwand.jpg';
import tvAanbouw from '../assets/projects/tv-wand-in-aanbouw.jpg';
import voortuin from '../assets/projects/voortuin-tegels-hekwerk.jpg';

export type Category = 'Interieur & maatwerk' | 'Plafonds & verlichting' | 'Wandafwerking' | 'Vloeren' | 'Schilderwerk' | 'Keuken' | 'Buitenwerk';

export interface Project {
  title: string;
  category: Category;
  image: ImageMetadata;
  alt: string;
  /** Slugs van de bijbehorende diensten (voor de dienstpagina's) */
  services: string[];
  /** Beeldvullend uitlichten in de galerij */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Woonkamer met zwevend plafond en LED-lijnen',
    category: 'Plafonds & verlichting',
    image: woonkamerLed,
    alt: 'Woonkamer met verlaagd plafond met LED-lijnen, verlichte wandnissen, haard en tv-wand',
    services: ['stucwerk', 'timmerwerk', 'woningrenovatie'],
    featured: true,
  },
  {
    title: 'Zwevende tv-wand met sfeerverlichting',
    category: 'Interieur & maatwerk',
    image: tvSfeer,
    alt: 'Zwevend tv-paneel met indirecte verlichting op een strak afgewerkte wand boven een visgraatvloer',
    services: ['timmerwerk', 'schilderwerk'],
  },
  {
    title: 'Plafond met LED-lijnen en marmerlook tv-wand',
    category: 'Plafonds & verlichting',
    image: plafondLed,
    alt: 'Strak gestuct plafond met ingebouwde LED-lijnen, spots en een tv-wand in marmerlook met zwarte lamellen',
    services: ['stucwerk', 'timmerwerk'],
    featured: true,
  },
  {
    title: 'Klassieke wandpanelen in de gang',
    category: 'Wandafwerking',
    image: wandpanelenGang,
    alt: 'Lange gang met witte klassieke wandlijsten en een houten vloer',
    services: ['timmerwerk', 'schilderwerk'],
  },
  {
    title: 'Wandlijsten en visgraatvloer',
    category: 'Wandafwerking',
    image: wandlijstenVisgraat,
    alt: 'Kamer met witte wandlijsten rondom en een nieuwe visgraatvloer',
    services: ['vloeren', 'timmerwerk', 'schilderwerk'],
  },
  {
    title: 'Wandlijsten met sfeerverlichting',
    category: 'Wandafwerking',
    image: wandlijstenSfeer,
    alt: 'Witte wand met klassieke lijsten, spots en indirecte verlichting boven een visgraatvloer',
    services: ['timmerwerk', 'schilderwerk', 'vloeren'],
  },
  {
    title: 'Eiken visgraat parket',
    category: 'Vloeren',
    image: visgraatParket,
    alt: 'Licht eiken parket in visgraatpatroon in een lichte kamer met groot raam',
    services: ['vloeren'],
  },
  {
    title: 'Keukenmontage en afwerking',
    category: 'Keuken',
    image: keuken,
    alt: 'Nieuwe keuken met donkere fronten, marmerlook werkblad, zwarte kraan en afzuigkap',
    services: ['keuken-renovatie', 'woningrenovatie'],
    featured: true,
  },
  {
    title: 'Fotobehang als blikvanger',
    category: 'Schilderwerk',
    image: fotobehang,
    alt: 'Volledige wand met fotobehang van een mistig bos met zwaluwen',
    services: ['schilderwerk', 'stucwerk'],
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
  {
    title: 'Uitbouw met lichtstraten',
    category: 'Interieur & maatwerk',
    image: uitbouw,
    alt: 'Nieuwe uitbouw met twee lichtstraten in het plafond en strak gestucte wanden',
    services: ['stucwerk', 'woningrenovatie'],
  },
  {
    title: 'Stucwerk, sausklaar opgeleverd',
    category: 'Wandafwerking',
    image: stucwerk,
    alt: 'Ruimte met vers gestucte, gladde witte wanden tijdens de werkzaamheden',
    services: ['stucwerk'],
  },
  {
    title: 'Boogdoorgang en haardwand',
    category: 'Interieur & maatwerk',
    image: boog,
    alt: 'Woonkamer met sierlijke boogdoorgang, ingebouwde haard en tv-nis en een lichte laminaatvloer',
    services: ['timmerwerk', 'stucwerk', 'vloeren'],
  },
  {
    title: 'In aanbouw: tv-wand met nissen',
    category: 'Interieur & maatwerk',
    image: tvAanbouw,
    alt: 'Tv-wand van gipsplaat met nissen en hoekprofielen, tijdens de bouw',
    services: ['timmerwerk', 'klussen'],
  },
  {
    title: 'Voortuin met keramische tegels en hekwerk',
    category: 'Buitenwerk',
    image: voortuin,
    alt: 'Voortuin met grote grijze keramische tegels, nieuwe stoep en antraciet hekwerk',
    services: ['tegelwerk'],
    featured: true,
  },
];

export const categories = [...new Set(projects.map((p) => p.category))];

export const projectsForService = (slug: string) => projects.filter((p) => p.services.includes(slug));
