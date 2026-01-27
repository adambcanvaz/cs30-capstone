//—— CHARACTERS SYSTEM ——————————————————————————————————————————————————————————————————————————————————————
// Contains all customer data (sprites/dialogue), 
// and handles individual character logic like patience decay and reactions.

let characterAssets = {};

const CHARACTERS = {

  //———————— DAY 1 ———————————————————————————————————————————————————————————————————————

  "norman": {
    id: "norman", name: "Norman", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      fail: { file: "assets/characters/city_man/attack.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "Morning. Just a regular hamburger today. Meat, lettuce, ketchup. Don't overthink it.",
      hint: "I said, just a standard burger. Beef, lettuce, and ketchup.",
      stack: ["bun_bottom", "beef", "lettuce", "ketchup", "bun_top"],
      success: "Reliable as always.",
      fail: "This isn't what I usually get."
    }]
  },

  "grandpa_betsy": {
    id: "grandpa_betsy", name: "Grandpa Betsy", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/peasant/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/peasant/idle.png", frames: 7, loop: true },
      fail: { file: "assets/characters/peasant/sell.png", frames: 10, loop: false }
    },
    dialogue: [{
      order: "Oh hello dearie. My dentures are acting up. Them dratted things cost a fortune! So nothing hard. Just a soft bun and the meat. No crunchy greens.",
      hint: "Eh? Speak up! I said no lettuce! Just the soft bun and meat!",
      stack: ["bun_bottom", "beef", "bun_top"],
      success: "Oh, bless you dear. Soft and warm.",
      fail: "Ouch! I told you, nothing crunchy! You darn kids."
    }]
  },

  "timmy": {
    id: "timmy", name: "Timmy", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/schoolboy/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/schoolboy/dialogue.png", frames: 9, loop: false },
      fail: { file: "assets/characters/schoolboy/attack.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "NO GREEN STUFF! If I see a leaf I will SCREAM!",
      hint: "ARE YOU DEAF? I SAID NO LETTUCE! JUST MEAT AND KETCHUP!",
      stack: ["bun_bottom", "beef", "ketchup", "bun_top"],
      success: "YAY! No vitamins!",
      fail: "EW! IT TOUCHED A VEGETABLE!"
    }]
  },

  "stray_dog": {
    id: "stray_dog", name: "Stray Dog", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/dog/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/dog/jamp.png", frames: 10, loop: false },
      fail: { file: "assets/characters/dog/attack.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "Woof. *stares intensely at the grill.*",
      hint: "*paws at the beef patty. He growls at the bun.*",
      stack: ["beef"],
      success: "*tail wagging intensifies*",
      fail: "*sad whimpering*"
    }]
  },

  "sarah": {
    id: "sarah", name: "Sarah", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/schoolgirl/idle.png", frames: 9, loop: true },
      success: { file: "assets/characters/schoolgirl/dialogue.png", frames: 11, loop: false },
      fail: { file: "assets/characters/schoolgirl/attack.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "Omg, so I have this stats test? And I'm broke. Just a bun with ketchup? Is that a thing? I only have like, two dollars.",
      hint: "Like, literally just the bun and ketchup. No meat. I'm poor, okay?",
      stack: ["bun_bottom", "ketchup", "bun_top"],
      success: "Thanks! I might actually pass stats now. I still need to remember Bernoulli's conditions though...",
      fail: "Umm, I am 99% confident I can't afford this?"
    }]
  },

  "salaryman_ken": {
    id: "salaryman_ken", name: "Ken", unlockDay: 1, mandatory: true,
    animData: {
      idle: { file: "assets/characters/trader/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/trader/approval.png", frames: 8, loop: false },
      fail: { file: "assets/characters/trader/idle.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "Boss just dropped a report on my desk at 5 PM. I need energy. Double meat. No salad, I don't have time to chew.",
      hint: "I need efficiency. Two beef patties. Nothing else. Chop chop.",
      stack: ["bun_bottom", "beef", "beef", "bun_top"],
      success: "Efficient. Back to the grind.",
      fail: "I asked for a double. Can you count?"
    }]
  },

  //———————— DAY 2 ———————————————————————————————————————————————————————————————————————

  "officer_miller": {
    id: "officer_miller", name: "Officer Miller", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/police/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/police/recharge_1.png", frames: 10, loop: false },
      fail: { file: "assets/characters/police/special.png", frames: 13, loop: false }
    },
    dialogue: [{
      order: "Dispatch, I need a 10-4 on a classic patrol vehicle. Put a siren on top.",
      hint: "Focus, citizen. A 'Siren' is a tomato. Beef, Cheese, Tomato.",
      stack: ["bun_bottom", "beef", "american_cheese", "tomato", "bun_top"],
      success: "Copy that. Good work, citizen.",
      fail: "Citation issued for culinary incompetence."
    }]
  },

  "nurse_brenda": {
    id: "nurse_brenda", name: "Nurse Brenda", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/doctor/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/doctor/dialogue.png", frames: 6, loop: false },
      fail: { file: "assets/characters/doctor/protection.png", frames: 3, loop: true }
    },
    dialogue: [{
      order: "I've been on my feet for 12 hours. One of my patient's had swallowed a spatula... Don't ask. I need comfort food. Just cheese. Lots of it. And crunch.",
      hint: "Honey, just give me a cheeseburger with extra cheese. Don't forget that green layer. I'm exhausted.",
      stack: ["bun_bottom", "beef", "american_cheese", "american_cheese", "lettuce", "bun_top"],
      success: "You're a lifesaver, hon.",
      fail: "I'm too tired for this, it's wrong. Maybe I should make you eat that spatula."
    }]
  },

  "construction_worker": {
    id: "construction_worker", name: "Mike", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/worker/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/worker/idle.png", frames: 6, loop: false },
      fail: { file: "assets/characters/worker/attack.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "Hey boss. I got a long shift. Give me a double cheeseburger with everything. Lettuce, tomato, ketchup, mustard. Load it up.",
      hint: "The works, boss! Beef, cheese, lettuce, tomato, ketchup, mustard. Everything!",
      stack: ["bun_bottom", "beef", "american_cheese", "beef", "american_cheese", "lettuce", "tomato", "ketchup", "mustard", "bun_top"],
      success: "Now that's a lunch.",
      fail: "You forgot something, boss. Tsk tsk."
    }]
  },

  "tourist_bob": {
    id: "tourist_bob", name: "Tourist Bob", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/homeless/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/homeless/special.png", frames: 13, loop: false },
      fail: { file: "assets/characters/homeless/attack_1.png", frames: 5, loop: true }
    },
    dialogue: [{
      order: "Is this the famous 'Traffic Light' burger? *hiccup* Red, Yellow, Green?",
      hint: "You know! Red tomato, yellow cheese, green lettuce. For the 'gram!",
      stack: ["bun_bottom", "beef", "lettuce", "tomato", "american_cheese", "ketchup", "mustard", "bun_top"],
      success: "Wow! Going straight to all my 27 Instagram followers! *hiccup*",
      fail: "This doesn't look like the ads... *hiccup* My Instagram will be hearing about this. Cancelled."
    }]
  },

  "little_lisa": {
    id: "little_lisa", name: "Lisa", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/child/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/child/walk.png", frames: 10, loop: true },
      fail: { file: "assets/characters/child/walk.png", frames: 10, loop: true }
    },
    dialogue: [{
      order: "Can I have a cheeseburger? But with no yellow sauce? My daddy says mustard is spicy.",
      hint: "No mustard! Just ketchup and cheese please!",
      stack: ["bun_bottom", "beef", "american_cheese", "ketchup", "bun_top"],
      success: "Yummy!",
      fail: "Ew! Spicy! Daddy will ruin your place to the ground."
    }]
  },

  "soldier": {
    id: "soldier", name: "Pvt. Smith", unlockDay: 2, mandatory: true,
    animData: {
      idle: { file: "assets/characters/soldier/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/soldier/recharge.png", frames: 13, loop: false },
      fail: { file: "assets/characters/soldier/shot_2.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "Rations. Meat. Bread. Cheese. Execute.",
      hint: "Clarification: Standard Cheeseburger. Beef. Cheese. Bun. Execute.",
      stack: ["bun_bottom", "beef", "american_cheese", "bun_top"],
      success: "Affirmative. Spared.",
      fail: "Incorrect. Attack."
    }]
  },

  //———————— DAY 3 ———————————————————————————————————————————————————————————————————————

  "jasper": {
    id: "jasper", name: "Jasper", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/graffiti/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/graffiti/jump_shot.png", frames: 18, loop: false },
      fail: { file: "assets/characters/graffiti/special_blow_2.png", frames: 10, loop: false }
    },
    dialogue: [{
      order: "I want something ironic. A burger that thinks it's a salad. But make it look sad.",
      hint: "Ugh, you don't get it? A Chicken sandwich with salad stuff. No cow.",
      stack: ["bun_bottom", "chicken", "lettuce", "tomato", "bun_top"],
      success: "So subversive. I love it.",
      fail: "Ugh, too mainstream."
    }]
  },

  "gym_bro": {
    id: "gym_bro", name: "Chad", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/survivalist/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/survivalist/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/survivalist/attack_1.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "Cutting carbs. I need the bird and the cows. None of that gluten carb weakness.",
      hint: "Bro, protein! Chicken AND two beef. None of that damn bread!",
      stack: ["chicken", "beef", "beef"],
      success: "LIGHTWEIGHT BABY!",
      fail: "Is that a carb? Bro?"
    }]
  },

  "sour_sally": {
    id: "sour_sally", name: "Sally", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/city_girl/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/city_girl/jump.png", frames: 11, loop: false },
      fail: { file: "assets/characters/city_girl/attack_3.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "My ex-boyfriend was sweet. I want the opposite. Make it hurt my face.",
      hint: "I want it sour and spicy. Pickles and Mustard. No sweet ketchup.",
      stack: ["bun_bottom", "beef", "pickles", "mustard", "bun_top"],
      success: "Perfectly bitter. Just like my heart.",
      fail: "Too sweet! Ugh!"
    }]
  },

  "the_cat": {
    id: "the_cat", name: "Cat", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/cat/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/cat/jamp.png", frames: 10, loop: false },
      fail: { file: "assets/characters/cat/special.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "Meow. *disdainful look at the beef.*",
      hint: "*hisses at the beef and stares at the chicken patty.*",
      stack: ["chicken"],
      success: "Purr.",
      fail: "*knocks tip jar off counter*"
    }]
  },

  "yakuza": {
    id: "yakuza", name: "Kenji", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/gangster/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/gangster/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/gangster/shot.png", frames: 12, loop: false }
    },
    dialogue: [{
      order: "The Boss wants the 'White Silence'. Chicken. Dressed in white.",
      hint: "Chicken and Mayo. Simple.",
      stack: ["bun_bottom", "chicken", "mayo", "bun_top"],
      success: "*Nods silently*",
      fail: "Dishonor."
    }]
  },

  "trucker": {
    id: "trucker", name: "Big Red", unlockDay: 3, mandatory: true,
    animData: {
      idle: { file: "assets/characters/trucker/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/trucker/idle.png", frames: 6, loop: false },
      fail: { file: "assets/characters/trucker/attack.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "Breaker one-nine. I need a chicken sandwich with the works. Mayo, lettuce, tomato, pickles. Keep the rubber side down.",
      hint: "A chicken sandwich, good buddy. Mayo, lettuce, tomato, pickles.",
      stack: ["bun_bottom", "chicken", "mayo", "lettuce", "tomato", "pickles", "bun_top"],
      success: "Roger, good buddy.",
      fail: "This ain't it, chief."
    }]
  },

  //———————— DAY 4 ——————————————————————————————————————————————————————————————————————— **

  "rusty": {
    id: "rusty", name: "Rusty", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/raider/idle.png", frames: 8, loop: true },
      success: { file: "assets/characters/raider/recharge.png", frames: 12, loop: false },
      fail: { file: "assets/characters/raider/run.png", frames: 8, loop: true }
    },
    dialogue: [{
      order: "The drones! Bury the drones in the dirt! ...but you gotta insulate it in foil and glue!",
      hint: "The flying drone! Hide it with fungi, lettuce and cheese! Hurry!",
      stack: ["bun_bottom", "chicken", "american_cheese", "mushrooms", "lettuce", "bun_top"],
      success: "Eat it quickly! The signal is fading!",
      fail: "THEY FOUND ME!"
    }]
  },

  "leafy": {
    id: "leafy", name: "Leafy", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/elf_npc/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/elf_npc/dialogue.png", frames: 7, loop: true },
      fail: { file: "assets/characters/elf_npc/special.png", frames: 12, loop: true }
    },
    dialogue: [{
      order: "I wish to taste the earth, but not the animal.",
      hint: "I am vegetarian. Veggie patty, mushrooms, lettuce.",
      stack: ["bun_bottom", "veggie_patty", "lettuce", "mushroom", "bun_top"],
      success: "My spirit is aligned.",
      fail: "I taste suffering."
    }]
  },

  "scientist": {
    id: "scientist", name: "Dr. Fungi", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/scientist/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/scientist/special.png", frames: 14, loop: false },
      fail: { file: "assets/characters/scientist/dead.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "I require a sample of mycelium network on a protein substrate. Minimal sodium.",
      hint: "I need the fungus... Mushrooms... on the beef. No salt.",
      stack: ["bun_bottom", "beef", "mushrooms", "bun_top"],
      success: "Data collection complete.",
      fail: "Sample contaminated."
    }]
  },

  "witch": {
    id: "witch", name: "Morgana", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/witch/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/witch/special.png", frames: 13, loop: false },
      fail: { file: "assets/characters/witch/attack_1.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "A patty of plants... fungus from the bog... the red ichor and the crunch of toad toes...",
      hint: "Use the veggie patty and add mushrooms with ketchup and pickled cucumbers, you fool!",
      stack: ["bun_bottom", "veggie_patty", "mushrooms", "pickles", "ketchup", "bun_top"],
      success: "Double, double toil and trouble!",
      fail: "I shall curse your spatula!"
    }]
  },

  "dwarf": {
    id: "dwarf", name: "Gimlo", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/dwarf/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/dwarf/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/dwarf/special.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "I need something hearty. Grown in the shadows. And an onion for the smell.",
      hint: "Mushrooms and onions on beef, lad! Hearty food!",
      stack: ["bun_bottom", "beef", "mushrooms", "red_onion", "bun_top"],
      success: "Aye, that hits the spot!",
      fail: "Flimsy elf food!"
    }]
  },

  "regular_joe": {
    id: "regular_joe", name: "Joe", unlockDay: 4, mandatory: true,
    animData: {
      idle: { file: "assets/characters/worker/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/worker/idle.png", frames: 6, loop: false },
      fail: { file: "assets/characters/worker/attack.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "I swallowed a spatula a few days ago... Anyway - can I just get a healthy burger with onions and pickles? Thanks.",
      hint: "Just a veggie burger with onions and pickles. Nurse Brenda's orders.",
      stack: ["bun_bottom", "veggie_patty", "red_onion", "pickles", "bun_top"],
      success: "Not bad for fake meat.",
      fail: "Is this beef? Are you trying to kill me?"
    }]
  },

  "norman_diet": {
    id: "norman_diet", name: "Norman", unlockDay: 4, mandatory: false,
    animData: {
      idle: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      fail: { file: "assets/characters/city_man/attack.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "Hey again. My wife has me on a diet. One of them healthy burgers. But... sneak a slice of freedom on it? She won't know.",
      hint: "Shh! Veggie burger. Cheapest cheese on it. Don't tell my wife.",
      stack: ["bun_bottom", "veggie_patty", "american_cheese", "bun_top"],
      success: "Our little secret.",
      fail: "Is this meat? If she finds out I'm dead."
    }]
  },

  "sarah_art": {
    id: "sarah_art", name: "Sarah", unlockDay: 4, mandatory: false,
    animData: {
      idle: { file: "assets/characters/schoolgirl/idle.png", frames: 9, loop: true },
      success: { file: "assets/characters/schoolgirl/dialogue.png", frames: 11, loop: false },
      fail: { file: "assets/characters/schoolgirl/attack.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "I failed AP Stats, but I'm in Art now! I need to express 'Fungal Despair', but I need contrast. Can I get a mushroom burger with a field of green and a splash of anger?",
      hint: "It's a metaphor! A veggie burger with mushrooms, green, and red sauce. Mushrooms are so... moody.",
      stack: ["bun_bottom", "veggie_patty", "mushrooms", "lettuce", "ketchup", "bun_top"],
      success: "So tragic. I love it.",
      fail: "This isn't art! This is devestation."
    }]
  },

  //———————— DAY 5 ———————————————————————————————————————————————————————————————————————

  "richie": {
    id: "richie", name: "Ricarda III", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/trader_fancy/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/trader_fancy/approval.png", frames: 6, loop: false },
      fail: { file: "assets/characters/trader_fancy/dialogue.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "Swine and expensive cheese... but I'm not a savage. It needs to be plated properly. A bed of greens and a slice of heirloom fruit.",
      hint: "I want bacon and cheddar. Lettuce and tomato from the organic market. No cheap cow.",
      stack: ["bun_bottom", "bacon", "cheddar_cheese", "lettuce", "tomato", "bun_top"],
      success: "Keep the change.",
      fail: "Gross. Peasant food. Blegh."
    }]
  },

  "cowboy_bill": {
    id: "cowboy_bill", name: "Wild Bill", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/bandit/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/bandit/dead.png", frames: 6, loop: false },
      fail: { file: "assets/characters/bandit/attack.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "Give me the whole barnyard. If it moos, clucks, or oinks, slather it in smoke sauce.",
      hint: "Everything! Cow, chicken, pig, BBQ.",
      stack: ["bun_bottom", "beef", "chicken", "bacon", "bbq_sauce", "bun_top"],
      success: "Yeehaw!",
      fail: "Where's the rest of the farm? Did the coyotes get them?"
    }]
  },

  "orc_warlord": {
    id: "orc_warlord", name: "Warlord Grog", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/orc/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/orc/jump.png", frames: 13, loop: false },
      fail: { file: "assets/characters/orc/run+attack.png", frames: 5, loop: true }
    },
    dialogue: [{
      order: "MEAT. FIRE. BROWN BLOOD.",
      hint: "BBQ SAUCE! MEAT! BACON!",
      stack: ["bun_bottom", "beef", "bacon", "bbq", "bun_top"],
      success: "GRAAAH! GOOD!",
      fail: "PUNY BURGER!"
    }]
  },

  "vampire": {
    id: "vampire", name: "Vlad", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/vampire/idle.png", frames: 5, loop: true },
      success: { file: "assets/characters/vampire/idle.png", frames: 5, loop: true },
      fail: { file: "assets/characters/vampire/dead.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "I crave the red fluid. But no pungent root.",
      hint: "Red sauce. On beef. No garlic... I mean, onions.",
      stack: ["bun_bottom", "beef", "ketchup", "bun_top"],
      success: "Deliciously sanguine...",
      fail: "HISS! THOU SHALL BE CURSED!"
    }]
  },

  "hellhound": {
    id: "hellhound", name: "Fluffy", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/hellhound/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/hellhound/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/hellhound/attack_1.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "*growls smoke at the swine and cow meat*",
      hint: "*snaps jaws at the bacon and beef.*",
      stack: ["beef", "bacon"],
      success: "*demonic barking*",
      fail: "*bites counter*"
    }]
  },

  "knight": {
    id: "knight", name: "Sir Loin", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/knight/idle.png", frames: 4, loop: true },
      success: { file: "assets/characters/knight/defend.png", frames: 5, loop: true },
      fail: { file: "assets/characters/knight/attack_1.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "I require the King's Stack. Meat, Cheese, Meat, Cheese, crowned with Bacon!",
      hint: "Double Cheeseburger with Bacon, knave!",
      stack: ["bun_bottom", "beef", "american_cheese", "beef", "american_cheese", "bacon", "bun_top"],
      success: "Huzzah!",
      fail: "My defenses are lowered!"
    }]
  },

  "the_king": {
    id: "the_king", name: "King Burger IV", unlockDay: 5, mandatory: true,
    animData: {
      idle: { file: "assets/characters/king/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/king/dialogue.png", frames: 7, loop: false },
      fail: { file: "assets/characters/king/protection.png", frames: 3, loop: false }
    },
    dialogue: [{
      order: "We demand a feast fit for royalty! A Crown of Gold upon the Swine! Make it double! One green king bed.",
      hint: "Double cheese and bacon on the beef! Peasant's 'lettuce'. Make haste!",
      stack: ["bun_bottom", "beef", "cheddar_cheese", "beef", "cheddar_cheese", "lettuce", "bacon", "bun_top"],
      success: "We dub thee... Sir Burger Maker.",
      fail: "Off with his head! This is peasant food!"
    }]
  },

  "timmy_return": {
    id: "timmy_return", name: "Timmy", unlockDay: 5, mandatory: false,
    animData: {
      idle: { file: "assets/characters/schoolboy/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/schoolboy/dialogue.png", frames: 9, loop: false },
      fail: { file: "assets/characters/schoolboy/attack.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "Mom gave me five dollars! I want the PIG MEAT! And the BROWN SAUCE! And NO GREEN STUFF!",
      hint: "I WANT BACON AND BBQ SAUCE ON MY BURGER!",
      stack: ["bun_bottom", "bacon", "bbq", "bun_top"],
      success: "BEST. LUNCH. EVER!",
      fail: "I WANTED THE OINK OINK MEAT!"
    }]
  },

  "grandpa_naughty": {
    id: "grandpa_naughty", name: "Grandpa Betsy", unlockDay: 5, mandatory: false,
    animData: {
      idle: { file: "assets/characters/peasant/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/peasant/idle.png", frames: 7, loop: true },
      fail: { file: "assets/characters/peasant/sell.png", frames: 10, loop: false }
    },
    dialogue: [{
      order: "A little slice of bacon on my burger, dear... and put some of that sweet yellow sauce and the white one too. I'm if gonna sin, I might as well enjoy it!",
      hint: "Just sneak some bacon on my hamburger and that mustard and mayo. Shhh... Don't tell the doctor!",
      stack: ["bun_bottom", "beef", "bacon", "mayo_sauce", "mustard_sauce", "bun_top"],
      success: "Naughty but delicious!",
      fail: "Is this lettuce I see? I wanted to be naughty, not healthy!"
    }]
  },

  //———————— DAY 6 ———————————————————————————————————————————————————————————————————————

  "daredevil_dave": {
    id: "daredevil_dave", name: "Danger Dave", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/spice_crazy/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/spice_crazy/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/spice_crazy/shot.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "HURT ME. I want to cry. I want to regret being born.",
      hint: "All the spicy stuff.",
      stack: ["bun_bottom", "beef", "jalapeno", "chili", "wasabi", "bun_top"],
      success: "AGHHH! I LOVE IT!",
      fail: "Weak. My nephew eats spicier than this."
    }]
  },

  "swiss_miss": {
    id: "swiss_miss", name: "Heidi", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/swiss_girl/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/swiss_girl/idle.png", frames: 6, loop: true },
      fail: { file: "assets/characters/swiss_girl/attack_1.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "I want a beige burger. No strong colors. A4-paper-white with some ink.",
      hint: "Swiss cheese and mayo on Beef. Mushrooms.",
      stack: ["bun_bottom", "beef", "swiss_cheese", "mushrooms", "mayo", "bun_top"],
      success: "Balanced.",
      fail: "Too colorful."
    }]
  },

  "pyromancer": {
    id: "pyromancer", name: "Ignis", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/pyromancer/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/pyromancer/run.png", frames: 8, loop: true },
      fail: { file: "assets/characters/pyromancer/dead.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "Fuel my flame! I need the peppers... but I need grease to keep the fire burning. And the melting yellow sludge.",
      hint: "Chili peppers and Jalapenos on Beef! Add the bacon and american cheese.",
      stack: ["bun_bottom", "beef", "american_cheese", "bacon", "chili", "jalapeno", "bun_top"],
      success: "The fire rises!",
      fail: "Extinguished."
    }]
  },

  "dark_elf": {
    id: "dark_elf", name: "Malekith", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/dark_elf/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/dark_elf/idle.png", frames: 6, loop: true },
      fail: { file: "assets/characters/dark_elf/attack.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "The green poison... but it needs the darkness of the forest and the pale moon. Some sweet colourfulness doesn't hurt too.",
      hint: "Wasabi. The green paste. Put it on the beef with some fungi and swiss. Bell peppers.",
      stack: ["bun_bottom", "beef", "swiss_cheese", "mushrooms", "bell_peppers", "wasabi", "bun_top"],
      success: "It stings... excellent.",
      fail: "Boring."
    }]
  },

  "zombie": {
    id: "zombie", name: "Subject Zero", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/zombie/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/zombie/jump.png", frames: 10, loop: false },
      fail: { file: "assets/characters/zombie/attack_1.png", frames: 7, loop: false }
    },
    dialogue: [{
      order: "Graaaaains...",
      hint: "Buuuuuns... just buuuuuns...",
      stack: ["bun_bottom", "bun_top"],
      success: "*happy groan*",
      fail: "*angry groan*"
    }]
  },

  "skeleton": {
    id: "skeleton", name: "Bones", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/skeleton/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/skeleton/evasion.png", frames: 6, loop: false },
      fail: { file: "assets/characters/skeleton/dead.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "No stomach. Just give me the calcium.",
      hint: "Swiss Cheese. It has holes, like me. Just cheese.",
      stack: ["swiss_cheese", "swiss_cheese"],
      success: "Rattle rattle!",
      fail: "It fell through my ribs..."
    }]
  },

  "ken_sleepy": {
    id: "ken_sleepy", name: "Ken", unlockDay: 6, mandatory: false,
    animData: {
      idle: { file: "assets/characters/trader/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/trader/approval.png", frames: 8, loop: false },
      fail: { file: "assets/characters/trader/idle.png", frames: 6, loop: true }
    },
    dialogue: [{
      order: "I haven't slept in three days. I need to feel something. Put those hot peppers on it. Maybe the pain will wake me up.",
      hint: "Jalapenos on Beef. I need the shock.",
      stack: ["bun_bottom", "beef", "jalapeno", "bun_top"],
      success: "Okay... I'm awake.",
      fail: "Zzzzz..."
    }]
  },

  "sally_heartbroken": {
    id: "sally_heartbroken", name: "Sally", unlockDay: 6, mandatory: false,
    animData: {
      idle: { file: "assets/characters/city_girl/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/city_girl/jump.png", frames: 11, loop: false },
      fail: { file: "assets/characters/city_girl/attack_3.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "Kevin texted me. He wants coffee. I need Wasabi. Hurt me so I forget him.",
      hint: "Wasabi on Beef. Make me cry.",
      stack: ["bun_bottom", "beef", "wasabi", "bun_top"],
      success: "It clears the memories.",
      fail: "Not spicy enough."
    }]
  },

  "the_queen": {
    id: "the_queen", name: "Queen Patty", unlockDay: 6, mandatory: true,
    animData: {
      idle: { file: "assets/characters/queen/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/queen/dialogue.png", frames: 7, loop: false },
      fail: { file: "assets/characters/queen/protection.png", frames: 3, loop: false }
    },
    dialogue: [{
      order: "I require a meal of elegance. White cheese for purity. Red fruit for passion. Resting on a bed of poultry. Slices full of life, yet dead.",
      hint: "Chicken, Swiss, and Tomato. Sweet peppers. Do try to keep up, my chef is more competent.",
      stack: ["bun_bottom", "chicken", "swiss_cheese", "tomato", "bell_peppers", "bun_top"],
      success: "Exquisite.",
      fail: "Common muck. Take it away."
    }]
  },

  //———————— DAY 7 ———————————————————————————————————————————————————————————————————————

  "robot": {
    id: "robot", name: "Unit 674", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/robot/idle.png", frames: 5, loop: true },
      success: { file: "assets/characters/robot/enabling.png", frames: 5, loop: false },
      fail: { file: "assets/characters/robot/shutdown.png", frames: 5, loop: false }
    },
    dialogue: [{
      order: "ERROR 404: FUEL DENSITY CRITICAL. REQUIRE COMPRESSED MEAT CYLINDER. REQUIRE BOVINE DISC. REQUIRE CARBONIZED ROOTS. AVOID LIQUID.",
      hint: "BEEF. SAUSAGE. CRISPY ONIONS. NO CONDIMENTS. ACKNOWLEDGE.",
      stack: ["bun_bottom", "beef", "sausage", "fried_onion", "bun_top"],
      success: "SYSTEM OPTIMAL.",
      fail: "MOISTURE DETECTED. SELF-DESTRUCTING IN 3-2-..."
    }]
  },

  "anime_demon": {
    id: "anime_demon", name: "Lord Z", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/demon/idle.png", frames: 8, loop: true },
      success: { file: "assets/characters/demon/idle.png", frames: 8, loop: true },
      fail: { file: "assets/characters/demon/attack.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "FINAL FORM! The bird, the cow, and the unborn! Bind them together with the orange magic and the crumbly rings.",
      hint: "ALL THE PROTEIN! Beef, chicken, egg! Special sauce and fried onions!",
      stack: ["bun_bottom", "beef", "chicken", "fried_egg", "fried_onion", "restaurant_sauce", "bun_top"],
      success: "POWER LEVEL OVER 9000!",
      fail: "Defeated..."
    }]
  },

  "swat": {
    id: "swat", name: "Commander", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/swat/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/swat/recharge.png", frames: 9, loop: false },
      fail: { file: "assets/characters/swat/shot_1.png", frames: 4, loop: false }
    },
    dialogue: [{
      order: "We demand the 'Morning Raid'. Meats. Baby chicken. Patriotic Cheese. Sour slices. Mix red with brown. Execute.",
      hint: "Cannot acknowledge? Cow, pigs, egg, yellow cheese, pickles, BBQ.",
      stack: ["bun_bottom", "beef", "american_cheese", "pickles", "fried_egg", "BBQ_sauce", "Ketchup", "bun_top"],
      success: "Mission accomplished.",
      fail: "You forgot the ammo!"
    }]
  },

  "ghost": {
    id: "ghost", name: "Specter", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/ghost/idle.png", frames: 5, loop: true },
      success: { file: "assets/characters/ghost/idle.png", frames: 5, loop: true },
      fail: { file: "assets/characters/ghost/scream.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "A classic burger without the burger.",
      hint: "Just the toppings! Lettuce, Tomato, Cheddar. No bun!",
      stack: ["lettuce", "tomato", "american_cheese"],
      success: "Almost real...",
      fail: "Too heavy!"
    }]
  },

  "mutant": {
    id: "mutant", name: "Experiment 7", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/mutant/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/mutant/special.png", frames: 14, loop: false },
      fail: { file: "assets/characters/mutant/run+attack.png", frames: 6, loop: false }
    },
    dialogue: [{
      order: "Meat tube pizza... triple cheese...",
      hint: "Three cheeses... Pepperoni... Sauce... ARGH!",
      stack: ["bun_bottom", "american_cheese", "cheddar_cheese", "swiss_cheese", "sausage", "ketchup", "bun_top"],
      success: "*Joyful gurgle*",
      fail: "*Rage scream*"
    }]
  },

  "norman_boss": {
    id: "norman_boss", name: "Norman", unlockDay: 7, mandatory: false,
    animData: {
      idle: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/city_man/idle.png", frames: 6, loop: true },
      fail: { file: "assets/characters/city_man/attack.png", frames: 4, loop: true }
    },
    dialogue: [{
      order: "Hey pal. Last day. Make me your masterpiece. The 'House Special'. Start with the beef, add the sausage, a chicken baby, and drown it in your special sauce. Oh, and all the veggies you got so I can tell my wife I ate a salad.",
      hint: "Beef and sausage. Fried egg. All veggies. The special sauce. Good luck.",
      stack: ["bun_bottom", "beef", "sausage", "fried_egg", "lettuce", "tomato", "red_onion", "mushrooms", "pickles", "restaurant_sauce", "bun_top"],
      success: "Now that is a burger.",
      fail: "You missed a spot."
    }]
  },

  "witch_prophecy": {
    id: "witch_prophecy", name: "Morgana", unlockDay: 7, mandatory: false,
    animData: {
      idle: { file: "assets/characters/witch/idle.png", frames: 6, loop: true },
      success: { file: "assets/characters/witch/special.png", frames: 13, loop: false },
      fail: { file: "assets/characters/witch/attack_1.png", frames: 8, loop: false }
    },
    dialogue: [{
      order: "The stars align! I need the unborn eye resting on a bed of burn roots. Anoint it with your secret potion and a slice of the moon.",
      hint: "Egg, crunchy onions, special sauce, white cheese. Fulfill my prophecy, human!",
      stack: ["bun_bottom", "fried_egg", "bun_top"],
      success: "Prophecy fulfilled!",
      fail: "Doomed!"
    }]
  },

  "elf_king": {
    id: "elf_king", name: "Patriarch", unlockDay: 7, mandatory: true,
    animData: {
      idle: { file: "assets/characters/elf_king/idle.png", frames: 7, loop: true },
      success: { file: "assets/characters/elf_king/dialogue.png", frames: 7, loop: false },
      fail: { file: "assets/characters/elf_king/protection.png", frames: 3, loop: false }
    },
    dialogue: [{
      order: "It has bestowed on me that a rival kingdom had praised your food dungeon. I desire the 'Midnight Feast'. Wagyu meat, dark mushrooms, spicy wasabi, rings of Tanzanite, and the egg of a flightless bird. Bless thee most royal sauce too.",
      hint: "Beef, Mushrooms, Onion, Egg. Green devil and special sauce. Dark flavors.",
      stack: ["bun_bottom", "beef", "bbq", "mushrooms", "wasabi", "fried_egg", "bun_top"],
      success: "You may live another day, mortal.",
      fail: "Kneel before your destruction."
    }]
  }
};

function loadCharacters() {
  // preloads all character sprites
  for (let key in CHARACTERS) {
    let char = CHARACTERS[key];
    
    // Loads assets, creates matching ids for spritesheets
    if (char.animData.idle) characterAssets[char.id + "_idle"] = loadImage(char.animData.idle.file);
    if (char.animData.success) characterAssets[char.id + "_success"] = loadImage(char.animData.success.file);
    if (char.animData.fail) characterAssets[char.id + "_fail"] = loadImage(char.animData.fail.file);
  }
}

function getRandomCustomer(currentDay, isTimeUp) {
  // chooses customer randomly from available list
  
  //stores ALL customers allowed for this day
  let potentialCustomers = [];
  for (let key in CHARACTERS) {
    if (CHARACTERS[key].unlockDay === currentDay) {
      potentialCustomers.push(CHARACTERS[key]);
    }
  }

  //filters out people that were already served to avoid repetition
  let availableCustomers = [];
  for(let i = 0; i < potentialCustomers.length; i++){
    let customer = potentialCustomers[i];
    if(!day.servedCustomers.includes(customer.id)) availableCustomers.push(customer);
  }

  //handles the overtime logic; if the day is up, it filters if any mandatory customers are left
  if(isTimeUp){
    let mandatoryOnly = [];
    for(let j = 0; j < availableCustomers.length; j++){
      if(availableCustomers[j].mandatory === true) mandatoryOnly.push(availableCustomers[j]);
    }
    availableCustomers = mandatoryOnly;
  }

  if (availableCustomers.length === 0) return null;

  // random customer system
  let randomCustomer = floor(random()*availableCustomers.length)
  let chosenCustomer = availableCustomers[randomCustomer];
  let dialogue = chosenCustomer.dialogue[0]; // extracts the dialogue for said customer
  day.servedCustomers.push(chosenCustomer.id); // marks them as already served

  return {
    character: chosenCustomer,
    order: dialogue
  };
}

class Character {
  constructor(data) {
    this.data = data; // character object properties
    
    //———————— POSITIONING ————————
    this.x = width * 0.20;
    this.y = height + 300;
    this.targetY = (height / 2) - 110;
    this.state = "entering"; // entering, idle, waiting, reacting, leaving, hidden

    //———————— ANIMATION ————————
    this.currentAnimation = "idle";
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.reactionTimer = 0;
    this.reactionDuration = 120;

    //———————— PATIENCE ————————
    this.maxPatience = 100;
    this.patience = random(95, 100);
    this.isPatienceActive = false; // New flag: logic switch for decay
    
    let difficultyMult = 1 + (day.currentDay * 0.1);
    let upgradeMult = day.getUpgradeMultiplier("patience_decay");
    this.decayRate = (0.015 * difficultyMult) * upgradeMult;
  }

  startPatience() {
    this.isPatienceActive = true;
    this.state = "waiting";
  }

  reducePatience(amount) {
    // manually lowers patience (e.g. asking for hint)
    this.patience = Math.max(0, this.patience - amount);
  }

  triggerReaction(isSuccess) {
    this.state = "reacting";
    if(isSuccess) this.currentAnimation = "success";
    else this.currentAnimation = "fail";
    this.reactionTimer = 0;
  }

  update() {
    // handles movement and frame updates
    
    // Movement Logic
    if (this.state === "entering") {
      this.y = lerp(this.y, this.targetY, 0.15); // smooth animation
       // changes state to idle while sliding up
      if (abs(this.y - this.targetY) < 1) { 
        this.y = this.targetY; 
        this.state = "idle"; 
      }
    } else if (this.state === "reacting") {
      this.reactionTimer++;
      if (this.reactionTimer > this.reactionDuration) {
        this.state = "leaving";
      }
    } else if (this.state === "leaving") {
      this.y = lerp(this.y, height + 400, 0.15);
      if (this.y > height + 350) {
        this.state = "hidden";
      }
    }

    // Idle frames
    this.frameTimer++;
    if(this.frameTimer > 5){ // value controls how fast the animation is (lower = faster)
      this.frameTimer = 0;
      this.frameIndex++;
      
      // resets loop
      let animationData = this.data.animData[this.currentAnimation];
      if(this.frameIndex >= animationData.frames) this.frameIndex = 0;
    }

    // Patience Decay
    if ((this.state === "idle" || this.state === "waiting") && this.isPatienceActive) {
      this.patience -= this.decayRate;
      
      if (this.patience <= 0) {
        this.patience = 0;
        this.state = "leaving";
        return "left_angry"; 
      }
    }
  }

  display() {
    // draws the current frame from spritesheet
    let assetKey = this.data.id + "_" + this.currentAnimation; //find the loaded image
    let spriteSheet = characterAssets[assetKey];
    
    if (spriteSheet) {
      let animationData = this.data.animData[this.currentAnimation];
      
      //———————— 8 IMAGE PROPERTIES ————————
      // coordinates on canvas
      let destX = this.x;
      let destY = this.y;
      // image scaling on canvas
      let destWidth = 625; 
      let destHeight = 625;
      // coordinates of original for each frame
      let sourceX = this.frameIndex*(spriteSheet.width/animationData.frames);
      let sourceY = 0;
      // dimensions of original frames
      let sourceWidth = spriteSheet.width/animationData.frames;
      let sourceHeight = spriteSheet.height;
      
      //Draws the character
      image(spriteSheet, destX, destY, destWidth, destHeight, sourceX, sourceY, sourceWidth, sourceHeight);
    }
  }
}