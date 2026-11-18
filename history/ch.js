// Switzerland history for the Geo-Flight history layer.
export default {
  iso: 'ch', name: 'Switzerland', flag: '🇨🇭',
  eras: [
    {
      id: 'helvetii', t: 'The Helvetii and Roman times', y: '~4300 BCE – 900',
      d: 'Prehistoric people built stilt houses along the lakes; the Celtic Helvetii were beaten by Caesar, and the land became part of Rome and later of the Franks.',
      ev: [
        { n: 'Lakeside stilt-house villages', y: '~4300 BCE', lat: 47.300, lon: 8.580, approx: true, k: 'event', vn: 'Prehistoric lake dwellers', d: 'The bottoms of Lake Zürich and many other lakes still hold the wooden piles of stilt-house villages – now a World Heritage site.' },
        { n: 'Battle of Bibracte', y: '58 BCE', lat: 46.923, lon: 4.035, approx: true, k: 'battle', vn: 'Divico (the Helvetii)', vs: 'Julius Caesar (Rome)', d: 'The Helvetii planned to migrate into Gaul but were beaten by Caesar and forced to return to their mountains.' },
        { n: 'The city of Augusta Raurica', y: '~44 BCE', lat: 47.534, lon: 7.721, k: 'event', vn: 'Lucius Munatius Plancus', d: 'A Roman city near Basel with a large open-air theatre that survives to this day.' },
        { n: 'Aventicum – capital of the Helvetii', y: '~1st century', lat: 46.881, lon: 7.042, k: 'event', vn: 'The Helvetii under Roman rule', d: "Today's town of Avenches once had 20,000 people and a Roman arena that is still used for musical performances." },
        { n: 'Abbey of St. Gallen', y: '719', lat: 47.423, lon: 9.377, k: 'event', vn: 'The monk Otmar', d: 'The abbey library keeps handwritten books more than a thousand years old and is one of the oldest libraries in the world.' }
      ]
    },
    {
      id: 'lienbang', t: 'The Old Swiss Confederacy', y: '1291 – 1515',
      d: 'The mountain cantons swore to help each other against the Habsburgs; peasant foot soldiers with long pikes became the most feared army in Europe.',
      ev: [
        { n: 'The Rütli Oath', y: '1291', lat: 46.969, lon: 8.594, k: 'legend', vn: 'The three cantons Uri, Schwyz, Unterwalden', d: 'By tradition, representatives of three cantons swore an oath on a meadow by Lake Lucerne; 1 August is Swiss National Day.' },
        { n: 'William Tell shoots the apple', y: '~1307', lat: 46.881, lon: 8.644, k: 'legend', vn: 'William Tell', vs: 'The governor Gessler', d: "Legend says the hunter was forced to shoot an apple placed on his son's head in Altdorf – and he hit it." },
        { n: 'Battle of Morgarten', y: '1315', lat: 47.100, lon: 8.620, approx: true, k: 'battle', vn: 'Peasants of Schwyz', vs: 'Duke Leopold I (Habsburg)', d: 'Peasants rolled rocks down and attacked the Habsburg knights on a narrow road between the mountain and the lake.' },
        { n: 'Battle of Sempach', y: '1386', lat: 47.140, lon: 8.200, k: 'battle', vn: 'The Confederate army, Arnold Winkelried', vs: 'Duke Leopold III (Habsburg)', d: 'According to legend, Winkelried gathered the enemy spears into his arms to open a path for his comrades; Duke Leopold was killed.' },
        { n: 'Battles of Grandson and Murten', y: '1476', lat: 46.929, lon: 7.120, k: 'battle', vn: 'The Swiss Confederate army', vs: 'Charles the Bold (Duke of Burgundy)', d: "Twice they crushed the wealthy Burgundian army; the spoils included the duke's own tents and jewels." },
        { n: 'The Swiss Guard at the Vatican', y: '1506', lat: 41.903, lon: 12.457, k: 'event', vn: 'Swiss mercenaries', d: 'Pope Julius II hired 150 Swiss soldiers; to this day the guard in yellow-and-blue stripes still protects the Pope.' },
        { n: 'Battle of Marignano', y: '1515', lat: 45.370, lon: 9.320, k: 'battle', vn: 'The Swiss Confederate army', vs: 'King François I (France)', d: 'A heavy defeat by French cannons in Italy made the Swiss give up wars of expansion and slowly move toward neutrality.' }
      ]
    },
    {
      id: 'caicach', t: 'The Reformation', y: '1519 – 1798',
      d: 'Zürich and Geneva became centres of the Protestant Reformation; Switzerland was recognised as independent from the Holy Roman Empire.',
      ev: [
        { n: 'Zwingli preaches in Zürich', y: '1519', lat: 47.370, lon: 8.544, k: 'event', vn: 'Huldrych Zwingli', d: 'The pastor of the Grossmünster church began the Protestant Reformation in Switzerland, just two years after Martin Luther.' },
        { n: 'Battle of Kappel', y: '1531', lat: 47.230, lon: 8.520, k: 'battle', vn: 'Zürich (Huldrych Zwingli)', vs: 'The Catholic cantons', d: 'Zwingli was killed when the Protestant and Catholic cantons fought; the peace let each canton choose its own religion.' },
        { n: 'Calvin in Geneva', y: '1541', lat: 46.201, lon: 6.149, k: 'event', vn: 'John Calvin', d: 'Geneva became the "Rome of Protestantism", welcoming refugees from all over Europe, including many watchmakers.' },
        { n: 'The Escalade night', y: '12 Dec 1602', lat: 46.200, lon: 6.146, k: 'battle', vn: 'The people of Geneva', vs: 'The Duke of Savoy', d: 'Savoy troops who put ladders against the walls at midnight were driven back; legend says Mère Royaume poured hot soup onto the enemy.' },
        { n: 'Peace of Westphalia', y: '1648', lat: 51.962, lon: 7.626, k: 'event', vn: 'Basel mayor Johann Rudolf Wettstein', d: 'Switzerland was officially recognised as independent, separate from the Holy Roman Empire.' },
        { n: 'The mathematician Euler in Basel', y: '1707', lat: 47.558, lon: 7.588, k: 'event', vn: 'Leonhard Euler, the Bernoulli family', d: 'Basel gave the world Euler and the Bernoulli family – the most famous mathematicians of the 18th century.' }
      ]
    },
    {
      id: 'cachmang', t: 'Napoléon and the federal state', y: '1798 – 1848',
      d: 'French troops occupied Switzerland and set up the Helvetic Republic; after 1815 Europe recognised Swiss neutrality, and then a short civil war led to the federal state.',
      ev: [
        { n: 'France invades Switzerland', y: '1798', lat: 47.000, lon: 7.500, approx: true, k: 'battle', vn: 'The Bernese army', vs: 'The French army (General Schauenburg)', d: "Bern lost the battle of Grauholz; France set up the Helvetic Republic and carried Bern's treasury off to Paris." },
        { n: 'Suvorov crosses the Alps', y: '1799', lat: 46.650, lon: 8.590, k: 'battle', vn: 'Field Marshal Alexander Suvorov (Russia)', vs: 'The French army (General Lecourbe)', d: "Russian troops fought the French at the Devil's Bridge on the Gotthard Pass; Switzerland became a battlefield of the great powers." },
        { n: 'Congress of Vienna recognises neutrality', y: '1815', lat: 48.207, lon: 16.366, k: 'event', vn: 'Charles Pictet de Rochemont', d: "The great powers recognised Switzerland's permanent neutrality; Geneva, Valais and Neuchâtel joined the confederation." },
        { n: 'The Lion Monument of Lucerne', y: '1821', lat: 47.059, lon: 8.311, k: 'event', vn: 'The sculptor Bertel Thorvaldsen', d: 'A dying lion carved into a rock face honours the Swiss guards killed in Paris in 1792.' },
        { n: 'The Sonderbund War', y: '1847', lat: 47.130, lon: 8.400, approx: true, k: 'battle', vn: 'General Guillaume-Henri Dufour', vs: 'The league of Catholic cantons (Sonderbund)', d: 'The civil war lasted only 26 days; General Dufour ordered that the wounded of both sides be treated kindly.' },
        { n: 'The federal constitution', y: '1848', lat: 46.947, lon: 7.444, k: 'event', vn: 'The Federal Assembly', d: 'Switzerland became a federal state with its capital in Bern, a common currency, the franc, and self-governing cantons.' }
      ]
    },
    {
      id: 'hiendaihoa', t: 'Tunnels, the Red Cross and armed neutrality', y: '1848 – 1945',
      d: 'Switzerland dug tunnels through the mountains, became the home of the Red Cross and stayed neutral through two world wars.',
      ev: [
        { n: 'Founding of the Red Cross', y: '1863', lat: 46.204, lon: 6.143, k: 'event', vn: 'Henry Dunant', d: 'Having seen the wounded soldiers at the battle of Solferino, Dunant founded the Red Cross in Geneva; its flag is the Swiss flag with the colours reversed.' },
        { n: 'The Gotthard Tunnel', y: '1882', lat: 46.666, lon: 8.586, k: 'event', vn: 'Engineer Louis Favre', d: 'A 15 km railway tunnel through the Alps linked the north with Italy; hundreds of workers died building it.' },
        { n: 'Einstein in Bern', y: '1905', lat: 46.948, lon: 7.451, k: 'event', vn: 'Albert Einstein', d: 'Working as a patent office clerk, Einstein wrote the special theory of relativity in his flat on Kramgasse.' },
        { n: 'League of Nations in Geneva', y: '1920', lat: 46.227, lon: 6.140, k: 'event', vn: 'The city of Geneva', d: 'The first international organisation to keep world peace had its headquarters in Geneva; the United Nations Palace is still here today.' },
        { n: 'The Rütli Report', y: '25 Jul 1940', lat: 46.969, lon: 8.594, k: 'event', vn: 'General Henri Guisan', d: 'Surrounded by the Axis powers, General Guisan gathered his officers on the Rütli meadow and announced that Switzerland would defend itself from a mountain fortress.' }
      ]
    },
    {
      id: 'ngaynay', t: 'Modern Switzerland', y: '1945 – present',
      d: 'Switzerland hosts many peace conferences, has the CERN physics laboratory, joined the United Nations in 2002 and still stays outside the EU.',
      ev: [
        { n: 'Geneva Conference on Indochina', y: '1954', lat: 46.227, lon: 6.140, k: 'event', vn: 'Switzerland (host country)', d: 'The Geneva Accords, signed on 21 July 1954, ended the war in Indochina and temporarily divided Vietnam at the 17th parallel.' },
        { n: 'Founding of CERN', y: '1954', lat: 46.234, lon: 6.053, k: 'event', vn: 'European scientists', d: "The world's largest particle physics laboratory; in 1989 Tim Berners-Lee invented the World Wide Web here." },
        { n: 'Women get the vote', y: '1971', lat: 46.947, lon: 7.444, k: 'event', vn: 'Swiss male voters', d: 'Switzerland was one of the last European countries to give women the right to vote nationwide.' },
        { n: 'Reagan – Gorbachev summit', y: '1985', lat: 46.226, lon: 6.150, approx: true, k: 'event', vn: 'Switzerland (host country)', d: 'For the first time the American and Soviet leaders met, beside Lake Geneva, opening a period of easing tensions late in the Cold War.' },
        { n: 'Balloon around the world', y: '1999', lat: 46.474, lon: 7.135, k: 'event', vn: 'Bertrand Piccard, Brian Jones', d: "The balloon Breitling Orbiter 3 took off from Château-d'Oex and made the first non-stop flight around the Earth." },
        { n: 'Joining the United Nations', y: '2002', lat: 40.749, lon: -73.968, k: 'event', vn: 'Swiss voters', d: 'After a referendum, Switzerland became the 190th member of the United Nations.' },
        { n: 'Gotthard Base Tunnel', y: '2016', lat: 46.680, lon: 8.770, k: 'event', vn: 'AlpTransit engineers', d: 'The longest railway tunnel in the world, 57 km, runs up to 2,300 m below the mountain peaks.' },
        { n: 'Collapse of Credit Suisse bank', y: '2023', lat: 47.370, lon: 8.539, k: 'event', vn: 'The Federal Government, the bank UBS', d: 'The 167-year-old bank was bought by UBS in an emergency deal to avoid a global financial crisis.' },
        { n: 'Ukraine peace summit at Bürgenstock', y: '6/2024', lat: 46.995, lon: 8.380, k: 'event', vn: 'President Viola Amherd', d: 'Representatives of nearly 100 countries and organisations met on a mountain by Lake Lucerne to discuss peace in Ukraine.' },
        { n: 'Glacier collapse at Blatten', y: '28 May 2025', lat: 46.420, lon: 7.820, k: 'event', vn: 'The people of Blatten', d: 'Part of the Birch Glacier fell and buried most of the village; the villagers had been evacuated beforehand.' }
      ]
    }
  ]
};
