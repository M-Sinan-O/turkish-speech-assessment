# Dil Bozukluğu Grubu İçin Dijital Test Tasarımı

## Amaç ve kapsam

Bu belge, mevcut konuşma sesi ağırlıklı demoyu gelişimsel dil bozukluğu araştırmasına uygun bir dijital değerlendirme prototipine dönüştürmek için hazırlanmıştır. Önerilen sistem tanı koyan bir klinik test değildir. İlk aşamada araştırma amaçlı bir dil profili ve tarama prototipi olarak kullanılmalı; standart puan, kesme puanı veya tanı etiketi üretmemelidir.

Sistem iki ayrı pilot akış içerir: **2 yaş 0 ay–3 yaş 11 ay** için yetişkin/uygulayıcı destekli erken dil formu ve **4 yaş 0 ay–7 yaş 11 ay** için çocuk odaklı dil alanı formu. İki formun ham puanları ayrı tutulur ve doğrudan karşılaştırılmaz. TEDİL'in bildirilen kullanım aralığı 2 yaş 0 ay ile 7 yaş 11 ay olsa da bu projede hazırlanan maddeler TEDİL maddelerinin dijital kopyası değildir ve TEDİL puanı olarak yorumlanamaz.

## Uygulamaya eklenen iki pilot form

| Form | Uygulama | Pilot madde | Sonuç adı |
|---|---|---:|---|
| 2–3 yaş | Yetişkin/uygulayıcı destekli; büyük görseller, kısa yönergeler ve canlı sözlü yanıt puanlama | 10 | Erken dil profili |
| 4–7 yaş | Çocuk seçmeli görevleri yapar; uygulayıcı ifade edici görevleri canlı puanlar | 15 | Dil alanı profili |

Bu madde sayıları yazılım akışını, ekran boyutunu ve puanlama biçimini denemek içindir. Aşağıdaki 28 maddelik yapı, uzman içerik kurulu ve pilot çalışma sonrasında hazırlanacak araştırma formu için hedef tasarımdır.

## Kaynaklardan çıkarılan tasarım ilkeleri

### TinyTap materyalleri

Sağlanan TinyTap bağlantı listesi 1-7 yaş aralığını alıcı dil ve ifade edici dil olarak ikiye ayırmaktadır. İncelenen etkinliklerde şu etkileşim türleri görülmüştür:

- **Questions:** İşitsel yönergeye göre görsel seçme.
- **Soundboard:** Görsele dokununca sözcük veya model yanıtı dinleme.
- **Puzzle:** Parçaları veya görselleri anlamlı bir bütün içinde eşleme.
- **Reading:** Görsel ya da kısa metin üzerinden anlama.
- **Tap n Type:** Daha büyük çocuklarda yazılı yanıt veya seçim.

Bir yaş ifade edici dil örneği 11 etkinlikte giderek zorlaşmaktadır: sosyal tepkiyi gözleme, görselden sözcük/eylem adlandırma, modeli taklit etme, görsel ipucu olmadan tekrar, tek görselle “Bu nedir?” sorusu ve son olarak birden çok görsel arasında adlandırma. Bu ilerleme, prototipte **önce bağımsız yanıt, sonra standartlaştırılmış ipucu ve model** sırasının kullanılmasını destekler.

### KSB ve Wordwall materyalleri

KSB bağlantı listesi /ç/, /s/, /k/, /g/, /n/, /y/, /v/, /p/, /h/, /r/, /m/, /l/, /c/, /f/, /j/, /ş/, /t/, /b/, /z/, /d/ ve /l-r-y/ ses kümelerini içermektedir. İncelenen örnekler üç tekrarlanan görev biçimi göstermiştir:

1. Hedef sesi içeren resmi bulma.
2. Sözcüğü dinleme, tekrar etme ve görselle eşleme.
3. Hedef sesin sözcük ya da cümledeki yerini fark etme.

Bu görevler konuşma sesi ve sesbilgisel farkındalık için yararlıdır; ancak tek başına dil bozukluğunun anlambilim, biçimbilgisi, sözdizimi ve söylem boyutlarını ölçmez. Bu nedenle ana testin dışında **isteğe bağlı sesbilgisel farkındalık modülü** olarak tutulmalıdır.

## Önerilen test akışı

4–7 yaş araştırma formunun hedef sürümü bir alıştırma ekranı ve beş puanlanan aşamadan oluşur. Uzman incelemesi sonrasında toplam 28 puanlanan görev önerilir. Yaklaşık uygulama süresi 20-25 dakikadır; üçüncü aşamadan sonra kısa ara verilmelidir.

2–3 yaş formu daha kısa tutulur: sözcük anlama, eylem/kısa cümle anlama, sözcük-eylem adlandırma ve iki sözcüklü ifade olmak üzere dört kısa bölüm halinde uygulanır. Çocuğun yorulduğu veya ortak dikkat kuramadığı durumda uygulayıcı formu durdurur; eksik uygulama tam puanla karşılaştırılmaz.

| Aşama | İçerik | Görev biçimi | Madde | Puanlama |
|---|---|---|---:|---|
| 0 | Tanışma ve cihaz alıştırması | Sesi dinle, büyük görsele dokun | 3 alıştırma | Puanlanmaz |
| 1 | Alıcı sözcük bilgisi ve anlamsal ilişkiler | Sözcüğü dinle, 3-4 görselden seç | 6 | Otomatik 0/1 |
| 2 | Cümle anlama, biçimbilgisi ve yönerge takibi | Cümleyi dinle, uygun sahneyi seç veya tek/iki adımlı yönergeyi uygula | 6 | Otomatik 0/1 |
| 3 | İfade edici sözcük ve eylem adlandırma | Büyük görsele bakarak nesne ya da eylemi söyle | 6 | Uygulayıcı 0/1/2 |
| 4 | Cümle tamamlama ve cümle tekrarı | Eksik cümleyi tamamla veya duyduğun cümleyi tekrar et | 6 | Uygulayıcı 0/1/2 |
| 5 | Dinlediğini anlama ve anlatı | Kısa öyküyü dinle, soruları yanıtla ve resim dizisini anlat | 4 | Seçim 0/1 ve uygulayıcı 0/1/2 |

### Aşama 0 Tanışma ve alıştırma

- Amaç, dil becerisinden önce çocuğun sesi duyabildiğini, ekrana dokunabildiğini ve görev mantığını anladığını doğrulamaktır.
- Bir doğru seçim örneği, bir ses tekrar düğmesi kullanımı ve bir sözlü yanıt örneği yapılır.
- Başarısızlık test puanına girmez. Uygulayıcı yönergeyi yeniden açıklar.

### Aşama 1 Alıcı sözcük bilgisi ve anlamsal ilişkiler

- İlk maddelerde sık kullanılan somut adlar; daha sonra eylemler, nitelikler ve ilişkisel kavramlar kullanılır.
- Her hedef için anlamsal olarak yakın bir çeldirici, sesçe yakın bir çeldirici ve ilişkisiz bir çeldirici hazırlanır.
- 4-5 yaş formunda seçenek sayısı önce iki, sonra üç olabilir. 6-7 yaş formunda üç veya dört seçenek kullanılabilir.
- Görseller aynı boyutta, aynı görsel üslupta ve kültürel olarak tanınabilir olmalıdır.

### Aşama 2 Cümle anlama, biçimbilgisi ve yönerge takibi

- Kolaydan zora doğru tek sözcüklü kavram, kısa cümle, tek adımlı yönerge ve iki adımlı yönerge sırası izlenir.
- Türkçe için çoğul, olumsuzluk, iyelik, durum ekleri, zaman/görünüş ve sözcük sırası gibi yapılar uzman görüşüyle örneklenir.
- Doğru görsel yalnızca tek bir dilsel özelliğe göre ayrışmalıdır; resim ayrıntısı ya da dünya bilgisi cevabı ele vermemelidir.

### Aşama 3 İfade edici sözcük ve eylem adlandırma

- Tek ve büyük bir görsel gösterilir. Önce “Bu ne?” veya “Ne yapıyor?” sorusu sorulur.
- Ses kaydı zorunlu değildir. Çocuğun cevabını uygulayıcı ekrandaki **doğru**, **kısmen doğru** veya **yanlış/yanıt yok** düğmeleriyle işaretler.
- Kabul edilebilir eş anlamlılar ve ağız farklılıkları her madde için önceden hazırlanmış puanlama anahtarında gösterilir.
- Otomatik konuşma tanıma ilk pilotun parçası olmamalıdır.

### Aşama 4 Cümle tamamlama ve cümle tekrarı

- Cümleler kısa ve tek yapılı örneklerle başlar; daha sonra ek, sözcük sırası ve yan cümle yükü artar.
- İlk dinleme standart kayıttan yapılır. Bir kez yeniden dinleme hakkı ayrı bir değişken olarak kaydedilir.
- Uygulayıcı içerik ve dilbilgisi doğruluğunu maddeye özel rubrikle puanlar.
- Çocuğun söyleyiş hatası hedef dil yapısını değiştirmiyorsa dil puanından düşülmez; gerekirse konuşma sesi modülünde ayrıca işaretlenir.

### Aşama 5 Dinlediğini anlama ve anlatı

- Önce kısa öykü dinletilir ve açık bilgi soruları sorulur; sonra neden-sonuç ya da çıkarım sorusuna geçilir.
- Son görevde iki veya üç resimlik olay dizisi sunulur ve çocuk anlatır.
- Olay sırası, ana fikir, bağlaç kullanımı ve anlaşılabilirlik ayrı gözlem alanları olarak kaydedilir.
- Anlatı görevi tanısal karar vermek için tek başına kullanılmaz.

## Standart ipucu basamakları

Her maddede ilk yanıt asıl performans puanıdır. Yanlış ya da yanıtsız durumda aşağıdaki sıra uygulanır:

1. Yönergeyi aynı ses kaydıyla bir kez tekrar etme.
2. Görsel alanını sadeleştirme veya hedef bölgeyi kısa süreli vurgulama.
3. Anlamsal ipucu verme.
4. Doğru modeli dinletme ve çocuktan tekrar isteme.

İpucundan sonra verilen doğru yanıt bağımsız doğru olarak sayılmaz. Bunun yerine `cue_level` ve `assisted_correct` alanlarına yazılır. Böylece toplam doğruluğun yanında çocuğun yardıma ne kadar yanıt verdiği de incelenebilir.

## 4–7 yaş içinde güçlük ayarı

### 4 yaş 0 ay ile 5 yaş 11 ay

- Daha kısa yönergeler ve en fazla üç görsel seçeneği.
- Günlük nesneler, temel eylemler ve somut ilişkiler.
- İki resimli olay dizisi ve kısa cümle tekrarı.

### 6 yaş 0 ay ile 7 yaş 11 ay

- Üç-dört seçenek, daha yakın çeldiriciler ve iki adımlı yönergeler.
- Biçimbilgisel karşıtlıklar, zaman ilişkileri ve daha uzun cümleler.
- Üç-dört resimli olay dizisi, neden-sonuç ve basit çıkarım soruları.

İlk yazılım prototipinde 4–7 yaş için ortak bir içerik akışı bulunur. Uzman madde analizi sonrasında bu iki güçlük düzeyi ayrı alt form veya başlangıç/tavan kuralı olarak uygulanabilir. Ham puanlar pilot ve norm çalışması tamamlanmadan yaş normlarına dönüştürülmemelidir.

## İsteğe bağlı sesbilgisel farkındalık modülü

KSB materyallerindeki yapı, ana testten sonra 6-9 maddelik ayrı bir modüle dönüştürülebilir:

1. Hedef sesi duy ve uygun resmi bul.
2. Sözcüğü dinle ve görselle eşle.
3. Sesin başta, ortada veya sonda olduğunu seç.

Bu modül, eşlik eden konuşma sesi güçlüğünü ya da sesbilgisel farkındalığı betimler. Ana dil bozukluğu toplam puanına eklenmez.

## Puanlama ve kaydedilecek veriler

Her madde için aşağıdaki alanlar tutulmalıdır:

- katılımcı kodu ve yaşın ay olarak değeri;
- yaş formu ve dil alanı;
- ilk yanıtın doğruluğu;
- uygulayıcı puanı ve kısa hata kodu;
- kullanılan ipucu düzeyi;
- ipucundan sonra başarı;
- yanıt süresi;
- sesin yeniden oynatılma sayısı;
- uygulamayı etkileyen dikkat, cihaz veya ortam notu.

İsim, yüz görüntüsü ve ses kaydı varsayılan olarak tutulmamalıdır. İfade edici görevler ses kaydı olmadan canlı puanlanabilir. Araştırma ayrıca kayıt gerektirirse bunun için ayrı etik onay, açık onam, saklama süresi ve erişim politikası tanımlanmalıdır.

## Görsel ve ses standartları

- Her ekranda tek görev, kısa yönerge ve büyük dokunma alanları bulunmalıdır.
- Telefon görünümünde görsel kartlar tek sütuna düşmeli; tablet/masaüstünde en fazla dört seçenek gösterilmelidir.
- Emoji yerine telifi uygun, aynı üslupta ve en az 1024 piksel kaynak görseller kullanılmalıdır.
- Her yönerge insan tarafından gözden geçirilmiş standart Türkçe ses kaydıyla sunulmalıdır.
- Otomatik oynatma bir kez yapılmalı; çocuk sesi kendi isteğiyle yeniden dinleyebilmelidir.
- Ses şiddeti, hız ve kayıt kalitesi bütün maddelerde aynı olmalıdır.
- Doğru/yanlış geri bildirimi ölçüm sırasında cevabı öğretmemeli; pekiştirme yalnızca alıştırma veya öğretim bölümünde kullanılmalıdır.

## Araştırma ve doğrulama planı

1. DKT uzmanları her alan için özgün madde havuzu ve puanlama anahtarı hazırlar.
2. Telifli TEDİL/TİFALDİ maddeleri, TinyTap görselleri ve Wordwall içerikleri kopyalanmaz; yalnızca görev biçimlerinden yararlanılır.
3. 8-12 çocukla kullanılabilirlik pilotu yapılır; yönerge anlaşılması, görsel büyüklüğü, ses kalitesi ve yorgunluk gözlenir.
4. Dil bozukluğu tanılı ve yaşça eşleştirilmiş tipik gelişim grubuyla madde güçlüğü ve ayırt edicilik incelenir.
5. İfade edici maddelerin en az yüzde 20'si ikinci bir DKT tarafından bağımsız puanlanarak puanlayıcılar arası uyum hesaplanır.
6. İç tutarlılık, test-tekrar test güvenirliği, yakınsak geçerlik ve uygun kesme puanı ayrı bir geçerlik çalışmasıyla belirlenir.
7. Bu çalışmalar tamamlanana kadar sonuç ekranı yalnızca alan bazlı ham performans ve ipucu profili gösterir; “tanı var/yok” yazmaz.

Pilotun ilk sürümünde bütün maddeler uygulanmalıdır. Madde güçlükleri belirlendikten sonra aynı alanda art arda dört bağımsız yanlışta o alanı sonlandıran uyarlanabilir bir tavan kuralı ayrıca değerlendirilebilir.

## Mevcut web uygulamasındaki durum

Yaş formu seçimi, seçmeli sorular, uygulayıcı 0/1/2 puanlaması, yardım düzeyi, yeniden dinleme sayısı ve alan bazlı sonuç ekranı teknik prototipe eklenmiştir. Bunlar araştırma içeriğinin doğrulandığı anlamına gelmez. Gerçek veri toplamadan önce içerik kurulu aşağıdaki kararları onaylamalıdır:

1. Ana yaş aralığı ve iki yaş formunun sınırı.
2. Her dil alanında hedeflenen Türkçe yapılar.
3. Kabul edilebilir yanıtlar ve 0/1/2 puanlama rubriği.
4. Kullanılacak özgün görsellerin lisansı.
5. Standart ses kayıtlarının son metinleri.

Onaydan sonra örnek emoji ve metinler özgün lisanslı görseller, sabit ses kayıtları ve maddeye özel nihai rubriklerle değiştirilmelidir.

## Bilimsel dayanaklar

- Bishop, D. V. M. ve arkadaşları. CATALISE Phase 2: Dil bozukluğu, günlük işlevi etkileyen ve kötü prognozla ilişkili kalıcı dil güçlükleri için kullanılmalıdır. https://pmc.ncbi.nlm.nih.gov/articles/PMC5638113/
- American Speech-Language-Hearing Association. Spoken Language Disorders: değerlendirme; sesbilgisi, anlambilim, biçimbilgisi, sözdizimi, pragmatik ve söylem düzeyini kapsamalıdır. https://www.asha.org/practice-portal/clinical-topics/spoken-language-disorders/
- Hulme ve arkadaşları. LanguageScreen: dijital taramada ifade edici sözcük bilgisi, alıcı sözcük bilgisi, cümle tekrarı/dilbilgisi ve dinlediğini anlama alanlarının birlikte örneklenmesi. https://discovery.ucl.ac.uk/id/eprint/10195214/2/West_2024_LSHSS-24-00004.pdf
- Topbaş ve Güven uyarlamasını aktaran çalışma: TEDİL'in 2 yaş 0 ay ile 7 yaş 11 ay aralığında alıcı ve ifade edici dil, anlambilim, sözdizimi ve biçimbilgisi alanlarını değerlendirmesi. https://dergipark.org.tr/tr/download/article-file/700875
- ASHA Telepractice Considerations: uzaktan veya dijital uygulama için eşdeğerlik kanıtı olmayan standart testlerin geçerliği sorgulanır; değişiklikler belgelenmeli ve yayıncı izni kontrol edilmelidir. https://www.asha.org/slp/clinical/considerations-for-speech-language-and-cognitive-assessment-via-telepractice/
