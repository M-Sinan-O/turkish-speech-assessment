window.TSA_AUDIO_SETTINGS = {
  // Gerçek araştırmada her madde için uzman onaylı bir audioSrc kaydı kullanılmalıdır.
  preferredVoiceName: "",
  rate: 0.78,
  pitch: 1,
  volume: 1,
  repetitions: 1,
  autoplay: false
};

window.TSA_DEFAULT_FORM = "child_4_7";

window.TSA_FORMS = {
  early_2_3: {
    id: "early_2_3",
    label: "2–3 yaş • Yetişkin destekli form",
    profileLabel: "Erken dil profili",
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
          { id: "A", label: "Top", emoji: "⚽" },
          { id: "B", label: "Ayakkabı", emoji: "👟" }
        ], correct: "A"
      },
      {
        id: "E002", stage: "early_words", category: "Alıcı sözcük bilgisi",
        prompt: "Ayakkabıyı göster.", speak: "Ayakkabıyı göster.", hideLabels: true,
        options: [
          { id: "A", label: "Kaşık", emoji: "🥄" },
          { id: "B", label: "Ayakkabı", emoji: "👟" }
        ], correct: "B"
      },
      {
        id: "E003", stage: "early_words", category: "Alıcı sözcük bilgisi",
        prompt: "Kaşığı göster.", speak: "Kaşığı göster.", hideLabels: true,
        options: [
          { id: "A", label: "Kaşık", emoji: "🥄" },
          { id: "B", label: "Top", emoji: "⚽" }
        ], correct: "A"
      },
      {
        id: "E004", stage: "early_actions", category: "Eylem anlama",
        prompt: "Hangisi uyuyor?", speak: "Hangisi uyuyor?", hideLabels: true,
        options: [
          { id: "A", label: "Uyuyor", emoji: "😴" },
          { id: "B", label: "Koşuyor", emoji: "🏃" }
        ], correct: "A"
      },
      {
        id: "E005", stage: "early_actions", category: "Kısa cümle anlama",
        prompt: "Çocuk su içiyor. Doğru resmi göster.", speak: "Çocuk su içiyor.", hideLabels: true,
        options: [
          { id: "A", label: "Yemek yiyor", emoji: "🧒🍽️" },
          { id: "B", label: "Su içiyor", emoji: "🧒🥤" }
        ], correct: "B"
      },
      {
        id: "E006", stage: "early_naming", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { emoji: "⚽", label: "Top görseli" },
        expected: "Beklenen yanıt: top.",
        rubric: "2: Bağımsız olarak ‘top’ der. 1: Anlaşılır bir yaklaşım, kabul edilen çocuk sözcüğü veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "E007", stage: "early_naming", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { emoji: "🚗", label: "Araba görseli" },
        expected: "Beklenen yanıt: araba.",
        rubric: "2: Bağımsız olarak ‘araba’ der. 1: Anlaşılır bir yaklaşım veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "E008", stage: "early_naming", category: "İfade edici eylem bilgisi",
        interaction: "clinician-score", prompt: "Ne yapıyor?", speak: "Ne yapıyor?", stimulus: { emoji: "🧒🍽️", label: "Yemek yiyen çocuk" },
        expected: "Beklenen anlam: yiyor / yemek yiyor.",
        rubric: "2: Eylemi bağımsız ve doğru adlandırır. 1: Tek sözcüklü yaklaşık yanıt veya ipucu sonrası doğru yanıt. 0: Yanlış eylem ya da yanıt yok."
      },
      {
        id: "E009", stage: "early_combining", category: "Cümle tekrarı",
        interaction: "clinician-score", prompt: "Dinle ve tekrar et: ‘Bebek uyuyor.’", speak: "Bebek uyuyor.",
        stimulus: { emoji: "👶😴", label: "Uyuyan bebek" }, expected: "Hedef: Bebek uyuyor.",
        rubric: "2: İki hedef sözcüğü ve anlamı korur. 1: Tek hedef sözcüğü üretir veya küçük biçim farkıyla anlamı korur. 0: Hedef anlam yok ya da yanıt yok."
      },
      {
        id: "E010", stage: "early_combining", category: "Sözcük birleştirme",
        interaction: "clinician-score", prompt: "Resme bak. Çocuk ne istiyor?", speak: "Resme bak. Çocuk ne istiyor?", stimulus: { emoji: "🧒👉🥤", label: "Su isteyen çocuk" },
        expected: "Örnek kabul edilen yanıtlar: su istiyor, su ver, çocuk su istiyor.",
        rubric: "2: İki veya daha fazla anlamlı sözcüğü bağımsız birleştirir. 1: Tek doğru sözcük kullanır veya ipucu sonrası birleştirir. 0: İlişkisiz yanıt ya da yanıt yok."
      }
    ]
  },

  child_4_7: {
    id: "child_4_7",
    label: "4–7 yaş • Dil alanı formu",
    profileLabel: "Dil alanı profili",
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
          { id: "A", label: "Merdiven", emoji: "🪜" },
          { id: "B", label: "Sandalye", emoji: "🪑" },
          { id: "C", label: "Kapı", emoji: "🚪" }
        ], correct: "A"
      },
      {
        id: "Y002", stage: "vocabulary", category: "Kavram bilgisi",
        prompt: "Hangisi boş?", speak: "Hangisi boş?", hideLabels: true,
        options: [
          { id: "A", label: "Dolu bardak", emoji: "🥛" },
          { id: "B", label: "Boş bardak", emoji: "🥤" },
          { id: "C", label: "Yarım bardak", emoji: "🧃" }
        ], correct: "B"
      },
      {
        id: "Y003", stage: "vocabulary", category: "Eylem anlama",
        prompt: "Hangisi taşıyor?", speak: "Hangisi taşıyor?", hideLabels: true,
        options: [
          { id: "A", label: "Taşıyor", emoji: "🧒📦" },
          { id: "B", label: "Oturuyor", emoji: "🧒🪑" },
          { id: "C", label: "Uyuyor", emoji: "😴" }
        ], correct: "A"
      },
      {
        id: "Y004", stage: "grammar", category: "Yer ve durum ekleri",
        prompt: "Kedi kutunun içinde. Doğru resmi seç.", speak: "Kedi kutunun içinde.", hideLabels: true,
        options: [
          { id: "A", label: "Kutunun üstünde", emoji: "🐈📦" },
          { id: "B", label: "Kutunun içinde", emoji: "📦🐈" },
          { id: "C", label: "Kutunun yanında", emoji: "🐈‍⬛↔️📦" }
        ], correct: "B"
      },
      {
        id: "Y005", stage: "grammar", category: "Çoğul bilgisi",
        prompt: "Kediler uyuyor. Doğru resmi seç.", speak: "Kediler uyuyor.", hideLabels: true,
        options: [
          { id: "A", label: "Bir kedi", emoji: "🐈" },
          { id: "B", label: "İki kedi", emoji: "🐈🐈" },
          { id: "C", label: "Bir köpek", emoji: "🐕" }
        ], correct: "B"
      },
      {
        id: "Y006", stage: "grammar", category: "Olumsuzluk",
        prompt: "Çocuk koşmuyor. Doğru resmi seç.", speak: "Çocuk koşmuyor.", hideLabels: true,
        options: [
          { id: "A", label: "Koşuyor", emoji: "🏃" },
          { id: "B", label: "Duruyor", emoji: "🧍" },
          { id: "C", label: "Zıplıyor", emoji: "🤸" }
        ], correct: "B"
      },
      {
        id: "Y007", stage: "expressive", category: "İfade edici sözcük bilgisi",
        interaction: "clinician-score", prompt: "Bu ne?", speak: "Bu ne?", stimulus: { emoji: "☂️", label: "Şemsiye görseli" },
        expected: "Beklenen yanıt: şemsiye.",
        rubric: "2: Bağımsız ve doğru adlandırır. 1: Kabul edilebilir yakın yanıt veya standart ipucu sonrası doğru yanıt. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y008", stage: "expressive", category: "İfade edici eylem bilgisi",
        interaction: "clinician-score", prompt: "Kuş ne yapıyor?", speak: "Kuş ne yapıyor?", stimulus: { emoji: "🐦💨", label: "Uçan kuş" },
        expected: "Beklenen anlam: uçuyor.",
        rubric: "2: Eylemi bağımsız ve doğru adlandırır. 1: Anlamı koruyan yakın yanıt veya ipucu sonrası doğru yanıt. 0: Yanlış eylem ya da yanıt yok."
      },
      {
        id: "Y009", stage: "expressive", category: "Sahne anlatımı",
        interaction: "clinician-score", prompt: "Resimde ne oluyor? Bir cümleyle anlat.", speak: "Resimde ne oluyor? Bir cümleyle anlat.", stimulus: { emoji: "👧⚽🐕", label: "Kız, top ve köpek sahnesi" },
        expected: "Örnek: Kız köpekle top oynuyor.",
        rubric: "2: Eylem ve katılımcıları ilişkilendiren anlaşılır cümle. 1: Doğru içerikli eksik ifade veya yalnızca eylem/nesne. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y010", stage: "sentence", category: "Cümle tekrarı",
        interaction: "clinician-score", prompt: "Dinle ve tekrar et: ‘Küçük çocuk kırmızı topu aldı.’", speak: "Küçük çocuk kırmızı topu aldı.",
        stimulus: { emoji: "🧒🔴⚽", label: "Top alan çocuk" }, expected: "Hedef: Küçük çocuk kırmızı topu aldı.",
        rubric: "2: Ana sözcükleri ve dilbilgisel anlamı korur. 1: Anlamı koruyan bir-iki eksiltme/değişiklik. 0: Hedef anlam bozulur veya yanıt yok."
      },
      {
        id: "Y011", stage: "sentence", category: "Cümle tamamlama",
        interaction: "clinician-score", prompt: "Cümleyi tamamla: Dün parka ...", speak: "Cümleyi tamamla. Dün parka...", stimulus: { emoji: "🗓️➡️🏞️", label: "Dün parka gitme" },
        expected: "Örnek kabul edilen yanıt: gittim / gittik / gitti.",
        rubric: "2: Zaman ve cümleyle uyumlu çekimli eylem. 1: Doğru kök fakat eksik/uyumsuz çekim. 0: İlişkisiz yanıt ya da yanıt yok."
      },
      {
        id: "Y012", stage: "sentence", category: "Cümle kurma",
        interaction: "clinician-score", prompt: "Bu kelimelerle bir cümle kur: çocuk – kitap – okuyor.", speak: "Bu kelimelerle bir cümle kur. Çocuk, kitap, okuyor.", stimulus: { emoji: "🧒📖", label: "Kitap okuyan çocuk" },
        expected: "Örnek: Çocuk kitap okuyor.",
        rubric: "2: Üç öğeyi anlaşılır ve dilbilgisel cümlede kullanır. 1: Anlamlı fakat eksik/bozuk yapı. 0: Öğeler arasında ilişki kuramaz veya yanıt yok."
      },
      {
        id: "Y013", stage: "narrative", category: "Dinlediğini anlama",
        prompt: "Yağmur başladı. Ece ıslanmamak için şemsiyesini açtı. Ece şemsiyeyi neden açtı?",
        speak: "Yağmur başladı. Ece ıslanmamak için şemsiyesini açtı. Ece şemsiyeyi neden açtı?",
        options: [
          { id: "A", label: "Islanmamak için", emoji: "☂️" },
          { id: "B", label: "Uyumak için", emoji: "🛏️" },
          { id: "C", label: "Yemek için", emoji: "🍽️" }
        ], correct: "A"
      },
      {
        id: "Y014", stage: "narrative", category: "Olay sıralama ve anlatı",
        interaction: "clinician-score", prompt: "Resimlere sırayla bak ve ne olduğunu anlat.", speak: "Resimlere sırayla bak ve ne olduğunu anlat.",
        stimulus: { emoji: "🌱➡️🌿➡️🌻", label: "Tohumdan çiçeğe olay dizisi" },
        expected: "Ana olaylar: tohum ekilir/büyür, bitki olur, çiçek açar.",
        rubric: "2: En az iki olayı doğru sırada ve bağlantılı anlatır. 1: Olayları adlandırır fakat sıra/bağlantı eksiktir. 0: İlişkisiz anlatım ya da yanıt yok."
      },
      {
        id: "Y015", stage: "narrative", category: "Çıkarım",
        interaction: "clinician-score", prompt: "Dondurma yere düştü. Çocuk neden üzgün olabilir?", speak: "Dondurma yere düştü. Çocuk neden üzgün olabilir?",
        stimulus: { emoji: "🍦⬇️😢", label: "Yere düşen dondurma ve üzgün çocuk" },
        expected: "Beklenen anlam: Dondurması düştüğü/onu yiyemediği için.",
        rubric: "2: Olay ile duyguyu açık neden ilişkisiyle bağlar. 1: Uygun fakat eksik neden. 0: İlişkisiz yanıt ya da yanıt yok."
      }
    ]
  }
};

// Eski sayfa ve yardımcı kodlarla geriye dönük uyumluluk.
window.TSA_STAGES = window.TSA_FORMS[window.TSA_DEFAULT_FORM].stages;
window.TSA_QUESTIONS = window.TSA_FORMS[window.TSA_DEFAULT_FORM].questions;
