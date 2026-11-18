// Spain history for the Geo-Flight history layer (English text).
export default {
  iso: 'es', name: 'Spain', flag: '🇪🇸',
  eras: [
    {
      id: 'codai', t: 'Ancient times and Roman rule', y: '~36000 BCE – 711',
      d: 'The Iberian Peninsula was home to Iberians, Celts, Phoenicians and Carthaginians before the Roman conquest; afterwards the Visigoths founded a kingdom at Toledo.',
      ev: [
        { n: 'Altamira Cave', y: '~36000 BCE', lat: 43.377, lon: -4.122, k: 'event', vn: 'Prehistoric people', d: 'The cave ceiling is covered with bison painted in red and black, and is called the "Sistine Chapel of prehistoric art".' },
        { n: 'Carthage founds Cartagena', y: '227 BCE', lat: 37.600, lon: -0.986, k: 'event', vn: 'Hasdrubal (Carthage)', d: 'The Carthaginians build "New Carthage" beside a sheltered bay, as a base for mining Iberia\'s silver.' },
        { n: 'Siege of Saguntum', y: '219 BCE', lat: 39.679, lon: -0.278, k: 'battle', vn: 'The people of Saguntum', vs: 'Hannibal (Carthage)', d: "Hannibal besieges and captures a city allied with Rome after eight months, setting off the Second Punic War." },
        { n: 'Siege of Numantia', y: '134 – 133 BCE', lat: 41.810, lon: -2.444, k: 'battle', vn: 'The Celtiberians of Numantia', vs: 'Scipio Aemilianus (Rome)', d: 'Numantia resisted Rome for 20 years; when starved by the siege, many of its people chose death rather than surrender.' },
        { n: 'Emperor Trajan born at Italica', y: '53', lat: 37.443, lon: -6.046, k: 'event', vn: 'Emperor Trajan', d: 'Trajan was the first Roman emperor born outside Italy; under him the empire was at its largest.' },
        { n: 'Segovia Aqueduct', y: '~100', lat: 40.948, lon: -4.118, k: 'event', vn: 'Roman engineers', d: 'More than 160 stone arches fitted together without mortar carry water into the city of Segovia, and still stand after almost 2,000 years.' },
        { n: 'Visigothic kingdom at Toledo', y: '~569', lat: 39.857, lon: -4.024, k: 'event', vn: 'King Leovigild', d: 'The Visigoths choose Toledo as their capital and unify almost the whole Iberian Peninsula for the first time.' }
      ]
    },
    {
      id: 'reconquista', t: 'Al-Andalus and the Reconquista', y: '711 – 1492',
      d: 'Muslims from North Africa take most of the peninsula and found the brilliant Al-Andalus; the Christian kingdoms in the north slowly win back land over almost 800 years.',
      ev: [
        { n: 'Battle of Guadalete', y: '711', lat: 36.60, lon: -5.90, approx: true, k: 'battle', vn: 'King Roderic (Visigoth)', vs: 'Tariq ibn Ziyad (Umayyad)', d: 'The Muslim army crosses the strait and defeats the Visigothic king; the name Gibraltar comes from "Mountain of Tariq".' },
        { n: 'Battle of Covadonga', y: '722', lat: 43.310, lon: -5.056, approx: true, k: 'battle', vn: 'Pelayo', vs: 'The Umayyad army', d: 'In a mountain valley in Asturias, Pelayo drives back the Muslim army; the Spanish see this as the start of the Reconquista.' },
        { n: 'Great Mosque of Córdoba', y: '785', lat: 37.879, lon: -4.779, k: 'event', vn: 'Abd al-Rahman I', d: 'A forest of more than 850 stone columns with red-and-white striped arches; Córdoba was once one of the largest cities in the world.' },
        { n: 'Toledo falls to Castile', y: '1085', lat: 39.857, lon: -4.024, k: 'event', vn: 'King Alfonso VI', vs: 'The Muslim kingdom of Toledo', d: 'The old Visigothic capital becomes a place where Christian, Muslim and Jewish scholars translate scientific books together.' },
        { n: 'El Cid takes Valencia', y: '1094', lat: 39.470, lon: -0.376, k: 'battle', vn: 'El Cid (Rodrigo Díaz de Vivar)', vs: 'The Almoravids', d: "The knight El Cid ruled Valencia until his death; the story of his life became Spain's most famous epic poem." },
        { n: 'Battle of Las Navas de Tolosa', y: '1212', lat: 38.283, lon: -3.583, approx: true, k: 'battle', vn: 'King Alfonso VIII, the Christian coalition', vs: 'Caliph Muhammad al-Nasir (Almohad)', d: 'The alliance of Christian kingdoms wins a great victory at the foot of the Sierra Morena, opening the way south.' },
        { n: 'Alhambra Palace', y: '~1238 – 1391', lat: 37.176, lon: -3.588, k: 'event', vn: 'The Nasrid dynasty', d: 'The Emirate of Granada builds the "Red Castle" palace, with courtyards of pools and ceilings carved like honeycombs.' },
        { n: 'Marriage of Isabella and Ferdinand', y: '1469', lat: 41.652, lon: -4.724, k: 'event', vn: 'Isabella I of Castile, Ferdinand II of Aragon', d: 'A secret wedding in Valladolid joins two great kingdoms, laying the foundation of a united Spain.' },
        { n: 'Fall of Granada', y: '2 Jan 1492', lat: 37.177, lon: -3.598, k: 'battle', vn: 'Isabella I, Ferdinand II', vs: 'Emir Muhammad XII (Boabdil)', d: 'The last Muslim kingdom on the peninsula surrenders, and the Reconquista ends.' }
      ]
    },
    {
      id: 'khampha', t: 'The Age of Discovery', y: '1492 – 1556',
      d: 'Only months after taking Granada, Spain funds the voyage of Columbus; within a few decades it builds an empire stretching across the Americas.',
      route: { t: "Columbus's first voyage, 1492", pts: [[37.228, -6.891], [28.093, -17.110], [26.0, -40.0], [24.05, -74.53], [21.08, -75.66], [19.75, -72.20]] },
      ev: [
        { n: 'Columbus leaves the port of Palos', y: '3 Aug 1492', lat: 37.228, lon: -6.891, k: 'event', vn: 'Cristóbal Colón (Columbus), the Pinzón brothers', d: 'The three ships Santa María, Pinta and Niña set sail west, hoping to find a route to Asia.' },
        { n: 'Stop in the Canary Islands', y: 'Sep 1492', lat: 28.093, lon: -17.110, k: 'event', vn: 'Cristóbal Colón', d: 'The fleet repairs a rudder and takes on fresh water at La Gomera before plunging into the vast ocean.' },
        { n: 'Columbus reaches the Americas', y: '12 Oct 1492', lat: 24.05, lon: -74.53, approx: true, k: 'event', vn: 'Cristóbal Colón', d: 'After 33 days with no sight of land, the sailors cry out at seeing an island in the Bahamas that the local people call Guanahani.' },
        { n: 'Treaty of Tordesillas', y: '1494', lat: 41.500, lon: -5.000, k: 'event', vn: 'Isabella I, Ferdinand II', vs: 'King João II (Portugal)', d: 'The two countries divide the newly found lands with a north–south line across the Atlantic, with the Pope as go-between.' },
        { n: 'Balboa sights the Pacific Ocean', y: '1513', lat: 8.80, lon: -78.00, approx: true, k: 'event', vn: 'Vasco Núñez de Balboa', d: 'Crossing the jungle of the Isthmus of Panama, Balboa becomes the first European to see the largest ocean from the Americas.' },
        { n: 'Cortés captures Tenochtitlan', y: '1521', lat: 19.435, lon: -99.131, k: 'battle', vn: 'Hernán Cortés', vs: 'Cuauhtémoc (Aztec Empire)', d: 'After a long siege, the Aztec capital in the middle of the lake falls; Mexico City rises on the site of the old city.' },
        { n: 'Magellan killed at Mactan', y: '1521', lat: 10.310, lon: 123.980, k: 'battle', vn: 'Fernão de Magalhães (Magellan)', vs: 'Chief Lapu-Lapu', d: 'The Portuguese navigator sailing for Spain is killed on a small island in the Philippines.' },
        { n: 'Elcano completes the circumnavigation', y: '1522', lat: 36.778, lon: -6.352, k: 'event', vn: 'Juan Sebastián Elcano', d: 'Only the ship Victoria and 18 men return to Sanlúcar after 3 years – the first voyage around the Earth.' },
        { n: 'Pizarro captures the Inca king at Cajamarca', y: '1532', lat: -7.164, lon: -78.510, k: 'battle', vn: 'Francisco Pizarro', vs: 'Emperor Atahualpa (Inca Empire)', d: 'Fewer than 200 Spanish soldiers seize the Inca king in the middle of the square, beginning the conquest of Peru.' }
      ]
    },
    {
      id: 'hoangkim', t: 'The Habsburg Empire and the Golden Age', y: '1516 – 1700',
      d: 'Under the Habsburg kings, Spain is the "empire on which the sun never sets"; literature and painting also enter their Golden Age.',
      ev: [
        { n: 'Battle of Pavia', y: '1525', lat: 45.185, lon: 9.160, k: 'battle', vn: 'Emperor Carlos V (Karl V)', vs: 'King François I (France)', d: 'Spanish musketeers shatter the French cavalry in northern Italy and even capture the French king.' },
        { n: 'El Escorial monastery-palace', y: '1563 – 1584', lat: 40.589, lon: -4.148, k: 'event', vn: 'King Felipe II', d: 'A huge complex with more than 2,000 windows, it is at once a palace, a monastery, a library and the tomb of the kings.' },
        { n: 'Legazpi founds Manila', y: '1571', lat: 14.590, lon: 120.975, k: 'event', vn: 'Miguel López de Legazpi', d: 'Manila becomes the port linking Asia with the Americas: the Manila galleons carried silk to Acapulco for 250 years.' },
        { n: 'Battle of Lepanto', y: '1571', lat: 38.25, lon: 21.10, approx: true, k: 'battle', vn: 'Don Juan de Austria (Holy League)', vs: 'Ali Pasha (Ottoman Empire)', d: 'A great naval battle of oared ships; the writer Cervantes fought here and was wounded in his left hand.' },
        { n: 'The Armada fails', y: '1588', lat: 50.99, lon: 2.13, approx: true, k: 'battle', vn: 'Duke of Medina Sidonia', vs: 'The English navy (Howard, Drake)', d: 'The huge fleet meant to land in England is scattered by fire ships and storms at sea.' },
        { n: 'The novel Don Quixote', y: '1605', lat: 40.414, lon: -3.699, k: 'event', vn: 'Miguel de Cervantes', d: 'The dreamy knight charges at windmills – often called the first modern novel.' },
        { n: 'Battle of Rocroi', y: '1643', lat: 49.926, lon: 4.522, k: 'battle', vn: 'Francisco de Melo', vs: "Duke d'Enghien (France)", d: 'The famous, once-unbeaten Spanish infantry suffer a great defeat by the French army, a sign the empire is starting to weaken.' },
        { n: 'The painting Las Meninas', y: '1656', lat: 40.414, lon: -3.692, k: 'event', vn: 'Diego Velázquez', d: "The painter shows himself at work in the palace; today the painting is a treasure of Madrid's Prado Museum." }
      ]
    },
    {
      id: 'bourbon', t: 'The Bourbons and the age of Napoléon', y: '1700 – 1898',
      d: 'The French Bourbon family takes the throne; Spain resists Napoléon and gradually loses its colonies in the Americas and Asia.',
      ev: [
        { n: 'Fall of Barcelona', y: '11 Sep 1714', lat: 41.385, lon: 2.183, k: 'battle', vn: 'The defenders of Barcelona (Rafael Casanova)', vs: 'The Bourbon army (Duke of Berwick)', d: 'This ends the War of the Spanish Succession; 11 September is now the National Day of Catalonia.' },
        { n: 'Loss of Gibraltar', y: '1704 – 1713', lat: 36.140, lon: -5.353, k: 'battle', vn: 'The Spanish garrison', vs: 'The Anglo-Dutch fleet (George Rooke)', d: 'The rock guarding the entrance to the Mediterranean is captured in 1704 and ceded to Britain in 1713; it is still British today.' },
        { n: 'Battle of Trafalgar', y: '1805', lat: 36.25, lon: -6.20, approx: true, k: 'battle', vn: 'Admiral Federico Gravina (with the French fleet)', vs: 'Admiral Horatio Nelson (Britain)', d: 'The French–Spanish fleet is defeated off Cádiz; Britain rules the seas for a century.' },
        { n: 'The Uprising of 2 May', y: '2 May 1808', lat: 40.417, lon: -3.704, k: 'battle', vn: 'The people of Madrid', vs: 'The French army (Marshal Murat)', d: 'The people of Madrid rise against Napoléon\'s troops; the painter Goya recorded the scene in two famous paintings.' },
        { n: 'Battle of Bailén', y: '1808', lat: 38.093, lon: -3.776, k: 'battle', vn: 'General Francisco Castaños', vs: 'General Pierre Dupont (France)', d: "For the first time, a large army of Napoléon's has to surrender on the battlefield." },
        { n: 'Siege of Zaragoza', y: '1808 – 1809', lat: 41.650, lon: -0.880, k: 'battle', vn: 'José de Palafox, Agustina de Aragón', vs: 'The French army (Marshal Lannes)', d: 'The townspeople hold the city through two sieges, fighting house by house; a young woman, Agustina, fires a cannon herself to defend the city gate.' },
        { n: 'Constitution of Cádiz', y: '1812', lat: 36.533, lon: -6.295, k: 'event', vn: 'The Cortes parliament', d: 'Though besieged by the French, the delegates still write Spain\'s first liberal constitution, affectionately called "La Pepa".' },
        { n: 'Battle of Ayacucho', y: '1824', lat: -13.05, lon: -74.13, approx: true, k: 'battle', vn: 'Viceroy José de la Serna', vs: 'Antonio José de Sucre', d: 'Defeated on the Andean plateau, Spain loses almost all its colonies in South America.' },
        { n: 'Spanish–American War', y: '1898', lat: 14.50, lon: 120.90, approx: true, k: 'battle', vn: 'Admiral Patricio Montojo', vs: 'Admiral George Dewey (USA)', d: 'Defeated in Manila Bay and at Santiago de Cuba, Spain loses Cuba, Puerto Rico and the Philippines.' }
      ]
    },
    {
      id: 'noichien', t: 'The Republic, the Civil War and the Franco era', y: '1931 – 1975',
      d: 'The Second Republic is born, then the country falls into a bloody civil war; General Franco rules as a dictator for almost 40 years.',
      ev: [
        { n: 'Proclamation of the Second Republic', y: '14 Apr 1931', lat: 40.417, lon: -3.703, k: 'event', vn: 'Niceto Alcalá-Zamora', d: 'King Alfonso XIII leaves the country, and crowds cheer in the Puerta del Sol square.' },
        { n: 'Battle of Madrid', y: '1936', lat: 40.44, lon: -3.73, approx: true, k: 'battle', vn: 'The Republicans, the International Brigades', vs: 'The Nationalists (General Franco)', d: 'With the slogan "They shall not pass!", the Republicans hold the capital around the university district for years.' },
        { n: 'Bombing of Guernica', y: '26 Apr 1937', lat: 43.317, lon: -2.678, k: 'event', vn: 'Pablo Picasso (painter)', d: 'German and Italian planes bomb a Basque town; Picasso paints the huge "Guernica" condemning war.' },
        { n: 'Battle of the Ebro', y: '1938', lat: 41.05, lon: 0.44, approx: true, k: 'battle', vn: 'The Republicans (General Juan Modesto)', vs: 'The Nationalists (General Franco)', d: 'The largest and longest battle of the Civil War; the Republicans lose and cannot recover.' },
        { n: 'End of the Civil War', y: '1 Apr 1939', lat: 40.417, lon: -3.704, k: 'event', vn: 'General Francisco Franco', d: 'Franco declares victory and sets up a dictatorship; hundreds of thousands of people have to flee abroad.' },
        { n: 'Spain joins the United Nations', y: '1955', lat: 40.749, lon: -73.968, k: 'event', vn: 'The Franco government', d: 'During the Cold War, the country escapes isolation; beach tourism booms in the 1960s.' },
        { n: 'Franco dies', y: '20 Nov 1975', lat: 40.417, lon: -3.714, k: 'event', vn: 'King Juan Carlos I', d: 'Two days later, Juan Carlos I takes the throne and leads the country toward democracy.' }
      ]
    },
    {
      id: 'danchu', t: 'Democracy and the European Union', y: '1975 – present',
      d: 'Spain becomes a democratic constitutional monarchy, joins the European Union and hosts many world events.',
      ev: [
        { n: 'The 1978 Constitution', y: '1978', lat: 40.416, lon: -3.697, k: 'event', vn: 'King Juan Carlos I, Prime Minister Adolfo Suárez', d: 'The people vote to approve a democratic constitution that is still in force today.' },
        { n: 'The failed 23-F coup', y: '23 Feb 1981', lat: 40.416, lon: -3.697, k: 'event', vn: 'King Juan Carlos I', vs: 'Lieutenant Colonel Antonio Tejero', d: 'Guards storm the Parliament; the king goes on television to defend the constitution, and the coup fails.' },
        { n: 'Joining the European Community', y: '1986', lat: 40.415, lon: -3.712, k: 'event', vn: 'Prime Minister Felipe González', d: 'Together with Portugal, Spain becomes a member of the bloc that later became the European Union.' },
        { n: 'Barcelona Olympics', y: '1992', lat: 41.365, lon: 2.155, k: 'event', vn: 'The city of Barcelona', d: 'An archer shoots a flaming arrow to light the cauldron on Montjuïc hill; Barcelona is transformed thanks to the Olympics.' },
        { n: 'Madrid train bombings', y: '11 Mar 2004', lat: 40.407, lon: -3.690, k: 'event', vn: 'The people of Madrid', d: "Explosions on commuter trains kill 193 people – the worst terrorist attack in the country's history." },
        { n: 'World Cup champions', y: '2010', lat: -26.235, lon: 27.983, k: 'event', vn: 'The Spanish team (Andrés Iniesta)', vs: 'The Dutch team', d: "Iniesta's goal in extra time of the final in Johannesburg brings home the first gold trophy." },
        { n: 'Catalonia referendum', y: '1 Oct 2017', lat: 41.387, lon: 2.170, k: 'event', vn: 'The Catalan regional government, the Spanish government', d: 'The vote on independence is declared illegal by the Constitutional Court; Madrid temporarily takes over running the region.' },
        { n: 'Cumbre Vieja volcano erupts', y: '2021', lat: 28.613, lon: -17.866, k: 'event', vn: 'The people of La Palma island', d: 'Lava flows for 85 days, burying more than 1,000 houses and then pouring into the sea to form new land.' },
        { n: 'Euro 2024 champions', y: '2024', lat: 52.515, lon: 13.239, k: 'event', vn: 'The Spanish team (Lamine Yamal, Rodri)', vs: 'The English team', d: 'Spain beats England 2–1 in Berlin, becoming the first team to win the European title four times.' },
        { n: 'DANA flash floods in Valencia', y: 'Oct 2024', lat: 39.428, lon: -0.418, k: 'event', vn: 'The people of Valencia, volunteers', d: 'Extremely heavy rain causes flash floods that kill more than 220 people; tens of thousands of volunteers come to clear the mud.' },
        { n: 'Peninsula-wide blackout', y: '28 Apr 2025', lat: 40.417, lon: -3.704, approx: true, k: 'event', vn: 'The people of Spain', d: 'The power grids of Spain and Portugal collapse almost completely for many hours; electric trains and traffic lights all stop.' }
      ]
    }
  ]
};
