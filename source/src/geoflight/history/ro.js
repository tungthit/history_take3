// Romania history for the Geo-Flight history layer (English text).
export default {
  iso: 'ro', name: 'Romania', flag: '🇷🇴',
  eras: [
    {
      id: 'dacia', t: 'The Dacians and Roman times', y: '~650 BCE – 271 CE',
      d: 'The Dacians lived in the Carpathian mountains until they were conquered by Rome; modern Romanian is descended from Latin.',
      ev: [
        { n: 'The Greeks found the city of Histria', y: '~630 BCE', lat: 44.547, lon: 28.775, k: 'event', vn: 'Greek merchants', d: 'The oldest city on the land of present-day Romania, on the shore of the Black Sea.' },
        { n: 'The kingdom of Burebista', y: '~82 – 44 BCE', lat: 45.623, lon: 23.310, approx: true, k: 'event', vn: 'King Burebista', d: 'King Burebista united the Dacian tribes into a large kingdom that made even Rome wary.' },
        { n: 'Battle of Tapae', y: '101 CE', lat: 45.480, lon: 22.790, approx: true, k: 'battle', vn: 'King Decebalus', vs: 'Emperor Trajan (Rome)', d: 'The first major battle of the Dacian Wars, fought at a pass leading into the mountains of Transylvania.' },
        { n: 'Fall of Sarmizegetusa', y: '106', lat: 45.623, lon: 23.310, k: 'battle', vn: 'King Decebalus', vs: 'Emperor Trajan (Rome)', d: 'The Dacians\' mountain capital was taken; Dacia became a Roman province.' },
        { n: 'Trajan\'s Column', y: '113', lat: 41.8958, lon: 12.4843, k: 'event', vn: 'The Dacians (in the carvings)', d: 'The column in Rome has a spiral band of carvings about 200 m long telling the story of the war between Rome and the Dacians.' },
        { n: 'Rome withdraws from Dacia', y: '271', lat: 46.070, lon: 23.570, approx: true, k: 'event', vn: 'Dacian – Roman inhabitants', d: 'The Roman army withdrew south of the Danube, but Latin stayed behind and became Romanian.' }
      ]
    },
    {
      id: 'congquoc', t: 'The principalities of Wallachia and Moldavia', y: '1330 – 1600',
      d: 'The two principalities of Wallachia and Moldavia arose, and their princes had to resist Hungary and the mighty Ottoman Empire.',
      ev: [
        { n: 'Battle of Posada', y: '1330', lat: 45.300, lon: 24.300, approx: true, k: 'battle', vn: 'Prince Basarab I', vs: 'King Charles I Robert (Hungary)', d: 'The Wallachian army ambushed the Hungarians in a narrow mountain gorge and kept its independence.' },
        { n: 'Battle of Rovine', y: '1395', lat: 44.300, lon: 23.800, approx: true, k: 'battle', vn: 'Prince Mircea the Elder', vs: 'Sultan Bayezid I (Ottoman)', d: 'The Wallachian army fought back against a powerful Ottoman army; where the battle took place is still debated.' },
        { n: 'The Night Attack', y: '1462', lat: 44.925, lon: 25.457, approx: true, k: 'battle', vn: 'Prince Vlad III', vs: 'Sultan Mehmed II (Ottoman)', d: 'Vlad III raided the Ottoman camp at night; he is famous for his very cruel punishments of his enemies.' },
        { n: 'Bran Castle – "Dracula\'s castle"', y: '1897', lat: 45.515, lon: 25.367, k: 'legend', vn: 'The writer Bram Stoker (Ireland)', d: 'The novel "Dracula" was inspired by the name of Vlad III; tourists call Bran Castle Dracula\'s castle although he hardly ever stayed here.' },
        { n: 'Battle of Vaslui', y: '1475', lat: 46.550, lon: 27.700, approx: true, k: 'battle', vn: 'Prince Stephen the Great', vs: 'Hadım Suleiman Pasha (Ottoman)', d: 'Taking advantage of thick fog, the Moldavian army defeated an Ottoman army many times its size.' },
        { n: 'Voroneț painted monastery', y: '1488', lat: 47.517, lon: 25.864, k: 'event', vn: 'Prince Stephen the Great', d: 'Its outer walls are covered with paintings in a special blue colour, and it is called the "Sistine Chapel of the East".' },
        { n: 'Battle of Călugăreni', y: '1595', lat: 44.170, lon: 25.830, approx: true, k: 'battle', vn: 'Prince Michael the Brave', vs: 'Sinan Pasha (Ottoman)', d: 'The Wallachian army stopped the Ottomans in a marshy area, one of Romania\'s most famous victories.' },
        { n: 'Michael the Brave enters Alba Iulia', y: '1600', lat: 46.068, lon: 23.570, k: 'event', vn: 'Prince Michael the Brave', d: 'For the first time Wallachia, Transylvania and Moldavia were under one ruler, though only for a few months.' }
      ]
    },
    {
      id: 'thongnhat', t: 'Union and independence', y: '1821 – 1914',
      d: 'The two principalities united as Romania in 1859, then won full independence from the Ottoman Empire in 1878.',
      ev: [
        { n: 'Tudor Vladimirescu\'s uprising', y: '1821', lat: 44.432, lon: 26.104, approx: true, k: 'event', vn: 'Tudor Vladimirescu', vs: 'The Phanariote princes', d: 'The uprising of Wallachian peasants forced the Ottomans to give rule back to Romanian princes.' },
        { n: 'The Blaj Assembly', y: '1848', lat: 46.175, lon: 23.920, k: 'event', vn: 'The Romanians of Transylvania', d: 'About 40,000 people met in a field to demand equal rights for the Romanians of Transylvania.' },
        { n: 'Union of the Principalities', y: '1859', lat: 47.158, lon: 27.587, k: 'event', vn: 'Alexandru Ioan Cuza', d: 'Both Moldavia and Wallachia elected Cuza as prince; the two joined together as Romania.' },
        { n: 'Battle of Plevna', y: '1877', lat: 43.417, lon: 24.607, k: 'battle', vn: 'Prince Carol I', vs: 'Osman Pasha (Ottoman)', d: 'Romanian troops, with the Russians, besieged the fortress in Bulgaria; the victory helped Romania win recognition of its independence in 1878.' },
        { n: 'Peleș Castle', y: '1883', lat: 45.360, lon: 25.543, k: 'event', vn: 'King Carol I', d: 'The castle in the Carpathian mountains was one of the first castles in Europe with electricity and central heating.' },
        { n: 'The Romanian Athenaeum', y: '1888', lat: 44.441, lon: 26.097, k: 'event', vn: 'The people of Bucharest', d: 'Built partly through the fundraising campaign "Give a leu for the Athenaeum".' }
      ]
    },
    {
      id: 'daihopnhat', t: 'Greater Romania and the World Wars', y: '1914 – 1947',
      d: 'After World War I, the lands with Romanian populations joined to form "Greater Romania"; in World War II, Romania first sided with Germany and then switched sides in 1944.',
      ev: [
        { n: 'Battle of Mărășești', y: '1917', lat: 45.880, lon: 27.230, k: 'battle', vn: 'General Eremia Grigorescu', vs: 'Field Marshal Mackensen (Germany)', d: 'With the slogan "They shall not pass", the Romanian army stopped the German attack on Moldavia.' },
        { n: 'The Great Union', y: '1 Dec 1918', lat: 46.068, lon: 23.570, k: 'event', vn: 'The Alba Iulia Assembly', d: 'Transylvania united with Romania; 1 December is Romania\'s national day.' },
        { n: 'The Endless Column', y: '1938', lat: 45.044, lon: 23.284, k: 'event', vn: 'The sculptor Constantin Brâncuși', d: 'A cast-iron column almost 30 m tall, made of linked blocks that seem to soar into the sky, in memory of the soldiers at Târgu Jiu.' },
        { n: 'The Second Vienna Award', y: '1940', lat: 48.191, lon: 16.381, k: 'event', vn: 'The Romanian delegation', vs: 'Germany and Italy', d: 'Romania was forced to hand northern Transylvania to Hungary; the same year it also lost other regions to the Soviet Union and Bulgaria.' },
        { n: 'Battle of Stalingrad', y: '1942', lat: 48.708, lon: 44.514, approx: true, k: 'battle', vn: 'The Romanian Third and Fourth Armies', vs: 'Red Army', d: 'Romanian troops fought alongside the Germans and suffered very heavy losses when the Red Army counter-attacked.' },
        { n: 'The coup of 23 August', y: '1944', lat: 44.439, lon: 26.096, k: 'event', vn: 'King Michael I', vs: 'Marshal Ion Antonescu', d: 'The young king had Antonescu arrested; Romania left the German side and fought alongside the Allies.' }
      ]
    },
    {
      id: 'xhcn', t: 'Socialist Romania', y: '1947 – 1989',
      d: 'King Michael abdicated and Romania became a socialist state; under Ceaușescu the country built many great projects but life was hard.',
      ev: [
        { n: 'King Michael abdicates', y: '30 Dec 1947', lat: 44.439, lon: 26.096, k: 'event', vn: 'King Michael I', vs: 'The Communist Party-led government', d: 'The king was forced to abdicate and leave the country; Romania became a people\'s republic.' },
        { n: 'The Transfăgărășan road', y: '1970 – 1974', lat: 45.603, lon: 24.617, k: 'event', vn: 'Nicolae Ceaușescu', d: 'The winding road crosses the Făgăraș mountains at over 2,000 m, and is now one of the most beautiful roads in the world.' },
        { n: 'The perfect 10', y: '1976', lat: 45.490, lon: -73.584, k: 'event', vn: 'Nadia Comăneci', d: 'The 14-year-old received the first perfect 10 in Olympic gymnastics, in Montréal; the scoreboard could only show "1.00".' },
        { n: 'Vrancea earthquake', y: '1977', lat: 44.432, lon: 26.104, k: 'event', vn: 'The people of Bucharest', d: 'The magnitude 7.2 earthquake brought down many buildings in Bucharest, killing about 1,500 people.' },
        { n: 'The first Romanian in space', y: '1981', lat: 45.920, lon: 63.342, k: 'event', vn: 'Dumitru Prunariu', d: 'The Romanian cosmonaut flew on Soyuz 40 from Baikonur and spent almost 8 days on the Salyut 6 station.' },
        { n: 'The Palace of the Parliament', y: '1984 – 1997', lat: 44.4275, lon: 26.0875, k: 'event', vn: 'Nicolae Ceaușescu', d: 'One of the largest and heaviest administrative buildings in the world; a large part of the old town was demolished to build it.' },
        { n: 'The December Revolution', y: 'Dec 1989', lat: 45.754, lon: 21.226, k: 'event', vn: 'The people of Timișoara and Bucharest', vs: 'The Ceaușescu regime', d: 'It began in Timișoara and spread to Bucharest; it was the only change of regime in Eastern Europe in 1989 with major bloodshed.' }
      ]
    },
    {
      id: 'hiendai', t: 'Romania today', y: '1990 – present',
      d: 'Romania built a multi-party democracy and joined NATO and the European Union.',
      ev: [
        { n: 'The Danube Delta becomes a World Heritage Site', y: '1991', lat: 45.160, lon: 29.300, approx: true, k: 'event', vn: 'Romania', d: 'The second-largest delta in Europe, home to more than 300 species of birds, and the largest reed marsh in the world.' },
        { n: 'Joining NATO', y: '2004', lat: 44.4275, lon: 26.0875, approx: true, k: 'event', vn: 'President Ion Iliescu', d: 'Romania joined NATO; in 2008 the NATO summit was held in the Palace of the Parliament.' },
        { n: 'Joining the European Union', y: '2007', lat: 45.797, lon: 24.152, approx: true, k: 'event', vn: 'President Traian Băsescu', d: 'The same year, the city of Sibiu was European Capital of Culture.' },
        { n: 'Simona Halep wins Wimbledon', y: '2019', lat: 51.434, lon: -0.214, k: 'event', vn: 'Simona Halep', d: 'The Romanian player won the women\'s singles final in London, after winning the French Open in 2018.' },
        { n: 'Joining the Schengen Area', y: '2024 – 2025', lat: 44.432, lon: 26.104, approx: true, k: 'event', vn: 'Romania', d: 'From 1 January 2025, people can cross the border with many European countries without passport checks.' },
        { n: 'The presidential election is rerun', y: '2024 – 2025', lat: 44.4275, lon: 26.0875, approx: true, k: 'event', vn: 'The Constitutional Court, President Nicușor Dan', d: 'The Constitutional Court annulled the first-round result in late 2024; a rerun election in May 2025 chose a new president.' }
      ]
    }
  ]
};
