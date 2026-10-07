window.TSA_AUDIO_SETTINGS = {
  // Tarayıcıda varsa doğal ve yumuşak Türkçe kadın sesi önceliklendirilir.
  // Bir maddeye audioSrc eklendiğinde kayıt her zaman tarayıcı sesinden önce gelir.
  preferredVoiceName: "",
  preferredVoiceNames: ["emel", "yelda", "seda", "google türkçe"],
  preferFemaleVoice: true,
  rate: 0.86,
  pitch: 1.03,
  volume: 0.9,
  repetitions: 1,
  autoplay: false
};

window.TSA_DEFAULT_FORM = "child_4_7";

const tsaCrop = (src, sheetWidth, sheetHeight, columns, rows, col, row) => {
  const [x, width] = columns[col];
  const [y, height] = rows[row];
  return { src, sheetWidth, sheetHeight, x, y, width, height };
};

const earlyOptionSprite = (col, row) => tsaCrop(
  "assets/images/early-options.png", 1254, 1254,
  [[15, 608], [633, 606]],
  [[14, 235], [258, 226], [494, 222], [725, 242], [976, 263]],
  col, row
);
const earlyStimulusSprite = (col, row) => tsaCrop(
  "assets/images/early-stimuli.png", 1536, 1024,
  [[17, 493], [521, 495], [1026, 493]],
  [[18, 488], [517, 489]],
  col, row
);
const childOptionSprite = (col, row) => tsaCrop(
  "assets/images/child-options.png", 1024, 1536,
  [[14, 328], [349, 328], [684, 328]],
  [[11, 203], [221, 189], [417, 209], [633, 206], [845, 167], [1019, 229], [1255, 261]],
  col, row
);
const childStimulusSprite = (col, row) => tsaCrop(
  "assets/images/child-stimuli.png", 1774, 887,
  [[12, 429], [453, 428], [893, 431], [1336, 425]],
  [[12, 423], [447, 427]],
  col, row
);

window.TSA_FORMS = {
  early_2_3: {
    id: "early_2_3",
    label: "2–3 yaş • Yetişkin destekli form",
    profileLabel: "Erken dil profili",
    audioSettings: { rate: 0.82, pitch: 1.04, volume: 0.88 },
    notice: "Uygulayıcı çocuğun yanında kalır, yönergeyi standart biçimde sunar ve sözlü yanıtları ekrandan puanlar.",
    stages: [
      {
        id: "early_words",
        title: "Sözcükleri anlama",
        description: "Sözcüğü söyleyin veya dinletin. Çocuğun doğru büyük görsele dokunmasını isteyin.",
        icon: "🧸"
      },
      {
        id: "early_actions",
        title: "Eylem ve kısa cümle anlama",
        description: "Kısa yönergeyi bir kez verin. Çocuk uygun eylem ya da sahneyi seçsin.",
        icon: "🏃"
      },
      {
        id: "early_naming",
        title: "Sözcük ve eylem anlatımı",
        description: "Büyük uyaranı gösterin. Çocuğun bağımsız sözlü yanıtını rubriğe göre puanlayın.",
        icon: "💬"
      },
      {
        id: "early_combining",
        title: "Sözcük birleştirme",
        description: "Çocuğun kısa ifadeyi tekrar etmesini veya görsel hakkında iki sözcüklü bir ifade kurmasını isteyin.",
        icon: "🧩"
      }
    ],
    questions: [
      {
        id: "E001", stage: "early_words", category: "Alıcı sözcük bilgisi",
        prompt: "Topu göster.", speak: "Topu göster.", hideLabels: true,
        options: [
          { id: "A", label: "Top", sprite: earlyOptionSprite(0, 0) },
          { id: "B", label: "Ayakkabı", sprite: earlyOptionSprite(1, 0) }
        ], correct: "A"
      },
      {
        id: "E002", stage: "early_words", category: "Alıcı sözcük bilgisi",
        prompt: "Ayakkabıyı göster.", speak: "Ayakkabıyı göster.", hideLabels: true,
        options: [
          { id: "A", label: "Kaşık", sprite: earlyOptionSprite(0, 1) },
          { id: "B", label: "Ayakkabı", sprite: earlyOptionSprite(1, 1) }
        ], correct: "B"
      },
      {
        id: "E003", stage: "early_words", category: "Alıcı sözcük bilgisi",
        prompt: "Kaşığı göster.", speak: "Kaşığı göster.", hideLabels: true,
        options: [
          { id: "A", label: "Kaşık", sprite: earlyOptionSprite(0, 2) },
          { id: "B", label: "Top", sprite: earlyOptionSprite(1, 2) }
        ], correct: "A"
      },
      {
        id: "E004", stage: "early_actions", category: "Eylem anlama",
        prompt: "Hangisi uyuyor?", speak: "Hangisi uyuyor?", hideLabels: true,
        options: [
          { id: "A", label: "Uyuyor", sprite: earlyOptionSprite(0, 3) },
          { id: "B", label: "Koşuyor", sprite: earlyOptionSprite(1, 3) }
        ], correct: "A"
      },
      {
        id: "E005", stage: "early_actions", category: "Kısa cümle anlama",
        prompt: "Çocuk su içiyor. Doğru resmi göster.", speak: "Çocuk su içiyor.", hideLabels: true,
        options: [
          { id: "A", label: "Yemek yiyor", sprite: earlyOptionSprite(0, 4) },
          { id: "B", label: "Su içiyor", sprite: earlyOptionSprite(1, 4) }
        ], correct: "B"
      },
      {
        id: "E006", stage: "early_naming", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { sprite: earlyStimulusSprite(0, 0), label: "Top görseli" },
        expected: "Beklenen yanıt: top.",
        rubric: "2: Bağımsız olarak ‘top’ der. 1: Anlaşılır bir yaklaşım, kabul edilen çocuk sözcüğü veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "E007", stage: "early_naming", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { sprite: earlyStimulusSprite(1, 0), label: "Araba görseli" },
        expected: "Beklenen yanıt: araba.",
        rubric: "2: Bağımsız olarak ‘araba’ der. 1: Anlaşılır bir yaklaşım veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "E008", stage: "early_naming", category: "İfade edici eylem bilgisi",
        interaction: "clinician-score", prompt: "Ne yapıyor?", speak: "Ne yapıyor?", stimulus: { sprite: earlyStimulusSprite(2, 0), label: "Yemek yiyen çocuk" },
        expected: "Beklenen anlam: yiyor / yemek yiyor.",
        rubric: "2: Eylemi bağımsız ve doğru adlandırır. 1: Tek sözcüklü yaklaşık yanıt veya ipucu sonrası doğru yanıt. 0: Yanlış eylem ya da yanıt yok."
      },
      {
        id: "E009", stage: "early_combining", category: "Cümle tekrarı",
        interaction: "clinician-score", prompt: "Dinle ve tekrar et: ‘Bebek uyuyor.’", speak: "Bebek uyuyor.",
        stimulus: { sprite: earlyStimulusSprite(0, 1), label: "Uyuyan bebek" }, expected: "Hedef: Bebek uyuyor.",
        rubric: "2: İki hedef sözcüğü ve anlamı korur. 1: Tek hedef sözcüğü üretir veya küçük biçim farkıyla anlamı korur. 0: Hedef anlam yok ya da yanıt yok."
      },
      {
        id: "E010", stage: "early_combining", category: "Sözcük birleştirme",
        interaction: "clinician-score", prompt: "Resme bak. Çocuk ne istiyor?", speak: "Resme bak. Çocuk ne istiyor?", stimulus: { sprite: earlyStimulusSprite(1, 1), label: "Su isteyen çocuk" },
        expected: "Örnek kabul edilen yanıtlar: su istiyor, su ver, çocuk su istiyor.",
        rubric: "2: İki veya daha fazla anlamlı sözcüğü bağımsız birleştirir. 1: Tek doğru sözcük kullanır veya ipucu sonrası birleştirir. 0: İlişkisiz yanıt ya da yanıt yok."
      }
    ]
  },

  child_4_7: {
    id: "child_4_7",
    label: "4–7 yaş • Dil alanı formu",
    profileLabel: "Dil alanı profili",
    audioSettings: { rate: 0.88, pitch: 1.02, volume: 0.92 },
    notice: "Çocuk seçmeli görevleri kendisi yapabilir. Sözlü üretim görevlerini uygulayıcı canlı olarak puanlar.",
    stages: [
      {
        id: "vocabulary", title: "Sözcükler ve anlam ilişkileri",
        description: "Sözcüğü veya kısa yönergeyi dinleyin; anlamca uygun görseli seçin.", icon: "🖼️"
      },
      {
        id: "grammar", title: "Cümle anlama ve dilbilgisi",
        description: "Cümledeki yer, çoğul ve olumsuzluk gibi ipuçlarına dikkat ederek doğru sahneyi seçin.", icon: "🧠"
      },
      {
        id: "expressive", title: "Sözcük ve eylem anlatımı",
        description: "Büyük görsel hakkında konuşun. Uygulayıcı yanıtı ekrandaki rubriğe göre puanlar.", icon: "💬"
      },
      {
        id: "sentence", title: "Cümle üretimi ve tekrarı",
        description: "Cümleyi tekrar edin, tamamlayın veya görsel hakkında bir cümle kurun.", icon: "🧩"
      },
      {
        id: "narrative", title: "Dinlediğini anlama ve anlatı",
        description: "Kısa olayları dinleyin, neden-sonuç sorularını yanıtlayın ve olay sırasını anlatın.", icon: "📖"
      }
    ],
    questions: [
      {
        id: "Y001", stage: "vocabulary", category: "Alıcı sözcük bilgisi",
        prompt: "Merdiveni göster.", speak: "Merdiveni göster.", hideLabels: true,
        options: [
          { id: "A", label: "Merdiven", sprite: childOptionSprite(0, 0) },
          { id: "B", label: "Sandalye", sprite: childOptionSprite(1, 0) },
          { id: "C", label: "Kapı", sprite: childOptionSprite(2, 0) }
        ], correct: "A"
      },
      {
        id: "Y002", stage: "vocabulary", category: "Kavram bilgisi",
        prompt: "Hangisi boş?", speak: "Hangisi boş?", hideLabels: true,
        options: [
          { id: "A", label: "Dolu bardak", sprite: childOptionSprite(0, 1) },
          { id: "B", label: "Boş bardak", sprite: childOptionSprite(1, 1) },
          { id: "C", label: "Yarım bardak", sprite: childOptionSprite(2, 1) }
        ], correct: "B"
      },
      {
        id: "Y003", stage: "vocabulary", category: "Eylem anlama",
        prompt: "Hangisi taşıyor?", speak: "Hangisi taşıyor?", hideLabels: true,
        options: [
          { id: "A", label: "Taşıyor", sprite: childOptionSprite(0, 2) },
          { id: "B", label: "Oturuyor", sprite: childOptionSprite(1, 2) },
          { id: "C", label: "Uyuyor", sprite: childOptionSprite(2, 2) }
        ], correct: "A"
      },
      {
        id: "Y004", stage: "grammar", category: "Yer ve durum ekleri",
        prompt: "Kedi kutunun içinde. Doğru resmi seç.", speak: "Kedi kutunun içinde.", hideLabels: true,
        options: [
          { id: "A", label: "Kutunun üstünde", sprite: childOptionSprite(0, 3) },
          { id: "B", label: "Kutunun içinde", sprite: childOptionSprite(1, 3) },
          { id: "C", label: "Kutunun yanında", sprite: childOptionSprite(2, 3) }
        ], correct: "B"
      },
      {
        id: "Y005", stage: "grammar", category: "Çoğul bilgisi",
        prompt: "Kediler uyuyor. Doğru resmi seç.", speak: "Kediler uyuyor.", hideLabels: true,
        options: [
          { id: "A", label: "Bir kedi", sprite: childOptionSprite(0, 4) },
          { id: "B", label: "İki kedi", sprite: childOptionSprite(1, 4) },
          { id: "C", label: "Bir köpek", sprite: childOptionSprite(2, 4) }
        ], correct: "B"
      },
      {
        id: "Y006", stage: "grammar", category: "Olumsuzluk",
        prompt: "Çocuk koşmuyor. Doğru resmi seç.", speak: "Çocuk koşmuyor.", hideLabels: true,
        options: [
          { id: "A", label: "Koşuyor", sprite: childOptionSprite(0, 5) },
          { id: "B", label: "Duruyor", sprite: childOptionSprite(1, 5) },
          { id: "C", label: "Zıplıyor", sprite: childOptionSprite(2, 5) }
        ], correct: "B"
      },
      {
        id: "Y007", stage: "expressive", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { sprite: childStimulusSprite(0, 0), label: "Şemsiye görseli" },
        expected: "Beklenen yanıt: şemsiye.",
        rubric: "2: Bağımsız ve doğru adlandırır. 1: Kabul edilebilir yakın yanıt veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y008", stage: "expressive", category: "İfade edici eylem bilgisi",
        interaction: "clinician-score", prompt: "Kuş ne yapıyor?", speak: "Kuş ne yapıyor?", stimulus: { sprite: childStimulusSprite(1, 0), label: "Uçan kuş" },
        expected: "Beklenen anlam: uçuyor.",
        rubric: "2: Eylemi bağımsız ve doğru adlandırır. 1: Anlamı koruyan yakın yanıt veya ipucu sonrası doğru yanıt. 0: Yanlış eylem ya da yanıt yok."
      },
      {
        id: "Y009", stage: "expressive", category: "Sahne anlatımı",
        interaction: "clinician-score", prompt: "Resimde ne oluyor? Bir cümleyle anlat.", speak: "Resimde ne oluyor? Bir cümleyle anlat.", stimulus: { sprite: childStimulusSprite(2, 0), label: "Kız, top ve köpek sahnesi" },
        expected: "Örnek: Kız köpekle top oynuyor.",
        rubric: "2: Eylem ve katılımcıları ilişkilendiren anlaşılır cümle. 1: Doğru içerikli eksik ifade veya yalnızca eylem/nesne. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y010", stage: "sentence", category: "Cümle tekrarı",
        interaction: "clinician-score", prompt: "Dinle ve tekrar et: ‘Küçük çocuk kırmızı topu aldı.’", speak: "Küçük çocuk kırmızı topu aldı.",
        stimulus: { sprite: childStimulusSprite(3, 0), label: "Top alan çocuk" }, expected: "Hedef: Küçük çocuk kırmızı topu aldı.",
        rubric: "2: Ana sözcükleri ve dilbilgisel anlamı korur. 1: Anlamı koruyan bir-iki eksiltme/değişiklik. 0: Hedef anlam bozulur veya yanıt yok."
      },
      {
        id: "Y011", stage: "sentence", category: "Cümle tamamlama",
        interaction: "clinician-score", prompt: "Cümleyi tamamla: Dün parka ...", speak: "Cümleyi tamamla. Dün parka...", stimulus: { sprite: childStimulusSprite(0, 1), label: "Parka giden çocuk" },
        expected: "Örnek kabul edilen yanıt: gittim / gittik / gitti.",
        rubric: "2: Zaman ve cümleyle uyumlu çekimli eylem. 1: Doğru kök fakat eksik/uyumsuz çekim. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y012", stage: "sentence", category: "Cümle kurma",
        interaction: "clinician-score", prompt: "Bu kelimelerle bir cümle kur: çocuk – kitap – okuyor.", speak: "Bu kelimelerle bir cümle kur. Çocuk, kitap, okuyor.", stimulus: { sprite: childStimulusSprite(1, 1), label: "Kitap okuyan çocuk" },
        expected: "Örnek: Çocuk kitap okuyor.",
        rubric: "2: Üç öğeyi anlaşılır ve dilbilgisel cümlede kullanır. 1: Anlamlı fakat eksik/bozuk yapı. 0: Öğeler arasında ilişki kuramaz veya yanıt yok."
      },
      {
        id: "Y013", stage: "narrative", category: "Dinlediğini anlama",
        prompt: "Yağmur başladı. Ece ıslanmamak için şemsiyesini açtı. Ece şemsiyeyi neden açtı?", hideLabels: true,
        speak: "Yağmur başladı. Ece ıslanmamak için şemsiyesini açtı. Ece şemsiyeyi neden açtı?",
        options: [
          { id: "A", label: "Islanmamak için", sprite: childOptionSprite(0, 6) },
          { id: "B", label: "Uyumak için", sprite: childOptionSprite(1, 6) },
          { id: "C", label: "Yemek için", sprite: childOptionSprite(2, 6) }
        ], correct: "A"
      },
      {
        id: "Y014", stage: "narrative", category: "Olay sıralama ve anlatı",
        interaction: "clinician-score", prompt: "Resimlere sırayla bak ve ne olduğunu anlat.", speak: "Resimlere sırayla bak ve ne olduğunu anlat.",
        stimulus: { sprite: childStimulusSprite(2, 1), label: "Tohumdan çiçeğe olay dizisi" },
        expected: "Ana olaylar: tohum ekilir/büyür, bitki olur, çiçek açar.",
        rubric: "2: En az iki olayı doğru sırada ve bağlantılı anlatır. 1: Olayları adlandırır fakat sıra/bağlantı eksiktir. 0: İlişkisiz anlatım ya da yanıt yok."
      },
      {
        id: "Y015", stage: "narrative", category: "Çıkarım",
        interaction: "clinician-score", prompt: "Dondurma yere düştü. Çocuk neden üzgün olabilir?", speak: "Dondurma yere düştü. Çocuk neden üzgün olabilir?",
        stimulus: { sprite: childStimulusSprite(3, 1), label: "Yere düşen dondurma ve üzgün çocuk" },
        expected: "Beklenen anlam: Dondurması düştüğü/onu yiyemediği için.",
        rubric: "2: Olay ile duyguyu açık neden ilişkisiyle bağlar. 1: Uygun fakat eksik neden. 0: İlişkisiz yanıt ya da yanıt yok."
      }
    ]
  }
};

// Eski sayfa ve yardımcı kodlarla geriye dönük uyumluluk.
window.TSA_STAGES = window.TSA_FORMS[window.TSA_DEFAULT_FORM].stages;
window.TSA_QUESTIONS = window.TSA_FORMS[window.TSA_DEFAULT_FORM].questions;
