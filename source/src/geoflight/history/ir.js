// Iran history for the Geo-Flight history layer (English text).
export default {
  iso: 'ir', name: 'Iran', flag: '🇮🇷',
  eras: [
    {
      id: 'elam', t: 'Elam and the Medes', y: '~4000 – 550 BCE',
      d: 'Before Persia, the kingdom of Elam in southwestern Iran already had writing and temple towers; the Medes later built a large kingdom in the western mountains.',
      ev: [
        { n: 'City of Susa', y: '~4200 BCE', lat: 32.19, lon: 48.25, k: 'event', d: 'One of the oldest cities in the world, the capital of Elam and then of the Persian kings.' },
        { n: 'Jiroft culture', y: '~2500 BCE', lat: 28.68, lon: 57.74, approx: true, k: 'event', d: 'Stone vessels carved with snakes, eagles and bulls were found in 2001 after a flood in the Halil valley.' },
        { n: 'Chogha Zanbil ziggurat', y: '~1250 BCE', lat: 32.008, lon: 48.521, k: 'event', vn: 'King Untash-Napirisha (Elam)', d: 'The best-preserved ziggurat (stepped temple tower) outside Mesopotamia, with bricks still inscribed in cuneiform.' },
        { n: 'Assyria devastates Susa', y: '647 BCE', lat: 32.19, lon: 48.25, k: 'battle', vn: 'Kings of Elam', vs: 'King Ashurbanipal (Assyria)', d: 'The Assyrians burned Susa and sowed salt on the fields; the kingdom of Elam never recovered.' },
        { n: 'Median capital Ecbatana', y: '~700 BCE', lat: 34.80, lon: 48.52, k: 'event', vn: 'King Deioces, Cyaxares', d: 'The historian Herodotus said the city had seven multicolored rings of walls; today it is the city of Hamadan.' }
      ]
    },
    {
      id: 'achaemenid', t: 'The Achaemenid Persian Empire', y: '550 – 330 BCE',
      d: 'Cyrus the Great founded the largest empire in the world at that time, stretching from Egypt to the Indus, famous for the Royal Road and a policy of tolerance.',
      route: { t: 'The Royal Road from Susa to Sardis (~2,700 km)', pts: [[32.19, 48.25], [34.80, 48.52], [36.19, 44.01], [36.87, 39.03], [38.30, 36.00], [38.70, 33.00], [38.48, 28.04]] },
      ev: [
        { n: 'Cyrus defeats the Medes', y: '550 BCE', lat: 30.20, lon: 53.18, approx: true, k: 'battle', vn: 'Cyrus II (Cyrus the Great)', vs: 'King Astyages (Medes)', d: 'Cyrus defeated his own grandfather, the king of the Medes, and built the capital Pasargadae, where his tomb still stands.' },
        { n: 'Cyrus enters Babylon', y: '539 BCE', lat: 32.536, lon: 44.421, k: 'event', vn: 'Cyrus the Great', vs: 'King Nabonidus (Babylon)', d: 'The Cyrus Cylinder records that he let exiled peoples return home and rebuild their temples.' },
        { n: 'Behistun Inscription', y: '~520 BCE', lat: 34.39, lon: 47.44, k: 'event', vn: 'King Darius I', d: 'The text carved high on a cliff in three languages was the key that let scientists read cuneiform.' },
        { n: 'Building the city of Persepolis', y: '518 BCE', lat: 29.935, lon: 52.891, k: 'event', vn: 'King Darius I, Xerxes I', d: 'The great staircase is carved with envoys from 23 peoples bringing gifts to celebrate the Nowruz new year.' },
        { n: 'Battle of Marathon', y: '490 BCE', lat: 38.118, lon: 23.978, k: 'battle', vn: 'Datis, Artaphernes', vs: 'Miltiades (Athens)', d: 'The Persian army landed in Greece and was defeated by the Athenians; the story of the runner carrying the news gave birth to the marathon race.' },
        { n: 'Battle of Thermopylae', y: '480 BCE', lat: 38.797, lon: 22.537, k: 'battle', vn: 'King Xerxes I', vs: 'King Leonidas (Sparta)', d: 'Xerxes\' huge army took three days to get through the narrow pass held by 300 Spartans and their allies.' },
        { n: 'Battle of Salamis', y: '480 BCE', lat: 37.95, lon: 23.57, k: 'battle', vn: 'King Xerxes I', vs: 'Themistocles (Athens)', d: 'The Persian fleet was lured into a narrow strait and lost; Xerxes sat on a mountain watching his forces fail.' },
        { n: 'Battle of Gaugamela', y: '331 BCE', lat: 36.36, lon: 43.25, approx: true, k: 'battle', vn: 'King Darius III', vs: 'Alexander the Great (Macedonia)', d: 'Darius lost to Alexander in northern Mesopotamia; the next year Persepolis was burned and the Achaemenid Empire collapsed.' }
      ]
    },
    {
      id: 'sasanian', t: 'Parthia and the Sassanids', y: '247 BCE – 651',
      d: 'The Parthians and then the Sassanids made Persia a superpower again, facing Rome for seven centuries, until the Arab armies came.',
      ev: [
        { n: 'Battle of Carrhae', y: '53 BCE', lat: 36.87, lon: 39.03, k: 'battle', vn: 'General Surena (Parthia)', vs: 'Crassus (Rome)', d: 'Parthian horse archers, shooting backward as they galloped, crushed seven Roman legions.' },
        { n: 'Ardashir I founds the Sassanid dynasty', y: '224', lat: 28.85, lon: 52.53, approx: true, k: 'battle', vn: 'Ardashir I', vs: 'King Artabanus IV (Parthia)', d: 'Ardashir, from Fars, defeated the Parthian king and built the round city of Gur (Firuzabad), as perfect as if drawn with a compass.' },
        { n: 'Shapur I captures a Roman emperor', y: '260', lat: 37.16, lon: 38.79, approx: true, k: 'battle', vn: 'King Shapur I', vs: 'Emperor Valerian (Rome)', d: 'The only time a Roman emperor was taken prisoner; the scene is carved on the cliff at Naqsh-e Rostam.' },
        { n: 'Academy of Gundishapur', y: '~6th century', lat: 32.28, lon: 48.52, approx: true, k: 'event', vn: 'King Khosrow I Anushirvan', d: 'A famous medical center where Persian, Greek and Indian physicians taught together, with a hospital as well.' },
        { n: 'Taq Kasra palace at Ctesiphon', y: '~540', lat: 33.094, lon: 44.581, k: 'event', vn: 'King Khosrow I', d: 'The largest unreinforced brick vault of the ancient world, still standing today in Iraq.' },
        { n: 'Battle of al-Qadisiyyah', y: '636', lat: 31.60, lon: 44.50, approx: true, k: 'battle', vn: 'General Rostam Farrokhzad', vs: 'Saad ibn Abi Waqqas (Arab)', d: 'The Muslim Arab army won a great victory after four days, poured into Mesopotamia and took the capital Ctesiphon.' },
        { n: 'Battle of Nahavand', y: '642', lat: 34.19, lon: 48.37, k: 'battle', vn: 'King Yazdegerd III', vs: 'Arab army (Rashidun)', d: 'Called the "victory of victories" by the Arabs; the Sassanid dynasty fell in 651.' }
      ]
    },
    {
      id: 'golden', t: 'The golden age of Persian culture', y: '651 – 1501',
      d: 'Persia became Muslim but kept its own language and literature; Persian poets and scientists became famous around the world despite the Mongol invasion.',
      ev: [
        { n: 'Ferdowsi completes the Shahnameh', y: '1010', lat: 36.47, lon: 59.51, k: 'event', vn: 'Poet Ferdowsi', d: 'The epic of 50,000 verses tells the stories of Persian kings and heroes such as Rostam, and helped preserve the Persian language.' },
        { n: 'Ibn Sina in Hamadan', y: '~1020', lat: 34.80, lon: 48.52, k: 'event', vn: 'Ibn Sina (Avicenna)', d: 'His "Canon of Medicine" was used as a textbook in European medical schools for 600 years.' },
        { n: 'Alamut Castle', y: '1090', lat: 36.444, lon: 50.586, k: 'event', vn: 'Hassan-i Sabbah', d: 'The mountaintop fortress was the base of the Nizari Ismaili sect and fell only to the Mongols in 1256.' },
        { n: 'Mongols devastate Nishapur', y: '1221', lat: 36.21, lon: 58.80, k: 'battle', vn: 'People of Nishapur', vs: 'Mongol army (Genghis Khan)', d: 'The wealthy city of Khorasan was leveled after Genghis Khan\'s son-in-law was killed there.' },
        { n: 'Maragheh Observatory', y: '1259', lat: 37.39, lon: 46.21, k: 'event', vn: 'Nasir al-Din Tusi, Hulagu (Il-khan)', d: 'Hulagu had the most modern observatory of its time built; the star tables made here were used as far as China.' },
        { n: 'Soltaniyeh Dome', y: '1312', lat: 36.434, lon: 48.797, k: 'event', vn: 'Il-khan Öljeitü', d: 'A brick dome nearly 50 m high, one of the largest brick domes in the world.' },
        { n: 'Poet Hafez in Shiraz', y: '~1390', lat: 29.62, lon: 52.56, k: 'event', vn: 'Hafez', d: 'Iranians often keep a book of Hafez\'s poems at home and open it to a random page to "tell fortunes"; his tomb is always full of visitors.' }
      ]
    },
    {
      id: 'safavid', t: 'The Safavid dynasty', y: '1501 – 1736',
      d: 'The Safavids unified Iran and made Shia Islam the state religion; Isfahan under Shah Abbas was so beautiful it was called "half the world".',
      ev: [
        { n: 'Ismail I crowned in Tabriz', y: '1501', lat: 38.08, lon: 46.29, k: 'event', vn: 'Shah Ismail I', d: 'A 14-year-old boy proclaimed himself king, beginning the Safavid dynasty and laying the foundation of modern Iran.' },
        { n: 'Battle of Chaldiran', y: '1514', lat: 39.06, lon: 44.38, approx: true, k: 'battle', vn: 'Shah Ismail I', vs: 'Sultan Selim I (Ottoman)', d: 'Safavid cavalry lost to Ottoman cannons and matchlocks; the line between the two countries is close to today\'s Iran–Turkey border.' },
        { n: 'Isfahan becomes the capital', y: '1598', lat: 32.657, lon: 51.677, k: 'event', vn: 'Shah Abbas I', d: 'Naqsh-e Jahan Square, over 8 hectares, was once used as a polo field and is surrounded by mosques and palaces.' },
        { n: 'Si-o-se-pol Bridge', y: '1602', lat: 32.644, lon: 51.667, k: 'event', vn: 'Allahverdi Khan', d: 'A bridge with 33 arches over the Zayanderud River, both for crossing and as a place where people sat to enjoy the cool air.' },
        { n: 'Retaking Hormuz Island', y: '1622', lat: 27.06, lon: 56.46, k: 'battle', vn: 'Shah Abbas I, Imam-Quli Khan', vs: 'The Portuguese', d: 'With the help of English ships, Iranian troops drove the Portuguese from the island that controls the entrance to the Persian Gulf.' },
        { n: 'Afghans besiege Isfahan', y: '1722', lat: 32.657, lon: 51.677, k: 'battle', vn: 'Shah Soltan Hosein', vs: 'Mahmud Hotak (Afghanistan)', d: 'The capital was besieged for six months with terrible famine; the Shah had to surrender, and the Safavid dynasty declined.' }
      ]
    },
    {
      id: 'qajar', t: 'Nader Shah and the Qajars', y: '1736 – 1925',
      d: 'Nader Shah built a short-lived military empire; the Qajars moved the capital to Tehran, lost much land to Russia and began constitutional reform.',
      ev: [
        { n: 'Battle of Karnal', y: '1739', lat: 29.69, lon: 76.98, k: 'battle', vn: 'Nader Shah', vs: 'Emperor Muhammad Shah (Mughal)', d: 'Nader Shah beat the Mughal army and entered Delhi, taking back the Peacock Throne and the Koh-i-Noor diamond.' },
        { n: 'Shiraz under Karim Khan Zand', y: '1765', lat: 29.617, lon: 52.543, k: 'event', vn: 'Karim Khan Zand', d: 'Karim Khan called himself the "representative of the people" rather than king, and made Shiraz even more beautiful.' },
        { n: 'Tehran becomes the capital', y: '1786', lat: 35.68, lon: 51.42, k: 'event', vn: 'Agha Mohammad Khan Qajar', d: 'A small town at the foot of the Alborz mountains became the capital; today Tehran is a city of about 9 million people.' },
        { n: 'Treaty of Turkmenchay', y: '1828', lat: 37.62, lon: 47.40, approx: true, k: 'event', vn: 'Crown Prince Abbas Mirza', vs: 'Russian Empire', d: 'After two wars with Russia, Iran lost the Caucasus region, including today\'s Armenia and Azerbaijan.' },
        { n: 'Constitutional Revolution', y: '1906', lat: 35.69, lon: 51.42, approx: true, k: 'event', vn: 'Merchants, clerics and intellectuals', vs: 'Mozaffar ad-Din Shah', d: 'Thousands of people sat in the British embassy demanding a constitution; Iran got its first parliament (Majlis).' },
        { n: 'Oil found at Masjed Soleyman', y: '1908', lat: 31.94, lon: 49.30, k: 'event', d: 'British investors found the first major oil well in the Middle East, starting the oil industry of the whole region.' }
      ]
    },
    {
      id: 'pahlavi', t: 'The Pahlavi dynasty', y: '1925 – 1979',
      d: 'The Pahlavi kings modernized the country with railways, schools and oil money, but power became ever more concentrated and many people were unhappy.',
      ev: [
        { n: 'Reza Shah takes the throne', y: '1925', lat: 35.68, lon: 51.42, k: 'event', vn: 'Reza Shah Pahlavi', d: 'The army officer founded the Pahlavi dynasty and built the Trans-Iranian Railway linking the Caspian Sea with the Persian Gulf.' },
        { n: 'The name "Iran"', y: '1935', lat: 35.68, lon: 51.42, approx: true, k: 'event', vn: 'Reza Shah Pahlavi', d: 'The government asked the world to call the country Iran – the name its people still use – instead of "Persia".' },
        { n: 'Tehran Conference', y: 'Nov 1943', lat: 35.69, lon: 51.41, k: 'event', d: 'The three Allied leaders met for the first time in Tehran to plan opening a second front in Europe.' },
        { n: 'Oil nationalization', y: '1951 – 1953', lat: 35.69, lon: 51.42, k: 'event', vn: 'Prime Minister Mohammad Mosaddegh', vs: 'Britain, USA', d: 'Mosaddegh nationalized the British oil company; in 1953 he was overthrown in a coup backed by Britain and the US.' },
        { n: 'Azadi Tower', y: '1971', lat: 35.700, lon: 51.338, k: 'event', vn: 'Mohammad Reza Shah', d: 'A white gateway tower built for the 2,500th anniversary of the Persian Empire, it became a symbol of Tehran.' }
      ]
    },
    {
      id: 'islamic_republic', t: 'The Islamic Republic of Iran', y: '1979 – present',
      d: 'The 1979 revolution founded the Islamic Republic; Iran went through 8 years of war with Iraq, sanctions over its nuclear program and conflicts with Israel.',
      ev: [
        { n: 'Islamic Revolution', y: 'Feb 1979', lat: 35.69, lon: 51.42, k: 'event', vn: 'Ayatollah Ruhollah Khomeini', vs: 'Mohammad Reza Shah', d: 'After months of protests, the Shah left the country; Khomeini returned and Iran became an Islamic republic.' },
        { n: 'Hostage crisis', y: '1979 – 1981', lat: 35.708, lon: 51.425, approx: true, k: 'event', vs: 'USA', d: 'Students seized the US Embassy and held 52 Americans hostage for 444 days; the two countries have had no relations since.' },
        { n: 'Liberation of Khorramshahr', y: 'May 24, 1982', lat: 30.44, lon: 48.17, k: 'battle', vn: 'Iranian army and Revolutionary Guards', vs: 'Iraqi army', d: 'A key battle of the Iran–Iraq War (1980 – 1988), a war that killed hundreds of thousands of people.' },
        { n: 'Bam earthquake', y: 'Dec 26, 2003', lat: 29.10, lon: 58.36, k: 'event', d: 'The earthquake destroyed the city of Bam and Arg-e Bam, the largest adobe citadel in the world; about 26,000 people died.' },
        { n: 'Omid satellite', y: '2009', lat: 35.23, lon: 53.92, approx: true, k: 'event', d: 'Iran launched its first satellite on its own rocket from a launch site in Semnan province.' },
        { n: 'JCPOA nuclear deal', y: 'Jul 2015', lat: 48.21, lon: 16.37, k: 'event', vn: 'Foreign Minister Mohammad Javad Zarif', vs: 'P5+1 group', d: 'Signed in Vienna: Iran limited its nuclear program in return for lifting sanctions; in 2018 the US withdrew from the deal.' },
        { n: 'Protests after the death of Mahsa Amini', y: '2022', lat: 35.69, lon: 51.42, approx: true, k: 'event', d: 'A 22-year-old woman died while held by the morality police, sparking a great wave of protests across Iran with the slogan "Woman, Life, Freedom".' },
        { n: 'President Raisi killed in crash', y: 'May 19, 2024', lat: 38.80, lon: 46.75, approx: true, k: 'event', vn: 'President Ebrahim Raisi', d: 'The helicopter carrying the President and the Foreign Minister crashed in fog in the mountains of East Azerbaijan province.' },
        { n: 'The 12-Day War', y: 'Jun 13 – 24, 2025', lat: 34.885, lon: 50.996, approx: true, k: 'battle', vn: 'Supreme Leader Ali Khamenei', vs: 'Israel, USA', d: 'Israel struck nuclear and military sites and Iran fired missiles in response; the US bombed Fordow before a ceasefire.' }
      ]
    }
  ]
};
