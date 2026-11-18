// United States history for the Geo-Flight history layer (English text).
export default {
  iso: 'us', name: 'United States', flag: '🇺🇸',
  eras: [
    {
      id: 'native', t: 'Native Peoples and the Colonial Era', y: '~850 – 1763',
      d: 'Hundreds of Native peoples lived in North America for thousands of years before Europeans arrived; from the 16th century, Spain, England, France and the Netherlands founded colonies.',
      ev: [
        { n: 'Pueblo Bonito at Chaco Canyon', y: '~850 – 1150', lat: 36.061, lon: -107.962, k: 'event', d: 'The Ancestral Puebloans built a "great house" of over 600 rooms in the desert, linking villages with perfectly straight roads.' },
        { n: 'City of Cahokia', y: '~1050 – 1350', lat: 38.655, lon: -90.062, k: 'event', d: 'The largest city in North America before Columbus, with the 30 m high Monks Mound, possibly as populous as London at the time.' },
        { n: 'Mesa Verde cliff dwellings', y: '~1190 – 1280', lat: 37.184, lon: -108.489, k: 'event', d: 'Stone villages built snugly into cliff alcoves, such as Cliff Palace with about 150 rooms.' },
        { n: 'Haudenosaunee (Iroquois) Confederacy', y: '~1450', lat: 42.95, lon: -76.15, approx: true, k: 'legend', vn: 'Hiawatha, Deganawida', d: 'Five, and later six, Native nations pledged peace under one "Great Law of Peace" – a long-lasting alliance in North America.' },
        { n: 'City of St. Augustine', y: '1565', lat: 29.894, lon: -81.313, k: 'event', d: 'Founded by the Spanish in Florida; it is the oldest continuously inhabited European-founded city in the United States.' },
        { n: 'Jamestown settlement', y: '1607', lat: 37.209, lon: -76.777, k: 'event', vn: 'John Smith', vs: 'Powhatan Confederacy', d: 'The first lasting English colony; Pocahontas, daughter of Chief Powhatan, was a famous figure of the time.' },
        { n: 'Enslaved Africans arrive in Virginia', y: '1619', lat: 37.00, lon: -76.31, k: 'event', d: 'About 20 Africans were brought to Point Comfort – the beginning of more than 240 years of slavery in British North America and the United States.' },
        { n: 'Mayflower lands at Plymouth', y: '1620', lat: 41.958, lon: -70.662, k: 'event', vn: 'William Bradford', d: 'Puritan Pilgrims founded the Plymouth colony; the Wampanoag helped them survive the winter.' },
        { n: 'New Amsterdam', y: '1626', lat: 40.704, lon: -74.013, k: 'event', vn: 'Peter Minuit', d: 'The Dutch founded a town at the tip of Manhattan Island; in 1664 the English took it and renamed it New York.' },
        { n: 'Benjamin Franklin\'s lightning rod', y: '1752', lat: 39.95, lon: -75.15, k: 'discovery', vn: 'Benjamin Franklin', d: 'Franklin showed that lightning is electricity and invented the lightning rod – a pointed iron rod that leads lightning into the ground, still protecting buildings today.' },
        { n: 'Fort Necessity', y: '1754', lat: 39.815, lon: -79.587, k: 'battle', vn: 'George Washington', vs: 'French and their Native allies', d: 'One of the first battles of the French and Indian War; Washington, only 22, lost and had to surrender.' }
      ]
    },
    {
      id: 'revolution', t: 'The American Revolution', y: '1765 – 1789',
      d: 'Thirteen colonies protested British taxes, declared independence in 1776 and after 8 years of war founded the United States of America.',
      route: { t: 'March to Yorktown 1781', pts: [[41.01, -73.87], [40.22, -74.77], [39.95, -75.15], [39.60, -75.83], [39.29, -76.61], [37.27, -76.71], [37.234, -76.507]] },
      ev: [
        { n: 'Boston Tea Party', y: '1773', lat: 42.352, lon: -71.051, k: 'event', vn: 'Samuel Adams, Sons of Liberty', vs: 'British government', d: 'Colonists disguised as Native Americans dumped 342 chests of tea into the sea to protest "taxation without representation".' },
        { n: 'Battles of Lexington and Concord', y: '1775', lat: 42.469, lon: -71.351, k: 'battle', vn: 'John Parker, "Minutemen" militia', vs: 'British army', d: 'The "shot heard round the world" at North Bridge began the war of independence.' },
        { n: 'Battle of Bunker Hill', y: '1775', lat: 42.376, lon: -71.061, k: 'battle', vn: 'William Prescott', vs: 'William Howe (British)', d: 'Legend says the order was "Don\'t fire until you see the whites of their eyes!"; the British took the hill but suffered very heavy losses.' },
        { n: 'Declaration of Independence', y: 'Jul 4, 1776', lat: 39.9489, lon: -75.1500, k: 'event', vn: 'Thomas Jefferson, Benjamin Franklin, John Adams', d: '"All men are created equal…" – adopted in Independence Hall, Philadelphia; July 4 is America\'s National Day.' },
        { n: 'Crossing the Delaware – Battle of Trenton', y: '1776', lat: 40.22, lon: -74.77, k: 'battle', vn: 'George Washington', vs: 'Hessian mercenaries (British)', d: 'On Christmas night, Washington crossed the icy river and surprised Trenton, lifting the revolutionary army\'s morale.' },
        { n: 'Battle of Saratoga', y: '1777', lat: 43.00, lon: -73.64, k: 'battle', vn: 'Horatio Gates, Benedict Arnold', vs: 'John Burgoyne (British)', d: 'An entire British army surrendered – the turning point that led France to decide to ally with America.' },
        { n: 'Winter at Valley Forge', y: '1777 – 1778', lat: 40.097, lon: -75.44, k: 'event', vn: 'George Washington, Friedrich von Steuben', d: 'The soldiers were hungry, cold and short of shoes, but were retrained and became a professional army.' },
        { n: 'Battle of Yorktown', y: '1781', lat: 37.234, lon: -76.507, k: 'battle', vn: 'George Washington, French General Rochambeau', vs: 'Charles Cornwallis (British)', d: 'Besieged by land and blocked at sea by the French fleet, Cornwallis surrendered; the war was nearly over.' },
        { n: 'Treaty of Paris', y: '1783', lat: 48.857, lon: 2.352, k: 'event', vn: 'Benjamin Franklin, John Adams, John Jay', vs: 'Kingdom of Great Britain', d: 'Britain recognized the independence of the United States, with its border stretching to the Mississippi River.' },
        { n: 'Constitution and first president', y: '1787 – 1789', lat: 40.707, lon: -74.010, k: 'event', vn: 'George Washington, James Madison', d: 'The Constitution written in 1787 is still in use today; Washington took the oath of office at Federal Hall, New York.' }
      ]
    },
    {
      id: 'expansion', t: 'Westward Expansion', y: '1790 – 1860',
      d: 'America bought and seized more land all the way to the Pacific coast; Native peoples were pushed from their homelands, and the dispute over slavery grew ever sharper.',
      route: { t: 'Journey of Lewis and Clark 1804 – 1806', pts: [[38.63, -90.20], [41.26, -95.93], [47.30, -101.33], [47.50, -111.30], [46.92, -114.09], [46.42, -117.03], [45.61, -121.18], [46.13, -123.88]] },
      ev: [
        { n: 'Washington becomes the capital', y: '1800', lat: 38.8899, lon: -77.0091, k: 'event', vn: 'John Adams', d: 'The government moved to the new city on the Potomac River; John Adams was the first president to live in the White House.' },
        { n: 'Louisiana Purchase', y: '1803', lat: 29.951, lon: -90.071, k: 'event', vn: 'Thomas Jefferson', vs: 'Napoléon (France)', d: 'Bought from France for about 15 million dollars, a region of more than 2 million km² doubled the size of the United States.' },
        { n: 'Lewis and Clark Expedition', y: '1804 – 1806', lat: 46.13, lon: -123.88, k: 'event', vn: 'Meriwether Lewis, William Clark, Sacagawea', d: 'They traveled from St. Louis to the Pacific and back; the young Shoshone woman Sacagawea served as interpreter and helped the party trade for horses to cross the mountains.' },
        { n: 'Fort McHenry', y: '1814', lat: 39.263, lon: -76.580, k: 'battle', vn: 'George Armistead', vs: 'British navy', d: 'Seeing the flag still flying after a night of bombardment, Francis Scott Key wrote the poem that became the American national anthem.' },
        { n: 'Battle of New Orleans', y: '1815', lat: 29.942, lon: -89.990, k: 'battle', vn: 'Andrew Jackson', vs: 'Edward Pakenham (British)', d: 'The last major battle of the War of 1812, fought after the peace treaty was signed but before the news arrived.' },
        { n: 'Erie Canal', y: '1825', lat: 42.65, lon: -73.75, k: 'event', vn: 'DeWitt Clinton', d: 'The 584 km canal linked the Great Lakes with the Hudson River, making New York the nation\'s biggest port.' },
        { n: '"Trail of Tears"', y: '1838 – 1839', lat: 35.0, lon: -88.0, approx: true, k: 'event', d: 'The government forced the Cherokee out of their homeland in the east to Oklahoma; thousands died along the way.' },
        { n: 'First telegraph message', y: 'May 24, 1844', lat: 38.8899, lon: -77.0091, k: 'discovery', vn: 'Samuel Morse', d: 'From the Capitol, Morse tapped out dots and dashes sending "What hath God wrought" to Baltimore – a message traveling about 60 km in an instant.' },
        { n: 'First public operation using ether anesthesia', y: 'Oct 16, 1846', lat: 42.3632, lon: -71.0686, k: 'discovery', vn: 'William Morton', d: 'At Massachusetts General Hospital in Boston, the patient slept soundly while the surgeon removed a tumor from his neck – from then on surgery was no longer torture.' },
        { n: 'Battle of Chapultepec', y: '1847', lat: 19.420, lon: -99.182, k: 'battle', vn: 'Winfield Scott', vs: 'Mexican army', d: 'American troops took the castle on the hill in Mexico City; Mexico lost nearly half of its northern territory to the US.' },
        { n: 'Seneca Falls Convention', y: '1848', lat: 42.911, lon: -76.800, k: 'event', vn: 'Elizabeth Cady Stanton, Lucretia Mott', d: 'The first convention to demand rights for women, including the right to vote – not won until 1920.' },
        { n: 'California Gold Rush', y: '1848 – 1855', lat: 38.80, lon: -120.89, k: 'event', d: 'Gold was found at Sutter\'s Mill; about 300,000 people poured into California and San Francisco boomed.' }
      ]
    },
    {
      id: 'civilwar', t: 'The American Civil War', y: '1850 – 1865',
      d: 'Eleven Southern states that wanted to keep slavery seceded and formed the Confederacy; after four years of fierce civil war, the North won and slavery was abolished.',
      route: { t: 'Sherman\'s March to the Sea 1864', pts: [[33.749, -84.388], [33.58, -83.47], [33.08, -83.23], [32.80, -82.40], [32.08, -81.09]] },
      ev: [
        { n: 'Underground Railroad', y: '1850s', lat: 39.29, lon: -76.61, approx: true, k: 'event', vn: 'Harriet Tubman, Frederick Douglass', d: 'A secret network that helped enslaved people escape north; Harriet Tubman personally led about 70 people to freedom.' },
        { n: 'Fort Sumter', y: '1861', lat: 32.752, lon: -79.875, k: 'battle', vn: 'Robert Anderson (Union)', vs: 'P. G. T. Beauregard (Confederate)', d: 'The South shelled the fort in Charleston harbor – the shots that opened the Civil War.' },
        { n: 'First Battle of Bull Run', y: '1861', lat: 38.81, lon: -77.52, k: 'battle', vn: 'Irvin McDowell (Union)', vs: 'Stonewall Jackson, Beauregard (Confederate)', d: 'People from Washington brought food to watch as if on a picnic; the North lost, and everyone realized the war would be long.' },
        { n: 'Battle of Antietam', y: '1862', lat: 39.474, lon: -77.745, k: 'battle', vn: 'George McClellan (Union)', vs: 'Robert E. Lee (Confederate)', d: 'The bloodiest day in American history, with about 23,000 casualties in a single day.' },
        { n: 'Emancipation Proclamation', y: 'Jan 1, 1863', lat: 38.8977, lon: -77.0365, k: 'event', vn: 'Abraham Lincoln', d: 'Lincoln declared the enslaved people in the rebel states free; Black men were allowed to join the Union army.' },
        { n: 'Battle of Gettysburg', y: '1863', lat: 39.811, lon: -77.225, k: 'battle', vn: 'George Meade (Union)', vs: 'Robert E. Lee (Confederate)', d: 'The largest battle of the Civil War; Lincoln gave his short, famous speech about government "of the people, by the people, for the people".' },
        { n: 'Siege of Vicksburg', y: '1863', lat: 32.343, lon: -90.851, k: 'battle', vn: 'Ulysses S. Grant (Union)', vs: 'John Pemberton (Confederate)', d: 'After a 47-day siege, the city surrendered; the North controlled the Mississippi River, splitting the South in two.' },
        { n: 'March to the Sea', y: '1864', lat: 32.08, lon: -81.09, k: 'battle', vn: 'William T. Sherman (Union)', vs: 'Confederacy', d: 'From Atlanta to Savannah, Sherman\'s army destroyed railroads and food stores, exhausting the South.' },
        { n: 'Surrender at Appomattox', y: '1865', lat: 37.377, lon: -78.796, k: 'event', vn: 'Ulysses S. Grant', vs: 'Robert E. Lee', d: 'Lee surrendered in a house in the village of Appomattox; Confederate soldiers were allowed to go home taking their horses.' },
        { n: 'Lincoln assassinated', y: 'Apr 14, 1865', lat: 38.8967, lon: -77.0257, k: 'event', vn: 'Abraham Lincoln', d: 'The president was shot at Ford\'s Theatre only 5 days after Appomattox; later that year the 13th Amendment banned slavery.' }
      ]
    },
    {
      id: 'industry', t: 'The Industrial Age and Immigration', y: '1865 – 1914',
      d: 'Transcontinental railroads, electricity, automobiles and airplanes appeared; millions of immigrants came to America, while Native peoples lost almost all their lands.',
      ev: [
        { n: 'Transcontinental Railroad', y: '1869', lat: 41.618, lon: -112.551, k: 'event', vn: 'Leland Stanford', d: 'The last golden spike was driven at Promontory Summit; the trip from the east coast to the west coast took one week instead of many months.' },
        { n: 'Yellowstone National Park', y: '1872', lat: 44.43, lon: -110.59, k: 'event', vn: 'Ulysses S. Grant', d: 'The world\'s first national park, with the Old Faithful geyser and grizzly bears.' },
        { n: 'Bell\'s telephone', y: 'Mar 10, 1876', lat: 42.359, lon: -71.059, k: 'discovery', vn: 'Alexander Graham Bell, Thomas Watson', d: '"Mr. Watson, come here, I want to see you!" – the first words spoken over the telephone, in Boston, three days after Bell was granted his patent.' },
        { n: 'Battle of Little Bighorn', y: '1876', lat: 45.57, lon: -107.43, k: 'battle', vn: 'George Custer (US Army)', vs: 'Sitting Bull, Crazy Horse (Lakota, Cheyenne)', d: 'Native peoples defeated Custer\'s unit as they resisted having their land taken in the Black Hills.' },
        { n: 'Edison\'s light bulb', y: '1879', lat: 40.557, lon: -74.334, k: 'event', vn: 'Thomas Edison', d: 'At his Menlo Park laboratory, Edison made a carbon-filament bulb that glowed for dozens of hours; in 1882 he opened a power station in New York.' },
        { n: 'Statue of Liberty', y: '1886', lat: 40.6892, lon: -74.0445, k: 'event', d: 'A gift from France, 93 m tall including the pedestal, welcoming ships carrying immigrants into New York harbor.' },
        { n: 'Wounded Knee', y: '1890', lat: 43.14, lon: -102.36, k: 'event', d: 'The US Army shot and killed about 250 – 300 Lakota people, mostly women and children – a tragedy for Native people.' },
        { n: 'Basketball is born', y: 'Dec 1891', lat: 42.1015, lon: -72.5898, k: 'discovery', vn: 'James Naismith', d: 'A physical education teacher in Springfield hung two peach baskets on a balcony rail so his students could play indoors in winter – and basketball was born.' },
        { n: 'Ellis Island', y: '1892 – 1954', lat: 40.699, lon: -74.040, k: 'event', d: 'The immigrant processing station; about 12 million people from Europe passed through here to begin new lives.' },
        { n: 'Battle of Manila Bay', y: '1898', lat: 14.55, lon: 120.90, k: 'battle', vn: 'George Dewey', vs: 'Patricio Montojo (Spain)', d: 'In the Spanish – American War, the American fleet crushed the Spanish fleet in the Philippines.' },
        { n: 'The Wright brothers\' flight', y: 'Dec 17, 1903', lat: 36.014, lon: -75.668, k: 'event', vn: 'Orville and Wilbur Wright', d: 'At Kitty Hawk, the first powered airplane flew for 12 seconds, covering 37 m.' },
        { n: 'Model T automobile', y: '1908 – 1913', lat: 42.405, lon: -83.098, k: 'event', vn: 'Henry Ford', d: 'The assembly line at Highland Park (Detroit) made a car in only about 90 minutes, cheap enough for every home.' },
        { n: 'Panama Canal', y: '1914', lat: 9.08, lon: -79.68, k: 'event', vn: 'Theodore Roosevelt, George Goethals', d: 'The US completed the canal linking the Atlantic with the Pacific, so ships no longer had to sail around South America.' }
      ]
    },
    {
      id: 'worldwars', t: 'The Two World Wars', y: '1917 – 1945',
      d: 'America joined World War I in 1917, went through the Great Depression, then after Pearl Harbor entered World War II in both Europe and the Pacific.',
      ev: [
        { n: 'Battle of Belleau Wood', y: '1918', lat: 49.075, lon: 3.29, k: 'battle', vn: 'James Harbord (Marines)', vs: 'German army', d: 'American Marines stopped the Germans on the road to Paris in World War I.' },
        { n: 'Meuse – Argonne Offensive', y: '1918', lat: 49.28, lon: 5.05, k: 'battle', vn: 'John Pershing', vs: 'German army', d: 'The largest battle for American troops in World War I, with more than a million soldiers, helping to end the war.' },
        { n: 'Great Depression', y: '1929', lat: 40.7069, lon: -74.0113, k: 'event', vn: 'Franklin D. Roosevelt', d: 'The Wall Street stock market collapsed; a quarter of workers lost their jobs; Roosevelt introduced the "New Deal".' },
        { n: 'Empire State Building', y: '1931', lat: 40.7484, lon: -73.9857, k: 'discovery', vn: 'Architect William Lamb', d: 'The 102-story building in New York was built in about 13 months and was the tallest building in the world for nearly 40 years.' },
        { n: 'Golden Gate Bridge', y: '1937', lat: 37.8199, lon: -122.4783, k: 'discovery', vn: 'Engineer Joseph Strauss', d: 'The orange bridge in San Francisco has a 1,280 m main span – the longest suspension bridge span in the world when it opened.' },
        { n: 'Pearl Harbor', y: 'Dec 7, 1941', lat: 21.365, lon: -157.950, k: 'battle', vn: 'Husband Kimmel', vs: 'Japanese navy (Yamamoto, Nagumo)', d: 'Japanese aircraft launched a surprise attack on the naval base in Hawaii; the next day America declared war on Japan.' },
        { n: 'Battle of Midway', y: '1942', lat: 30.0, lon: -178.0, approx: true, k: 'battle', vn: 'Chester Nimitz, Raymond Spruance', vs: 'Japanese navy (Yamamoto, Nagumo)', d: 'Thanks to codebreaking, America sank four Japanese aircraft carriers – the turning point in the Pacific.' },
        { n: 'Battle of Guadalcanal', y: '1942 – 1943', lat: -9.43, lon: 160.03, k: 'battle', vn: 'Alexander Vandegrift', vs: 'Japanese army', d: 'Six months of fighting on a tropical island in the Solomon Islands; the Japanese had to withdraw.' },
        { n: 'D-Day – Normandy landings', y: 'Jun 6, 1944', lat: 49.369, lon: -0.872, k: 'battle', vn: 'Dwight D. Eisenhower, Omar Bradley', vs: 'German army', d: 'The largest amphibious landing in history; American soldiers suffered heavy casualties at Omaha Beach.' },
        { n: 'Battle of Bastogne (Battle of the Bulge)', y: '1944 – 1945', lat: 50.0, lon: 5.72, k: 'battle', vn: 'Anthony McAuliffe, George Patton', vs: 'German army', d: 'Surrounded in the snow, the American general answered the German demand to surrender with one word: "Nuts!"' },
        { n: 'Battle of Iwo Jima', y: '1945', lat: 24.78, lon: 141.32, k: 'battle', vn: 'Holland Smith', vs: 'Tadamichi Kuribayashi (Japan)', d: 'The photograph of American soldiers raising a flag on Mount Suribachi became one of the most famous photos of the war.' },
        { n: 'Battle of Okinawa', y: '1945', lat: 26.33, lon: 127.80, k: 'battle', vn: 'Simon Buckner, Chester Nimitz', vs: 'Mitsuru Ushijima (Japan)', d: 'The largest amphibious battle in the Pacific; a great many Okinawan civilians were killed.' },
        { n: 'Atomic bombs on Hiroshima and Nagasaki', y: 'Aug 1945', lat: 34.395, lon: 132.454, k: 'event', vn: 'Harry Truman', vs: 'Japan', d: 'Two atomic bombs killed more than 100,000 people; Japan surrendered and World War II ended. Hiroshima is now a city of peace.' },
        { n: 'Founding of the United Nations', y: '1945', lat: 37.779, lon: -122.418, k: 'event', vn: 'Harry Truman', d: '50 countries signed the UN Charter in San Francisco, hoping to prevent another world war.' }
      ]
    },
    {
      id: 'civilrights', t: 'The Cold War and the Civil Rights Movement', y: '1945 – 1975',
      d: 'America and the Soviet Union competed around the world; at home, African Americans struggled nonviolently to end racial segregation.',
      ev: [
        { n: 'ENIAC computer', y: '1946', lat: 39.952, lon: -75.191, k: 'discovery', vn: 'John Mauchly, J. Presper Eckert', d: 'One of the first electronic computers, weighing about 27 tons and filling a whole room at the University of Pennsylvania – weaker than today\'s pocket calculators.' },
        { n: 'Inchon landing', y: '1950', lat: 37.47, lon: 126.62, k: 'battle', vn: 'Douglas MacArthur', vs: 'North Korean army', d: 'In the Korean War, UN forces led by the US made a surprise landing and retook Seoul.' },
        { n: 'Brown v. Board of Education ruling', y: '1954', lat: 38.8906, lon: -77.0044, k: 'event', vn: 'Thurgood Marshall, Earl Warren', d: 'The Supreme Court declared separate schools for white and Black children unconstitutional.' },
        { n: 'Jonas Salk\'s polio vaccine', y: '1955', lat: 40.4443, lon: -79.9608, k: 'discovery', vn: 'Jonas Salk', d: 'The vaccine made at the University of Pittsburgh was announced safe in 1955; Salk did not seek a patent: "Could you patent the Sun?"' },
        { n: 'Montgomery bus boycott', y: '1955 – 1956', lat: 32.377, lon: -86.309, k: 'event', vn: 'Rosa Parks, Martin Luther King', d: 'Rosa Parks refused to give up her seat; Black residents walked for 381 days until the segregation law was overturned.' },
        { n: 'The Little Rock Nine', y: '1957', lat: 34.737, lon: -92.298, k: 'event', vn: 'Daisy Bates, Dwight D. Eisenhower', d: 'Nine Black students needed an escort of paratroopers to enter Central High School.' },
        { n: 'Cuban Missile Crisis', y: '1962', lat: 22.85, lon: -83.10, approx: true, k: 'event', vn: 'John F. Kennedy', vs: 'Nikita Khrushchev (Soviet Union)', d: 'For 13 days the world stood on the brink of nuclear war, until the Soviet Union agreed to withdraw its missiles from Cuba.' },
        { n: '"I Have a Dream"', y: 'Aug 28, 1963', lat: 38.8893, lon: -77.0502, k: 'event', vn: 'Martin Luther King', d: 'In front of the Lincoln Memorial, Martin Luther King spoke to about 250,000 people about his dream of equality.' },
        { n: 'President Kennedy assassinated', y: 'Nov 22, 1963', lat: 32.7788, lon: -96.8084, k: 'event', vn: 'John F. Kennedy, Lyndon B. Johnson', d: 'Kennedy was shot while riding in an open car in Dallas; Vice President Johnson took the oath right on the plane.' },
        { n: 'Civil Rights Act', y: '1964', lat: 38.8977, lon: -77.0365, k: 'event', vn: 'Lyndon B. Johnson', d: 'It banned discrimination based on race, color, religion and sex in the workplace and in public places.' },
        { n: 'Edmund Pettus Bridge in Selma', y: '1965', lat: 32.4054, lon: -87.0186, k: 'event', vn: 'John Lewis, Martin Luther King', d: 'Marchers demanding the right to vote were beaten by police; afterward the Voting Rights Act of 1965 was passed.' },
        { n: 'Martin Luther King assassinated', y: 'Apr 4, 1968', lat: 35.1345, lon: -90.0576, k: 'event', vn: 'Martin Luther King', d: 'He was shot at the Lorraine Motel in Memphis; the site is now the National Civil Rights Museum.' },
        { n: 'Paris Peace Accords on Vietnam', y: '1973', lat: 48.871, lon: 2.294, k: 'event', vn: 'Henry Kissinger', d: 'Signed on January 27, 1973 after years of negotiations (Kissinger – Le Duc Tho); American troops withdrew entirely from Vietnam within two months.' },
        { n: 'The party that gave birth to hip hop', y: 'Aug 11, 1973', lat: 40.8478, lon: -73.9273, k: 'discovery', vn: 'DJ Kool Herc', d: 'In an apartment building in the Bronx, New York, DJ Kool Herc extended the drum breaks of records so people could dance – many consider that the day hip hop was born.' }
      ]
    },
    {
      id: 'space', t: 'The Space Race', y: '1958 – 1990',
      d: 'After the Soviet Union launched Sputnik, America founded NASA and just over 10 years later put people on the Moon.',
      ev: [
        { n: 'Founding of NASA', y: '1958', lat: 38.883, lon: -77.016, k: 'event', vn: 'Dwight D. Eisenhower', d: 'The National Aeronautics and Space Administration was created to compete with the Soviet space program.' },
        { n: 'Alan Shepard flies into space', y: '1961', lat: 28.47, lon: -80.56, k: 'event', vn: 'Alan Shepard', d: 'The first American in space, flying for 15 minutes from Cape Canaveral; in 1962 John Glenn orbited the Earth.' },
        { n: '"We choose to go to the Moon"', y: '1962', lat: 29.72, lon: -95.40, k: 'event', vn: 'John F. Kennedy', d: 'At Rice University in Houston, Kennedy promised to put a man on the Moon before the 1960s ended.' },
        { n: 'Apollo 11 – humans on the Moon', y: 'Jul 16 – 24, 1969', lat: 28.608, lon: -80.604, k: 'event', vn: 'Neil Armstrong, Buzz Aldrin, Michael Collins', d: '"One small step for man, one giant leap for mankind" – the Saturn V rocket launched from Pad 39A.' },
        { n: 'First Internet message', y: 'Oct 29, 1969', lat: 34.0689, lon: -118.4452, k: 'discovery', vn: 'Leonard Kleinrock, Charley Kline', d: 'From UCLA, a computer tried to send the word "LOGIN" over ARPANET – the ancestor of the Internet – but crashed after the first two letters, "LO".' },
        { n: 'Houston Mission Control', y: '1970', lat: 29.5597, lon: -95.0902, k: 'event', vn: 'Gene Kranz, Jim Lovell', d: '"Houston, we\'ve had a problem" – the engineers on the ground saved the three Apollo 13 astronauts and brought them home safely.' },
        { n: 'Space Shuttle Columbia', y: '1981', lat: 28.608, lon: -80.604, k: 'event', vn: 'John Young, Robert Crippen', d: 'The first reusable spacecraft, launching like a rocket and landing like an airplane.' },
        { n: 'Hubble Space Telescope', y: '1990', lat: 28.627, lon: -80.621, k: 'event', d: 'Carried into orbit by the space shuttle, Hubble took pictures of the distant universe never seen before.' }
      ]
    },
    {
      id: 'modern', t: 'Modern America', y: '1975 – present',
      d: 'After the Cold War, America led the computer and Internet revolution and went through the 9/11 terrorist attacks and many major changes in society.',
      ev: [
        { n: 'Silicon Valley', y: '1976', lat: 37.341, lon: -122.097, k: 'event', vn: 'Steve Jobs, Steve Wozniak', d: 'Apple was born in a garage in California; the region became the technology center of the world.' },
        { n: 'Gulf War', y: '1991', lat: 29.37, lon: 47.98, k: 'battle', vn: 'George H. W. Bush, Norman Schwarzkopf', vs: 'Iraqi army (Saddam Hussein)', d: 'The US-led coalition drove Iraqi forces out of Kuwait after only 100 hours of ground attack.' },
        { n: 'Normalizing relations with Vietnam', y: '1995', lat: 21.03, lon: 105.85, k: 'event', vn: 'Bill Clinton', d: 'The US and Vietnam established diplomatic relations; in 2023 the two countries raised them to a Comprehensive Strategic Partnership.' },
        { n: '9/11 attacks', y: 'Sep 11, 2001', lat: 40.7115, lon: -74.0134, k: 'event', vn: 'George W. Bush', vs: 'Terrorist group al-Qaeda', d: 'Hijackers crashed planes into the World Trade Center and the Pentagon; nearly 3,000 people died.' },
        { n: 'Iraq War', y: '2003 – 2011', lat: 33.31, lon: 44.37, k: 'battle', vn: 'George W. Bush', vs: 'Government of Saddam Hussein', d: 'The coalition took Baghdad after three weeks, but the conflict dragged on for years with heavy casualties among Iraqis.' },
        { n: 'Hurricane Katrina', y: '2005', lat: 29.951, lon: -90.071, k: 'event', d: 'Levees broke and about 80% of the city of New Orleans was flooded; about 1,400 – 1,800 people died, depending on how they are counted.' },
        { n: 'The first iPhone', y: 'Jan 9, 2007', lat: 37.784, lon: -122.401, k: 'discovery', vn: 'Steve Jobs', d: 'In San Francisco, Steve Jobs introduced a touch-screen phone with no keyboard, beginning the smartphone era.' },
        { n: 'First Black president', y: '2008', lat: 41.876, lon: -87.619, k: 'event', vn: 'Barack Obama', d: 'Barack Obama gave his victory speech in Grant Park, Chicago, becoming the first president of African descent.' },
        { n: 'Operation against Osama bin Laden', y: 'May 2, 2011', lat: 34.169, lon: 73.242, k: 'battle', vn: 'Barack Obama, Navy SEALs', vs: 'Osama bin Laden (al-Qaeda)', d: 'SEAL commandos flew by helicopter at night to Abbottabad (Pakistan) and killed the al-Qaeda leader behind the 9/11 attacks.' },
        { n: 'Curiosity rover reaches Mars', y: '2012', lat: 34.20, lon: -118.17, k: 'event', vn: 'NASA – Jet Propulsion Laboratory', d: 'A car-sized robot controlled from Pasadena landed using a "sky crane" and began exploring Mars.' },
        { n: 'First "hearing" of gravitational waves', y: 'Sep 14, 2015', lat: 46.4551, lon: -119.4075, k: 'discovery', vn: 'The LIGO team (Rainer Weiss, Kip Thorne, Barry Barish)', d: 'Two LIGO stations at Hanford and Livingston detected ripples in space caused by two black holes colliding 1.3 billion light-years away – Nobel Prize 2017.' },
        { n: 'Donald Trump elected President', y: '2016', lat: 38.898, lon: -77.037, k: 'event', vn: 'Donald Trump', d: 'A businessman who had never held public office beat Hillary Clinton and became the 45th president.' },
        { n: 'COVID-19 pandemic', y: '2020 – 2022', lat: 40.7128, lon: -74.0060, k: 'event', d: 'The pandemic caused more than a million American deaths; vaccines were developed and given in record time.' },
        { n: 'Protests after the death of George Floyd', y: '2020', lat: 44.934, lon: -93.262, k: 'event', d: 'The death of a Black man while restrained by Minneapolis police led to a wave of "Black Lives Matter" protests across America.' },
        { n: 'Attack on the Capitol', y: 'Jan 6, 2021', lat: 38.89, lon: -77.009, k: 'event', vn: 'US Congress, President-elect Joe Biden', d: 'Supporters of President Trump stormed the Capitol while Congress was certifying Joe Biden\'s election victory.' },
        { n: 'James Webb Space Telescope', y: 'Dec 25, 2021', lat: 5.239, lon: -52.768, k: 'event', vn: 'NASA', d: 'Launched from Kourou (French Guiana), the largest space telescope captured the most ancient galaxies humans have ever seen.' },
        { n: 'Artemis I flies around the Moon', y: '2022', lat: 28.627, lon: -80.621, k: 'event', vn: 'NASA', d: 'The SLS rocket sent the uncrewed Orion spacecraft around the Moon, in preparation for taking people back there.' },
        { n: 'Vietnam – US Comprehensive Strategic Partnership', y: 'Sep 2023', lat: 21.03, lon: 105.85, k: 'event', vn: 'Joe Biden', d: 'President Biden visited Hanoi; the two countries raised relations to the highest level, 28 years after normalization.' },
        { n: 'Donald Trump returns to the White House', y: 'Jan 20, 2025', lat: 38.89, lon: -77.009, k: 'event', vn: 'Donald Trump', d: 'Trump won the 2024 election, becoming the 47th president – the second person to serve two non-consecutive terms, after Grover Cleveland.' }
      ]
    }
  ]
};
