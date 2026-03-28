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
  ],
  LKG: [
    { word: "FISH", emoji: "🐟" },
    { word: "BIRD", emoji: "🐦" },
    { word: "FROG", emoji: "🐸" },
    { word: "CAKE", emoji: "🎂" },
    { word: "BIKE", emoji: "🚲" },
    { word: "KITE", emoji: "🪁" },
  ],
  UKG: [
    { word: "ELEPHANT", emoji: "🐘" },
    { word: "RAINBOW", emoji: "🌈" },
    { word: "BALLOON", emoji: "🎈" },
    { word: "BUTTERFLY", emoji: "🦋" },
    { word: "UMBRELLA", emoji: "☂️" },
    { word: "PINEAPPLE", emoji: "🍍" },
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
  ],
};
