window.TSA_AUDIO_SETTINGS = {
  // Set preferredVoiceName to an installed Turkish voice name when needed.
  // A question-level audioSrc recording always takes priority over browser speech.
  preferredVoiceName: "",
  rate: 0.72,
  pitch: 1,
  volume: 1,
  repetitions: 2,
  autoplay: true
};

window.TSA_STAGES = [
  {
    id: "initial",
    title: "Başlangıç sesleri",
    description: "Görsellere dikkatle bakın ve sözcüğün başlangıç sesine göre seçim yapın.",
    icon: "▶️"
  },
  {
    id: "final",
    title: "Bitiş sesleri",
    description: "Bu bölümde sözcüklerin sonundaki sesi düşünerek doğru görseli seçin.",
    icon: "🔚"
  },
  {
    id: "listening",
    title: "İşitsel ayırt etme",
    description: "Sesi dinleyin. Gerekirse yeniden oynatın ve duyduğunuz sözcüğü seçin.",
    icon: "🔊"
  },
  {
    id: "awareness",
    title: "Ses farkındalığı",
    description: "Sözcüğün içinde verilen sesin bulunup bulunmadığını değerlendirerek seçim yapın.",
    icon: "👂"
  }
];

window.TSA_QUESTIONS = [
  {
    id: "Q001",
    stage: "initial",
    category: "Başlangıç sesi",
    prompt: "Hangisi /ş/ sesiyle başlar?",
    options: [
      { id: "A", label: "Şapka", emoji: "🎩" },
      { id: "B", label: "Masa", emoji: "🪑" }
    ],
    correct: "A"
  },
  {
    id: "Q002",
    stage: "initial",
    category: "Başlangıç sesi",
    prompt: "Hangisi /k/ sesiyle başlar?",
    options: [
      { id: "A", label: "Balık", emoji: "🐟" },
      { id: "B", label: "Kalem", emoji: "✏️" }
    ],
    correct: "B"
  },
  {
    id: "Q003",
    stage: "initial",
    category: "Başlangıç sesi",
    prompt: "Hangisi /m/ sesiyle başlar?",
    options: [
      { id: "A", label: "Masa", emoji: "🪑" },
      { id: "B", label: "Araba", emoji: "🚗" }
    ],
    correct: "A"
  },
  {
    id: "Q004",
    stage: "final",
    category: "Bitiş sesi",
    prompt: "Hangisi /ş/ sesiyle biter?",
    options: [
      { id: "A", label: "Taş", emoji: "🪨" },
      { id: "B", label: "Top", emoji: "⚽" }
    ],
    correct: "A"
  },
  {
    id: "Q005",
    stage: "final",
    category: "Bitiş sesi",
    prompt: "Hangisi /k/ sesiyle biter?",
    options: [
      { id: "A", label: "Elma", emoji: "🍎" },
      { id: "B", label: "Çocuk", emoji: "🧒" }
    ],
    correct: "B"
  },
  {
    id: "Q006",
    stage: "listening",
    category: "İşitsel ayırt etme",
    prompt: "Dinlediğin kelimeyi seç.",
    speak: "kaz",
    audioSrc: "assets/audio/q006-kaz.mp3",
    options: [
      { id: "A", label: "Kaz", emoji: "🪿" },
      { id: "B", label: "Kız", emoji: "👧" }
    ],
    correct: "A"
  },
  {
    id: "Q007",
    stage: "listening",
    category: "İşitsel ayırt etme",
    prompt: "Dinlediğin kelimeyi seç.",
    speak: "taş",
    audioSrc: "assets/audio/q007-tas.mp3",
    options: [
      { id: "A", label: "Kaş", emoji: "👁️" },
      { id: "B", label: "Taş", emoji: "🪨" }
    ],
    correct: "B"
  },
  {
    id: "Q008",
    stage: "listening",
    category: "İşitsel ayırt etme",
    prompt: "Dinlediğin kelimeyi seç.",
    speak: "dal",
    audioSrc: "assets/audio/q008-dal.mp3",
    options: [
      { id: "A", label: "Bal", emoji: "🍯" },
      { id: "B", label: "Dal", emoji: "🌿" }
    ],
    correct: "B"
  },
  {
    id: "Q009",
    stage: "awareness",
    category: "Ses farkındalığı",
    prompt: "Hangisinin içinde /r/ sesi vardır?",
    options: [
      { id: "A", label: "Araba", emoji: "🚗" },
      { id: "B", label: "Elma", emoji: "🍎" }
    ],
    correct: "A"
  },
  {
    id: "Q010",
    stage: "awareness",
    category: "Ses farkındalığı",
    prompt: "Hangisinin içinde /s/ sesi vardır?",
    options: [
      { id: "A", label: "Balık", emoji: "🐟" },
      { id: "B", label: "Masa", emoji: "🪑" }
    ],
    correct: "B"
  }
];
