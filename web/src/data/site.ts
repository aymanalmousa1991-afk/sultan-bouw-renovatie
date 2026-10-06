/**
 * Centrale bedrijfsgegevens. Alles wat op de website over het bedrijf staat,
 * komt hier vandaan — pas het hier aan en het verandert overal.
 */
export const company = {
  name: 'Sultan Bouw & Renovatie',
  shortName: 'Sultan',
  tagline: 'Bouw & Renovatie',
  email: 'sultanbouwrenovatie@gmail.com',
  phone: '06 300 03 016',
  phoneHref: 'tel:+31630003016',
  whatsappHref: 'https://wa.me/31630003016',
  kvk: '42173940',
  owner: 'Adel Al Sultan',
  city: 'Amsterdam',
  radiusKm: 60,
  yearsExperience: 10,
  hours: [
    { days: 'Maandag – vrijdag', time: '09:00 – 17:00' },
    { days: 'Zaterdag & zondag', time: 'Gesloten' },
  ],
  socials: {
    instagram: 'https://www.instagram.com/sultanbouwrenovatie/',
    facebook: 'https://www.facebook.com/profile.php?id=61595327363023',
    tiktok: 'https://www.tiktok.com/@sultanbouwrenovatieadel',
  },
} as const;

/** Kerncijfers (bevestigd door de eigenaar). */
export const stats = [
  { value: 10, suffix: '+', label: 'Jaar ervaring' },
  { value: 400, suffix: '+', label: 'Afgeronde projecten' },
  { value: 60, suffix: ' km', label: 'Werkgebied rond Amsterdam' },
  { value: 24, suffix: ' uur', label: 'Reactie op uw aanvraag' },
];

export type ServiceIcon =
  | 'paint' | 'tiles' | 'plumbing' | 'plaster' | 'carpentry' | 'door'
  | 'bath' | 'kitchen' | 'floor' | 'repair' | 'tools' | 'house';

export interface Service {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: ServiceIcon;
  includes: string[];
}

export const services: Service[] = [
  {
    slug: 'schilderwerk',
    title: 'Schilderwerk',
    short: 'Binnen & buiten, strak en duurzaam afgewerkt.',
    intro: 'Een goede verflaag beschermt en maakt het verschil in uitstraling. Wij schuren, plamuren en grondverven zorgvuldig voor, zodat het eindresultaat strak is en jaren mooi blijft — binnen én buiten.',
    icon: 'paint',
    includes: ['Muren en plafonds', 'Kozijnen, deuren en trappen', 'Buitenschilderwerk en houtrot herstel', 'Advies over kleur en verfsoort'],
  },
  {
    slug: 'tegelwerk',
    title: 'Tegelwerk',
    short: 'Wanden, vloeren en badkamers — waterpas en strak gevoegd.',
    intro: 'Van klassieke metrotegels tot grote keramische platen: wij leggen tegels exact uitgelijnd, waterpas en met strakke voegen. Ook de juiste ondergrond en waterdichting nemen we mee.',
    icon: 'tiles',
    includes: ['Wand- en vloertegels', 'Grootformaat tegels', 'Badkamer- en toilettegels', 'Kitwerk en waterdichting'],
  },
  {
    slug: 'loodgieterswerk',
    title: 'Loodgieterswerk & sanitair',
    short: 'Leidingen, afvoer en sanitair vakkundig aangesloten.',
    intro: 'Een nieuw toilet, een verplaatste wastafel of complete leidingen: wij zorgen dat water- en afvoerwerk veilig, lekvrij en volgens de regels wordt aangelegd.',
    icon: 'plumbing',
    includes: ['Water- en afvoerleidingen', 'Toiletten, wastafels en douches', 'Verplaatsen van aansluitingen', 'Lekkages verhelpen'],
  },
  {
    slug: 'stucwerk',
    title: 'Stucwerk & wandafwerking',
    short: 'Glad, sierpleister of betonlook — een perfecte basis.',
    intro: 'Strakke wanden en plafonds vormen de basis van elke ruimte. Wij stucen glad, brengen sierpleister aan of creëren een moderne betonlook die precies past bij uw interieur.',
    icon: 'plaster',
    includes: ['Glad stucwerk (behangklaar of sausklaar)', 'Sierpleister en spachtelputz', 'Betonlook en kalkverf', 'Plafonds egaliseren'],
  },
  {
    slug: 'timmerwerk',
    title: 'Timmerwerk & montage',
    short: 'Maatwerk en montage, netjes en met precisie.',
    intro: 'Van een inbouwkast op maat tot een nieuwe scheidingswand: onze timmerwerkzaamheden zijn nauwkeurig, stevig en netjes afgewerkt.',
    icon: 'carpentry',
    includes: ['Inbouwkasten en maatwerk', 'Metal-stud en scheidingswanden', 'Plinten, aftimmeren en koven', 'Montage van meubels en keukens'],
  },
  {
    slug: 'deuren-kozijnen',
    title: 'Deuren, kozijnen & afwerking',
    short: 'Plaatsen, vervangen en perfect afhangen.',
    intro: 'Deuren die soepel sluiten en kozijnen die strak in de muur staan geven rust in huis. Wij plaatsen, vervangen en werken alles tot in detail af.',
    icon: 'door',
    includes: ['Binnendeuren afhangen', 'Kozijnen plaatsen en vervangen', 'Hang- en sluitwerk', 'Afwerking met lijsten en kit'],
  },
  {
    slug: 'badkamer-renovatie',
    title: 'Badkamer renovatie',
    short: 'Van sloop tot de laatste kitnaad — één aanspreekpunt.',
    intro: 'Een nieuwe badkamer zonder gedoe. Wij regelen alles: slopen, leidingwerk, tegelwerk, sanitair en afwerking. U heeft één aanspreekpunt en een heldere planning.',
    icon: 'bath',
    includes: ['Complete sloop en afvoer', 'Leidingwerk en waterdichting', 'Tegelwerk en inloopdouches', 'Sanitair plaatsen en afwerken'],
  },
  {
    slug: 'keuken-renovatie',
    title: 'Keuken renovatie & montage',
    short: 'Nieuwe keuken geplaatst of uw huidige keuken vernieuwd.',
    intro: 'Wij monteren uw nieuwe keuken vakkundig of geven uw bestaande keuken een tweede leven — inclusief aansluitingen, achterwand en afwerking.',
    icon: 'kitchen',
    includes: ['Keukenmontage', 'Water- en afvoeraansluitingen', 'Tegelwerk en achterwanden', 'Verbouwen en indeling wijzigen'],
  },
  {
    slug: 'vloeren',
    title: 'Vloeren leggen',
    short: 'Laminaat, PVC, parket of tegels — strak gelegd.',
    intro: 'Een mooie vloer begint bij een vlakke ondergrond. Wij egaliseren waar nodig en leggen uw laminaat, PVC, parket of tegelvloer strak en met nette plinten.',
    icon: 'floor',
    includes: ['Laminaat en PVC (ook visgraat)', 'Parket', 'Egaliseren van de ondergrond', 'Plinten en overgangsprofielen'],
  },
  {
    slug: 'reparaties-onderhoud',
    title: 'Reparaties & onderhoud',
    short: 'Snel en vakkundig verholpen, zodat alles weer werkt.',
    intro: 'Een klemmende deur, een lekkende kraan of beschadigd stucwerk: wij lossen het snel en vakkundig op. Ook voor periodiek onderhoud kunt u bij ons terecht.',
    icon: 'repair',
    includes: ['Kleine reparaties in huis', 'Herstel van schade', 'Periodiek onderhoud', 'Voor particulieren en verhuurders'],
  },
  {
    slug: 'klussen',
    title: 'Kleine én grote klussen',
    short: 'Geen klus te klein, geen project te groot.',
    intro: 'Een paar uur werk of een project van weken — u krijgt altijd dezelfde zorg en kwaliteit. Bel of app ons gerust, dan denken we met u mee.',
    icon: 'tools',
    includes: ['Klussen van een dagdeel', 'Combinaties van werkzaamheden', 'Snelle planning', 'Eerlijke prijs vooraf'],
  },
  {
    slug: 'woningrenovatie',
    title: 'Complete woningrenovaties',
    short: 'Uw hele woning vernieuwd, van plan tot oplevering.',
    intro: 'Een complete renovatie vraagt om goede planning en één partij die het overzicht houdt. Wij coördineren alle disciplines en leveren uw woning sleutelklaar op.',
    icon: 'house',
    includes: ['Projectplanning en coördinatie', 'Sloop, opbouw en indeling', 'Alle afwerkingsdisciplines', 'Oplevering met nazorg'],
  },
];

export const process = [
  { title: 'Kennismaking', text: 'U belt, appt of vraagt online een offerte aan. Binnen 24 uur hebben we contact.' },
  { title: 'Opname op locatie', text: 'We komen gratis langs, bekijken de situatie en denken mee over de beste aanpak.' },
  { title: 'Heldere offerte', text: 'U ontvangt een duidelijke prijs vooraf. Geen verrassingen achteraf.' },
  { title: 'Uitvoering', text: 'Vakkundig werk volgens planning, met een schone werkplek aan het einde van elke dag.' },
  { title: 'Oplevering & nazorg', text: 'We lopen samen alles na. Pas als u tevreden bent, is het klaar.' },
];

export const areas = [
  'Amsterdam', 'Amstelveen', 'Diemen', 'Zaandam', 'Haarlem', 'Hoofddorp',
  'Almere', 'Purmerend', 'Weesp', 'Hilversum', 'Utrecht', 'Leiden',
  'Alkmaar', 'Lelystad', 'Uithoorn', 'Aalsmeer',
];

export const faqs = [
  {
    q: 'Is een offerte echt gratis?',
    a: 'Ja. De opname bij u thuis en de offerte zijn altijd gratis en vrijblijvend.',
  },
  {
    q: 'In welke regio werken jullie?',
    a: `We zijn gevestigd in ${company.city} en werken in een straal van ongeveer ${company.radiusKm} km — onder andere in Amstelveen, Haarlem, Zaandam, Almere en Utrecht.`,
  },
  {
    q: 'Doen jullie ook kleine klussen?',
    a: 'Zeker. Van een lekkende kraan tot een complete woningrenovatie: geen klus is te klein.',
  },
  {
    q: 'Hoe snel kunnen jullie beginnen?',
    a: 'Dat hangt af van de omvang en onze planning. Kleine klussen kunnen vaak binnen enkele weken; bij de offerte geven we altijd een realistische startdatum.',
  },
  {
    q: 'Ruimen jullie zelf op na afloop?',
    a: 'Ja. We laten de werkplek elke dag netjes achter en voeren afval en sloopmateriaal zelf af.',
  },
];
