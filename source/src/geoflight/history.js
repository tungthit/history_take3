// History layer: Vietnam is here (always loaded); other countries live in ./history/<iso>.js and load on demand.
// Vietnam: the main periods from the Hùng kings to 1988, each with its battles and events.
// Every event: n name, y year, lat / lon (approx: true when the exact place is not known), k kind
// ('battle' | 'event' | 'legend'), vn the Vietnamese leaders, vs the other side, d one line about it.
// route: an optional march drawn on the map, [lat, lon] points.

import { BRANCH_ICON } from './branches.js';
export const KIND_ICON = { battle: '⚔️', event: '📜', legend: '✨', discovery: '💡', ...BRANCH_ICON }; // discovery: inventions, science, culture, sport, firsts, curious facts

export const ERAS = [
  {
    id: 'hung', t: 'The Hùng Kings – An Dương Vương', y: '~2879 – 179 BCE',
    d: 'The Văn Lang state of the Hùng Kings, then the Âu Lạc state of An Dương Vương with the Cổ Loa citadel and the magic crossbow.',
    ev: [
      { n: 'Hùng Temple – the ancestral land', y: 'Văn Lang era', lat: 21.369, lon: 105.323, k: 'event', vn: 'The Hùng Kings', d: 'Phong Châu, the capital of Văn Lang; today the site of the Hùng Kings Commemoration Day on the 10th day of the 3rd lunar month.' },
      { n: 'Thánh Gióng fights the Ân invaders', y: 'Legend', lat: 21.27, lon: 105.85, k: 'legend', vn: 'Thánh Gióng', vs: 'The Ân invaders', d: 'A boy from Phù Đổng village stretches into a giant warrior, uproots bamboo to fight the invaders, then flies up to heaven from Sóc Mountain.' },
      { n: 'Resistance against the Qin army', y: '214 – 208 BCE', lat: 21.55, lon: 105.75, approx: true, k: 'battle', vn: 'Thục Phán', vs: 'Đồ Thư (Qin dynasty)', d: 'The Âu Việt and Lạc Việt fought a guerrilla war for years and killed the Qin general Đồ Thư.' },
      { n: 'Cổ Loa Citadel', y: '~257 – 179 BCE', lat: 21.115, lon: 105.873, k: 'battle', vn: 'An Dương Vương', vs: 'Triệu Đà', d: 'A citadel with nine spiral rings and a magic crossbow; in 179 BCE Âu Lạc fell to Triệu Đà.' }
    ]
  },
  {
    id: 'bacthuoc', t: 'Northern rule and the uprisings', y: '40 – 938',
    d: 'More than a thousand years under rule from the north, but uprisings broke out again and again until the victory on the Bạch Đằng River.',
    ev: [
      { n: 'The Trưng Sisters\' uprising', y: '40', lat: 21.18, lon: 105.72, k: 'battle', vn: 'Trưng Trắc, Trưng Nhị', vs: 'Tô Định (Han dynasty)', d: 'The sisters raised their banner at Hát Môn – Mê Linh, drove out Tô Định, and ruled as queens for three years.' },
      { n: 'Battle of Lãng Bạc', y: '43', lat: 21.12, lon: 106.03, approx: true, k: 'battle', vn: 'The Trưng Sisters', vs: 'Mã Viện (Han dynasty)', d: 'The sisters\' army fought a great battle against Mã Viện, then had to retreat to Cấm Khê; the sisters died in 43.' },
      { n: 'Lady Triệu\'s uprising', y: '248', lat: 19.73, lon: 105.62, k: 'battle', vn: 'Triệu Thị Trinh', vs: 'Lục Dận (Wu dynasty)', d: '"I want to ride the strong wind, tread the fierce waves…" – her base was Nưa Mountain, Thanh Hoá.' },
      { n: 'Lý Bí founds the state of Vạn Xuân', y: '544', lat: 21.04, lon: 105.84, k: 'event', vn: 'Lý Nam Đế (Lý Bí)', vs: 'Liang dynasty', d: 'He drove out the Liang army, became emperor, and named the country Vạn Xuân.' },
      { n: 'Dạ Trạch Marsh', y: '548 – 550', lat: 20.83, lon: 105.98, k: 'battle', vn: 'Triệu Quang Phục', vs: 'Trần Bá Tiên (Liang dynasty)', d: 'He fought a guerrilla war from the marsh, hiding by day and striking by night, and finally retook Long Biên.' },
      { n: 'Mai Thúc Loan\'s uprising', y: '713 – 722', lat: 18.70, lon: 105.50, k: 'battle', vn: 'Mai Hắc Đế', vs: 'Dương Tư Húc (Tang dynasty)', d: 'From Sa Nam (Nam Đàn, Nghệ An) he seized Tống Bình citadel and controlled the whole country for several years.' },
      { n: 'Phùng Hưng\'s uprising', y: '766 – 791', lat: 21.15, lon: 105.48, k: 'battle', vn: 'Bố Cái Đại Vương Phùng Hưng', vs: 'Cao Chính Bình (Tang dynasty)', d: 'From Đường Lâm (Sơn Tây) he attacked the protectorate headquarters and held Tống Bình citadel.' },
      { n: 'Khúc Thừa Dụ takes self-rule', y: '905', lat: 20.73, lon: 106.40, k: 'event', vn: 'Khúc Thừa Dụ', vs: 'Tang dynasty', d: 'The local chieftain of Hồng Châu proclaimed himself Governor (Tiết độ sứ), beginning the era of self-rule.' },
      { n: 'Battle of Bạch Đằng', y: '938', lat: 20.94, lon: 106.80, k: 'battle', vn: 'Ngô Quyền', vs: 'Lưu Hoằng Tháo (Southern Han)', d: 'He planted wooden stakes in the riverbed, lured enemy ships in at high tide, and attacked as the tide fell. It ended a thousand years of northern rule.' }
    ]
  },
  {
    id: 'dinhle', t: 'The Ngô – Đinh – Early Lê dynasties', y: '939 – 1009',
    d: 'Ended the chaos of the 12 warlords, founded Đại Cồ Việt with its capital at Hoa Lư, and won the first war against the Song army.',
    ev: [
      { n: 'Hoa Lư Capital', y: '968', lat: 20.285, lon: 105.905, k: 'event', vn: 'Đinh Bộ Lĩnh', d: 'He ended the chaos of the 12 warlords, took the throne as Đinh Tiên Hoàng, and named the country Đại Cồ Việt.' },
      { n: 'Battle of Bạch Đằng', y: '981', lat: 20.90, lon: 106.76, k: 'battle', vn: 'Lê Hoàn', vs: 'Hầu Nhân Bảo (Song dynasty)', d: 'Stakes were planted again in the Bạch Đằng River to block the Song navy.' },
      { n: 'Battle of Chi Lăng', y: '981', lat: 21.68, lon: 106.62, k: 'battle', vn: 'Lê Hoàn', vs: 'Hầu Nhân Bảo (Song dynasty)', d: 'Lê Hoàn pretended to surrender and lured the enemy into Chi Lăng Pass; Hầu Nhân Bảo was killed and the Song army withdrew.' }
    ]
  },
  {
    id: 'ly', t: 'The Lý dynasty', y: '1009 – 1225',
    d: 'The capital moved to Thăng Long; Lý Thường Kiệt "struck first to defeat the enemy" by attacking into Song territory, then built the defense line on the Như Nguyệt River.',
    route: { t: 'Attack route into Song territory, 1075', pts: [[21.53, 107.97], [21.95, 108.62], [21.66, 109.20], [22.82, 108.32]] },
    ev: [
      { n: 'Moving the capital to Thăng Long', y: '1010', lat: 21.035, lon: 105.840, k: 'event', vn: 'Lý Thái Tổ (Lý Công Uẩn)', d: 'The Edict on the Transfer of the Capital: leaving Hoa Lư for Đại La citadel, which was renamed Thăng Long.' },
      { n: 'Capture of Khâm Châu and Liêm Châu', y: '1075', lat: 21.95, lon: 108.62, k: 'battle', vn: 'Lý Thường Kiệt, Tông Đản', vs: 'Song dynasty', d: 'A pre-emptive strike on the Song bases that were preparing to invade.' },
      { n: 'Capture of Ung Châu', y: '1076', lat: 22.82, lon: 108.32, k: 'battle', vn: 'Lý Thường Kiệt', vs: 'Tô Giam (Song dynasty)', d: 'After a 42-day siege, Ung Châu citadel (today\'s Nanning) was destroyed, and the army withdrew to prepare its defense.' },
      { n: 'Như Nguyệt River defense line', y: '1077', lat: 21.20, lon: 106.07, k: 'battle', vn: 'Lý Thường Kiệt', vs: 'Quách Quỳ, Triệu Tiết (Song dynasty)', d: 'The poem "Nam quốc sơn hà" rang out on the bank of the Cầu River; the Song army had to make peace and withdraw.' }
    ]
  },
  {
    id: 'tran', t: 'The Trần dynasty – three wars against the Yuan-Mongols', y: '1258 – 1288',
    d: 'Three times they defeated the Mongol – Yuan empire, the mightiest in the world at that time, led by Prince Hưng Đạo, Trần Quốc Tuấn.',
    ev: [
      { n: 'Battle of Bình Lệ Nguyên', y: '1258', lat: 21.31, lon: 105.62, k: 'battle', vn: 'Trần Thái Tông', vs: 'Uriyangkhadai', d: 'The first battle to block the Mongols; the Trần army made a calculated retreat.' },
      { n: 'Battle of Đông Bộ Đầu', y: '1258', lat: 21.04, lon: 105.857, k: 'battle', vn: 'Trần Thái Tông, Trần Thủ Độ', vs: 'Uriyangkhadai', d: '"Until my head falls to the ground, Your Majesty need not worry" – a counterattack drove the Mongols out of Thăng Long.' },
      { n: 'Diên Hồng Conference', y: '1284', lat: 21.03, lon: 105.85, k: 'event', vn: 'Trần Thánh Tông', d: 'Elders from across the country shouted together "Fight!" before the second invasion.' },
      { n: 'Vạn Kiếp', y: '1285', lat: 21.16, lon: 106.41, k: 'battle', vn: 'Trần Hưng Đạo', vs: 'Toghon', d: 'Where Prince Hưng Đạo gathered his land and naval forces; the main headquarters in both the 1285 and 1288 wars of resistance.' },
      { n: 'Battle of Hàm Tử', y: '1285', lat: 20.85, lon: 105.98, k: 'battle', vn: 'Trần Nhật Duật, Trần Quốc Toản', vs: 'Sogetu', d: 'Crushed Sogetu\'s wing of the army on the Red River.' },
      { n: 'Battle of Chương Dương', y: '1285', lat: 21.00, lon: 105.90, k: 'battle', vn: 'Trần Quang Khải', vs: 'Yuan army', d: '"At Chương Dương we seized the enemy\'s spears, at Hàm Tử we captured the foe" – it opened the way to liberate Thăng Long.' },
      { n: 'Battle of Tây Kết', y: '1285', lat: 20.81, lon: 106.00, k: 'battle', vn: 'Trần Hưng Đạo', vs: 'Sogetu', d: 'Sogetu was beheaded; Toghon had to flee home hidden inside a bronze tube.' },
      { n: 'Battle of Vân Đồn', y: '1288', lat: 21.06, lon: 107.42, k: 'battle', vn: 'Trần Khánh Dư', vs: 'Trương Văn Hổ', d: 'Sank the enemy\'s supply fleet, leaving the Yuan army starving.' },
      { n: 'Battle of Bạch Đằng', y: '1288', lat: 20.94, lon: 106.80, k: 'battle', vn: 'Trần Hưng Đạo', vs: 'Ô Mã Nhi, Phàn Tiếp', d: 'The stake field on the Bạch Đằng again: the entire Yuan navy was destroyed and Ô Mã Nhi was captured.' }
    ]
  },
  {
    id: 'lamson', t: 'The Hồ dynasty and the Lam Sơn uprising', y: '1400 – 1428',
    d: 'The Hồ dynasty fell to the Ming army; ten years of "tasting gall and sleeping on thorns" by Lê Lợi and Nguyễn Trãi won back independence.',
    ev: [
      { n: 'Hồ Dynasty Citadel', y: '1397', lat: 20.078, lon: 105.605, k: 'event', vn: 'Hồ Quý Ly', d: 'The stone citadel of Tây Đô, today a World Heritage Site.' },
      { n: 'Đa Bang Citadel', y: '1406 – 1407', lat: 21.21, lon: 105.42, k: 'battle', vn: 'Hồ dynasty', vs: 'Trương Phụ, Mộc Thạnh (Ming dynasty)', d: 'Đa Bang citadel fell, the Hồ dynasty collapsed, and Vietnam came under Ming rule.' },
      { n: 'Battle of Bô Cô', y: '1408', lat: 20.33, lon: 106.05, k: 'battle', vn: 'Giản Định Đế, Đặng Tất', vs: 'Mộc Thạnh (Ming dynasty)', d: 'The greatest victory of the Later Trần dynasty.' },
      { n: 'Lũng Nhai Oath – the Lam Sơn uprising', y: '1416 – 1418', lat: 19.93, lon: 105.38, k: 'event', vn: 'Lê Lợi, Nguyễn Trãi', d: 'Lê Lợi called himself Prince Bình Định and raised the banner of revolt at Lam Sơn (Thanh Hoá).' },
      { n: 'Battle of Tốt Động – Chúc Động', y: '1426', lat: 20.88, lon: 105.68, k: 'battle', vn: 'Đinh Lễ, Nguyễn Xí', vs: 'Vương Thông (Ming dynasty)', d: 'An ambush destroyed tens of thousands of Ming troops and besieged Đông Quan.' },
      { n: 'Battle of Chi Lăng', y: '1427', lat: 21.68, lon: 106.62, k: 'battle', vn: 'Trần Lựu, Lê Sát, Lưu Nhân Chú', vs: 'Liễu Thăng (Ming dynasty)', d: 'Liễu Thăng was killed at Mã Yên Mountain and the 100,000 reinforcements were shattered.' },
      { n: 'Battle of Xương Giang', y: '1427', lat: 21.28, lon: 106.19, k: 'battle', vn: 'Lê Sát, Lê Văn An', vs: 'Lương Minh, Thôi Tụ (Ming dynasty)', d: 'The whole relief column was wiped out; Vương Thông had to ask for peace.' },
      { n: 'Proclamation of Victory over the Ngô (Bình Ngô đại cáo)', y: '1428', lat: 21.035, lon: 105.84, k: 'event', vn: 'Nguyễn Trãi, Lê Thái Tổ', d: '"Our land of Đại Việt has long been known as a nation of culture…" – the second declaration of independence.' }
    ]
  },
  {
    id: 'tayson', t: 'The Tây Sơn movement', y: '1771 – 1802',
    d: 'The three Tây Sơn brothers, above all Nguyễn Huệ – Quang Trung, crushed the Siamese army in the South and 290,000 Qing troops in the North.',
    route: { t: 'Quang Trung\'s lightning march, Tết of Kỷ Dậu 1789', pts: [[16.44, 107.58], [17.47, 106.60], [18.67, 105.68], [19.80, 105.78], [20.15, 105.90], [20.87, 105.87], [20.92, 105.84], [21.01, 105.83]] },
    ev: [
      { n: 'The Tây Sơn uprising', y: '1771', lat: 13.95, lon: 108.92, k: 'event', vn: 'Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ', d: 'They raised the banner in Tây Sơn hamlet (Bình Định), "taking from the rich to give to the poor".' },
      { n: 'Battle of Rạch Gầm – Xoài Mút', y: '1785', lat: 10.36, lon: 106.13, k: 'battle', vn: 'Nguyễn Huệ', vs: 'Chiêu Tăng, Chiêu Sương (Siamese army)', d: 'An ambush on the Tiền River crushed 50,000 Siamese troops in a single morning.' },
      { n: 'Quang Trung takes the throne at Bân Mountain', y: '1788', lat: 16.44, lon: 107.58, k: 'event', vn: 'Nguyễn Huệ', d: 'He became emperor at Phú Xuân and at once marched his army north.' },
      { n: 'Battle of Hà Hồi', y: 'Night of the 3rd day of Tết 1789', lat: 20.87, lon: 105.87, k: 'battle', vn: 'Quang Trung', vs: 'Qing army', d: 'The fort was surrounded and loudspeakers called on the garrison to surrender; the Qing troops inside gave up.' },
      { n: 'Battle of Ngọc Hồi', y: '5th day of Tết 1789', lat: 20.92, lon: 105.84, k: 'battle', vn: 'Quang Trung', vs: 'Hứa Thế Hanh (Qing army)', d: 'Tây Sơn soldiers rolled wooden shields covered with wet straw into the fort; Hứa Thế Hanh was killed in battle.' },
      { n: 'Battle of Đống Đa', y: '5th day of Tết 1789', lat: 21.008, lon: 105.825, k: 'battle', vn: 'Đô đốc Long', vs: 'Sầm Nghi Đống (Qing army)', d: 'Tôn Sĩ Nghị fled; at noon on the 5th day of Tết Quang Trung entered Thăng Long.' }
    ]
  },
  {
    id: 'phap', t: 'Resisting French colonialism', y: '1858 – 1954',
    d: 'From the Cần Vương movement to the August Revolution and the Điện Biên Phủ victory, "resounding across the five continents and shaking the earth".',
    ev: [
      { n: 'Đà Nẵng Front', y: '1858', lat: 16.07, lon: 108.22, k: 'battle', vn: 'Nguyễn Tri Phương', vs: 'Rigault de Genouilly', d: 'The French–Spanish force opened fire; Vietnamese forces held the enemy back for many months.' },
      { n: 'Chí Hoà Great Fort', y: '1861', lat: 10.79, lon: 106.66, k: 'battle', vn: 'Nguyễn Tri Phương', vs: 'Charner', d: 'The largest defense line of Gia Định fell after fierce fighting.' },
      { n: 'Burning of the Espérance on the Nhật Tảo River', y: '1861', lat: 10.60, lon: 106.38, k: 'battle', vn: 'Nguyễn Trung Trực', d: '"The red fire of Nhật Tảo shook heaven and earth" – he set the French warship ablaze.' },
      { n: 'Trương Định\'s uprising', y: '1862 – 1864', lat: 10.37, lon: 106.67, k: 'battle', vn: 'Grand Marshal Trương Định, "Pacifier of the West"', d: 'His base was Gò Công; he disobeyed the royal court\'s order to disband.' },
      { n: 'Battle of Cầu Giấy', y: '1873 and 1883', lat: 21.034, lon: 105.80, k: 'battle', vn: 'Hoàng Kế Viêm, Lưu Vĩnh Phúc', vs: 'Francis Garnier, Henri Rivière', d: 'Two ambushes; both French commanders were killed in battle.' },
      { n: 'Huế Citadel – the Cần Vương edict', y: '1885', lat: 16.47, lon: 107.58, k: 'event', vn: 'Tôn Thất Thuyết, King Hàm Nghi', d: 'He attacked the Mang Cá fort, then took King Hàm Nghi to Tân Sở and issued the Cần Vương edict.' },
      { n: 'Ba Đình uprising', y: '1886 – 1887', lat: 20.03, lon: 105.95, k: 'battle', vn: 'Đinh Công Tráng, Phạm Bành', d: 'A base in the middle of the low-lying fields of Nga Sơn, Thanh Hoá.' },
      { n: 'Hương Khê uprising', y: '1885 – 1896', lat: 18.18, lon: 105.70, k: 'battle', vn: 'Phan Đình Phùng, Cao Thắng', d: 'The biggest uprising of the Cần Vương movement; they made their own guns copied from French models.' },
      { n: 'Yên Thế uprising', y: '1884 – 1913', lat: 21.53, lon: 106.13, k: 'battle', vn: 'Hoàng Hoa Thám (Đề Thám)', d: 'Nearly 30 years of fighting in the forests and mountains of Bắc Giang.' },
      { n: 'Tân Trào – the August Revolution', y: '8/1945', lat: 21.79, lon: 105.43, k: 'event', vn: 'Hồ Chí Minh', d: 'The Tân Trào National Congress decided on the General Uprising to seize power.' },
      { n: 'Ba Đình Square', y: '2/9/1945', lat: 21.037, lon: 105.835, k: 'event', vn: 'President Hồ Chí Minh', d: 'He read the Declaration of Independence, giving birth to the Democratic Republic of Vietnam.' },
      { n: 'Việt Bắc Campaign', y: 'Autumn – winter 1947', lat: 22.15, lon: 105.83, k: 'battle', vn: 'Võ Nguyên Giáp', vs: 'Valluy', d: 'Defeated the attack on the Việt Bắc base area.' },
      { n: 'Border Campaign', y: '1950', lat: 22.43, lon: 106.43, k: 'battle', vn: 'Võ Nguyên Giáp', vs: 'Lepage, Charton', d: 'It opened with the battle of Đông Khê and cleared the Vietnam – China border.' },
      { n: 'Điện Biên Phủ Campaign', y: '13/3 – 7/5/1954', lat: 21.386, lon: 103.017, k: 'battle', vn: 'General Võ Nguyên Giáp', vs: 'De Castries, Navarre', d: '56 days and nights of "digging into mountains, sleeping in tunnels"; General De Castries was captured alive, forcing France to sign the Geneva Accords.' }
    ]
  },
  {
    id: 'my', t: 'Resistance against the US, reunification of the country', y: '1954 – 1975',
    d: 'Twenty years of resistance, ending with the Hồ Chí Minh Campaign and the reunification of the country on 30 April 1975.',
    route: { t: 'Direction of the spring 1975 offensive', pts: [[12.67, 108.04], [13.98, 108.0], [16.47, 107.58], [16.05, 108.20], [12.25, 109.19], [11.56, 108.99], [10.93, 107.24], [10.777, 106.695]] },
    ev: [
      { n: 'Concerted Uprising movement (Đồng Khởi)', y: '1960', lat: 10.13, lon: 106.33, k: 'event', vn: 'Nguyễn Thị Định', d: 'It began in Mỏ Cày, Bến Tre, with the "long-haired army".' },
      { n: 'Battle of Ấp Bắc', y: '1963', lat: 10.43, lon: 106.21, k: 'battle', d: 'Defeated a sweep supported by helicopters and armored vehicles.' },
      { n: 'Battle of Vạn Tường', y: '1965', lat: 15.12, lon: 108.80, k: 'battle', d: 'The first defeat of a major US Marine operation.' },
      { n: 'Battle of Plei Me – Ia Đrăng', y: '1965', lat: 13.60, lon: 107.72, k: 'battle', vn: 'Nguyễn Hữu An', vs: 'Harold Moore', d: 'The first major battle against the US Air Cavalry Division in the Central Highlands.' },
      { n: 'Tết Offensive – Huế', y: '1968', lat: 16.47, lon: 107.58, k: 'battle', d: 'A general offensive and uprising; the fighting in Huế lasted nearly a month.' },
      { n: 'Khe Sanh', y: '1968', lat: 16.63, lon: 106.73, k: 'battle', d: 'The siege of the Khe Sanh base lasted more than 5 months.' },
      { n: 'Route 9 – Southern Laos', y: '1971', lat: 16.62, lon: 106.58, k: 'battle', vn: 'Lê Trọng Tấn', d: 'Defeated Operation Lam Son 719 along Route 9 into Southern Laos.' },
      { n: 'Quảng Trị Citadel', y: '1972', lat: 16.75, lon: 107.19, k: 'battle', d: '81 days and nights holding the old citadel, one of the fiercest battles.' },
      { n: 'Hanoi – the "Điện Biên Phủ in the air"', y: '12/1972', lat: 21.06, lon: 105.80, k: 'battle', d: '12 days and nights defeating the B-52 bombing raids, forcing the US to sign the 1973 Paris Agreement.' },
      { n: 'Central Highlands Campaign – Buôn Ma Thuột', y: '3/1975', lat: 12.67, lon: 108.04, k: 'battle', vn: 'Hoàng Minh Thảo, Văn Tiến Dũng', d: 'The key battle that opened the 1975 spring General Offensive.' },
      { n: 'Huế – Đà Nẵng Campaign', y: '3/1975', lat: 16.05, lon: 108.20, k: 'battle', vn: 'Lê Trọng Tấn', d: 'Liberated Huế on 26/3 and Đà Nẵng on 29/3.' },
      { n: 'Battle of Xuân Lộc', y: '4/1975', lat: 10.93, lon: 107.24, k: 'battle', vn: 'Hoàng Cầm', vs: 'Lê Minh Đảo', d: 'Opened the "steel gate" east of Saigon.' },
      { n: 'Hồ Chí Minh Campaign – Independence Palace', y: '30 April 1975', lat: 10.777, lon: 106.695, k: 'battle', vn: 'Văn Tiến Dũng, Phạm Hùng, Lê Đức Thọ', d: 'Tanks crashed through the gate of Independence Palace at noon on 30 April; the country was reunified.' }
    ]
  },
  {
    id: 'chuquyen', t: 'Defending the borders and islands', y: '1974 – 1989',
    d: 'Battles to defend sovereignty in the East Sea and along the southwestern and northern borders.',
    ev: [
      { n: 'Naval Battle of the Paracel Islands (Hoàng Sa)', y: '19/1/1974', lat: 16.53, lon: 111.60, k: 'battle', vn: 'Ngụy Văn Thà', d: 'The navy of the Republic of Vietnam fought to defend the Paracel Islands; 74 men died.' },
      { n: 'Southwestern border', y: '1978 – 1979', lat: 10.49, lon: 104.90, k: 'battle', d: 'Resisted attacks by the Khmer Rouge (the Ba Chúc massacre, An Giang), and entered Phnom Penh on 7/1/1979.' },
      { n: 'Northern border – Lạng Sơn', y: '2/1979', lat: 21.85, lon: 106.76, k: 'battle', d: 'Fought to defend the six northern border provinces, from Lai Châu to Quảng Ninh.' },
      { n: 'Vị Xuyên Front', y: '1984 – 1989', lat: 22.80, lon: 104.95, k: 'battle', d: 'Fierce battles to hold the border heights of Hà Giang.' },
      { n: 'Gạc Ma – Spratly Islands (Trường Sa)', y: '14/3/1988', lat: 9.71, lon: 114.28, k: 'battle', vn: 'Trần Văn Phương', d: '64 navy soldiers died; "Let our blood color the flag of the Fatherland red".' }
    ]
  },
  {
    id: 'doimoi', t: 'Đổi Mới and integration', y: '1986 – present',
    d: 'From 1986, Vietnam renewed its economy, opened up and joined the world, growing from a country short of food into a dynamic economy of Asia.',
    ev: [
      { n: 'Sixth Congress – the start of Đổi Mới', y: '12/1986', lat: 21.037, lon: 105.834, k: 'event', vn: 'Nguyễn Văn Linh, Trường Chinh', d: 'The Sixth Party Congress decided on renewal, a move to a market economy, and an end to the subsidy system.' },
      { n: 'Rice exports', y: '1989', lat: 10.03, lon: 105.78, approx: true, k: 'event', vn: 'Farmers of the Mekong Delta', d: 'Only three years after Đổi Mới, from a shortage of rice, Vietnam exported more than 1 million tons of rice; today it is one of the largest rice exporters in the world.' },
      { n: 'US lifts embargo, relations normalized', y: '1994 – 1995', lat: 21.03, lon: 105.85, k: 'event', vn: 'Prime Minister Võ Văn Kiệt', d: 'The US lifted its economic embargo in 1994; on 11/7/1995 the two countries established diplomatic relations.' },
      { n: 'Joining ASEAN', y: '28/7/1995', lat: 4.89, lon: 114.94, k: 'event', vn: 'Foreign Minister Nguyễn Mạnh Cầm', d: 'At the admission ceremony in Brunei, Vietnam became the seventh member of the Association of Southeast Asian Nations.' },
      { n: 'SEA Games 22 in Hanoi', y: '2003', lat: 21.02, lon: 105.764, k: 'event', vn: 'Vietnam sports delegation', d: 'Vietnam hosted the Southeast Asian Games for the first time, opening at Mỹ Đình stadium; the Vietnamese team finished first overall.' },
      { n: 'APEC Summit in Hanoi', y: '2006', lat: 21.006, lon: 105.787, k: 'event', vn: 'President Nguyễn Minh Triết', d: 'Vietnam welcomed the leaders of 21 Asia-Pacific economies; in 2017 it hosted APEC again in Đà Nẵng.' },
      { n: 'Joining the World Trade Organization (WTO)', y: '11/1/2007', lat: 46.224, lon: 6.149, k: 'event', vn: 'Chief negotiator Trương Đình Tuyển', d: 'After 11 years of negotiations, Vietnam became the 150th member of the WTO, which is headquartered in Geneva (Switzerland).' },
      { n: 'Vietnam U23 in Changzhou', y: '27/1/2018', lat: 31.81, lon: 119.974, k: 'event', vn: 'Coach Park Hang-seo, Nguyễn Quang Hải', vs: 'Uzbekistan U23', d: 'Coach Park Hang-seo\'s U23 team reached the final of the Asian championship, playing in white snow; the whole country poured into the streets to welcome them.' },
      { n: 'COVID-19 pandemic', y: '2020 – 2021', lat: 10.776, lon: 106.701, approx: true, k: 'event', d: 'Vietnam controlled the outbreak well in 2020 thanks to quarantine and contact tracing; the Delta wave in 2021 in Ho Chi Minh City was very severe, after which the whole country got vaccinated.' },
      { n: '50 years of national reunification', y: '30 April 2025', lat: 10.777, lon: 106.695, k: 'event', d: 'A grand military parade and march on Lê Duẩn Street in front of Independence Palace celebrated 50 years since the liberation of the South and the reunification of the country.' },
      { n: 'Reorganized into 34 provinces and cities', y: '1/7/2025', lat: 21.03, lon: 105.85, approx: true, k: 'event', d: 'The country merged into 34 provinces and cities and abolished the district level, leaving two levels of local government.' }
    ]
  }
];

// countries with a history, grouped by region in the order shown (the data loads when one is picked)
export const HISTORY_REGIONS = [
  ['Southeast Asia', [['vn', 'Vietnam'], ['la', 'Laos'], ['kh', 'Cambodia'], ['th', 'Thailand'], ['mm', 'Myanmar'], ['my', 'Malaysia'], ['sg', 'Singapore'], ['id', 'Indonesia'], ['ph', 'Philippines']]],
  ['East Asia', [['cn', 'China'], ['jp', 'Japan'], ['kr', 'South Korea'], ['mn', 'Mongolia']]],
  ['South Asia', [['in', 'India'], ['pk', 'Pakistan'], ['bd', 'Bangladesh'], ['np', 'Nepal'], ['lk', 'Sri Lanka'], ['af', 'Afghanistan']]],
  ['Middle East, Central Asia', [['tr', 'Turkey'], ['ir', 'Iran'], ['iq', 'Iraq'], ['sy', 'Syria'], ['il', 'Israel'], ['sa', 'Saudi Arabia'], ['kz', 'Kazakhstan'], ['uz', 'Uzbekistan']]],
  ['Europe', [['gb', 'United Kingdom'], ['ie', 'Ireland'], ['fr', 'France'], ['es', 'Spain'], ['pt', 'Portugal'], ['nl', 'Netherlands'], ['be', 'Belgium'], ['ch', 'Switzerland'], ['de', 'Germany'], ['at', 'Austria'], ['it', 'Italy'], ['gr', 'Greece'],
    ['pl', 'Poland'], ['cz', 'Czechia'], ['hu', 'Hungary'], ['ro', 'Romania'], ['ua', 'Ukraine'], ['ru', 'Russia'], ['se', 'Sweden'], ['no', 'Norway'], ['dk', 'Denmark'], ['fi', 'Finland']]],
  ['Africa', [['eg', 'Egypt'], ['ma', 'Morocco'], ['et', 'Ethiopia'], ['ke', 'Kenya'], ['ng', 'Nigeria'], ['gh', 'Ghana'], ['za', 'South Africa']]],
  ['The Americas', [['us', 'United States'], ['ca', 'Canada'], ['mx', 'Mexico'], ['cu', 'Cuba'], ['co', 'Colombia'], ['pe', 'Peru'], ['br', 'Brazil'], ['ar', 'Argentina'], ['cl', 'Chile']]],
  ['Oceania', [['au', 'Australia'], ['nz', 'New Zealand']]]
].map(([name, list]) => ({ name, countries: list.map(([iso, n]) => ({ iso, name: n })) }));
export const HISTORY_COUNTRIES = HISTORY_REGIONS.flatMap((r) => r.countries);
const MODS = import.meta.glob('./history/*.js');
export const hasHistory = (iso) => iso === 'vn' || !!MODS[`./history/${iso}.js`];
export async function loadHistory(iso) {
  if (iso === 'vn') return { iso: 'vn', name: 'Vietnam', eras: ERAS };
  const m = MODS[`./history/${iso}.js`];
  return m ? (await m()).default : null;
}
