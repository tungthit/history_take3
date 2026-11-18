// Japan history for the Geo-Flight history layer (English text).
export default {
  iso: 'jp', name: 'Japan', flag: '🇯🇵',
  eras: [
    {
      id: 'codai', t: 'Jōmon – Yayoi – Kofun Periods', y: '~14000 BCE – 538',
      d: 'From hunter-gatherers who made cord-marked pottery, to wet-rice farming and giant keyhole-shaped tombs.',
      ev: [
        { n: 'Sannai-Maruyama Site', y: '~3900 – 2200 BCE', lat: 40.81, lon: 140.70, k: 'event', vn: 'The Jōmon people', d: 'An ancient village with giant six-post wooden towers, where the Jōmon people lived for more than 1,500 years.' },
        { n: 'Emperor Jinmu', y: 'Legend, 660 BCE', lat: 34.49, lon: 135.79, k: 'legend', vn: 'Emperor Jinmu', d: 'In myth, a descendant of the Sun Goddess Amaterasu took the throne at Kashihara as the first Emperor.' },
        { n: 'Yoshinogari Village', y: '~300 BCE – 300 CE', lat: 33.32, lon: 130.38, k: 'event', vn: 'The Yayoi people', d: 'A large Yayoi village with moats and watchtowers, when wet-rice farming and bronze and iron arrived from the mainland.' },
        { n: 'Queen Himiko', y: '~239', lat: 34.54, lon: 135.85, approx: true, k: 'event', vn: 'Queen Himiko', d: 'The queen of Yamatai sent envoys to the Wei dynasty (China); to this day no one knows where Yamatai was.' },
        { n: 'Daisen Tomb', y: '5th century', lat: 34.564, lon: 135.487, k: 'event', vn: 'Emperor Nintoku', d: 'A keyhole-shaped tomb almost 500 m long, one of the largest tombs in the world.' }
      ]
    },
    {
      id: 'asukanara', t: 'Asuka – Nara Periods', y: '538 – 794',
      d: 'Buddhism and Chinese writing arrive from the mainland; Japan builds a state on the Tang model with its capital at Nara.',
      ev: [
        { n: 'Buddhism Reaches Japan', y: '538', lat: 34.47, lon: 135.82, k: 'event', vn: 'The Soga clan', d: 'The king of Baekje sent Buddha statues and scriptures to the Asuka court.' },
        { n: 'Hōryū-ji Temple', y: '607', lat: 34.614, lon: 135.734, k: 'event', vn: 'Prince Shōtoku', d: 'Prince Shōtoku wrote the 17-article Constitution and founded a temple with the oldest wooden buildings in the world.' },
        { n: 'Taika Reforms', y: '645', lat: 34.47, lon: 135.82, k: 'event', vn: 'Prince Naka no Ōe, Nakatomi no Kamatari', d: 'They overthrew the Soga clan and put land under the court, Tang-style.' },
        { n: 'Battle of Hakusukinoe (Baekgang)', y: '663', lat: 35.95, lon: 126.65, approx: true, k: 'battle', vn: 'Yamato court', vs: 'Tang dynasty, Silla', d: 'The Japanese fleet sent to rescue Baekje was crushed at the mouth of the Baekgang River (in present-day Korea).' },
        { n: 'Jinshin War', y: '672', lat: 34.97, lon: 135.91, k: 'battle', vn: 'Prince Ōama (Emperor Tenmu)', vs: 'Prince Ōtomo', d: 'The war over the throne ended at the Seta bridge; the winner became Emperor Tenmu.' },
        { n: 'Capital Heijō-kyō (Nara)', y: '710', lat: 34.691, lon: 135.796, k: 'event', vn: 'Empress Genmei', d: "The first permanent capital, with a chessboard of streets modeled on Chang'an." },
        { n: 'Great Buddha of Tōdai-ji', y: '752', lat: 34.689, lon: 135.840, k: 'event', vn: 'Emperor Shōmu', d: 'A 15 m bronze Buddha in one of the largest wooden halls in the world; deer wander freely around the temple.' }
      ]
    },
    {
      id: 'heian', t: 'Heian Period', y: '794 – 1185',
      d: 'Four centuries of court culture in Kyoto with kana script and The Tale of Genji, ending with the Genpei War between the Taira and Minamoto clans.',
      route: { t: "Minamoto no Yoshitsune's campaign route 1184 – 1185", pts: [[35.01, 135.77], [34.64, 135.12], [34.36, 134.10], [33.96, 130.96]] },
      ev: [
        { n: 'Capital Heian-kyō (Kyoto)', y: '794', lat: 35.02, lon: 135.76, k: 'event', vn: 'Emperor Kanmu', d: 'Kyoto was the capital for more than 1,000 years, until 1869.' },
        { n: 'Isawa Castle', y: '802', lat: 39.13, lon: 141.13, k: 'battle', vn: 'Sakanoue no Tamuramaro', vs: 'Aterui (Emishi)', d: "The first \"Seii Taishōgun\" brought the northeast under the court's control." },
        { n: 'The Tale of Genji', y: '~1008', lat: 35.02, lon: 135.76, k: 'event', vn: 'Murasaki Shikibu', d: "A court lady wrote one of the world's first novels." },
        { n: 'Hōgen and Heiji Rebellions', y: '1156 – 1160', lat: 35.01, lon: 135.77, k: 'battle', vn: 'Taira no Kiyomori', vs: 'Minamoto no Yoshitomo', d: 'Two clashes inside the capital brought the warrior Taira clan to power.' },
        { n: 'Itsukushima Shrine', y: '1168', lat: 34.296, lon: 132.320, k: 'event', vn: 'Taira no Kiyomori', d: 'A shrine whose red torii gate seems to float on the sea at high tide.' },
        { n: 'Battle of Uji', y: '1180', lat: 34.89, lon: 135.81, k: 'battle', vn: 'Minamoto no Yorimasa', vs: 'Taira no Tomomori', d: 'The opening battle of the Genpei War; the Minamoto pulled up the planks of Uji Bridge to block the enemy.' },
        { n: 'Battle of Kurikara', y: '1183', lat: 36.67, lon: 136.80, k: 'battle', vn: 'Minamoto no Yoshinaka', vs: 'Taira no Koremori', d: 'Legend says Yoshinaka tied torches to the horns of oxen and drove the herd into the Taira camp at night.' },
        { n: 'Battle of Ichi-no-Tani', y: '1184', lat: 34.64, lon: 135.12, k: 'battle', vn: 'Minamoto no Yoshitsune', vs: 'Taira no Munemori', d: 'Yoshitsune led his cavalry down a steep cliff and struck the Taira camp from behind.' },
        { n: 'Battle of Yashima', y: '1185', lat: 34.36, lon: 134.10, k: 'battle', vn: 'Minamoto no Yoshitsune, Nasu no Yoichi', vs: 'Taira no Munemori', d: 'The archer Nasu no Yoichi hit a fan set up on a boat amid the waves.' },
        { n: 'Battle of Dan-no-ura', y: '1185', lat: 33.96, lon: 130.96, k: 'battle', vn: 'Minamoto no Yoshitsune', vs: 'Taira no Tomomori', d: 'The naval battle in the Kanmon Strait ended the Taira clan; the child Emperor Antoku died in the sea.' }
      ]
    },
    {
      id: 'kamakura', t: 'Kamakura Shogunate', y: '1185 – 1333',
      d: 'The first government of the warrior class (samurai); it twice repelled the Mongol–Yuan fleet thanks to stone walls and great storms.',
      ev: [
        { n: 'Kamakura Shogunate', y: '1192', lat: 35.32, lon: 139.55, k: 'event', vn: 'Minamoto no Yoritomo', d: 'Yoritomo was named Shōgun and set up a warrior government at Kamakura, far from the Kyoto court.' },
        { n: 'Jōkyū War', y: '1221', lat: 34.89, lon: 135.81, k: 'battle', vn: 'Hōjō Yoshitoki, Hōjō Masako', vs: 'Retired Emperor Go-Toba', d: 'The retired emperor wanted to take back power but lost; the shogunate gripped authority over the whole country.' },
        { n: 'Great Buddha of Kamakura', y: '1252', lat: 35.317, lon: 139.536, k: 'event', vn: 'Kamakura Shogunate', d: 'A bronze Amida Buddha over 11 m tall, sitting in the open air since a tsunami swept away its hall.' },
        { n: 'Mongols Attack Tsushima', y: '1274', lat: 34.29, lon: 129.30, approx: true, k: 'battle', vn: 'Sō Sukekuni', vs: 'Hindu, Hong Dagu (Mongol – Goryeo)', d: "A few dozen warriors on Tsushima Island fought tens of thousands of Kublai Khan's troops." },
        { n: "Battle of Hakata Bay (Bun'ei)", y: '1274', lat: 33.62, lon: 130.38, k: 'battle', vn: 'Hōjō Tokimune, Shōni Kagesuke', vs: 'Hindu (Mongol – Goryeo)', d: 'The Mongols landed with explosive bombs, then suddenly withdrew and ran into a storm on the way home.' },
        { n: 'Genkō Bōrui Stone Wall', y: '1276', lat: 33.59, lon: 130.34, k: 'event', vn: 'Hōjō Tokimune', d: 'A stone wall about 20 km long along Hakata Bay to stop the Mongols from returning.' },
        { n: 'Battle of Kōan – Takashima Island', y: '1281', lat: 33.40, lon: 129.73, k: 'battle', vn: 'Hōjō Tokimune', vs: 'Fan Wenhu, Hindu (Yuan dynasty)', d: 'More than 4,000 warships were sunk by a great storm; the Japanese called it "kamikaze" – the divine wind.' },
        { n: 'Fall of Kamakura', y: '1333', lat: 35.32, lon: 139.55, k: 'battle', vn: 'Nitta Yoshisada', vs: 'Hōjō Takatoki', d: 'Legend says Nitta threw his sword into the sea, and the water drew back so his soldiers could enter Kamakura.' }
      ]
    },
    {
      id: 'muromachi', t: 'Muromachi – Warring States (Sengoku) Periods', y: '1336 – 1573',
      d: 'The Ashikaga shogunate in Kyoto slowly lost power; after the Ōnin War, daimyō lords fought for more than 100 years.',
      ev: [
        { n: 'Battle of Minatogawa', y: '1336', lat: 34.68, lon: 135.17, k: 'battle', vn: 'Kusunoki Masashige', vs: 'Ashikaga Takauji', d: "Kusunoki knew he would lose but went to battle on the Emperor's word; he is remembered as a model of loyalty." },
        { n: 'Kinkaku-ji (Golden Pavilion)', y: '1397', lat: 35.039, lon: 135.729, k: 'event', vn: 'Ashikaga Yoshimitsu', d: 'A gold-leaf temple reflected in a pond, now a symbol of Kyoto.' },
        { n: 'Ōnin War', y: '1467 – 1477', lat: 35.03, lon: 135.76, k: 'battle', vn: 'Hosokawa Katsumoto', vs: 'Yamana Sōzen', d: 'Ten years of fighting turned most of Kyoto to ashes and began the Warring States period.' },
        { n: 'Matchlock Guns Arrive at Tanegashima', y: '1543', lat: 30.37, lon: 130.86, k: 'event', vn: 'Tanegashima Tokitaka', d: 'A ship carrying Portuguese men drifted onto the island; within a few years Japanese smiths were forging guns themselves.' },
        { n: 'Francis Xavier Arrives in Kagoshima', y: '1549', lat: 31.60, lon: 130.56, k: 'event', vn: 'Shimazu Takahisa', d: 'The first missionary to bring Christianity to Japan.' },
        { n: 'Battle of Itsukushima', y: '1555', lat: 34.30, lon: 132.32, k: 'battle', vn: 'Mōri Motonari', vs: 'Sue Harukata', d: 'Mōri lured his enemy onto the sacred island and then struck at night in a storm.' },
        { n: 'Battle of Okehazama', y: '1560', lat: 35.05, lon: 136.98, k: 'battle', vn: 'Oda Nobunaga', vs: 'Imagawa Yoshimoto', d: 'About 2,000 men surprised an army 10 times larger in heavy rain; Oda Nobunaga became famous from here.' },
        { n: 'Fourth Battle of Kawanakajima', y: '1561', lat: 36.62, lon: 138.17, k: 'battle', vn: 'Takeda Shingen', vs: 'Uesugi Kenshin', d: 'Two evenly matched rivals; legend says Kenshin galloped in and slashed straight at Shingen, who parried with an iron fan.' }
      ]
    },
    {
      id: 'thongnhat', t: 'Unification of Japan (Azuchi – Momoyama)', y: '1568 – 1603',
      d: 'Three figures unified the country in turn: Oda Nobunaga, Toyotomi Hideyoshi and Tokugawa Ieyasu.',
      ev: [
        { n: 'Battle of Anegawa', y: '1570', lat: 35.40, lon: 136.33, k: 'battle', vn: 'Oda Nobunaga, Tokugawa Ieyasu', vs: 'Azai Nagamasa, Asakura Yoshikage', d: 'Two alliances fought in the middle of the Ane River, opening the way for Nobunaga to rule the central region.' },
        { n: 'Battle of Mikatagahara', y: '1573', lat: 34.75, lon: 137.73, k: 'battle', vn: 'Tokugawa Ieyasu', vs: 'Takeda Shingen', d: 'Ieyasu was badly beaten; he had his grimacing face painted as a reminder of the lesson.' },
        { n: 'Battle of Nagashino', y: '1575', lat: 34.93, lon: 137.56, k: 'battle', vn: 'Oda Nobunaga, Tokugawa Ieyasu', vs: 'Takeda Katsuyori', d: 'Three thousand gunners behind wooden fences fired in rotation and beat the famous Takeda cavalry.' },
        { n: 'Azuchi Castle', y: '1576 – 1579', lat: 35.155, lon: 136.14, k: 'event', vn: 'Oda Nobunaga', d: 'A magnificent seven-story castle by Lake Biwa, burned just three years after it was finished.' },
        { n: 'Honnō-ji Incident', y: '1582', lat: 35.007, lon: 135.755, k: 'battle', vn: 'Oda Nobunaga', vs: 'Akechi Mitsuhide', d: 'Attacked by surprise at Honnō-ji temple by his own general, Nobunaga died in the flames.' },
        { n: 'Battle of Yamazaki', y: '1582', lat: 34.90, lon: 135.68, k: 'battle', vn: 'Toyotomi Hideyoshi', vs: 'Akechi Mitsuhide', d: "Only 11 days later, Hideyoshi marched back at lightning speed and beat Akechi, taking up Nobunaga's work." },
        { n: 'Osaka Castle', y: '1583', lat: 34.687, lon: 135.526, k: 'event', vn: 'Toyotomi Hideyoshi', d: "The largest castle of its day, the center of Hideyoshi's power." },
        { n: 'Siege of Odawara', y: '1590', lat: 35.251, lon: 139.154, k: 'battle', vn: 'Toyotomi Hideyoshi', vs: 'Hōjō Ujimasa', d: 'Hideyoshi built a whole castle "overnight" on the mountain opposite; the Hōjō surrendered and Japan was unified.' },
        { n: 'Invasion of Korea', y: '1592 – 1598', lat: 35.10, lon: 129.04, k: 'battle', vn: 'Toyotomi Hideyoshi, Konishi Yukinaga, Katō Kiyomasa', vs: 'Joseon Korea, Ming dynasty', d: 'The Japanese army landed at Busan; the seven-year war failed against Yi Sun-sin and the Ming army.' },
        { n: 'Battle of Sekigahara', y: '1600', lat: 35.37, lon: 136.47, k: 'battle', vn: 'Tokugawa Ieyasu', vs: 'Ishida Mitsunari', d: 'More than 150,000 troops fought; some generals of the Western side changed sides mid-battle, and Ieyasu won the whole country.' }
      ]
    },
    {
      id: 'edo', t: 'Edo Period', y: '1603 – 1868',
      d: 'More than 250 years of peace under the Tokugawa shogunate, almost closed to the world, until the American black ships appeared.',
      ev: [
        { n: 'Edo Shogunate', y: '1603', lat: 35.685, lon: 139.753, k: 'event', vn: 'Tokugawa Ieyasu', d: 'Ieyasu became Shōgun at Edo, a small town on the bay that later became the capital Tokyo.' },
        { n: 'Siege of Osaka', y: '1614 – 1615', lat: 34.687, lon: 135.526, k: 'battle', vn: 'Tokugawa Ieyasu', vs: 'Toyotomi Hideyori, Sanada Yukimura', d: 'Sanada Yukimura fought bravely but the castle still fell; the Toyotomi clan came to an end.' },
        { n: 'Shimabara Rebellion', y: '1637 – 1638', lat: 32.63, lon: 130.25, k: 'battle', vn: 'Matsudaira Nobutsuna', vs: 'Amakusa Shirō', d: 'Peasants and Christians rose up over heavy taxes, held out at Hara Castle and were crushed.' },
        { n: 'Dejima Island – the Closed-Country Policy', y: '1641', lat: 32.744, lon: 129.873, k: 'event', vn: 'Tokugawa Iemitsu', d: 'A fan-shaped artificial island in Nagasaki was the only place the Dutch were allowed to trade for over 200 years.' },
        { n: 'The 47 Rōnin (Chūshingura)', y: '1703', lat: 35.638, lon: 139.739, k: 'event', vn: 'Ōishi Yoshio', d: 'The story of 47 samurai who avenged their lord; they now rest at Sengaku-ji temple in Tokyo.' },
        { n: 'Mount Fuji Erupts', y: '1707', lat: 35.36, lon: 138.73, k: 'event', vn: 'Edo Shogunate', d: "Mount Fuji's most recent eruption; ash fell as far as Edo, over 100 km away." },
        { n: "Perry's Black Ships", y: '1853', lat: 35.24, lon: 139.72, k: 'event', vn: 'Tokugawa Shogunate', vs: 'Matthew Perry (USA)', d: 'Four American warships belched black smoke into Uraga Bay and forced Japan to open up.' },
        { n: 'Treaty of Kanagawa', y: '1854', lat: 35.44, lon: 139.64, k: 'event', vn: 'Tokugawa Shogunate', vs: 'Matthew Perry (USA)', d: 'Japan opened the ports of Shimoda and Hakodate to American ships, ending more than 200 years of seclusion.' },
        { n: 'Battle of Toba – Fushimi', y: '1868', lat: 34.93, lon: 135.76, k: 'battle', vn: 'Saigō Takamori (Imperial side)', vs: 'Tokugawa shogunate army', d: 'The first battle of the Boshin War; the Imperial side had fewer troops but modern guns, and won.' }
      ]
    },
    {
      id: 'meiji', t: 'Meiji Restoration – Empire of Japan', y: '1868 – 1926',
      d: 'Japan learned from the West, built railways, factories and a modern army, then became a great power after beating Qing China and Russia.',
      ev: [
        { n: 'Bloodless Surrender of Edo', y: '1868', lat: 35.685, lon: 139.753, k: 'event', vn: 'Saigō Takamori, Katsu Kaishū', d: 'The two men negotiated so that Edo Castle was handed over peacefully, sparing a million people from war.' },
        { n: 'Battle of Hakodate (Goryōkaku)', y: '1869', lat: 41.797, lon: 140.757, k: 'battle', vn: 'Kuroda Kiyotaka (imperial army)', vs: 'Enomoto Takeaki, Hijikata Toshizō', d: 'The last battle of the Boshin War, at a five-pointed star-shaped fortress on Hokkaido.' },
        { n: 'First Railway', y: '1872', lat: 35.666, lon: 139.758, k: 'event', vn: 'Emperor Meiji', d: 'A steam train ran from Shinbashi to Yokohama, taking just 53 minutes for 29 km.' },
        { n: 'Satsuma Rebellion – Shiroyama', y: '1877', lat: 31.60, lon: 130.55, k: 'battle', vn: 'Meiji government army', vs: 'Saigō Takamori', d: "The samurai's last uprising ended on Shiroyama hill in Kagoshima." },
        { n: 'Treaty of Shimonoseki', y: '1895', lat: 33.96, lon: 130.95, k: 'event', vn: 'Itō Hirobumi', vs: 'Li Hongzhang (Qing dynasty)', d: 'Ended the Sino-Japanese War; the Qing ceded Taiwan to Japan.' },
        { n: 'Siege of Port Arthur', y: '1904 – 1905', lat: 38.81, lon: 121.24, k: 'battle', vn: 'Nogi Maresuke', vs: 'Stoessel (Russia)', d: 'The siege of the fortified Russian port lasted 5 months, with very heavy losses on both sides.' },
        { n: 'Battle of Mukden', y: '1905', lat: 41.80, lon: 123.43, k: 'battle', vn: 'Ōyama Iwao', vs: 'Kuropatkin (Russia)', d: 'The largest land battle in the world before World War I, with more than half a million soldiers.' },
        { n: 'Battle of Tsushima', y: '1905', lat: 34.33, lon: 130.10, k: 'battle', vn: 'Admiral Tōgō Heihachirō', vs: 'Rozhestvensky (Russia)', d: 'The Russian fleet sailed halfway around the world and was then destroyed in two days.' },
        { n: 'Treaty of Portsmouth', y: '1905', lat: 43.08, lon: -70.76, k: 'event', vn: 'Komura Jutarō', vs: 'Sergei Witte (Russia)', d: 'Signed in the USA; the first time an Asian country beat a European power in modern times.' },
        { n: 'Great Kantō Earthquake', y: '1923', lat: 35.33, lon: 139.40, approx: true, k: 'event', vn: 'Government of Japan', d: 'Earthquake and fires devastated Tokyo and Yokohama; more than 100,000 people died.' }
      ]
    },
    {
      id: 'chienTranh', t: 'War in Asia and the Pacific', y: '1931 – 1945',
      d: 'The Japanese army widened the war from China across Southeast Asia and the Pacific, ending with two atomic bombs and surrender.',
      ev: [
        { n: 'Occupation of Manchuria', y: '1931', lat: 41.80, lon: 123.43, k: 'battle', vn: 'Kwantung Army', vs: 'Zhang Xueliang (China)', d: 'Using a railway explosion at Shenyang as a pretext, Japanese troops seized northeast China and set up the "Manchukuo" state.' },
        { n: 'Battle of Khalkhin Gol (Nomonhan)', y: '1939', lat: 47.75, lon: 118.60, k: 'battle', vn: 'Komatsubara Michitarō', vs: 'Zhukov (USSR), Mongolia', d: 'Japanese troops lost to Soviet tanks on the Mongolian border and turned south from then on.' },
        { n: 'Attack on Pearl Harbor', y: '7 Dec 1941', lat: 21.36, lon: -157.95, k: 'battle', vn: 'Yamamoto Isoroku, Nagumo Chūichi', vs: 'US Pacific Fleet', d: 'Carrier planes attacked the Hawaii base by surprise, drawing the USA into World War II.' },
        { n: 'Battle of Singapore', y: '1942', lat: 1.29, lon: 103.85, k: 'battle', vn: 'Yamashita Tomoyuki', vs: 'Arthur Percival (Britain)', d: 'Japanese troops rode bicycles down the Malay Peninsula; about 80,000 British troops surrendered.' },
        { n: 'Battle of Midway', y: 'Jun 1942', lat: 28.21, lon: -177.38, k: 'battle', vn: 'Yamamoto Isoroku, Nagumo Chūichi', vs: 'Chester Nimitz (USA)', d: 'The USA broke the codes; Japan lost four aircraft carriers, the turning point of the Pacific War.' },
        { n: 'Battle of Guadalcanal', y: '1942 – 1943', lat: -9.43, lon: 160.00, k: 'battle', vn: 'Hyakutake Harukichi', vs: 'US Marines', d: 'Six months of fighting in the jungle of the Solomon Islands; Japanese troops had to withdraw.' },
        { n: 'Battle of Leyte Gulf', y: '1944', lat: 10.80, lon: 125.40, approx: true, k: 'battle', vn: 'Kurita Takeo', vs: 'William Halsey (USA)', d: 'Possibly the largest naval battle in history; the Japanese fleet was nearly wiped out in the Philippines.' },
        { n: 'Battle of Iwo Jima', y: '1945', lat: 24.78, lon: 141.32, k: 'battle', vn: 'Kuribayashi Tadamichi', vs: 'US Marines', d: 'Japanese troops dug tunnels all over the small volcanic island and held out for more than a month.' },
        { n: 'Battle of Okinawa', y: '1945', lat: 26.33, lon: 127.80, k: 'battle', vn: 'Ushijima Mitsuru', vs: 'Simon Buckner (USA)', d: "The largest amphibious battle in the Pacific; about a quarter of the island's civilians died." },
        { n: 'Atomic Bombing of Hiroshima', y: '6 Aug 1945', lat: 34.395, lon: 132.454, k: 'event', vn: 'The people of Hiroshima', vs: 'USA', d: 'The first atomic bomb used in war; the Atomic Bomb Dome is now a peace memorial.' },
        { n: 'Atomic Bombing of Nagasaki', y: '9 Aug 1945', lat: 32.774, lon: 129.865, k: 'event', vn: 'The people of Nagasaki', vs: 'USA', d: 'Three days after Hiroshima; less than a week later, the Emperor announced surrender by radio.' },
        { n: 'Surrender Signed on the USS Missouri', y: '2 Sep 1945', lat: 35.35, lon: 139.75, approx: true, k: 'event', vn: 'Shigemitsu Mamoru', vs: 'Douglas MacArthur (Allies)', d: 'The signing on the American battleship in Tokyo Bay officially ended World War II.' }
      ]
    },
    {
      id: 'hiendai', t: 'Modern Japan', y: '1945 – present',
      d: 'From the ruins of war, Japan became an economic and technological power, famous for bullet trains, cars and animation.',
      ev: [
        { n: 'Peace Constitution', y: '1947', lat: 35.676, lon: 139.745, k: 'event', vn: 'National Diet of Japan', d: 'A new constitution with Article 9: Japan renounces war as a way to settle disputes.' },
        { n: 'Treaty of San Francisco', y: '1951', lat: 37.78, lon: -122.42, k: 'event', vn: 'Yoshida Shigeru', vs: 'The Allied powers', d: 'Ended the occupation; Japan regained its sovereignty in 1952.' },
        { n: 'Shinkansen and the Tokyo Olympics', y: '1964', lat: 35.681, lon: 139.767, k: 'event', vn: 'Ikeda Hayato', d: 'The first "bullet train" ran at 210 km/h between Tokyo and Osaka just before the Games.' },
        { n: 'Osaka Expo', y: '1970', lat: 34.81, lon: 135.53, k: 'event', vn: 'Japan', d: 'More than 64 million visitors came; the Tower of the Sun still stands in Expo Park.' },
        { n: 'Okinawa Returns to Japan', y: '1972', lat: 26.21, lon: 127.68, k: 'event', vn: 'Satō Eisaku', vs: 'USA', d: 'After 27 years under American administration, Okinawa became a prefecture of Japan again.' },
        { n: 'Kobe Earthquake', y: '1995', lat: 34.59, lon: 135.04, k: 'event', vn: 'The people of Kobe', d: 'The earthquake killed more than 6,000 people; Japan learned many lessons about building earthquake-resistant houses.' },
        { n: 'Tōhoku Earthquake and Tsunami', y: '11 Mar 2011', lat: 38.30, lon: 142.37, k: 'event', vn: 'The people of northeast Japan', d: 'A magnitude 9.0 earthquake and a tsunami over 10 m high caused the Fukushima nuclear plant accident.' },
        { n: 'Emperor Naruhito – the Reiwa Era', y: '2019', lat: 35.685, lon: 139.753, k: 'event', vn: 'Emperor Naruhito', d: "Emperor Akihito abdicated and his son Naruhito took the throne; the new era name \"Reiwa\" takes its characters from the ancient poetry collection Man'yōshū." },
        { n: 'Tokyo 2020 Olympics', y: '2021', lat: 35.678, lon: 139.715, k: 'event', vn: 'Japan', d: 'The Games were postponed a year because of the COVID-19 pandemic and held almost without spectators.' },
        { n: 'Former Prime Minister Abe Shinzō Assassinated', y: '8 Jul 2022', lat: 34.694, lon: 135.783, k: 'event', vn: 'Abe Shinzō', d: "Abe, Japan's longest-serving prime minister, was shot while giving a campaign speech in Nara." },
        { n: 'Noto Peninsula Earthquake', y: '1 Jan 2024', lat: 37.498, lon: 137.242, k: 'event', d: "A magnitude 7.5 earthquake on New Year's Day killed hundreds of people and devastated the town of Wajima." },
        { n: 'SLIM Lander Touches Down on the Moon', y: '20 Jan 2024', lat: 30.4, lon: 130.975, k: 'event', vn: 'Japan Aerospace Exploration Agency (JAXA)', d: 'Launched from Tanegashima, Japan became the fifth country to soft-land on the Moon, only about 100 m from its target.' },
        { n: 'Expo 2025 Osaka', y: '2025', lat: 34.651, lon: 135.385, k: 'event', vn: 'Japan', d: 'The Expo on the artificial island of Yumeshima featured the wooden "Grand Ring" – the largest wooden structure in the world.' },
        { n: 'First Woman Prime Minister', y: 'Oct 2025', lat: 35.673, lon: 139.742, k: 'event', vn: 'Takaichi Sanae', d: 'Takaichi Sanae became the first woman to serve as Prime Minister of Japan.' }
      ]
    }
  ]
};
