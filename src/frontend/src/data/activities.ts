// Activity data for Tracing, Colouring, Word Match, and Spelling Puzzle

export const TRACING_DATA: Record<
  string,
  { letters: string[]; numbers: string[] }
> = {
  Nursery: {
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    numbers: ["1", "2", "3", "4", "5"],
  },
  LKG: {
    letters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
    ],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  UKG: {
    letters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    numbers: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
};

export interface ColourShape {
  id: string;
  label: string;
  defaultColor: string;
}

export interface ColourPage {
  id: string;
  title: string;
  emoji: string;
  shapes: ColourShape[];
}

export const COLOURING_DATA: Record<string, ColourPage[]> = {
  Nursery: [
    {
      id: "sun",
      title: "The Sun",
      emoji: "☀️",
      shapes: [
        { id: "circle", label: "Sun", defaultColor: "#FFD700" },
        { id: "rays", label: "Rays", defaultColor: "#FFA500" },
      ],
    },
    {
      id: "apple",
      title: "An Apple",
      emoji: "🍎",
      shapes: [
        { id: "body", label: "Apple", defaultColor: "#FF4444" },
        { id: "leaf", label: "Leaf", defaultColor: "#22C55E" },
        { id: "stem", label: "Stem", defaultColor: "#92400E" },
      ],
    },
    {
      id: "house",
      title: "A House",
      emoji: "🏠",
      shapes: [
        { id: "walls", label: "Walls", defaultColor: "#FBBF24" },
        { id: "roof", label: "Roof", defaultColor: "#EF4444" },
        { id: "door", label: "Door", defaultColor: "#92400E" },
        { id: "window", label: "Window", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "balloon",
      title: "A Balloon",
      emoji: "🎈",
      shapes: [
        { id: "body", label: "Balloon", defaultColor: "#EF4444" },
        { id: "string", label: "String", defaultColor: "#6B7280" },
        { id: "shine", label: "Shine", defaultColor: "#FCA5A5" },
      ],
    },
    {
      id: "cat",
      title: "A Cat",
      emoji: "🐱",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#F97316" },
        { id: "face", label: "Face", defaultColor: "#FBBF24" },
        { id: "ears", label: "Ears", defaultColor: "#F97316" },
        { id: "eye", label: "Eyes", defaultColor: "#16A34A" },
      ],
    },
    {
      id: "dog",
      title: "A Dog",
      emoji: "🐶",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#D97706" },
        { id: "spots", label: "Spots", defaultColor: "#92400E" },
        { id: "ear", label: "Ears", defaultColor: "#B45309" },
        { id: "eye", label: "Eyes", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "tree",
      title: "A Tree",
      emoji: "🌳",
      shapes: [
        { id: "trunk", label: "Trunk", defaultColor: "#92400E" },
        { id: "leaves", label: "Leaves", defaultColor: "#22C55E" },
        { id: "fruits", label: "Fruits", defaultColor: "#EF4444" },
      ],
    },
    {
      id: "boat",
      title: "A Boat",
      emoji: "⛵",
      shapes: [
        { id: "hull", label: "Hull", defaultColor: "#3B82F6" },
        { id: "sail", label: "Sail", defaultColor: "#F9FAFB" },
        { id: "mast", label: "Mast", defaultColor: "#92400E" },
        { id: "water", label: "Water", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "star",
      title: "A Star",
      emoji: "⭐",
      shapes: [
        { id: "body", label: "Star", defaultColor: "#FBBF24" },
        { id: "shine", label: "Shine", defaultColor: "#FDE68A" },
      ],
    },
    {
      id: "rainbow",
      title: "Rainbow",
      emoji: "🌈",
      shapes: [
        { id: "red", label: "Red Band", defaultColor: "#EF4444" },
        { id: "orange", label: "Orange Band", defaultColor: "#F97316" },
        { id: "yellow", label: "Yellow Band", defaultColor: "#EAB308" },
        { id: "green", label: "Green Band", defaultColor: "#22C55E" },
        { id: "blue", label: "Blue Band", defaultColor: "#3B82F6" },
        { id: "violet", label: "Violet Band", defaultColor: "#8B5CF6" },
      ],
    },
    {
      id: "bird",
      title: "A Bird",
      emoji: "🐦",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#EF4444" },
        { id: "wing", label: "Wing", defaultColor: "#DC2626" },
        { id: "beak", label: "Beak", defaultColor: "#FBBF24" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "flower",
      title: "A Flower",
      emoji: "🌸",
      shapes: [
        { id: "petals", label: "Petals", defaultColor: "#F472B6" },
        { id: "center", label: "Center", defaultColor: "#FBBF24" },
        { id: "stem", label: "Stem", defaultColor: "#22C55E" },
        { id: "leaf", label: "Leaf", defaultColor: "#16A34A" },
      ],
    },
  ],
  LKG: [
    {
      id: "butterfly",
      title: "Butterfly",
      emoji: "🦋",
      shapes: [
        { id: "wings-top", label: "Top Wings", defaultColor: "#A855F7" },
        { id: "wings-bottom", label: "Bottom Wings", defaultColor: "#C084FC" },
        { id: "body", label: "Body", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "fish",
      title: "A Fish",
      emoji: "🐟",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#3B82F6" },
        { id: "tail", label: "Tail", defaultColor: "#60A5FA" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
        { id: "fin", label: "Fin", defaultColor: "#2563EB" },
      ],
    },
    {
      id: "flower",
      title: "A Flower",
      emoji: "🌸",
      shapes: [
        { id: "petals", label: "Petals", defaultColor: "#F472B6" },
        { id: "center", label: "Center", defaultColor: "#FBBF24" },
        { id: "stem", label: "Stem", defaultColor: "#22C55E" },
        { id: "leaf", label: "Leaf", defaultColor: "#16A34A" },
      ],
    },
    {
      id: "elephant-lkg",
      title: "Elephant",
      emoji: "🐘",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#9CA3AF" },
        { id: "trunk", label: "Trunk", defaultColor: "#6B7280" },
        { id: "ear", label: "Ear", defaultColor: "#D1D5DB" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "lion",
      title: "A Lion",
      emoji: "🦁",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#D97706" },
        { id: "mane", label: "Mane", defaultColor: "#B45309" },
        { id: "face", label: "Face", defaultColor: "#FBBF24" },
        { id: "eye", label: "Eyes", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "sun-lkg",
      title: "The Sun",
      emoji: "☀️",
      shapes: [
        { id: "circle", label: "Sun", defaultColor: "#FFD700" },
        { id: "rays", label: "Rays", defaultColor: "#FFA500" },
      ],
    },
    {
      id: "cloud",
      title: "A Cloud",
      emoji: "☁️",
      shapes: [
        { id: "body", label: "Cloud", defaultColor: "#E5E7EB" },
        { id: "shine", label: "Shine", defaultColor: "#F9FAFB" },
      ],
    },
    {
      id: "cake",
      title: "A Cake",
      emoji: "🎂",
      shapes: [
        { id: "base", label: "Base", defaultColor: "#D97706" },
        { id: "frosting", label: "Frosting", defaultColor: "#F9FAFB" },
        { id: "candles", label: "Candles", defaultColor: "#EF4444" },
        { id: "flame", label: "Flame", defaultColor: "#FFA500" },
      ],
    },
    {
      id: "car",
      title: "A Car",
      emoji: "🚗",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#EF4444" },
        { id: "roof", label: "Roof", defaultColor: "#DC2626" },
        { id: "wheel", label: "Wheels", defaultColor: "#1F2937" },
        { id: "window", label: "Windows", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "boat-lkg",
      title: "A Boat",
      emoji: "⛵",
      shapes: [
        { id: "hull", label: "Hull", defaultColor: "#3B82F6" },
        { id: "sail", label: "Sail", defaultColor: "#F9FAFB" },
        { id: "mast", label: "Mast", defaultColor: "#92400E" },
      ],
    },
    {
      id: "frog",
      title: "A Frog",
      emoji: "🐸",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#22C55E" },
        { id: "belly", label: "Belly", defaultColor: "#86EFAC" },
        { id: "eye", label: "Eyes", defaultColor: "#FBBF24" },
        { id: "pupil", label: "Pupils", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "duck",
      title: "A Duck",
      emoji: "🦆",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#FBBF24" },
        { id: "wing", label: "Wing", defaultColor: "#D97706" },
        { id: "beak", label: "Beak", defaultColor: "#F97316" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
      ],
    },
  ],
  UKG: [
    {
      id: "elephant",
      title: "Elephant",
      emoji: "🐘",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#9CA3AF" },
        { id: "trunk", label: "Trunk", defaultColor: "#6B7280" },
        { id: "ear", label: "Ear", defaultColor: "#D1D5DB" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "train",
      title: "A Train",
      emoji: "🚂",
      shapes: [
        { id: "engine", label: "Engine", defaultColor: "#EF4444" },
        { id: "wheels", label: "Wheels", defaultColor: "#1F2937" },
        { id: "chimney", label: "Chimney", defaultColor: "#374151" },
        { id: "window", label: "Window", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "tree",
      title: "A Tree",
      emoji: "🌳",
      shapes: [
        { id: "trunk", label: "Trunk", defaultColor: "#92400E" },
        { id: "leaves", label: "Leaves", defaultColor: "#22C55E" },
        { id: "fruits", label: "Fruits", defaultColor: "#EF4444" },
      ],
    },
    {
      id: "rocket",
      title: "A Rocket",
      emoji: "🚀",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#EF4444" },
        { id: "nose", label: "Nose Cone", defaultColor: "#DC2626" },
        { id: "window", label: "Window", defaultColor: "#60A5FA" },
        { id: "fins", label: "Fins", defaultColor: "#F97316" },
        { id: "flame", label: "Flame", defaultColor: "#FFA500" },
      ],
    },
    {
      id: "castle",
      title: "A Castle",
      emoji: "🏰",
      shapes: [
        { id: "walls", label: "Walls", defaultColor: "#9CA3AF" },
        { id: "towers", label: "Towers", defaultColor: "#6B7280" },
        { id: "flag", label: "Flag", defaultColor: "#EF4444" },
        { id: "door", label: "Door", defaultColor: "#92400E" },
        { id: "window", label: "Windows", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "dinosaur",
      title: "Dinosaur",
      emoji: "🦕",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#22C55E" },
        { id: "spots", label: "Spots", defaultColor: "#16A34A" },
        { id: "neck", label: "Neck", defaultColor: "#4ADE80" },
        { id: "eye", label: "Eye", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "lion-ukg",
      title: "A Lion",
      emoji: "🦁",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#D97706" },
        { id: "mane", label: "Mane", defaultColor: "#B45309" },
        { id: "face", label: "Face", defaultColor: "#FBBF24" },
        { id: "eye", label: "Eyes", defaultColor: "#1F2937" },
      ],
    },
    {
      id: "peacock",
      title: "Peacock",
      emoji: "🦚",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#0891B2" },
        { id: "tail", label: "Tail Feathers", defaultColor: "#22C55E" },
        { id: "spots", label: "Eye Spots", defaultColor: "#8B5CF6" },
        { id: "beak", label: "Beak", defaultColor: "#FBBF24" },
      ],
    },
    {
      id: "rainbow-ukg",
      title: "Rainbow",
      emoji: "🌈",
      shapes: [
        { id: "red", label: "Red Band", defaultColor: "#EF4444" },
        { id: "orange", label: "Orange Band", defaultColor: "#F97316" },
        { id: "yellow", label: "Yellow Band", defaultColor: "#EAB308" },
        { id: "green", label: "Green Band", defaultColor: "#22C55E" },
        { id: "blue", label: "Blue Band", defaultColor: "#3B82F6" },
        { id: "violet", label: "Violet Band", defaultColor: "#8B5CF6" },
      ],
    },
    {
      id: "bus",
      title: "A Bus",
      emoji: "🚌",
      shapes: [
        { id: "body", label: "Body", defaultColor: "#FBBF24" },
        { id: "roof", label: "Roof", defaultColor: "#D97706" },
        { id: "wheel", label: "Wheels", defaultColor: "#1F2937" },
        { id: "window", label: "Windows", defaultColor: "#60A5FA" },
        { id: "door", label: "Door", defaultColor: "#92400E" },
      ],
    },
    {
      id: "ship",
      title: "A Ship",
      emoji: "🚢",
      shapes: [
        { id: "hull", label: "Hull", defaultColor: "#1E40AF" },
        { id: "deck", label: "Deck", defaultColor: "#FBBF24" },
        { id: "chimney", label: "Chimney", defaultColor: "#374151" },
        { id: "water", label: "Water", defaultColor: "#60A5FA" },
      ],
    },
    {
      id: "bicycle",
      title: "Bicycle",
      emoji: "🚲",
      shapes: [
        { id: "frame", label: "Frame", defaultColor: "#EF4444" },
        { id: "wheels", label: "Wheels", defaultColor: "#1F2937" },
        { id: "seat", label: "Seat", defaultColor: "#92400E" },
        { id: "handle", label: "Handlebar", defaultColor: "#6B7280" },
      ],
    },
  ],
};

export interface WordMatchPair {
  word: string;
  emoji: string;
}

export const WORD_MATCH_DATA: Record<string, WordMatchPair[]> = {
  Nursery: [
    { word: "CAT", emoji: "🐱" },
    { word: "DOG", emoji: "🐶" },
    { word: "SUN", emoji: "☀️" },
    { word: "CUP", emoji: "☕" },
    { word: "HAT", emoji: "🎩" },
    { word: "BUS", emoji: "🚌" },
    { word: "HEN", emoji: "🐔" },
    { word: "PIG", emoji: "🐷" },
    { word: "COW", emoji: "🐮" },
    { word: "ANT", emoji: "🐜" },
  ],
  LKG: [
    { word: "FISH", emoji: "🐟" },
    { word: "BIRD", emoji: "🐦" },
    { word: "FROG", emoji: "🐸" },
    { word: "CAKE", emoji: "🎂" },
    { word: "BIKE", emoji: "🚲" },
    { word: "KITE", emoji: "🪁" },
    { word: "DUCK", emoji: "🦆" },
    { word: "LION", emoji: "🦁" },
    { word: "STAR", emoji: "⭐" },
    { word: "TREE", emoji: "🌳" },
  ],
  UKG: [
    { word: "ELEPHANT", emoji: "🐘" },
    { word: "RAINBOW", emoji: "🌈" },
    { word: "BALLOON", emoji: "🎈" },
    { word: "BUTTERFLY", emoji: "🦋" },
    { word: "UMBRELLA", emoji: "☂️" },
    { word: "PINEAPPLE", emoji: "🍍" },
    { word: "GIRAFFE", emoji: "🦒" },
    { word: "PENGUIN", emoji: "🐧" },
    { word: "VOLCANO", emoji: "🌋" },
    { word: "COMPASS", emoji: "🧭" },
  ],
};

export interface SpellingWord {
  word: string;
  emoji: string;
  hint: string;
}

export const SPELLING_DATA: Record<string, SpellingWord[]> = {
  Nursery: [
    { word: "CAT", emoji: "🐱", hint: "A furry pet that says meow" },
    { word: "DOG", emoji: "🐶", hint: "A friendly pet that barks" },
    { word: "SUN", emoji: "☀️", hint: "It shines in the sky" },
    { word: "CUP", emoji: "☕", hint: "You drink from it" },
    { word: "HAT", emoji: "🎩", hint: "You wear it on your head" },
    { word: "BAT", emoji: "🦇", hint: "Flies at night" },
    { word: "MAT", emoji: "🛏️", hint: "You sit or stand on it" },
    { word: "PAN", emoji: "🍳", hint: "Used for cooking" },
    { word: "HEN", emoji: "🐔", hint: "A mother chicken" },
    { word: "PIG", emoji: "🐷", hint: "Pink animal on a farm" },
    { word: "COW", emoji: "🐮", hint: "Gives us milk" },
    { word: "ANT", emoji: "🐜", hint: "Tiny insect" },
  ],
  LKG: [
    { word: "FISH", emoji: "🐟", hint: "Swims in water" },
    { word: "BIRD", emoji: "🐦", hint: "It can fly" },
    { word: "FROG", emoji: "🐸", hint: "Green and jumps" },
    { word: "CAKE", emoji: "🎂", hint: "Sweet and yummy" },
    { word: "BIKE", emoji: "🚲", hint: "Two wheels to ride" },
    { word: "KITE", emoji: "🪁", hint: "Flies in the wind" },
    { word: "LAMP", emoji: "💡", hint: "Gives light" },
    { word: "DUCK", emoji: "🦆", hint: "Quack quack!" },
    { word: "LION", emoji: "🦁", hint: "King of the jungle" },
    { word: "STAR", emoji: "⭐", hint: "Shines at night" },
    { word: "FERN", emoji: "🌿", hint: "A green plant" },
    { word: "DRUM", emoji: "🥁", hint: "You beat it to make music" },
  ],
  UKG: [
    { word: "APPLE", emoji: "🍎", hint: "A red or green fruit" },
    { word: "TIGER", emoji: "🐯", hint: "Big cat with stripes" },
    { word: "GRAPE", emoji: "🍇", hint: "Small purple fruits in a bunch" },
    { word: "CLOUD", emoji: "☁️", hint: "White and fluffy in the sky" },
    { word: "OCEAN", emoji: "🌊", hint: "Very big sea" },
    { word: "SMILE", emoji: "😊", hint: "A happy face" },
    { word: "BREAD", emoji: "🍞", hint: "Baked and eaten for breakfast" },
    { word: "STAMP", emoji: "📬", hint: "Stuck on a letter" },
    { word: "PLANT", emoji: "🌱", hint: "It grows in the soil" },
    { word: "FLAME", emoji: "🔥", hint: "Hot and bright" },
    { word: "GLOBE", emoji: "🌍", hint: "A round map of the earth" },
    { word: "CRANE", emoji: "🏗️", hint: "Tall machine at a building site" },
  ],
};
