export interface Rhyme {
  title: string;
  lyrics: string[];
  emoji: string;
}

export interface PhonicSound {
  upper: string;
  lower: string;
  word: string;
  emoji: string;
}

export interface PhonicStory {
  title: string;
  paragraphs: string[];
  emoji: string;
}

export interface DigraphItem {
  digraph: string;
  words: { word: string; sentence: string; emoji: string }[];
}

export interface CVCGroup {
  vowel: string;
  words: string[];
  color: string;
}

export const RHYMES: Record<string, Rhyme[]> = {
  Nursery: [
    {
      title: "Twinkle Twinkle Little Star",
      emoji: "⭐",
      lyrics: [
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
        "Up above the world so high,",
        "Like a diamond in the sky.",
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
        "",
        "When the blazing sun is gone,",
        "When he nothing shines upon,",
        "Then you show your little light,",
        "Twinkle, twinkle, all the night.",
        "",
        "In the dark blue sky you keep,",
        "And often through my curtains peep,",
        "For you never shut your eye,",
        "Till the sun is in the sky.",
      ],
    },
    {
      title: "Baa Baa Black Sheep",
      emoji: "🐑",
      lyrics: [
        "Baa, baa, black sheep,",
        "Have you any wool?",
        "Yes sir, yes sir,",
        "Three bags full!",
        "",
        "One for the master,",
        "One for the dame,",
        "And one for the little boy",
        "Who lives down the lane.",
      ],
    },
    {
      title: "Jack and Jill",
      emoji: "⛰️",
      lyrics: [
        "Jack and Jill went up the hill",
        "To fetch a pail of water.",
        "Jack fell down and broke his crown,",
        "And Jill came tumbling after.",
        "",
        "Up Jack got and home did trot",
        "As fast as he could caper;",
        "He went to bed to mend his head",
        "With vinegar and brown paper.",
      ],
    },
    {
      title: "Humpty Dumpty",
      emoji: "🥚",
      lyrics: [
        "Humpty Dumpty sat on a wall,",
        "Humpty Dumpty had a great fall.",
        "All the king's horses",
        "And all the king's men",
        "Couldn't put Humpty together again!",
      ],
    },
    {
      title: "Hickory Dickory Dock",
      emoji: "🕐",
      lyrics: [
        "Hickory, dickory, dock,",
        "The mouse ran up the clock.",
        "The clock struck one,",
        "The mouse ran down,",
        "Hickory, dickory, dock!",
        "",
        "Hickory, dickory, dock,",
        "The mouse ran up the clock.",
        "The clock struck two,",
        "The mouse said 'Boo!'",
        "Hickory, dickory, dock!",
      ],
    },
  ],
  LKG: [
    {
      title: "Wheels on the Bus",
      emoji: "🚌",
      lyrics: [
        "The wheels on the bus go round and round,",
        "Round and round, round and round.",
        "The wheels on the bus go round and round,",
        "All through the town!",
        "",
        "The wipers on the bus go swish, swish, swish...",
        "The horn on the bus goes beep, beep, beep...",
        "The driver on the bus says 'Move on back!'",
        "The babies on the bus go wah, wah, wah!",
        "The mummies on the bus go shush, shush, shush!",
      ],
    },
    {
      title: "Old MacDonald Had a Farm",
      emoji: "🐄",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a cow, E-I-E-I-O!",
        "With a moo moo here, and a moo moo there,",
        "Here a moo, there a moo, everywhere a moo moo!",
        "Old MacDonald had a farm, E-I-E-I-O!",
        "",
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a pig, E-I-E-I-O!",
        "With an oink oink here, and an oink oink there,",
        "Here an oink, there an oink, everywhere an oink oink!",
        "Old MacDonald had a farm, E-I-E-I-O!",
      ],
    },
    {
      title: "Incy Wincy Spider",
      emoji: "🕷️",
      lyrics: [
        "Incy wincy spider climbed up the water spout,",
        "Down came the rain and washed the spider out.",
        "Out came the sunshine and dried up all the rain,",
        "So incy wincy spider climbed up the spout again!",
      ],
    },
    {
      title: "Mary Had a Little Lamb",
      emoji: "🐏",
      lyrics: [
        "Mary had a little lamb,",
        "Little lamb, little lamb,",
        "Mary had a little lamb,",
        "Its fleece was white as snow.",
        "",
        "And everywhere that Mary went,",
        "Mary went, Mary went,",
        "Everywhere that Mary went",
        "The lamb was sure to go!",
        "",
        "It followed her to school one day,",
        "School one day, school one day,",
        "It followed her to school one day,",
        "Which was against the rules.",
      ],
    },
    {
      title: "Head Shoulders Knees and Toes",
      emoji: "🙋",
      lyrics: [
        "Head, shoulders, knees and toes, knees and toes!",
        "Head, shoulders, knees and toes, knees and toes!",
        "And eyes and ears and mouth and nose,",
        "Head, shoulders, knees and toes, knees and toes!",
      ],
    },
    {
      title: "Five Little Ducks",
      emoji: "🦆",
      lyrics: [
        "Five little ducks went swimming one day,",
        "Over the hill and far away.",
        "Mother duck said 'Quack quack quack quack'",
        "But only four little ducks came back.",
        "",
        "Four little ducks went swimming one day...",
        "Three little ducks went swimming one day...",
        "Two little ducks went swimming one day...",
        "One little duck went swimming one day...",
        "",
        "No little ducks went swimming one day,",
        "Over the hill and far away.",
        "Sad mother duck said 'Quack quack quack quack'",
        "And all five little ducks came back!",
      ],
    },
  ],
  UKG: [
    {
      title: "If You're Happy and You Know It",
      emoji: "😊",
      lyrics: [
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it,",
        "And you really want to show it,",
        "If you're happy and you know it, clap your hands! 👏",
        "",
        "If you're happy and you know it, stomp your feet! 🦶",
        "If you're happy and you know it, shout 'Hurray!' 🎉",
        "If you're happy and you know it, do all three! 👏🦶🎉",
      ],
    },
    {
      title: "Row Row Row Your Boat",
      emoji: "🚣",
      lyrics: [
        "Row, row, row your boat,",
        "Gently down the stream.",
        "Merrily, merrily, merrily, merrily,",
        "Life is but a dream!",
        "",
        "Row, row, row your boat,",
        "Gently down the stream.",
        "If you see a crocodile,",
        "Don't forget to scream! 😱",
      ],
    },
    {
      title: "Johnny Johnny Yes Papa",
      emoji: "👨‍👦",
      lyrics: [
        "Johnny Johnny!",
        "Yes, Papa!",
        "Eating sugar?",
        "No, Papa!",
        "Telling lies?",
        "No, Papa!",
        "Open your mouth!",
        "Ha ha ha!",
      ],
    },
    {
      title: "ABC Song",
      emoji: "🔤",
      lyrics: [
        "A B C D E F G,",
        "H I J K L M N O P,",
        "Q R S,",
        "T U V,",
        "W X,",
        "Y and Z!",
        "",
        "Now I know my ABCs,",
        "Next time won't you sing with me!",
      ],
    },
    {
      title: "Baby Shark",
      emoji: "🦈",
      lyrics: [
        "Baby shark, doo doo doo doo doo doo!",
        "Baby shark, doo doo doo doo doo doo!",
        "Baby shark!",
        "",
        "Mommy shark, doo doo doo doo doo doo!",
        "Mommy shark!",
        "",
        "Daddy shark, doo doo doo doo doo doo!",
        "Daddy shark!",
        "",
        "Grandma shark, doo doo doo doo doo doo!",
        "Grandpa shark, doo doo doo doo doo doo!",
        "It's the end, doo doo doo doo doo doo!",
      ],
    },
    {
      title: "The Itsy Bitsy Spider",
      emoji: "🕸️",
      lyrics: [
        "The itsy bitsy spider climbed up the water spout,",
        "Down came the rain and washed the spider out.",
        "Out came the sun and dried up all the rain,",
        "And the itsy bitsy spider climbed up the spout again!",
        "",
        "The big fat spider climbed up the water spout,",
        "Down came the thunder and really scared him out.",
        "Out came the sunshine and dried up all the rain,",
        "And the big fat spider climbed up the spout again!",
        "",
        "The teeny tiny spider climbed up the water spout,",
        "Down came the drizzle and washed the spider out.",
        "Out came the rainbow and dried up all the rain,",
        "And the teeny tiny spider climbed up the spout again!",
      ],
    },
  ],
};

export const PHONIC_SOUNDS: Record<string, PhonicSound[]> = {
  Nursery: [
    { upper: "A", lower: "a", word: "Apple", emoji: "🍎" },
    { upper: "B", lower: "b", word: "Ball", emoji: "⚽" },
    { upper: "C", lower: "c", word: "Cat", emoji: "🐱" },
    { upper: "D", lower: "d", word: "Dog", emoji: "🐶" },
    { upper: "E", lower: "e", word: "Elephant", emoji: "🐘" },
    { upper: "F", lower: "f", word: "Fish", emoji: "🐟" },
    { upper: "G", lower: "g", word: "Goat", emoji: "🐐" },
    { upper: "H", lower: "h", word: "Hat", emoji: "🎩" },
  ],
  LKG: [
    { upper: "I", lower: "i", word: "Igloo", emoji: "🏔️" },
    { upper: "J", lower: "j", word: "Jar", emoji: "🫙" },
    { upper: "K", lower: "k", word: "Kite", emoji: "🪁" },
    { upper: "L", lower: "l", word: "Lion", emoji: "🦁" },
    { upper: "M", lower: "m", word: "Moon", emoji: "🌙" },
    { upper: "N", lower: "n", word: "Nest", emoji: "🪺" },
    { upper: "O", lower: "o", word: "Orange", emoji: "🍊" },
    { upper: "P", lower: "p", word: "Pen", emoji: "🖊️" },
  ],
  UKG: [
    { upper: "Q", lower: "q", word: "Queen", emoji: "👑" },
    { upper: "R", lower: "r", word: "Rain", emoji: "🌧️" },
    { upper: "S", lower: "s", word: "Sun", emoji: "☀️" },
    { upper: "T", lower: "t", word: "Tiger", emoji: "🐯" },
    { upper: "U", lower: "u", word: "Umbrella", emoji: "☂️" },
    { upper: "V", lower: "v", word: "Van", emoji: "🚐" },
    { upper: "W", lower: "w", word: "Water", emoji: "💧" },
    { upper: "X", lower: "x", word: "X-Ray", emoji: "🩻" },
    { upper: "Y", lower: "y", word: "Yellow", emoji: "🌻" },
    { upper: "Z", lower: "z", word: "Zebra", emoji: "🦓" },
  ],
};

export const PHONIC_STORIES: Record<string, PhonicStory[]> = {
  Nursery: [
    {
      title: "Sam the Cat",
      emoji: "🐱",
      paragraphs: [
        "Sam is a fat cat. Sam sat on a mat. Sam has a hat.",
        "Sam can bat. Sam likes to sit and nap on the mat.",
        "Sam sees a rat. The rat ran fast. Sam ran after the rat!",
        "Sam is a good cat. Sam is happy on the mat.",
      ],
    },
    {
      title: "The Big Red Hen",
      emoji: "🐔",
      paragraphs: [
        "The hen is red. The hen is big. The hen can peck.",
        "The hen has an egg. The egg is in the nest.",
        "The big red hen sits on the egg. She is warm and cozy.",
        "The egg cracks open. Out comes a tiny chick! The hen is happy.",
      ],
    },
  ],
  LKG: [
    {
      title: "Dan and the Dog",
      emoji: "🐕",
      paragraphs: [
        "Dan has a dog. The dog is tan. The dog's name is Rex.",
        "Dan and the dog run. They run in the sun. It is fun!",
        "Rex can sit. Rex can beg. Rex can fetch a big red ball.",
        "Dan is happy. The dog is happy too. They are best friends!",
      ],
    },
    {
      title: "Kim and the Kite",
      emoji: "🪁",
      paragraphs: [
        "Kim has a kite. The kite is pink. Kim loves her kite.",
        "Kim runs fast. The kite goes up. Up, up, up it goes!",
        "The kite is high in the sky. It flies near the clouds.",
        "The wind blows the kite down. Kim catches it. Kim smiles!",
      ],
    },
  ],
  UKG: [
    {
      title: "The Ship and the Fish",
      emoji: "🚢",
      paragraphs: [
        "A ship is on the sea. The sea is blue and wide. The ship sails fast.",
        "A fish swims near the ship. The fish is silver and shiny.",
        "The fish has a wish. The fish wishes to see the big ship up close.",
        "The ship sails away into the sunset. The fish waves its fin. Goodbye, ship!",
      ],
    },
    {
      title: "Chuck the Chick",
      emoji: "🐤",
      paragraphs: [
        "Chuck is a little chick. Chuck lives on a farm with his family.",
        "Chuck cheeps and chirps all day. Chuck loves to chase bugs in the grass.",
        "One day Chuck finds a big bug. He chases it around the chicken coop!",
        "Chuck catches the bug! Chuck is a champion chick. All the hens cheer for Chuck!",
      ],
    },
  ],
};

export const DIGRAPHS: Record<string, DigraphItem[]> = {
  Nursery: [
    {
      digraph: "ch",
      words: [
        { word: "chair", sentence: "I sit on a chair.", emoji: "🪑" },
        { word: "cheese", sentence: "I love to eat cheese.", emoji: "🧀" },
        { word: "chicken", sentence: "The chicken lays eggs.", emoji: "🐔" },
        { word: "cherry", sentence: "A cherry is red and sweet.", emoji: "🍒" },
        { word: "chocolate", sentence: "Chocolate is yummy!", emoji: "🍫" },
      ],
    },
    {
      digraph: "sh",
      words: [
        { word: "shoe", sentence: "I wear a shoe on my foot.", emoji: "👟" },
        { word: "ship", sentence: "A ship sails on the sea.", emoji: "🚢" },
        { word: "sheep", sentence: "The sheep has soft wool.", emoji: "🐑" },
        {
          word: "shell",
          sentence: "I found a shell on the beach.",
          emoji: "🐚",
        },
        { word: "shark", sentence: "A shark swims in the ocean.", emoji: "🦈" },
      ],
    },
  ],
  LKG: [
    {
      digraph: "th",
      words: [
        { word: "thumb", sentence: "I have a thumb on my hand.", emoji: "👍" },
        { word: "three", sentence: "I can count to three.", emoji: "3️⃣" },
        { word: "throne", sentence: "The king sits on a throne.", emoji: "🪑" },
        { word: "thunder", sentence: "Thunder is loud!", emoji: "⛈️" },
        { word: "thirteen", sentence: "Thirteen is 10 plus 3.", emoji: "🔢" },
      ],
    },
    {
      digraph: "wh",
      words: [
        {
          word: "wheel",
          sentence: "The wheel goes round and round.",
          emoji: "🎡",
        },
        { word: "whale", sentence: "A whale lives in the ocean.", emoji: "🐋" },
        {
          word: "whistle",
          sentence: "The whistle makes a loud sound.",
          emoji: "📯",
        },
        { word: "white", sentence: "Snow is white and cold.", emoji: "❄️" },
        { word: "wheat", sentence: "Bread is made from wheat.", emoji: "🌾" },
      ],
    },
  ],
  UKG: [
    {
      digraph: "ch",
      words: [
        { word: "chair", sentence: "I sit on a chair.", emoji: "🪑" },
        { word: "cheese", sentence: "I love to eat cheese.", emoji: "🧀" },
        { word: "chicken", sentence: "The chicken lays eggs.", emoji: "🐔" },
        { word: "cherry", sentence: "A cherry is red and sweet.", emoji: "🍒" },
        { word: "chocolate", sentence: "Chocolate is yummy!", emoji: "🍫" },
      ],
    },
    {
      digraph: "sh",
      words: [
        { word: "shoe", sentence: "I wear a shoe on my foot.", emoji: "👟" },
        { word: "ship", sentence: "A ship sails on the sea.", emoji: "🚢" },
        { word: "sheep", sentence: "The sheep has soft wool.", emoji: "🐑" },
        {
          word: "shell",
          sentence: "I found a shell on the beach.",
          emoji: "🐚",
        },
        { word: "shark", sentence: "A shark swims in the ocean.", emoji: "🦈" },
      ],
    },
    {
      digraph: "th",
      words: [
        { word: "thumb", sentence: "I have a thumb on my hand.", emoji: "👍" },
        { word: "three", sentence: "I can count to three.", emoji: "3️⃣" },
        { word: "throne", sentence: "The king sits on a throne.", emoji: "🪑" },
        { word: "thunder", sentence: "Thunder is loud!", emoji: "⛈️" },
        { word: "thirteen", sentence: "Thirteen is 10 plus 3.", emoji: "🔢" },
      ],
    },
    {
      digraph: "wh",
      words: [
        {
          word: "wheel",
          sentence: "The wheel goes round and round.",
          emoji: "🎡",
        },
        { word: "whale", sentence: "A whale lives in the ocean.", emoji: "🐋" },
        {
          word: "whistle",
          sentence: "The whistle makes a loud sound.",
          emoji: "📯",
        },
        { word: "white", sentence: "Snow is white and cold.", emoji: "❄️" },
        { word: "wheat", sentence: "Bread is made from wheat.", emoji: "🌾" },
      ],
    },
    {
      digraph: "ph",
      words: [
        { word: "phone", sentence: "I talk on the phone.", emoji: "📱" },
        {
          word: "photo",
          sentence: "I take a photo with my camera.",
          emoji: "📸",
        },
        {
          word: "pharmacy",
          sentence: "We get medicine from the pharmacy.",
          emoji: "💊",
        },
        { word: "phrase", sentence: "A phrase has a few words.", emoji: "💬" },
        {
          word: "phantom",
          sentence: "A phantom is like a ghost.",
          emoji: "👻",
        },
      ],
    },
  ],
};

export const CVC_WORDS: Record<string, CVCGroup[]> = {
  Nursery: [
    {
      vowel: "a",
      words: ["cat", "bat", "hat", "mat", "rat", "sat", "pat"],
      color: "#E53E3E",
    },
    {
      vowel: "i",
      words: ["big", "dig", "fig", "jig", "pig", "wig"],
      color: "#D69E2E",
    },
    {
      vowel: "o",
      words: ["hot", "dot", "pot", "lot", "rot", "cot"],
      color: "#38A169",
    },
  ],
  LKG: [
    {
      vowel: "e",
      words: ["bed", "fed", "led", "red", "wed", "ted"],
      color: "#3182CE",
    },
    {
      vowel: "u",
      words: ["bug", "dug", "hug", "mug", "pug", "rug"],
      color: "#805AD5",
    },
    {
      vowel: "i",
      words: ["bin", "fin", "pin", "tin", "win", "din"],
      color: "#DD6B20",
    },
  ],
  UKG: [
    {
      vowel: "a",
      words: ["clap", "flag", "snag", "trap", "clam", "plan"],
      color: "#E53E3E",
    },
    {
      vowel: "o",
      words: ["frog", "blot", "drop", "crop", "stop", "prop"],
      color: "#38A169",
    },
    {
      vowel: "u",
      words: ["drum", "plug", "slug", "trim", "trip", "slim"],
      color: "#805AD5",
    },
  ],
};
