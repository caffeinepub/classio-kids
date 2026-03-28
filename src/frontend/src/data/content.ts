export interface Rhyme {
  title: string;
  lyrics: string[];
  emoji: string;
  videoId?: string;
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
  videoId?: string;
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
      videoId: "yCjJyiqpAuU",
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
      ],
    },
    {
      title: "Baa Baa Black Sheep",
      emoji: "🐑",
      videoId: "NNqAH5hH9bM",
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
      videoId: "8xIjMDPyOlU",
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
      videoId: "M5MF_I6mBT4",
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
      videoId: "VIiFMPB420A",
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
    {
      title: "Mary Had a Little Lamb",
      emoji: "🐏",
      videoId: "b7wvFAksBbA",
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
      ],
    },
    {
      title: "Old MacDonald Had a Farm",
      emoji: "🐄",
      videoId: "5OBZcZpSZqI",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a cow, E-I-E-I-O!",
        "With a moo moo here, and a moo moo there,",
        "Here a moo, there a moo, everywhere a moo moo!",
        "Old MacDonald had a farm, E-I-E-I-O!",
      ],
    },
    {
      title: "Wheels on the Bus",
      emoji: "🚌",
      videoId: "e_04ZrNroTo",
      lyrics: [
        "The wheels on the bus go round and round,",
        "Round and round, round and round.",
        "The wheels on the bus go round and round,",
        "All through the town!",
        "",
        "The wipers on the bus go swish, swish, swish...",
        "The horn on the bus goes beep, beep, beep...",
        "The babies on the bus go wah, wah, wah!",
      ],
    },
    {
      title: "Itsy Bitsy Spider",
      emoji: "🕷️",
      videoId: "l4WNrvVjiTw",
      lyrics: [
        "The itsy bitsy spider climbed up the water spout,",
        "Down came the rain and washed the spider out.",
        "Out came the sun and dried up all the rain,",
        "And the itsy bitsy spider climbed up the spout again!",
      ],
    },
    {
      title: "Row Row Row Your Boat",
      emoji: "🚣",
      videoId: "7oIOBBM_qD0",
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
      title: "Rain Rain Go Away",
      emoji: "🌧️",
      videoId: "v8aBOzsFqGk",
      lyrics: [
        "Rain, rain, go away,",
        "Come again another day.",
        "Little children want to play,",
        "Rain, rain, go away!",
        "",
        "Rain, rain, go to Spain,",
        "Never show your face again!",
      ],
    },
  ],
  LKG: [
    {
      title: "Old MacDonald Had a Farm",
      emoji: "🐄",
      videoId: "5OBZcZpSZqI",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a cow, E-I-E-I-O!",
        "With a moo moo here, and a moo moo there,",
        "Here a moo, there a moo, everywhere a moo moo!",
        "Old MacDonald had a farm, E-I-E-I-O!",
        "",
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a pig, E-I-E-I-O!",
        "With an oink oink here, and an oink oink there!",
        "Old MacDonald had a farm, E-I-E-I-O!",
      ],
    },
    {
      title: "Wheels on the Bus",
      emoji: "🚌",
      videoId: "e_04ZrNroTo",
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
      title: "Itsy Bitsy Spider",
      emoji: "🕷️",
      videoId: "l4WNrvVjiTw",
      lyrics: [
        "Incy wincy spider climbed up the water spout,",
        "Down came the rain and washed the spider out.",
        "Out came the sunshine and dried up all the rain,",
        "So incy wincy spider climbed up the spout again!",
      ],
    },
    {
      title: "If You're Happy and You Know It",
      emoji: "😊",
      videoId: "71hqRT9U0wg",
      lyrics: [
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it,",
        "And you really want to show it,",
        "If you're happy and you know it, clap your hands! 👏",
        "",
        "If you're happy and you know it, stomp your feet! 🦶",
        "If you're happy and you know it, shout 'Hurray!' 🎉",
      ],
    },
    {
      title: "Head Shoulders Knees and Toes",
      emoji: "🙋",
      videoId: "h4eueDYPTIg",
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
      videoId: "WqiYvBogJgI",
      lyrics: [
        "Five little ducks went swimming one day,",
        "Over the hill and far away.",
        "Mother duck said 'Quack quack quack quack'",
        "But only four little ducks came back.",
        "",
        "Four little ducks went swimming one day...",
        "Three little ducks went swimming one day...",
        "No little ducks went swimming one day...",
        "Sad mother duck said 'Quack quack quack quack'",
        "And all five little ducks came back!",
      ],
    },
    {
      title: "ABC Song",
      emoji: "🔤",
      videoId: "75p-N9YKqNo",
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
      title: "London Bridge is Falling Down",
      emoji: "🌉",
      videoId: "HhmnOQSQ9Cc",
      lyrics: [
        "London Bridge is falling down,",
        "Falling down, falling down.",
        "London Bridge is falling down,",
        "My fair lady!",
        "",
        "Build it up with iron bars,",
        "Iron bars, iron bars.",
        "Build it up with iron bars,",
        "My fair lady!",
      ],
    },
    {
      title: "Ring Around the Rosie",
      emoji: "💐",
      videoId: "y8qWzPEJjng",
      lyrics: [
        "Ring-a-ring o' roses,",
        "A pocket full of posies,",
        "A-tishoo! A-tishoo!",
        "We all fall down!",
        "",
        "The cows are in the meadow,",
        "Eating buttercups,",
        "A-tishoo! A-tishoo!",
        "We all jump up!",
      ],
    },
    {
      title: "Row Row Row Your Boat",
      emoji: "🚣",
      videoId: "7oIOBBM_qD0",
      lyrics: [
        "Row, row, row your boat,",
        "Gently down the stream.",
        "Merrily, merrily, merrily, merrily,",
        "Life is but a dream!",
      ],
    },
    {
      title: "Rain Rain Go Away",
      emoji: "🌧️",
      videoId: "v8aBOzsFqGk",
      lyrics: [
        "Rain, rain, go away,",
        "Come again another day.",
        "Little children want to play,",
        "Rain, rain, go away!",
      ],
    },
  ],
  UKG: [
    {
      title: "ABC Song",
      emoji: "🔤",
      videoId: "75p-N9YKqNo",
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
      title: "Head Shoulders Knees and Toes",
      emoji: "🙋",
      videoId: "h4eueDYPTIg",
      lyrics: [
        "Head, shoulders, knees and toes, knees and toes!",
        "Head, shoulders, knees and toes, knees and toes!",
        "And eyes and ears and mouth and nose,",
        "Head, shoulders, knees and toes, knees and toes!",
      ],
    },
    {
      title: "If You're Happy and You Know It",
      emoji: "😊",
      videoId: "71hqRT9U0wg",
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
      title: "Five Little Ducks",
      emoji: "🦆",
      videoId: "WqiYvBogJgI",
      lyrics: [
        "Five little ducks went swimming one day,",
        "Over the hill and far away.",
        "Mother duck said 'Quack quack quack quack'",
        "But only four little ducks came back.",
        "",
        "No little ducks went swimming one day,",
        "Sad mother duck said 'Quack quack quack quack'",
        "And all five little ducks came back!",
      ],
    },
    {
      title: "London Bridge is Falling Down",
      emoji: "🌉",
      videoId: "HhmnOQSQ9Cc",
      lyrics: [
        "London Bridge is falling down,",
        "Falling down, falling down.",
        "London Bridge is falling down,",
        "My fair lady!",
        "",
        "Build it up with iron bars,",
        "Iron bars, iron bars.",
        "My fair lady!",
      ],
    },
    {
      title: "Ring Around the Rosie",
      emoji: "💐",
      videoId: "y8qWzPEJjng",
      lyrics: [
        "Ring-a-ring o' roses,",
        "A pocket full of posies,",
        "A-tishoo! A-tishoo!",
        "We all fall down!",
      ],
    },
    {
      title: "Wheels on the Bus",
      emoji: "🚌",
      videoId: "e_04ZrNroTo",
      lyrics: [
        "The wheels on the bus go round and round,",
        "Round and round, round and round.",
        "The wheels on the bus go round and round,",
        "All through the town!",
      ],
    },
    {
      title: "Old MacDonald Had a Farm",
      emoji: "🐄",
      videoId: "5OBZcZpSZqI",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O!",
        "And on his farm he had a duck, E-I-E-I-O!",
        "With a quack quack here, and a quack quack there!",
        "Old MacDonald had a farm, E-I-E-I-O!",
      ],
    },
    {
      title: "Twinkle Twinkle Little Star",
      emoji: "⭐",
      videoId: "yCjJyiqpAuU",
      lyrics: [
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
        "Up above the world so high,",
        "Like a diamond in the sky.",
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
      ],
    },
    {
      title: "Mary Had a Little Lamb",
      emoji: "🐏",
      videoId: "b7wvFAksBbA",
      lyrics: [
        "Mary had a little lamb,",
        "Little lamb, little lamb,",
        "Mary had a little lamb,",
        "Its fleece was white as snow.",
        "",
        "And everywhere that Mary went,",
        "The lamb was sure to go!",
      ],
    },
    {
      title: "Jack and Jill",
      emoji: "⛰️",
      videoId: "8xIjMDPyOlU",
      lyrics: [
        "Jack and Jill went up the hill",
        "To fetch a pail of water.",
        "Jack fell down and broke his crown,",
        "And Jill came tumbling after.",
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
    { upper: "M", lower: "m", word: "Monkey", emoji: "🐒" },
    { upper: "N", lower: "n", word: "Nest", emoji: "🪺" },
    { upper: "O", lower: "o", word: "Orange", emoji: "🍊" },
    { upper: "P", lower: "p", word: "Parrot", emoji: "🦜" },
  ],
  UKG: [
    { upper: "Q", lower: "q", word: "Queen", emoji: "👸" },
    { upper: "R", lower: "r", word: "Rabbit", emoji: "🐰" },
    { upper: "S", lower: "s", word: "Snake", emoji: "🐍" },
    { upper: "T", lower: "t", word: "Tiger", emoji: "🐯" },
    { upper: "U", lower: "u", word: "Umbrella", emoji: "☂️" },
    { upper: "V", lower: "v", word: "Violin", emoji: "🎻" },
    { upper: "W", lower: "w", word: "Whale", emoji: "🐋" },
    { upper: "X", lower: "x", word: "Xylophone", emoji: "🎵" },
    { upper: "Y", lower: "y", word: "Yak", emoji: "🐂" },
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
    {
      title: "Pip the Pup",
      emoji: "🐶",
      paragraphs: [
        "Pip is a pup. Pip is tan. Pip can run and jump.",
        "Pip has a red ball. The ball is big. Pip hits the ball.",
        "The ball rolls in the mud. Pip gets the ball back.",
        "Pip is a happy pup. Pip wags his tail.",
      ],
    },
    {
      title: "The Hot Sun",
      emoji: "☀️",
      paragraphs: [
        "The sun is hot. The sun is up in the sky. It is a big sun.",
        "Tim sits in the sun. Tim has a hat. The hat is on Tim's head.",
        "Tim sips his cup. The cup has cold water. Yum!",
        "The sun sets. Tim goes in. It was a fun day!",
      ],
    },
    {
      title: "Nan and the Pan",
      emoji: "🍳",
      paragraphs: [
        "Nan has a pan. The pan is big. Nan puts it on the top.",
        "Nan cooks eggs. The eggs go in the pan. Sizzle, sizzle!",
        "The eggs are hot. Nan fans the pan. She hums a song.",
        "Nan puts the eggs on a mat. It is yummy! Nan is glad.",
      ],
    },
    {
      title: "Ben the Hen",
      emoji: "🐣",
      paragraphs: [
        "Ben the hen sits in a pen. Ben can peck and cluck.",
        "Ben sees a wet net by the pen. Ben runs to the net.",
        "Ben pecks the net. The net is not fun. Ben runs back.",
        "Ben is back in the pen. Ben is the best hen!",
      ],
    },
    {
      title: "The Big Jug",
      emoji: "🏺",
      paragraphs: [
        "Mum has a big jug. The jug has water. The water is cold.",
        "Bub is hot. Bub asks for water. Mum pours it in a cup.",
        "Bub sips the cold water. Bub feels good now.",
        "Bub hugs Mum. Mum is glad. It was a hot but fun day!",
      ],
    },
    {
      title: "The Wet Dog",
      emoji: "🐕",
      paragraphs: [
        "Dot is a dog. Dot runs in the rain. Dot gets wet.",
        "Dot runs to the hut. Dot shakes and shakes.",
        "Mum gets a rag. Mum rubs Dot dry. Dot is warm now.",
        "Dot wags her tail. Dot licks Mum. Mum laughs!",
      ],
    },
    {
      title: "Fix the Box",
      emoji: "📦",
      paragraphs: [
        "Max has a box. The box is big and red.",
        "The lid on the box is broken. Max can fix it.",
        "Max gets a stick and some glue. He puts the lid back.",
        "The box is fixed! Max puts his toys in the box. Max is happy.",
      ],
    },
    {
      title: "Fog on the Hill",
      emoji: "🌫️",
      paragraphs: [
        "It is a foggy day. There is fog on the big hill.",
        "Tom and Kim go up the hill. They cannot see far.",
        "They sit and wait. The fog goes away bit by bit.",
        "Now they can see the sun! Tom and Kim clap and cheer!",
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
    {
      title: "Skip and the Ship",
      emoji: "🚢",
      paragraphs: [
        "Skip is a boy who lives by the sea. He loves ships.",
        "One day a big ship came near the dock.",
        "Skip waved at the ship. A man on the ship waved back.",
        "Skip said, 'One day I will sail on a big ship!' And he smiled.",
      ],
    },
    {
      title: "The Frog in the Pond",
      emoji: "🐸",
      paragraphs: [
        "Fred is a fat frog. Fred lives in a pond.",
        "Fred jumps from a log into the pond. Splash!",
        "Fred swims fast. Fred sees a fly. Fred snaps it up.",
        "Fred is full. Fred rests on the log. Fred is happy!",
      ],
    },
    {
      title: "The Drip in the Hut",
      emoji: "🏚️",
      paragraphs: [
        "It rains hard. Drip, drip, drip goes the rain on the hut.",
        "Grub the bug hides under a leaf. He is snug and dry.",
        "Slam the snail pulls into his shell. He hums a song.",
        "When the rain stops, Grub and Slam come out to play.",
      ],
    },
    {
      title: "Glen the Glen",
      emoji: "🌿",
      paragraphs: [
        "Glen is a green glen. Lots of plants grow in Glen.",
        "A bluebird lands on a branch. It sings a sweet song.",
        "A brown rabbit hops through the grass.",
        "Glen is a wonderful, quiet place. Everyone loves Glen!",
      ],
    },
    {
      title: "Spot the Dot",
      emoji: "🔴",
      paragraphs: [
        "Spot had big red dots all over her. She was a dot bug.",
        "Spot loved to hop from spot to spot on the log.",
        "One day, Spot hopped too far and fell in the mud.",
        "Spot's dots were muddy. Spot washed them in the pond. Good as new!",
      ],
    },
    {
      title: "The Bell in the Well",
      emoji: "🔔",
      paragraphs: [
        "Near the hill was a well. At the bottom of the well was a bell.",
        "Nell the elf heard the bell ring. Ding dong!",
        "Nell looked into the well. She saw the bell swing.",
        "Nell sang along with the bell. Ding dong! Sing along!",
      ],
    },
    {
      title: "The Crab and the Cab",
      emoji: "🦀",
      paragraphs: [
        "A crab called Crab lived in a rock pool.",
        "One day Crab saw a yellow cab drive by the beach.",
        "Crab grabbed a leaf and waved it like a flag.",
        "The cab stopped! The driver laughed and waved. Crab was thrilled!",
      ],
    },
    {
      title: "Brick the Truck",
      emoji: "🚚",
      paragraphs: [
        "Brick was a big red truck. Brick carried bricks.",
        "Every day Brick drove up the track to the hill.",
        "Brick dropped the bricks at the top with a big CRASH!",
        "The workers used the bricks to build a strong wall. Brick was proud!",
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
    {
      title: "The Whale and the Snail",
      emoji: "🐋",
      paragraphs: [
        "A whale named Walt swam through the deep blue sea.",
        "Walt saw a snail on a stone. The snail was moving very slowly.",
        "'Hello, little snail! Where are you going?' asked Walt.",
        "'To the other side of the stone,' said the snail. 'It will take all day!' Walt laughed kindly.",
      ],
    },
    {
      title: "The Throne Room",
      emoji: "👑",
      paragraphs: [
        "There was a young prince who wanted to see the throne room.",
        "He crept through three thick curtains. The throne was gold and grand!",
        "He thought the throne looked very grand. He sat on it for a moment.",
        "'One day,' he thought, 'I will be king.' He smiled and tiptoed back out.",
      ],
    },
    {
      title: "Flash the Fox",
      emoji: "🦊",
      paragraphs: [
        "Flash was a quick fox who lived in a forest.",
        "Flash could leap over branches and dash through the thickets.",
        "One night Flash heard a shriek from the farm nearby.",
        "Flash raced to help and found a lamb stuck in the fence. Flash freed it. Everyone cheered!",
      ],
    },
    {
      title: "The Cloud Castle",
      emoji: "☁️",
      paragraphs: [
        "High above the hills there was a castle made of clouds.",
        "Clover the cloud fairy lived there with her pet cloud rabbit.",
        "Every morning Clover shaped the clouds into animals and flowers.",
        "People below would point and say, 'Look! A cloud dragon! A cloud elephant!' Clover smiled.",
      ],
    },
    {
      title: "The Strong Bridge",
      emoji: "🌉",
      paragraphs: [
        "The old bridge over the stream was cracked and broken.",
        "All the animals crossed carefully. But one day a huge trunk fell on it!",
        "All the animals worked together to build a brand new bridge.",
        "Elephants dragged logs, birds brought vines, frogs smoothed the mud. The bridge was strong!",
      ],
    },
    {
      title: "Gracie's Garden",
      emoji: "🌻",
      paragraphs: [
        "Gracie planted seeds in her garden every spring.",
        "She planted sunflowers, roses, and bright green grass.",
        "She watered them every day and pulled out the weeds.",
        "By summer, Gracie's garden was the most beautiful in the street. Butterflies danced around!",
      ],
    },
    {
      title: "The Dragon's Drum",
      emoji: "🥁",
      paragraphs: [
        "A dragon named Drum loved to bang his big red drum.",
        "BOOM BOOM BOOM he would drum every morning.",
        "All the creatures in the valley would wake up and dance!",
        "Drum was happy to start every day with music and dancing.",
      ],
    },
    {
      title: "Nina and the Night Stars",
      emoji: "🌟",
      paragraphs: [
        "Nina could not sleep. She went to her window and looked up.",
        "The sky was full of bright, shining stars.",
        "Nina counted them — one, two, three... she lost count at twenty.",
        "Nina smiled, snuggled back into bed, and dreamed of flying among the stars.",
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
