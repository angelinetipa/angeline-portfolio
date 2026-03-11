export const profile = {
  name: 'Ma. Angeline T. Tipa',
  nickname: 'Angeline',
  tagline: 'Soon-to-be Computer Engineer · Big Data · Builder of things that matter',
  degree: 'BS Computer Engineering (Big Data)',
  school: 'Polytechnic University of the Philippines, Sta. Mesa',
  email: 'your.email@example.com',        // TODO: update
  github: 'https://github.com/yourusername', // TODO: update
  linkedin: 'https://linkedin.com/in/you',   // TODO: update
  location: 'Manila, Philippines',
};

export const skills = [
  { category: 'Mobile', items: ['React Native', 'Expo', 'Expo Router'] },
  { category: 'Frontend', items: ['React', 'Vite', 'HTML/CSS', 'JavaScript', 'TypeScript'] },
  { category: 'Backend & Data', items: ['Supabase', 'PostgreSQL', 'Big Data', 'Python'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Figma', 'VS Code'] },
];

export const projects = [
  {
    id: '1',
    title: 'Portfolio App',
    description: 'This app — built with Expo + React Native, works on mobile and web. Claymorphism design inspired by nature.',
    tags: ['React Native', 'Expo', 'Supabase', 'Vercel'],
    status: 'live',
    github: '',
    demo: '',
  },
  {
    id: '2',
    title: 'Project 2',             // TODO: fill in real projects
    description: 'Description of what problem it solves and what you built.',
    tags: ['React', 'Supabase'],
    status: 'in-progress',
    github: '',
    demo: '',
  },
  {
    id: '3',
    title: 'Project 3',
    description: 'Description of what problem it solves and what you built.',
    tags: ['Python', 'Big Data'],
    status: 'in-progress',
    github: '',
    demo: '',
  },
];

export const certifications = [
  {
    id: '1',
    title: 'Introduction to Python',
    issuer: 'DataCamp',
    year: '2024',
    badge: '🐍',
  },
  {
    id: '2',
    title: 'Your Certification Here',  // TODO: fill in
    issuer: 'DataCamp / freeCodeCamp / Google',
    year: '2024',
    badge: '🎓',
  },
];

export const checklist = [
  {
    section: '🧱 Foundation',
    items: [
      { text: 'Polish your resume — 1 page, clean format, ATS-friendly', done: false },
      { text: 'Set up LinkedIn properly (photo, headline, skills, about)', done: false },
      { text: 'Clean up GitHub — pin best repos, write READMEs', done: false },
    ],
  },
  {
    section: '💻 Projects',
    items: [
      { text: 'Build 2–3 real projects (not tutorial clones)', done: false },
      { text: 'At least 1 full-stack or mobile project deployed publicly', done: false },
      { text: 'Portfolio app ← you are here', done: true },
      { text: 'Each project needs: live demo + GitHub + clear README', done: false },
    ],
  },
  {
    section: '🧠 Skills',
    items: [
      { text: 'Pick a stack and go deep (React Native + Node.js)', done: false },
      { text: 'Learn Git workflow properly (branches, PRs)', done: false },
      { text: 'Basic DSA (arrays, sorting, recursion)', done: false },
      { text: 'Learn how to deploy (Vercel, Expo, Play Store basics)', done: false },
      { text: 'Responsive design + mobile-first thinking', done: false },
    ],
  },
  {
    section: '🤝 Networking',
    items: [
      { text: 'Connect on LinkedIn — classmates, professors, devs', done: false },
      { text: 'Engage in dev communities (Reddit, Discord, dev.to)', done: false },
      { text: 'Contribute to open source (even small fixes count)', done: false },
    ],
  },
  {
    section: '🎯 Job Hunt',
    items: [
      { text: 'Research companies and roles before you need a job', done: false },
      { text: 'Practice mock interviews (LeetCode, behavioral questions)', done: false },
      { text: 'Prepare your "tell me about yourself" + project walkthroughs', done: false },
      { text: 'Apply early — hiring takes 1–3 months', done: false },
    ],
  },
  {
    section: '📈 Long-term',
    items: [
      { text: 'Build in public (post what you\'re learning/building)', done: false },
      { text: 'Keep a dev journal or blog (even a simple one)', done: false },
      { text: 'Never stop shipping — consistency > perfection', done: false },
    ],
  },
];

export const artworks = [
  // TODO: Add your portrait drawings
  // { id: '1', title: 'Portrait — Name', image: require('../assets/art/portrait1.jpg'), year: '2023' },
];
