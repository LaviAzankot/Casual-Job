import sitter from "./icons/sitter.png";
import dog_walker from "./icons/dog-walker.png";
import programmer from "./icons/programmer.png";
import math from "./icons/math.png";
import english from "./icons/english.png";
import scientist from "./icons/scientist.png";
import guitar from "./icons/guitar.png";
import piano from "./icons/piano.png";
import gardener from "./icons/gardener.png";
import editor from "./icons/editor.png";
import baker from "./icons/baker.png";
import cook from "./icons/cooking.png";
import profile from "./icons/profile.png";
import logo from "./icons/logo.png";
import next from "./icons/next.png";
import back from "./icons/back.png";
import cancel from "./icons/cancel.png";

import english_job from "./jobs/english_job.jpg";
import sitter_job from "./jobs/sitter_job.jpg";
import baker_job from "./jobs/baker_job.png";
import dog_walker_job from "./jobs/dog_walker_job.jpg";
import editor_job from "./jobs/editor_job.png";
import science_job from "./jobs/science_job.png";
import gardener_job from "./jobs/gardener_job.jpeg";
import hacker_job from "./jobs/hacker_job.jpg";
import guitar_job from "./jobs/guitar_job.jpg";
import cook_job from "./jobs/cook_job.jpg";
import piano_job from "./jobs/piano_job.jpg";

import transparent_heart from "./icons/transparent-heart.png";
import red_heart from "./icons/red-heart.png";
import checked from "./icons/checked.png";

import user1 from "./users/user1.png";
import user2 from "./users/user2.png";

import first_aid_kit from "./icons/first_aid_kit.png";
import childcare from "./icons/childcare.png";
import chat from "./icons/chat.png";

import cross_icon from "./icons/cross_icon.png";
import exclamation_mark from "./icons/exclamation_mark.png";
import remove from "./icons/remove.png";
import update from "./icons/update.png";
import picture from "./icons/picture.png";
import cloudy from "./icons/cloudy.png";

const assets = {
  logo,
  profile,
  next,
  back,
  transparent_heart,
  red_heart,
  first_aid_kit,
  childcare,
  chat,
  cancel,
  cross_icon,
  exclamation_mark,
  remove,
  update,
  picture,
  user1,
  cloudy,
};

const jobCategories = [
  {
    name: "Sitter",
    image: sitter,
  },
  {
    name: "Dog Walker",
    image: dog_walker,
  },
  {
    name: "Programming Tutor",
    image: programmer,
  },
  {
    name: "Math Tutor",
    image: math,
  },
  {
    name: "English Tutor",
    image: english,
  },
  {
    name: "Science Tutor",
    image: scientist,
  },
  {
    name: "Guitar Teacher",
    image: guitar,
  },
  {
    name: "Piano Teacher",
    image: piano,
  },
  {
    name: "Garden Pruning",
    image: gardener,
  },
  {
    name: "Editors",
    image: editor,
  },
  {
    name: "Bakers",
    image: baker,
  },
  {
    name: "Cooks",
    image: cook,
  },
  {
    name: "Other",
    image: checked,
  },
];

const users = [
  {
    id: 1,
    name: "Lavi",
    image_url: user1,
    address: "Hashomer 12 Rishon Lezion",
    email: "lavi.azankot@gmail.com",
    password: "123",
    phone: "0584338722",
    posts: [],
    jobs: [],
    applied_jobs: [],
    saved_jobs: [],
  },
  {
    id: 2,
    name: "Varonica",
    image_url: user2,
    address: "Habarbanel 5 Rison Lezion",
    email: "varonica@gmail.com",
    password: "123",
    phone: "052123456",
    posts: [],
    jobs: [],
    applied_jobs: [],
    saved_jobs: [],
  },
];

const jobItems = [
  {
    id: 1,
    user_id: 1,
    description: "I need a baker for my birthday",
    category: "Bakers",
    image_url: baker_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 2,
    user_id: 2,
    description: "Lorem ipsum dolor sit amet",
    category: "Cooks",
    image_url: cook_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 3,
    user_id: 1,
    description: "Lorem ipsum dolor sit amet",
    category: "Dog Walker",
    image_url: dog_walker_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 4,
    user_id: 2,
    description: "Lorem ipsum dolor sit amet",
    category: "Editor",
    image_url: editor_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 5,
    user_id: 1,
    description: "Lorem ipsum dolor sit amet",
    category: "English Tutor",
    image_url: english_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 6,
    user_id: 1,
    description: "Lorem ipsum dolor sit amet",
    category: "Guitar Teacher",
    image_url: guitar_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 7,
    user_id: 2,
    description: "Lorem ipsum dolor sit amet",
    category: "Garden Pruning",
    image_url: gardener_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 8,
    user_id: 2,
    description: "Lorem ipsum dolor sit amet",
    category: "Programming Tutor",
    image_url: hacker_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 9,
    user_id: 1,
    description: "Lorem ipsum dolor sit amet",
    category: "Piano Teacher",
    image_url: piano_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 10,
    user_id: 2,
    description: "Lorem ipsum dolor sit amet",
    category: "Science Tutor",
    image_url: science_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
  {
    id: 11,
    user_id: 1,
    description: "Lorem ipsum dolor sit amet",
    category: "Sitter",
    image_url: sitter_job,
    hardness: "Moderate",
    price: 100,
    time: "Sunday 21/5/25 at 8pm",
    applicants: [],
  },
];

const jobRequirements = {
  Sitter: [
    "Loves children",
    "Good with kids",
    "Changes daipers",
    "Keeps kids entertained",
    "Patient and gentle",
    "Knows how to calm crying babies",
    "Can read bedtime stories",
    "Can cook simple meals",
    "Understands basic first-aid",
    "Follows parent instructions",
    "Can help with homework",
    "Shows up on time",
    "Keeps the house tidy",
  ],

  "Dog Walker": [
    "Loves dogs",
    "Responsible and reliable",
    "Cleans up after dogs",
    "Energetic",
    "Plays with the dogs",
    "Feed the dogs",
    "Can control big dogs",
    "Keeps the dogs safe",
    "Walks long distances with the dogs",
  ],

  "Programming Tutor": [
    "Knows Python",
    "Knows how to develop websites",
    "Knows how to develop apps",
    "Knows Scratch",
    "Can explain coding concepts clearly",
    "Teaches through experimenting",
    "Patient",
    "Makes lessons fun",
    "Good with children",
    "Has good vibes",
    "Uses real examples to teach",
    "Has a laptop with tools installed",
    "Can teach in-person",
    "Gives small challenges to students",
    "Friendly",
  ],

  "Math Tutor": [
    "Strong in school-level math",
    "Can explain problems step-by-step",
    "Helps with homework and test prep",
    "Brings practice problems",
    "Patient with different learning speeds",
    "Uses simple real-life examples",
    "Good with algebra and geometry",
    "Encouraging and positive",
    "Can teach online or in-person",
    "Keeps learning fun and focused",
  ],

  "English Tutor": [
    "Good grammar and writing skills",
    "Helps with reading and comprehension",
    "Explains vocabulary and word meanings",
    "Can teach essay writing",
    "Supports book reports and assignments",
    "Uses fun examples and stories",
    "Patient and friendly",
    "Brings or shares materials to study",
    "Corrects writing and spelling gently",
    "Can tutor online or in person",
  ],

  "Science Tutor": [
    "Understands school-level biology, chemistry, or physics",
    "Can explain science experiments and concepts",
    "Helps with science homework and projects",
    "Uses visuals or diagrams",
    "Encourages curiosity and questions",
    "Teaches cause and effect clearly",
    "Patient and supportive",
    "Can simplify complex topics",
    "Brings flashcards or reference sheets",
    "Teaches online or in person",
  ],

  "Guitar Teacher": [
    "Can play acoustic or electric guitar",
    "Teaches basic chords and strumming",
    "Helps students learn simple songs",
    "Patient with beginners",
    "Can read or teach using tabs",
    "Knows how to tune the guitar",
    "Explains hand and finger positioning",
    "Keeps lessons fun and motivating",
    "Can adapt lessons to student style",
    "Tracks student progress",
  ],

  "Piano Teacher": [
    "Can play piano or keyboard confidently",
    "Teaches basic songs and hand positions",
    "Knows how to read sheet music",
    "Patient and encouraging",
    "Teaches rhythm and tempo",
    "Brings or shares music sheets",
    "Can explain simple music theory",
    "Works well with beginners",
    "Keeps lessons structured but fun",
    "Helps student stay motivated",
  ],

  "Garden Pruning": [
    "Knows basic plant types",
    "Uses clippers and garden tools safely",
    "Cleans up after trimming",
    "Removes dead leaves and weeds",
    "Follows homeowner instructions",
    "Works neatly and respectfully",
    "Can shape bushes and hedges",
    "Wears gloves and proper footwear",
    "Enjoys working outdoors",
    "Punctual and reliable",
  ],

  Editors: [
    "Knows how to use basic editing apps (CapCut, Canva, etc.)",
    "Can trim and organize clips or content",
    "Adds music, text, and effects",
    "Knows how to match the client's style",
    "Open to feedback and changes",
    "Creates clean transitions",
    "Can edit short-form content (TikTok, IG Reels)",
    "Delivers high-quality final files",
    "Creative with visuals and flow",
    "Understands basic copyright rules",
  ],

  Bakers: [
    "Can bake cookies, cakes, or cupcakes at home",
    "Follows recipes accurately",
    "Keeps baking area clean",
    "Decorates desserts neatly",
    "Knows how to measure ingredients",
    "Packages baked goods for delivery",
    "Delivers fresh and on time",
    "Knows baking times and temps",
    "Can handle custom orders",
    "Loves baking and sharing treats",
  ],

  Cooks: [
    "Can prepare home-cooked meals (pasta, rice dishes, etc.)",
    "Delivers food from home to clients",
    "Knows basic kitchen safety and hygiene",
    "Follows recipes or custom requests",
    "Cooks with fresh ingredients",
    "Packages meals neatly and safely",
    "Can cook vegetarian or dietary meals if requested",
    "Keeps cooking area clean",
    "Can cook multiple servings",
    "Loves cooking and serving others",
  ],
};

export { assets, jobCategories, jobItems, users, jobRequirements };
