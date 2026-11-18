// Iraq history for the Geo-Flight history layer (English text).
export default {
  iso: 'iq', name: 'Iraq', flag: '🇮🇶',
  eras: [
    {
      id: 'sumer', t: 'Sumer – the cradle of civilization', y: '~5400 – 2000 BCE',
      d: 'Between the Tigris and Euphrates rivers (Mesopotamia), the Sumerians built the first cities and invented writing, the wheel and the division of an hour into 60 minutes.',
      ev: [
        { n: 'City of Eridu', y: '~5400 BCE', lat: 30.816, lon: 45.996, k: 'event', d: 'The Sumerians believed Eridu was the first city, founded by the gods; the temple here was rebuilt on top of itself more than 15 times.' },
        { n: 'Cuneiform born at Uruk', y: '~3200 BCE', lat: 31.322, lon: 45.636, k: 'event', d: 'The people of Uruk pressed reed sticks into clay tablets to record grain and sheep – one of the earliest writing systems of humankind.' },
        { n: 'King Gilgamesh of Uruk', y: '~2700 BCE', lat: 31.322, lon: 45.636, k: 'legend', vn: 'King Gilgamesh', d: 'The Epic of Gilgamesh tells of a king who searched for immortality and is one of the oldest works of literature in the world.' },
        { n: 'Royal Tombs of Ur', y: '~2600 BCE', lat: 30.962, lon: 46.103, k: 'event', vn: 'Queen Puabi', d: 'Archaeologists found a golden headdress, a bull-headed lyre and the "Standard of Ur" inlaid with lapis lazuli.' },
        { n: 'Lagash–Umma War', y: '~2450 BCE', lat: 31.55, lon: 46.18, approx: true, k: 'battle', vn: 'King Eannatum (Lagash)', vs: 'City of Umma', d: 'Two cities fought over a canal-side field; the "Stele of the Vultures" records the war, one of the earliest war records.' },
        { n: 'Sargon founds the Akkadian Empire', y: '~2334 BCE', lat: 33.10, lon: 44.10, approx: true, k: 'event', vn: 'Sargon of Akkad', d: 'The first empire in history; to this day no one has found where the capital Akkad stood.' },
        { n: 'Ziggurat of Ur', y: '~2100 BCE', lat: 30.963, lon: 46.103, k: 'event', vn: 'King Ur-Nammu', d: 'A brick ziggurat for the Moon god; Ur-Nammu also issued the oldest surviving written law code.' }
      ]
    },
    {
      id: 'babylon', t: 'Babylon', y: '~1894 – 539 BCE',
      d: 'Babylon twice became the center of the world: under King Hammurabi and under Nebuchadnezzar II with the splendid Ishtar Gate.',
      ev: [
        { n: 'Code of Hammurabi', y: '~1754 BCE', lat: 32.536, lon: 44.421, k: 'event', vn: 'King Hammurabi', d: 'Nearly 300 laws carved on a black stone pillar, famous for the principle of "an eye for an eye, a tooth for a tooth".' },
        { n: 'Hittites sack Babylon', y: '~1595 BCE', lat: 32.536, lon: 44.421, k: 'battle', vn: 'King Samsu-ditana', vs: 'King Mursili I (Hittite)', d: 'The Hittite army marched thousands of km from Anatolia, sacked Babylon and withdrew, ending the Hammurabi dynasty.' },
        { n: 'Ishtar Gate', y: '~575 BCE', lat: 32.543, lon: 44.421, k: 'event', vn: 'King Nebuchadnezzar II', d: 'A city gate covered in blue glazed bricks with dragons and bulls; a reconstruction is now in a Berlin museum.' },
        { n: 'Hanging Gardens of Babylon', y: '~600 BCE', lat: 32.54, lon: 44.42, approx: true, k: 'legend', vn: 'King Nebuchadnezzar II', d: 'One of the Seven Wonders of the Ancient World; to this day archaeologists are not sure whether it really existed in Babylon.' },
        { n: 'Tower of Babel (Etemenanki)', y: '~6th century BCE', lat: 32.536, lon: 44.420, approx: true, k: 'legend', d: 'Babylon\'s 7-level temple tower, about 90 m high, is thought to be the origin of the Biblical story of the Tower of Babel.' },
        { n: 'Fall of Babylon', y: '539 BCE', lat: 32.536, lon: 44.421, k: 'battle', vn: 'King Nabonidus, crown prince Belshazzar', vs: 'Cyrus the Great (Persia)', d: 'The Persian army entered Babylon almost without a fight; Mesopotamia became part of the Persian Empire.' }
      ]
    },
    {
      id: 'assyria', t: 'The Assyrian Empire', y: '~2000 – 609 BCE',
      d: 'From the city of Ashur in the north, the Assyrians built the most powerful military empire of the Iron Age, with the capitals Nimrud and Nineveh.',
      ev: [
        { n: 'City of Ashur', y: '~2000 BCE', lat: 35.457, lon: 43.262, k: 'event', vn: 'Assyrian merchants', d: 'Merchants of Ashur took tin and cloth by donkey caravan to Anatolia; tens of thousands of their clay letters survive.' },
        { n: 'Capital at Nimrud', y: '879 BCE', lat: 36.098, lon: 43.329, k: 'event', vn: 'King Ashurnasirpal II', d: 'The king held a feast to open his palace for nearly 70,000 guests; the palace gates had winged human-headed bull statues (lamassu).' },
        { n: 'Battle of Qarqar', y: '853 BCE', lat: 35.80, lon: 36.33, approx: true, k: 'battle', vn: 'King Shalmaneser III', vs: 'Alliance of Syrian and Israelite kings', d: 'The first time camels and Arabs are mentioned in a battle recorded on a stone stele.' },
        { n: 'Siege of Lachish', y: '701 BCE', lat: 31.565, lon: 34.849, k: 'battle', vn: 'King Sennacherib', vs: 'Kingdom of Judah', d: 'The Assyrians built an earth ramp to bring siege engines up; scenes of the siege were carved on the walls of the palace at Nineveh.' },
        { n: 'Library of Ashurbanipal at Nineveh', y: '~650 BCE', lat: 36.36, lon: 43.15, k: 'event', vn: 'King Ashurbanipal', d: 'More than 30,000 clay tablets, including the Epic of Gilgamesh, were preserved because the burning of the palace hardened the clay even more.' },
        { n: 'Fall of Nineveh', y: '612 BCE', lat: 36.36, lon: 43.15, k: 'battle', vn: 'King Sinsharishkun', vs: 'Babylonian and Median allies', d: 'The largest city in the world at that time was destroyed; a few years later Assyria vanished from the map.' }
      ]
    },
    {
      id: 'empires', t: 'Mesopotamia under the empires', y: '539 BCE – 637',
      d: 'Mesopotamia belonged in turn to Persia, Alexander, the Seleucids, Parthia and the Sassanids; the capitals Seleucia and Ctesiphon rose beside the Tigris.',
      ev: [
        { n: 'Battle of Gaugamela', y: '331 BCE', lat: 36.36, lon: 43.25, approx: true, k: 'battle', vn: 'King Darius III (Persia)', vs: 'Alexander the Great (Macedonia)', d: 'Alexander defeated the Persian king on a plain near Erbil and marched into Babylon.' },
        { n: 'Alexander dies in Babylon', y: '323 BCE', lat: 32.536, lon: 44.421, k: 'event', d: 'Alexander the Great died at age 32 in the palace of Nebuchadnezzar, as he was planning to make Babylon his capital.' },
        { n: 'City of Seleucia on the Tigris', y: '~305 BCE', lat: 33.10, lon: 44.52, k: 'event', vn: 'Seleucus I', d: 'A general of Alexander founded a new capital; it was once one of the most populous cities in the world.' },
        { n: 'Hatra resists Rome', y: '117 – 198', lat: 35.588, lon: 42.718, k: 'battle', vn: 'Kings of Hatra', vs: 'Emperors Trajan and Septimius Severus (Rome)', d: 'A stone city in the desert that repelled two Roman emperors; it is now a World Heritage Site.' },
        { n: 'Taq Kasra palace', y: '~540', lat: 33.094, lon: 44.581, k: 'event', vn: 'King Khosrow I (Sassanid)', d: 'The largest brick vault of the ancient world, in the Sassanid capital Ctesiphon, still stands today.' },
        { n: 'Battle of al-Qadisiyyah', y: '636', lat: 31.60, lon: 44.50, approx: true, k: 'battle', vn: 'Rostam Farrokhzad (Sassanid)', vs: 'Saad ibn Abi Waqqas (Arab)', d: 'The Muslim Arab army beat the Persians; Mesopotamia passed to the caliphs and its people gradually became Muslim.' }
      ]
    },
    {
      id: 'abbasid', t: 'Early Islam and the Abbasids', y: '638 – 1258',
      d: 'Iraq was the center of the Islamic world; Abbasid Baghdad was the largest city in the world, where scholars translated and advanced human knowledge.',
      ev: [
        { n: 'Cities of Kufa and Basra', y: '636 – 638', lat: 30.51, lon: 47.81, approx: true, k: 'event', vn: 'Caliph Umar', d: 'Two Arab army camps grew into two cities of learning famous for grammar and law.' },
        { n: 'Battle of Karbala', y: '680', lat: 32.616, lon: 44.033, k: 'battle', vn: 'Imam Husayn', vs: 'Army of Caliph Yazid I (Umayyad)', d: 'The Prophet\'s grandson was killed in battle; it is the most sacred event for Shia Muslims, commemorated every year.' },
        { n: 'Building Baghdad – the Round City', y: '762', lat: 33.34, lon: 44.39, approx: true, k: 'event', vn: 'Caliph al-Mansur', d: 'Al-Mansur built a round capital with four gates; Baghdad quickly grew to nearly a million people.' },
        { n: 'Era of Harun al-Rashid', y: '786 – 809', lat: 33.34, lon: 44.39, approx: true, k: 'event', vn: 'Caliph Harun al-Rashid', d: 'The caliph of the "Thousand and One Nights" stories; he once sent Charlemagne a water clock and an elephant.' },
        { n: 'House of Wisdom (Bayt al-Hikma)', y: '~830', lat: 33.34, lon: 44.39, approx: true, k: 'event', vn: 'Caliph al-Mamun, al-Khwarizmi', d: 'Scholars translated Greek and Indian books; al-Khwarizmi wrote a book on algebra – the word "algorithm" comes from his name.' },
        { n: 'Great Mosque of Samarra', y: '851', lat: 34.206, lon: 43.880, k: 'event', vn: 'Caliph al-Mutawakkil', d: 'The spiral Malwiya minaret, 52 m high, can be climbed on foot all the way around to the top.' },
        { n: 'Mongols capture Baghdad', y: '1258', lat: 33.34, lon: 44.39, k: 'battle', vn: 'Caliph al-Mustasim', vs: 'Hulagu (Mongols)', d: 'The Mongols destroyed Baghdad and the House of Wisdom; legend says the Tigris ran black with the ink of books.' }
      ]
    },
    {
      id: 'ottoman', t: 'From the Mongols to the Ottomans', y: '1258 – 1918',
      d: 'Iraq was fought over by the Mongols, Timur, the Persians and the Ottomans; in the end it belonged to the Ottoman Empire for nearly 400 years until World War I.',
      ev: [
        { n: 'Timur sacks Baghdad', y: '1401', lat: 33.34, lon: 44.39, k: 'battle', vn: 'People of Baghdad', vs: 'Timur (Tamerlane)', d: 'For the second time in 150 years, Baghdad was heavily devastated.' },
        { n: 'Suleiman captures Baghdad', y: '1534', lat: 33.34, lon: 44.39, k: 'event', vs: 'Sultan Suleiman the Magnificent (Ottoman)', d: 'The Ottoman army took Baghdad from the Safavids; the two empires fought over the city for another century.' },
        { n: 'Treaty of Zuhab', y: '1639', lat: 34.66, lon: 45.92, approx: true, k: 'event', d: 'The Ottomans and Persia drew a border close to today\'s Iraq–Iran border.' },
        { n: 'Siege of Kut', y: '1915 – 1916', lat: 32.50, lon: 45.82, k: 'battle', vn: 'Khalil Pasha (Ottoman)', vs: 'General Charles Townshend (Britain)', d: 'More than 13,000 British soldiers were besieged for 147 days and then had to surrender to the Ottomans, a major British defeat.' },
        { n: 'British capture Baghdad', y: 'Mar 11, 1917', lat: 33.34, lon: 44.39, k: 'battle', vn: 'Ottoman army', vs: 'General Stanley Maude (Britain)', d: 'The British army marched into Baghdad; after the war, Iraq became a British mandate territory.' }
      ]
    },
    {
      id: 'kingdom', t: 'The Kingdom and Republic of Iraq', y: '1920 – 2003',
      d: 'Iraq gained independence in 1932 and grew rich on oil; after the 1958 revolution came an era of military governments, the Baath party and many wars.',
      ev: [
        { n: 'Revolt of 1920', y: '1920', lat: 32.03, lon: 44.40, approx: true, k: 'battle', vn: 'Iraqi tribes and clerics', vs: 'British army', d: 'Iraqis rose up against British rule; the next year Britain set up a kingdom and put Faisal I on the throne.' },
        { n: 'Baba Gurgur oil well', y: '1927', lat: 35.517, lon: 44.322, approx: true, k: 'event', d: 'Oil gushed 15 m high for many days at Kirkuk; nearby is an "eternal flame" of burning gas that has burned for thousands of years.' },
        { n: 'Iraqi independence', y: '1932', lat: 33.31, lon: 44.37, approx: true, k: 'event', vn: 'King Faisal I', d: 'Iraq was the first Arab country to join the League of Nations.' },
        { n: 'July 14 Revolution', y: '1958', lat: 33.31, lon: 44.37, k: 'event', vn: 'Abd al-Karim Qasim', vs: 'King Faisal II', d: 'Army officers overthrew the monarchy and proclaimed the Republic of Iraq.' },
        { n: 'Iran–Iraq War', y: '1980 – 1988', lat: 30.44, lon: 48.17, approx: true, k: 'battle', vn: 'Saddam Hussein', vs: 'Iran', d: 'An 8-year war along the border that killed hundreds of thousands while the two sides barely changed territory.' },
        { n: 'Halabja tragedy', y: 'Mar 16, 1988', lat: 35.18, lon: 45.99, k: 'event', vs: 'Saddam Hussein\'s government', d: 'A Kurdish town was attacked with chemical weapons, killing about 5,000 civilians.' },
        { n: 'Iraq invades Kuwait', y: 'Aug 2, 1990', lat: 29.37, lon: 47.98, k: 'battle', vn: 'Saddam Hussein', vs: 'Kuwait', d: 'Iraqi troops took Kuwait in just two days; the United Nations demanded that Iraq withdraw.' },
        { n: 'Gulf War', y: 'Jan – Feb 1991', lat: 30.0, lon: 47.5, approx: true, k: 'battle', vn: 'Saddam Hussein', vs: 'US-led coalition', d: 'After six weeks of air strikes and 100 hours of ground fighting, Iraqi forces were pushed out of Kuwait; Iraq suffered sanctions for many years.' }
      ]
    },
    {
      id: 'today', t: 'Iraq after 2003', y: '2003 – present',
      d: 'Saddam Hussein\'s regime was overthrown; Iraq went through sectarian conflict and the war against the IS group, then gradually stabilized and rebuilt.',
      ev: [
        { n: 'Coalition attacks Iraq', y: 'Mar – Apr 2003', lat: 33.314, lon: 44.420, k: 'battle', vn: 'Saddam Hussein', vs: 'US–British coalition', d: 'On April 9, 2003 Baghdad fell, and the statue of Saddam in Firdos Square was pulled down.' },
        { n: 'Saddam Hussein captured', y: 'Dec 13, 2003', lat: 34.46, lon: 43.79, approx: true, k: 'event', vn: 'Saddam Hussein', d: 'American soldiers found him hiding in a hole near his hometown of Tikrit; he was executed after an Iraqi court trial in 2006.' },
        { n: 'New constitution', y: '2005', lat: 33.31, lon: 44.37, k: 'event', d: 'The people voted to adopt a federal constitution; the Kurdistan region has an autonomous government.' },
        { n: 'Asian Cup champions', y: 'Jul 29, 2007', lat: -6.218, lon: 106.802, k: 'event', vn: 'Captain Younis Mahmoud', vs: 'Saudi Arabia', d: 'While the country was sunk in violence, the Iraqi team won the Asian title in Jakarta, and the whole nation poured into the streets to celebrate.' },
        { n: 'IS captures Mosul', y: 'Jun 2014', lat: 36.34, lon: 43.13, k: 'battle', vn: 'Iraqi army', vs: 'IS group', d: 'The IS group seized the second-largest city and many areas in the north, and attacked the Yazidis on Mount Sinjar.' },
        { n: 'Liberation of Mosul', y: 'Oct 2016 – Jul 2017', lat: 36.34, lon: 43.13, k: 'battle', vn: 'Iraqi army, Kurdish Peshmerga forces', vs: 'IS group', d: 'After nine months of fighting in the old city, Mosul was freed but heavily destroyed.' },
        { n: 'Pope visits Ur', y: 'Mar 2021', lat: 30.962, lon: 46.103, k: 'event', d: 'The first time a pope came to Iraq; he prayed with members of different religions at Ur, traditionally the homeland of Abraham.' },
        { n: 'Gulf Cup in Basra', y: 'Jan 2023', lat: 30.53, lon: 47.79, approx: true, k: 'event', vn: 'Iraq national team', vs: 'Oman', d: 'Basra hosted the tournament for the first time in over 40 years, and Iraq won at home in front of tens of thousands of fans.' }
      ]
    }
  ]
};
