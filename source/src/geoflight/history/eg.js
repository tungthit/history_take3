// Egypt history for the Geo-Flight history layer (English text).
export default {
  iso: 'eg', name: 'Egypt', flag: '🇪🇬',
  eras: [
    {
      id: 'oldkingdom', t: 'Unification and the Old Kingdom', y: '~3100 – 2181 BCE',
      d: 'Upper and Lower Egypt are joined into one; the pharaohs of the Old Kingdom build gigantic pyramids beside the Nile.',
      ev: [
        { n: 'Narmer unifies Egypt', y: '~3100 BCE', lat: 25.098, lon: 32.779, k: 'event', vn: 'Narmer (Menes)', d: 'The Narmer Palette, found at Hierakonpolis, shows the king wearing both the crown of Upper Egypt and the crown of Lower Egypt.' },
        { n: 'Capital at Memphis', y: '~3100 BCE', lat: 29.845, lon: 31.251, k: 'event', vn: 'Narmer (Menes)', d: 'The first capital stood where the Nile valley meets the delta.' },
        { n: 'The myth of Osiris at Abydos', y: 'Myth', lat: 26.185, lon: 31.919, k: 'legend', vn: 'Osiris, Isis, Horus', vs: 'The god Set', d: "Set kills his brother Osiris; the goddess Isis puts her husband's body back together, and their son Horus avenges his father." },
        { n: "Djoser's Step Pyramid", y: '~2650 BCE', lat: 29.871, lon: 31.216, k: 'event', vn: 'Djoser, Imhotep', d: "The architect Imhotep stacks six stone \"steps\" on top of each other, the world's first large stone building." },
        { n: 'The Red Pyramid at Dahshur', y: '~2600 BCE', lat: 29.809, lon: 31.206, k: 'event', vn: 'Sneferu', d: 'The first successful smooth-sided pyramid, built after the nearby Bent Pyramid was started at the wrong angle.' },
        { n: 'The Great Pyramid of Giza', y: '~2560 BCE', lat: 29.979, lon: 31.134, k: 'event', vn: 'Khufu', d: 'About 2.3 million blocks of stone, 146 m high; the tallest human-made structure for nearly 4,000 years.' },
        { n: 'The Great Sphinx of Giza', y: '~2500 BCE', lat: 29.9753, lon: 31.1376, k: 'event', vn: 'Khafre', d: "A 73 m long statue with a lion's body and a human head, carved straight out of a natural block of limestone." }
      ]
    },
    {
      id: 'middle', t: 'The Middle Kingdom and the Hyksos', y: '~2055 – 1550 BCE',
      d: 'After a period of division, the kings of Thebes reunite the country; then the Hyksos from Asia take over the delta until Ahmose I drives them out.',
      ev: [
        { n: 'Mentuhotep II reunifies the country', y: '~2055 BCE', lat: 25.737, lon: 32.607, k: 'event', vn: 'Mentuhotep II', d: 'The king of Thebes ends the time of chaos and builds a mortuary temple at Deir el-Bahari.' },
        { n: 'Karnak Temple', y: '~2000 BCE', lat: 25.719, lon: 32.657, k: 'event', vn: 'The pharaohs of Thebes', d: 'The temple complex of the god Amun was added to for 2,000 years; its great hall has 134 giant stone columns.' },
        { n: 'Buhen Fortress', y: '~1860 BCE', lat: 21.92, lon: 31.28, k: 'event', vn: 'Senusret III', d: 'A mud-brick fortress guarding the border with Nubia; it now lies under Lake Nasser.' },
        { n: 'Lahun Pyramid – the Faiyum region', y: '~1880 BCE', lat: 29.233, lon: 30.971, k: 'event', vn: 'Senusret II', d: 'The Middle Kingdom kings turn the Faiyum oasis into rich farmland.' },
        { n: 'Avaris, capital of the Hyksos', y: '~1650 BCE', lat: 30.787, lon: 31.821, k: 'event', vs: 'The Hyksos kings', d: 'The Hyksos bring horses and war chariots, and rule northern Egypt for about 100 years.' },
        { n: 'Ahmose I drives out the Hyksos', y: '~1550 BCE', lat: 30.79, lon: 31.82, approx: true, k: 'battle', vn: 'Seqenenre Tao, Kamose, Ahmose I', vs: 'Khamudi (Hyksos)', d: 'Three generations of Theban kings fight; Ahmose I takes Avaris, unifies the country, and begins the New Kingdom.' }
      ]
    },
    {
      id: 'newkingdom', t: 'The New Kingdom – the age of empire', y: '~1550 – 1070 BCE',
      d: 'The most powerful age: pharaohs such as Thutmose III, Hatshepsut, Tutankhamun and Ramesses II rule from Nubia to Syria and are buried in the Valley of the Kings.',
      route: { t: "Ramesses II's march to Kadesh, 1274 BCE", pts: [[30.80, 31.83], [30.85, 32.32], [31.50, 34.47], [32.585, 35.185], [33.27, 35.20], [34.57, 36.52]] },
      ev: [
        { n: 'Temple of Queen Hatshepsut', y: '~1470 BCE', lat: 25.738, lon: 32.607, k: 'event', vn: 'Hatshepsut', d: 'A rare female pharaoh who wore a false beard at ceremonies; she sent a fleet of ships to the land of Punt to bring back incense trees.' },
        { n: 'Battle of Megiddo', y: '~1457 BCE', lat: 32.585, lon: 35.185, k: 'battle', vn: 'Thutmose III', vs: 'The king of Kadesh and the Canaanite alliance', d: 'Thutmose III boldly leads his army through a narrow pass and surprises and defeats the alliance; the first battle recorded in fairly good detail.' },
        { n: 'Luxor Temple', y: '~1390 BCE', lat: 25.6995, lon: 32.639, k: 'event', vn: 'Amenhotep III, Ramesses II', d: 'Linked to Karnak by an avenue almost 3 km long, lined on both sides with hundreds of sphinx statues.' },
        { n: 'The new capital Amarna', y: '~1346 BCE', lat: 27.645, lon: 30.896, k: 'event', vn: 'Akhenaten, Nefertiti', d: 'Akhenaten worships only the Sun god Aten and builds a new capital in the desert; after his death the city is abandoned.' },
        { n: 'Tomb of Tutankhamun', y: '~1323 BCE', lat: 25.740, lon: 32.601, k: 'event', vn: 'Tutankhamun', d: 'The young king died at about 19; in 1922 Howard Carter found his tomb almost intact, with its golden mask.' },
        { n: 'Battle of Kadesh', y: '1274 BCE', lat: 34.57, lon: 36.52, k: 'battle', vn: 'Ramesses II', vs: 'Muwatalli II (Hittite)', d: 'The largest chariot battle in history; Ramesses was almost surrounded, and both sides claimed victory.' },
        { n: 'Peace treaty with the Hittites', y: '~1259 BCE', lat: 30.80, lon: 31.83, k: 'event', vn: 'Ramesses II', vs: 'Hattusili III (Hittite)', d: 'The earliest peace treaty that survives; a copy hangs at the United Nations headquarters.' },
        { n: 'Abu Simbel Temple', y: '~1264 BCE', lat: 22.336, lon: 31.626, k: 'event', vn: 'Ramesses II', d: 'Four statues of Ramesses, each 20 m high; twice a year the sunlight shines deep inside to the innermost sanctuary.' },
        { n: 'Defeat of the "Sea Peoples"', y: '~1177 BCE', lat: 31.40, lon: 31.50, approx: true, k: 'battle', vn: 'Ramesses III', vs: 'The "Sea Peoples"', d: 'Ramesses III stops invaders who came by sea at the mouth of the Nile; scenes of the battle are carved at the temple of Medinet Habu.' }
      ]
    },
    {
      id: 'late', t: 'The Late Period and foreign rulers', y: '~1070 – 332 BCE',
      d: 'Egypt is divided and is ruled in turn by Nubian, Assyrian and Persian kings, with short recoveries under native kings in between.',
      ev: [
        { n: 'The Nubian pharaohs', y: '~728 BCE', lat: 18.535, lon: 31.828, k: 'event', vn: 'Piye', d: 'The king of Kush, from Napata (now in Sudan), marches north to unify Egypt and founds the 25th Dynasty.' },
        { n: 'Assyria sacks Thebes', y: '663 BCE', lat: 25.72, lon: 32.65, k: 'battle', vn: 'Tantamani', vs: 'Ashurbanipal (Assyria)', d: 'The wealthy city of Thebes is plundered, and the Nubian kings withdraw to the south.' },
        { n: 'The Saite Dynasty', y: '664 – 525 BCE', lat: 30.966, lon: 30.768, k: 'event', vn: 'Psamtik I', d: 'Egypt revives with its capital at Sais in the delta, hiring Greek mercenaries.' },
        { n: 'Canal from the Nile to the Red Sea', y: '~600 BCE', lat: 30.55, lon: 31.95, approx: true, k: 'event', vn: 'Necho II', d: 'Necho II has a canal dug through the Wadi Tumilat; it was completed under the Persian king Darius I.' },
        { n: 'Battle of Pelusium', y: '525 BCE', lat: 31.04, lon: 32.55, k: 'battle', vn: 'Psamtik III', vs: 'Cambyses II (Persia)', d: "According to one story, the Persians carried cats, Egypt's sacred animal, to make their enemy hesitate." },
        { n: 'The last native pharaoh', y: '343 BCE', lat: 31.04, lon: 32.55, approx: true, k: 'battle', vn: 'Nectanebo II', vs: 'Artaxerxes III (Persia)', d: 'Persia conquers Egypt again; Nectanebo II flees south, ending the age of the native pharaohs.' },
        { n: 'Alexander at the Siwa Oasis', y: '331 BCE', lat: 29.20, lon: 25.55, k: 'event', vn: 'Alexander the Great', d: 'Alexander crosses the desert to the temple of the god Amun to ask for an oracle; the Egyptians welcome him as a pharaoh.' }
      ]
    },
    {
      id: 'ptolemaic', t: 'The Ptolemaic Dynasty', y: '332 – 30 BCE',
      d: "Alexander's general Ptolemy founds a Greek dynasty in Egypt; Alexandria becomes the greatest center of science in the world, down to the time of Queen Cleopatra.",
      ev: [
        { n: 'Founding of Alexandria', y: '331 BCE', lat: 31.20, lon: 29.92, k: 'event', vn: 'Alexander the Great, Ptolemy I', d: 'According to legend, Alexander marked out the plan of the city himself using barley flour.' },
        { n: 'The Pharos Lighthouse', y: '~280 BCE', lat: 31.214, lon: 29.885, k: 'event', vn: 'Ptolemy II', d: 'Over 100 m high, one of the Seven Wonders of the Ancient World; the word for "lighthouse" in many languages comes from Pharos.' },
        { n: 'Library of Alexandria', y: '~280 BCE', lat: 31.209, lon: 29.909, k: 'event', vn: 'Ptolemy I, Ptolemy II', d: 'The largest library of the ancient world; ships arriving in port had to let their books be copied.' },
        { n: 'Eratosthenes measures the Earth', y: '~240 BCE', lat: 24.09, lon: 32.90, k: 'event', vn: 'Eratosthenes', d: "By measuring the shadows of the Sun at Syene (Aswan) and Alexandria, he calculated the Earth's circumference quite accurately." },
        { n: 'Battle of Raphia', y: '217 BCE', lat: 31.29, lon: 34.25, k: 'battle', vn: 'Ptolemy IV', vs: 'Antiochus III (Seleucid)', d: "One of the largest elephant battles: Ptolemy's African elephants against Antiochus's Indian elephants." },
        { n: 'The Rosetta Stone', y: '196 BCE', lat: 31.40, lon: 30.42, k: 'event', vn: 'Ptolemy V', d: 'A decree carved in three scripts; found in 1799, it helped decipher hieroglyphs.' },
        { n: 'Temple of Horus at Edfu', y: '237 – 57 BCE', lat: 24.978, lon: 32.873, k: 'event', vn: 'The Ptolemaic kings', d: 'One of the best-preserved temples in Egypt, built over nearly 200 years.' },
        { n: 'The Alexandrian War', y: '48 – 47 BCE', lat: 31.20, lon: 29.90, k: 'battle', vn: 'Cleopatra VII, Julius Caesar', vs: 'Ptolemy XIII', d: 'Cleopatra and Caesar defeat her brother in the struggle for the throne; part of the city burns.' },
        { n: 'Battle of Actium', y: '31 BCE', lat: 38.95, lon: 20.75, k: 'battle', vn: 'Cleopatra VII, Mark Antony', vs: 'Octavian, Agrippa (Rome)', d: 'A naval battle off the coast of Greece; Cleopatra and Antony lose, and the next year Egypt becomes a Roman province.' }
      ]
    },
    {
      id: 'roman', t: 'The Roman and Byzantine period', y: '30 BCE – 641',
      d: 'Egypt is the "granary" that feeds the city of Rome; Christianity spreads, and the world\'s first monasteries appear in the Egyptian desert.',
      ev: [
        { n: 'Death of Cleopatra', y: '30 BCE', lat: 31.21, lon: 29.93, k: 'event', vn: 'Cleopatra VII', vs: 'Octavian', d: "Egypt's last queen dies in Alexandria; Octavian makes Egypt the emperor's personal property." },
        { n: "Pompey's Pillar", y: '297', lat: 31.1825, lon: 29.8964, k: 'event', vn: 'Diocletian', d: 'A red granite column almost 27 m high, set up to honor the emperor Diocletian.' },
        { n: 'Monastery of St. Anthony', y: '~356', lat: 28.925, lon: 32.347, k: 'event', vn: 'St. Anthony', d: 'St. Anthony lived as a hermit in the desert near the Red Sea; the monastery named after him is one of the oldest in the world.' },
        { n: 'Temple of Philae – the last hieroglyphs', y: '394', lat: 24.025, lon: 32.884, k: 'event', d: 'The last known hieroglyphic inscription is carved at the temple of Philae; after that, no one could read this script any more.' },
        { n: 'The mathematician Hypatia', y: '~400', lat: 31.20, lon: 29.91, k: 'event', vn: 'Hypatia', d: 'One of the first known women mathematicians and astronomers, she taught in Alexandria.' },
        { n: 'Monastery of St. Catherine', y: '~565', lat: 28.556, lon: 33.976, k: 'event', vn: 'Justinian I', d: "At the foot of Mount Sinai, the monastery's library holds some of the oldest manuscripts in the world." }
      ]
    },
    {
      id: 'islamic', t: 'Islamic Egypt – Fatimid, Ayyubid, Mamluk', y: '640 – 1517',
      d: 'The Arabs bring Islam to Egypt; Cairo is built and becomes a major cultural center; the Mamluk kings defeat both the Crusaders and the Mongols.',
      ev: [
        { n: 'Battle of Heliopolis', y: '640', lat: 30.13, lon: 31.31, k: 'battle', vn: 'Amr ibn al-As', vs: 'The Byzantine army', d: 'The Arab army defeats the Byzantines, opening the way to capture the fortress of Babylon and all of Egypt.' },
        { n: 'The city of Fustat and the Mosque of Amr', y: '641', lat: 30.010, lon: 31.233, k: 'event', vn: 'Amr ibn al-As', d: 'A new capital beside the Nile, with the first mosque in Africa.' },
        { n: 'Mosque of Ibn Tulun', y: '879', lat: 30.0287, lon: 31.2495, k: 'event', vn: 'Ahmad ibn Tulun', d: 'The oldest mosque in Cairo to survive almost in its original form, with a minaret that has an outside spiral staircase.' },
        { n: 'The Fatimids found Cairo', y: '969', lat: 30.0478, lon: 31.2623, k: 'event', vn: 'Jawhar al-Siqilli, al-Mu\'izz', d: 'The city is named al-Qahira, "the Victorious".' },
        { n: 'Al-Azhar University', y: '970', lat: 30.0457, lon: 31.2627, k: 'event', vn: 'The Fatimids', d: 'One of the oldest schools in the world that is still in operation.' },
        { n: "Saladin's Citadel of Cairo", y: '1176', lat: 30.0299, lon: 31.2611, k: 'event', vn: 'Saladin', d: 'Saladin builds the citadel on the Mokattam hill to protect Cairo from the Crusaders.' },
        { n: 'Battle of Hattin', y: '1187', lat: 32.80, lon: 35.45, k: 'battle', vn: 'Saladin', vs: 'Guy de Lusignan (Crusaders)', d: 'The Crusaders, thirsty under the summer sun, are defeated; Saladin recaptures Jerusalem.' },
        { n: 'Battle of Mansurah', y: '1250', lat: 31.04, lon: 31.38, k: 'battle', vn: 'Baibars, Shajar al-Durr', vs: 'King Louis IX (France)', d: 'The Seventh Crusade fails; King Louis IX of France is captured and has to pay a ransom.' },
        { n: 'Battle of Ain Jalut', y: '1260', lat: 32.55, lon: 35.36, k: 'battle', vn: 'Qutuz, Baibars', vs: 'Kitbuqa (Mongols)', d: 'One of the first defeats of the Mongol army, stopping their advance into Africa.' },
        { n: 'Battle of Ridaniya', y: '1517', lat: 30.07, lon: 31.30, approx: true, k: 'battle', vn: 'Tuman bay II (Mamluk)', vs: 'Selim I (Ottoman)', d: 'The Ottomans capture Cairo; Egypt becomes a province of the Ottoman Empire.' }
      ]
    },
    {
      id: 'napoleon', t: 'Napoléon, Muhammad Ali and the Suez Canal', y: '1798 – 1882',
      d: "Napoléon's expedition opens the field of Egyptology; Muhammad Ali modernizes the country; the Suez Canal links the Mediterranean with the Red Sea.",
      route: { t: "Napoléon's march, 1798 – 1799", pts: [[31.20, 29.92], [31.03, 30.71], [30.08, 31.20], [30.04, 31.24], [31.13, 33.80], [32.05, 34.75], [32.92, 35.07]] },
      ev: [
        { n: 'Battle of the Pyramids', y: '1798', lat: 30.08, lon: 31.20, approx: true, k: 'battle', vn: 'Murad Bey, Ibrahim Bey', vs: 'Napoléon', d: '"Forty centuries look down upon you" – Napoléon told his soldiers before the battle; the Mamluk cavalry lost against the square formations.' },
        { n: 'Battle of the Nile (Abukir Bay)', y: '1798', lat: 31.32, lon: 30.07, k: 'battle', vn: 'Horatio Nelson (Britain)', vs: 'François-Paul Brueys (France)', d: "The British fleet destroys the French fleet, leaving Napoléon's army trapped in Egypt." },
        { n: 'Siege of Acre', y: '1799', lat: 32.92, lon: 35.07, k: 'battle', vn: 'Jazzar Pasha (Ottoman), Sidney Smith', vs: 'Napoléon', d: 'Napoléon fails to take the city of Acre and has to retreat to Egypt, then secretly returns to France.' },
        { n: 'The Rosetta Stone is found', y: '1799', lat: 31.40, lon: 30.42, k: 'event', d: 'French soldiers find the stone while digging the foundations of a fort near the town of Rashid (Rosetta).' },
        { n: 'Muhammad Ali takes power', y: '1805', lat: 30.0287, lon: 31.2599, k: 'event', vn: 'Muhammad Ali', d: 'The officer of Albanian origin becomes Viceroy of Egypt and builds factories, schools and a modern army.' },
        { n: 'Champollion deciphers hieroglyphs', y: '1822', lat: 48.857, lon: 2.341, k: 'event', vn: 'Jean-François Champollion', d: 'Thanks to the Rosetta Stone, he reads the names of the pharaohs and opens the field of Egyptology.' },
        { n: 'Battle of Nezib', y: '1839', lat: 37.01, lon: 37.79, k: 'battle', vn: 'Ibrahim Pasha', vs: 'Hafiz Osman Pasha (Ottoman)', d: "Muhammad Ali's son defeats the Ottoman army in southern Anatolia, but the European powers force him to withdraw." },
        { n: 'Opening of the Suez Canal', y: '1869', lat: 31.26, lon: 32.31, k: 'event', vn: 'Khedive Ismail, Ferdinand de Lesseps', d: 'The 164 km canal means ships from Europe to Asia no longer have to sail around Africa.' },
        { n: 'Battle of Tel el-Kebir', y: '1882', lat: 30.55, lon: 31.78, k: 'battle', vn: 'Ahmed Urabi', vs: 'Garnet Wolseley (Britain)', d: 'The British attack at dawn and defeat Urabi; Egypt is occupied by Britain.' }
      ]
    },
    {
      id: 'modern', t: 'Modern Egypt', y: '1882 – present',
      d: 'Egypt wins independence from Britain, becomes a republic, nationalizes the Suez Canal, goes through wars with Israel and later signs a peace treaty.',
      ev: [
        { n: 'Egyptian independence', y: '1922', lat: 30.044, lon: 31.236, k: 'event', vn: 'King Fuad I, Saad Zaghloul', d: "After the revolution of 1919, Britain recognizes Egypt's independence but keeps troops at the Suez Canal." },
        { n: 'Battle of El Alamein', y: '1942', lat: 30.83, lon: 28.95, k: 'battle', vn: 'Bernard Montgomery (Britain)', vs: 'Erwin Rommel (Germany – Italy)', d: 'The Allied army stops the German–Italian army in the desert, protecting Cairo and the Suez Canal.' },
        { n: 'The 1952 revolution', y: '1952', lat: 30.044, lon: 31.236, k: 'event', vn: 'Gamal Abdel Nasser, Mohamed Naguib', d: 'The Free Officers overthrow King Farouk; a year later Egypt becomes a republic.' },
        { n: 'The Suez Crisis', y: '1956', lat: 31.26, lon: 32.30, k: 'battle', vn: 'Gamal Abdel Nasser', vs: 'Britain, France, Israel', d: "Nasser nationalizes the canal; after pressure from the US and the Soviet Union, the three countries' forces have to withdraw." },
        { n: 'The Six-Day War', y: '1967', lat: 30.50, lon: 33.80, approx: true, k: 'battle', vn: 'Gamal Abdel Nasser', vs: 'Israel', d: 'Egypt loses the Sinai Peninsula; the Suez Canal is closed for 8 years.' },
        { n: 'Aswan High Dam', y: '1970', lat: 23.97, lon: 32.88, k: 'event', vn: 'Gamal Abdel Nasser', d: 'The dam holds back the Nile floods, creating Lake Nasser, about 500 km long, and supplies electricity to the whole country.' },
        { n: 'Crossing the Suez Canal', y: '1973', lat: 30.60, lon: 32.33, approx: true, k: 'battle', vn: 'Anwar Sadat, Saad El Shazly', vs: 'Israel', d: 'Egyptian troops use high-pressure water cannons to break through the sand banks and cross the canal in the October War.' },
        { n: 'Camp David Accords', y: '1978', lat: 39.648, lon: -77.465, k: 'event', vn: 'Anwar Sadat', vs: 'Menachem Begin (Israel)', d: 'Signed in the United States; the next year the two countries sign a peace treaty and Egypt regains the Sinai Peninsula.' },
        { n: 'Protests in Tahrir Square', y: '2011', lat: 30.0444, lon: 31.2357, k: 'event', vn: 'Hosni Mubarak', d: 'After 18 days of huge protests, President Mubarak resigns after almost 30 years in power.' },
        { n: 'Mohamed Morsi is elected, then removed', y: '2012 – 2013', lat: 30.087, lon: 31.327, approx: true, k: 'event', vn: 'Mohamed Morsi', vs: 'The army (Abdel Fattah el-Sisi)', d: 'Morsi wins the first presidential election with several candidates; a year later, amid huge protests, the army removes him.' },
        { n: 'Abdel Fattah el-Sisi becomes President', y: '2014', lat: 30.044, lon: 31.236, approx: true, k: 'event', vn: 'Abdel Fattah el-Sisi', d: 'The former commander-in-chief of the army is elected president and re-elected in 2018 and 2023.' },
        { n: 'The New Suez Canal', y: '2015', lat: 30.55, lon: 32.33, approx: true, k: 'event', vn: 'Abdel Fattah el-Sisi', d: 'A parallel channel about 35 km long is dug in about a year, letting ships travel in both directions.' },
        { n: 'Ever Given stuck in the Suez Canal', y: 'Mar 2021', lat: 30.018, lon: 32.58, k: 'event', d: 'A 400 m container ship runs aground across the canal for 6 days, and hundreds of ships have to queue and wait.' },
        { n: "The Pharaohs' Golden Parade", y: 'Apr 2021', lat: 30.008, lon: 31.248, k: 'event', d: '22 mummies of ancient kings and queens are carried on splendid carriages through Cairo to the National Museum of Egyptian Civilization.' },
        { n: 'COP27 climate conference', y: '2022', lat: 27.915, lon: 34.33, k: 'event', vn: 'Abdel Fattah el-Sisi', d: 'Egypt hosts it in Sharm El-Sheikh; countries agree to set up a "loss and damage" fund to help poor countries suffering from natural disasters.' },
        { n: 'Grand Egyptian Museum', y: '2025', lat: 29.994, lon: 31.119, k: 'event', d: 'The largest archaeological museum in the world dedicated to a single civilization, next to the Giza pyramids, displays the complete Tutankhamun treasure.' }
      ]
    }
  ]
};
