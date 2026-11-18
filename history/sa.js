// Saudi Arabia history for the Geo-Flight history layer (English text).
export default {
  iso: 'sa', name: 'Saudi Arabia', flag: '🇸🇦',
  eras: [
    {
      id: 'co-dai', t: 'Ancient Arabian Peninsula', y: '~3000 BCE – 570 CE',
      d: 'Oases in the desert grew into kingdoms trading in frankincense, myrrh and spices; camel caravans linked Yemen to the Mediterranean.',
      ev: [
        { n: 'Tarut Island and Dilmun', y: '~3000 BCE', lat: 26.57, lon: 50.07, k: 'event', vn: 'Gulf settlers', d: 'Tarut Island on the Persian Gulf coast was one of the earliest inhabited places on the peninsula, trading with Mesopotamia.' },
        { n: 'Jubbah rock art', y: '~7000 – 1000 BCE', lat: 28.02, lon: 40.93, approx: true, k: 'event', vn: 'Prehistoric people of Hail', d: 'On cliffs near Hail, people long ago carved camels, antelopes and hunters from a time when the desert was greener.' },
        { n: 'King Nabonidus at Tayma', y: '~552 – 543 BCE', lat: 27.63, lon: 38.55, k: 'event', vn: 'Residents of Tayma oasis', vs: 'Nabonidus (king of Babylon)', d: 'The king of Babylon left his capital to live for ten years in the Tayma oasis, to control the incense trade route.' },
        { n: 'Kingdoms of Dedan and Lihyan', y: '~600 – 100 BCE', lat: 26.65, lon: 37.92, approx: true, k: 'event', vn: 'King of Lihyan', d: 'In the AlUla valley, the Lihyanites carved tombs into red cliffs and set up toll stations for caravans.' },
        { n: 'Nabataean city of Hegra', y: '~1 BCE – 106 CE', lat: 26.79, lon: 37.95, k: 'event', vn: 'King Aretas IV (Nabataea)', d: 'More than a hundred tombs were carved into the rock, like those at Petra; it was the first UNESCO World Heritage Site in Saudi Arabia.' },
        { n: 'Qaryat al-Faw – capital of Kindah', y: '~300 BCE – 300 CE', lat: 19.78, lon: 45.15, approx: true, k: 'event', vn: 'Kingdom of Kindah', d: 'At the edge of the Rub al-Khali desert, a city with markets, temples and wall paintings was a major stop for camel caravans.' },
        { n: 'Ukaz fair', y: '~500 CE', lat: 21.55, lon: 40.65, approx: true, k: 'event', vn: 'Arab tribes', d: 'Each year the tribes gathered near Taif to trade and hold poetry contests; the best poem was hung up for everyone to read.' }
      ]
    },
    {
      id: 'hoi-giao', t: 'The Birth of Islam', y: '570 – 661',
      d: 'The Prophet Muhammad preached Islam in Mecca and then Medina; within a few decades the Muslim community united the Arabian Peninsula and expanded beyond it.',
      route: { t: 'The Hijra: Muhammad leaves Mecca for Medina (622)', pts: [[21.4225, 39.8262], [21.377, 39.85], [22.3, 39.2], [23.3, 38.9], [24.1, 39.2], [24.439, 39.617], [24.4672, 39.6111]] },
      ev: [
        { n: 'Muhammad is born in Mecca', y: '~570', lat: 21.4225, lon: 39.8262, k: 'event', vn: 'Muhammad', d: 'Muhammad was born into the Quraysh tribe in Mecca, was orphaned early and grew up working as a trader with camel caravans.' },
        { n: 'First revelation in the Cave of Hira', y: '610', lat: 21.4576, lon: 39.8593, k: 'event', vn: 'Muhammad', d: 'According to Islamic tradition, while meditating in the Cave of Hira, Muhammad received the first verses of the Quran.' },
        { n: 'The Hijra to Medina', y: '622', lat: 24.4672, lon: 39.6111, k: 'event', vn: 'Muhammad, Abu Bakr', d: 'Muhammad and his followers left Mecca for Yathrib (Medina); this year was chosen as the first year of the Islamic calendar.' },
        { n: 'Battle of Badr', y: '624', lat: 23.78, lon: 38.79, k: 'battle', vn: 'Muhammad', vs: 'Quraysh army (Mecca)', d: 'About 300 Muslims defeated a Meccan army three times their size near the wells of Badr.' },
        { n: 'Battle of Uhud', y: '625', lat: 24.50, lon: 39.61, k: 'battle', vn: 'Muhammad, Hamza', vs: 'Abu Sufyan (Quraysh)', d: 'The Meccan army counterattacked at the foot of Mount Uhud, north of Medina; the Muslims suffered heavy losses.' },
        { n: 'Battle of the Trench', y: '627', lat: 24.48, lon: 39.60, approx: true, k: 'battle', vn: 'Muhammad, Salman the Persian', vs: 'Alliance of tribes', d: 'On Salman\'s advice, the people of Medina dug a trench to block the way; the allied cavalry could not cross and had to withdraw.' },
        { n: 'Treaty of Hudaybiyyah', y: '628', lat: 21.44, lon: 39.63, approx: true, k: 'event', vn: 'Muhammad', vs: 'Quraysh (Mecca)', d: 'The two sides signed a ten-year peace treaty at the edge of Mecca, allowing Muslims to return on pilgrimage the next year.' },
        { n: 'Return to Mecca', y: '630', lat: 21.4225, lon: 39.8262, k: 'event', vn: 'Muhammad', vs: 'Quraysh (Mecca)', d: 'Muhammad entered Mecca almost without fighting, cleared the idols from around the Kaaba and pardoned most of his former enemies.' },
        { n: 'Muhammad dies in Medina', y: '632', lat: 24.4672, lon: 39.6111, k: 'event', vn: 'Abu Bakr', d: 'Muhammad died in Medina; Abu Bakr was chosen as the first Caliph (successor).' },
        { n: 'Battle of Yamama', y: '632 – 633', lat: 24.9, lon: 46.4, approx: true, k: 'battle', vn: 'Khalid ibn al-Walid', vs: 'Musaylima', d: 'Caliph Abu Bakr\'s army defeated Musaylima in the Najd region, bringing the whole peninsula into one united state.' }
      ]
    },
    {
      id: 'caliph', t: 'Holy Land under Islamic Dynasties', y: '661 – 1517',
      d: 'The capital moved to Damascus, then Baghdad and Cairo, but Mecca and Medina remained the two holy cities, welcoming pilgrims from all over the world.',
      ev: [
        { n: 'Siege of Mecca', y: '692', lat: 21.4225, lon: 39.8262, k: 'battle', vn: 'Abdullah ibn al-Zubayr', vs: 'Al-Hajjaj (Umayyad)', d: 'Ibn al-Zubayr declared himself Caliph in Mecca; Umayyad troops from Damascus besieged the city for months and retook the Hejaz.' },
        { n: 'Darb Zubaydah pilgrim road', y: '~800', lat: 27.7, lon: 43.5, approx: true, k: 'event', vn: 'Queen Zubaydah', d: 'The wife of Caliph Harun al-Rashid had wells dug and rest stops built along the 1,400 km road from Iraq to Mecca.' },
        { n: 'The Qarmatians take the Black Stone', y: '930', lat: 21.4225, lon: 39.8262, k: 'battle', vn: 'People of Mecca', vs: 'Abu Tahir (Qarmatian)', d: 'A group from the Bahrain region attacked Mecca and carried off the Black Stone; the stone was returned more than 20 years later.' },
        { n: 'The Sharifs rule Mecca', y: '~967', lat: 21.4225, lon: 39.8262, approx: true, k: 'event', vn: 'Sharifs of the Hashim line', d: 'Descendants of the Prophet (the Sharifs) governed Mecca for nearly 1,000 years, under many different dynasties.' },
        { n: 'Ibn Battuta\'s pilgrimage', y: '1326', lat: 21.4225, lon: 39.8262, k: 'event', vn: 'Ibn Battuta', d: 'The Moroccan traveler reached Mecca for the first time and stayed for several years; he wrote in detail about the pilgrim caravans and the markets of the Hejaz.' },
        { n: 'The port of Jeddah prospers', y: '~1425', lat: 21.485, lon: 39.19, approx: true, k: 'event', vn: 'Mamluk Sultan Barsbay', d: 'Jeddah became a major spice port on the Red Sea, where ships from India called and pilgrims came ashore.' }
      ]
    },
    {
      id: 'ottoman', t: 'The Ottoman Era and the Hejaz', y: '1517 – 1744',
      d: 'The Ottoman Empire took on the protection of the two holy cities; the Najd desert in the middle of the peninsula was still governed by its own tribes and oases.',
      ev: [
        { n: 'Ottomans take protection of the Hejaz', y: '1517', lat: 21.4225, lon: 39.8262, approx: true, k: 'event', vn: 'Sharif Barakat', vs: 'Sultan Selim I (Ottoman)', d: 'After the Ottomans conquered Egypt, the Sharif of Mecca sent the keys of the city to Sultan Selim I, recognizing his supremacy.' },
        { n: 'Portuguese attack on Jeddah', y: '1517', lat: 21.485, lon: 39.19, k: 'battle', vn: 'Defenders of Jeddah', vs: 'Lopo Soares (Portugal)', d: 'The Portuguese fleet wanted to control the Red Sea but was driven back by Jeddah\'s walls and cannons.' },
        { n: 'Great flood and rebuilding of the Kaaba', y: '1629 – 1630', lat: 21.4225, lon: 39.8262, k: 'event', vn: 'Sultan Murad IV', d: 'A flood brought down many walls of the Kaaba; it was rebuilt almost entirely in its old shape.' },
        { n: 'Emirate of Diriyah', y: '1727', lat: 24.734, lon: 46.575, k: 'event', vn: 'Muhammad bin Saud', d: 'Muhammad bin Saud became emir of the Diriyah oasis beside the Wadi Hanifa, where his ancestors had settled in the 15th century.' }
      ]
    },
    {
      id: 'saudi-1-2', t: 'The First and Second Saudi States', y: '1744 – 1891',
      d: 'In Diriyah, the House of Saud allied with the preacher Muhammad ibn Abd al-Wahhab and built a state that spread across the peninsula; it collapsed twice and was revived again.',
      ev: [
        { n: 'Diriyah Pact', y: '1744', lat: 24.734, lon: 46.575, k: 'event', vn: 'Muhammad bin Saud, Muhammad ibn Abd al-Wahhab', d: 'The emir and the preacher promised to support each other: one would handle politics, the other religion.' },
        { n: 'The Saudis enter Mecca', y: '1803', lat: 21.4225, lon: 39.8262, k: 'event', vn: 'Saud bin Abdulaziz', vs: 'Sharif Ghalib', d: 'Diriyah\'s army took Mecca and then Medina, bringing almost the whole peninsula into one state.' },
        { n: 'Siege of Diriyah', y: '1818', lat: 24.734, lon: 46.575, k: 'battle', vn: 'Abdullah bin Saud', vs: 'Ibrahim Pasha (Egyptian – Ottoman)', d: 'After a six-month siege, Diriyah fell and was destroyed; the first Saudi state came to an end.' },
        { n: 'Riyadh becomes the capital', y: '1824', lat: 24.631, lon: 46.716, k: 'event', vn: 'Turki bin Abdullah', d: 'Turki bin Abdullah founded the second Saudi state and chose the nearby Riyadh oasis as its capital.' },
        { n: 'Battle of Mulayda', y: '1891', lat: 26.25, lon: 43.85, approx: true, k: 'battle', vn: 'Abdul Rahman bin Faisal', vs: 'Muhammad bin Rashid (Hail)', d: 'The Rashid dynasty of Hail won a great victory; the Saud family had to go into exile in Kuwait.' }
      ]
    },
    {
      id: 'vuong-quoc', t: 'Abdulaziz Founds the Kingdom', y: '1902 – 1953',
      d: 'From Kuwait, the young Abdulaziz (Ibn Saud) won back Riyadh and then united most of the peninsula; in 1932 the country of Saudi Arabia was born and oil was found.',
      ev: [
        { n: 'Capture of the Masmak fortress', y: '1902', lat: 24.6312, lon: 46.7134, k: 'battle', vn: 'Abdulaziz bin Abdul Rahman', vs: 'Rashid garrison', d: 'With a few dozen men, Abdulaziz raided the Masmak fortress at dawn and won back Riyadh.' },
        { n: 'Battle of Rawdat Muhanna', y: '1906', lat: 26.1, lon: 43.6, approx: true, k: 'battle', vn: 'Abdulaziz', vs: 'Abdulaziz bin Rashid', d: 'His Rashid rival was killed in battle; Abdulaziz became master of the Qassim region in the center of the peninsula.' },
        { n: 'Arab Revolt', y: '1916', lat: 21.4225, lon: 39.8262, approx: true, k: 'event', vn: 'Sharif Hussein bin Ali', vs: 'Ottoman Empire', d: 'The Sharif of Mecca, backed by Britain, rose up against the Ottomans and declared himself king of the Hejaz.' },
        { n: 'Siege of Medina', y: '1916 – 1919', lat: 24.4672, lon: 39.6111, k: 'battle', vn: 'Sharif Hussein\'s forces', vs: 'Fakhri Pasha (Ottoman)', d: 'The Ottoman general held Medina for over two years, surrendering only after World War I had ended.' },
        { n: 'Entering Mecca and Jeddah', y: '1924 – 1925', lat: 21.485, lon: 39.19, k: 'battle', vn: 'Abdulaziz', vs: 'Kingdom of Hejaz (Hashemites)', d: 'Abdulaziz took Mecca, and after a year-long siege Jeddah surrendered; the Hashemites lost the Hejaz.' },
        { n: 'Battle of Sabilla', y: '1929', lat: 26.3, lon: 44.8, approx: true, k: 'battle', vn: 'Abdulaziz', vs: 'Rebel Ikhwan forces', d: 'Abdulaziz defeated the very Ikhwan army that had helped him, because they opposed the king\'s decisions.' },
        { n: 'Proclamation of the Kingdom of Saudi Arabia', y: 'Sep 23, 1932', lat: 24.631, lon: 46.716, approx: true, k: 'event', vn: 'King Abdulaziz', d: 'The Hejaz and Najd were united as the Kingdom of Saudi Arabia; September 23 became National Day.' },
        { n: 'Dammam Well No. 7', y: '1938', lat: 26.30, lon: 50.13, k: 'event', vn: 'Engineer Max Steineke', d: 'After many failed drillings, Well No. 7 at Dhahran gushed oil, starting what became the richest oil industry in the world.' },
        { n: 'Meeting President Roosevelt', y: '1945', lat: 30.35, lon: 32.37, k: 'event', vn: 'King Abdulaziz', vs: 'Franklin D. Roosevelt (USA)', d: 'The two leaders met aboard a US warship on the Great Bitter Lake (Suez Canal), beginning the close Saudi – US relationship.' }
      ]
    },
    {
      id: 'dau-mo', t: 'The Oil Age', y: '1953 – 2015',
      d: 'Oil money turned desert villages into modern cities; Saudi Arabia became the largest oil exporter and gained a strong voice in the Muslim world.',
      ev: [
        { n: 'Founding of OPEC', y: '1960', lat: 33.31, lon: 44.36, k: 'event', vn: 'Abdullah Tariki', d: 'Saudi Arabia, together with Iran, Iraq, Kuwait and Venezuela, founded the Organization of the Petroleum Exporting Countries in Baghdad.' },
        { n: 'Oil embargo', y: '1973', lat: 24.631, lon: 46.716, approx: true, k: 'event', vn: 'King Faisal', d: 'During the Arab – Israeli war, Arab countries stopped selling oil to the US and a few other countries; world oil prices rose fourfold.' },
        { n: 'King Faisal assassinated', y: '1975', lat: 24.631, lon: 46.716, k: 'event', vn: 'King Faisal', d: 'The king was shot dead by a nephew during a reception in Riyadh; his brother Khalid took the throne.' },
        { n: 'Seizure of the Grand Mosque in Mecca', y: '1979', lat: 21.4225, lon: 39.8262, k: 'battle', vn: 'Saudi security forces', vs: 'Armed group of Juhayman al-Otaybi', d: 'An armed group held the Grand Mosque for two weeks before security forces retook it.' },
        { n: 'King Fahd Causeway', y: '1986', lat: 26.18, lon: 50.33, k: 'event', vn: 'King Fahd', d: 'A 25 km chain of bridges and embankments linked Saudi Arabia with the island nation of Bahrain.' },
        { n: 'Battle of Khafji', y: '1991', lat: 28.42, lon: 48.49, k: 'battle', vn: 'Saudi and Qatari forces', vs: 'Iraqi army', d: 'In the Gulf War, Iraqi troops from Kuwait flooded into the town of Khafji and were pushed back by coalition forces after two days.' },
        { n: 'KAUST university', y: '2009', lat: 22.31, lon: 39.10, k: 'event', vn: 'King Abdullah', d: 'This science university on the Red Sea coast was the first place in Saudi Arabia where men and women studied in the same classes.' },
        { n: 'Mina stampede disaster', y: '2015', lat: 21.413, lon: 39.893, k: 'event', d: 'During the Hajj pilgrimage, a crush of people in the Mina valley killed more than 2,000, according to various international sources.' }
      ]
    },
    {
      id: 'tam-nhin-2030', t: 'Vision 2030', y: '2015 – present',
      d: 'Under King Salman and Crown Prince Mohammed bin Salman, Saudi Arabia opened up to tourism, entertainment and sports to depend less on oil, along with much international controversy.',
      ev: [
        { n: 'Military intervention in Yemen', y: '2015', lat: 15.35, lon: 44.21, approx: true, k: 'battle', vn: 'Saudi-led coalition', vs: 'Houthi forces', d: 'The coalition intervened in the Yemeni civil war; the long conflict caused a major humanitarian crisis, according to the United Nations.' },
        { n: 'Vision 2030 plan', y: '2016', lat: 24.631, lon: 46.716, approx: true, k: 'event', vn: 'Crown Prince Mohammed bin Salman', d: 'An economic reform plan: opening cinemas, welcoming tourists and building new cities such as NEOM.' },
        { n: 'Women allowed to drive', y: '2018', lat: 21.54, lon: 39.17, approx: true, k: 'event', vn: 'Women of Saudi Arabia', d: 'Saudi Arabia lifted its ban on women driving, the last country in the world to still have such a ban.' },
        { n: 'Journalist Khashoggi case', y: '2018', lat: 41.079, lon: 29.012, approx: true, k: 'event', vn: 'Government of Saudi Arabia', d: 'Journalist Jamal Khashoggi was killed inside the Saudi consulate in Istanbul; the case drew strong international criticism.' },
        { n: 'Attack on the Abqaiq oil plant', y: '2019', lat: 25.94, lon: 49.68, k: 'event', vn: 'Saudi Aramco', d: 'Drones and missiles struck the world\'s largest oil processing plant, cutting Saudi oil output by half for a few days.' },
        { n: 'AlUla opens to visitors', y: '2019', lat: 26.62, lon: 37.92, approx: true, k: 'event', vn: 'Royal Commission for AlUla', d: 'For the first time Saudi Arabia issued tourist visas; visitors came to see Hegra and the Maraya mirrored concert hall in the desert.' },
        { n: 'Beating Argentina at the World Cup', y: '2022', lat: 25.42, lon: 51.49, k: 'event', vn: 'Saudi Arabia national team', vs: 'Argentina national team', d: 'Saudi Arabia came from behind to beat Messi\'s Argentina 2–1 in Qatar, one of the biggest upsets in World Cup history.' },
        { n: 'First female astronaut', y: '2023', lat: 24.631, lon: 46.716, approx: true, k: 'event', vn: 'Rayyanah Barnawi, Ali al-Qarni', d: 'Two Saudi astronauts flew to the International Space Station; Rayyanah Barnawi was the first Arab woman to fly into space.' },
        { n: 'Restoring relations with Iran', y: '2023', lat: 39.9, lon: 116.4, k: 'event', vn: 'Government of Saudi Arabia', vs: 'Government of Iran', d: 'With China as mediator in Beijing, the two big rivals of the Gulf resumed diplomatic relations after seven years.' },
        { n: 'Hosting Expo 2030 and World Cup 2034', y: '2023 – 2024', lat: 24.7, lon: 46.68, approx: true, k: 'event', vn: 'Saudi Arabia', d: 'Riyadh was chosen to host the 2030 World Expo, and in 2024 FIFA awarded Saudi Arabia the right to host the 2034 World Cup.' }
      ]
    }
  ]
};
