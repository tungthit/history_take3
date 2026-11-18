// Ireland history for the Geo-Flight history layer (English text).
export default {
  iso: 'ie', name: 'Ireland', flag: '🇮🇪',
  eras: [
    {
      id: 'tiensu', t: 'Prehistory and the Celtic kings', y: '~3500 BCE – 431',
      d: 'The first farmers built giant stone tombs; later the Celts (Gaels) founded many small kingdoms and left a rich treasury of heroic tales.',
      ev: [
        { n: 'Céide Fields', y: '~3500 BCE', lat: 54.304, lon: -9.459, k: 'event', vn: 'Neolithic farmers', d: 'Beneath the peat bog, stone walls dividing fields still survive – one of the oldest known field systems in the world.' },
        { n: 'Newgrange passage tomb', y: '~3200 BCE', lat: 53.694, lon: -6.475, k: 'event', vn: 'Prehistoric people of the Boyne Valley', d: 'Older than the pyramids of Giza; every year on the winter solstice, the rising sun shines through a stone slit deep into the burial chamber.' },
        { n: 'Emain Macha fort', y: '~95 BCE', lat: 54.348, lon: -6.697, k: 'legend', vn: 'Cú Chulainn, King Conchobar', d: 'The capital of the kings of Ulster in the old tales, where the hero Cú Chulainn grew up.' },
        { n: 'Hill of Tara', y: '~3rd century', lat: 53.579, lon: -6.612, approx: true, k: 'legend', vn: 'The High Kings of Ireland', d: 'The sacred hill where, according to tradition, the High Kings were crowned beside the Stone of Destiny.' },
        { n: 'Ogham writing carved on stone', y: '~4th – 6th century', lat: 52.060, lon: -9.640, approx: true, k: 'discovery', vn: 'The Gaels', d: 'Ireland\'s oldest writing is a set of strokes carved along the edge of a stone, like a barcode; southwest Ireland keeps the most Ogham stones.' }
      ]
    },
    {
      id: 'kitogiao', t: 'St. Patrick, monasteries and the Vikings', y: '432 – 1169',
      d: 'St. Patrick spread Christianity; Irish monasteries became keepers of Europe\'s books, until the Vikings came to raid and founded Dublin.',
      ev: [
        { n: 'St. Patrick at the Hill of Slane', y: '~433', lat: 53.716, lon: -6.543, approx: true, k: 'legend', vn: 'St. Patrick', vs: 'King Lóegaire', d: 'Legend says Patrick lit an Easter fire on the Hill of Slane in front of the king; the story of him using a shamrock to teach appeared only later.' },
        { n: 'Clonmacnoise monastery', y: '544', lat: 53.326, lon: -7.986, k: 'event', vn: 'St. Ciarán', d: 'The monastery on the River Shannon drew students from all over Europe and still keeps tall carved stone crosses.' },
        { n: 'Skellig Michael island monastery', y: '~600', lat: 51.772, lon: -10.539, k: 'event', vn: 'Irish monks', d: 'Monks lived in beehive-shaped stone huts on a rock in the Atlantic; the place appears in the Star Wars films.' },
        { n: 'Book of Kells', y: '~800', lat: 53.726, lon: -6.879, approx: true, k: 'event', vn: 'Columban monks', d: 'A richly decorated handwritten Gospel book, now displayed at Trinity College Dublin.' },
        { n: 'Ardagh Chalice', y: '~8th century', lat: 52.494, lon: -9.065, k: 'discovery', vn: 'Irish goldsmiths', d: 'In 1868, two boys digging potatoes at Ardagh found a silver cup inlaid with gold and over 350 parts – Ireland\'s most famous treasure.' },
        { n: 'Vikings found Dublin', y: '841', lat: 53.343, lon: -6.267, k: 'event', vn: 'The Gaelic people', vs: 'The Vikings', d: 'The Vikings built a base by "Dubh Linn" – the black pool; the place became Dublin, today\'s capital of Ireland.' },
        { n: 'Battle of Clontarf', y: '1014', lat: 53.364, lon: -6.200, approx: true, k: 'battle', vn: 'High King Brian Boru', vs: 'King of Leinster and the Dublin Vikings', d: 'Brian Boru won the battle but was killed in his tent; Viking power in Ireland declined.' }
      ]
    },
    {
      id: 'norman', t: 'The Normans and the English arrive', y: '1169 – 1607',
      d: 'Norman knights landed from Wales, beginning more than 750 years of English kings ruling Ireland; the Nine Years\' War ended the old Gaelic order.',
      ev: [
        { n: 'Normans land', y: '1169', lat: 52.230, lon: -6.800, approx: true, k: 'battle', vn: 'King Diarmait Mac Murchada (Leinster)', vs: 'King Ruaidrí Ua Conchobair', d: 'The overthrown king of Leinster invited Norman knights to help; they landed at Bannow Bay and quickly seized land.' },
        { n: 'Strongbow captures Waterford', y: '1170', lat: 52.259, lon: -7.110, k: 'battle', vn: 'The Viking-Gaels of Waterford', vs: 'Strongbow (Richard de Clare)', d: 'Strongbow took the Viking city of Waterford and then married Princess Aoife; the next year King Henry II of England came to claim Ireland.' },
        { n: 'Hook Lighthouse', y: '~1172 – 1240', lat: 52.124, lon: -6.930, k: 'discovery', vn: 'William Marshal', d: 'A stone tower built more than 800 years ago still guides ships – one of the oldest working lighthouses in the world.' },
        { n: 'Dublin Castle', y: '1204', lat: 53.343, lon: -6.267, k: 'event', vn: 'Dublin builders (on the orders of King John of England)', d: 'The castle was the center of English rule for over 700 years, until it was handed back to Ireland in 1922.' },
        { n: 'Battle of the Yellow Ford', y: '1598', lat: 54.330, lon: -6.650, approx: true, k: 'battle', vn: "Hugh O'Neill, Hugh Roe O'Donnell", vs: 'Henry Bagenal (England)', d: "The Irish's greatest victory in the Nine Years' War against Queen Elizabeth I's army." },
        { n: 'Battle of Kinsale', y: '1601', lat: 51.707, lon: -8.522, k: 'battle', vn: "Hugh O'Neill, Hugh Roe O'Donnell (with Spanish troops)", vs: 'Lord Mountjoy (England)', d: 'The Irish army marched down from the north to help the Spanish but lost the decisive battle.' },
        { n: 'Flight of the Earls', y: '1607', lat: 55.096, lon: -7.537, k: 'event', vn: "Hugh O'Neill, Rory O'Donnell", d: 'The Gaelic chiefs boarded a ship at Rathmullan and left Ireland; Ulster\'s land was taken to settle people from England and Scotland.' }
      ]
    },
    {
      id: 'chientranh17', t: 'Religious wars and the Penal Laws', y: '1641 – 1798',
      d: 'Wars between Catholics and Protestants devastated Ireland; after the Battle of the Boyne, Catholics had their rights restricted by harsh laws.',
      ev: [
        { n: 'Cromwell besieges Drogheda', y: '1649', lat: 53.717, lon: -6.350, k: 'battle', vn: 'Drogheda garrison (Arthur Aston)', vs: 'Oliver Cromwell (England)', d: 'Cromwell took the town after a bloody siege; his name is remembered with dread in Ireland.' },
        { n: 'Siege of Derry', y: '1689', lat: 54.996, lon: -7.320, k: 'battle', vn: 'James II\'s army (Richard Hamilton)', vs: 'The people of Derry on William\'s side', d: '13 apprentice boys closed the city gates; the townspeople endured a 105-day siege until a supply ship broke the barrier on the river.' },
        { n: 'Battle of the Boyne', y: '1690', lat: 53.730, lon: -6.420, k: 'battle', vn: 'King James II (Jacobites, mostly Irish Catholics)', vs: 'King William III', d: 'A battle between two kings fighting for the English throne; William won and the Protestants took power in Ireland.' },
        { n: 'Treaty of Limerick', y: '1691', lat: 52.669, lon: -8.627, k: 'event', vn: 'Patrick Sarsfield', vs: 'General Ginkel (William\'s side)', d: 'After the siege, thousands of Irish soldiers went to serve in France, known as the "Wild Geese".' },
        { n: 'Swift writes Gulliver\'s Travels', y: '1726', lat: 53.340, lon: -6.271, k: 'discovery', vn: 'Jonathan Swift', d: 'The Dean of St. Patrick\'s Cathedral in Dublin wrote the story of Gulliver in the land of the tiny Lilliputians.' },
        { n: 'First performance of Messiah', y: 'Apr 13, 1742', lat: 53.345, lon: -6.271, k: 'discovery', vn: 'Composer Handel', d: 'Messiah premiered on Fishamble Street in Dublin; to make more room, gentlemen were asked to leave their swords and ladies not to wear hooped skirts.' },
        { n: 'Guinness brewery', y: '1759', lat: 53.342, lon: -6.287, k: 'discovery', vn: 'Arthur Guinness', d: 'Arthur Guinness leased the St. James\'s Gate brewery for 45 pounds a year, in a lease lasting 9,000 years.' }
      ]
    },
    {
      id: 'naodoi', t: 'Rebellions and the Great Famine', y: '1798 – 1912',
      d: 'Rebellions failed and Ireland was merged into the United Kingdom; the Potato Famine cut the population by almost a quarter.',
      ev: [
        { n: 'Battle of Vinegar Hill', y: '1798', lat: 52.503, lon: -6.554, k: 'battle', vn: 'Wexford rebels (Father John Murphy)', vs: 'British army (General Lake)', d: 'The United Irishmen\'s rebellion was crushed in Wexford; later that year their leader Wolfe Tone was captured and died in prison.' },
        { n: 'French land at Killala', y: '1798', lat: 54.213, lon: -9.217, k: 'battle', vn: 'United Irishmen (with General Humbert\'s French troops)', vs: 'British army (Cornwallis)', d: 'About 1,000 French soldiers landed to help the rebels and won a battle at Castlebar, but then had to surrender.' },
        { n: 'Act of Union', y: '1801', lat: 53.345, lon: -6.260, k: 'event', vn: 'Irish Parliament', vs: 'British government (William Pitt)', d: 'The Irish Parliament was dissolved; Ireland merged into the United Kingdom of Great Britain and Ireland.' },
        { n: 'Daniel O\'Connell – "The Liberator"', y: '1828 – 1829', lat: 52.843, lon: -8.986, k: 'event', vn: 'Daniel O\'Connell', d: 'After winning the election in County Clare, O\'Connell forced London to allow Catholics to sit in Parliament.' },
        { n: 'Hamilton carves a formula on a bridge', y: 'Oct 16, 1843', lat: 53.377, lon: -6.299, k: 'discovery', vn: 'William Rowan Hamilton', d: 'While out walking, the mathematician suddenly thought of quaternion numbers and carved the formula on Broome Bridge at once; today 3D graphics and games still use it.' },
        { n: 'Leviathan telescope', y: '1845', lat: 53.097, lon: -7.914, k: 'discovery', vn: 'Earl of Rosse', d: 'The largest telescope in the world for over 70 years, set up at Birr Castle; with it people first saw that galaxies have a spiral shape.' },
        { n: 'The Great Famine', y: '1845 – 1852', lat: 51.548, lon: -9.266, approx: true, k: 'event', vn: 'The Irish people', d: 'Blight made the potatoes rot; about a million people died and over a million emigrated, mostly to America and Britain.' },
        { n: 'Emigrant ships leave Cobh', y: '1848 – 1950', lat: 51.850, lon: -8.294, k: 'event', vn: 'Irish emigrants', d: 'About 2.5 million people left Ireland from the port of Cobh; today tens of millions of Americans have Irish roots.' },
        { n: 'Land League', y: '1879', lat: 53.855, lon: -9.298, k: 'event', vn: 'Michael Davitt, Charles Stewart Parnell', d: 'Farmers demanded lower rents; the word "boycott" was born from the name of a land agent whom villagers shunned.' }
      ]
    },
    {
      id: 'doclap', t: 'Winning independence', y: '1912 – 1949',
      d: 'The Easter Rising and the War of Independence led to the Irish Free State; the island was divided, and the north remained part of the United Kingdom.',
      ev: [
        { n: 'Titanic calls at Queenstown', y: 'Apr 11, 1912', lat: 51.850, lon: -8.294, k: 'event', vn: 'Belfast shipbuilders, Irish passengers', d: 'The ship built in Belfast made its last stop at Queenstown (Cobh) before sinking in the middle of the Atlantic.' },
        { n: 'Easter Rising', y: 'Apr 24, 1916', lat: 53.350, lon: -6.260, k: 'battle', vn: 'Patrick Pearse, James Connolly', vs: 'British army', d: 'The rebels seized the General Post Office in Dublin and proclaimed a Republic; they surrendered after six days.' },
        { n: 'First Dáil Éireann', y: 'Jan 21, 1919', lat: 53.340, lon: -6.258, k: 'event', vn: 'Éamon de Valera, Cathal Brugha', d: 'Sinn Féin members met at the Mansion House and declared independence; on the same day, the first shots were fired at Soloheadbeg.' },
        { n: 'War of Independence', y: '1919 – 1921', lat: 52.517, lon: -8.133, approx: true, k: 'battle', vn: 'Michael Collins, Irish Republican Army (IRA)', vs: 'British army and police', d: 'Small guerrilla units ambushed and quickly withdrew; both sides agreed a truce in July 1921.' },
        { n: 'First nonstop transatlantic flight', y: 'Jun 15, 1919', lat: 53.455, lon: -10.030, k: 'discovery', vn: 'Pilots Alcock and Brown', d: 'After almost 16 hours in the air from Newfoundland, the plane landed nose-first in a bog near Clifden – the first nonstop flight across the Atlantic.' },
        { n: 'The novel Ulysses and Bloomsday', y: '1922', lat: 53.288, lon: -6.114, k: 'discovery', vn: 'James Joyce', d: 'The whole thick book tells of exactly one day, June 16, 1904, in Dublin, starting at the Sandycove Martello tower; June 16 is now the "Bloomsday" festival.' },
        { n: 'Anglo-Irish Treaty', y: 'Dec 6, 1921', lat: 51.503, lon: -0.128, k: 'event', vn: 'Michael Collins, Arthur Griffith', vs: 'Prime Minister Lloyd George (Britain)', d: 'Signed in London, it created the Irish Free State; six counties in the north stayed in the United Kingdom.' },
        { n: 'Irish Civil War', y: '1922 – 1923', lat: 53.346, lon: -6.273, k: 'battle', vn: 'Free State government (Michael Collins)', vs: 'Anti-Treaty side (Éamon de Valera)', d: 'The shelling of the Four Courts began the civil war; Collins was killed in an ambush at Béal na Bláth in 1922.' },
        { n: 'Irish coffee born at Foynes', y: '1943', lat: 52.611, lon: -9.107, k: 'discovery', vn: 'Chef Joe Sheridan', d: 'At the Foynes flying-boat base, a chef made hot coffee with whiskey for passengers chilled when their plane had to turn back in the middle of a winter night.' },
        { n: 'First duty-free shop', y: '1947', lat: 52.702, lon: -8.925, k: 'discovery', vn: 'Brendan O\'Regan', d: 'Shannon Airport opened the first duty-free shop in the world for transit passengers; today every airport has one.' },
        { n: 'Republic of Ireland declared', y: '1949', lat: 53.340, lon: -6.254, k: 'event', vn: 'Taoiseach John A. Costello', d: 'Ireland left the Commonwealth and officially became a republic; during World War II Ireland stayed neutral.' }
      ]
    },
    {
      id: 'hiendai', t: 'Modern Ireland', y: '1949 – present',
      d: 'From a poor country with many emigrants, Ireland joined Europe, became the wealthy "Celtic Tiger" and helped bring peace to Northern Ireland.',
      ev: [
        { n: 'Joining the United Nations and peacekeeping', y: '1955 – 1960', lat: -5.80, lon: 27.00, approx: true, k: 'event', vn: 'Irish peacekeepers', d: 'Since 1958 Irish soldiers have been continuously present in UN peacekeeping missions; in 1960 they went to the Congo, their first large mission.' },
        { n: 'Joining the European Community', y: '1973', lat: 53.340, lon: -6.254, approx: true, k: 'event', vn: 'Taoiseach Jack Lynch', d: 'Together with Britain and Denmark, Ireland joined the European bloc; the support money helped modernize the countryside and roads.' },
        { n: 'First woman president', y: '1990', lat: 53.360, lon: -6.317, k: 'event', vn: 'Mary Robinson', d: 'The lawyer Mary Robinson became the first woman president and placed a candle in the window of the president\'s residence for emigrants.' },
        { n: 'Riverdance at Eurovision', y: '1994', lat: 53.348, lon: -6.229, k: 'discovery', vn: 'Jean Butler, Michael Flatley', d: 'A 7-minute dance act in the Eurovision interval in Dublin became a show around the world; Ireland shares the record of 7 Eurovision wins.' },
        { n: 'Good Friday Agreement', y: 'Apr 10, 1998', lat: 54.605, lon: -5.832, k: 'event', vn: 'Taoiseach Bertie Ahern, John Hume', vs: 'British Prime Minister Tony Blair, Northern Ireland parties', d: 'The agreement in Belfast ended almost 30 years of the "Troubles" in Northern Ireland.' },
        { n: 'The Celtic Tiger', y: '1995 – 2007', lat: 53.344, lon: -6.240, approx: true, k: 'event', vn: 'Irish workers', d: 'Big tech companies set up their European headquarters in Dublin; Ireland went from a poor country to one of the richest in the EU.' },
        { n: 'Same-sex marriage referendum', y: '2015', lat: 53.343, lon: -6.267, k: 'event', vn: 'Irish voters', d: 'Ireland was the first country to legalize same-sex marriage by a nationwide referendum.' },
        { n: 'Brexit and the border on the island', y: '2016 – 2020', lat: 54.200, lon: -6.400, approx: true, k: 'event', vn: 'Taoiseach Leo Varadkar', vs: 'British government', d: 'When Britain left the EU, both sides agreed not to rebuild checkpoints on the border between Ireland and Northern Ireland.' },
        { n: 'Micheál Martin\'s new government', y: 'Jan 2025', lat: 53.339, lon: -6.254, k: 'event', vn: 'Taoiseach Micheál Martin', d: 'After the election in November 2024, the two parties Fianna Fáil and Fine Gael again formed a coalition government.' },
        { n: 'Election of President Catherine Connolly', y: 'Oct 2025', lat: 53.360, lon: -6.317, k: 'event', vn: 'President Catherine Connolly', d: 'An independent member of parliament from Galway won the presidential election, becoming Ireland\'s third woman president.' }
      ]
    }
  ]
};
