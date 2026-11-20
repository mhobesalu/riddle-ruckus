// True stories and real science, each told in 5 coded chapters. Written for this app; facts only from well-documented sources.
// Digits and punctuation are shown as-is (only letters are coded). Add new batches as stories2.js etc.
const CATS = [
 {id:'builders', title:'Builders & inventors', sub:'Real lives, real lessons.'},
 {id:'brain', title:'Your brain & ADHD', sub:'Strange and useful things neuroscience has found.'},
];
const STORIES = [
{id:'franklin', cat:'builders', emoji:'🪁', title:'Benjamin Franklin', blurb:'The runaway apprentice who retired at 42.', ch:[
 "At 17, Benjamin Franklin ran away from his apprenticeship in Boston. He arrived in Philadelphia with one Dutch dollar and some copper coins.",
 "He bought three big bread rolls and walked up Market Street eating one, with the other two under his arms. His future wife saw him and thought he looked ridiculous.",
 "He built a printing business, published Poor Richard's Almanack for 25 years, and stepped back from daily business at 42.",
 "With his free time, he flew a kite in a storm to show that lightning is electricity, then invented the lightning rod.",
 "He never patented his inventions. He wrote that we should be glad to serve others by any invention of ours, freely and generously."],
 lesson:'Buy back your time early, then spend it on work that matters to you.'},
{id:'adhd', cat:'brain', emoji:'🧠', title:'Inside the ADHD brain', blurb:'Dopamine, hyperfocus and time blindness.', ch:[
 "ADHD is one of the most inherited conditions in psychiatry. Twin studies estimate that around 70 to 80 percent of the risk comes from genes.",
 "Research links ADHD to differences in dopamine signalling, the brain chemistry behind motivation, reward and getting started.",
 "That is why boring tasks feel like pushing a boulder, while interesting ones can trigger hyperfocus that lasts for hours.",
 "Psychologist Russell Barkley calls ADHD a disorder of time. The future feels less real, so deadlines only feel urgent when they are very close.",
 "Exercise raises dopamine and norepinephrine. Studies show that even one short workout can sharpen attention in people with ADHD."],
 lesson:'It is not a lack of willpower. Make tasks interesting, make time visible, and move your body.'},
{id:'wright', cat:'builders', emoji:'✈️', title:'The Wright brothers', blurb:'Two bicycle mechanics beat the experts.', ch:[
 "Wilbur and Orville Wright never received high school diplomas. They paid for their flying experiments with money from their bicycle shop in Ohio.",
 "When the published data on wing lift turned out to be wrong, they built their own wind tunnel and tested about 200 wing shapes.",
 "No company could sell them an engine that was light enough, so their shop mechanic, Charlie Taylor, built one in about six weeks.",
 "On December 17, 1903, Orville flew for 12 seconds and 120 feet. Only five local people were there to watch.",
 "Few newspapers believed them. It took almost five more years of quiet work before public flights in France made them world famous."],
 lesson:'When the experts are wrong, test it yourself.'},
{id:'curie', cat:'builders', emoji:'⚗️', title:'Marie Curie', blurb:'Two Nobel Prizes, two different sciences.', ch:[
 "Marie Curie grew up in Warsaw, where women could not go to university. She studied at a secret school that moved from house to house.",
 "In Paris she lived in a cold attic and sometimes piled every piece of clothing she owned on her bed to keep warm at night.",
 "With her husband Pierre, she discovered two new elements. She named the first one polonium, after her homeland, Poland.",
 "She was the first woman to win a Nobel Prize, and she is still the only person to win Nobel Prizes in two different sciences.",
 "Her notebooks are still radioactive more than a century later. They are kept in lead lined boxes at the national library in Paris."],
 lesson:'Hard conditions are not a stop sign. Keep going.'},
{id:'brainfacts', cat:'brain', emoji:'🔬', title:'Strange brain discoveries', blurb:'Taxi drivers, an iron rod, and night cleaning.', ch:[
 "Your brain is about 2 percent of your body weight, but it uses around 20 percent of your body's energy.",
 "London taxi drivers must memorise thousands of streets. Brain scans showed that part of their hippocampus, a memory centre, grew larger.",
 "In 1848 an iron rod shot through the head of railway worker Phineas Gage. He survived, but friends said he was no longer the same man.",
 "After brain surgery, a patient known as H.M. could not form new memories, yet he still got better at new skills like drawing in a mirror.",
 "While you sleep, your brain washes itself. A system of fluid flushes out waste much faster during sleep than when you are awake."],
 lesson:'Your brain is physical, it changes with use, and it needs sleep to clean itself.'},
{id:'edison', cat:'builders', emoji:'💡', title:'Thomas Edison', blurb:'An invention factory, and a fire at 67.', ch:[
 "Thomas Edison had only a few months of school. His mother taught him at home, and he lost most of his hearing as a boy.",
 "At Menlo Park he built one of the first industrial research labs, aiming for a small invention every ten days and a big one every six months.",
 "To find a lasting light bulb filament, his team tested thousands of materials. Carbonised bamboo finally glowed for over a thousand hours.",
 "In December 1914, a huge fire destroyed much of his factory in West Orange. He was 67 years old.",
 "Watching it burn, he said there is great value in disaster, because all our mistakes are burned up. Within weeks, the factory was running again."],
 lesson:'Make lots of attempts, and treat setbacks as a fresh start.'},
{id:'plastic', cat:'brain', emoji:'🌱', title:'The brain that rewires itself', blurb:'Neuroplasticity, from juggling to braille.', ch:[
 "For most of the 20th century, scientists believed the adult brain was fixed. Research since the 1990s has shown it keeps changing.",
 "Adults who learned to juggle for three months showed visible growth in brain areas for motion. When they stopped, some of it faded.",
 "Some children who had half of their brain removed to stop severe seizures grew up to walk, talk and live largely normal lives.",
 "Blind people who read braille use their visual cortex to process touch. The brain hands unused space to a new job.",
 "Every time you practise a skill, you strengthen the connections that support it. You can keep doing this for your whole life."],
 lesson:'Practice literally changes your brain, at any age.'},
{id:'walker', cat:'builders', emoji:'🧴', title:'Madam C. J. Walker', blurb:'From washerwoman to millionaire.', ch:[
 "Sarah Breedlove was born in Louisiana in 1867, the first child in her family born free. She was an orphan by the age of seven.",
 "For years she worked as a washerwoman, earning about a dollar and a half a day, while raising her daughter on her own.",
 "Struggling with hair loss, she developed her own hair care products and sold them door to door as Madam C. J. Walker.",
 "She trained thousands of women as sales agents, giving them income and independence that few other jobs offered at the time.",
 "She is often called the first self made female millionaire in America, and she gave generously to schools and charities."],
 lesson:'Solve your own problem first. Others probably have it too.'},
{id:'disney', cat:'builders', emoji:'🐭', title:'Walt Disney', blurb:'He lost his star character, so he drew a new one.', ch:[
 "Walt Disney's first animation studio in Kansas City went bankrupt. He moved to Hollywood with a suitcase and very little money.",
 "In 1928 he lost the rights to his hit character, Oswald the Lucky Rabbit, and most of his animators, to his distributor.",
 "So he created a new character: a mouse. Steamboat Willie, one of the first cartoons with synchronised sound, made Mickey a star.",
 "Hollywood called his plan for a feature length cartoon Disney's Folly. Snow White went far over budget, to nearly 1.5 million dollars.",
 "It became the most successful sound film of its time. Losing Oswald pushed him to own everything he created from then on."],
 lesson:'Own what you build.'},
{id:'shackleton', cat:'builders', emoji:'🧊', title:'Ernest Shackleton', blurb:'Trapped in Antarctic ice, and everyone came home.', ch:[
 "In 1915, Ernest Shackleton's ship Endurance became trapped in Antarctic sea ice, far from any chance of rescue.",
 "The ice slowly crushed the ship. The 28 men camped on drifting ice for months, then took lifeboats to Elephant Island.",
 "Shackleton and five men sailed a small lifeboat about 800 miles across one of the stormiest oceans on Earth to South Georgia.",
 "They landed on the wrong side of the island and crossed its icy mountains on foot, with screws from the boat in their boots for grip.",
 "Every man of the Endurance crew survived. In 2022, the wreck was found 3,000 metres down, remarkably well preserved."],
 lesson:'Morale is a leader\'s first job.'},
{id:'jobs', cat:'builders', emoji:'🍎', title:'Steve Jobs', blurb:'Fired from his own company at 30.', ch:[
 "After dropping out of college, Steve Jobs sat in on a calligraphy class for fun. Ten years later, it shaped the fonts of the first Mac.",
 "In 1985, at the age of 30, he was pushed out of Apple, the company he had started with a friend.",
 "He founded a new computer company called NeXT, and bought a small computer graphics group from Lucasfilm that became Pixar.",
 "In 1995 Pixar released Toy Story, the first feature film made entirely with computer animation.",
 "Apple then bought NeXT and brought him back. He later said that getting fired from Apple was the best thing that could have happened to him."],
 lesson:'You can only connect the dots looking backwards, so follow your curiosity.'},
];
const FREE_IDS = ['franklin','adhd','wright'];
