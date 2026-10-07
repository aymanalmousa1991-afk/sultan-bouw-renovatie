/**
 * Centrale bedrijfsgegevens. Alles wat op de website over het bedrijf staat,
 * komt hier vandaan — pas het hier aan en het verandert overal.
 */
export const company = {
  name: 'Sultan Bouw & Renovatie',
  shortName: 'Sultan',
  tagline: 'Bouw & Renovatie',
  email: 'info@sultan-bouw.nl',
  website: 'sultan-bouw.nl',
  phone: '06 300 03 016',
  phoneHref: 'tel:+31630003016',
  whatsappHref: 'https://wa.me/31630003016',
  kvk: '42173940',
  owner: 'Adel Al Sultan',
  city: 'Amsterdam',
  region: 'Amsterdam en omstreken',
  yearsExperience: 10,
  // Geen vaste openingstijden: altijd op afspraak, telefonisch 24/7 bereikbaar
  hours: [
    { days: 'Maandag t/m zondag', time: 'Op afspraak' },
    { days: 'Telefonisch', time: '24 uur per dag bereikbaar' },
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
  { value: 24, suffix: ' uur', label: 'Reactie op uw aanvraag' },
  { value: 7, suffix: ' dagen', label: 'Per week op afspraak' },
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
    short: 'Maatwerk en montage, zorgvuldig en met precisie.',
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
  { title: 'Opname op locatie', text: 'We komen vrijblijvend langs, bekijken de situatie en denken mee over de beste aanpak.' },
  { title: 'Heldere offerte', text: 'U ontvangt een duidelijke prijs vooraf. Geen verrassingen achteraf.' },
  { title: 'Uitvoering', text: 'Vakkundig werk volgens planning, met een schone werkplek aan het einde van elke dag.' },
  { title: 'Oplevering & nazorg', text: 'We lopen samen alles na. Pas als u tevreden bent, is het klaar.' },
];

export const areas = [
  'Amsterdam', 'Amstelveen', 'Diemen', 'Duivendrecht', 'Ouderkerk aan de Amstel', 'Badhoevedorp',
  'Hoofddorp', 'Nieuw-Vennep', 'Haarlemmermeer', 'Aalsmeer', 'Uithoorn', 'Mijdrecht', 'Abcoude',
  'Zaandam', 'Zaanstad', 'Wormerveer', 'Krommenie', 'Assendelft', 'Landsmeer', 'Oostzaan',
  'Purmerend', 'Monnickendam', 'Volendam', 'Edam', 'Hoorn', 'Alkmaar', 'Heerhugowaard',
  'Castricum', 'Heemskerk', 'Beverwijk', 'IJmuiden', 'Velsen', 'Haarlem', 'Heemstede',
  'Bloemendaal', 'Zandvoort', 'Hillegom', 'Lisse', 'Leiden', 'Weesp', 'Muiden', 'Naarden',
  'Bussum', 'Huizen', 'Laren', 'Blaricum', 'Hilversum', 'Almere', 'Lelystad', 'Utrecht',
  'Maarssen', 'Breukelen', 'Zeist', 'Woerden', 'Amersfoort', 'Nijkerk', 'Alphen aan den Rijn',
  'Gouda', 'Zoetermeer', 'Den Haag', 'Rotterdam', 'Enkhuizen',
];

export const faqs = [
  {
    q: 'Welke werkzaamheden voeren jullie uit?',
    a: 'Wij verzorgen uiteenlopende bouw- en renovatiewerkzaamheden, van keuken- en badkamerrenovaties tot complete woningrenovaties, verbouwingen en afwerking. Voor iedere aanvraag bekijken we de situatie en bespreken we wat er nodig is.',
  },
  {
    q: 'Werken jullie met een vaste offerte?',
    a: 'Ja. Na het bespreken van de werkzaamheden ontvangt u een duidelijke offerte waarin de werkzaamheden en bijbehorende kosten overzichtelijk worden vermeld. Zo weet u vooraf waar u aan toe bent.',
  },
  {
    q: 'Komen jullie eerst langs om de situatie te bekijken?',
    a: 'Ja. Bij vrijwel alle werkzaamheden is een beoordeling op locatie nodig, dus komen we eerst bij u langs. We bekijken de situatie, bespreken uw wensen en stellen daarna een passende offerte op.',
  },
  {
    q: 'Hoe lang duurt een renovatie?',
    a: 'De doorlooptijd verschilt per project. Een badkamer, keuken of kleine verbouwing heeft uiteraard een andere planning dan een complete woningrenovatie. Na de opname geven we u een duidelijke inschatting van de werkzaamheden en de planning. Vaak kunnen wij op korte termijn starten.',
  },
  {
    q: 'Kan ik tijdens de renovatie nog wijzigingen doorgeven?',
    a: 'In veel gevallen is dat mogelijk. We bespreken eventuele wijzigingen vooraf, zodat duidelijk is wat de gevolgen zijn voor de werkzaamheden, planning en kosten.',
  },
  {
    q: 'Regelen jullie ook materialen?',
    a: 'Ja. In overleg verzorgen wij de benodigde bouwmaterialen en andere materialen voor het project. Uiteraard kunnen we ook werken met materialen die u zelf heeft uitgekozen.',
  },
  {
    q: 'Werken jullie met vaste vakmensen?',
    a: 'Wij werken met ervaren vakmensen en zorgen ervoor dat de werkzaamheden professioneel en volgens afspraak worden uitgevoerd.',
  },
  {
    q: 'Ruimen jullie de bouwplaats na afloop op?',
    a: 'Ja. We zorgen ervoor dat de werkplek tijdens het project zo verzorgd mogelijk blijft en dat bouw- en sloopafval na afloop volgens afspraak wordt afgevoerd.',
  },
  {
    q: 'Kan ik vrijblijvend een offerte aanvragen?',
    a: 'Ja. Neem contact met ons op en vertel ons kort wat u wilt laten verbouwen of renoveren. We bespreken vervolgens de mogelijkheden en de volgende stap.',
  },
];
