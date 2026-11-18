// Brazil history for the Geo-Flight history layer (English text).
export default {
  iso: 'br', name: 'Brazil', flag: '🇧🇷',
  eras: [
    {
      id: 'native', t: 'Indigenous peoples', y: '~11000 BCE – 1500',
      d: 'Before the Portuguese arrived, millions of indigenous people lived in Brazil – from hunters who painted on rock walls to large villages in the Amazon forest.',
      ev: [
        { n: 'The skull "Luzia"', y: '~11,500 years ago', lat: -19.63, lon: -43.90, approx: true, k: 'event', vn: 'The first Americans', d: 'The skull of a woman found at Lagoa Santa is one of the oldest human remains in the Americas.' },
        { n: 'Serra da Capivara rock paintings', y: '~10,000 years ago', lat: -8.83, lon: -42.55, k: 'event', vn: 'Ancient hunters', d: 'Thousands of red paintings of deer, jaguars and hunting scenes cover the rock walls in the state of Piauí.' },
        { n: 'Marajoara culture', y: '~400 – 1400', lat: -0.98, lon: -49.60, approx: true, k: 'event', vn: 'The Marajoara people', d: 'On Marajó Island at the mouth of the Amazon, people of long ago piled up earth mounds to build villages and made beautifully decorated clay vessels.' },
        { n: 'Large villages of the Upper Xingu', y: '~1250', lat: -12.56, lon: -53.11, approx: true, k: 'event', vn: 'Ancestors of the Kuikuro', d: 'The Amazon forest once had large villages linked by straight roads, ditches and bridges – not at all as "untouched" as people thought.' },
        { n: 'The Tupinambá on the coast', y: '~1500', lat: -22.91, lon: -43.17, approx: true, k: 'event', vn: 'The Tupinambá people', d: 'The Tupi lived along the coast, grew cassava and built dugout canoes; many Tupi words remain in Brazilian Portuguese.' }
      ]
    },
    {
      id: 'colony', t: 'Portuguese colony', y: '1494 – 1807',
      d: 'Portugal took Brazil and set up sugar plantations worked by enslaved Africans, then found gold in Minas Gerais.',
      ev: [
        { n: 'Treaty of Tordesillas', y: '1494', lat: 41.50, lon: -5.00, k: 'event', vn: 'King João II (Portugal)', vs: 'The Catholic Monarchs (Spain)', d: 'The two countries drew a line dividing the world in two; the eastern part – including eastern Brazil – went to Portugal.' },
        { n: 'Cabral lands in Brazil', y: '22 Apr 1500', lat: -16.45, lon: -39.06, approx: true, k: 'event', vn: 'Pedro Álvares Cabral', d: 'A Portuguese fleet on its way to India sighted Monte Pascoal and landed near Porto Seguro.' },
        { n: 'Salvador – the first capital', y: '1549', lat: -12.97, lon: -38.51, k: 'event', vn: 'Tomé de Sousa', d: 'Salvador was Brazil\'s capital for more than 200 years and the main port for sugar and slaves.' },
        { n: 'Battle of Guanabara Bay', y: '1567', lat: -22.91, lon: -43.17, k: 'battle', vn: 'Estácio de Sá, Mem de Sá', vs: 'The French and their Tamoio allies', d: 'The Portuguese drove the French out of the bay and kept the newly founded city of Rio de Janeiro; Estácio de Sá was killed in battle.' },
        { n: 'Battles of Guararapes', y: '1648 – 1649', lat: -8.16, lon: -34.94, k: 'battle', vn: 'André Vidal de Negreiros, Henrique Dias, Filipe Camarão', vs: 'Dutch army', d: 'White, Black and indigenous soldiers fought together to defeat the Dutch army that held Pernambuco.' },
        { n: 'Quilombo of Palmares', y: '1695', lat: -9.13, lon: -36.13, approx: true, k: 'battle', vn: 'Zumbi dos Palmares', vs: 'Colonial army (Domingos Jorge Velho)', d: 'The village of escaped slaves lasted almost 100 years; the day Zumbi died (20 November) is now a holiday for Black Brazilians.' },
        { n: 'Ouro Preto gold rush', y: '~1700', lat: -20.385, lon: -43.503, k: 'event', vn: 'The bandeirantes', d: 'Gold was found in Minas Gerais and tens of thousands of people rushed in; the "Black Gold" town is now full of gilded churches.' },
        { n: 'Tiradentes executed', y: '21 Apr 1792', lat: -22.906, lon: -43.176, k: 'event', vn: 'Tiradentes', d: 'The dentist who joined a plot for independence in Minas Gerais was hanged in Rio; 21 April is now a national holiday.' }
      ]
    },
    {
      id: 'empire', t: 'The Portuguese court and the Empire of Brazil', y: '1808 – 1889',
      d: 'Fleeing Napoleon, the Portuguese king moved his court to Rio; his son declared Brazil independent and Brazil was an empire for 67 years.',
      ev: [
        { n: 'The court arrives in Rio de Janeiro', y: '1808', lat: -22.903, lon: -43.174, k: 'event', vn: 'Prince Regent João (João VI)', d: 'The only time in history that a European country was ruled from its own colony, across the ocean.' },
        { n: 'Cry of Ipiranga', y: '7 Sep 1822', lat: -23.585, lon: -46.609, k: 'event', vn: 'Prince Pedro (Pedro I)', d: 'Beside the Ipiranga stream in São Paulo, Pedro drew his sword and cried "Independence or death!" and became Emperor of Brazil.' },
        { n: 'Farroupilha Revolution', y: '1835 – 1845', lat: -30.03, lon: -51.23, k: 'battle', vn: 'Bento Gonçalves (the Farrapos side)', vs: 'Imperial army', d: 'The far south declared itself a separate republic; the war lasted 10 years and ended with a peace treaty.' },
        { n: 'Battle of Riachuelo', y: '11 June 1865', lat: -27.60, lon: -58.75, approx: true, k: 'battle', vn: 'Admiral Francisco Manuel Barroso', vs: 'Paraguayan navy', d: 'A naval battle on the Paraná River: Brazilian ships rammed and sank Paraguayan ships, taking control of the river route.' },
        { n: 'Battle of Tuyutí', y: '24 May 1866', lat: -27.17, lon: -58.30, approx: true, k: 'battle', vn: 'General Manuel Luís Osório', vs: 'Paraguayan army', d: 'The biggest battle ever fought in South America, in the war of Brazil, Argentina and Uruguay against Paraguay.' },
        { n: 'Golden Law abolishes slavery', y: '13 May 1888', lat: -22.903, lon: -43.174, k: 'event', vn: 'Princess Isabel', d: 'Brazil was the last country in the Americas to end slavery, freeing about 700,000 people.' },
        { n: 'Proclamation of the Republic', y: '15 Nov 1889', lat: -22.906, lon: -43.18, k: 'event', vn: 'Marshal Deodoro da Fonseca', d: 'The army deposed Emperor Pedro II almost without a shot; the royal family went to live in France.' }
      ]
    },
    {
      id: 'republic', t: 'The Republic and the Vargas era', y: '1896 – 1960',
      d: 'The young republic put down uprisings, Getúlio Vargas held power for a long time, Brazil sent troops to Europe and built a new capital on the plateau.',
      ev: [
        { n: 'War of Canudos', y: '1896 – 1897', lat: -9.95, lon: -39.17, k: 'battle', vn: 'Antônio Conselheiro', vs: 'Republican army', d: 'A village of poor farmers following the preacher Conselheiro resisted four attacks before it was destroyed.' },
        { n: 'Flight of the 14-bis', y: '1906', lat: 48.868, lon: 2.247, k: 'event', vn: 'Alberto Santos-Dumont', d: 'In Paris, the Brazilian inventor flew the 14-bis, which took off on wheels; Brazilians regard him as the father of aviation.' },
        { n: 'Revolution of 1930', y: '1930', lat: -22.906, lon: -43.18, k: 'event', vn: 'Getúlio Vargas', d: 'Vargas took power and led for almost 19 years in total, building industry and labor laws for Brazil.' },
        { n: 'Christ the Redeemer statue', y: '1931', lat: -22.9519, lon: -43.2105, k: 'event', vn: 'Heitor da Silva Costa, Paul Landowski', d: 'The 30 m statue with outstretched arms on top of Corcovado mountain is now one of the New Seven Wonders of the World.' },
        { n: 'Battle of Monte Castello', y: '21 Feb 1945', lat: 44.19, lon: 10.93, approx: true, k: 'battle', vn: 'Brazilian Expeditionary Force (Mascarenhas de Morais)', vs: 'German army', d: 'Brazilian soldiers took the mountain in northern Italy after several failed attacks during the winter.' },
        { n: 'Maracanazo', y: '16 July 1950', lat: -22.9122, lon: -43.2302, k: 'event', vn: 'Brazil national team', vs: 'Uruguay', d: 'Nearly 200,000 spectators fell silent when Brazil lost to Uruguay in the deciding World Cup match right at the Maracanã stadium.' },
        { n: 'Inauguration of Brasília', y: '21 Apr 1960', lat: -15.7998, lon: -47.8645, k: 'event', vn: 'Juscelino Kubitschek, Oscar Niemeyer, Lúcio Costa', d: 'The new capital was built in about 4 years on an empty plateau, and seen from above it looks like an airplane.' }
      ]
    },
    {
      id: 'military', t: 'The age of Pelé and the military government', y: '1958 – 1985',
      d: 'Brazil won the World Cup three times with Pelé; from 1964 to 1985 the military ruled, building many large projects but limiting freedom.',
      ev: [
        { n: '1958 World Cup champions', y: '1958', lat: 59.3625, lon: 18.000, k: 'event', vn: 'Pelé, Garrincha', d: 'The 17-year-old Pelé scored two goals in the final in Sweden, and Brazil won the world title for the first time.' },
        { n: 'Coup of 1964', y: '1964', lat: -15.7998, lon: -47.8645, k: 'event', vn: 'General Castelo Branco', vs: 'President João Goulart', d: 'The army overthrew the president and ruled for 21 years; many opponents were arrested or went into exile.' },
        { n: '1970 World Cup champions', y: '21 June 1970', lat: 19.303, lon: -99.150, k: 'event', vn: 'Pelé, Carlos Alberto', d: 'At the Azteca stadium (Mexico), Brazil beat Italy 4–1 and kept the Jules Rimet Trophy permanently after its third title.' },
        { n: 'Trans-Amazonian Highway', y: '1972', lat: -3.20, lon: -52.21, approx: true, k: 'event', vn: 'Military government (Emílio Médici)', d: 'A road thousands of kilometers long cut across the Amazon forest, opening the way for settlers but also destroying much forest.' },
        { n: 'Itaipu hydroelectric dam', y: '1984', lat: -25.408, lon: -54.589, k: 'event', vn: 'Brazil and Paraguay', d: 'One of the largest hydroelectric plants in the world, on the Paraná River, built by the two countries together, which share its electricity.' },
        { n: '"Direct Elections Now" movement', y: '1984', lat: -23.550, lon: -46.634, k: 'event', vn: 'Ulysses Guimarães, Tancredo Neves', d: 'Millions of people took to the streets demanding to elect their own president; the next year civilian government returned.' }
      ]
    },
    {
      id: 'democracy', t: 'Democratic Brazil', y: '1985 – present',
      d: 'Brazil became the largest economy in Latin America and hosted the World Cup and the Olympics, but it still faces political division, deforestation and natural disasters.',
      ev: [
        { n: 'Constitution of 1988', y: '5 Oct 1988', lat: -15.7997, lon: -47.8641, k: 'event', vn: 'Ulysses Guimarães', d: 'The constitution, called the "Citizen Constitution", guaranteed the right to vote, free health care and the rights of indigenous peoples.' },
        { n: 'Chico Mendes', y: '1988', lat: -10.65, lon: -68.50, k: 'event', vn: 'Chico Mendes', d: 'The rubber tapper who fought to protect the Amazon forest was murdered; he became a global symbol of environmental protection.' },
        { n: 'Rio Earth Summit', y: '1992', lat: -22.906, lon: -43.18, k: 'event', vn: 'City of Rio de Janeiro', d: 'More than 170 countries met in Rio to discuss how to protect the climate and living species.' },
        { n: 'Ayrton Senna dies', y: '1 May 1994', lat: 44.344, lon: 11.716, k: 'event', vn: 'Ayrton Senna', d: 'The three-time Formula 1 world champion died at Imola (Italy); millions of Brazilians bid him farewell.' },
        { n: 'Fifth World Cup title', y: '30 June 2002', lat: 35.510, lon: 139.606, k: 'event', vn: 'Ronaldo, Rivaldo, Ronaldinho', d: 'Ronaldo scored two goals against Germany in Yokohama, and Brazil became the only team with five world titles.' },
        { n: 'Astronaut Marcos Pontes', y: '2006', lat: 45.920, lon: 63.342, k: 'event', vn: 'Marcos Pontes', d: 'From Baikonur, he flew to the International Space Station and became the first Brazilian in space.' },
        { n: 'The 1–7 defeat', y: '8 July 2014', lat: -19.866, lon: -43.971, k: 'event', vn: 'Brazil national team', vs: 'Germany', d: 'Hosting the 2014 World Cup, Brazil lost 1–7 to Germany in the semifinal in Belo Horizonte – the national team\'s heaviest defeat ever.' },
        { n: 'Mariana dam collapse', y: '5 Nov 2015', lat: -20.235, lon: -43.42, k: 'event', vn: 'The people of Bento Rodrigues', d: 'A dam holding iron-ore waste burst, and the mud swept through a village and stained the Doce River red all the way to the sea.' },
        { n: 'Rio Olympics', y: '2016', lat: -22.9122, lon: -43.2302, k: 'event', vn: 'City of Rio de Janeiro', d: 'The first Olympics in South America; Hoàng Xuân Vinh won Vietnam\'s first-ever gold medal, in shooting.' },
        { n: 'Attack on the Three Powers', y: '8 Jan 2023', lat: -15.7997, lon: -47.8641, k: 'event', vn: 'President Lula da Silva', d: 'Supporters of former President Bolsonaro stormed Congress, the Supreme Court and the presidential palace in Brasília.' },
        { n: 'Rio Grande do Sul floods', y: 'May 2024', lat: -30.03, lon: -51.23, k: 'event', vn: 'The people of Porto Alegre', d: 'Heavy rain caused the worst floods in the state\'s history, even submerging Porto Alegre airport; hundreds of thousands of people had to leave their homes.' },
        { n: 'COP30 climate conference', y: 'Nov 2025', lat: -1.456, lon: -48.502, k: 'event', vn: 'President Lula da Silva', d: 'The city of Belém, at the gateway to the Amazon, hosted the United Nations climate conference, discussing protection of tropical forests.' }
      ]
    }
  ]
};
