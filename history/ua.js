// Ukraine history for the Geo-Flight history layer (English text).
export default {
  iso: 'ua', name: 'Ukraine', flag: '🇺🇦',
  eras: [
    {
      id: 'codai', t: 'Ancient Times', y: '~16,000 BCE – 800 CE',
      d: 'The steppes and fertile black soil north of the Black Sea were home to mammoth hunters, Trypillia farmers, nomadic Scythians and Greek cities.',
      ev: [
        { n: 'Mezhyrich mammoth-bone houses', y: '~16,000 BCE', lat: 49.633, lon: 31.400, k: 'discovery', vn: 'Ice Age hunters', d: 'About 18,000 years ago, in the middle of the Ice Age, people built round houses from hundreds of mammoth bones and tusks stacked on top of one another.' },
        { n: 'Trypillia culture', y: '~4800 – 3000 BCE', lat: 50.118, lon: 30.775, approx: true, k: 'event', vn: 'Trypillia farmers', d: 'Some of their settlements had thousands of houses – among the largest in Europe at the time – with pottery painted in red, black and white spiral patterns.' },
        { n: 'Greek city of Olbia', y: '~6th century BCE', lat: 46.692, lon: 31.902, k: 'event', vn: 'Greeks from Miletus', d: 'A port city at the mouth of the Southern Bug, where the Greeks traded wine and olive oil for wheat and fish with the steppe tribes.' },
        { n: 'City of Chersonesus', y: '~422 BCE', lat: 44.611, lon: 33.493, k: 'event', vn: 'Greeks', d: 'The Greek city on the Crimean peninsula still has many stone columns and house foundations; in 2013 it was recognized by UNESCO as a World Heritage Site.' },
        { n: 'Scythian gold pectoral', y: '4th century BCE', lat: 47.630, lon: 34.120, approx: true, k: 'discovery', vn: 'Scythian goldsmiths', d: 'Found in 1971 in the Tovsta Mohyla burial mound: a gold piece weighing over 1 kg with dozens of tiny, extremely fine figures of people, horses, sheep and small animals.' },
        { n: 'Legend of the founding of Kyiv', y: '~5th – 6th century', lat: 50.450, lon: 30.524, k: 'legend', vn: 'Kyi, Shchek, Khoryv and their sister Lybid', d: 'According to legend, three brothers and their sister founded the city on a hill beside the Dnipro River, naming it after the eldest brother Kyi.' }
      ]
    },
    {
      id: 'rus', t: 'Kyivan Rus', y: '882 – 1240',
      d: 'The East Slavic state with its capital at Kyiv is the shared historical root of Ukraine, Belarus and Russia.',
      ev: [
        { n: 'Oleg takes Kyiv', y: '882', lat: 50.450, lon: 30.524, k: 'event', vn: 'Oleg', d: 'Kyiv became a hub on the river trade route "from the Varangians to the Greeks".' },
        { n: 'Princess Olga becomes Christian', y: '~957', lat: 41.008, lon: 28.978, k: 'event', vn: 'Princess Olga', d: 'She traveled to Constantinople and was baptized, before her grandson Volodymyr.' },
        { n: 'Baptism of Rus', y: '988', lat: 50.455, lon: 30.530, k: 'event', vn: 'Grand Prince Volodymyr (Vladimir)', d: 'The people of Kyiv were baptized together in the Dnipro River, and Rus adopted Orthodox Christianity from Byzantium.' },
        { n: 'St. Sophia Cathedral', y: '1037', lat: 50.453, lon: 30.514, k: 'event', vn: 'Yaroslav the Wise', d: 'A church with glittering gold mosaics; Yaroslav also married his daughters to the kings of France, Norway and Hungary.' },
        { n: 'Kyiv Pechersk Lavra', y: '1051', lat: 50.434, lon: 30.557, k: 'event', vn: 'St. Antony and Theodosius', d: 'The monastery began with caves dug into the hillside; it is now a complex with many golden domes, a UNESCO World Heritage Site.' },
        { n: 'Fall of Kyiv', y: '1240', lat: 50.450, lon: 30.524, k: 'battle', vn: 'Voivode Dmytro', vs: 'Batu (Mongol)', d: 'The Mongols destroyed the ancient capital, ending the era of Kyivan Rus.' }
      ]
    },
    {
      id: 'galicia', t: 'Galicia – Volhynia and the Lithuanian – Polish Era', y: '1199 – 1648',
      d: 'The Principality of Galicia – Volhynia continued the traditions of Rus; later the Ukrainian lands belonged to the Grand Duchy of Lithuania and to Poland, and the Cossacks appeared.',
      ev: [
        { n: 'Coronation of King Danylo', y: '1253', lat: 52.397, lon: 22.659, k: 'event', vn: 'King Danylo of Galicia', d: 'At Dorohychyn, Danylo received a crown from the Pope\'s envoy and became "King of Rus".' },
        { n: 'Founding of Lviv', y: '~1256', lat: 49.842, lon: 24.032, k: 'event', vn: 'King Danylo', d: 'The city was named after Prince Lev, King Danylo\'s son – "Lev" means "lion"; Lviv\'s old town is now a World Heritage Site.' },
        { n: 'Kamianets-Podilskyi fortress', y: '14th century', lat: 48.674, lon: 26.563, k: 'event', vn: 'The Koriatovych princes', d: 'The fortress sits on a bend in the canyon of the Smotrych River, almost a stone island.' },
        { n: 'Zaporozhian Sich on Khortytsia island', y: '~1552', lat: 47.830, lon: 35.100, approx: true, k: 'event', vn: 'Prince Dmytro Vyshnevetsky', d: 'The wooden fortress on an island in the Dnipro was the base of the Zaporozhian Cossacks, the free warriors of the steppe.' },
        { n: 'First dated printed book in Ukraine', y: '1574', lat: 49.841, lon: 24.034, k: 'discovery', vn: 'Printer Ivan Fedorov', d: 'In Lviv, Ivan Fedorov printed the "Apostol" and a primer – regarded as the beginning of book printing in Ukraine.' },
        { n: 'Ostroh Bible', y: '1581', lat: 50.329, lon: 26.513, k: 'event', vn: 'Prince Kostiantyn Ostrozky, printer Ivan Fedorov', d: 'The first complete printed Bible in Church Slavonic, made in Ostroh.' },
        { n: 'Kyiv-Mohyla Academy', y: '1632', lat: 50.465, lon: 30.519, k: 'discovery', vn: 'Metropolitan Petro Mohyla', d: 'A school in the Podil district was raised to an academy; many Eastern European scholars studied here, and it is now a well-known university in Kyiv.' }
      ]
    },
    {
      id: 'cossack', t: 'The Cossack Hetmanate', y: '1648 – 1775',
      d: 'Bohdan Khmelnytsky\'s uprising created a Cossack state headed by a Hetman; afterward the region gradually came under the Russian Empire.',
      route: { t: 'Khmelnytsky\'s march in 1648', pts: [[47.830, 35.100], [48.350, 33.510], [49.420, 31.260], [49.620, 27.470], [49.842, 24.032]] },
      ev: [
        { n: 'Battle of Zhovti Vody', y: '1648', lat: 48.350, lon: 33.510, k: 'battle', vn: 'Hetman Bohdan Khmelnytsky', vs: 'Polish army (Stefan Potocki)', d: 'The first victory of the Cossack uprising, helped by Crimean Tatar cavalry.' },
        { n: 'Battle of Korsun', y: '1648', lat: 49.420, lon: 31.260, k: 'battle', vn: 'Hetman Bohdan Khmelnytsky', vs: 'Polish army (Mikołaj Potocki)', d: 'Both Polish commanders were captured; the uprising spread across all of Ukraine.' },
        { n: 'Treaty of Pereiaslav', y: '1654', lat: 50.070, lon: 31.450, k: 'event', vn: 'Hetman Bohdan Khmelnytsky', vs: 'Russian envoy Vasily Buturlin', d: 'The Hetmanate allied with the Tsar of Moscow; historians still debate the meaning of the treaty today.' },
        { n: 'Battle of Konotop', y: '1659', lat: 51.240, lon: 33.200, k: 'battle', vn: 'Hetman Ivan Vyhovsky', vs: 'Russian army (Trubetskoy)', d: 'The Cossacks and their Tatar allies defeated a large cavalry force of Moscow.' },
        { n: 'Letter to the Sultan', y: '~1676', lat: 47.600, lon: 34.300, approx: true, k: 'legend', vn: 'Ataman Ivan Sirko and the Cossacks', vs: 'Ottoman Sultan', d: 'The tale tells of Cossacks laughing as they wrote a letter mocking the Sultan; the painter Ilya Repin turned it into a famous painting.' },
        { n: 'Battle of Poltava', y: '1709', lat: 49.630, lon: 34.550, k: 'battle', vn: 'Hetman Ivan Mazepa (allied with Charles XII)', vs: 'Tsar Peter I', d: 'Mazepa allied with the Swedish king to escape the Tsar\'s authority, but they lost the battle.' },
        { n: 'Constitution of Pylyp Orlyk', y: '1710', lat: 46.830, lon: 29.480, k: 'event', vn: 'Hetman Pylyp Orlyk', d: 'Written in exile at Bender, this document divided power between the Hetman and a council – very new for its time.' },
        { n: 'Dissolution of the Zaporozhian Sich', y: '1775', lat: 47.550, lon: 34.400, approx: true, k: 'event', vn: 'Zaporozhian Cossacks', vs: 'Empress Catherine II', d: 'Russian troops seized and destroyed the last Sich, ending Cossack autonomy.' }
      ]
    },
    {
      id: 'dequoc', t: 'Under the Russian and Austrian Empires', y: '1775 – 1917',
      d: 'Most of Ukraine belonged to the Russian Empire and the western part to Austria; poetry and the Ukrainian language became a flame keeping national identity alive.',
      ev: [
        { n: 'Founding of Odesa', y: '1794', lat: 46.485, lon: 30.735, k: 'event', vn: 'José de Ribas, Duke of Richelieu', d: 'The Black Sea port city grew quickly; the Potemkin Stairs, now 192 steps, were completed in 1841.' },
        { n: 'Poetry collection "Kobzar"', y: '1840', lat: 49.736, lon: 31.486, k: 'event', vn: 'Taras Shevchenko', d: 'The poet, once a serf, became a symbol of Ukraine; he is buried on a hill beside the Dnipro River at Kaniv.' },
        { n: 'Kerosene lamp lights an operation', y: '1853', lat: 49.842, lon: 24.031, k: 'discovery', vn: 'Ignacy Łukasiewicz, Jan Zeh', d: 'Two pharmacists in Lviv distilled petroleum into kerosene and made a lamp; on the night of July 31, 1853, their lamp lit an emergency operation at the city hospital.' },
        { n: 'Ukrainian national anthem is born', y: '1862 – 1863', lat: 49.842, lon: 24.032, approx: true, k: 'event', vn: 'Pavlo Chubynsky, Mykhailo Verbytsky', d: 'The poem "Ukraine Has Not Yet Perished" was set to music in the west; over 100 years later it became the national anthem.' },
        { n: 'Askania-Nova reserve', y: '1898', lat: 46.453, lon: 33.880, k: 'discovery', vn: 'Friedrich Falz-Fein', d: 'A landowner preserved an area of steppe that had never been plowed and brought Przewalski\'s wild horses from Mongolia – herds of them are still there today.' },
        { n: 'The song "Shchedryk"', y: '1916', lat: 50.452, lon: 30.528, k: 'discovery', vn: 'Composer Mykola Leontovych', d: 'The New Year\'s song was first sung in Kyiv at the end of 1916; its melody later became the famous Christmas song "Carol of the Bells".' }
      ]
    },
    {
      id: 'lienxo', t: 'Revolution and the Soviet Era', y: '1917 – 1991',
      d: 'After a few brief years of independence, Ukraine became a republic of the Soviet Union; its people went through the famine of 1932–1933 and the brutal Second World War.',
      ev: [
        { n: 'Ukrainian People\'s Republic', y: '1917 – 1918', lat: 50.4465, lon: 30.5155, k: 'event', vn: 'Mykhailo Hrushevsky, Central Rada', d: 'The Central Rada met in Kyiv and proclaimed the republic, then declared independence in January 1918.' },
        { n: 'Battle of Kruty', y: '1918', lat: 51.060, lon: 31.930, approx: true, k: 'battle', vn: 'Kyiv students', vs: 'Red Army (Muravyov)', d: 'A few hundred school and university students blocked the Red Army\'s advance on Kyiv at a small railway station.' },
        { n: 'Act of Union', y: 'Jan 22, 1919', lat: 50.453, lon: 30.516, k: 'event', vn: 'Symon Petliura, Yevhen Petrushevych', d: 'Eastern and western Ukraine proclaimed their union on Sophia Square; this day is Unity Day.' },
        { n: 'Holodomor famine', y: '1932 – 1933', lat: 50.436, lon: 30.560, k: 'event', vn: 'Ukrainian peasants', d: 'Because of collectivization and grain requisitioning, millions died of hunger; many countries recognize this as a genocide.' },
        { n: 'Battle of Kyiv', y: '1941', lat: 50.450, lon: 30.524, k: 'battle', vn: 'Red Army (including many Ukrainians)', vs: 'German army', d: 'The German army encircled and took Kyiv; hundreds of thousands of Soviet soldiers were taken prisoner.' },
        { n: 'Babyn Yar', y: '1941', lat: 50.472, lon: 30.449, k: 'event', vn: 'Jews of Kyiv', d: 'In just two days at the end of September 1941, German forces killed more than 33,000 Jews in this ravine; it is now a memorial site.' },
        { n: 'Liberation of Kyiv', y: 'Nov 6, 1943', lat: 50.450, lon: 30.524, k: 'battle', vn: 'Red Army (1st Ukrainian Front)', vs: 'German army', d: 'After crossing the broad Dnipro River, the Red Army liberated the capital; millions of Ukrainians died in the war.' },
        { n: 'Founding member of the United Nations', y: '1945', lat: 37.779, lon: -122.418, k: 'event', vn: 'Ukrainian delegation', d: 'Although part of the Soviet Union, Ukraine had its own seat and signed the UN Charter in San Francisco.' },
        { n: 'First electronic computer in the USSR', y: '1950', lat: 50.345, lon: 30.493, k: 'discovery', vn: 'Sergei Lebedev and a team of engineers', d: 'In an old building at Feofaniya near Kyiv, the MESM machine, with about 6,000 vacuum tubes, ran for the first time on November 6, 1950.' },
        { n: 'Arsenalna metro station', y: '1960', lat: 50.444, lon: 30.546, k: 'discovery', vn: 'Kyiv metro engineers', d: 'Lying 105.5 m deep under the hill, Arsenalna was once the deepest metro station in the world; the escalator ride down takes several minutes.' },
        { n: 'Chernobyl disaster', y: '1986', lat: 51.389, lon: 30.099, k: 'event', vn: 'Firefighters and plant workers', d: 'Reactor No. 4 exploded; the city of Pripyat was abandoned and the 30 km exclusion zone still exists today.' },
        { n: 'The An-225 Mriya aircraft', y: '1988', lat: 50.604, lon: 30.192, k: 'discovery', vn: 'Antonov Design Bureau', d: 'The heaviest aircraft ever to fly, its name means "Dream", once carried the Buran space shuttle on its back; it was destroyed at Hostomel airport in 2022.' }
      ]
    },
    {
      id: 'doclap', t: 'Independent Ukraine', y: '1991 – 2013',
      d: 'Ukraine declared independence in 1991, gave up its nuclear weapons and built a new state amid many political upheavals.',
      ev: [
        { n: 'Declaration of Independence', y: 'Aug 24, 1991', lat: 50.447, lon: 30.536, k: 'event', vn: 'Leonid Kravchuk, Verkhovna Rada', d: 'Parliament declared independence; in the referendum on December 1, 1991, more than 90% of voters agreed.' },
        { n: 'Budapest Memorandum', y: '1994', lat: 47.497, lon: 19.040, k: 'event', vn: 'President Leonid Kuchma', vs: 'Russia, US, UK (the pledging parties)', d: 'Ukraine gave up the world\'s third-largest nuclear arsenal in exchange for pledges to respect its territory.' },
        { n: 'Constitution of Ukraine', y: 'Jun 28, 1996', lat: 50.447, lon: 30.536, k: 'event', vn: 'Verkhovna Rada', d: 'Parliament adopted the constitution after an all-night session; June 28 is Constitution Day.' },
        { n: 'Orange Revolution', y: '2004', lat: 50.450, lon: 30.524, k: 'event', vn: 'Viktor Yushchenko, people of Kyiv', d: 'Hundreds of thousands of people wearing orange protested on Independence Square; the decisive round of the election was held again.' },
        { n: 'Ruslana wins Eurovision', y: '2004', lat: 41.068, lon: 28.990, approx: true, k: 'discovery', vn: 'Singer Ruslana', d: 'The song "Wild Dances", inspired by the Hutsul people of the Carpathian mountains, won in Istanbul – only the second time Ukraine had entered.' },
        { n: 'Euro 2012 final', y: '2012', lat: 50.433, lon: 30.522, k: 'event', vn: 'Ukraine and Poland', d: 'Ukraine co-hosted the European Championship; the final was held at the Olympic Stadium in Kyiv.' }
      ]
    },
    {
      id: 'chientranh', t: 'Maidan and War', y: '2013 – present',
      d: 'After the Maidan protests, Russia annexed Crimea and conflict broke out in Donbas; on February 24, 2022, Russia launched a full-scale military invasion of Ukraine.',
      ev: [
        { n: 'Revolution of Dignity (Euromaidan)', y: '2013 – 2014', lat: 50.450, lon: 30.524, k: 'event', vn: 'Maidan protesters', vs: 'Government of Viktor Yanukovych', d: 'Protests demanding closer ties with the European Union lasted three months; more than 100 people were killed and President Yanukovych left the country.' },
        { n: 'Russia annexes Crimea', y: 'Mar 2014', lat: 44.952, lon: 34.102, k: 'event', vn: 'Government of Ukraine', vs: 'Russia', d: 'Russia annexed Crimea after a referendum that Ukraine and most countries voting in the UN General Assembly did not recognize.' },
        { n: 'Fighting in Donbas', y: '2014 – 2022', lat: 48.073, lon: 37.740, k: 'battle', vn: 'Ukrainian army', vs: 'Russian-backed separatist forces', d: 'Fighting in the east, such as around Donetsk airport, killed more than 14,000 people before 2022.' },
        { n: 'Flight MH17', y: 'Jul 17, 2014', lat: 48.138, lon: 38.648, k: 'event', vn: 'Passengers and crew', d: 'A Malaysia Airlines plane was shot down by a missile over the war zone; all 298 people on board died.' },
        { n: 'Minsk agreements', y: '2015', lat: 53.902, lon: 27.562, k: 'event', vn: 'President Petro Poroshenko', vs: 'Russia and separatist forces (mediators: Germany, France)', d: 'A ceasefire agreement signed in Minsk reduced the fighting, but did not bring lasting peace.' },
        { n: 'Russia launches full-scale invasion', y: 'Feb 24, 2022', lat: 50.450, lon: 30.524, k: 'battle', vn: 'President Volodymyr Zelensky', vs: 'Russian army', d: 'The Russian army attacked from many directions; millions of Ukrainians had to leave their homes – the largest war in Europe since 1945.' },
        { n: 'Battle of Kyiv and Hostomel', y: 'Feb – Mar 2022', lat: 50.604, lon: 30.192, k: 'battle', vn: 'Ukrainian army', vs: 'Russian army', d: 'Russian forces landed by air at Hostomel airport but could not take Kyiv and withdrew from the area in early April.' },
        { n: 'Snake Island', y: '2022', lat: 45.255, lon: 30.204, k: 'battle', vn: 'Ukrainian border guards', vs: 'Russian navy', d: 'The small island in the Black Sea was seized on the first day of the war; at the end of June Russian forces withdrew from the island.' },
        { n: 'Siege of Mariupol', y: '2022', lat: 47.098, lon: 37.598, k: 'battle', vn: 'Ukrainian defenders at the Azovstal plant', vs: 'Russian army', d: 'The port city was besieged for nearly three months and badly devastated; the last defenders left the steel plant in May.' },
        { n: 'Borscht added to the UNESCO list', y: 'Jul 1, 2022', lat: 50.450, lon: 30.524, approx: true, k: 'discovery', vn: 'Ukrainian borscht cooks', d: 'The culture of cooking borscht beet soup was placed by UNESCO on the list of intangible heritage in need of urgent safeguarding, because the war threatens this tradition.' },
        { n: 'Ukrainian forces return to Kherson', y: 'Nov 2022', lat: 46.635, lon: 32.617, k: 'battle', vn: 'Ukrainian army', vs: 'Russian army', d: 'After counteroffensives in Kharkiv and Kherson, Russian forces withdrew to the left bank of the Dnipro and Ukrainian troops re-entered the city.' },
        { n: 'Kakhovka Dam destroyed', y: 'Jun 2023', lat: 46.778, lon: 33.370, k: 'event', vn: 'People of the lower Dnipro', d: 'The huge dam broke, and water flooded many villages and towns; the reservoir above gradually dried up.' },
        { n: 'Fighting in the Kursk region', y: '2024 – 2025', lat: 51.190, lon: 35.270, k: 'battle', vn: 'Ukrainian army', vs: 'Russian army', d: 'In August 2024 Ukrainian forces crossed the border into Russia\'s Kursk region; peace talks in 2025 have not yet ended the war.' }
      ]
    }
  ]
};
