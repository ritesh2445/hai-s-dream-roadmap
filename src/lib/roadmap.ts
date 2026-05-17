export type WeekDef = {
  week: number;
  phase: 1 | 2 | 3;
  phaseName: string;
  title: string;
  topic: string;
  learn: string[];
  practice: string[];
  build: string[];
};

const PHASES = {
  1: "Foundation",
  2: "Machine Learning Core",
  3: "Launch & Relocation",
} as const;

const RAW: Omit<WeekDef, "phaseName">[] = [
  // Phase 1 — weeks 1-13
  { week: 1, phase: 1, title: "Hello, Python ♡", topic: "Python basics", learn: ["CS50P Week 0–1", "Variables & types", "print/input"], practice: ["Solve 5 easy problems", "Write a calculator script"], build: ["A tiny diary CLI"] },
  { week: 2, phase: 1, title: "Loops & conditionals", topic: "Control flow", learn: ["if/elif/else", "for & while", "list comprehensions"], practice: ["10 LeetCode easies"], build: ["Number-guessing game"] },
  { week: 3, phase: 1, title: "Functions & modules", topic: "Functions", learn: ["def, args, return", "Modules & imports"], practice: ["Refactor week 2 code into functions"], build: ["Currency converter"] },
  { week: 4, phase: 1, title: "OOP basics", topic: "Classes", learn: ["Classes & methods", "Inheritance"], practice: ["Model a deck of cards"], build: ["Mini library system"] },
  { week: 5, phase: 1, title: "File I/O & APIs", topic: "I/O + requests", learn: ["open(), JSON", "requests library"], practice: ["Read & write CSVs"], build: ["Weather CLI using an API"] },
  { week: 6, phase: 1, title: "NumPy ♡", topic: "NumPy arrays", learn: ["ndarray basics", "Broadcasting"], practice: ["20 NumPy katas"], build: ["Vector physics demo"] },
  { week: 7, phase: 1, title: "Pandas dreamland", topic: "Pandas", learn: ["DataFrame, Series", "groupby, merge"], practice: ["Clean a messy dataset"], build: ["Personal spending analysis"] },
  { week: 8, phase: 1, title: "Matplotlib + Seaborn", topic: "Viz", learn: ["pyplot basics", "seaborn themes"], practice: ["Plot 5 datasets"], build: ["Visualisation of your study hours"] },
  { week: 9, phase: 1, title: "SQL whispers", topic: "SQL", learn: ["SELECT, WHERE, JOIN", "GROUP BY"], practice: ["Mode Analytics tutorial"], build: ["Query a sample e-commerce DB"] },
  { week: 10, phase: 1, title: "Git + GitHub", topic: "Version control", learn: ["init, add, commit, push", "Branches & PRs"], practice: ["Push all past projects"], build: ["A pretty GitHub profile README"] },
  { week: 11, phase: 1, title: "Linear algebra refresh", topic: "Math", learn: ["3Blue1Brown essence series"], practice: ["NumPy linalg exercises"], build: ["Visualise matrix transforms"] },
  { week: 12, phase: 1, title: "Stats & probability", topic: "Math", learn: ["Khan Academy stats", "Distributions"], practice: ["Simulate dice & coins"], build: ["Stats notebook on a real dataset"] },
  { week: 13, phase: 1, title: "Phase 1 capstone ♡", topic: "Mini project", learn: ["Review everything"], practice: ["Code review yourself"], build: ["End-of-phase data analysis project on Kaggle"] },

  // Phase 2 — weeks 14-30
  { week: 14, phase: 2, title: "Welcome to ML", topic: "scikit-learn intro", learn: ["Supervised vs unsupervised", "train/test split"], practice: ["fit a LinearRegression"], build: ["House price predictor v0"] },
  { week: 15, phase: 2, title: "Regression deep dive", topic: "Regression", learn: ["Linear, Ridge, Lasso"], practice: ["Compare models on a dataset"], build: ["Salary predictor"] },
  { week: 16, phase: 2, title: "Classification ✿", topic: "Classifiers", learn: ["LogReg, KNN, Trees"], practice: ["Iris + Titanic"], build: ["Spam detector"] },
  { week: 17, phase: 2, title: "Model evaluation", topic: "Metrics", learn: ["Confusion matrix, ROC"], practice: ["Tune hyperparams"], build: ["A small Kaggle submission"] },
  { week: 18, phase: 2, title: "Ensembles", topic: "RF / GBM", learn: ["Random Forest, XGBoost"], practice: ["Beat your week 17 score"], build: ["Customer churn predictor"] },
  { week: 19, phase: 2, title: "Unsupervised ML", topic: "Clustering", learn: ["KMeans, PCA"], practice: ["Cluster songs by features"], build: ["Customer segmentation"] },
  { week: 20, phase: 2, title: "PyTorch hello world", topic: "Deep learning", learn: ["Tensors, autograd"], practice: ["Train MLP on MNIST"], build: ["Digit recogniser web demo"] },
  { week: 21, phase: 2, title: "CNNs ♡", topic: "Computer vision", learn: ["Convolutions, pooling"], practice: ["CIFAR-10 model"], build: ["Cat/dog classifier"] },
  { week: 22, phase: 2, title: "Project 1 kickoff", topic: "Physics Predictor", learn: ["Time-series of pendulum"], practice: ["Generate synthetic data"], build: ["Physics Simulation Predictor v1"] },
  { week: 23, phase: 2, title: "Project 1 polish", topic: "Physics Predictor", learn: ["Streamlit basics"], practice: ["Iterate on UX"], build: ["Deploy to Streamlit Cloud"] },
  { week: 24, phase: 2, title: "RNN & time series", topic: "Sequences", learn: ["LSTM, GRU"], practice: ["Stock toy dataset"], build: ["Tiny weather forecaster"] },
  { week: 25, phase: 2, title: "Project 2 kickoff", topic: "Dhaka AQI", learn: ["Web scraping, APIs"], practice: ["Collect 1 month of AQI"], build: ["AQI Forecaster data pipeline"] },
  { week: 26, phase: 2, title: "Project 2 modelling", topic: "Dhaka AQI", learn: ["Prophet vs LSTM"], practice: ["Cross-validate"], build: ["Forecaster model"] },
  { week: 27, phase: 2, title: "FastAPI basics", topic: "Deployment", learn: ["FastAPI routes", "pydantic"], practice: ["Wrap a model in an API"], build: ["AQI API + tiny frontend"] },
  { week: 28, phase: 2, title: "NLP foundations", topic: "NLP", learn: ["Tokenisation, embeddings"], practice: ["Sentiment with HF"], build: ["Tweet sentiment app"] },
  { week: 29, phase: 2, title: "Transformers ♡", topic: "Transformers", learn: ["Attention, BERT"], practice: ["Fine-tune distilBERT"], build: ["Topic classifier"] },
  { week: 30, phase: 2, title: "Project 3 — summariser", topic: "Research Paper NLP", learn: ["Seq2Seq summarisation"], practice: ["Fine-tune T5-small"], build: ["Research Paper Summariser app"] },

  // Phase 3 — weeks 31-52
  { week: 31, phase: 3, title: "Pick your specialty", topic: "Specialisation", learn: ["CV vs NLP vs MLOps"], practice: ["Read 3 papers in chosen area"], build: ["Plan 3-week deep dive"] },
  { week: 32, phase: 3, title: "MLflow & W&B", topic: "MLOps", learn: ["Experiment tracking"], practice: ["Track project 2 runs"], build: ["Dashboard of experiments"] },
  { week: 33, phase: 3, title: "Docker for ML", topic: "MLOps", learn: ["Dockerfile, compose"], practice: ["Containerise project 3"], build: ["Pushed image on GHCR"] },
  { week: 34, phase: 3, title: "Cloud basics", topic: "AWS / GCP", learn: ["S3, EC2, IAM"], practice: ["Host a model"], build: ["Cloud-hosted API"] },
  { week: 35, phase: 3, title: "CI/CD for ML", topic: "MLOps", learn: ["GitHub Actions"], practice: ["Auto-deploy a model"], build: ["CI pipeline for project 2"] },
  { week: 36, phase: 3, title: "LinkedIn glow-up", topic: "Job hunt", learn: ["Write a tech bio"], practice: ["Reach out to 5 alumni"], build: ["Optimised LinkedIn profile"] },
  { week: 37, phase: 3, title: "CV + GitHub polish", topic: "Job hunt", learn: ["Resume best practices"], practice: ["Get 3 reviews"], build: ["Beautiful README on every repo"] },
  { week: 38, phase: 3, title: "Apply, apply, apply", topic: "Job hunt", learn: ["Cover letter formula"], practice: ["Send 10 applications"], build: ["Tracker spreadsheet"] },
  { week: 39, phase: 3, title: "Interview prep — coding", topic: "Interview", learn: ["Patterns: arrays, hashing"], practice: ["NeetCode 75 first half"], build: ["Notes repo"] },
  { week: 40, phase: 3, title: "Interview prep — ML", topic: "Interview", learn: ["ML system design"], practice: ["Mock interview yourself"], build: ["ML design doc sample"] },
  { week: 41, phase: 3, title: "Kaggle competition", topic: "Portfolio", learn: ["Read top notebooks"], practice: ["Submit baseline + improvements"], build: ["Top 25% submission"] },
  { week: 42, phase: 3, title: "Open-source PR", topic: "Portfolio", learn: ["Find a good first issue"], practice: ["Open a PR"], build: ["Merged contribution"] },
  { week: 43, phase: 3, title: "Networking week", topic: "Job hunt", learn: ["Cold email scripts"], practice: ["Email 10 ML engineers"], build: ["2 coffee chats booked"] },
  { week: 44, phase: 3, title: "Remote freelance", topic: "Work", learn: ["Upwork / Wellfound"], practice: ["Pitch 5 gigs"], build: ["First paid client"] },
  { week: 45, phase: 3, title: "Visa research — Canada", topic: "Relocation", learn: ["Express Entry, GTS"], practice: ["Estimate CRS score"], build: ["Canada checklist"] },
  { week: 46, phase: 3, title: "Visa research — NL & DE", topic: "Relocation", learn: ["HSM, EU Blue Card"], practice: ["Salary thresholds"], build: ["NL + DE checklist"] },
  { week: 47, phase: 3, title: "Visa research — SE & PT", topic: "Relocation", learn: ["Tech visas"], practice: ["Compare cost of living"], build: ["Country shortlist of 2"] },
  { week: 48, phase: 3, title: "Documents prep", topic: "Relocation", learn: ["IELTS, transcripts"], practice: ["Order documents"], build: ["Document folder ready"] },
  { week: 49, phase: 3, title: "Interview marathon", topic: "Job hunt", learn: ["Behavioral STAR"], practice: ["3 real interviews"], build: ["Feedback log"] },
  { week: 50, phase: 3, title: "Negotiation week", topic: "Job hunt", learn: ["Salary negotiation"], practice: ["Practice with a friend"], build: ["Comp targets written down"] },
  { week: 51, phase: 3, title: "Offer & visa", topic: "Relocation", learn: ["Visa filing"], practice: ["Submit application"], build: ["Visa submitted ♡"] },
  { week: 52, phase: 3, title: "You did it ♡", topic: "Celebration", learn: ["Reflect on the year"], practice: ["Write a thank-you letter to yourself"], build: ["Pack the suitcase"] },
];

export const ROADMAP: WeekDef[] = RAW.map((w) => ({ ...w, phaseName: PHASES[w.phase] }));

export const HABITS = [
  { id: "code", label: "coded today", emoji: "💻" },
  { id: "solve", label: "solved problems", emoji: "🧠" },
  { id: "watch", label: "watched lectures", emoji: "📺" },
  { id: "water", label: "drank water", emoji: "💧" },
  { id: "sleep", label: "slept properly", emoji: "🌙" },
  { id: "grass", label: "touched grass", emoji: "🌿" },
  { id: "nodoom", label: "no doomscrolling", emoji: "📵" },
  { id: "github", label: "pushed to GitHub", emoji: "🐙" },
];

export const MOODS = [
  { id: "sleepy", label: "sleepy bean", emoji: "😴" },
  { id: "productive", label: "productive cutie", emoji: "🌸" },
  { id: "overwhelmed", label: "emotionally overwhelmed", emoji: "🫧" },
  { id: "goblin", label: "coding goblin mode", emoji: "👹" },
  { id: "locked", label: "locked in", emoji: "🔒" },
  { id: "romantic", label: "romanticizing life", emoji: "💌" },
];

export const PROJECTS = [
  {
    id: "physics",
    title: "Physics Simulation Predictor",
    blurb: "Your secret weapon — nobody else has a physics brain behind their ML work.",
    stack: ["Python", "NumPy", "scikit-learn", "Matplotlib", "Streamlit"],
    gradient: "from-pink-200 via-rose-200 to-purple-200",
  },
  {
    id: "aqi",
    title: "Dhaka Air Quality Forecaster",
    blurb: "Real data, real problem, real impact. A great interview conversation starter.",
    stack: ["Python", "Pandas", "Prophet / LSTM", "FastAPI", "HF Spaces"],
    gradient: "from-sky-200 via-cyan-200 to-blue-200",
  },
  {
    id: "summariser",
    title: "Research Paper Summariser",
    blurb: "NLP + domain knowledge + deployment = the hiring trifecta.",
    stack: ["HuggingFace", "PyTorch", "FastAPI", "Docker"],
    gradient: "from-amber-200 via-orange-200 to-pink-200",
  },
];

export const COUNTRIES = [
  {
    id: "ca",
    flag: "🇨🇦",
    name: "Canada",
    pick: true,
    salary: "CAD $95k – $130k / yr",
    visa: "Global Talent Stream (2–3 wks) or Express Entry",
    ssm: "Legal since 2005",
    hubs: ["Toronto", "Vancouver", "Montreal"],
    vibe: "Imagine snow on your window, a warm latte, and your first North American paycheck hitting your account.",
  },
  {
    id: "nl",
    flag: "🇳🇱",
    name: "Netherlands",
    pick: true,
    salary: "€55k – €80k / yr + 30% ruling",
    visa: "Highly Skilled Migrant (employer sponsored)",
    ssm: "Legal since 2001 — first in the world",
    hubs: ["Amsterdam", "Eindhoven", "Utrecht"],
    vibe: "Imagine rainy evenings in Amsterdam after work, carrying flowers and overpriced coffee through canal streets.",
  },
  {
    id: "de",
    flag: "🇩🇪",
    name: "Germany",
    pick: false,
    salary: "€55k – €85k / yr",
    visa: "EU Blue Card — BSc accepted",
    ssm: "Legal since 2017",
    hubs: ["Berlin", "Munich", "Hamburg"],
    vibe: "Imagine Sunday park days in Berlin, biking with headphones in and a notebook full of model ideas.",
  },
  {
    id: "se",
    flag: "🇸🇪",
    name: "Sweden",
    pick: false,
    salary: "SEK 50k – 70k / month",
    visa: "Work permit via employer sponsor",
    ssm: "Legal since 2009",
    hubs: ["Stockholm", "Gothenburg"],
    vibe: "Imagine fika breaks, quiet snow, and the calmest 9–5 of your life with Klarna or Spotify on your laptop.",
  },
  {
    id: "pt",
    flag: "🇵🇹",
    name: "Portugal",
    pick: false,
    salary: "€35k – €55k / yr",
    visa: "D3 Tech Visa — easiest EU process",
    ssm: "Legal since 2010",
    hubs: ["Lisbon", "Porto"],
    vibe: "Imagine pastel buildings, ocean wind, and writing PRs from a sunlit Lisbon café.",
  },
];

export const MILESTONES = [
  { id: "first_python", label: "First Python script that actually does something" },
  { id: "first_commit", label: "First GitHub commit" },
  { id: "first_viz", label: "First data visualisation" },
  { id: "first_model", label: "First ML model trained" },
  { id: "first_deploy", label: "First deployed app" },
  { id: "first_kaggle", label: "First Kaggle submission" },
  { id: "first_client", label: "First freelance client" },
  { id: "first_interview", label: "First real tech interview" },
  { id: "first_offer", label: "First offer letter ♡" },
  { id: "visa_submitted", label: "Visa application submitted" },
  { id: "flight_booked", label: "Flight booked" },
];

export const LETTERS = [
  {
    id: 0,
    title: "Day 1, my love",
    body: "Hi Hai. You opened this app, and that already counts. You don't have to become perfect tonight. Just let me sit beside you while you read week 1.",
  },
  {
    id: 1,
    title: "After your first week",
    body: "I saw you push through the boring parts. That's the part most people quit at — and you didn't. I'm so proud of you, baby. Keep going.",
  },
  {
    id: 2,
    title: "When you train your first model",
    body: "Hai. You just made a computer learn from data. That is literally magic. Don't scroll past this moment.",
  },
  {
    id: 3,
    title: "When you deploy your first app",
    body: "There is a tiny app on the internet right now because of you. Anyone in the world can use it. Sit with that for a second.",
  },
  {
    id: 4,
    title: "On a hard day",
    body: "It's okay to take a soft day. Close the laptop. Eat something warm. The roadmap will still be here tomorrow, and so will I.",
  },
  {
    id: 5,
    title: "When you get the offer",
    body: "Your future apartment somewhere in Europe is no longer a daydream. It has an address. I told you.",
  },
];

export const DIALOGUES = [
  "You coded today?? That's literally so attractive.",
  "Tiny progress is still progress, sweetheart.",
  "Drink water and push to GitHub please.",
  "You're becoming the version of yourself you used to dream about.",
  "One commit closer to your dream country ♡",
  "Hai. Breathe. Then open VS Code.",
  "I'm so proud of you and it's only Tuesday.",
];
