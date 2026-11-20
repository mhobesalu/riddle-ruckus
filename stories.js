// Original silly stories. Each story = 5 chapters; each chapter is one cryptogram.
// All text written for this app. Keep chapters ~70-170 letters. Add new batches as stories2.js etc.
const STORIES = [
{id:'duck', emoji:'🦆', title:'The Duck Who Ran for Mayor', blurb:'A small town election gets very loud.', ch:[
 "Nobody in Puddleford expected Gerald the duck to run for mayor. Then again, nobody expected him to own a tie.",
 "His campaign promise was simple: more bread, fewer fences, and a pond in every kitchen.",
 "The current mayor called it a stunt. Gerald replied by quacking loudly through her entire speech.",
 "On election day, every child in town voted twice, and three of the geese voted four times.",
 "Gerald won by a landslide. His first act as mayor was to declare Tuesday a national nap day."]},
{id:'socks', emoji:'🧦', title:'The Case of the Vanishing Socks', blurb:'Where do the odd socks really go?', ch:[
 "For eleven years, Dorothy lost exactly one sock every laundry day. This week, she decided to stay up and watch.",
 "At midnight, the dryer door creaked open, and a tiny figure in a woolly hat tiptoed out.",
 "He introduced himself as Fergus, chief knitter of a very cold village that lived behind the washing machine.",
 "The villagers unravelled the socks to make blankets. Winters behind a washing machine are famously brutal.",
 "Dorothy now leaves one spare sock on the dryer every Sunday. In return, she gets a thank you card shaped like a mitten."]},
{id:'snail', emoji:'🐌', title:'The Slowest Race on Earth', blurb:'A marathon that takes all week.', ch:[
 "The annual snail marathon in Little Dribbling began on Monday morning. The commentators packed sandwiches for a week.",
 "By Wednesday, the favourite, a snail named Thunderbolt, had travelled almost the length of a carrot.",
 "On Thursday, a rival snail was caught riding on the back of a tortoise. The judges called it cheating, but also kind of genius.",
 "Thunderbolt stopped on Friday to admire a beautiful leaf. The crowd groaned so loudly that a scarecrow fell over.",
 "Nobody finished. The race was declared a draw, and everyone agreed it was the most exciting week of their lives."]},
{id:'llama', emoji:'🦙', title:'A Llama in the Choir', blurb:'The choir needed a bass. They got Bernard.', ch:[
 "The church choir of Saint Bramble needed a new bass singer. Sadly, the only one who came to the audition was a llama.",
 "His name was Bernard, and he could hold a low note for nine minutes without taking a single breath.",
 "The sopranos complained that Bernard spat whenever they sang out of tune, which was, to be fair, quite often.",
 "Before the big winter concert, Bernard ate the sheet music, the conductor's baton, and half of a tuba.",
 "He sang the whole concert from memory. The audience wept, the tuba player did not, and Bernard got a standing ovation."]},
{id:'nana', emoji:'🚀', title:'Nana Goes to the Moon', blurb:'Rejected by the space agency? Build your own.', ch:[
 "When the space agency rejected her application, eighty year old Nana Pearl built a rocket in her garden shed.",
 "She used three vacuum cleaners, a garden hose, a deck chair, and an alarming number of fireworks.",
 "The neighbours called the police. The officer stayed for tea and ended up helping her fix the fins.",
 "Lift off was delayed twice: once for rain, and once because Nana could not find her reading glasses.",
 "She never reached the moon, but she did land on the roof of the town hall, just in time for the raffle. She won a toaster."]},
{id:'court', emoji:'🐈', title:'Whiskers versus Biscuit', blurb:'A cat takes a dog to court over a sunny spot.', ch:[
 "The courtroom fell silent as Whiskers the cat took the stand. She accused Biscuit the dog of stealing her favourite sunny spot.",
 "Biscuit's lawyer, a nervous hamster, argued that sunshine cannot be owned by anyone, least of all a cat.",
 "The jury of twelve goldfish forgot the question every few seconds, so the trial took a remarkably long time.",
 "The surprise witness was the vacuum cleaner. Nobody understood a word it said, but both animals hid under the sofa.",
 "The judge ruled that the sunny spot belongs to whoever falls asleep in it first. Both animals have been napping in court ever since."]},
{id:'vending', emoji:'🥤', title:'The Moody Vending Machine', blurb:'Say please, or get prune juice.', ch:[
 "The vending machine on the third floor had feelings. If you did not say please, it gave you a warm can of prune juice.",
 "Derek from accounting kicked it once. For the next month, every bag of crisps he bought contained exactly one crisp.",
 "Soon the whole office was leaving it compliments on sticky notes. It began handing out free chocolate to the polite ones.",
 "When the manager tried to replace it with a newer model, the old machine refused to give anyone their coins back.",
 "After a long meeting, everyone agreed it could stay. It now has its own name badge, a pot plant, and a seat at the office party."]},
{id:'spaghetti', emoji:'🍝', title:'The Spaghetti Bridge Contest', blurb:'Engineering, pasta, and a very bad accident.', ch:[
 "Every year, the engineering students of Pemberton build bridges out of dry spaghetti. This year, each bridge had to hold a pumpkin.",
 "Team one used a clever triangle design. Team two used glue, hope, and a lot of tape when the judges were not looking.",
 "On the morning of the contest, the caretaker accidentally put both bridges in a pot of boiling water.",
 "Rather than panic, the students added tomato sauce, invited the judges to lunch, and called it a structural tasting.",
 "The pumpkin was never tested, but everyone agreed it was the best contest in years. The caretaker got an honorary degree."]},
];
const FREE_IDS = ['duck','socks','snail'];
