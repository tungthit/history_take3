// Nepal history for the Geo-Flight history layer (English text).
export default {
  iso: 'np', name: 'Nepal', flag: '🇳🇵',
  eras: [
    {
      id: 'ancient', t: 'The land of the Buddha and the Licchavis', y: '~600 BCE – 879',
      d: 'The Buddha was born on the Terai plain; in the Kathmandu Valley, the Licchavis left behind Nepal\'s oldest temples and stone inscriptions.',
      ev: [
        { n: 'The Kathmandu Valley was once a lake', y: 'Legend', lat: 27.66, lon: 85.29, k: 'legend', vn: 'The bodhisattva Manjushri', d: 'The story says Manjushri cut through the hill at Chobhar with his sword to let the lake water drain away; geologists confirm the valley was once a lake.' },
        { n: 'Birth of the Buddha at Lumbini', y: '~6th – 5th century BCE', lat: 27.469, lon: 83.276, k: 'event', vn: 'Prince Siddhartha', d: 'Queen Maya gave birth to the prince under a tree in the Lumbini garden; the site is now a World Heritage Site.' },
        { n: 'Capital Kapilavastu', y: '~6th century BCE', lat: 27.57, lon: 83.05, approx: true, k: 'event', vn: 'King Suddhodana', d: 'Many archaeologists believe the ruins at Tilaurakot are where the prince lived until age 29; this is still debated.' },
        { n: 'Ashoka\'s pillar', y: '~249 BCE', lat: 27.469, lon: 83.276, k: 'event', vn: 'King Ashoka (Maurya)', d: 'King Ashoka came on pilgrimage and set up a stone pillar inscribed "the Buddha was born here", the proof that identifies Lumbini.' },
        { n: 'Swayambhunath Stupa', y: '~5th century', lat: 27.715, lon: 85.290, k: 'event', d: 'The hilltop stupa with Buddha\'s eyes looking in four directions is jokingly called the "Monkey Temple" because of its many monkeys.' },
        { n: 'Changu Narayan inscription', y: '464', lat: 27.716, lon: 85.428, k: 'event', vn: 'King Manadeva (Licchavi)', d: 'Nepal\'s oldest dated stone inscription, telling of the exploits of King Manadeva.' },
        { n: 'Princess Bhrikuti goes to Tibet', y: '~640', lat: 29.65, lon: 91.13, approx: true, vn: 'Princess Bhrikuti', vs: 'King Songtsen Gampo (Tibet)', k: 'event', d: 'The Nepali princess married the king of Tibet and brought a Buddha statue with her, helping to bring Buddhism to Tibet.' }
      ]
    },
    {
      id: 'malla', t: 'The Malla period', y: '1200 – 1768',
      d: 'The Malla kings turned the Kathmandu Valley into three kingdoms, Kathmandu, Patan and Bhaktapur, with temples, squares and fine Newar art.',
      ev: [
        { n: 'Earthquake of 1255', y: '1255', lat: 27.704, lon: 85.307, approx: true, k: 'event', vn: 'King Abhaya Malla', d: 'The first major earthquake recorded in Nepal, it killed about a third of the valley\'s people and the king himself.' },
        { n: 'Araniko builds the White Pagoda in Beijing', y: '1279', lat: 39.925, lon: 116.355, k: 'event', vn: 'Architect Araniko', vs: 'Kublai Khan (Yuan dynasty)', d: 'The young Newar craftsman was invited to the Yuan court and built the white stupa of the Miaoying Temple, which still stands in Beijing today.' },
        { n: 'Khasa kingdom in the west', y: '~12th – 14th century', lat: 29.27, lon: 82.13, approx: true, k: 'event', vn: 'King Prithvi Malla', d: 'The capital Sinja in the Karnali region is where the Nepali language, written in the Devanagari script, began to develop.' },
        { n: 'Bengal army sweeps into the valley', y: '1349', lat: 27.704, lon: 85.307, approx: true, k: 'battle', vn: 'The Malla princes', vs: 'Shamsuddin Ilyas Shah (Bengal)', d: 'The army of the Bengal sultan plundered the Kathmandu Valley for a few days and then withdrew.' },
        { n: 'Division into three kingdoms', y: '1482', lat: 27.672, lon: 85.428, approx: true, k: 'event', vn: 'King Yaksha Malla', d: 'After Yaksha Malla died, the valley split into Kathmandu, Bhaktapur and later Patan, which competed with one another in building temples.' },
        { n: 'Krishna Temple in Patan', y: '1637', lat: 27.673, lon: 85.325, k: 'event', vn: 'King Siddhi Narasimha Malla', d: 'A stone temple in the shikhara style with carvings telling stories from the epics Mahabharata and Ramayana.' },
        { n: 'Nyatapola Temple in Bhaktapur', y: '1702', lat: 27.671, lon: 85.429, k: 'event', vn: 'King Bhupatindra Malla', d: 'The five-roofed temple, the tallest in Nepal, stood firm through both of the great earthquakes of 1934 and 2015.' }
      ]
    },
    {
      id: 'unification', t: 'The unification of Nepal', y: '1743 – 1816',
      d: 'King Prithvi Narayan Shah of the small state of Gorkha united the kingdoms into the country of Nepal; the Gorkha soldiers became famous for their courage.',
      ev: [
        { n: 'Prithvi Narayan Shah takes the throne at Gorkha', y: '1743', lat: 28.006, lon: 84.628, k: 'event', vn: 'Prithvi Narayan Shah', d: 'The 20-year-old king of the hill state of Gorkha began his plan to unite all the small kingdoms.' },
        { n: 'Battle of Kirtipur', y: '1767', lat: 27.678, lon: 85.278, k: 'battle', vn: 'Prithvi Narayan Shah', vs: 'Defenders of Kirtipur (Malla)', d: 'After two failures, the Gorkha army finally took the hilltop town, opening the way into Kathmandu.' },
        { n: 'Battle of Sindhuli Gadhi', y: '1767', lat: 27.28, lon: 85.95, approx: true, k: 'battle', vn: 'Gorkha army', vs: 'Captain Kinloch (British East India Company)', d: 'The Gorkhas used the forested, mountainous terrain to drive back the British force sent to help the king of Kathmandu.' },
        { n: 'Capture of Kathmandu', y: '25 Sep 1768', lat: 27.704, lon: 85.307, k: 'battle', vn: 'Prithvi Narayan Shah', vs: 'King Jaya Prakash Malla', d: 'The Gorkha army entered the city while the people were attending the Indra Jatra festival; Kathmandu became the capital of the united Nepal.' },
        { n: 'War with the Qing dynasty', y: '1788 – 1792', lat: 27.93, lon: 85.17, approx: true, k: 'battle', vn: 'Bahadur Shah', vs: 'Fuk\'anggan (Qing dynasty)', d: 'After Nepal attacked Tibet, the Qianlong Emperor\'s army advanced close to Nuwakot; the two sides made peace and Nepal paid tribute to the Qing.' },
        { n: 'Battle of Nalapani', y: '1814', lat: 30.33, lon: 78.10, approx: true, k: 'battle', vn: 'Balbhadra Kunwar', vs: 'General Rollo Gillespie (Britain)', d: 'Fewer than 600 Gorkhas held a hilltop fort against thousands of British soldiers; the British general was killed.' },
        { n: 'Treaty of Sugauli', y: '1816', lat: 26.76, lon: 84.73, approx: true, k: 'event', vs: 'British East India Company', d: 'Nepal lost about a third of its territory but kept its independence; the British began recruiting Gurkha soldiers.' }
      ]
    },
    {
      id: 'rana', t: 'The Rana regime', y: '1846 – 1951',
      d: 'The Rana family held the post of prime minister by inheritance, leaving the king as a figurehead; Nepal was almost closed to the world.',
      ev: [
        { n: 'Kot Massacre', y: '1846', lat: 27.704, lon: 85.307, k: 'event', vn: 'Jung Bahadur Rana', d: 'After a night of bloodshed in the Kot courtyard beside the palace, Jung Bahadur took power, beginning 104 years of Rana rule.' },
        { n: 'Jung Bahadur visits Britain', y: '1850', lat: 51.501, lon: -0.142, k: 'event', vn: 'Jung Bahadur Rana', d: 'The first time a Nepali leader visited Europe; he was received by Queen Victoria in London.' },
        { n: 'Singha Durbar Palace', y: '1908', lat: 27.698, lon: 85.324, k: 'event', vn: 'Chandra Shumsher Rana', d: 'The largest European-style palace in Asia at the time, now the seat of Nepal\'s government.' },
        { n: 'Abolition of slavery', y: '1924', lat: 27.698, lon: 85.324, approx: true, k: 'event', vn: 'Chandra Shumsher Rana', d: 'The state paid ransoms to free about 50,000 slaves across Nepal.' },
        { n: 'Nepal–Bihar earthquake', y: '1934', lat: 27.671, lon: 85.429, approx: true, k: 'event', d: 'The earthquake killed thousands of people and destroyed many temples in Bhaktapur and Kathmandu.' },
        { n: 'Revolution of 1951', y: '1950 – 1951', lat: 27.704, lon: 85.307, k: 'event', vn: 'King Tribhuvan, Nepali Congress Party', vs: 'Rana regime', d: 'King Tribhuvan took refuge in the Indian embassy and then went to Delhi; rebel forces made the Ranas hand over power, and the king returned.' }
      ]
    },
    {
      id: 'kingdom', t: 'The kingdom opens up', y: '1951 – 1990',
      d: 'Nepal opened to foreign visitors; climbers one after another conquered the world\'s highest peaks, while the king took back power.',
      ev: [
        { n: 'Conquest of Annapurna', y: '1950', lat: 28.596, lon: 83.820, k: 'event', d: 'The first peak above 8,000 m ever climbed; Maurice Herzog\'s French team suffered severe frostbite on the way down.' },
        { n: 'Summit of Everest', y: '29 May 1953', lat: 27.988, lon: 86.925, k: 'event', vn: 'Tenzing Norgay, Edmund Hillary (New Zealand)', d: 'The Sherpa Tenzing Norgay and Hillary were the first to stand on the roof of the world, 8,849 m high.' },
        { n: 'Nepal joins the United Nations', y: '1955', lat: 40.749, lon: -73.968, k: 'event', vn: 'King Mahendra', d: 'Nepal became a member of the United Nations, widening its relations with many countries.' },
        { n: 'Panchayat system', y: '1960', lat: 27.715, lon: 85.318, k: 'event', vn: 'King Mahendra', vs: 'Prime Minister B. P. Koirala', d: 'The king dissolved the elected government, banned political parties and set up a party-less "panchayat" council system.' },
        { n: 'Sagarmatha National Park', y: '1976 – 1979', lat: 27.93, lon: 86.71, approx: true, k: 'event', d: 'The area around Everest, home of the Sherpa people, became a national park and then a World Heritage Site.' },
        { n: 'People\'s Movement of 1990', y: '1990', lat: 27.704, lon: 85.307, k: 'event', vn: 'Nepali Congress Party, left-wing parties', vs: 'King Birendra', d: 'Mass protests forced the king to accept a multiparty system and a constitutional monarchy.' }
      ]
    },
    {
      id: 'conflict', t: 'Civil war and the end of the monarchy', y: '1996 – 2008',
      d: 'The Maoist insurgency lasted 10 years; after the royal tragedy and a second people\'s movement, Nepal abolished the monarchy.',
      ev: [
        { n: 'Maoist insurgency begins', y: '1996', lat: 28.30, lon: 82.65, approx: true, k: 'battle', vn: 'Government of Nepal', vs: 'Communist Party of Nepal (Maoist), Prachanda', d: 'The uprising began in the western hill districts such as Rolpa and Rukum; about 17,000 people died over ten years.' },
        { n: 'The royal massacre', y: '1 Jun 2001', lat: 27.715, lon: 85.318, k: 'event', vn: 'King Birendra', d: 'At a dinner in Narayanhiti Palace, Crown Prince Dipendra shot dead the king, the queen and many other members of the royal family.' },
        { n: 'Battle of Beni', y: '2004', lat: 28.35, lon: 83.57, k: 'battle', vn: 'Royal Nepalese Army', vs: 'Maoist forces', d: 'Thousands of Maoist fighters attacked the town of Beni, one of the biggest battles of the civil war.' },
        { n: 'Second People\'s Movement', y: 'Apr 2006', lat: 27.704, lon: 85.307, k: 'event', vn: 'Seven Party Alliance, the Maoists', vs: 'King Gyanendra', d: '19 days of general strikes and protests forced King Gyanendra to restore Parliament.' },
        { n: 'Comprehensive Peace Agreement', y: '21 Nov 2006', lat: 27.704, lon: 85.307, approx: true, k: 'event', vn: 'Prime Minister G. P. Koirala, Prachanda', d: 'The government and the Maoists signed an agreement ending the civil war, and Maoist fighters moved into camps under UN supervision.' },
        { n: 'Nepal becomes a republic', y: '28 May 2008', lat: 27.69, lon: 85.33, approx: true, k: 'event', vn: 'Constituent Assembly, President Ram Baran Yadav', d: 'The Assembly voted to abolish the 240-year monarchy of the Shah dynasty; King Gyanendra left the palace.' }
      ]
    },
    {
      id: 'republic', t: 'The Federal Democratic Republic of Nepal', y: '2008 – present',
      d: 'Nepal survived a great earthquake and adopted a new federal constitution; politics remains turbulent, with protests in 2025 as the high point.',
      ev: [
        { n: 'Gorkha earthquake', y: '25 Apr 2015', lat: 28.23, lon: 84.73, k: 'event', d: 'The magnitude 7.8 earthquake, centered near Barpak, killed nearly 9,000 people and toppled the Dharahara tower and many old temples in Kathmandu.' },
        { n: 'Federal constitution', y: '20 Sep 2015', lat: 27.69, lon: 85.33, approx: true, k: 'event', vn: 'Constituent Assembly', d: 'The constitution divided Nepal into 7 provinces; the same year Bidya Devi Bhandari became the first woman President.' },
        { n: 'NepaliSat-1 satellite', y: '2019', lat: 37.834, lon: -75.488, k: 'event', d: 'The first small satellite built by Nepali engineers was launched from Wallops (USA) to the International Space Station and then released into orbit.' },
        { n: 'New height of Everest', y: '2020', lat: 27.988, lon: 86.925, k: 'event', d: 'Nepal and China jointly announced the official height of 8,848.86 m after re-measuring.' },
        { n: 'Pokhara plane crash', y: '15 Jan 2023', lat: 28.20, lon: 84.02, approx: true, k: 'event', d: 'A Yeti Airlines plane crashed into the Seti River gorge as it was about to land, killing 72 people.' },
        { n: '"Gen Z" protests of 2025', y: '8 – 12 Sep 2025', lat: 27.69, lon: 85.33, approx: true, k: 'event', vn: 'Young protesters, Sushila Karki', vs: 'K. P. Sharma Oli government', d: 'A ban on social media sparked huge protests and many deaths; Prime Minister Oli resigned, and Sushila Karki became the first woman interim prime minister.' }
      ]
    }
  ]
};
