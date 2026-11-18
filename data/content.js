// Text content for the Home, About, and Contact pages, kept in arrays so
// pages can render them with map().

export const problems = [
  {
    id: 'overspend',
    icon: '💸',
    title: 'Paying for power you do not need',
    text: 'Many students buy a high-end laptop "just in case" and spend far more than their program really requires.',
  },
  {
    id: 'underpowered',
    icon: '🐢',
    title: 'Buying a laptop that cannot keep up',
    text: 'The opposite mistake is just as common: a cheap laptop that struggles with coding tools, design software, or CAD.',
  },
  {
    id: 'jargon',
    icon: '🤯',
    title: 'Confusing specs and jargon',
    text: 'RAM, SSD, GPU, and processor names are hard to compare when you are not sure what you actually need.',
  },
];

export const howItWorks = [
  {
    id: 'step-1',
    icon: '📝',
    badge: '1',
    title: 'Tell us about you',
    text: 'Pick your program and budget, then add optional details like your software, portability, and battery needs.',
  },
  {
    id: 'step-2',
    icon: '⚙️',
    badge: '2',
    title: 'We match the specs',
    text: 'SpecMate turns your answers into the specs you need and scores every laptop in our list against them.',
  },
  {
    id: 'step-3',
    icon: '✅',
    badge: '3',
    title: 'Get your shortlist',
    text: 'See the best-fit laptops first, with a clear explanation of why each one suits you.',
  },
];

export const benefits = [
  {
    id: 'students',
    icon: '🎓',
    title: 'Made for students',
    text: 'Built around college programs and the way students actually use their laptops.',
  },
  {
    id: 'plain',
    icon: '💬',
    title: 'Plain language',
    text: 'Helpful hints explain technical terms, and every detail question can be skipped.',
  },
  {
    id: 'budget',
    icon: '🪙',
    title: 'Respects your budget',
    text: 'Results stay within the budget you choose, so you are not tempted by laptops you cannot afford.',
  },
  {
    id: 'private',
    icon: '🔒',
    title: 'Free and private',
    text: 'No account, no sign-up. Your answers stay in your browser.',
  },
];

export const aboutValues = [
  {
    id: 'simple',
    icon: '✨',
    title: 'Keep it simple',
    text: 'Choosing a laptop should take minutes, not hours of reading spec sheets.',
  },
  {
    id: 'fair',
    icon: '⚖️',
    title: 'Fit over hype',
    text: 'We recommend what matches your needs, not what is the newest or most expensive.',
  },
  {
    id: 'clear',
    icon: '🔍',
    title: 'Explain the why',
    text: 'Every recommendation shows its reasons so you can learn while you decide.',
  },
];

export const scoringFactors = [
  { id: 'ram', icon: '🧠', title: 'RAM', text: 'Enough memory for your program and the software you use.' },
  { id: 'storage', icon: '💾', title: 'Storage', text: 'Space for your files, projects, and apps.' },
  { id: 'graphics', icon: '🎨', title: 'Graphics', text: 'A dedicated graphics card when your work needs one.' },
  { id: 'portability', icon: '🎒', title: 'Portability', text: 'Weight that suits carrying it around campus.' },
  { id: 'battery', icon: '🔋', title: 'Battery', text: 'Battery life for long days away from a socket.' },
  { id: 'budget', icon: '🪙', title: 'Budget', text: 'Price that stays inside the range you set.' },
];

export const contactInfo = [
  {
    id: 'email',
    icon: '✉️',
    title: 'Email us',
    text: 'specmate@gmail.com',
  },
  {
    id: 'facebook',
    icon: '📘',
    title: 'Facebook page',
    text: 'facebook.com/specmate',
  },
  {
    id: 'campus',
    icon: '🏫',
    title: 'Find us on campus',
    text: 'MSEUF | College of Computing and Multimedia Studies',
  },
];
