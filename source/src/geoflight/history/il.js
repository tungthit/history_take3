// Israel history for the Geo-Flight history layer (English text).
export default {
  iso: 'il', name: 'Israel', flag: '🇮🇱',
  eras: [
    {
      id: 'canaan', t: 'Ancient Canaan', y: '~9000 – 1000 BCE',
      d: 'The narrow strip of land between the Mediterranean Sea and the Jordan River was a crossroads between Egypt and Mesopotamia, home to some of the oldest cities in the world.',
      ev: [
        { n: 'Ancient city of Jericho', y: '~9000 BCE', lat: 31.871, lon: 35.444, k: 'event', vn: 'Neolithic inhabitants', d: 'Jericho (now in the West Bank) is one of the longest continuously inhabited places, with stone walls and a tower from more than 10,000 years ago.' },
        { n: 'Battle of Megiddo', y: '~1457 BCE', lat: 32.585, lon: 35.185, k: 'battle', vn: 'Alliance of Canaanite kings', vs: 'Pharaoh Thutmose III (Egypt)', d: 'The first battle recorded in detail in history; the name Megiddo later gave rise to "Armageddon".' },
        { n: 'Merneptah Stele', y: '~1208 BCE', lat: 31.6, lon: 34.8, approx: true, k: 'event', vn: 'The Israelites', vs: 'Pharaoh Merneptah (Egypt)', d: 'An Egyptian stele mentions "Israel" as a people in Canaan – the first time this name appears in stone.' },
        { n: 'Philistines settle the coast', y: '~1175 BCE', lat: 31.665, lon: 34.546, approx: true, k: 'event', vn: 'The Philistines', d: 'One of the "Sea Peoples" founded the cities of Ashkelon, Gaza and Ashdod; the name "Palestine" comes from their name.' }
      ]
    },
    {
      id: 'israel-judah', t: 'The kingdoms of Israel and Judah', y: '~1000 – 586 BCE',
      d: 'According to the Hebrew Bible, Kings David and Solomon ruled in Jerusalem; afterwards the land split into two kingdoms, Israel (north) and Judah (south).',
      ev: [
        { n: 'King David chooses Jerusalem', y: '~1000 BCE', lat: 31.773, lon: 35.235, approx: true, k: 'legend', vn: 'King David', d: 'According to the Bible, David captured the hilltop city of Jebus and made Jerusalem his capital; archaeologists still debate the details.' },
        { n: 'The First Temple', y: '~950 BCE', lat: 31.778, lon: 35.235, approx: true, k: 'legend', vn: 'King Solomon', d: 'According to tradition, Solomon built the Temple on the Temple Mount, the center of ancient Judaism.' },
        { n: 'Samaria – capital of Israel', y: '~880 BCE', lat: 32.276, lon: 35.197, k: 'event', vn: 'King Omri', d: 'King Omri built a new capital on a hill; the Assyrians called the whole northern kingdom the "house of Omri".' },
        { n: 'Tel Dan Stele', y: '~840 BCE', lat: 33.249, lon: 35.652, k: 'event', vn: 'Kings of Israel and Judah', vs: 'King of Aram-Damascus', d: 'The stele found in 1993 bears the words "house of David" – the earliest evidence outside the Bible of this royal line.' },
        { n: 'Assyria captures Samaria', y: '722 BCE', lat: 32.276, lon: 35.197, k: 'battle', vn: 'King Hoshea', vs: 'Sargon II (Assyria)', d: 'The northern kingdom of Israel was wiped out by Assyria, and many of its people were taken elsewhere.' },
        { n: 'Hezekiah\'s Tunnel', y: '~701 BCE', lat: 31.773, lon: 35.236, k: 'event', vn: 'King Hezekiah', d: 'Workers digging from both ends met in the middle of the rock, bringing spring water inside the city in preparation for a siege.' },
        { n: 'Siege of Lachish', y: '701 BCE', lat: 31.565, lon: 34.849, k: 'battle', vn: 'King Hezekiah', vs: 'Sennacherib (Assyria)', d: 'The Assyrian army destroyed the city of Lachish; scenes of the siege were carved on the walls of the palace at Nineveh, now in the British Museum.' },
        { n: 'Babylon destroys Jerusalem', y: '587 BCE', lat: 31.778, lon: 35.235, k: 'battle', vn: 'King Zedekiah', vs: 'Nebuchadnezzar II (Babylon)', d: 'The First Temple was destroyed and many people of Judah were taken to Babylon – the period of the "Babylonian exile".' }
      ]
    },
    {
      id: 'den-tho-2', t: 'The Second Temple period', y: '539 – 63 BCE',
      d: 'The Persians let the people of Judah return; afterwards the land belonged to Greek kings, until the Maccabee brothers rebelled and founded the Hasmonean dynasty.',
      ev: [
        { n: 'Return from Babylon', y: '538 BCE', lat: 31.778, lon: 35.235, k: 'event', vn: 'Zerubbabel', vs: 'King Cyrus the Great (Persia)', d: 'The Persian king Cyrus let the people of Judah go home; they rebuilt the Second Temple, completed around 516 BCE.' },
        { n: 'Alexander besieges Gaza', y: '332 BCE', lat: 31.50, lon: 34.46, k: 'battle', vn: 'Persian garrison in Gaza', vs: 'Alexander the Great', d: 'On his way to Egypt, Alexander besieged Gaza for two months; the whole region passed into Greek hands.' },
        { n: 'Maccabean Revolt', y: '167 BCE', lat: 31.93, lon: 34.99, approx: true, k: 'battle', vn: 'Mattathias, Judah Maccabee', vs: 'Antiochus IV (Seleucid)', d: 'From the village of Modiin, the Maccabee family rose up when the Seleucid king banned Jewish rituals.' },
        { n: 'First Hanukkah', y: '164 BCE', lat: 31.778, lon: 35.235, k: 'event', vn: 'Judah Maccabee', d: 'After regaining the Temple, the Maccabees held a ceremony of rededication; Jews remember this day with the Hanukkah festival of candles.' },
        { n: 'Dead Sea Scrolls at Qumran', y: '~200 BCE – 68', lat: 31.741, lon: 35.459, k: 'event', vn: 'A religious community at Qumran', d: 'Hundreds of ancient scrolls were hidden in caves; in 1947 a shepherd boy found them by chance.' },
        { n: 'Pompey captures Jerusalem', y: '63 BCE', lat: 31.778, lon: 35.235, k: 'battle', vn: 'Aristobulus II', vs: 'Pompey (Rome)', d: 'Taking advantage of the struggle for the throne between two Hasmonean brothers, the Roman general Pompey captured Jerusalem.' }
      ]
    },
    {
      id: 'la-ma', t: 'Roman and Byzantine times', y: '63 BCE – 636',
      d: 'Under Roman rule, the land saw the life of Jesus and two great Jewish revolts; after their defeat, most Jews scattered far and wide.',
      ev: [
        { n: 'King Herod builds the port of Caesarea', y: '~22 – 10 BCE', lat: 32.50, lon: 34.89, k: 'event', vn: 'King Herod the Great', d: 'Herod built a huge artificial harbor with concrete poured into the sea, named after Emperor Augustus.' },
        { n: 'Jesus in Nazareth and Jerusalem', y: '~4 BCE – 30', lat: 32.70, lon: 35.30, approx: true, k: 'event', vn: 'Jesus of Nazareth', d: 'Jesus grew up in Nazareth, preached around the Sea of Galilee and was crucified in Jerusalem; Christianity began from here.' },
        { n: 'Rome destroys the Second Temple', y: '70', lat: 31.778, lon: 35.235, k: 'battle', vn: 'Jewish rebels', vs: 'Titus (Rome)', d: 'After four years of revolt, Jerusalem fell and the Temple was burned; only the western wall remains, now called the Wailing Wall.' },
        { n: 'Masada fortress', y: '73 – 74', lat: 31.3156, lon: 35.3536, k: 'battle', vn: 'Eleazar ben Yair', vs: 'Lucius Flavius Silva (Rome)', d: 'The last group of rebels held out on a rock mountain beside the Dead Sea; the Romans built a whole ramp to reach the top.' },
        { n: 'Bar Kokhba revolt', y: '132 – 135', lat: 31.73, lon: 35.13, k: 'battle', vn: 'Simon Bar Kokhba', vs: 'Emperor Hadrian (Rome)', d: 'The revolt failed at the town of Betar; Rome renamed the province Syria Palaestina and banned Jews from Jerusalem.' },
        { n: 'The Mishnah', y: '~200', lat: 32.75, lon: 35.28, approx: true, k: 'event', vn: 'Rabbi Judah ha-Nasi', d: 'In Galilee, scholars wrote down the Jewish oral law as the Mishnah, the foundation of the Talmud.' },
        { n: 'Church of the Holy Sepulchre', y: '335', lat: 31.7784, lon: 35.2296, k: 'event', vn: 'Emperor Constantine, Helena', d: 'The Christian Roman emperor had a church built at the place believed to be the tomb of Jesus; Jerusalem became a pilgrimage site.' }
      ]
    },
    {
      id: 'trung-co', t: 'Islamic, Crusader and Ottoman times', y: '636 – 1917',
      d: 'The land was ruled in turn by Arabs, Crusaders, Mamluks and then Ottomans; Jerusalem is a holy city for Judaism, Christianity and Islam alike.',
      ev: [
        { n: 'Caliph Umar enters Jerusalem', y: '637', lat: 31.778, lon: 35.235, k: 'event', vn: 'Caliph Umar', vs: 'Patriarch Sophronius (Byzantine)', d: 'After the Byzantine army lost at Yarmouk, Jerusalem surrendered; Caliph Umar came in person to receive the city.' },
        { n: 'Dome of the Rock', y: '691', lat: 31.7781, lon: 35.2354, k: 'event', vn: 'Caliph Abd al-Malik', d: 'The shrine with a gilded dome was built on the Temple Mount and is the oldest surviving major Islamic monument.' },
        { n: 'Crusaders capture Jerusalem', y: '1099', lat: 31.778, lon: 35.235, k: 'battle', vn: 'Fatimid garrison', vs: 'Godfrey of Bouillon (Crusaders)', d: 'After a siege of over a month, the Crusaders took the city and founded the Kingdom of Jerusalem.' },
        { n: 'Battle of Hattin', y: '1187', lat: 32.80, lon: 35.45, k: 'battle', vn: 'Saladin', vs: 'King Guy de Lusignan (Crusaders)', d: 'In the summer heat without water, the Crusaders were surrounded and crushed by Saladin; a few months later Saladin retook Jerusalem.' },
        { n: 'Fall of Acre', y: '1291', lat: 32.92, lon: 35.07, k: 'battle', vn: 'Sultan al-Ashraf Khalil (Mamluk)', vs: 'Crusader knights', d: 'The last great Crusader fortress fell to the Mamluks, ending nearly 200 years of the Crusades.' },
        { n: 'Safed – center of Kabbalah', y: '~1550', lat: 32.965, lon: 35.496, k: 'event', vn: 'Isaac Luria, Joseph Karo', d: 'Many Jewish scholars expelled from Spain came to live in the mountain town of Safed, turning it into a center of learning.' },
        { n: 'Napoleon besieges Acre', y: '1799', lat: 32.92, lon: 35.07, k: 'battle', vn: 'Jazzar Pasha (Ottoman)', vs: 'Napoleon Bonaparte (France)', d: 'Helped by the British navy, Acre held out for two months, forcing Napoleon to give up his campaign in the Levant.' }
      ]
    },
    {
      id: 'uy-tri', t: 'Zionism and the British Mandate', y: '1882 – 1948',
      d: 'Jews from Europe immigrated under the Zionist movement; at the same time the Palestinian Arab national movement grew, and the two sides clashed more and more sharply.',
      ev: [
        { n: 'First Aliyah wave', y: '1882', lat: 31.96, lon: 34.80, k: 'event', vn: 'Jewish immigrants from Russia and Romania', d: 'The first immigrants founded the farming village of Rishon LeZion while the land was still Ottoman.' },
        { n: 'Founding of Tel Aviv', y: '1909', lat: 32.064, lon: 34.772, k: 'event', vn: 'Meir Dizengoff and 66 families', d: 'Families drew lots using seashells to divide land on the sand dunes next to Jaffa; Tel Aviv became the largest Jewish city.' },
        { n: 'Kibbutz Degania', y: '1910', lat: 32.70, lon: 35.58, k: 'event', vn: 'Jewish pioneers', d: 'The first collective village (kibbutz), beside the Sea of Galilee, where everyone worked, ate and shared property together.' },
        { n: 'Battle of Beersheba', y: '1917', lat: 31.25, lon: 34.79, k: 'battle', vn: 'Australian cavalry (British army)', vs: 'Ottoman army', d: 'An Australian cavalry charge at dusk captured the wells, opening the way for the British advance to Jerusalem.' },
        { n: 'Balfour Declaration', y: '1917', lat: 51.503, lon: -0.128, approx: true, k: 'event', vn: 'Chaim Weizmann', vs: 'Foreign Secretary Arthur Balfour (Britain)', d: 'The British government supported a "national home for the Jewish people" in Palestine, while promising to respect the rights of other communities.' },
        { n: 'Hebrew University of Jerusalem', y: '1925', lat: 31.794, lon: 35.243, k: 'event', vn: 'Albert Einstein, Chaim Weizmann', d: 'The university opened on Mount Scopus; Einstein left all his papers to the university.' },
        { n: 'Arab Revolt of 1936', y: '1936 – 1939', lat: 32.22, lon: 35.26, approx: true, k: 'battle', vn: 'Palestinian Arabs', vs: 'British Mandate authorities', d: 'Palestinian Arabs held a general strike and rose up in protest against the Mandate and the wave of Jewish immigration.' },
        { n: 'King David Hotel bombing', y: '1946', lat: 31.774, lon: 35.222, k: 'event', vn: 'Irgun armed group', vs: 'British command', d: 'The Irgun planted a bomb at the British government headquarters, killing 91 people.' },
        { n: 'UN Partition Plan', y: 'Nov 29, 1947', lat: 40.749, lon: -73.968, approx: true, k: 'event', vn: 'United Nations General Assembly', d: 'The United Nations proposed dividing Palestine into a Jewish state and an Arab state; the Jewish side accepted, the Arab side rejected it.' }
      ]
    },
    {
      id: 'nha-nuoc', t: 'The State of Israel and its wars', y: '1948 – 1993',
      d: 'Israel declared independence in 1948 and went through many wars with neighboring Arab countries; hundreds of thousands of Palestinians became refugees.',
      ev: [
        { n: 'Declaration of Independence', y: 'May 14, 1948', lat: 32.0636, lon: 34.7706, k: 'event', vn: 'David Ben-Gurion', d: 'In a small museum in Tel Aviv, Ben-Gurion read the declaration founding the State of Israel a few hours before the British left.' },
        { n: '1948 War and the Nakba', y: '1948 – 1949', lat: 31.95, lon: 34.90, approx: true, k: 'battle', vn: 'Israeli army', vs: 'Egypt, Jordan, Syria, Iraq and Palestinian forces', d: 'Israel calls this the War of Independence; about 700,000 Palestinians fled or were expelled from their homes – they call it the Nakba ("Catastrophe").' },
        { n: 'Suez Crisis', y: '1956', lat: 30.0, lon: 33.5, approx: true, k: 'battle', vn: 'Moshe Dayan', vs: 'Egypt (Gamal Abdel Nasser)', d: 'Israel, together with Britain and France, attacked Egypt and seized the Sinai Peninsula, but withdrew under pressure from the US and the Soviet Union.' },
        { n: 'Six-Day War', y: '1967', lat: 31.776, lon: 35.234, approx: true, k: 'battle', vn: 'Levi Eshkol, Moshe Dayan, Yitzhak Rabin', vs: 'Egypt, Jordan, Syria', d: 'In six days, Israel captured Sinai, the Gaza Strip, the West Bank, East Jerusalem and the Golan Heights; most of the world regards these as occupied territories.' },
        { n: 'Yom Kippur War', y: '1973', lat: 33.10, lon: 35.80, approx: true, k: 'battle', vn: 'Golda Meir', vs: 'Egypt (Anwar Sadat), Syria (Hafez al-Assad)', d: 'Egypt and Syria launched a surprise attack on the very day of Yom Kippur; after difficult first days, Israel pushed back both armies.' },
        { n: 'Operation Entebbe', y: '1976', lat: 0.042, lon: 32.443, k: 'battle', vn: 'Yonatan Netanyahu', vs: 'Hijackers and Ugandan troops', d: 'Israeli commandos flew 4,000 km to Entebbe airport (Uganda) to rescue more than 100 hostages from a hijacked plane.' },
        { n: 'Egypt–Israel Peace Treaty', y: '1978 – 1979', lat: 39.648, lon: -77.465, k: 'event', vn: 'Menachem Begin', vs: 'Anwar Sadat (Egypt)', d: 'At Camp David (USA), the two sides agreed on peace; Israel returned Sinai, and Egypt became the first Arab country to recognize Israel.' },
        { n: 'Lebanon War', y: '1982', lat: 33.89, lon: 35.50, approx: true, k: 'battle', vn: 'Menachem Begin, Ariel Sharon', vs: 'PLO (Yasser Arafat)', d: 'Israel advanced to Beirut, forcing the Palestine Liberation Organization (PLO) to leave Lebanon; Israeli troops stayed in southern Lebanon until 2000.' },
        { n: 'First Intifada', y: '1987 – 1993', lat: 31.53, lon: 34.48, approx: true, k: 'event', vn: 'Israeli army', vs: 'Palestinians in Gaza and the West Bank', d: 'Starting from the Jabalia refugee camp in Gaza, Palestinians rose up against the occupation with protests, strikes and stone-throwing.' }
      ]
    },
    {
      id: 'oslo-nay', t: 'From Oslo to today', y: '1993 – present',
      d: 'The Oslo Accords raised hopes for peace but the conflict continued; Israel became a high-tech hub, and the 2023–2025 Gaza war became one of the bloodiest conflicts in the region.',
      ev: [
        { n: 'Oslo Accords', y: '1993', lat: 38.897, lon: -77.036, k: 'event', vn: 'Yitzhak Rabin, Shimon Peres', vs: 'Yasser Arafat (PLO)', d: 'Israel and the PLO recognized each other for the first time and shook hands at the White House; a Palestinian Authority was set up in Gaza and part of the West Bank.' },
        { n: 'Peace treaty with Jordan', y: '1994', lat: 29.60, lon: 35.00, approx: true, k: 'event', vn: 'Yitzhak Rabin', vs: 'King Hussein (Jordan)', d: 'Israel and Jordan signed a peace treaty in the Arava valley, ending the state of war between the two countries.' },
        { n: 'Prime Minister Rabin assassinated', y: '1995', lat: 32.081, lon: 34.781, k: 'event', vn: 'Yitzhak Rabin', d: 'After a peace rally in Tel Aviv, Rabin was shot dead by an Israeli extremist who opposed Oslo.' },
        { n: 'Second Intifada', y: '2000 – 2005', lat: 31.778, lon: 35.235, approx: true, k: 'event', vn: 'Ariel Sharon', vs: 'Palestinian armed groups', d: 'Violence spread with many bombings and military operations; Israel began building a separation barrier in the West Bank.' },
        { n: 'Withdrawal from Gaza and blockade', y: '2005 – 2007', lat: 31.42, lon: 34.38, approx: true, k: 'event', vn: 'Ariel Sharon', vs: 'Hamas', d: 'Israel withdrew settlers from Gaza in 2005; in 2007 Hamas took power there, and Israel and Egypt blockaded the strip.' },
        { n: 'Iron Dome', y: '2011', lat: 31.25, lon: 34.79, approx: true, k: 'event', vn: 'Israeli air defense forces', d: 'The Iron Dome interceptor missile system first shot down rockets fired from Gaza at cities in southern Israel.' },
        { n: 'Beresheet Moon lander', y: '2019', lat: 32.08, lon: 34.78, approx: true, k: 'event', vn: 'SpaceIL organization', d: 'Israel became the seventh country to put a spacecraft into lunar orbit, but the Beresheet lander crashed while trying to land.' },
        { n: 'Abraham Accords', y: '2020', lat: 38.897, lon: -77.036, k: 'event', vn: 'Benjamin Netanyahu', vs: 'UAE, Bahrain', d: 'Israel established relations with the UAE and Bahrain, then Morocco and Sudan, with US mediation.' },
        { n: 'Attack of October 7', y: 'Oct 7, 2023', lat: 31.39, lon: 34.46, approx: true, k: 'battle', vn: 'Israeli army, southern residents', vs: 'Hamas and armed groups', d: 'Hamas and other groups poured across the Gaza border; about 1,200 people in Israel were killed and about 250 were taken hostage.' },
        { n: 'Gaza War', y: '2023 – 2025', lat: 31.50, lon: 34.46, approx: true, k: 'battle', vn: 'Benjamin Netanyahu, Israeli army', vs: 'Hamas', d: 'The military campaign devastated much of Gaza; the Gaza Health Ministry reported over 60,000 Palestinians dead, and the United Nations warned of a humanitarian crisis.' },
        { n: 'Case at the International Court of Justice', y: '2024', lat: 52.087, lon: 4.295, k: 'event', vn: 'Israeli government', vs: 'South Africa', d: 'South Africa sued Israel at the International Court of Justice in The Hague; Israel rejects the accusations, and the case is still being heard.' },
        { n: '12-Day War with Iran', y: 'Jun 2025', lat: 32.08, lon: 34.78, approx: true, k: 'battle', vn: 'Israeli army', vs: 'Iran', d: 'Israel struck Iran\'s nuclear and military sites; Iran fired missiles in response, then the two sides agreed a ceasefire after 12 days.' },
        { n: 'Gaza ceasefire and hostage return', y: 'Oct 2025', lat: 31.42, lon: 34.38, approx: true, k: 'event', vn: 'Israeli government', vs: 'Hamas', d: 'Under a plan proposed by the US, the two sides agreed a ceasefire; surviving hostages were released and Israel freed many Palestinian prisoners.' }
      ]
    }
  ]
};
