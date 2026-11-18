// Colombia history for the Geo-Flight history layer.
export default {
  iso: 'co', name: 'Colombia', flag: '🇨🇴',
  eras: [
    {
      id: 'native', t: 'The indigenous peoples', y: '~12000 BCE – 1499',
      d: 'The Muisca, Tairona, Zenú and many other peoples made fine gold work, carved stone statues and built cities in the mountains, which gave rise to the legend of El Dorado.',
      ev: [
        { n: 'Chiribiquete rock paintings', y: '~12000 years ago', lat: 0.95, lon: -72.70, approx: true, k: 'event', vn: 'Ancient peoples of the Amazon', d: 'Tens of thousands of drawings of jaguars and dancing people cover cliff walls in the Amazon forest – many places where no one has ever set foot.' },
        { n: 'San Agustín stone statues', y: '~100 – 900', lat: 1.888, lon: -76.290, k: 'event', vn: 'The San Agustín people', d: 'More than 500 stone statues with jaguar-like fangs guard tombs in the upper Magdalena River valley.' },
        { n: 'Tierradentro underground tombs', y: '~600 – 900', lat: 2.58, lon: -76.03, k: 'event', vn: 'The Tierradentro people', d: 'Tombs dug deep underground have spiral staircases and walls painted with red and black patterns, like secret rooms.' },
        { n: 'The Lost City, Teyuna', y: '~800', lat: 11.038, lon: -73.925, k: 'event', vn: 'The Tairona people', d: 'A city with more than 1,200 stone steps in the forested Sierra Nevada de Santa Marta mountains, about 650 years older than Machu Picchu.' },
        { n: 'Lake Guatavita and El Dorado', y: '~1500', lat: 4.977, lon: -73.776, k: 'legend', vn: 'The Muisca people', d: 'The new chief covered his body in gold dust and then threw gold objects into the lake – the origin of the legend of the golden land El Dorado.' }
      ]
    },
    {
      id: 'conquest', t: 'The Spanish conquest', y: '1499 – 1717',
      d: 'The Spanish founded the ports of Santa Marta and Cartagena, then went up to the highlands, conquered the Muisca and founded Bogotá.',
      ev: [
        { n: 'Alonso de Ojeda reaches La Guajira', y: '1499', lat: 12.20, lon: -72.15, approx: true, k: 'event', vn: 'Alonso de Ojeda', d: 'The first European to set foot on the coast of present-day Colombia, on the dry La Guajira peninsula.' },
        { n: 'Founding of Santa Marta', y: '1525', lat: 11.2408, lon: -74.199, k: 'event', vn: 'Rodrigo de Bastidas', d: 'The oldest surviving city of Colombia lies between the Caribbean Sea and the snowy Sierra Nevada.' },
        { n: 'Founding of Cartagena de Indias', y: '1533', lat: 10.4236, lon: -75.5487, k: 'event', vn: 'Pedro de Heredia', d: 'The port of Cartagena became the place where ships carrying gold and silver gathered before crossing the ocean to Spain.' },
        { n: 'Founding of Bogotá', y: '6 Aug 1538', lat: 4.598, lon: -74.075, k: 'event', vn: 'Gonzalo Jiménez de Quesada', d: 'After conquering the Muisca, Quesada founded the city of Santa Fe de Bogotá on a plateau 2,600 m high.' },
        { n: 'Francis Drake sacks Cartagena', y: '1586', lat: 10.4236, lon: -75.5487, k: 'battle', vn: 'Governor Pedro Fernández de Busto', vs: 'Francis Drake (England)', d: 'The English pirate and admiral took the city and demanded a ransom; afterwards Spain built strong stone walls around Cartagena.' },
        { n: 'Benkos Biohó and San Basilio de Palenque', y: '~1600', lat: 10.10, lon: -75.20, k: 'event', vn: 'Benkos Biohó', d: 'Africans who escaped slavery founded a free village; the villagers today still speak their own language mixed with African tongues.' },
        { n: 'Saint Peter Claver in Cartagena', y: '~1615 – 1654', lat: 10.4219, lon: -75.5517, k: 'event', vn: 'Peter Claver', d: 'The priest went out to the ships to care for Africans taken as slaves and was called "the slave of the slaves".' }
      ]
    },
    {
      id: 'viceroyalty', t: 'Viceroyalty of New Granada', y: '1717 – 1809',
      d: 'Bogotá became the capital of the Viceroyalty of New Granada; Cartagena defeated the English fleet and ideas of freedom began to spread.',
      ev: [
        { n: 'Viceroyalty of New Granada', y: '1717', lat: 4.598, lon: -74.075, k: 'event', vn: 'King Philip V (Spain)', d: 'Spain set up a viceroyalty made up of present-day Colombia, Ecuador, Panama and Venezuela, with its capital at Bogotá.' },
        { n: 'Battle of Cartagena de Indias', y: '1741', lat: 10.4227, lon: -75.5389, k: 'battle', vn: 'Blas de Lezo', vs: 'Admiral Edward Vernon (England)', d: 'The one-eyed, one-legged admiral Blas de Lezo held the San Felipe fortress and drove back an English fleet many times larger.' },
        { n: 'Comuneros Revolt', y: '1781', lat: 6.468, lon: -73.260, k: 'event', vn: 'José Antonio Galán, Manuela Beltrán', vs: 'The colonial government', d: 'Manuela Beltrán tore down the notice of the new taxes in Socorro, starting an uprising of thousands of peasants.' },
        { n: 'The Botanical Expedition', y: '1783', lat: 5.20, lon: -74.89, k: 'event', vn: 'José Celestino Mutis', d: 'Artists painted more than 6,000 beautiful pictures of plants; Colombia is one of the countries with the most species in the world.' },
        { n: 'Antonio Nariño translates the Rights of Man', y: '1793', lat: 4.598, lon: -74.075, k: 'event', vn: 'Antonio Nariño', d: 'Nariño secretly printed a translation of the French Declaration of the Rights of Man and was imprisoned for many years because of it.' }
      ]
    },
    {
      id: 'independence', t: 'Bolívar and the war of independence', y: '1810 – 1830',
      d: 'After many years of wins and losses, Simón Bolívar crossed the Andes and won the battle of Boyacá in 1819, creating the state of Gran Colombia.',
      route: { t: 'Bolívar\'s crossing of the Andes, 1819', pts: [[6.46, -71.73], [5.73, -71.99], [5.62, -72.42], [5.85, -72.55], [5.99, -72.69], [5.765, -73.07], [5.535, -73.367], [5.4547, -73.4083], [4.598, -74.075]] },
      ev: [
        { n: 'Llorente\'s flower vase', y: '20 Jul 1810', lat: 4.5976, lon: -74.0753, k: 'event', vn: 'Antonio Morales, Camilo Torres', d: 'An argument over a flower vase borrowed from a Spanish merchant turned into an uprising; 20 July is Colombia\'s National Day.' },
        { n: 'Siege of Cartagena', y: '1815', lat: 10.4236, lon: -75.5487, k: 'battle', vn: 'The people of Cartagena', vs: 'General Pablo Morillo (Spain)', d: 'The city held out for 105 days in hunger and thirst; Cartagena is called the "Heroic City".' },
        { n: 'Policarpa Salavarrieta', y: '14 Nov 1817', lat: 4.5981, lon: -74.0760, k: 'event', vn: 'Policarpa Salavarrieta', d: 'The seamstress who worked as a spy for the patriots was executed in Bogotá; today the day of her death is Colombian Women\'s Day.' },
        { n: 'Battle of the Vargas Swamp', y: '25 Jul 1819', lat: 5.765, lon: -73.070, k: 'battle', vn: 'Simón Bolívar, Juan José Rondón', vs: 'General José María Barreiro (Spain)', d: 'When defeat seemed near, Colonel Rondón charged the enemy with 14 cavalrymen and turned the battle around.' },
        { n: 'Battle of Boyacá', y: '7 Aug 1819', lat: 5.4547, lon: -73.4083, k: 'battle', vn: 'Simón Bolívar, Francisco de Paula Santander', vs: 'General José María Barreiro', d: 'Beside a small bridge, Bolívar\'s army captured Barreiro; three days later Bolívar entered Bogotá.' },
        { n: 'Congress of Cúcuta – Gran Colombia', y: '1821', lat: 7.83, lon: -72.47, k: 'event', vn: 'Simón Bolívar, Francisco de Paula Santander', d: 'The constitution of Gran Colombia – made up of present-day Colombia, Venezuela, Ecuador and Panama – was passed in Villa del Rosario.' },
        { n: 'Battle of Bomboná', y: '7 Apr 1822', lat: 1.18, lon: -77.42, approx: true, k: 'battle', vn: 'Simón Bolívar', vs: 'The Spanish army (Basilio García)', d: 'A difficult battle on the slope of a volcano in Nariño, which opened the way for the liberating army to advance into Ecuador.' },
        { n: 'Bolívar dies in Santa Marta', y: '17 Dec 1830', lat: 11.2275, lon: -74.1825, k: 'event', vn: 'Simón Bolívar', d: 'The Liberator died of tuberculosis at the San Pedro Alejandrino estate, in the very year Gran Colombia broke apart.' }
      ]
    },
    {
      id: 'republic', t: 'The 19th century and the Thousand Days\' War', y: '1863 – 1946',
      d: 'The Liberal and Conservative parties fought for power in many civil wars; in 1903 Panama split from Colombia.',
      ev: [
        { n: 'Rionegro Constitution', y: '1863', lat: 6.155, lon: -75.374, k: 'event', vn: 'Tomás Cipriano de Mosquera', d: 'The country was renamed the United States of Colombia, and the states were given a great deal of self-government.' },
        { n: 'Battle of Palonegro', y: '5/1900', lat: 7.10, lon: -73.15, approx: true, k: 'battle', vn: 'The Conservative army (Próspero Pinzón)', vs: 'The Liberal army (Rafael Uribe Uribe)', d: 'The biggest battle of the Thousand Days\' War lasted about two weeks near Bucaramanga; the war killed about 100,000 people.' },
        { n: 'Panama separates from Colombia', y: '3 Nov 1903', lat: 8.95, lon: -79.53, k: 'event', vn: 'The Colombian government', vs: 'Panama (backed by the USA)', d: 'Backed by the USA, Panama declared independence; right after that the USA began building the Panama Canal.' },
        { n: 'The airline SCADTA', y: '1919', lat: 10.96, lon: -74.80, k: 'event', vn: 'The founders of SCADTA', d: 'The airline founded in Barranquilla – today Avianca – is one of the oldest airlines in the world.' },
        { n: 'Banana Massacre', y: '6 Dec 1928', lat: 11.006, lon: -74.247, k: 'event', vn: 'Banana plantation workers', d: 'The army opened fire on striking workers in Ciénaga; this event appears in the novel "One Hundred Years of Solitude".' },
        { n: 'Colombia–Peru War', y: '1932 – 1933', lat: -4.215, lon: -69.940, k: 'battle', vn: 'The Colombian government', vs: 'Peru', d: 'The two countries fought over the town of Leticia on the Amazon River; the League of Nations mediated and Leticia stayed with Colombia.' }
      ]
    },
    {
      id: 'violencia', t: 'The time of La Violencia and armed conflict', y: '1948 – 1990',
      d: 'The assassination of Gaitán began the period called "La Violencia"; afterwards guerrilla groups, drug gangs and natural disasters caused the country great losses.',
      ev: [
        { n: 'Bogotazo', y: '9 Apr 1948', lat: 4.6017, lon: -74.0722, k: 'event', vn: 'Jorge Eliécer Gaitán', d: 'The assassination of the popular leader Gaitán caused riots that burned the centre of Bogotá and opened the period of "La Violencia".' },
        { n: 'Marquetalia and the birth of the FARC', y: '1964', lat: 3.06, lon: -75.70, approx: true, k: 'battle', vn: 'The Colombian army', vs: 'Guerrillas (Manuel Marulanda)', d: 'After the army\'s attack on the Marquetalia region, the guerrillas formed the FARC group.' },
        { n: 'Gabriel García Márquez receives the Nobel Prize', y: '1982', lat: 10.59, lon: -74.19, k: 'event', vn: 'Gabriel García Márquez', d: 'The writer, born in Aracataca – the inspiration for the village of Macondo in "One Hundred Years of Solitude" – won the Nobel Prize in Literature.' },
        { n: 'Siege of the Palace of Justice', y: '6 – 7 Nov 1985', lat: 4.5975, lon: -74.0756, k: 'battle', vn: 'The Colombian army', vs: 'The M-19 guerrilla group', d: 'M-19 guerrillas seized the supreme court and the army stormed the building; nearly 100 people died, including judges.' },
        { n: 'Armero disaster', y: '13 Nov 1985', lat: 4.968, lon: -74.906, k: 'event', vn: 'The people of Armero', d: 'The Nevado del Ruiz volcano erupted and melted the ice; a flow of mud buried the town of Armero, and about 23,000 people died.' }
      ]
    },
    {
      id: 'peace', t: 'A new constitution and the road to peace', y: '1991 – present',
      d: 'The 1991 constitution, the peace agreement with the FARC in 2016 and the revival of cities like Medellín opened a new chapter, though violence has not completely ended.',
      ev: [
        { n: '1991 Constitution', y: '4 Jul 1991', lat: 4.5981, lon: -74.0758, k: 'event', vn: 'President César Gaviria', d: 'The new constitution recognised Colombia as a multi-ethnic, multicultural country and protected the rights of indigenous people.' },
        { n: 'Pablo Escobar is killed', y: '2 Dec 1993', lat: 6.25, lon: -75.59, approx: true, k: 'event', vn: 'The Colombian police (Search Bloc)', vs: 'Pablo Escobar', d: 'The most notorious drug lord in the world was shot dead by police on a rooftop in Medellín.' },
        { n: 'Medellín Metrocable', y: '2004', lat: 6.293, lon: -75.541, k: 'event', vn: 'The city of Medellín', d: 'Cable cars link poor neighbourhoods on the hills to the metro, helping Medellín change from a "dangerous city" into an innovative city.' },
        { n: 'Operation Jaque', y: '2 Jul 2008', lat: 2.20, lon: -72.60, approx: true, k: 'event', vn: 'The Colombian army', vs: 'FARC', d: 'Colombian soldiers disguised as aid workers rescued 15 hostages, including Íngrid Betancourt, without firing a single shot.' },
        { n: 'Peace agreement with the FARC', y: '24 Nov 2016', lat: 4.5970, lon: -74.0730, k: 'event', vn: 'President Juan Manuel Santos', vs: 'FARC (Rodrigo Londoño "Timochenko")', d: 'The agreement, signed at the Colón Theatre in Bogotá, ended more than 50 years of conflict; Santos received the Nobel Peace Prize that year.' },
        { n: 'Egan Bernal wins the Tour de France', y: '28 Jul 2019', lat: 48.870, lon: 2.307, k: 'event', vn: 'Egan Bernal', d: 'A 22-year-old from the Zipaquirá highlands became the first Latin American to win the biggest cycling race in the world.' },
        { n: 'First left-wing president', y: '7 Aug 2022', lat: 4.5981, lon: -74.0758, k: 'event', vn: 'Gustavo Petro, Francia Márquez', d: 'Petro became the first left-wing president; Francia Márquez is Colombia\'s first Afro-Colombian vice president.' },
        { n: 'COP16 biodiversity conference', y: '10 – 11/2024', lat: 3.4516, lon: -76.532, k: 'event', vn: 'The city of Cali', d: 'Cali hosted the United Nations conference on protecting living species, with the slogan "Peace with Nature".' }
      ]
    }
  ]
};
