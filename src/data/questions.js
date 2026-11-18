// Everything the "Find My Laptop" form asks, stored as arrays of objects.
// The form and the recommendation logic both read from this file, so you can
// add a program, a software option, or a question here without touching the pages.

const NOT_SURE = { value: '', label: 'Not sure / skip' };

// gpu: how much graphics power the program usually needs ('none' | 'preferred' | 'required')
export const programs = [
  {
    value: 'cs', icon: '💻',
    label: 'Computer Science',
    description: 'Programming, algorithms, and sometimes AI or game development.',
    ram: 16,
    storage: 512,
    gpu: 'none',
  },
  {
    value: 'it', icon: '🌐',
    label: 'Information Technology',
    description: 'Networking, databases, web development, and virtual machines.',
    ram: 16,
    storage: 512,
    gpu: 'none',
  },
  {
    value: 'emc', icon: '🎨',
    label: 'Multimedia, Arts and Design',
    description: 'Graphic design, video editing, animation, and 3D work.',
    ram: 16,
    storage: 512,
    gpu: 'preferred',
  },
  {
    value: 'eng', icon: '📐',
    label: 'Engineering and Architecture',
    description: 'CAD, drafting, and simulation software.',
    ram: 16,
    storage: 512,
    gpu: 'preferred',
  },
  {
    value: 'biz', icon: '📊',
    label: 'Business and Accountancy',
    description: 'Spreadsheets, presentations, and accounting tools.',
    ram: 8,
    storage: 256,
    gpu: 'none',
  },
  {
    value: 'edu', icon: '📚',
    label: 'Education',
    description: 'Lesson plans, presentations, and online classes.',
    ram: 8,
    storage: 256,
    gpu: 'none',
  },
  {
    value: 'health', icon: '🩺',
    label: 'Nursing and Health Sciences',
    description: 'Research, documents, and learning platforms.',
    ram: 8,
    storage: 256,
    gpu: 'none',
  },
  {
    value: 'other', icon: '🎓',
    label: 'Arts, Sciences, or Other',
    description: 'General coursework, research, and writing.',
    ram: 8,
    storage: 256,
    gpu: 'none',
  },
];

export const budgetOptions = [
  { value: 'u25', icon: '💰', label: 'Under ₱25,000', min: 0, max: 25000 },
  { value: '25-40', icon: '💰', label: '₱25,000 to ₱40,000', min: 25000, max: 40000 },
  { value: '40-60', icon: '💰', label: '₱40,000 to ₱60,000', min: 40000, max: 60000 },
  { value: '60-90', icon: '💰', label: '₱60,000 to ₱90,000', min: 60000, max: 90000 },
  { value: '90up', icon: '💰', label: '₱90,000 and above', min: 90000, max: Infinity },
];

export const osOptions = [
  { value: '', label: 'No preference', description: 'Show me both.' },
  { value: 'windows', icon: '🪟', label: 'Windows', description: 'The widest choice of laptops and software.' },
  { value: 'mac', icon: '🍎', label: 'macOS', description: 'MacBooks, known for battery life and build quality.' },
];

export const portabilityOptions = [
  { value: '', label: 'Not sure / skip' },
  { value: 'light', icon: '🎒', label: 'Very portable', description: 'Light enough to carry all day (about 1.5 kg or less).' },
  { value: 'balanced', icon: '⚖️', label: 'Balanced', description: 'Fine to carry, up to about 1.9 kg.' },
  { value: 'performance', icon: '🚀', label: 'Performance first', description: 'Weight does not matter to me.' },
];

// ram / gpu describe the minimum a software choice pushes the requirements up to.
export const softwareOptions = [
  { value: 'office', icon: '📄', label: 'Word, Excel, PowerPoint', ram: 8, gpu: 'none' },
  { value: 'meetings', icon: '📹', label: 'Online classes and meetings', ram: 8, gpu: 'none' },
  { value: 'coding', icon: '⌨️', label: 'Coding (VS Code, Java, Python)', ram: 8, gpu: 'none' },
  { value: 'vms', icon: '🖥️', label: 'Virtual machines or Docker', ram: 16, gpu: 'none' },
  { value: 'stats', icon: '📈', label: 'Statistics (SPSS, R, MATLAB)', ram: 8, gpu: 'none' },
  { value: 'adobe', icon: '🖌️', label: 'Photoshop or Illustrator', ram: 16, gpu: 'preferred' },
  { value: 'video', icon: '🎬', label: 'Video editing (Premiere, DaVinci)', ram: 16, gpu: 'preferred' },
  { value: 'cad', icon: '📐', label: 'AutoCAD, SolidWorks, or Revit', ram: 16, gpu: 'required' },
  { value: '3d', icon: '🧊', label: '3D or game engines (Blender, Unity)', ram: 16, gpu: 'required' },
  { value: 'games', icon: '🎮', label: 'Gaming', ram: 16, gpu: 'required' },
];

export const ramOptions = [
  NOT_SURE,
  { value: '8', label: '8 GB' },
  { value: '16', label: '16 GB' },
  { value: '32', label: '32 GB or more' },
];

export const storageOptions = [
  NOT_SURE,
  { value: '256', label: '256 GB' },
  { value: '512', label: '512 GB' },
  { value: '1024', label: '1 TB or more' },
];

export const gpuOptions = [
  NOT_SURE,
  { value: 'yes', icon: '👍', label: 'Yes, I want one' },
  { value: 'no', icon: '👎', label: 'No, I do not need one' },
];

export const batteryOptions = [
  NOT_SURE,
  { value: 'long', icon: '🔋', label: 'Long battery life (10+ hours)' },
  { value: 'plugged', icon: '🔌', label: 'I am usually plugged in' },
];

export const screenOptions = [
  NOT_SURE,
  { value: 'compact', icon: '📏', label: 'Compact (13 to 14 inch)' },
  { value: 'standard', icon: '🖥️', label: 'Standard (15 to 16 inch)' },
];

// The form steps. "required" fields must be answered before moving on.
export const steps = [
  {
    id: 'program',
    icon: '🎓',
    title: 'What program are you in?',
    description: 'Your program tells us the minimum specs students in your field usually need.',
    optional: false,
    fields: [
      {
        name: 'program',
        legend: 'Academic program',
        type: 'radio',
        required: true,
        columns: 2,
        options: programs,
      },
    ],
  },
  {
    id: 'budget',
    icon: '💰',
    title: "What's your budget?",
    description: 'Pick the range you are comfortable spending. Results will stay inside it.',
    optional: false,
    fields: [
      {
        name: 'budget',
        legend: 'Budget range',
        type: 'radio',
        required: true,
        columns: 2,
        options: budgetOptions,
      },
    ],
  },
  {
    id: 'os',
    icon: '🖥️',
    title: 'Which operating system do you prefer?',
    description: 'The operating system is the main software on a laptop, like Windows or macOS.',
    optional: true,
    fields: [
      {
        name: 'os',
        legend: 'Operating system',
        type: 'radio',
        required: false,
        columns: 3,
        options: osOptions,
      },
    ],
  },
  {
    id: 'portability',
    icon: '🎒',
    title: 'How portable should it be?',
    description: 'Think about how often you will carry it around campus.',
    optional: true,
    fields: [
      {
        name: 'portability',
        legend: 'Portability',
        type: 'radio',
        required: false,
        columns: 2,
        options: portabilityOptions,
      },
    ],
  },
  {
    id: 'software',
    icon: '🧰',
    title: 'Which software will you use?',
    description: 'Choose all that apply. Some programs need more power than others.',
    optional: true,
    fields: [
      {
        name: 'software',
        legend: 'Software and activities',
        type: 'checkbox',
        required: false,
        columns: 2,
        options: softwareOptions,
      },
    ],
  },
  {
    id: 'details',
    icon: '🔧',
    title: 'Any specific specs in mind?',
    description:
      'These are completely optional. If you are not sure, skip them and we will use what your program needs.',
    optional: true,
    fields: [
      {
        name: 'ram',
        legend: 'Memory (RAM)',
        hint: 'RAM is your laptop\'s short-term memory. More RAM lets you keep many apps and browser tabs open at once.',
        type: 'radio',
        required: false,
        columns: 4,
        options: ramOptions,
      },
      {
        name: 'storage',
        legend: 'Storage',
        hint: 'Storage is where your files and apps are kept. Modern laptops use fast SSD storage.',
        type: 'radio',
        required: false,
        columns: 4,
        options: storageOptions,
      },
      {
        name: 'gpu',
        legend: 'Dedicated graphics card',
        hint: 'A graphics card (GPU) helps with video editing, 3D, CAD, and games. Most schoolwork does not need one.',
        type: 'radio',
        required: false,
        columns: 3,
        options: gpuOptions,
      },
      {
        name: 'battery',
        legend: 'Battery life',
        hint: 'Longer battery life means you can go through a school day without looking for a socket.',
        type: 'radio',
        required: false,
        columns: 3,
        options: batteryOptions,
      },
      {
        name: 'screen',
        legend: 'Screen size',
        hint: 'Smaller screens are easier to carry. Larger screens are more comfortable for long work sessions.',
        type: 'radio',
        required: false,
        columns: 3,
        options: screenOptions,
      },
    ],
  },
];

export const initialAnswers = {
  program: '',
  budget: '',
  os: '',
  portability: '',
  software: [],
  ram: '',
  storage: '',
  gpu: '',
  battery: '',
  screen: '',
};
