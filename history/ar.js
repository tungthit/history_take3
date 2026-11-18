// Argentina history for the Geo-Flight history layer (English text).
export default {
  iso: 'ar', name: 'Argentina', flag: '🇦🇷',
  eras: [
    {
      id: 'native', t: 'Indigenous peoples', y: '~7300 BCE – 1516',
      d: 'From hunters who painted their hands on cave walls in Patagonia to stone villages in the northwestern mountains under the Inca Empire, indigenous peoples lived all across Argentina.',
      ev: [
        { n: 'Ischigualasto dinosaur valley', y: '~230 million years ago', lat: -30.00, lon: -67.90, approx: true, k: 'event', d: 'In the "Valley of the Moon", scientists found fossils of some of the oldest dinosaurs in the world.' },
        { n: 'Cave of the Hands (Cueva de las Manos)', y: '~7300 BCE', lat: -47.155, lon: -70.660, k: 'event', vn: 'Ancient hunters of Patagonia', d: 'Hundreds of hand shapes were sprayed in color onto the cave wall, mostly left hands – like "signatures" from 9,000 years ago.' },
        { n: 'Stone village of Quilmes', y: '~850', lat: -26.47, lon: -66.03, k: 'event', vn: 'The Quilmes (Diaguita) people', d: 'The stone city on a mountainside in Tucumán once housed about 5,000 people, who grew maize on terraced fields.' },
        { n: 'Pucará de Tilcara', y: '~1100', lat: -23.58, lon: -65.40, k: 'event', vn: 'The Omaguaca people', d: 'A hilltop fortress guarded the Humahuaca gorge and later became part of the Inca road.' },
        { n: 'The Llullaillaco children', y: '~1500', lat: -24.72, lon: -68.54, k: 'event', vn: 'Inca Empire', d: 'On the summit of a 6,739 m volcano, the ice kept three Inca child mummies almost perfectly preserved for 500 years.' },
        { n: 'The Selk\'nam of Tierra del Fuego', y: '~1500', lat: -54.00, lon: -68.50, approx: true, k: 'event', vn: 'The Selk\'nam people', d: 'Despite the cold, the Selk\'nam wore only guanaco-skin cloaks; the glow of their campfires gave the "Land of Fire" its name.' }
      ]
    },
    {
      id: 'colony', t: 'Spanish colonial period', y: '1516 – 1805',
      d: 'The Spanish founded Buenos Aires on the Río de la Plata ("River of Silver"); Jesuit missionaries built mission villages together with the Guaraní.',
      ev: [
        { n: 'Solís arrives at the Río de la Plata', y: '1516', lat: -34.60, lon: -58.00, approx: true, k: 'event', vn: 'Juan Díaz de Solís', d: 'The explorer mistook the vast river mouth for the sea; he was killed by indigenous people when he went ashore.' },
        { n: 'Magellan at San Julián Bay', y: '1520', lat: -49.31, lon: -67.73, k: 'event', vn: 'Ferdinand Magellan', d: 'The fleet that sailed around the world spent the winter here and met tall indigenous people; the region was named Patagonia.' },
        { n: 'Buenos Aires founded a second time', y: '1580', lat: -34.608, lon: -58.372, k: 'event', vn: 'Juan de Garay', d: 'The 1536 founding failed because of hunger; the second time Garay divided the land into square blocks, which still survive in the city center.' },
        { n: 'University of Córdoba', y: '1613', lat: -31.4167, lon: -64.186, k: 'event', vn: 'The Jesuit priests', d: 'One of the oldest universities in the Americas; Córdoba is called "La Docta" – the learned city.' },
        { n: 'Mission village of San Ignacio Miní', y: '1696', lat: -27.255, lon: -55.532, k: 'event', vn: 'The Guaraní people, the Jesuit priests', d: 'The Guaraní and the priests built churches from red sandstone; the village had a school and workshops that made musical instruments.' },
        { n: 'Calchaquí Wars', y: '1667', lat: -26.47, lon: -66.03, k: 'battle', vn: 'The Quilmes people', vs: 'Spanish army', d: 'After resisting for more than 130 years, the Quilmes were forced to walk over 1,000 km to live near Buenos Aires.' },
        { n: 'Viceroyalty of the Río de la Plata', y: '1776', lat: -34.6083, lon: -58.3712, k: 'event', vn: 'Viceroy Pedro de Cevallos', d: 'Spain created a new viceroyalty with Buenos Aires as its capital, including the lands of today\'s Uruguay, Paraguay and Bolivia.' }
      ]
    },
    {
      id: 'independence', t: 'Independence and the crossing of the Andes', y: '1806 – 1824',
      d: 'The people of Buenos Aires drove back the British, formed their own government in 1810 and declared independence in 1816; San Martín crossed the Andes to liberate Chile and Peru.',
      route: { t: 'San Martín\'s crossing of the Andes, 1817 (main army)', pts: [[-32.85, -68.80], [-32.60, -69.35], [-32.35, -69.80], [-32.22, -70.20], [-32.63, -70.72], [-32.98, -70.68], [-33.45, -70.66]] },
      ev: [
        { n: 'Driving back the British', y: '1806 – 1807', lat: -34.6083, lon: -58.3712, k: 'battle', vn: 'Santiago de Liniers, Buenos Aires militia', vs: 'British army (William Beresford, John Whitelocke)', d: 'Twice the British attacked Buenos Aires; the city\'s people fought from the rooftops and forced them to withdraw.' },
        { n: 'May Revolution', y: '25 May 1810', lat: -34.6088, lon: -58.3739, k: 'event', vn: 'Cornelio Saavedra, Mariano Moreno', d: 'People gathered in front of the Cabildo and set up the first government not appointed by Spain.' },
        { n: 'Belgrano raises the first flag', y: '27 Feb 1812', lat: -32.9477, lon: -60.6305, k: 'event', vn: 'Manuel Belgrano', d: 'On the bank of the Paraná River in Rosario, Belgrano raised the sky-blue and white flag, now Argentina\'s national flag.' },
        { n: 'Battle of Tucumán', y: '24 Sep 1812', lat: -26.82, lon: -65.21, k: 'battle', vn: 'Manuel Belgrano', vs: 'Spanish army (Pío Tristán)', d: 'Belgrano disobeyed the order to retreat, defeated a larger army and saved the northwest from being retaken.' },
        { n: 'Battle of San Lorenzo', y: '3 Feb 1813', lat: -32.745, lon: -60.735, k: 'battle', vn: 'José de San Martín', vs: 'Spanish army', d: 'San Martín\'s first battle in South America; his horse was shot and fell, and a soldier gave his life to save him.' },
        { n: 'Declaration of Independence in Tucumán', y: '9 July 1816', lat: -26.8308, lon: -65.2033, k: 'event', vn: 'Congress of Tucumán', d: 'In a small house in San Miguel de Tucumán, the delegates declared the "United Provinces of South America" independent.' },
        { n: 'Battle of Chacabuco', y: '12 Feb 1817', lat: -32.98, lon: -70.68, k: 'battle', vn: 'José de San Martín, Bernardo O\'Higgins', vs: 'Spanish army (Rafael Maroto)', d: 'After 21 days crossing passes almost 5,000 m high, the Army of the Andes struck by surprise and opened the road to Santiago.' },
        { n: 'Battle of Maipú', y: '5 Apr 1818', lat: -33.51, lon: -70.77, k: 'battle', vn: 'José de San Martín', vs: 'Spanish army (Mariano Osorio)', d: 'The decisive victory secured Chile\'s independence; San Martín and O\'Higgins embraced on the battlefield.' },
        { n: 'San Martín enters Lima', y: '28 July 1821', lat: -12.046, lon: -77.030, k: 'event', vn: 'José de San Martín', d: 'From Chile, the army sailed north, and San Martín proclaimed Peru\'s independence in Lima.' }
      ]
    },
    {
      id: 'nation', t: 'Civil wars and nation-building', y: '1829 – 1880',
      d: 'Rival factions fought for power for decades until the Constitution of 1853; the army expanded south into Patagonia.',
      ev: [
        { n: 'Battle of Vuelta de Obligado', y: '20 Nov 1845', lat: -33.597, lon: -59.800, k: 'battle', vn: 'Lucio Mansilla (under Juan Manuel de Rosas)', vs: 'Anglo-French fleet', d: 'Argentine forces stretched iron chains across the Paraná River to block British and French warships; it is now the Day of National Sovereignty.' },
        { n: 'Battle of Caseros', y: '3 Feb 1852', lat: -34.60, lon: -58.56, k: 'battle', vn: 'Justo José de Urquiza', vs: 'Juan Manuel de Rosas', d: 'Urquiza overthrew Rosas after more than 20 years in power, opening the way for the country to have a constitution.' },
        { n: 'Constitution of 1853', y: '1 May 1853', lat: -31.63, lon: -60.70, k: 'event', vn: 'Justo José de Urquiza, Juan Bautista Alberdi', d: 'The constitution signed in Santa Fe, with several amendments, is still Argentina\'s constitution today.' },
        { n: 'Battle of Pavón', y: '1861', lat: -33.25, lon: -60.40, approx: true, k: 'battle', vn: 'Bartolomé Mitre', vs: 'Justo José de Urquiza', d: 'After this battle Buenos Aires rejoined the provinces, and Mitre became president of a united Argentina.' },
        { n: 'Battle of Curupayty', y: '22 Sep 1866', lat: -27.10, lon: -58.60, approx: true, k: 'battle', vn: 'Bartolomé Mitre', vs: 'Paraguayan army', d: 'In the war against Paraguay, the allied army attacked the Curupayty trenches and suffered one of its worst defeats.' },
        { n: '"Conquest of the Desert" campaign', y: '1879', lat: -39.29, lon: -65.66, k: 'battle', vn: 'General Julio Argentino Roca', vs: 'The Mapuche and Tehuelche peoples', d: 'The army advanced south to the Negro River and seized the indigenous peoples\' grasslands; this campaign is highly controversial today.' },
        { n: 'Buenos Aires becomes the federal capital', y: '1880', lat: -34.6083, lon: -58.3712, k: 'event', vn: 'President Nicolás Avellaneda', d: 'After the last battle between the factions, Buenos Aires was separated from its province to serve as the capital of the whole country.' }
      ]
    },
    {
      id: 'golden', t: 'The golden age and the wave of immigration', y: '1880 – 1943',
      d: 'Thanks to selling beef and wheat, Argentina was once among the richest countries in the world; millions of Italians and Spaniards poured in, and the tango was born.',
      ev: [
        { n: 'Orcadas Station in Antarctica', y: '1904', lat: -60.737, lon: -44.737, k: 'event', vn: 'Hugo Acuña', d: 'The research station on Laurie Island is the oldest continuously staffed station in the Antarctic region.' },
        { n: 'Teatro Colón', y: '1908', lat: -34.601, lon: -58.383, k: 'event', vn: 'Architects Francesco Tamburini, Vittorio Meano', d: 'One of the opera houses with the best acoustics in the world opened in Buenos Aires.' },
        { n: 'Immigrants\' Hotel', y: '1911', lat: -34.594, lon: -58.371, k: 'event', vn: 'European immigrants', d: 'Newcomers could stay free for five days; at that time about one in every three people in Buenos Aires was born abroad.' },
        { n: 'First subway in Latin America', y: '1913', lat: -34.6083, lon: -58.3712, k: 'event', vn: 'Anglo-Argentine Company', d: 'The "Subte" subway line opened, earlier than in many large European cities.' },
        { n: 'Che Guevara born in Rosario', y: '14 June 1928', lat: -32.95, lon: -60.64, k: 'event', vn: 'Ernesto "Che" Guevara', d: 'The asthmatic boy from Rosario later became a doctor and then a famous revolutionary in Cuba and Latin America.' },
        { n: 'First World Cup final', y: '30 July 1930', lat: -34.894, lon: -56.153, k: 'event', vn: 'Argentina national team', vs: 'Uruguay', d: 'In Montevideo, Argentina lost 2–4 to hosts Uruguay in the first World Cup final in history.' },
        { n: 'The Obelisco', y: '1936', lat: -34.6037, lon: -58.3816, k: 'event', vn: 'Architect Alberto Prebisch', d: 'The 67.5 m white tower was built in about a month to celebrate 400 years since the first founding of the city.' }
      ]
    },
    {
      id: 'peron', t: 'The Perón era and the unstable years', y: '1945 – 1983',
      d: 'Juan Perón and his wife Evita were wholeheartedly supported by workers; then came one coup after another, and a war with Britain in 1982.',
      ev: [
        { n: '17th of October', y: '17 Oct 1945', lat: -34.6083, lon: -58.3722, k: 'event', vn: 'Juan Domingo Perón', d: 'Hundreds of thousands of workers marched to the Plaza de Mayo demanding Perón\'s release; the next year he was elected president.' },
        { n: 'Women vote for the first time', y: '11 Nov 1951', lat: -34.6083, lon: -58.3712, k: 'event', vn: 'Eva Perón (Evita)', d: 'Thanks to the 1947 law that Evita campaigned for, Argentine women voted in a presidential election for the first time.' },
        { n: 'Mothers of the Plaza de Mayo', y: '1977', lat: -34.6083, lon: -58.3722, k: 'event', vn: 'Azucena Villaflor and the mothers', d: 'Under the military government, mothers whose children had disappeared wore white headscarves and walked around the plaza every Thursday to demand the truth.' },
        { n: '1978 World Cup champions', y: '25 June 1978', lat: -34.545, lon: -58.4498, k: 'event', vn: 'Mario Kempes, coach César Luis Menotti', vs: 'Netherlands', d: 'At home in the River Plate stadium, Argentina beat the Netherlands 3–1 after extra time and won the world title for the first time.' },
        { n: 'Sinking of the ARA General Belgrano', y: '2 May 1982', lat: -55.40, lon: -61.53, approx: true, k: 'battle', vn: 'Captain Héctor Bonzo', vs: 'British submarine HMS Conqueror', d: 'During the war over the Malvinas Islands, the cruiser was hit by torpedoes and 323 sailors died.' },
        { n: 'Battle of Goose Green (Pradera del Ganso)', y: '28 May 1982', lat: -51.83, lon: -58.97, k: 'battle', vn: 'Lieutenant Colonel Ítalo Piaggi', vs: 'British army (Herbert Jones)', d: 'The first major land battle on the islands that Argentina calls the Malvinas and Britain calls the Falklands.' },
        { n: 'End of the Malvinas War', y: '14 June 1982', lat: -51.69, lon: -57.86, k: 'event', vn: 'General Mario Menéndez', vs: 'British army (Jeremy Moore)', d: 'Argentine forces surrendered at Puerto Argentino (Stanley); this defeat brought down the military government the next year.' }
      ]
    },
    {
      id: 'democracy', t: 'Democratic Argentina', y: '1983 – present',
      d: 'Democracy returned in 1983; Argentina has gone through many economic crises but has also given the world Pope Francis, Maradona and Messi.',
      ev: [
        { n: 'Trial of the generals', y: '1985', lat: -34.6025, lon: -58.3855, k: 'event', vn: 'President Raúl Alfonsín, prosecutor Julio Strassera', d: 'For the first time in Latin America, a civilian court tried the former heads of a military government.' },
        { n: 'Maradona and the "Hand of God"', y: '22 June 1986', lat: 19.303, lon: -99.150, k: 'event', vn: 'Diego Maradona', vs: 'England', d: 'At the Azteca stadium, Maradona scored one goal with his hand and another by dribbling past five players; Argentina won its second World Cup.' },
        { n: 'AMIA center bombing', y: '18 July 1994', lat: -34.6018, lon: -58.4006, k: 'event', d: 'The bombing of the Jewish community center in Buenos Aires killed 85 people, the deadliest terrorist attack in the country\'s history.' },
        { n: 'Economic crisis of 2001', y: 'Dec 2001', lat: -34.6083, lon: -58.3722, k: 'event', vn: 'The people of Argentina', d: 'Banks froze deposits and people banged pots and pans in protest; in two weeks the country went through five presidents.' },
        { n: 'Pope Francis', y: '13 Mar 2013', lat: 41.9022, lon: 12.4539, k: 'event', vn: 'Jorge Mario Bergoglio', d: 'The Archbishop of Buenos Aires became the first Pope from the Americas; he died in April 2025.' },
        { n: '2022 World Cup champions', y: '18 Dec 2022', lat: 25.420, lon: 51.490, k: 'event', vn: 'Lionel Messi, Ángel Di María, Emiliano Martínez', vs: 'France', d: 'In Lusail (Qatar), Argentina beat France on penalties after a 3–3 draw, and Messi finally lifted the golden trophy.' },
        { n: 'Javier Milei becomes President', y: '10 Dec 2023', lat: -34.6083, lon: -58.3703, k: 'event', vn: 'Javier Milei', d: 'The economist Milei won the election with a promise to sharply cut state spending to stop inflation.' }
      ]
    }
  ]
};
