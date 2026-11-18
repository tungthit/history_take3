// Czech Republic history for the Geo-Flight history layer.
export default {
  iso: 'cz', name: 'Czechia', flag: '🇨🇿',
  eras: [
    {
      id: 'premysl', t: 'Great Moravia and the Přemyslids', y: '~830 – 1306',
      d: 'The Slavs founded Great Moravia and then the Duchy of Bohemia; the Přemyslid family ruled for more than 400 years and made Bohemia a kingdom.',
      ev: [
        { n: 'The legend of Queen Libuše', y: '~700', lat: 50.064, lon: 14.418, approx: true, k: 'legend', vn: 'Libuše, Přemysl the Ploughman', d: 'Standing on Vyšehrad hill, Queen Libuše prophesied "a city whose glory will touch the stars" – that city is Prague.' },
        { n: 'Cyril and Methodius come to Great Moravia', y: '863', lat: 48.800, lon: 17.050, approx: true, k: 'event', vn: 'Duke Rostislav', d: 'The two missionaries from Byzantium brought the Glagolitic alphabet for writing the Slavic language.' },
        { n: 'Building of Prague Castle', y: '~880', lat: 50.090, lon: 14.400, k: 'event', vn: 'Duke Bořivoj I', d: 'According to the Guinness Book of Records, it is the largest ancient castle complex in the world.' },
        { n: 'Saint Wenceslas dies', y: '935', lat: 50.198, lon: 14.672, k: 'event', vn: 'Duke Václav (Wenceslas)', vs: 'Boleslav I (his younger brother)', d: 'The gentle duke was killed by his younger brother in Stará Boleslav and later became the patron saint of the Czechs.' },
        { n: 'Battle of Marchfeld', y: '1278', lat: 48.430, lon: 16.860, approx: true, k: 'battle', vn: 'King Ottokar II', vs: 'King Rudolf I of Habsburg', d: 'The "King of Iron and Gold", who once ruled all the way to the Adriatic Sea, was killed in Austria; the Habsburgs began to grow powerful.' }
      ]
    },
    {
      id: 'karel', t: 'Charles IV and the Hussite movement', y: '1346 – 1526',
      d: 'Under Charles IV, Prague was the capital of the Holy Roman Empire; afterwards the reformer Jan Hus began a long religious war.',
      ev: [
        { n: 'Charles University', y: '1348', lat: 50.0865, lon: 14.4235, k: 'event', vn: 'Emperor Charles IV', d: 'The first university in Central Europe, still the largest university in the Czech Republic today.' },
        { n: 'Karlštejn Castle', y: '1348', lat: 49.939, lon: 14.188, k: 'event', vn: 'Emperor Charles IV', d: 'The castle on a rocky hill was built to keep the emperor\'s crown and treasures.' },
        { n: 'Charles Bridge', y: '1357', lat: 50.0865, lon: 14.4114, k: 'event', vn: 'Emperor Charles IV, architect Peter Parler', d: 'Legend says egg yolks were mixed into the mortar to make the stone bridge across the Vltava River stronger.' },
        { n: 'Prague Astronomical Clock', y: '1410', lat: 50.0870, lon: 14.4207, k: 'event', vn: 'Clockmaker Mikuláš of Kadaň', d: 'The oldest astronomical clock still working; every hour the figures of the apostles appear one after another.' },
        { n: 'Jan Hus is executed at Konstanz', y: '1415', lat: 47.660, lon: 9.175, k: 'event', vn: 'Jan Hus', vs: 'The Council of Constance', d: 'The reformer who preached in Czech was condemned and burned at the stake; his death sparked the Hussite movement.' },
        { n: 'Battle of Vítkov Hill', y: '1420', lat: 50.089, lon: 14.450, k: 'battle', vn: 'Jan Žižka', vs: 'Emperor Sigismund', d: 'The one-eyed general Žižka and his militia defeated the crusader army and defended Prague.' },
        { n: 'Battle of Lipany', y: '1434', lat: 50.030, lon: 14.980, approx: true, k: 'battle', vn: 'The moderate Hussites', vs: 'The radical Hussites (Prokop the Great)', d: 'The two Hussite sides fought each other; the moderates won, opening the way to peace after 15 years of war.' }
      ]
    },
    {
      id: 'habsburg', t: 'Under the Habsburgs', y: '1526 – 1848',
      d: 'Bohemia belonged to the Habsburgs; Prague was once the capital of scientists, then the uprising of 1618 sparked the Thirty Years\' War.',
      ev: [
        { n: 'The court of Rudolf II in Prague', y: '1583 – 1612', lat: 50.091, lon: 14.399, k: 'event', vn: 'Emperor Rudolf II, Tycho Brahe, Johannes Kepler', d: 'The emperor, a lover of science, invited astronomers to Prague; Kepler found the laws of planetary motion here.' },
        { n: 'The Defenestration of Prague', y: '1618', lat: 50.090, lon: 14.400, k: 'event', vn: 'The Protestant nobles of Bohemia', vs: 'The Habsburg officials', d: 'Two officials were thrown out of a window of Prague Castle but survived; the event sparked the Thirty Years\' War.' },
        { n: 'Battle of White Mountain', y: '1620', lat: 50.078, lon: 14.320, k: 'battle', vn: 'Christian of Anhalt (army of the Bohemian Estates)', vs: 'Emperor Ferdinand II (Tilly, Bucquoy)', d: 'The Bohemian army lost in only about two hours; the Czech lands lost their autonomy for nearly 300 years.' },
        { n: 'Comenius – "teacher of the nations"', y: '1592 – 1670', lat: 49.025, lon: 17.647, approx: true, k: 'event', vn: 'Jan Amos Komenský (Comenius)', d: 'He wrote one of the first illustrated textbooks for children; 28 March is Teachers\' Day in the Czech Republic.' },
        { n: 'Gregor Mendel and the pea plants', y: '1856 – 1863', lat: 49.191, lon: 16.594, k: 'event', vn: 'Gregor Mendel', d: 'In the monastery garden in Brno, the monk Mendel grew thousands of pea plants and discovered the laws of heredity.' }
      ]
    },
    {
      id: 'phuchung', t: 'The National Revival', y: '1848 – 1918',
      d: 'The Czechs revived their language and culture; Bohemia became an industrial centre of the Austro-Hungarian Empire.',
      ev: [
        { n: 'The birth of Pilsner beer', y: '1842', lat: 49.747, lon: 13.386, k: 'event', vn: 'The people of Plzeň, brewer Josef Groll', d: 'The world\'s first clear golden beer was created in Plzeň and was copied by many countries.' },
        { n: 'Škoda Works', y: '1869', lat: 49.740, lon: 13.370, k: 'event', vn: 'Emil Škoda', d: 'The engineering workshop in Plzeň grew into a company making locomotives, aircraft and the famous Škoda cars.' },
        { n: 'National Theatre', y: '1881 – 1883', lat: 50.081, lon: 14.413, k: 'event', vn: 'The Czech people', d: 'Built with donations from the whole country; when it burned down in 1881, people gave money again and rebuilt it in just two years.' },
        { n: 'The symphony "From the New World"', y: '1893', lat: 40.765, lon: -73.980, k: 'event', vn: 'Antonín Dvořák', d: 'The Czech composer wrote the symphony while living in the USA; the first performance was at Carnegie Hall, New York.' },
        { n: 'Battle of Zborov', y: '1917', lat: 49.660, lon: 25.150, k: 'battle', vn: 'The Czechoslovak Legion', vs: 'The Austro-Hungarian army', d: 'Czech and Slovak volunteers fought on the Russian side in Ukraine to demand an independent country.' },
        { n: 'Declaration of Czechoslovak independence', y: '28 Oct 1918', lat: 50.081, lon: 14.428, k: 'event', vn: 'Tomáš Garrigue Masaryk, Edvard Beneš', d: 'The Czechs and Slovaks formed a common state; Masaryk became the first president.' }
      ]
    },
    {
      id: 'tiepkhac', t: 'Czechoslovakia and World War II', y: '1918 – 1945',
      d: 'Czechoslovakia was a developed industrial democracy, until it was cut up in 1938 and occupied by Nazi Germany.',
      ev: [
        { n: 'The word "robot" is born', y: '1920', lat: 50.081, lon: 14.413, approx: true, k: 'event', vn: 'Karel Čapek, Josef Čapek', d: 'The writer Karel Čapek used the word "robot" for the first time in the play R.U.R.; the word was coined by his brother.' },
        { n: 'Munich Agreement', y: '1938', lat: 48.146, lon: 11.565, k: 'event', vn: 'President Edvard Beneš', vs: 'Germany, Italy, Britain, France', d: 'Four powers decided to give the Sudetenland to Germany without any Czechoslovak representative present.' },
        { n: 'Germany occupies Prague', y: '15 Mar 1939', lat: 50.081, lon: 14.428, k: 'event', vn: 'The people of Prague', vs: 'The German army', d: 'German troops marched into Prague in the snow; the Czech lands became the "Protectorate of Bohemia and Moravia".' },
        { n: 'International Students\' Day', y: '17 Nov 1939', lat: 50.0865, lon: 14.4235, k: 'event', vn: 'Czech students', vs: 'The German occupation authorities', d: 'Germany closed the Czech universities after demonstrations; 17 November is now International Students\' Day.' },
        { n: 'Operation Anthropoid', y: '1942', lat: 50.117, lon: 14.466, k: 'battle', vn: 'Jozef Gabčík, Jan Kubiš', vs: 'Reinhard Heydrich', d: 'Two paratroopers trained in Britain attacked one of the highest-ranking Nazi leaders in Prague.' },
        { n: 'The village of Lidice is wiped out', y: '1942', lat: 50.143, lon: 14.191, k: 'event', vn: 'The people of Lidice', d: 'In revenge, German troops destroyed the whole village; many places around the world named streets and parks Lidice in remembrance.' },
        { n: 'Prague Uprising', y: '5/1945', lat: 50.0775, lon: 14.432, k: 'battle', vn: 'The people of Prague', vs: 'The German army', d: 'In the last days of the war, the people built barricades and took back the Radio building.' }
      ]
    },
    {
      id: 'xhcn', t: 'Socialist Czechoslovakia', y: '1948 – 1989',
      d: 'The Communist Party took power in 1948; the "Prague Spring" of 1968 was stopped, then the "Velvet Revolution" of 1989 changed the country peacefully.',
      ev: [
        { n: 'February Events', y: '1948', lat: 50.0875, lon: 14.421, k: 'event', vn: 'Klement Gottwald', d: 'From the balcony of a building on Old Town Square, Gottwald announced that the Communist Party was leading the government.' },
        { n: 'Prague Spring', y: '1968', lat: 50.081, lon: 14.428, k: 'event', vn: 'Alexander Dubček', d: 'The new leader promised "socialism with a human face", allowing more freedom of the press.' },
        { n: 'Warsaw Pact troops invade', y: '21 Aug 1968', lat: 50.0775, lon: 14.432, k: 'event', vn: 'Alexander Dubček, the people of Prague', vs: 'The armies of the Soviet Union and the Warsaw Pact countries', d: 'Hundreds of thousands of soldiers and tanks entered Czechoslovakia in a single night, ending the Prague Spring.' },
        { n: 'Charter 77', y: '1977', lat: 50.081, lon: 14.420, approx: true, k: 'event', vn: 'Václav Havel and the intellectuals', d: 'A document calling on the authorities to respect human rights, signed by the playwright Václav Havel and many others.' },
        { n: 'Velvet Revolution', y: '17 Nov 1989', lat: 50.082, lon: 14.418, k: 'event', vn: 'Students, Václav Havel', d: 'The demonstration on Národní Street began the days when people jingled their keys to demand change, without violence.' },
        { n: 'Havel becomes President', y: '29 Dec 1989', lat: 50.090, lon: 14.400, k: 'event', vn: 'Václav Havel', d: 'The playwright, once jailed, was elected president and moved into Prague Castle.' }
      ]
    },
    {
      id: 'hiendai', t: 'The Czech Republic', y: '1993 – present',
      d: 'Czechoslovakia split peacefully in two; the Czech Republic joined NATO and the European Union and became a developed industrial country.',
      ev: [
        { n: 'The "Velvet Divorce"', y: '1 Jan 1993', lat: 49.207, lon: 16.616, k: 'event', vn: 'Václav Klaus', vs: 'Vladimír Mečiar (Slovakia)', d: 'The separation agreement was discussed at Villa Tugendhat in Brno; the Czech Republic and Slovakia became two countries without conflict.' },
        { n: 'The "Game of the Century" in Nagano', y: '1998', lat: 36.650, lon: 138.190, k: 'event', vn: 'The Czech ice hockey team, goalkeeper Dominik Hašek', d: 'The Czech team won the Winter Olympic gold medal in Japan; the whole country poured into the streets to celebrate.' },
        { n: 'Joining NATO', y: '1999', lat: 50.090, lon: 14.400, approx: true, k: 'event', vn: 'President Václav Havel', d: 'Together with Poland and Hungary, the Czech Republic was among the first Eastern European countries to join the alliance.' },
        { n: 'The Great Flood of Prague', y: '2002', lat: 50.092, lon: 14.432, k: 'event', vn: 'The people of Prague', d: 'The Vltava River rose and flooded many districts and metro lines; tens of thousands of people had to be evacuated.' },
        { n: 'Joining the European Union', y: '2004', lat: 50.081, lon: 14.428, approx: true, k: 'event', vn: 'President Václav Klaus', d: 'The Czech Republic was one of 10 countries to join the EU at the same time on 1 May 2004.' },
        { n: 'Floods from Storm Boris', y: '2024', lat: 49.938, lon: 17.903, k: 'event', vn: 'The people of the Moravia – Silesia region', d: 'Long, heavy rain made rivers overflow in Opava and Jeseník, the biggest flood in eastern Czechia in many years.' }
      ]
    }
  ]
};
