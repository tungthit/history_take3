// South Africa history for the Geo-Flight history layer (English text).
export default {
  iso: 'za', name: 'South Africa', flag: '🇿🇦',
  eras: [
    {
      id: 'tienso', t: 'Cradle of Humankind', y: '~3 million years ago – 1000 CE',
      d: 'South Africa has the oldest fossils of human ancestors in the world; the San were hunter-gatherers and painted on rocks for tens of thousands of years.',
      ev: [
        { n: 'The Taung Child', y: '1924', lat: -27.55, lon: 24.78, k: 'event', vn: 'Scientist Raymond Dart', d: 'The skull of a young child of a human ancestor who lived about 2.8 million years ago, showing that humankind may have originated in Africa.' },
        { n: 'Mrs. Ples at the Sterkfontein Caves', y: '1947', lat: -25.97, lon: 27.66, k: 'event', vn: 'Robert Broom', d: 'An Australopithecus skull more than 2 million years old, in the area now called the "Cradle of Humankind".' },
        { n: 'Blombos Cave', y: '~75,000 years ago', lat: -34.41, lon: 21.22, approx: true, k: 'event', vn: 'Prehistoric people', d: 'Pieces of ochre engraved with crosshatch patterns and strings of shell beads are among the oldest works of art made by humans.' },
        { n: 'San rock paintings', y: 'Thousands of years', lat: -29.20, lon: 29.55, approx: true, k: 'event', vn: 'The San', d: 'On the cliffs of the Drakensberg mountains are tens of thousands of paintings of antelopes, hunters and San ceremonies.' },
        { n: 'Bantu peoples arrive in the south', y: '~300 – 500 CE', lat: -23.90, lon: 31.00, approx: true, k: 'event', vn: 'Bantu-speaking people', d: 'Farmers who grew crops, kept cattle and smelted iron migrated from the north into northeastern South Africa.' }
      ]
    },
    {
      id: 'mapungubwe', t: 'Kingdom of Mapungubwe', y: '~1075 – 1300',
      d: 'The first kingdom in southern Africa, trading gold and ivory with Indian Ocean merchants as far as China.',
      ev: [
        { n: 'Mapungubwe Hill', y: '~1220 – 1290', lat: -22.19, lon: 29.24, k: 'event', vn: 'Kings of Mapungubwe', d: 'The king lived on top of the hill and the people lived below – an arrangement showing the first class division in this region.' },
        { n: 'The Golden Rhino', y: '~1250', lat: -22.19, lon: 29.24, k: 'event', vn: 'Goldsmiths of Mapungubwe', d: 'A small rhinoceros figure made of gold foil, found in a royal grave in 1933, is now a national treasure of South Africa.' },
        { n: 'Glass beads from far away', y: '~1200', lat: -22.20, lon: 29.30, approx: true, k: 'event', vn: 'Merchants of Mapungubwe', d: 'The glass beads and pieces of Chinese porcelain that were found show the kingdom traded through the ports of the Indian Ocean coast.' },
        { n: 'Power shifts to Great Zimbabwe', y: '~1300', lat: -20.27, lon: 30.93, approx: true, k: 'event', vn: 'The Shona', d: 'When the climate turned dry, the center of power moved north to the stone city of Great Zimbabwe.' }
      ]
    },
    {
      id: 'thuocdia', t: 'Europeans Arrive at the Cape of Good Hope', y: '1488 – 1815',
      d: 'Portuguese sailors rounded the Cape of Good Hope; the Dutch set up a supply station at Cape Town, and then the British took over the colony.',
      ev: [
        { n: 'Bartolomeu Dias rounds the Cape of Good Hope', y: '1488', lat: -34.357, lon: 18.474, k: 'event', vn: 'The Khoikhoi', vs: 'Bartolomeu Dias (Portugal)', d: 'The first time European ships sailed around the southern tip of Africa, opening the sea route to India.' },
        { n: 'Jan van Riebeeck founds Cape Town', y: '1652', lat: -33.925, lon: 18.424, k: 'event', vn: 'The Khoikhoi', vs: 'Jan van Riebeeck (Dutch East India Company)', d: 'The Dutch set up a station to supply vegetables and fresh water to merchant ships bound for Asia – the beginning of the city of Cape Town.' },
        { n: 'Castle of Good Hope', y: '1666 – 1679', lat: -33.926, lon: 18.428, k: 'event', vn: 'Dutch East India Company', d: 'A five-pointed star-shaped fort, the oldest surviving building in South Africa.' },
        { n: 'The Eastern Frontier Wars', y: '1779 – 1879', lat: -33.0, lon: 26.5, approx: true, k: 'battle', vn: 'The Xhosa', vs: 'Dutch, then British settlers', d: 'For 100 years, the Xhosa resisted white settlers taking over grazing land along the Great Fish River.' },
        { n: 'Battle of Blaauwberg', y: '1806', lat: -33.80, lon: 18.46, k: 'battle', vn: 'Dutch army (Jan Willem Janssens)', vs: 'British army (David Baird)', d: 'The British landed north of Cape Town and won the battle; the Cape Colony passed to Britain.' }
      ]
    },
    {
      id: 'zulu', t: 'The Zulu Kingdom and the Great Trek', y: '1816 – 1879',
      d: 'King Shaka built the mighty Zulu kingdom; the Dutch-descended Boers left the Cape and went north to found their own states, clashing with the Zulu.',
      route: { t: 'The Boers\' Great Trek 1835 – 1840', pts: [[-32.25, 24.53], [-30.97, 25.0], [-29.21, 26.84], [-28.70, 28.90], [-28.56, 29.78], [-29.60, 30.38]] },
      ev: [
        { n: 'King Shaka founds the Zulu kingdom', y: '1816', lat: -28.90, lon: 31.45, approx: true, k: 'event', vn: 'King Shaka', d: 'Shaka reorganized the army with a short spear and the "buffalo horns" formation, turning a small clan into the largest kingdom in the region.' },
        { n: 'The Great Trek', y: '1835 – 1840', lat: -29.21, lon: 26.84, approx: true, k: 'event', vn: 'The Boers (Voortrekkers)', d: 'Thousands of Boer families drove ox wagons out of the Cape Colony across the mountains to the north in search of new land.' },
        { n: 'Battle of Blood River', y: 'Dec 16, 1838', lat: -28.10, lon: 30.54, k: 'battle', vn: 'Andries Pretorius (Voortrekkers)', vs: 'Zulu army of King Dingane', d: 'The Boers arranged their ox wagons in a defensive circle and drove back a Zulu army many times larger.' },
        { n: 'Diamonds found at Kimberley', y: '1871', lat: -28.738, lon: 24.758, k: 'event', vn: 'Miners from all over the world', d: 'People dug the "Big Hole" by hand, more than 200 m deep, in search of diamonds – one of the largest hand-dug pits in the world.' },
        { n: 'Battle of Isandlwana', y: 'Jan 22, 1879', lat: -28.36, lon: 30.65, k: 'battle', vn: 'Ntshingwayo kaMahole (general of King Cetshwayo)', vs: 'British army (Lord Chelmsford)', d: 'The Zulu defeated a British army armed with modern rifles – Britain\'s worst defeat by a native army.' },
        { n: 'Battle of Rorke\'s Drift', y: 'Jan 22 – 23, 1879', lat: -28.36, lon: 30.54, k: 'battle', vn: 'Prince Dabulamanzi (Zulu)', vs: 'British army (John Chard)', d: 'Only about 150 British soldiers held a mission station overnight against thousands of Zulu warriors.' },
        { n: 'Battle of Ulundi', y: 'Jul 4, 1879', lat: -28.31, lon: 31.43, approx: true, k: 'battle', vn: 'King Cetshwayo', vs: 'British army (Lord Chelmsford)', d: 'The British burned the capital Ulundi, ending the independent Zulu kingdom.' }
      ]
    },
    {
      id: 'boer', t: 'Gold, the Boer Wars and the Union of South Africa', y: '1880 – 1948',
      d: 'The discovery of gold made Britain want to seize the two Boer republics; the two Boer Wars ended with the founding of the Union of South Africa.',
      ev: [
        { n: 'Battle of Majuba Hill', y: 'Feb 27, 1881', lat: -27.47, lon: 29.85, k: 'battle', vn: 'General Piet Joubert (Boer)', vs: 'General George Colley (British)', d: 'The Boers climbed the hill and defeated the British, ending the First Boer War and keeping the Transvaal.' },
        { n: 'Witwatersrand Gold Rush', y: '1886', lat: -26.20, lon: 28.05, k: 'event', vn: 'Miners', d: 'The world\'s largest gold field was found; within a few years Johannesburg sprang up from a grassy plain.' },
        { n: 'Gandhi thrown off the train', y: '1893', lat: -29.60, lon: 30.38, k: 'event', vn: 'Lawyer Mohandas Gandhi', d: 'Pushed out of a first-class carriage at Pietermaritzburg station because he was a person of color, Gandhi resolved to struggle nonviolently.' },
        { n: 'Siege of Ladysmith', y: '1899 – 1900', lat: -28.56, lon: 29.78, k: 'battle', vn: 'General Piet Joubert (Boer)', vs: 'General George White (British)', d: 'The Boers besieged the town for 118 days in the Second Boer War.' },
        { n: 'Battle of Spion Kop', y: '1900', lat: -28.65, lon: 29.52, k: 'battle', vn: 'General Louis Botha (Boer)', vs: 'General Redvers Buller (British)', d: 'The British took the hilltop in fog and were then shot at from the surrounding hills; both sides thought they had lost.' },
        { n: 'Relief of Mafeking', y: '1900', lat: -25.86, lon: 25.64, k: 'battle', vn: 'General Piet Cronjé (Boer)', vs: 'Colonel Robert Baden-Powell (British)', d: 'The town held out for 217 days; its commander Baden-Powell later founded the Scout movement.' },
        { n: 'Peace of Vereeniging', y: 'May 31, 1902', lat: -25.75, lon: 28.19, k: 'event', vn: 'Louis Botha, Jan Smuts', vs: 'Lord Kitchener (British)', d: 'The Boers surrendered; the war and the concentration camps had killed tens of thousands of civilians.' },
        { n: 'Founding of the Union of South Africa', y: 'May 31, 1910', lat: -25.740, lon: 28.212, k: 'event', vn: 'Prime Minister Louis Botha', d: 'Four colonies joined into a self-governing nation within the British Empire, but most Black people could not vote.' },
        { n: 'Founding of the ANC', y: '1912', lat: -29.12, lon: 26.21, k: 'event', vn: 'John Dube, Sol Plaatje', d: 'The African National Congress (ANC) was founded in Bloemfontein to demand rights for Black people.' }
      ]
    },
    {
      id: 'apartheid', t: 'The Apartheid Era', y: '1948 – 1990',
      d: 'The National Party government set up the apartheid system of racial segregation by law; Black people struggled on persistently, and many leaders were jailed.',
      ev: [
        { n: 'Apartheid begins', y: '1948', lat: -33.925, lon: 18.418, approx: true, k: 'event', vn: 'Prime Minister D. F. Malan', d: 'New laws divided people by skin color: different schools, different neighborhoods, even different seats on buses.' },
        { n: 'Freedom Charter', y: '1955', lat: -26.28, lon: 27.89, k: 'event', vn: 'ANC and its allies', d: 'At Kliptown, thousands of people adopted a charter that began with the words "South Africa belongs to all who live in it".' },
        { n: 'Sharpeville massacre', y: 'Mar 21, 1960', lat: -26.69, lon: 27.87, k: 'event', vn: 'Protesters', vs: 'Apartheid police', d: 'Police opened fire on a march, killing 69 people; March 21 is now the International Day for the Elimination of Racial Discrimination.' },
        { n: 'Mandela sent to Robben Island', y: '1964', lat: -33.806, lon: 18.366, k: 'event', vn: 'Nelson Mandela', vs: 'Apartheid government', d: 'After the Rivonia Trial, Mandela was sentenced to life in prison; he spent 18 of his 27 years in prison on this island.' },
        { n: 'First heart transplant', y: 'Dec 3, 1967', lat: -33.941, lon: 18.465, k: 'event', vn: 'Dr. Christiaan Barnard', d: 'At Groote Schuur Hospital in Cape Town, for the first time in the world one person\'s heart was transplanted into another.' },
        { n: 'Soweto uprising', y: 'Jun 16, 1976', lat: -26.24, lon: 27.91, k: 'event', vn: 'Soweto students (Hector Pieterson)', vs: 'Apartheid police', d: 'Students marched to protest being forced to study in Afrikaans; June 16 is now South Africa\'s Youth Day.' },
        { n: 'Mandela released from prison', y: 'Feb 11, 1990', lat: -33.78, lon: 18.96, approx: true, k: 'event', vn: 'Nelson Mandela, President F. W. de Klerk', d: 'After 27 years in prison, Mandela walked out of the prison near Paarl, holding his wife\'s hand and raising it high before millions watching on television.' }
      ]
    },
    {
      id: 'cauvong', t: 'The Rainbow Nation to Today', y: '1994 – present',
      d: 'The 1994 election open to all people made Mandela president; South Africa became the "Rainbow Nation" of many colors.',
      ev: [
        { n: 'Election open to all', y: 'Apr 27, 1994', lat: -26.20, lon: 28.05, approx: true, k: 'event', vn: 'People of South Africa', d: 'Millions of Black people voted for the first time, standing in lines kilometers long; April 27 is Freedom Day.' },
        { n: 'Mandela inaugurated as President', y: 'May 10, 1994', lat: -25.740, lon: 28.212, k: 'event', vn: 'President Nelson Mandela', d: 'At the Union Buildings in Pretoria, the former prisoner became South Africa\'s first Black president.' },
        { n: 'Rugby World Cup victory', y: 'Jun 24, 1995', lat: -26.197, lon: 28.061, k: 'event', vn: 'Nelson Mandela, captain François Pienaar', d: 'Mandela, wearing the team\'s jersey, presented the trophy, helping white and Black South Africans celebrate together.' },
        { n: 'Truth and Reconciliation Commission', y: '1996 – 1998', lat: -33.925, lon: 18.42, approx: true, k: 'event', vn: 'Archbishop Desmond Tutu', d: 'Victims and perpetrators of apartheid-era crimes told the truth publicly so that the country could heal its wounds.' },
        { n: '2010 World Cup', y: '2010', lat: -26.235, lon: 27.983, k: 'event', vn: 'President Jacob Zuma', d: 'South Africa was the first African country to host the World Cup; the sound of vuvuzela horns echoed through the stadiums.' },
        { n: 'Mandela dies', y: 'Dec 5, 2013', lat: -31.78, lon: 28.62, approx: true, k: 'event', vn: 'Nelson Mandela', d: 'The whole world remembered him; Mandela was buried in his home village of Qunu.' },
        { n: 'MeerKAT telescope', y: '2018', lat: -30.71, lon: 21.44, approx: true, k: 'event', vn: 'South African scientists', d: '64 dish antennas in the middle of the Karoo captured an image of the center of the Milky Way, part of the SKA radio telescope project.' },
        { n: 'Government of National Unity', y: '2024', lat: -25.740, lon: 28.212, approx: true, k: 'event', vn: 'President Cyril Ramaphosa', d: 'For the first time the ANC lost its majority in parliament and had to form a coalition government with several other parties.' },
        { n: 'G20 summit in Johannesburg', y: 'Nov 2025', lat: -26.10, lon: 28.05, approx: true, k: 'event', vn: 'President Cyril Ramaphosa', d: 'For the first time, a G20 summit was held on African soil.' }
      ]
    }
  ]
};
