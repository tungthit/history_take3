// Malaysia history for the Geo-Flight history layer (English text).
export default {
  iso: 'my', name: 'Malaysia', flag: '🇲🇾',
  eras: [
    {
      id: 'early', t: 'Ancient times', y: '~40,000 years ago – 1400',
      d: 'The Malay Peninsula and the island of Borneo were inhabited very early; trading ports such as ancient Kedah lay on the sea route linking India with China.',
      ev: [
        { n: 'Niah Cave', y: '~40,000 years ago', lat: 3.81, lon: 113.78, k: 'event', d: 'In a huge limestone cave in Sarawak, archaeologists found a modern human skull among the oldest in Southeast Asia.' },
        { n: 'Perak Man', y: '~11,000 years ago', lat: 5.10, lon: 100.97, approx: true, k: 'event', d: 'The oldest almost complete human skeleton found on the Malay Peninsula, in the Lenggong Valley.' },
        { n: 'Bujang Valley (ancient Kedah)', y: '~2nd – 14th century', lat: 5.735, lon: 100.42, approx: true, k: 'event', d: 'Dozens of temple foundations and iron-smelting sites show this was once a busy trading port in contact with India.' },
        { n: 'Chola attack on Kedah', y: '1025', lat: 5.735, lon: 100.42, approx: true, k: 'battle', vs: 'King Rajendra Chola I (India)', d: 'A Chola fleet from southern India attacked and took Kadaram (Kedah), a major port of the Srivijaya empire.' }
      ]
    },
    {
      id: 'malacca', t: 'The Malacca Sultanate', y: '~1400 – 1511',
      d: 'Malacca became the richest trading port in Southeast Asia, where merchant ships from Arabia, India and China met; Malay-Muslim culture spread throughout the region.',
      ev: [
        { n: 'Legend of the mouse deer', y: '~1400', lat: 2.19, lon: 102.25, approx: true, k: 'legend', vn: 'Parameswara', d: 'Seeing a small mouse deer kick a hunting dog into the river, Parameswara took it as a good omen and founded Malacca there.' },
        { n: 'Zheng He visits Malacca', y: '1409', lat: 2.198, lon: 102.255, approx: true, k: 'event', vn: 'Parameswara', d: 'Ming dynasty fleets called at Malacca several times; Chinese protection kept Siam from daring to attack the young port.' },
        { n: 'Princess Hang Li Po', y: 'Legend', lat: 2.198, lon: 102.255, k: 'legend', vn: 'Sultan Mansur Shah', d: 'According to Malay chronicles, a Ming princess came to marry the king of Malacca; her attendants lived on Bukit Cina hill.' },
        { n: 'Repelling the Siamese', y: '1456', lat: 2.19, lon: 102.25, approx: true, k: 'battle', vn: 'Chief Minister Tun Perak', vs: 'Siamese army (Ayutthaya)', d: 'Malacca\'s ablest chief minister drove back a Siamese fleet and kept the sultanate independent.' },
        { n: 'Hang Tuah', y: 'Legend', lat: 2.19, lon: 102.25, approx: true, k: 'legend', vn: 'Hang Tuah', d: 'The most loyal warrior in Malay tales, famous for the saying "The Malays will never vanish from the earth".' },
        { n: 'Portuguese capture Malacca', y: '1511', lat: 2.19, lon: 102.25, k: 'battle', vn: 'Sultan Mahmud Shah', vs: 'Afonso de Albuquerque (Portugal)', d: 'After more than a month of fighting, Malacca fell; the king fled south and founded the kingdom of Johor.' }
      ]
    },
    {
      id: 'colonial', t: 'The Portuguese, Dutch and British periods', y: '1511 – 1941',
      d: 'Malacca passed from the Portuguese to the Dutch; from the late 18th century the British founded Penang and gradually took over the Malay states, while Sarawak had its "White Rajahs".',
      ev: [
        { n: 'A Famosa fortress', y: '1512', lat: 2.1917, lon: 102.2503, k: 'event', d: 'The Portuguese built the fortress with stone taken from temples and tombs; today only the Porta de Santiago gate remains.' },
        { n: 'Dutch capture Malacca', y: '1641', lat: 2.19, lon: 102.25, k: 'battle', vn: 'Kingdom of Johor (Dutch ally)', vs: 'Portuguese army', d: 'The Dutch and Johor besieged Malacca for months; the red Stadthuys town hall still stands today.' },
        { n: 'Francis Light founds Penang', y: '1786', lat: 5.4207, lon: 100.3438, k: 'event', vn: 'Sultan Abdullah Mukarram Shah (Kedah)', vs: 'Francis Light (British East India Company)', d: 'The British founded the trading port of George Town on Penang Island, the start of British influence on the Malay Peninsula.' },
        { n: 'Anglo-Dutch Treaty', y: '1824', lat: 51.507, lon: -0.128, k: 'event', d: 'The two European powers divided the region in two: north of the Strait of Malacca to Britain, and south (today\'s Indonesia) to the Dutch.' },
        { n: 'The "White Rajah" of Sarawak', y: '1841', lat: 1.558, lon: 110.344, k: 'event', vn: 'James Brooke', d: 'The British adventurer was made ruler of Sarawak by the Sultan of Brunei; the Brooke family ruled here for almost 100 years.' },
        { n: 'Birth of Kuala Lumpur', y: '1857', lat: 3.149, lon: 101.696, k: 'event', vn: 'Raja Abdullah, Yap Ah Loy', d: 'Miners searching for tin settled where two rivers meet; the name Kuala Lumpur means "muddy river mouth".' },
        { n: 'Pangkor Treaty', y: '1874', lat: 4.22, lon: 100.57, k: 'event', vn: 'Raja Abdullah (Perak)', vs: 'Britain', d: 'The ruler of Perak had to accept a British Resident as adviser on everything except Malay religion and customs.' },
        { n: 'Perak War', y: '1875 – 1876', lat: 4.10, lon: 100.91, approx: true, k: 'battle', vn: 'Dato Maharaja Lela', vs: 'British army', d: 'The British Resident J. W. W. Birch was killed at Pasir Salak, and Britain sent troops in reprisal.' },
        { n: 'First rubber trees', y: '1877', lat: 4.77, lon: 100.94, approx: true, k: 'event', d: 'Rubber seeds from Brazil were planted as a trial in Kuala Kangsar; Malaya later became the world\'s largest rubber producer.' }
      ]
    },
    {
      id: 'merdeka', t: 'War and independence', y: '1941 – 1963',
      d: 'Japan occupied Malaya in the Second World War; after the war the nationalist movement won independence in 1957 and Malaysia was formed in 1963.',
      ev: [
        { n: 'Japanese landing at Kota Bharu', y: '8 Dec 1941', lat: 6.17, lon: 102.33, approx: true, k: 'battle', vs: 'Japanese army', d: 'Japanese troops landed on the Kelantan coast a few hours before the attack on Pearl Harbor, then advanced south by bicycle.' },
        { n: 'Founding of UMNO', y: '1946', lat: 1.46, lon: 103.76, k: 'event', vn: 'Onn Jaafar', d: 'The Malays opposed Britain\'s Malayan Union plan and founded the United Malays National Organisation in Johor Bahru.' },
        { n: 'Malayan Emergency', y: '1948 – 1960', lat: 4.82, lon: 101.07, approx: true, k: 'battle', vs: 'Malayan Communist Party (Chin Peng)', d: 'An armed conflict between the government and guerrilla forces that lasted 12 years in the jungle.' },
        { n: 'Independence Day (Merdeka)', y: '31 Aug 1957', lat: 3.142, lon: 101.700, k: 'event', vn: 'Tunku Abdul Rahman', d: 'At Merdeka Stadium, the first Prime Minister raised his hand and shouted "Merdeka!" (Independence!) seven times.' },
        { n: 'Formation of Malaysia', y: '16 Sep 1963', lat: 3.142, lon: 101.700, k: 'event', vn: 'Tunku Abdul Rahman', d: 'Malaya joined with Singapore, Sabah and Sarawak to form the Federation of Malaysia.' }
      ]
    },
    {
      id: 'malaysia', t: 'Modern Malaysia', y: '1963 – present',
      d: 'Malaysia overcame difficult early years to become a dynamic industrial economy with many peoples and cultures.',
      ev: [
        { n: 'Confrontation with Indonesia', y: '1963 – 1966', lat: 1.2, lon: 111.5, approx: true, k: 'battle', vs: 'Indonesia (Sukarno)', d: 'Indonesia opposed the creation of Malaysia; fighting took place along the border on the island of Borneo.' },
        { n: 'Singapore separates', y: '9 Aug 1965', lat: 3.142, lon: 101.700, approx: true, k: 'event', vn: 'Tunku Abdul Rahman', vs: 'Singapore (Lee Kuan Yew)', d: 'Because of political disagreements, Singapore left the Federation and became an independent country.' },
        { n: 'Founding of ASEAN', y: '8 Aug 1967', lat: 13.75, lon: 100.50, k: 'event', vn: 'Deputy Prime Minister Abdul Razak', d: 'Malaysia was one of the five founding countries of the Association of Southeast Asian Nations, in Bangkok.' },
        { n: 'The 13 May incident', y: '13 May 1969', lat: 3.15, lon: 101.70, approx: true, k: 'event', d: 'Riots between ethnic communities in Kuala Lumpur after an election; the New Economic Policy was introduced in 1971.' },
        { n: 'Proton Saga car', y: '1985', lat: 3.07, lon: 101.52, approx: true, k: 'event', vn: 'Prime Minister Mahathir Mohamad', d: 'Malaysia\'s first national car rolled off the line, a symbol of the drive for industrialization.' },
        { n: 'Petronas Twin Towers', y: '1998', lat: 3.1579, lon: 101.7116, k: 'event', d: 'At 452 m, they were the tallest buildings in the world until 2004; the two towers are joined by a bridge on the 41st and 42nd floors.' },
        { n: 'Commonwealth Games', y: '1998', lat: 3.055, lon: 101.691, k: 'event', d: 'Kuala Lumpur was the first Asian city to host the Games, at the national stadium in Bukit Jalil.' },
        { n: 'Disappearance of flight MH370', y: '8 Mar 2014', lat: 2.745, lon: 101.71, approx: true, k: 'event', d: 'The plane carrying 239 people took off from Kuala Lumpur and vanished from radar; it remains one of the greatest mysteries in aviation.' },
        { n: 'Flight MH17 shot down', y: '17 Jul 2014', lat: 48.14, lon: 38.65, k: 'event', d: 'The plane flying from Amsterdam to Kuala Lumpur was shot down by a missile over the conflict zone in eastern Ukraine; 298 people died.' },
        { n: 'First change of ruling party', y: '9 May 2018', lat: 2.93, lon: 101.69, approx: true, k: 'event', vn: 'Mahathir Mohamad', d: 'The opposition alliance won the election, ending more than 60 years of rule by the old coalition; Mahathir became prime minister at age 92.' },
        { n: 'Merdeka 118 Tower', y: '2023', lat: 3.1415, lon: 101.7003, k: 'event', vn: 'Prime Minister Anwar Ibrahim', d: 'The 679 m tower in Kuala Lumpur was completed, becoming the second tallest building in the world.' }
      ]
    }
  ]
};
