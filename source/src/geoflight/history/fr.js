// France history for the Geo-Flight history layer (English text).
export default {
  iso: 'fr', name: 'France', flag: '🇫🇷',
  eras: [
    {
      id: 'gaule', t: 'Gaul and the Roman period', y: '~600 BCE – 486',
      d: 'The Gauls (Celts) lived in many tribes until Julius Caesar conquered the land; for the next five hundred years France was a province of Rome.',
      ev: [
        { n: 'The Greeks found Massalia', y: '~600 BCE', lat: 43.296, lon: 5.370, k: 'event', vn: 'Greek merchants from Phocaea', d: 'The city of Marseille today grew from a Greek trading port and is the oldest city in France.' },
        { n: 'Battle of Gergovia', y: '52 BCE', lat: 45.709, lon: 3.122, k: 'battle', vn: 'Vercingétorix', vs: 'Julius Caesar (Rome)', d: "The young chief Vercingétorix drives back the Roman army on a plateau near Clermont-Ferrand – a rare defeat for Caesar." },
        { n: 'Battle of Alésia', y: '52 BCE', lat: 47.537, lon: 4.500, k: 'battle', vn: 'Vercingétorix', vs: 'Julius Caesar (Rome)', d: 'Caesar builds two rings of walls around the hill of Alésia; Vercingétorix has to surrender, and Gaul belongs to Rome.' },
        { n: 'Lugdunum – capital of Gaul', y: '43 BCE', lat: 45.760, lon: 4.820, k: 'event', vn: 'Lucius Munatius Plancus', d: 'The city of Lyon today was founded on Fourvière hill and became the capital of all three Roman provinces of Gaul.' },
        { n: 'Pont du Gard aqueduct', y: '~50', lat: 43.947, lon: 4.535, k: 'event', vn: 'Roman engineers', d: 'A three-level stone bridge almost 50 m high carried water to the city of Nîmes; it used no mortar at all and still stands today.' },
        { n: 'Battle of the Catalaunian Plains', y: '451', lat: 48.95, lon: 4.36, approx: true, k: 'battle', vn: 'Flavius Aetius, King Theodoric I', vs: 'Attila (the Huns)', d: 'A Roman–Visigoth alliance halts Attila in the Champagne region, saving Gaul from devastation.' }
      ]
    },
    {
      id: 'frank', t: 'The Frankish kingdom and Charlemagne', y: '481 – 987',
      d: 'The Franks unify Gaul and give France its name; Charlemagne builds an empire stretching across Western Europe.',
      ev: [
        { n: 'Clovis is baptized at Reims', y: '~496', lat: 49.254, lon: 4.034, approx: true, k: 'event', vn: 'King Clovis I', d: 'The Frankish king becomes a Christian; from then on French kings were usually crowned at the church of Reims.' },
        { n: 'Battle of Vouillé', y: '507', lat: 46.64, lon: 0.17, approx: true, k: 'battle', vn: 'King Clovis I', vs: 'King Alaric II (Visigoth)', d: 'Clovis defeats the Visigoths, takes almost all of southern Gaul, and chooses Paris as his capital.' },
        { n: 'Battle of Poitiers (Tours)', y: '732', lat: 46.75, lon: 0.45, approx: true, k: 'battle', vn: 'Charles Martel', vs: 'Abd al-Rahman (Umayyad dynasty)', d: 'Frankish infantry stand as a wall of shields, halting the Arab advance north from Spain.' },
        { n: 'Battle of Roncevaux Pass', y: '778', lat: 43.009, lon: -1.320, k: 'battle', vn: 'Charlemagne, the knight Roland', vs: 'The Basques', d: "Charlemagne's rear guard is ambushed in the Pyrenees; the story became the famous epic poem \"The Song of Roland\"." },
        { n: 'Charlemagne crowned Emperor', y: '800', lat: 41.902, lon: 12.457, k: 'event', vn: 'Charlemagne', d: 'On Christmas night, the Pope places a crown on Charlemagne in Rome, naming him Emperor of the West.' },
        { n: 'Treaty of Verdun', y: '843', lat: 49.160, lon: 5.384, k: 'event', vn: 'Charles the Bald', vs: 'Lothair I, Louis the German', d: "Three grandsons divide Charlemagne's empire; the western part, under Charles the Bald, becomes the France of later times." },
        { n: 'The Vikings besiege Paris', y: '885 – 886', lat: 48.853, lon: 2.349, k: 'battle', vn: 'Count Eudes', vs: 'The Vikings (Siegfried)', d: 'The people of Paris hold the island of the Île de la Cité for almost a year against hundreds of Viking boats on the Seine.' },
        { n: 'Hugh Capet takes the throne', y: '987', lat: 49.581, lon: 2.999, k: 'event', vn: 'Hugh Capet', d: 'Crowned at Noyon, he begins the Capetian dynasty – branches of this family ruled France for more than 800 years.' }
      ]
    },
    {
      id: 'capet', t: 'The Capetians and the Middle Ages', y: '987 – 1337',
      d: 'The Capetian kings gradually expand their lands from the area around Paris; this is the age of Gothic cathedrals, castles and the Crusades.',
      ev: [
        { n: 'Mont-Saint-Michel Abbey', y: '1023', lat: 48.636, lon: -1.511, k: 'event', vn: 'The Benedictine monks', d: 'The abbey is built on a rocky island; when the tide comes in, it is surrounded by the sea.' },
        { n: 'Construction of Notre-Dame de Paris begins', y: '1163', lat: 48.853, lon: 2.350, k: 'event', vn: 'Bishop Maurice de Sully, King Louis VII', d: 'The Gothic building, with its rose windows and stone gargoyles, took nearly 200 years to finish.' },
        { n: 'Siege of Carcassonne', y: '1209', lat: 43.206, lon: 2.364, k: 'battle', vn: 'Simon de Montfort', vs: 'Viscount Raymond-Roger Trencavel', d: 'In the Crusade against the Cathars, the city is taken; its double ring of walls still stands today.' },
        { n: 'Battle of Bouvines', y: '1214', lat: 50.580, lon: 3.190, k: 'battle', vn: 'King Philip II Augustus', vs: "Emperor Otto IV, the allies of King John of England", d: 'The victory lets France keep Normandy and confirms the strength of the monarchy.' },
        { n: 'Battle of Mansourah', y: '1250', lat: 31.040, lon: 31.380, k: 'battle', vn: 'King Louis IX (St. Louis)', vs: 'The Egyptian army (Ayyubid, Mamluk)', d: 'In the Seventh Crusade, the French army is defeated in the Nile delta and the king himself is taken prisoner.' },
        { n: 'St. Louis dies in Tunis', y: '1270', lat: 36.853, lon: 10.323, k: 'event', vn: 'King Louis IX', d: 'The king dies of disease while on the Eighth Crusade; he was later made a saint.' },
        { n: 'Arrest of the Knights Templar', y: '1307', lat: 48.866, lon: 2.362, k: 'event', vn: 'King Philip IV (Philip the Fair)', vs: 'The Knights Templar', d: 'The king has the wealthy knights arrested all over France at the same time; the order is dissolved in 1312.' }
      ]
    },
    {
      id: 'tramnam', t: 'The Hundred Years\' War', y: '1337 – 1453',
      d: "The English kings claim the French throne, causing a war that lasts 116 years; Joan of Arc helps France turn the tide.",
      route: { t: "Joan of Arc's journey, 1429", pts: [[48.442, 5.675], [47.167, 0.242], [47.902, 1.909], [49.254, 4.034]] },
      ev: [
        { n: 'Naval Battle of Sluys', y: '1340', lat: 51.31, lon: 3.39, approx: true, k: 'battle', vn: 'Admiral Hugues Quiéret', vs: 'King Edward III (England)', d: 'The French fleet is destroyed near the coast of Flanders, and the English control the English Channel.' },
        { n: 'Battle of Crécy', y: '1346', lat: 50.256, lon: 1.880, k: 'battle', vn: 'King Philip VI', vs: 'King Edward III (England)', d: 'English archers with longbows shoot down the heavily armored French knights.' },
        { n: 'Siege of Calais', y: '1346 – 1347', lat: 50.951, lon: 1.858, k: 'battle', vn: 'Jean de Vienne', vs: 'King Edward III (England)', d: 'After almost a year under siege, six citizens of Calais volunteer to give themselves up to save the whole city.' },
        { n: 'Battle of Poitiers', y: '1356', lat: 46.51, lon: 0.42, approx: true, k: 'battle', vn: 'King Jean II', vs: 'Edward the Black Prince (England)', d: 'The French king is captured and held in London, and France has to pay a huge ransom.' },
        { n: 'Battle of Agincourt', y: '1415', lat: 50.463, lon: 2.142, k: 'battle', vn: "Charles d'Albret", vs: 'King Henry V (England)', d: 'French knights get bogged down in a muddy field and are beaten by English archers despite being far more numerous.' },
        { n: 'Relief of Orléans', y: '1429', lat: 47.902, lon: 1.909, k: 'battle', vn: "Joan of Arc, Dunois", vs: 'The English army (Earl of Talbot)', d: 'A 17-year-old peasant girl leads the army to break the siege in just 9 days, and is called the "Maid of Orléans".' },
        { n: 'Charles VII crowned at Reims', y: '1429', lat: 49.254, lon: 4.034, k: 'event', vn: "King Charles VII, Joan of Arc", d: 'Joan leads the king across enemy-held territory to be crowned in the cathedral at Reims.' },
        { n: 'Joan of Arc tried at Rouen', y: '1431', lat: 49.443, lon: 1.088, k: 'event', vn: "Joan of Arc", vs: "The English, the court of Bishop Cauchon", d: 'Joan is captured, condemned and burned at 19; she was later cleared of the charges and became a saint.' },
        { n: 'Battle of Castillon', y: '1453', lat: 44.852, lon: -0.030, k: 'battle', vn: 'Jean Bureau', vs: 'Earl of Talbot (England)', d: 'French cannon decide the battle; the English lose Gascony, and the Hundred Years\' War ends.' }
      ]
    },
    {
      id: 'quanchu', t: 'The Renaissance and the Sun King', y: '1494 – 1715',
      d: 'French kings bring Renaissance art back from Italy; after the wars of religion, the monarchy reaches the height of its power under Louis XIV.',
      ev: [
        { n: 'Battle of Marignano', y: '1515', lat: 45.352, lon: 9.322, k: 'battle', vn: 'King François I', vs: 'Swiss mercenaries', d: 'The 21-year-old king wins near Milan, beginning a reign that loved Renaissance art.' },
        { n: 'Leonardo da Vinci at Amboise', y: '1516 – 1519', lat: 47.410, lon: 0.991, k: 'event', vn: 'King François I', d: 'Leonardo brings the Mona Lisa with him to France; that is why the painting is now in the Louvre.' },
        { n: 'Battle of Pavia', y: '1525', lat: 45.200, lon: 9.150, approx: true, k: 'battle', vn: 'King François I', vs: 'Emperor Charles V', d: 'The French king is taken prisoner and brought to Madrid; he wrote: "All is lost save honor".' },
        { n: 'Edict of Nantes', y: '1598', lat: 47.218, lon: -1.554, k: 'event', vn: 'King Henri IV', d: 'Gives Protestants freedom of worship, ending 36 years of religious wars.' },
        { n: 'Champlain founds Québec', y: '1608', lat: 46.813, lon: -71.208, k: 'event', vn: 'Samuel de Champlain', d: 'The start of New France in North America; to this day Quebecers still speak French.' },
        { n: 'Battle of Rocroi', y: '1643', lat: 49.926, lon: 4.522, k: 'battle', vn: "Duke d'Enghien (the Great Condé)", vs: 'The Spanish army', d: 'The 21-year-old commander defeats the famously unbeaten Spanish infantry, only days after Louis XIV took the throne.' },
        { n: 'Palace of Versailles', y: '1682', lat: 48.805, lon: 2.120, k: 'event', vn: 'King Louis XIV (the Sun King)', d: 'The court moves to Versailles; the Hall of Mirrors has 357 mirrors reflecting the vast gardens.' },
        { n: 'Battle of Blenheim', y: '1704', lat: 48.640, lon: 10.600, k: 'battle', vn: 'Marshal Tallard', vs: 'Duke of Marlborough, Prince Eugene', d: "Louis XIV's first great defeat, in Bavaria, during the War of the Spanish Succession." },
        { n: 'Battle of Denain', y: '1712', lat: 50.329, lon: 3.393, k: 'battle', vn: 'Marshal Villars', vs: 'Prince Eugene', d: 'The victory saves France at the last minute and helps secure a favorable peace treaty in 1713.' }
      ]
    },
    {
      id: 'cachmang', t: 'The French Revolution', y: '1789 – 1799',
      d: 'The people overthrow the absolute monarchy under the slogan "Liberty – Equality – Fraternity", then have to fight a coalition of European countries.',
      ev: [
        { n: 'Storming of the Bastille', y: '14 Jul 1789', lat: 48.853, lon: 2.369, k: 'event', vn: 'The people of Paris', vs: 'The monarchy', d: "The fortress-prison, a symbol of the king's power, is taken; 14 July is now France's national day." },
        { n: 'Declaration of the Rights of Man and of the Citizen', y: '1789', lat: 48.805, lon: 2.130, k: 'event', vn: 'The National Constituent Assembly', d: '"Men are born and remain free and equal in rights" – a document that influenced many later declarations.' },
        { n: 'Battle of Valmy', y: '1792', lat: 49.080, lon: 4.770, k: 'battle', vn: 'Dumouriez, Kellermann', vs: 'Duke of Brunswick (Prussia)', d: 'Revolutionary volunteers halt the Prussian army; the very next day France is declared a republic.' },
        { n: 'King Louis XVI is executed', y: '1793', lat: 48.866, lon: 2.321, k: 'event', vn: 'The National Convention', vs: 'King Louis XVI', d: 'The king is executed in the square now called Concorde; the violent period of the "Terror" follows.' },
        { n: 'Siege of Toulon', y: '1793', lat: 43.117, lon: 5.930, k: 'battle', vn: 'Artillery captain Napoléon Bonaparte', vs: 'The British fleet, the Royalists', d: 'By placing his guns in the right spot, the 24-year-old officer Napoléon retakes the port of Toulon and is made a general.' },
        { n: 'Battle of Fleurus', y: '1794', lat: 50.483, lon: 4.550, k: 'battle', vn: 'General Jourdan', vs: 'The Austrian army', d: 'For the first time, a balloon is used to observe the enemy army in a battle.' },
        { n: 'Battle of the Bridge of Arcole', y: '1796', lat: 45.357, lon: 11.276, k: 'battle', vn: 'Napoléon Bonaparte', vs: 'The Austrian army (Alvinczi)', d: 'Napoléon charges forward with a flag onto a small bridge in the marshes of Italy; the battle lasts three days.' },
        { n: 'Battle of Rivoli', y: '1797', lat: 45.570, lon: 10.810, k: 'battle', vn: 'Napoléon Bonaparte', vs: 'The Austrian army (Alvinczi)', d: 'The decisive victory of the Italian campaign, forcing Austria to ask for peace.' },
        { n: 'Battle of the Pyramids', y: '1798', lat: 30.070, lon: 31.200, approx: true, k: 'battle', vn: 'Napoléon Bonaparte', vs: 'Mamluk cavalry (Murad Bey)', d: '"Forty centuries look down upon you" – Napoléon tells his soldiers in front of the Egyptian pyramids.' },
        { n: 'Battle of the Nile (Aboukir Bay)', y: '1798', lat: 31.320, lon: 30.070, k: 'battle', vn: 'Admiral Brueys', vs: 'Admiral Nelson (Britain)', d: "The French fleet is destroyed, and Napoléon's army is trapped in Egypt." },
        { n: 'The Rosetta Stone is found', y: '1799', lat: 31.400, lon: 30.417, k: 'event', vn: 'Captain Bouchard', d: 'The stone, carved in three scripts, helped the linguist Champollion decipher Egyptian hieroglyphs in 1822.' }
      ]
    },
    {
      id: 'napoleon', t: 'The age of Napoléon', y: '1799 – 1815',
      d: 'Napoléon takes power, becomes Emperor and conquers almost all of Europe, until his defeats in Russia and at Waterloo.',
      route: { t: 'The march into Russia, 1812', pts: [[54.900, 23.890], [54.687, 25.280], [55.190, 30.200], [54.780, 32.050], [55.520, 35.820], [55.750, 37.620]] },
      ev: [
        { n: 'Battle of Marengo', y: '1800', lat: 44.890, lon: 8.680, k: 'battle', vn: 'Napoléon, General Desaix', vs: 'The Austrian army (Melas)', d: "Almost beaten at noon, the French turn the battle around when Desaix's reinforcements arrive." },
        { n: 'Napoléon crowned Emperor', y: '1804', lat: 48.853, lon: 2.350, k: 'event', vn: 'Napoléon I', d: 'At Notre-Dame, Napoléon places the crown on his own head in front of the Pope.' },
        { n: 'Battle of Trafalgar', y: '1805', lat: 36.250, lon: -6.200, approx: true, k: 'battle', vn: 'Admiral Villeneuve', vs: 'Admiral Nelson (Britain)', d: 'The French–Spanish fleet is beaten off the coast of Spain; Napoléon gives up the idea of invading England.' },
        { n: 'Battle of Austerlitz', y: '1805', lat: 49.128, lon: 16.762, k: 'battle', vn: 'Napoléon I', vs: 'Tsar Alexander I, Emperor Franz II', d: '"The Battle of the Three Emperors": Napoléon lures the enemy into a trap under the morning mist, his most famous victory.' },
        { n: 'Battle of Jena', y: '1806', lat: 50.950, lon: 11.520, k: 'battle', vn: 'Napoléon I, Marshal Davout', vs: 'The Prussian army (Hohenlohe, Brunswick)', d: 'The Prussian army collapses in a single day, and Napoléon marches into Berlin.' },
        { n: 'Battle of Friedland', y: '1807', lat: 54.450, lon: 21.020, k: 'battle', vn: 'Napoléon I', vs: 'The Russian army (Bennigsen)', d: 'The Tsar has to ask for peace; the two emperors meet on a raft in the middle of the Niemen river at Tilsit.' },
        { n: 'Battle of Wagram', y: '1809', lat: 48.300, lon: 16.560, k: 'battle', vn: 'Napoléon I', vs: 'Archduke Charles (Austria)', d: 'One of the largest battles ever up to that time, with more than 300,000 soldiers near Vienna.' },
        { n: 'Battle of Borodino', y: '1812', lat: 55.520, lon: 35.820, k: 'battle', vn: 'Napoléon I', vs: 'Kutuzov (Russia)', d: 'The bloodiest battle of the Russian campaign; a week later Napoléon enters Moscow, but the city is empty and in flames.' },
        { n: 'Crossing the Berezina river', y: '1812', lat: 54.320, lon: 28.350, approx: true, k: 'battle', vn: 'Napoléon I', vs: 'The Russian army (Chichagov, Wittgenstein)', d: 'Engineers stand in the icy water to build bridges for the Grande Armée to retreat; only a small part of the French army survives the winter.' },
        { n: 'Battle of Leipzig', y: '1813', lat: 51.310, lon: 12.410, k: 'battle', vn: 'Napoléon I', vs: 'The coalition of Russia, Prussia, Austria and Sweden', d: '"The Battle of the Nations" lasts three days; Napoléon loses and the next year is exiled to the island of Elba.' },
        { n: 'Battle of Waterloo', y: '1815', lat: 50.680, lon: 4.412, k: 'battle', vn: 'Napoléon I, Marshal Ney', vs: 'Duke of Wellington, Marshal Blücher', d: 'After returning for the "Hundred Days", Napoléon loses his final battle in Belgium.' },
        { n: 'Exile on the island of Saint Helena', y: '1815 – 1821', lat: -15.965, lon: -5.708, k: 'event', vn: 'Napoléon I', d: 'A small island in the South Atlantic, almost 2,000 km from Africa; Napoléon dies here in 1821.' }
      ]
    },
    {
      id: 'the-ky-19', t: 'The 19th century: revolutions, empire and colonies', y: '1815 – 1914',
      d: 'France changes its government several times and industry grows strongly; France also seizes many colonies, including Vietnam.',
      ev: [
        { n: 'The July Revolution', y: '1830', lat: 48.856, lon: 2.352, k: 'event', vn: 'The people of Paris', vs: 'King Charles X', d: 'Three days of barricades in the streets, painted in the picture "Liberty Leading the People".' },
        { n: 'The Revolution of 1848', y: '1848', lat: 48.856, lon: 2.352, k: 'event', vn: 'The people of Paris, Lamartine', vs: 'King Louis-Philippe', d: 'The Second Republic is born and slavery is abolished in the French colonies.' },
        { n: 'The French–Spanish force opens fire at Da Nang', y: '1858', lat: 16.070, lon: 108.220, k: 'battle', vn: 'Admiral Rigault de Genouilly', vs: 'The Nguyen army (Nguyen Tri Phuong)', d: 'The start of the invasion of Vietnam; the soldiers and people of Da Nang resist fiercely, holding the enemy back for many months.' },
        { n: 'Battle of Solferino', y: '1859', lat: 45.370, lon: 10.570, k: 'battle', vn: 'Emperor Napoléon III', vs: 'Emperor Franz Joseph (Austria)', d: 'Seeing wounded soldiers left without help, Henry Dunant gets the idea of founding the Red Cross.' },
        { n: 'Opening of the Suez Canal', y: '1869', lat: 31.265, lon: 32.302, k: 'event', vn: 'Ferdinand de Lesseps', d: 'The 164 km canal links the Mediterranean with the Red Sea, so ships no longer have to sail around Africa.' },
        { n: 'Battle of Sedan', y: '1870', lat: 49.700, lon: 4.940, k: 'battle', vn: 'Emperor Napoléon III, Mac-Mahon', vs: 'Moltke (Prussia)', d: 'The Emperor is captured with more than 100,000 soldiers; the Second Empire collapses and the Third Republic is born.' },
        { n: 'The Paris Commune', y: '1871', lat: 48.887, lon: 2.343, k: 'event', vn: 'The fighters of the Commune', vs: 'The Versailles government (Thiers)', d: 'Paris workers govern the city themselves for 72 days before being crushed; it began on Montmartre hill.' },
        { n: 'The Eiffel Tower', y: '1889', lat: 48.858, lon: 2.294, k: 'event', vn: 'Gustave Eiffel', d: 'Built for the World\'s Fair marking 100 years since the Revolution; once criticized as ugly, it is now a symbol of France.' },
        { n: 'The first film screening', y: '1895', lat: 48.871, lon: 2.331, k: 'event', vn: 'The Lumière brothers', d: 'In a cafe in Paris, an audience sees film projected on a screen for the first time, including a scene of a train arriving at a station.' },
        { n: 'Marie Curie receives the Nobel Prize', y: '1903 – 1911', lat: 48.844, lon: 2.344, k: 'event', vn: 'Marie and Pierre Curie', d: 'Researching radioactivity in Paris; she was the first person to win two Nobel Prizes in two different sciences.' }
      ]
    },
    {
      id: 'thechien', t: 'The two World Wars', y: '1914 – 1945',
      d: 'Most of World War I is fought on French soil, with trenches hundreds of kilometers long; in World War II France is occupied by Germany for four years.',
      ev: [
        { n: 'Battle of the Marne', y: '1914', lat: 48.950, lon: 3.300, approx: true, k: 'battle', vn: 'General Joffre, Gallieni', vs: 'The German army (Moltke)', d: 'Paris taxis carry soldiers to the front; the German army is stopped only about 50 km from the capital.' },
        { n: 'Battle of Verdun', y: '1916', lat: 49.208, lon: 5.433, k: 'battle', vn: 'General Pétain, Nivelle', vs: 'The German army (Falkenhayn)', d: '"They shall not pass!" – 10 months of fighting, with hundreds of thousands killed over a few kilometers of land.' },
        { n: 'Battle of the Somme', y: '1916', lat: 50.000, lon: 2.700, approx: true, k: 'battle', vn: 'General Foch (with the British army)', vs: 'The German army', d: 'One of the bloodiest battles in history; tanks appear on the battlefield for the first time.' },
        { n: 'Armistice in the railway car at Compiègne', y: '11 Nov 1918', lat: 49.427, lon: 2.906, k: 'event', vn: 'Marshal Foch', vs: 'The German delegation', d: 'At 11 o\'clock on 11 November, the guns along the whole Western Front fall silent.' },
        { n: 'Treaty of Versailles', y: '1919', lat: 48.805, lon: 2.120, k: 'event', vn: 'Prime Minister Clemenceau', vs: 'Germany', d: 'Signed in the Hall of Mirrors: Germany loses land and has to pay very heavy war reparations.' },
        { n: 'The evacuation of Dunkirk', y: '1940', lat: 51.034, lon: 2.377, k: 'battle', vn: 'The French army (with the British army)', vs: 'The German army', d: 'Hundreds of ships and boats, including fishing boats, carry about 338,000 soldiers across the sea to Britain.' },
        { n: 'The Appeal of 18 June', y: '1940', lat: 51.518, lon: -0.144, k: 'event', vn: 'General Charles de Gaulle', d: 'From the BBC radio in London, de Gaulle calls on the French to keep fighting, beginning the Free France movement.' },
        { n: 'Battle of Bir Hakeim', y: '1942', lat: 31.590, lon: 23.480, k: 'battle', vn: 'General Koenig', vs: 'Marshal Rommel (Germany – Italy)', d: 'Free French troops hold a fort in the middle of the Libyan desert for two weeks against a much stronger army.' },
        { n: 'Normandy landings', y: '6 Jun 1944', lat: 49.340, lon: -0.600, approx: true, k: 'battle', vn: 'The Free French, the French Resistance (with the Allies)', vs: 'The German army', d: 'The largest seaborne invasion in history, on five beaches, opens the front to liberate Western Europe.' },
        { n: 'Liberation of Paris', y: '1944', lat: 48.874, lon: 2.295, k: 'event', vn: 'General Leclerc, General de Gaulle', vs: 'The German army (von Choltitz)', d: "After an uprising by the people, Leclerc's division enters the capital; de Gaulle marches down the Champs-Élysées." }
      ]
    },
    {
      id: 'hiendai', t: 'Modern France', y: '1945 – present',
      d: 'France gradually loses its colonies, builds the Fifth Republic, and, together with Germany, leads in founding the European Union.',
      ev: [
        { n: 'Battle of Dien Bien Phu', y: '1954', lat: 21.390, lon: 103.020, k: 'battle', vn: 'Generals de Castries, Navarre', vs: 'General Vo Nguyen Giap', d: 'After 56 days and nights, the fortified base falls; France has to end the war in Indochina.' },
        { n: 'Geneva Accords', y: '1954', lat: 46.204, lon: 6.143, k: 'event', vn: 'Prime Minister Pierre Mendès France', vs: 'The Vietnamese delegation (Pham Van Dong)', d: 'Peace is restored in Indochina, and Vietnam is temporarily divided into two zones at the 17th parallel.' },
        { n: 'Treaty of Rome – European Economic Community', y: '1957', lat: 41.893, lon: 12.483, k: 'event', vn: 'France and the five other founding countries', d: 'France is one of the first six countries, the seed of today\'s European Union.' },
        { n: 'The Fifth Republic', y: '1958', lat: 48.870, lon: 2.317, k: 'event', vn: 'President Charles de Gaulle', d: 'The new constitution gives the president a lot of power; this is the system France has today.' },
        { n: 'Évian Accords – Algerian independence', y: '1962', lat: 46.401, lon: 6.590, k: 'event', vn: 'The French government', vs: 'The Algerian National Liberation Front', d: 'Ends 8 years of war; Algeria becomes independent after 132 years as a French colony.' },
        { n: 'May 1968', y: '1968', lat: 48.849, lon: 2.343, k: 'event', vn: 'Students and workers', vs: 'The de Gaulle government', d: 'Students in the Latin Quarter protest and millions of workers strike, changing French society.' },
        { n: 'Concorde first flies', y: '1969', lat: 43.629, lon: 1.364, k: 'event', vn: 'French and British engineers', d: 'The supersonic passenger plane takes off at Toulouse; later it flew from Paris to New York in just over 3 hours.' },
        { n: 'The Channel Tunnel', y: '1994', lat: 50.922, lon: 1.781, k: 'event', vn: 'President Mitterrand', d: 'A 50 km tunnel under the sea links France with Britain; a train crossing takes only about 35 minutes.' },
        { n: 'France wins the 1998 World Cup', y: '1998', lat: 48.924, lon: 2.36, k: 'event', vn: 'Zinédine Zidane, coach Aimé Jacquet', vs: 'The Brazilian team', d: 'At the Stade de France, Zidane scores two headers, and France beats Brazil 3 – 0 to win the world title for the first time.' },
        { n: 'The euro replaces the franc', y: '2002', lat: 48.864, lon: 2.339, k: 'event', vn: 'The Bank of France', d: 'The franc, used for more than 600 years, is replaced by the euro shared by many European countries.' },
        { n: 'The Paris terrorist attacks', y: '13 Nov 2015', lat: 48.863, lon: 2.371, k: 'event', vn: 'President François Hollande', vs: 'Gunmen of the IS group', d: 'Shootings and bombings at the Bataclan theater, several cafes, and near the Stade de France kill 130 people.' },
        { n: 'Paris Climate Agreement', y: '2015', lat: 48.936, lon: 2.425, k: 'event', vn: 'President François Hollande', d: 'Nearly 200 countries pledge to keep the Earth from warming by more than 2°C.' },
        { n: 'The "Yellow Vests" movement', y: '2018 – 2019', lat: 48.87, lon: 2.308, k: 'event', vs: "President Macron's government", d: 'Protesting rising fuel prices, demonstrators wearing yellow high-visibility vests gather every Saturday, many times on the Champs-Élysées.' },
        { n: 'France wins the 2018 World Cup', y: '2018', lat: 55.716, lon: 37.554, k: 'event', vn: 'Kylian Mbappé, coach Didier Deschamps', vs: 'The Croatian team', d: 'France beats Croatia 4 – 2 in Moscow and wins the world title for the second time; 19-year-old Mbappé scores in the final.' },
        { n: 'Notre-Dame reopens', y: '2019 – 2024', lat: 48.853, lon: 2.350, k: 'event', vn: 'President Emmanuel Macron', d: 'After a fire that brought down the spire in 2019, the cathedral is restored and reopens at the end of 2024.' },
        { n: 'First flight of the Ariane 6 rocket', y: '9 Jul 2024', lat: 5.239, lon: -52.768, k: 'event', vn: 'European Space Agency, ArianeGroup', d: "Europe's new rocket launches from the Kourou spaceport in French Guiana (South America), a site near the equator that helps rockets save fuel." },
        { n: 'Paris Olympics', y: '2024', lat: 48.863, lon: 2.313, k: 'event', vn: 'The city of Paris', d: 'The opening ceremony takes place on the Seine instead of in a stadium – a first in Olympic history.' }
      ]
    }
  ]
};
