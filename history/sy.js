// Syria history for the Geo-Flight history layer (English text).
export default {
  iso: 'sy', name: 'Syria', flag: '🇸🇾',
  eras: [
    {
      id: 'co-dai', t: 'The Oldest Cities', y: '~3000 – 333 BCE',
      d: 'Syria has Damascus and Aleppo, two of the longest continuously inhabited cities in the world; it was here that the first alphabet appeared.',
      ev: [
        { n: 'Kingdom of Ebla', y: '~2400 BCE', lat: 35.798, lon: 36.798, k: 'event', vn: 'Kings of Ebla', d: 'Archaeologists found nearly 20,000 clay tablets with writing – a royal library more than 4,000 years old.' },
        { n: 'City of Mari on the Euphrates', y: '~1800 BCE', lat: 34.55, lon: 40.89, k: 'event', vn: 'King Zimri-Lim', d: 'Mari\'s palace had nearly 300 rooms; the king\'s letters tell of diplomacy across Mesopotamia.' },
        { n: 'Ugarit alphabet', y: '~1400 BCE', lat: 35.602, lon: 35.782, k: 'event', vn: 'People of the city of Ugarit', d: 'In the port of Ugarit, people used only about 30 signs – one of the earliest alphabets in the world.' },
        { n: 'Battle of Kadesh', y: '1274 BCE', lat: 34.557, lon: 36.519, k: 'battle', vn: 'Muwatalli II (Hittite)', vs: 'Pharaoh Ramesses II (Egypt)', d: 'The largest chariot battle of ancient times, beside the Orontes River; afterward the two sides signed the oldest surviving peace treaty.' },
        { n: 'Battle of Qarqar', y: '853 BCE', lat: 35.70, lon: 36.35, approx: true, k: 'battle', vn: 'Hadadezer (king of Damascus) and allies', vs: 'Shalmaneser III (Assyria)', d: 'An alliance led by the king of Aram-Damascus held off the mighty Assyrian army, at least for a time.' },
        { n: 'Assyria conquers Damascus', y: '732 BCE', lat: 33.511, lon: 36.306, k: 'battle', vn: 'King Rezin', vs: 'Tiglath-Pileser III (Assyria)', d: 'The kingdom of Aram-Damascus was wiped out; its Aramaic language still became the common language of the whole Middle East.' }
      ]
    },
    {
      id: 'hy-la', t: 'Greek and Roman Times', y: '333 BCE – 636 CE',
      d: 'After Alexander the Great, Syria belonged to the Seleucids and then became a rich Roman province, with splendid cities such as Palmyra, Apamea and Bosra.',
      ev: [
        { n: 'City of Apamea', y: '~300 BCE', lat: 35.42, lon: 36.40, k: 'event', vn: 'King Seleucus I', d: 'Seleucus founded Apamea, which kept hundreds of war elephants; the city\'s colonnaded avenue was nearly 2 km long.' },
        { n: 'Syria becomes a Roman province', y: '64 BCE', lat: 33.511, lon: 36.306, approx: true, k: 'event', vn: 'Seleucid dynasty', vs: 'Pompey (Rome)', d: 'General Pompey abolished the weakened Seleucid dynasty and made Syria a Roman province.' },
        { n: 'St. Paul in Damascus', y: '~34 CE', lat: 33.509, lon: 36.316, approx: true, k: 'legend', vn: 'Paul (Saul)', d: 'According to the Bible, Saul became a Christian on the road to Damascus; the "Straight" street in the old city still exists today.' },
        { n: 'Roman Theater of Bosra', y: '~150 CE', lat: 32.518, lon: 36.481, k: 'event', vn: 'People of the province of Arabia', d: 'The black basalt theater held about 15,000 people and has been kept nearly intact because it was once built into a surrounding fortress.' },
        { n: 'Queen Zenobia of Palmyra', y: '270 – 272', lat: 34.551, lon: 38.268, k: 'battle', vn: 'Queen Zenobia', vs: 'Emperor Aurelian (Rome)', d: 'Zenobia seized Egypt and many Roman provinces in the East, but was finally captured by Aurelian and taken to Rome.' },
        { n: 'Church of St. Simeon', y: '~480', lat: 36.334, lon: 36.844, k: 'event', vn: 'St. Simeon Stylites', d: 'The great church was built around the pillar on top of which a hermit sat for 37 years.' }
      ]
    },
    {
      id: 'umayyad', t: 'Damascus – Capital of the Umayyads', y: '636 – 750',
      d: 'Muslim Arabs took Syria from the Byzantines; Damascus became the capital of the Umayyad Empire, stretching from Spain to Central Asia.',
      ev: [
        { n: 'Battle of Yarmuk', y: '636', lat: 32.81, lon: 35.95, approx: true, k: 'battle', vn: 'Khalid ibn al-Walid', vs: 'Byzantine Empire', d: 'Beside the Yarmuk River, the Arab army defeated a larger Byzantine army, ending nearly 700 years of Roman rule in Syria.' },
        { n: 'Muawiya founds the Umayyad dynasty', y: '661', lat: 33.511, lon: 36.306, k: 'event', vn: 'Muawiya I', d: 'Muawiya, the governor of Syria, became Caliph and chose Damascus as the capital of the entire Muslim world.' },
        { n: 'Great Umayyad Mosque', y: '705 – 715', lat: 33.5115, lon: 36.3066, k: 'event', vn: 'Caliph al-Walid I', d: 'One of the oldest and largest mosques in the world, with gold mosaics depicting rivers, trees and houses.' },
        { n: 'Qasr al-Hayr al-Sharqi palace', y: '~728', lat: 35.07, lon: 39.07, approx: true, k: 'event', vn: 'Caliph Hisham', d: 'In the middle of the desert, the Caliphs built palaces and rest stops for hunting and for meeting nomadic tribes.' },
        { n: 'Fall of the Umayyads', y: '750', lat: 33.511, lon: 36.306, approx: true, k: 'battle', vn: 'Caliph Marwan II', vs: 'The Abbasids', d: 'The Abbasids won and moved the capital to Iraq; an Umayyad prince fled to Spain and founded a new dynasty.' }
      ]
    },
    {
      id: 'trung-co', t: 'Crusades, Saladin and the Mamluks', y: '750 – 1516',
      d: 'Syria was a battleground among Muslim dynasties, Crusaders and Mongols; Aleppo and Damascus remained major centers of trade and learning.',
      ev: [
        { n: 'Court of Sayf al-Dawla in Aleppo', y: '944 – 967', lat: 36.199, lon: 37.163, k: 'event', vn: 'Sayf al-Dawla, the poet al-Mutanabbi', d: 'The Hamdanid emir fought the Byzantines and invited famous poets and philosophers to Aleppo.' },
        { n: 'Krak des Chevaliers castle', y: '1142 – 1271', lat: 34.757, lon: 36.295, k: 'battle', vn: 'Sultan Baybars (Mamluk)', vs: 'Knights Hospitaller', d: 'The most famous Crusader castle withstood dozens of sieges, until Baybars captured it in 1271.' },
        { n: 'Nur al-Din unites Syria', y: '1154', lat: 33.511, lon: 36.306, k: 'event', vn: 'Nur al-Din Zengi', d: 'Nur al-Din entered Damascus, uniting Muslim Syria; he built hospitals and schools that still stand today.' },
        { n: 'Saladin dies in Damascus', y: '1193', lat: 33.5118, lon: 36.3063, k: 'event', vn: 'Saladin', d: 'The famous Sultan, who retook Jerusalem in 1187, was buried beside the Great Umayyad Mosque.' },
        { n: 'Mongols take Aleppo', y: '1260', lat: 36.199, lon: 37.163, k: 'battle', vn: 'Ayyubid garrison', vs: 'Hulagu (Mongol)', d: 'The Mongols destroyed Aleppo and took Damascus, but the same year were beaten by the Mamluks at Ain Jalut and withdrew from Syria.' },
        { n: 'Timur sacks Damascus', y: '1400 – 1401', lat: 33.511, lon: 36.306, k: 'battle', vn: 'People of Damascus', vs: 'Timur', d: 'Timur took Aleppo and then Damascus and carried many skilled craftsmen off to Samarkand.' },
        { n: 'Battle of Marj Dabiq', y: '1516', lat: 36.53, lon: 37.27, approx: true, k: 'battle', vn: 'Sultan Qansuh al-Ghawri (Mamluk)', vs: 'Sultan Selim I (Ottoman)', d: 'Ottoman cannons and muskets beat the Mamluk cavalry north of Aleppo; Syria belonged to the Ottomans for 400 years.' }
      ]
    },
    {
      id: 'ottoman', t: 'The Ottoman Era', y: '1516 – 1918',
      d: 'Damascus was the starting point of the great pilgrim caravan to Mecca, while Aleppo was a transit market for silk and spices between Asia and Europe.',
      ev: [
        { n: 'Covered souks of Aleppo', y: '~1550', lat: 36.199, lon: 37.157, approx: true, k: 'event', vn: 'Merchants of Aleppo', d: 'A maze of covered markets about 13 km long, one of the largest covered markets in the world.' },
        { n: 'Azm Palace', y: '1750', lat: 33.5107, lon: 36.3074, k: 'event', vn: 'Governor Asad Pasha al-Azm', d: 'The palace has a courtyard with orange trees, fountains and black-and-white striped stone walls in the heart of Damascus.' },
        { n: 'Hejaz Railway', y: '1908', lat: 33.5114, lon: 36.2925, k: 'event', vn: 'Sultan Abdul Hamid II', d: 'The railway from the Hejaz station in Damascus to Medina cut the pilgrimage from 40 days to a few days.' },
        { n: 'Arab forces enter Damascus', y: '1918', lat: 33.511, lon: 36.306, k: 'event', vn: 'Prince Faisal', vs: 'Ottoman army', d: 'At the end of World War I, forces of the Arab Revolt and British troops entered Damascus; the Ottomans withdrew from Syria.' }
      ]
    },
    {
      id: 'uy-tri', t: 'The French Mandate', y: '1920 – 1946',
      d: 'Faisal\'s Kingdom of Syria lasted only a few months; France took the mandate, and the Syrians struggled for 26 years to win independence.',
      ev: [
        { n: 'Arab Kingdom of Syria', y: 'Mar 1920', lat: 33.511, lon: 36.306, k: 'event', vn: 'King Faisal I', d: 'The Syrian Congress declared independence and proclaimed Faisal king, but the European powers did not recognize it.' },
        { n: 'Battle of Maysalun', y: 'Jul 24, 1920', lat: 33.60, lon: 36.07, approx: true, k: 'battle', vn: 'Yusuf al-Azma', vs: 'General Mariano Goybet (France)', d: 'War Minister Yusuf al-Azma died blocking the French on the mountain pass; the French entered Damascus the next day.' },
        { n: 'Great Syrian Revolt', y: '1925 – 1927', lat: 32.71, lon: 36.57, k: 'battle', vn: 'Sultan al-Atrash', vs: 'French army', d: 'Starting in the Druze mountains around Suwayda, the revolt spread to Damascus and held out for nearly two years.' },
        { n: 'Sanjak of Alexandretta goes to Turkey', y: '1939', lat: 36.20, lon: 36.16, k: 'event', vn: 'People of Syria', vs: 'Turkey, France', d: 'France gave the Alexandretta region (now Hatay province) to Turkey; many Syrians still regard it as lost land.' },
        { n: 'Evacuation Day – independence', y: 'Apr 17, 1946', lat: 33.511, lon: 36.306, k: 'event', vn: 'President Shukri al-Quwatli', d: 'The last French soldier left Syria; April 17 became National Day.' }
      ]
    },
    {
      id: 'cong-hoa', t: 'The Republic and the Assad Government', y: '1946 – 2011',
      d: 'After many coups, the Baath Party took power in 1963; from 1970, the Assad family led Syria for more than 50 years.',
      ev: [
        { n: 'United Arab Republic', y: '1958 – 1961', lat: 33.511, lon: 36.306, approx: true, k: 'event', vn: 'Shukri al-Quwatli', vs: 'Gamal Abdel Nasser (Egypt)', d: 'Syria and Egypt merged into one country, but only three years later Syria split away.' },
        { n: 'Loss of the Golan Heights', y: '1967', lat: 33.125, lon: 35.824, k: 'battle', vn: 'Syrian army', vs: 'Israeli army', d: 'In the Six-Day War, Israel took the Golan Heights; the town of Quneitra has been abandoned ever since.' },
        { n: 'Hafez al-Assad takes power', y: '1970', lat: 33.511, lon: 36.306, k: 'event', vn: 'Hafez al-Assad', d: 'Defense Minister Hafez al-Assad seized power within the Baath Party and was president until 2000.' },
        { n: 'October War', y: '1973', lat: 33.10, lon: 35.80, approx: true, k: 'battle', vn: 'Hafez al-Assad', vs: 'Israel', d: 'Syria and Egypt attacked together to regain lost land; great tank battles took place on the Golan.' },
        { n: 'Tabqa Dam and Lake Assad', y: '1973', lat: 35.86, lon: 38.57, k: 'event', vn: 'Syrian and Soviet engineers', d: 'The huge dam across the Euphrates created a reservoir 80 km long, supplying electricity and irrigation water to the north.' },
        { n: 'Hama events', y: '1982', lat: 35.13, lon: 36.75, k: 'battle', vn: 'Government of Hafez al-Assad', vs: 'Muslim Brotherhood', d: 'The army crushed an uprising in the city of Hama; many thousands died, and the exact number is still disputed.' },
        { n: 'Bashar al-Assad succeeds', y: '2000', lat: 33.511, lon: 36.306, k: 'event', vn: 'Bashar al-Assad', d: 'After his father\'s death, the eye doctor Bashar al-Assad became president at age 34.' },
        { n: 'Withdrawal from Lebanon', y: '2005', lat: 33.89, lon: 35.50, approx: true, k: 'event', vn: 'Syrian army', d: 'After the assassination of former Lebanese Prime Minister Rafik Hariri and large protests, Syria withdrew its troops after 29 years.' }
      ]
    },
    {
      id: 'noi-chien', t: 'Civil War and Transition', y: '2011 – present',
      d: 'The protests of 2011 turned into a civil war with many factions and foreign countries taking part; millions of people had to leave their homes. In December 2024 the Assad government collapsed.',
      ev: [
        { n: 'Protests in Daraa', y: 'Mar 2011', lat: 32.62, lon: 36.10, k: 'event', vn: 'People of Daraa', vs: 'Government of Bashar al-Assad', d: 'After a group of teenagers were arrested for writing slogans on a wall, protests broke out and spread across the country.' },
        { n: 'Battle of Aleppo', y: '2012 – 2016', lat: 36.199, lon: 37.163, k: 'battle', vn: 'Syrian government army', vs: 'Armed opposition groups', d: 'Syria\'s largest city was divided in two for four years; the old market and the minaret of the Aleppo Umayyad Mosque were destroyed.' },
        { n: 'Ghouta chemical attack', y: 'Aug 2013', lat: 33.52, lon: 36.37, approx: true, k: 'event', vn: 'People of Ghouta', d: 'The United Nations confirmed that sarin gas was used in the suburbs of Damascus; Syria then agreed to destroy its chemical weapons stockpile.' },
        { n: 'IS takes Raqqa and Palmyra', y: '2014 – 2015', lat: 34.551, lon: 38.268, k: 'battle', vn: 'Syrian army and other forces', vs: 'Islamic State (IS)', d: 'IS seized large areas in the east and destroyed ancient temples at Palmyra, a UNESCO World Heritage Site.' },
        { n: 'Russian military intervention', y: '2015', lat: 35.40, lon: 35.95, approx: true, k: 'event', vn: 'Government of Bashar al-Assad', vs: 'Armed opposition groups', d: 'Russia sent warplanes to the Hmeimim base to support the government, helping government forces retake many areas.' },
        { n: 'Liberation of Raqqa', y: '2017', lat: 35.95, lon: 39.01, k: 'battle', vn: 'Syrian Democratic Forces (SDF)', vs: 'Islamic State (IS)', d: 'Kurdish-led forces, backed by the US, retook IS\'s "capital" after four months of fighting.' },
        { n: '2023 earthquake', y: 'Feb 6, 2023', lat: 36.199, lon: 37.163, approx: true, k: 'event', vn: 'People of northern Syria', d: 'A huge earthquake from Turkey killed thousands of people in Aleppo, Idlib and Latakia in the middle of winter.' },
        { n: 'Fall of the Assad government', y: 'Dec 8, 2024', lat: 33.511, lon: 36.306, k: 'event', vn: 'Ahmed al-Sharaa (HTS) and opposition groups', vs: 'Government of Bashar al-Assad', d: 'In just 11 days, opposition forces took Aleppo, Hama, Homs and then Damascus; Bashar al-Assad left for Russia.' },
        { n: 'Transitional government', y: '2025', lat: 33.511, lon: 36.306, approx: true, k: 'event', vn: 'Interim President Ahmed al-Sharaa', d: 'The new government issued a temporary constitution; many countries eased sanctions, but violence between communities still occurred.' },
        { n: 'Speech at the United Nations', y: 'Sep 2025', lat: 40.749, lon: -73.968, k: 'event', vn: 'Ahmed al-Sharaa', d: 'For the first time in nearly 60 years, a Syrian president addressed the UN General Assembly in New York.' }
      ]
    }
  ]
};
