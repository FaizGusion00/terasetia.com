const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const mobileCta = document.querySelector('.mobile-cta');
const visibleVisuals = new Set();

const updateMobileCta = () => {
  mobileCta?.classList.toggle('visible', window.scrollY > 520 && visibleVisuals.size === 0);
};

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 10);
  updateMobileCta();
}, { passive: true });

if ('IntersectionObserver' in window) {
  const visualObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleVisuals.add(entry.target);
      else visibleVisuals.delete(entry.target);
    });
    updateMobileCta();
  }, { threshold: 0.22 });

  document.querySelectorAll('.product-media, .automation-ui-card, .owner-image, .wide-screenshot').forEach((visual) => visualObserver.observe(visual));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.documentElement.classList.add('reveal-ready');
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  });
}

menuButton?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
});

const closeMenu = () => {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Buka menu');
};

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-cta]').forEach((cta) => {
  cta.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'cta_click', cta_location: cta.dataset.cta });
  });
});

const englishText = {
  'Terus ke kandungan': 'Skip to content',
  'Baru:': 'New:',
  'Bina automation dengan AI': 'Build automations with AI',
  'Lihat AI Generator': 'See AI Generator',
  'Kelebihan': 'Benefits',
  'Cara berfungsi': 'How it works',
  'Harga': 'Pricing',
  'Log masuk': 'Log in',
  'Mula percuma': 'Start free',
  'WhatsApp Growth & Operations untuk Malaysia': 'WhatsApp Growth & Operations for Malaysian Businesses',
  'Satu sistem WhatsApp untuk': 'One WhatsApp system for',
  'dan follow-up.': 'and follow-up.',
  'Bina automation dengan AI, jawab pertanyaan 24/7, susun customer dalam CRM dan gerakkan tindakan seterusnya—untuk bisnes produk, servis, appointment atau sales team.': 'Build AI automations, answer enquiries 24/7, organise customers in a CRM and move every next action forward—for product businesses, services, appointments or sales teams.',
  'Lihat cara ia berfungsi': 'See how it works',
  '✓ Tiada kad diperlukan': '✓ No card required',
  '✓ Setup tanpa coding': '✓ No-code setup',
  'Messaging yang lebih selamat': 'Safer, official messaging',
  'Automasi tanpa hilang sentuhan': 'Automate without losing the human touch',
  'Semua dalam satu': 'Everything in one place',
  'Chat, CRM, order dan follow-up': 'Chat, CRM, orders and follow-up',
  'Dibina untuk Malaysia': 'Built for Malaysia',
  'Bahasa, workflow dan support lokal': 'Local language, workflows and support',
  'Masalah sebenar owner': 'The real problem for business owners',
  'Berapa banyak peluang terlepas kerana lambat reply dan lupa tindakan seterusnya?': 'How many opportunities are lost to slow replies and forgotten next steps?',
  'Apabila chat, lead, booking, order dan follow-up berada di tempat berbeza, owner tetap perlu memantau semuanya sendiri.': 'When chats, leads, bookings, orders and follow-ups live in different places, the owner still has to monitor everything manually.',
  'Customer menunggu terlalu lama': 'Customers wait too long',
  'Pertanyaan masuk ketika team sibuk atau selepas waktu bekerja.': 'Enquiries arrive while the team is busy or after business hours.',
  'Lead dan booking hilang dalam chat': 'Leads and bookings get lost in chat',
  'Tiada pipeline jelas untuk tahu siapa perlu di-follow-up.': 'There is no clear pipeline showing who needs follow-up.',
  'Team buat kerja berulang': 'The team repeats the same work',
  'Soalan, reminder, booking dan status pesanan dijawab satu persatu.': 'Questions, reminders, bookings and order updates are handled one by one.',
  'Satu customer journey': 'One connected customer journey',
  'Daripada mesej pertama hingga tindakan seterusnya—semuanya bersambung.': 'From the first message to the next action—everything stays connected.',
  'Sama ada matlamat anda ialah lead, appointment, bayaran atau order, Terasetia menyatukan proses yang biasanya memerlukan banyak aplikasi.': 'Whether your goal is a lead, appointment, payment or order, Terasetia connects processes that normally require multiple apps.',
  'Customer masuk': 'Customer enters',
  'AI jawab & tapis': 'AI responds & qualifies',
  'Team ambil alih': 'Team takes over',
  'Booking, order atau follow-up': 'Booking, order or follow-up',
  'Describe sahaja. AI bina flow yang boleh anda edit.': 'Describe it. AI builds a flow you can edit.',
  'Pilih FAQ, lead, booking atau order. TeraAI hasilkan draft—anda semak sebelum live.': 'Choose FAQ, lead, booking or order. TeraAI creates a draft for you to review before going live.',
  'Nampak semua flow. Hidupkan bila bersedia.': 'See every flow. Activate it when ready.',
  'Di dalam flow': 'Inside the flow',
  'Customer mesej. Sistem terus bertindak.': 'Customer messages. The system takes action.',
  'Flow mengumpul maklumat, mengikut pilihan customer, memproses bayaran dan menghantar order ke OMS secara automatik.': 'Flows collect customer details, follow their choices, process payment and send orders to the OMS automatically.',
  'Prospek belum balas? Follow-up terus berjalan.': 'No reply from the prospect? Follow-up keeps running.',
  'Follow-up bermula berdasarkan tag, status order atau flow—dan berhenti secara automatik apabila objektif tercapai.': 'Follow-up starts from a tag, order status or flow—and stops automatically when the objective is reached.',
  'Hantar mesej yang tepat kepada customer yang tepat.': 'Send the right message to the right customer.',
  'Bahagikan customer mengikut kumpulan, gunakan template Meta yang diluluskan dan pantau status mesej dihantar, diterima serta dibaca.': 'Segment customers, use approved Meta templates and track sent, delivered and read status.',
  'Otak Chatbot': 'Chatbot Brain',
  'Customer bertanya. Sistem pilih jawapan yang paling sesuai.': 'Customers ask. The system selects the most suitable answer.',
  'Soalan biasa dijawab melalui flow atau keyword. Jika tiada jawapan yang sepadan, TeraAI membantu—dan team boleh ambil alih bila perlu.': 'Common questions are answered through flows or keywords. If nothing matches, TeraAI helps—and your team can take over whenever needed.',
  'Satu bot utama. Pakar berbeza untuk setiap topik.': 'One main bot. Different specialists for every topic.',
  'Route pricing, booking atau support kepada subchatbot yang paling sesuai.': 'Route pricing, booking or support enquiries to the most suitable sub-chatbot.',
  'WhatsApp ke OMS': 'WhatsApp to OMS',
  'Daripada “nak order” terus menjadi pesanan dalam TeraOrder.': 'Turn “I want to order” into a TeraOrder order.',
  'Kumpul detail, pilih COD atau CHIP, kemudian cipta order hanya selepas status disahkan.': 'Collect details, choose COD or CHIP, then create the order only after confirmation.',
  'Sales Pipeline Fleksibel': 'Flexible Sales Pipeline',
  'Setiap prospek jelas berada di peringkat mana.': 'Know exactly where every prospect stands.',
  'Susun database customer mengikut proses bisnes anda. Nama stage boleh ditukar dan contact boleh dipindahkan apabila deal bergerak.': 'Organise your customer database around your own sales process. Rename stages and move contacts as each deal progresses.',
  'Nama stage boleh tukar': 'Rename every stage',
  'Pindah contact': 'Move contacts',
  'TeraChat untuk Android': 'TeraChat for Android',
  'Laptop tutup, operasi WhatsApp tetap berjalan.': 'Close the laptop. WhatsApp operations keep running.',
  'Layan WhatsApp rasmi, lihat tags dan ambil alih daripada AI terus dari Android.': 'Handle official WhatsApp conversations, view tags and take over from AI directly on Android.',
  'Cuba Terasetia percuma': 'Try Terasetia free',
  'Bukan untuk satu jenis bisnes sahaja': 'Built for more than one type of business',
  'Jika customer menghubungi anda melalui WhatsApp, Terasetia boleh membantu.': 'If customers contact you on WhatsApp, Terasetia can help.',
  'Klinik & kecantikan': 'Clinics & beauty',
  'Property & automotive': 'Property & automotive',
  'Servis & konsultasi': 'Services & consulting',
  'Retail & wholesale': 'Retail & wholesale',
  'Pendidikan & latihan': 'Education & training',
  'Setup tanpa coding': 'No-code setup',
  'Daripada idea kepada automation dalam empat langkah.': 'Go from idea to automation in four steps.',
  'Sambung WhatsApp': 'Connect WhatsApp',
  'Masukkan konteks': 'Add your business context',
  'Generate dengan AI': 'Generate with AI',
  'Uji & aktifkan': 'Test & activate',
  'Satu platform': 'One platform',
  'Dan semua tools penting dalam satu tempat.': 'All the essential tools in one place.',
  'Harga yang mudah difahami': 'Straightforward pricing',
  'Mula percuma. Upgrade apabila bersedia untuk live.': 'Start free. Upgrade when you are ready to go live.',
  'Terokai sistem dahulu tanpa kad dan tanpa trial yang tamat.': 'Explore the platform first—no card and no expiring trial.',
  'Untuk mula': 'To get started',
  'Cuba CRM, chatbot playground dan asas platform.': 'Explore the CRM, chatbot playground and platform essentials.',
  'selamanya': 'forever',
  '100 contact conversations': '100 contact conversations',
  'Basic analytics dan CRM': 'Basic analytics and CRM',
  'Webhooks dan API access': 'Webhooks and API access',
  'Paling popular': 'Most popular',
  'Untuk bisnes yang mahu berkembang': 'For growing businesses',
  'Live WhatsApp, AI dan automation untuk team sales.': 'Live WhatsApp, AI and automation for sales teams.',
  '/ bulan': '/ month',
  'Lebih kurang RM4 sehari': 'About RM4 per day',
  'Aktifkan Terasetia Pro': 'Activate Terasetia Pro',
  'Unlimited contact conversations': 'Unlimited contact conversations',
  'Full analytics, CRM dan pipeline': 'Full analytics, CRM and pipeline',
  'AI chatbot dan automation sequences': 'AI chatbot and automation sequences',
  'Webhooks, API dan TeraOrder': 'Webhooks, API and TeraOrder',
  'Caj Meta/WhatsApp, broadcast wallet, AI token atau add-on tertentu mungkin berasingan mengikut penggunaan. Semak butiran semasa sebelum mengaktifkan pelan.': 'Meta/WhatsApp usage, broadcast wallet, AI tokens or selected add-ons may be charged separately. Check the latest details before activating a plan.',
  'Soalan biasa': 'Frequently asked questions',
  'Sebelum anda sambungkan WhatsApp.': 'Before connecting WhatsApp.',
  'Masih ada soalan? Mulakan Free Forever dan terokai dashboard dahulu.': 'Still have questions? Start with Free Forever and explore the dashboard.',
  'Buka akaun percuma →': 'Create a free account →',
  'Adakah Terasetia menggunakan WhatsApp rasmi?': 'Does Terasetia use the official WhatsApp platform?',
  'Ya. Terasetia dibina untuk laluan WhatsApp Business API dengan approved templates, quality monitoring dan messaging limits daripada Meta.': 'Yes. Terasetia is built for the WhatsApp Business API with Meta-approved templates, quality monitoring and messaging limits.',
  'Boleh kekalkan nombor WhatsApp Business sedia ada?': 'Can I keep my existing WhatsApp Business number?',
  'Terasetia menyediakan pilihan Coexistence untuk nombor yang layak, atau anda boleh menggunakan nombor baru melalui Cloud API. Kelayakan akan disemak semasa sambungan.': 'Terasetia offers Coexistence for eligible numbers, or you can use a new number through the Cloud API. Eligibility is checked during connection.',
  'Adakah saya perlu tahu coding?': 'Do I need to know how to code?',
  'Tidak. Nombor, templates, chatbot, automation dan campaigns boleh dikonfigurasi melalui dashboard.': 'No. Numbers, templates, chatbots, automations and campaigns can be configured through the dashboard.',
  'Apa yang AI Automation Generator boleh bina?': 'What can the AI Automation Generator build?',
  'Anda boleh meminta AI menyediakan draft flow untuk FAQ, lead qualification, booking atau appointment, serta order dengan COD atau bayaran online. Draft boleh diedit dan tidak akan live sehingga anda mengaktifkannya.': 'You can ask AI to draft flows for FAQs, lead qualification, bookings or appointments, and orders with COD or online payment. Drafts remain editable and do not go live until you activate them.',
  'Adakah Terasetia hanya untuk bisnes ecommerce?': 'Is Terasetia only for ecommerce businesses?',
  'Tidak. Flow boleh disesuaikan untuk bisnes servis, klinik, kecantikan, property, automotive, pendidikan, retail dan mana-mana operasi yang menerima pertanyaan atau lead melalui WhatsApp.': 'No. Flows can be adapted for services, clinics, beauty, property, automotive, education, retail and any operation that receives enquiries or leads through WhatsApp.',
  'Bila AI akan serahkan chat kepada manusia?': 'When will AI hand a chat over to a person?',
  'AI boleh menyerahkan conversation apabila tidak yakin, apabila flow menetapkan handover atau apabila agent memilih Intervene.': 'AI can hand over a conversation when confidence is low, when a flow requests handover or when an agent selects Intervene.',
  'Boleh urus WhatsApp tanpa membuka laptop?': 'Can I manage WhatsApp without opening a laptop?',
  'Ya. TeraChat untuk Android membolehkan team melihat inbox, filter conversation, melihat CRM tags dan mengambil alih chat daripada AI.': 'Yes. TeraChat for Android lets your team view the inbox, filter conversations, see CRM tags and take over chats from AI.',
  'Ada caj lain selain langganan?': 'Are there charges beyond the subscription?',
  'Penggunaan Meta/WhatsApp, broadcast wallet, AI tokens dan add-ons boleh mempunyai caj berasingan. Kos sebenar bergantung pada penggunaan dan kategori mesej.': 'Meta/WhatsApp usage, broadcast wallet, AI tokens and add-ons may carry separate charges. Actual cost depends on usage and message category.',
  'Mula hari ini': 'Start today',
  'Jangan biarkan peluang customer berhenti setakat satu chat.': 'Do not let a customer opportunity end with one chat.',
  'Bina sistem WhatsApp yang menjawab, menyusun lead, mengurus booking atau order dan membuat follow-up bersama team anda.': 'Build a WhatsApp system that answers, organises leads, manages bookings or orders and follows up alongside your team.',
  'Mula percuma sekarang': 'Start free now',
  'Lihat pelan': 'View plans',
  '✓ Tiada kad': '✓ No card',
  '✓ Tiada trial expiry': '✓ No trial expiry',
  '✓ Upgrade bila bersedia': '✓ Upgrade when ready',
  'Sistem WhatsApp untuk lead, booking, order dan follow-up bisnes Malaysia.': 'A WhatsApp system for leads, bookings, orders and follow-up for Malaysian businesses.',
  'Create account': 'Create account',
  'Kembali ke atas ↑': 'Back to top ↑',
  'Mula percuma →': 'Start free →'
};

const englishAttributes = {
  'Terasetia halaman utama': 'Terasetia home',
  'Buka menu': 'Open menu',
  'Navigasi utama': 'Main navigation',
  'Pilih bahasa': 'Choose language',
  'Kelebihan utama': 'Key benefits',
  'Tindakan mudah alih': 'Mobile action',
  'Pelbagai jenis bisnes Malaysia mengurus customer melalui sistem WhatsApp': 'Malaysian businesses managing customers through a WhatsApp system',
  'Owner bisnes mengurus chat, pesanan dan spreadsheet secara manual': 'Business owner manually managing chats, orders and spreadsheets',
  'Aliran broadcast, AI, human takeover, CRM, order dan follow-up': 'Flow connecting broadcasts, AI, human takeover, CRM, orders and follow-up',
  'AI Flow Generator sebenar dalam Terasetia': 'The real AI Flow Generator inside Terasetia',
  'Senarai automation flows sebenar dalam Terasetia': 'Real automation flows inside Terasetia',
  'Flow automation Terasetia yang tersusun dari trigger hingga tindakan': 'A structured Terasetia automation flow from trigger to action',
  'Automated sequences sebenar dalam Terasetia': 'Real automated sequences inside Terasetia',
  'Broadcast builder Terasetia dengan audience dan delivery status': 'Terasetia broadcast builder with audience and delivery status',
  'Keutamaan jawapan chatbot sebenar dalam Terasetia': 'Real chatbot response priority inside Terasetia',
  'Paparan Sub-chatbots sebenar dalam Terasetia': 'Real Sub-chatbots screen inside Terasetia',
  'Senarai order sebenar dalam TeraOrder dengan sumber WhatsApp, pembayaran dan status pesanan': 'Real TeraOrder list with WhatsApp sources, payments and order statuses',
  'Sales Pipeline Terasetia dengan database prospek pada setiap peringkat': 'Terasetia Sales Pipeline with prospect records at every stage',
  'TeraChat dalam light mode, dark mode dan paparan human intervention': 'TeraChat in light mode, dark mode and human intervention view',
  'Klinik, automotive dan professional services menggunakan sistem WhatsApp': 'Clinics, automotive and professional services using a WhatsApp system',
  'Owner bisnes mengurus sales melalui telefon sementara team memproses order': 'Business owner managing sales by phone while the team processes orders'
};

const pageCopy = {
  ms: {
    title: 'Terasetia — Sistem Sales WhatsApp Untuk Bisnes Malaysia',
    description: 'Terasetia mengautomasi pertanyaan, lead, booking, follow-up, pembayaran dan order melalui WhatsApp rasmi untuk pelbagai jenis bisnes Malaysia.'
  },
  en: {
    title: 'Terasetia — WhatsApp Sales System for Malaysian Businesses',
    description: 'Terasetia automates enquiries, leads, bookings, follow-ups, payments and orders through official WhatsApp for Malaysian businesses.'
  }
};

const textTargets = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
    if (node.parentElement?.closest('script, style')) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }
});

while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  textTargets.push({ node, original: node.nodeValue, key: node.nodeValue.trim() });
}

const attributeTargets = [];
document.querySelectorAll('[alt], [aria-label], [title]').forEach((element) => {
  ['alt', 'aria-label', 'title'].forEach((attribute) => {
    if (element.hasAttribute(attribute)) {
      attributeTargets.push({ element, attribute, original: element.getAttribute(attribute) });
    }
  });
});

const languageButtons = document.querySelectorAll('[data-language]');

const applyLanguage = (language, updateUrl = true) => {
  const lang = language === 'en' ? 'en' : 'ms';
  document.documentElement.lang = lang;
  document.title = pageCopy[lang].title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pageCopy[lang].description);

  textTargets.forEach(({ node, original, key }) => {
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${lang === 'en' ? (englishText[key] || key) : key}${trailing}`;
  });

  attributeTargets.forEach(({ element, attribute, original }) => {
    element.setAttribute(attribute, lang === 'en' ? (englishAttributes[original] || original) : original);
  });

  languageButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === lang));
  });

  try { localStorage.setItem('terasetia-language', lang); } catch (_) {}
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState({}, '', url);
  }
};

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.language));
});

const urlLanguage = new URLSearchParams(window.location.search).get('lang');
let savedLanguage = 'ms';
try { savedLanguage = localStorage.getItem('terasetia-language') || 'ms'; } catch (_) {}
applyLanguage(urlLanguage || savedLanguage, Boolean(urlLanguage));
