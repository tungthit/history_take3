// Italy history for the Geo-Flight history layer (English text).
export default {
  iso: 'it', name: 'Italy', flag: '🇮🇹',
  eras: [
    {
      id: 'roma', t: 'The city of Rome and the Roman Republic', y: '753 – 146 BCE',
      d: 'From a hilltop village on the Tiber, Rome became a republic that ruled the whole Italian peninsula, then defeated Carthage to dominate the Mediterranean.',
      route: { t: "Hannibal's march 218 – 216 BCE", pts: [[37.600, -0.980], [40.720, 0.600], [43.950, 4.700], [45.200, 6.900], [45.070, 7.690], [45.000, 9.600], [43.180, 12.070], [41.310, 16.130]] },
      ev: [
        { n: 'Romulus and Remus found Rome', y: '753 BCE', lat: 41.889, lon: 12.487, k: 'legend', vn: 'Romulus', d: 'According to legend, the twin brothers were raised by a she-wolf; Romulus founded the city on the Palatine Hill.' },
        { n: 'The Etruscans at Tarquinia', y: '~700 BCE', lat: 42.250, lon: 11.757, k: 'event', vn: 'The Etruscans', d: 'Tombs painted with scenes of feasting and dancing; the Etruscans taught the Romans many things, including writing.' },
        { n: 'Founding of the Roman Republic', y: '509 BCE', lat: 41.892, lon: 12.485, k: 'event', vn: 'Lucius Junius Brutus', vs: 'King Tarquinius the Proud', d: 'The Romans expelled their last king and elected two consuls each year in place of a king.' },
        { n: 'Battle of the Allia – Gauls capture Rome', y: '~390 BCE', lat: 42.020, lon: 12.580, approx: true, k: 'battle', vn: 'Roman army', vs: 'Brennus (Gauls)', d: 'The Gauls sacked Rome; the story goes that sacred geese honked and woke the guards on the Capitoline Hill.' },
        { n: 'Appian Way', y: '312 BCE', lat: 41.850, lon: 12.510, k: 'event', vn: 'Appius Claudius Caecus', d: 'The "queen of roads" paved with stone ran south from Rome; many stretches can still be walked today.' },
        { n: 'Battle of Heraclea', y: '280 BCE', lat: 40.210, lon: 16.680, k: 'battle', vn: 'Publius Valerius Laevinus', vs: 'King Pyrrhus of Epirus', d: 'Pyrrhus won thanks to his war elephants but suffered heavy losses – hence the expression "Pyrrhic victory".' },
        { n: 'Battle of Mylae', y: '260 BCE', lat: 38.250, lon: 15.250, approx: true, k: 'battle', vn: 'Gaius Duilius', vs: 'Carthaginian fleet', d: 'The Romans fitted their ships with a hooked boarding bridge called the "crow" to jump onto enemy ships, and won their first great naval battle.' },
        { n: 'Battle of Lake Trasimene', y: '217 BCE', lat: 43.180, lon: 12.070, k: 'battle', vn: 'Gaius Flaminius', vs: 'Hannibal (Carthage)', d: 'Hannibal ambushed the Roman army in fog on the lakeshore – one of the greatest ambushes in history.' },
        { n: 'Battle of Cannae', y: '216 BCE', lat: 41.306, lon: 16.132, k: 'battle', vn: 'Varro, Aemilius Paullus', vs: 'Hannibal (Carthage)', d: 'Hannibal surrounded the larger Roman army from both flanks; this battle is still taught in military schools today.' },
        { n: 'Battle of Zama', y: '202 BCE', lat: 36.270, lon: 9.450, approx: true, k: 'battle', vn: 'Scipio Africanus', vs: 'Hannibal (Carthage)', d: 'The Romans left lanes open for the war elephants to run through, then defeated Hannibal in Africa.' },
        { n: 'Destruction of Carthage', y: '146 BCE', lat: 36.853, lon: 10.323, k: 'battle', vn: 'Scipio Aemilianus', vs: 'Carthage', d: 'After a three-year siege, Carthage was razed to the ground; Rome became master of the Mediterranean.' }
      ]
    },
    {
      id: 'caesar', t: 'Julius Caesar and the Roman Empire', y: '73 BCE – 180',
      d: 'Generals fought for power until Augustus became the first emperor; the two centuries of "Roman Peace" that followed were its most glorious time.',
      ev: [
        { n: 'Spartacus\' revolt', y: '73 – 71 BCE', lat: 40.821, lon: 14.426, k: 'battle', vn: 'Crassus', vs: 'Spartacus', d: 'The slave gladiator Spartacus fled to the volcano Vesuvius and gathered an army of tens of thousands of slaves.' },
        { n: 'Battle of Alesia', y: '52 BCE', lat: 47.537, lon: 4.500, k: 'battle', vn: 'Julius Caesar', vs: 'Vercingetorix (Gauls)', d: 'Caesar built two rings of walls – one to besiege the town, one to block relief forces – and conquered Gaul.' },
        { n: 'Crossing the Rubicon', y: '49 BCE', lat: 44.090, lon: 12.400, approx: true, k: 'event', vn: 'Julius Caesar', vs: 'The Senate, Pompey', d: '"The die is cast" – Caesar led his army across the small river, starting the civil war.' },
        { n: 'Battle of Pharsalus', y: '48 BCE', lat: 39.300, lon: 22.380, approx: true, k: 'battle', vn: 'Julius Caesar', vs: 'Pompey the Great', d: 'In Greece, Caesar defeated an army twice as large and became the most powerful man in Rome.' },
        { n: 'Assassination of Caesar', y: '44 BCE', lat: 41.896, lon: 12.477, k: 'event', vn: 'Julius Caesar', vs: 'Brutus, Cassius', d: 'On March 15, Caesar was stabbed to death by senators; "You too, Brutus?" is a famous line from Shakespeare\'s play.' },
        { n: 'Battle of Actium', y: '31 BCE', lat: 38.950, lon: 20.730, k: 'battle', vn: 'Octavian, Agrippa', vs: 'Mark Antony, Queen Cleopatra', d: 'Octavian\'s fleet won in the Greek sea; Egypt became a Roman province.' },
        { n: 'Augustus – the first emperor', y: '27 BCE', lat: 41.892, lon: 12.485, k: 'event', vn: 'Augustus (Octavian)', d: 'Octavian took the title Augustus, beginning the Roman Empire; the month of August is named after him.' },
        { n: 'Battle of the Teutoburg Forest', y: '9', lat: 52.408, lon: 8.129, k: 'battle', vn: 'Varus', vs: 'Arminius (Germanic tribes)', d: 'Three legions were wiped out in Germany; Augustus cried out: "Varus, give me back my legions!"' },
        { n: 'Vesuvius buries Pompeii', y: '79', lat: 40.749, lon: 14.485, k: 'event', vn: 'Pliny the Elder', d: 'Volcanic ash buried the whole city; thanks to that, today we can see Roman houses, paintings and even bread.' },
        { n: 'The Colosseum', y: '80', lat: 41.890, lon: 12.492, k: 'event', vn: 'Emperor Titus', d: 'It held about 50,000 spectators, with a cloth awning and underground chambers with lifts to raise wild animals onto the arena.' },
        { n: 'Largest empire – Trajan\'s Column', y: '113 – 117', lat: 41.896, lon: 12.484, k: 'event', vn: 'Emperor Trajan', d: 'A stone column carved with 2,500 figures telling the story of the Dacian campaign; under Trajan the empire was the largest in its history.' },
        { n: 'The Pantheon', y: '~125', lat: 41.899, lon: 12.477, k: 'event', vn: 'Emperor Hadrian', d: 'A concrete dome with a round opening at the top; for nearly 1,900 years it has remained the largest unreinforced concrete dome in the world.' }
      ]
    },
    {
      id: 'suytan', t: 'Late Roman times', y: '180 – 476',
      d: 'The vast empire faced civil wars and invasions; Constantine embraced Christianity and moved the capital east, while the West gradually collapsed.',
      ev: [
        { n: 'Battle of the Milvian Bridge', y: '312', lat: 41.936, lon: 12.467, k: 'battle', vn: 'Constantine', vs: 'Maxentius', d: 'According to legend, Constantine saw a cross in the sky before the battle and had it painted on his soldiers\' shields.' },
        { n: 'Edict of Milan', y: '313', lat: 45.464, lon: 9.190, k: 'event', vn: 'Emperor Constantine, Licinius', d: 'It allowed freedom to follow Christianity throughout the empire, ending the persecutions.' },
        { n: 'Constantinople – the new capital', y: '330', lat: 41.008, lon: 28.980, k: 'event', vn: 'Emperor Constantine', d: 'The city of Byzantium was rebuilt as the "New Rome"; today it is Istanbul (Turkey).' },
        { n: 'Battle of Adrianople', y: '378', lat: 41.680, lon: 26.560, k: 'battle', vn: 'Emperor Valens', vs: 'Fritigern (Goths)', d: 'Gothic cavalry crushed the Roman army and the emperor was killed – a sign that the empire was growing weak.' },
        { n: 'Visigoths sack Rome', y: '410', lat: 41.893, lon: 12.483, k: 'battle', vn: 'Emperor Honorius', vs: 'King Alaric (Visigoths)', d: 'For the first time in 800 years, the city of Rome was taken by a foreign army, and the whole Roman world was stunned.' },
        { n: 'Battle of the Catalaunian Plains', y: '451', lat: 48.950, lon: 4.360, approx: true, k: 'battle', vn: 'General Flavius Aetius', vs: 'Attila (Huns)', d: 'Aetius, "the last of the Romans", together with the Visigoths stopped Attila in Gaul.' },
        { n: 'Fall of the Western Roman Empire', y: '476', lat: 44.418, lon: 12.204, k: 'event', vn: 'Romulus Augustulus', vs: 'Odoacer', d: 'The last emperor in Ravenna was deposed; the Eastern Roman Empire (Byzantium) lasted until 1453.' }
      ]
    },
    {
      id: 'trungco', t: 'Medieval Italy', y: '476 – 1400',
      d: 'The Italian peninsula split into many kingdoms, the lands of the Pope and rich free cities such as Venice, Genoa and Florence.',
      ev: [
        { n: 'San Vitale mosaics in Ravenna', y: '547', lat: 44.420, lon: 12.196, k: 'event', vn: 'Emperor Justinian, Empress Theodora', d: 'Millions of colored and gold stones form a portrait of the Byzantine emperor that still glitters today.' },
        { n: 'Charlemagne crowned in Rome', y: '800', lat: 41.902, lon: 12.457, k: 'event', vn: 'Pope Leo III', d: 'The Pope placed the imperial crown on Charlemagne on Christmas night in St. Peter\'s Basilica.' },
        { n: 'Venice and St. Mark\'s Basilica', y: '828 – 1094', lat: 45.434, lon: 12.340, k: 'event', vn: 'The Doges (rulers) of Venice', d: 'Venetian merchants brought the remains of St. Mark from Egypt; the city on the water became a trading power.' },
        { n: 'University of Bologna', y: '1088', lat: 44.497, lon: 11.352, k: 'event', vn: 'Students and law teachers', d: 'It is considered the oldest university in the world still in operation.' },
        { n: 'Battle of Legnano', y: '1176', lat: 45.600, lon: 8.920, k: 'battle', vn: 'Lombard League of cities', vs: 'Emperor Frederick I Barbarossa', d: 'Foot soldiers of the cities, gathered around a standard-bearing cart, defeated the German emperor\'s cavalry.' },
        { n: 'Battle of Montaperti', y: '1260', lat: 43.270, lon: 11.450, approx: true, k: 'battle', vn: 'City of Siena (Ghibellines)', vs: 'City of Florence (Guelfs)', d: 'Two neighboring cities fought for Tuscany; Siena won a great victory.' },
        { n: 'Naval Battle of Meloria', y: '1284', lat: 43.550, lon: 10.200, approx: true, k: 'battle', vn: 'Admiral Oberto Doria (Genoa)', vs: 'Republic of Pisa', d: 'Genoa defeated the Pisan fleet, and Pisa lost its position as a sea power.' },
        { n: 'Marco Polo returns to Venice', y: '1295', lat: 45.438, lon: 12.336, k: 'event', vn: 'Marco Polo', d: 'After 24 years that took him as far as Kublai Khan\'s court, he told of his journey in a book famous across Europe.' },
        { n: 'Dante writes the Divine Comedy', y: '~1308 – 1320', lat: 43.771, lon: 11.256, k: 'event', vn: 'Dante Alighieri', d: 'An epic poem about a journey through Hell, Purgatory and Paradise, written in Italian instead of Latin.' },
        { n: 'The Black Death reaches Messina', y: '1347', lat: 38.193, lon: 15.554, k: 'event', vn: 'People of Sicily', d: 'The plague arrived on merchant ships docking in Sicily and spread across Europe, killing about a third of the population.' }
      ]
    },
    {
      id: 'phuchung', t: 'The Renaissance', y: '1400 – 1600',
      d: 'Florence, Rome and Venice became the art centers of the world with Leonardo, Michelangelo and Raphael; but the small city-states were often fought over by foreign powers.',
      ev: [
        { n: 'Brunelleschi\'s Dome', y: '1436', lat: 43.773, lon: 11.256, k: 'event', vn: 'Filippo Brunelleschi', d: 'The largest brick dome in the world was built without scaffolding, thanks to a herringbone brick pattern.' },
        { n: 'Peace of Lodi', y: '1454', lat: 45.314, lon: 9.503, k: 'event', vn: 'Milan, Venice, Florence, Naples, the Pope', d: 'The major city-states agreed to keep a balance of power, bringing 40 years of relative peace to Italy.' },
        { n: "Lorenzo de' Medici in Florence", y: '1469 – 1492', lat: 43.775, lon: 11.256, k: 'event', vn: "Lorenzo de' Medici (Lorenzo the Magnificent)", d: 'The wealthy banking family supported many artists, including the boy Michelangelo.' },
        { n: 'Columbus reaches the Americas', y: '1492', lat: 24.050, lon: -74.500, approx: true, k: 'event', vn: 'Cristoforo Colombo (a Genoese)', d: 'The Genoese navigator, serving Spain, crossed the Atlantic and landed on San Salvador island in the Bahamas.' },
        { n: 'Battle of Fornovo', y: '1495', lat: 44.690, lon: 10.100, k: 'battle', vn: 'Francesco Gonzaga (Venetian League)', vs: 'King Charles VIII (France)', d: 'The Italian allies blocked the French army\'s retreat, but the French king still escaped home.' },
        { n: 'The Last Supper', y: '1498', lat: 45.466, lon: 9.171, k: 'event', vn: 'Leonardo da Vinci', d: 'A wall painting in the convent of Santa Maria delle Grazie, Milan; Leonardo also drew flying machines and tanks in his notebooks.' },
        { n: 'Sistine Chapel ceiling', y: '1508 – 1512', lat: 41.903, lon: 12.454, k: 'event', vn: 'Michelangelo', d: 'Michelangelo lay on a high scaffold painting more than 300 figures, including the famous "Creation of Adam".' },
        { n: 'Sack of Rome', y: '1527', lat: 41.902, lon: 12.457, k: 'battle', vn: 'Pope Clement VII', vs: 'Army of Emperor Charles V', d: 'Unpaid mercenaries poured into Rome; the Pope had to flee into Castel Sant\'Angelo.' },
        { n: 'Battle of Lepanto', y: '1571', lat: 38.280, lon: 21.100, approx: true, k: 'battle', vn: 'Sebastiano Venier (Venice), Marcantonio Colonna', vs: 'Ali Pasha (Ottoman Empire)', d: 'The last battle between great fleets of galleys; the Holy League won in the Greek sea.' },
        { n: 'Galileo and the telescope', y: '1609 – 1610', lat: 45.407, lon: 11.877, k: 'event', vn: 'Galileo Galilei', d: 'In Padua, Galileo pointed his telescope at the sky and discovered four moons of Jupiter.' }
      ]
    },
    {
      id: 'ngoaibang', t: 'Foreign rule and Napoleon', y: '1600 – 1815',
      d: 'Most of Italy was ruled by Spain, then Austria; Napoleon temporarily united most of the peninsula and planted the seed of the idea of one Italy.',
      ev: [
        { n: 'Trial of Galileo', y: '1633', lat: 41.899, lon: 12.473, k: 'event', vn: 'Galileo Galilei', vs: 'Church tribunal', d: 'Galileo was forced to retract his view that the Earth moves around the Sun and was kept under house arrest for the rest of his life.' },
        { n: 'Stradivari violins', y: '~1700', lat: 45.133, lon: 10.022, k: 'event', vn: 'Antonio Stradivari', d: 'The instruments made in Cremona are still considered the best in the world, with prices of millions of dollars.' },
        { n: 'Battle of Turin', y: '1706', lat: 45.070, lon: 7.680, k: 'battle', vn: 'Duke Vittorio Amedeo II, Prince Eugene', vs: 'French army', d: 'The siege of Turin was lifted; Savoy–Piedmont grew strong and later led the unification of Italy.' },
        { n: 'Excavation of Pompeii', y: '1748', lat: 40.749, lon: 14.485, k: 'event', vn: 'King Charles of Bourbon (Naples)', d: 'The city buried for 1,700 years gradually came to light; excavation still continues today.' },
        { n: 'La Scala theater', y: '1778', lat: 45.467, lon: 9.189, k: 'event', vn: 'Composer Antonio Salieri', d: 'The most famous opera house in the world, in Milan; Italy is the homeland of opera.' },
        { n: 'Volta\'s electric battery', y: '1800', lat: 45.808, lon: 9.085, k: 'event', vn: 'Alessandro Volta', d: 'Volta stacked zinc and copper discs separated by paper soaked in salt water, creating the first electric battery; the "volt" is named after him.' },
        { n: 'Napoleon crowned King of Italy', y: '1805', lat: 45.464, lon: 9.192, k: 'event', vn: 'Napoleon', d: 'In Milan Cathedral, Napoleon placed on his head the ancient Iron Crown of the Lombard kings.' }
      ]
    },
    {
      id: 'risorgimento', t: 'Risorgimento – the unification of Italy', y: '1815 – 1871',
      d: 'The "Resurgence" movement of Mazzini, Cavour and Garibaldi drove out the Austrians and merged the kingdoms into one united Italy.',
      route: { t: "The Expedition of the Thousand Redshirts, 1860", pts: [[44.388, 9.020], [37.800, 12.430], [37.910, 12.860], [38.116, 13.361], [38.220, 15.240], [38.110, 15.650], [40.852, 14.268], [41.080, 14.250]] },
      ev: [
        { n: 'Five Days of Milan', y: '1848', lat: 45.464, lon: 9.190, k: 'battle', vn: 'People of Milan, Carlo Cattaneo', vs: 'Field Marshal Radetzky (Austria)', d: 'The people raised hundreds of barricades and drove the Austrian army out of the city after five days of fighting.' },
        { n: 'Battle of Custoza', y: '1848', lat: 45.380, lon: 10.790, k: 'battle', vn: 'King Carlo Alberto (Sardinia)', vs: 'Field Marshal Radetzky (Austria)', d: 'The Sardinian army lost, and the first war of independence failed.' },
        { n: 'Defense of the Roman Republic', y: '1849', lat: 41.889, lon: 12.461, k: 'battle', vn: 'Giuseppe Garibaldi, Giuseppe Mazzini', vs: 'General Oudinot (France)', d: 'Garibaldi held the Janiculum Hill for a month against the French, then had to leave Rome.' },
        { n: 'Battle of Solferino', y: '1859', lat: 45.370, lon: 10.570, k: 'battle', vn: 'King Vittorio Emanuele II (with Napoleon III)', vs: 'Emperor Franz Joseph (Austria)', d: 'The victory won Lombardy; the sight of the wounded after the battle led to the founding of the Red Cross.' },
        { n: 'Battle of Calatafimi', y: '1860', lat: 37.910, lon: 12.860, k: 'battle', vn: 'Giuseppe Garibaldi', vs: 'Bourbon army (Naples)', d: 'With only about a thousand redshirt volunteers, Garibaldi won the first battle in Sicily: "Here we either make Italy, or we die".' },
        { n: 'Battle of the Volturno', y: '1860', lat: 41.080, lon: 14.250, k: 'battle', vn: 'Giuseppe Garibaldi', vs: 'King Francis II (Naples)', d: 'The biggest battle of the expedition, marking the fall of the Kingdom of the Two Sicilies.' },
        { n: 'Meeting at Teano', y: '1860', lat: 41.250, lon: 14.067, k: 'event', vn: 'Garibaldi, King Vittorio Emanuele II', d: 'Garibaldi shook hands with the king, greeted him and handed over the whole newly liberated south.' },
        { n: 'Kingdom of Italy born', y: '1861', lat: 45.068, lon: 7.686, k: 'event', vn: 'King Vittorio Emanuele II, Prime Minister Cavour', d: 'Parliament met in Turin and proclaimed a united Italy; Turin was the first capital.' },
        { n: 'Naval Battle of Lissa', y: '1866', lat: 43.060, lon: 16.180, k: 'battle', vn: 'Admiral Persano', vs: 'Admiral Tegetthoff (Austria)', d: 'The first battle between ocean-going ironclad ships; the Italian fleet lost despite having more ships.' },
        { n: 'Capture of Rome at Porta Pia', y: '1870', lat: 41.909, lon: 12.501, k: 'battle', vn: 'General Raffaele Cadorna', vs: 'Army of Pope Pius IX', d: 'The Italian army breached the city wall and entered Rome; a year later Rome became the capital of Italy.' }
      ]
    },
    {
      id: 'thechien', t: 'The Kingdom of Italy and the two World Wars', y: '1871 – 1945',
      d: 'The young Italy took part in World War I; afterwards Mussolini founded a fascist regime and drew Italy into World War II alongside Nazi Germany.',
      ev: [
        { n: 'Marconi and radio waves', y: '1895', lat: 44.430, lon: 11.210, k: 'event', vn: 'Guglielmo Marconi', d: 'The 21-year-old sent a wireless signal over a hill near Bologna, beginning the age of radio.' },
        { n: 'Battle of Adwa', y: '1896', lat: 14.170, lon: 38.900, k: 'battle', vn: 'General Oreste Baratieri', vs: 'Emperor Menelik II (Ethiopia)', d: 'The Ethiopian army defeated the Italians and kept its independence – a famous victory for Africa.' },
        { n: 'Battles of the Isonzo', y: '1915 – 1917', lat: 45.950, lon: 13.620, approx: true, k: 'battle', vn: 'General Luigi Cadorna', vs: 'Austro-Hungarian army', d: 'Eleven battles in the rocky mountains along the Isonzo River in which the front line barely moved.' },
        { n: 'Battle of Caporetto', y: '1917', lat: 46.257, lon: 13.582, k: 'battle', vn: 'General Luigi Cadorna', vs: 'Austro-Hungarian and German armies', d: 'The Italian army lost heavily and retreated over 100 km to the Piave River; the writer Hemingway tells of it in a novel.' },
        { n: 'Battle of Vittorio Veneto', y: '1918', lat: 45.990, lon: 12.300, k: 'battle', vn: 'General Armando Diaz', vs: 'Austro-Hungarian army', d: 'The decisive victory caused the Austro-Hungarian Empire to collapse, ending World War I on the Italian front.' },
        { n: 'March on Rome', y: '1922', lat: 41.902, lon: 12.496, k: 'event', vn: 'Benito Mussolini', d: 'Blackshirt squads marched on Rome, the king gave the premiership to Mussolini; Italy gradually became a dictatorship.' },
        { n: 'Lateran Treaty – Vatican State', y: '1929', lat: 41.902, lon: 12.453, k: 'event', vn: 'Mussolini, Cardinal Gasparri', d: 'Vatican City became the smallest independent state in the world, less than half a square kilometer in size.' },
        { n: 'Allies land in Sicily', y: '1943', lat: 37.070, lon: 14.240, k: 'battle', vn: 'Italian and German troops', vs: 'Generals Patton, Montgomery (Allies)', d: 'After the landing, Mussolini was deposed and Italy signed an armistice with the Allies.' },
        { n: 'Battle of Monte Cassino', y: '1944', lat: 41.490, lon: 13.814, k: 'battle', vn: 'Allied forces (with Italian troops)', vs: 'German occupying troops', d: 'Four assaults on the mountain defense line; the ancient abbey on the summit was destroyed by bombs and later rebuilt.' },
        { n: 'Liberation Day', y: 'Apr 25, 1945', lat: 45.464, lon: 9.190, k: 'event', vn: 'Italian Resistance forces', vs: 'German troops and the fascist regime', d: 'Partisan units rose up and liberated Milan and the north; April 25 is Italy\'s Liberation Day holiday.' }
      ]
    },
    {
      id: 'conghoa', t: 'The Italian Republic', y: '1946 – present',
      d: 'The people chose a republic; Italy had a miraculous recovery, became a founding member of the European Union and is famous for fashion, cars and football.',
      ev: [
        { n: 'Referendum – the Republic', y: '1946', lat: 41.900, lon: 12.473, k: 'event', vn: 'Italian voters (women voting for the first time)', d: 'The people chose a republic over the monarchy; June 2 became Italy\'s National Day.' },
        { n: 'Ferrari factory at Maranello', y: '1947', lat: 44.527, lon: 10.866, k: 'event', vn: 'Enzo Ferrari', d: 'The first car bearing the Ferrari name was born; the black prancing horse became a symbol of speed.' },
        { n: 'Treaties of Rome', y: '1957', lat: 41.893, lon: 12.483, k: 'event', vn: 'Italy and the five other founding countries', d: 'Signed on the Capitoline Hill, creating the European Economic Community – the forerunner of the European Union.' },
        { n: 'Rome Olympics', y: '1960', lat: 41.934, lon: 12.455, k: 'event', vn: 'City of Rome', d: 'The Ethiopian athlete Abebe Bikila ran barefoot along the Appian Way and won the marathon gold medal.' },
        { n: 'Florence flood', y: '1966', lat: 43.768, lon: 11.255, k: 'event', vn: '"Mud Angels"', d: 'The Arno River overflowed, and thousands of young volunteers came to rescue precious books and paintings from the mud.' },
        { n: 'Italy wins the World Cup', y: '2006', lat: 52.515, lon: 13.239, k: 'event', vn: 'Coach Marcello Lippi, Fabio Cannavaro', vs: 'France national team', d: 'Winning a penalty shootout in Berlin, Italy became world champions for the fourth time.' },
        { n: 'Amatrice earthquake', y: '2016', lat: 42.629, lon: 13.291, k: 'event', d: 'The earthquake at night destroyed the mountain town of Amatrice and neighboring villages, killing nearly 300 people.' },
        { n: 'COVID-19 pandemic – national lockdown', y: 'Mar 2020', lat: 45.16, lon: 9.705, k: 'event', vn: 'Prime Minister Giuseppe Conte', d: 'The first big outbreak in Europe flared up around Codogno (Lombardy); Italy was the first European country to lock down the whole nation.' },
        { n: 'MOSE barrier protects Venice', y: '2020', lat: 45.420, lon: 12.430, approx: true, k: 'event', vn: 'Italian engineers', d: 'Dozens of floating gates rise at the lagoon inlets when the water level is high, keeping Venice from flooding.' },
        { n: 'Italy wins EURO 2020', y: '2021', lat: 51.556, lon: -0.28, k: 'event', vn: 'Coach Roberto Mancini, Gianluigi Donnarumma', vs: 'England national team', d: 'The tournament was postponed a year because of the pandemic; Italy beat hosts England on penalties at Wembley, with goalkeeper Donnarumma saving the decisive kick.' },
        { n: 'First woman prime minister', y: '2022', lat: 41.901, lon: 12.48, k: 'event', vn: 'Giorgia Meloni', d: 'Giorgia Meloni became the first woman to be Prime Minister of Italy, working in Palazzo Chigi.' },
        { n: 'Milano Cortina Winter Olympics', y: '2026', lat: 46.540, lon: 12.136, k: 'event', vn: "Milan and Cortina d'Ampezzo", d: 'The first time the Winter Olympics have two host cities, spread across northern Italy.' }
      ]
    }
  ]
};
