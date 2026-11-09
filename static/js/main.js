document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ------------------------------------------------------------------
    // 0. I18N
    // English lives statically in index.html (readable by ATS / crawlers
    // without JavaScript). Only the Turkish strings are kept here; the
    // English originals are captured from the DOM on first load.
    // ------------------------------------------------------------------
    const tr = {
        "nav.skills": "Yetenekler",
        "nav.experience": "Deneyim",
        "nav.projects": "Projeler",
        "nav.education": "Eğitim",
        "nav.book": "İncelemeler",
        "nav.contact": "İletişim",
        "hero.badge": "AI / LLM Engineer pozisyonlarına açığım.",
        "hero.location": "Ankara, Türkiye",
        "hero.summary": "Agentic sistemleri, RAG pipeline'larını ve LLM değerlendirme araçlarını uçtan uca geliştiren; klasik ML ve MLOps temeline sahip bir AI/LLM Engineer'ım. TRK Technology'de sıfırdan kurduğum kurumsal MLOps platformu, 5+ kişilik data scientist ekibi için <strong>pipeline kurulum süresini günlerden ~10 dakikaya indirdi</strong>. Son çalışmalarım arasında prompt-injection guardrail'leri ve sayısal doğrulama (numeric grounding) içeren MCP-native bir multi-agent araştırma sistemi ile zaman serilerini edge donanımda küçük dil modelleri için sembolik bir dil olarak modelleyen yüksek lisans tezim (GPA 4.00) var.",
        "hero.readBook": "Proje incelemeleri",
        "hero.printCv": "Yazdırılabilir CV",
        "currently.thesis": "Yüksek lisans tezim fizibilite aşamasını tamamladı. Şimdi tezin çekirdek sembolik zaman serisi kütüphanesini geliştiriyorum.",
        "currently.agentic": "Agentic Investing Engine yayına hazırdır. Bulut yayını bir KVKK veri koruma incelemesini bekliyor.",
        "currently.jobsearch": "AI / LLM Engineer pozisyonlarına açığım.",
        "skills.heading": "Yetenekler",
        "skills.card1.title": "Agentic AI ve LLM'ler",
        "skills.card2.title": "RAG, Değerlendirme ve Guardrail'ler",
        "skills.card3.title": "ML ve Zaman Serileri",
        "skills.card4.title": "Yazılım Mühendisliği ve MLOps",
        "skills.card5.title": "Frontend ve Diğer",
        "skills.familiar": "Temel düzeyde:",
        "experience.heading": "İş Deneyimi",
        "loc.ankara": "Ankara",
        "loc.istanbul": "İstanbul",
        "exp.caseStudy": "Detaylı incelemeyi oku",
        "exp1.title": "Yazılım Mühendisi (AI Sistemleri ve MLOps Platformu)",
        "exp1.b1": "5+ kişilik data scientist ekibi tüm deep learning deneylerini elle yürütüyordu. Sıfırdan bir iç MLOps platformu (FastAPI + PostgreSQL + Vue.js) geliştirerek <strong>pipeline kurulum süresini günlerden ~10 dakikaya indirdim</strong>.",
        "exp1.b2": "Her deney için pipeline tanımlamak tekrarlayan boilerplate gerektiriyordu. Ön işleme ve değerlendirme pipeline'larını görsel olarak kurup çalıştırmayı sağlayan DAG tabanlı bir orkestrasyon motoru (Vue Flow) tasarlayarak <strong>konfigürasyon süresini tahmini %60 azalttım</strong>.",
        "exp1.b3": "Ekibin train/test ayırma stratejisinde kritik bir veri sızıntısı (data leakage) riski tespit ettim, ekibi çözüm üzerinde uzlaştırdım ve sürüm kontrollü dallanma ile lineage takibi sunan bir Dataset Management modülü geliştirerek <strong>tüm alt deneylerde model geçerliliğini korudum</strong>.",
        "exp1.b4": "Model varyantlarını karşılaştırmak hardcoded konfigürasyon değişiklikleri gerektiriyordu. Katman katman bir mimari konfigüratörü geliştirdim ve 5 model tipini Rust/WebAssembly'e derleyerek <strong>arayüzden ayarlamayı ve sunucuya gitmeden tarayıcı içi inference'ı mümkün kıldım</strong>.",
        "exp2.title": "Data Scientist Stajyeri",
        "exp2.b1": "Rüzgar türbini SCADA verisi gürültülüydü ve modellemeye hazır değildi. Sensör akışlarını temizleyip güç tahmini için çok katmanlı bir LSTM eğittim, test verisinde <strong>R² = 0.91'e ulaştım</strong>; ayrıca teklif hazırlama süresini saatlerden dakikalara indiren PVGIS entegre bir teklif önizleme sayfası geliştirdim.",
        "exp3.title": "Computer Vision Stajyeri",
        "exp3.b1": "Görüntü sınıflandırma için VGG16'yı (Keras) fine-tune ederek <strong>%92.1 doğruluğa ulaştım</strong> ve modeli Flask REST API olarak yayına aldım.",
        "exp4.title": "RPA Mühendisi",
        "exp4.b1": "Mühendislik bölümündeki proje planlaması tamamen manueldi. Power Apps ve SharePoint üzerinde Power Automate bildirimleriyle uçtan uca otomatikleştirerek <strong>planlama süresini 2 haftadan 1 saate indirdim (≈%98)</strong>.",
        "exp4.b2": "TypeScript custom component'leri ile Power Apps için bir TensorFlow entegrasyonu prototipleyip sundum; <strong>bölümün cihaz üzerinde AI inference için ilk Ar-Ge kavram kanıtını oluşturdum</strong>.",
        "exp5.title": "Computer Vision Stajyeri",
        "exp5.b1": "C++/OpenCV ile gerçek zamanlı görüntü işleme tekniklerini kıyasladım ve Monoküler VI-SLAM yaklaşımlarını değerlendirerek bir prototip yer robotu için <strong>donanım ve algoritma seçimine yön verdim</strong>.",
        "projects.heading": "Projeler",
        "projects.subheading": "Her projenin Mermaid mimari diyagramları, tasarım kararları, trade-off'lar ve sonuçlar içeren detaylı bir inceleme sayfası vardır.",
        "projects.allChapters": "Tüm proje incelemelerini aç",
        "tag.thesis": "Yüksek Lisans Tezi",
        "tag.thesisDemo": "Uygulamalı Tez Demosu",
        "tag.curriculum": "Müfredat",
        "tag.robustness": "Dayanıklılık",
        "proj.agentic.desc": "Bir LangGraph supervisor, Borsa İstanbul araştırması için her isteği dört uzman ajana gönderir. Tüm tool'lar bir MCP sunucusundadır; guardrail'ler üçüncü taraf metinleri tarar ve her sayıyı kontrol eder.",
        "proj.agentic.m1": "red-team saldırısı tespit edildi, 0 yanlış pozitif",
        "proj.agentic.m2": "test, %90+ kapsama",
        "proj.agentic.m3": "analiz başına maliyet",
        "proj.symbolic.desc": "Yüksek lisans tezim zaman serilerini 25 token'lık sabit bir sözlüğe çevirir. Yalnızca train ile binning, purged walk-forward split'ler ve CI'daki invariant testler sızıntıyı engeller.",
        "proj.llmops.desc": "Bu 9 repo'luk açık kaynak platform; RAG, prompt, şema, kod inceleme ve hafıza deneylerini sürükle-bırak DAG node'ları olarak çalıştırır. MLflow her çalıştırmayı kaydeder.",
        "proj.finwise.desc": "Bir LSTM fiyat ve hacim değişimlerini token'lara çevirir ve LoRA ile fine-tune edilmiş bir Llama 3 bunlar üzerinde akıl yürütür. 8 servisli sistem tam LLM inference'ı 4GB VRAM üzerinde çalıştırır.",
        "proj.finwise.m1": "Docker Compose servisi",
        "proj.finwise.m2": "VRAM'de edge inference",
        "proj.finwise.m3": "cold start giderildi",
        "proj.moviescout.desc": "Bu RAG önerici en popüler 10.000 TMDB filmi içinde arama yapar. Letterboxd geçmişini içe aktarır ve kullanıcının zaten izlediği filmleri çıkarır.",
        "proj.realestate.desc": "Qwen2.5 üzerinde çalışan bir LangChain tool-calling ajanı, dört ML modelini bir sohbet arayüzü ve 5 REST endpoint üzerinden sunar. XGBoost fiyat modeli R² = 0,81'e ulaşır.",
        "proj.fzth.desc": "Bu ücretsiz müfredatta veri bilimi, AI ve cloud için 27 bölüm ve 355'ten fazla notebook vardır. Altı rol bazlı yol, her iş için sırayı gösterir.",
        "proj.animal.desc": "Bu çalışma, renk kaymalarının bir CNN'in doğruluğunu nasıl değiştirdiğini ölçer. White balance ve Bayesian optimizasyonu doğruluğu geri kazandırır.",
        "education.heading": "Eğitim",
        "edu.present": "Devam ediyor",
        "edu1.title": "Yüksek Lisans – Veri Bilimi",
        "edu1.b1": "<strong>4.00/4.00 not ortalamasıyla</strong> yüksek lisansımı sürdürüyorum. <em>Zaman Serilerini Sembolik Bir Dil Olarak Modelleme: Edge Donanımda Alanlar Arası Transfer için Küçük Dil Modelleri</em> başlıklı tez fizibilite aşamasını tamamladı ve şimdi çekirdek kütüphanesini geliştiriyor.",
        "edu2.title": "Lisans – Elektrik ve Elektronik Mühendisliği",
        "edu2.b1": "3.09/4.00 not ortalamasıyla mezun oldum. Bitirme projesinde ROS üzerinde otonom yer robotu navigasyonu için Monoküler Görsel-Ataletsel SLAM simülasyonu yaptım.",
        "langcert.heading": "Diller ve Sertifikalar",
        "languages.heading": "Diller",
        "lang.english": "İngilizce",
        "lang.englishLevel": "Profesyonel yeterlilik",
        "lang.turkish": "Türkçe",
        "lang.turkishLevel": "Ana dil",
        "certificates.heading": "Sertifikalar",
        "footer.text": "☕ ve Kod ile inşa edildi.",
        "meta.description": "Muhammet Ali Varlık — Ankara'da AI / LLM Engineer. Agentic sistemler (LangGraph, MCP), RAG pipeline'ları, LLM değerlendirme ve guardrail'ler, MLOps. Veri Bilimi Yüksek Lisans (GPA 4.00)."
    };

    const en = {};
    document.querySelectorAll("[data-i18n]").forEach(el => { en[el.dataset.i18n] = el.textContent; });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { en[el.dataset.i18nHtml] = el.innerHTML; });
    const metaDesc = document.getElementById("meta-description");
    en["meta.description"] = metaDesc ? metaDesc.getAttribute("content") : "";
    const dicts = { en, tr };

    let currentLang = "en";
    try { currentLang = localStorage.getItem("portfolioLang") === "tr" ? "tr" : "en"; } catch (e) { /* storage blocked */ }

    function applyTranslations(lang) {
        const dict = dicts[lang];
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });
        // Only trusted, hard-coded strings from this file are ever assigned here.
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const v = dict[el.dataset.i18nHtml];
            if (v !== undefined) el.innerHTML = v;
        });
        if (metaDesc) metaDesc.setAttribute("content", dict["meta.description"]);
        const toggleBtn = document.getElementById("lang-toggle");
        if (toggleBtn) toggleBtn.textContent = lang === "en" ? "TR" : "EN";
    }

    const langToggleBtn = document.getElementById("lang-toggle");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            currentLang = currentLang === "en" ? "tr" : "en";
            try { localStorage.setItem("portfolioLang", currentLang); } catch (e) { /* storage blocked */ }
            applyTranslations(currentLang);
        });
    }

    // ------------------------------------------------------------------
    // 1. BACKGROUND CANVAS (particle network) — skipped for reduced motion
    // ------------------------------------------------------------------
    const canvas = document.getElementById("bg-canvas");
    if (canvas && !reduceMotion) {
        const ctx = canvas.getContext("2d");
        let width, height, particles = [];
        const particleCount = 55, connectionDistance = 140, speedBase = 0.2;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * speedBase, vy: (Math.random() - 0.5) * speedBase,
                size: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.4 + 0.1
            });
        }

        (function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 255, 0, ${p.alpha})`;
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 255, 0, ${0.05 * (1 - d / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        })();
    }

    // ------------------------------------------------------------------
    // 2. SCROLL PROGRESS, NAV STATE, SPOTLIGHT, REVEAL
    // ------------------------------------------------------------------
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    document.body.appendChild(progressBar);
    const nav = document.querySelector(".floating-nav");

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + "%";
        if (nav) nav.classList.toggle("scrolled", scrollTop > 50);
    }, { passive: true });

    const cards = document.querySelectorAll(".skill-card, .bento-card");
    document.addEventListener("mousemove", (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll("main section").forEach(section => {
            section.classList.add("fade-section");
            observer.observe(section);
        });
    }

    // ------------------------------------------------------------------
    // 3. CONTACT (address assembled at click time to keep it out of the
    //    static HTML and away from scrapers) & PRINT
    // ------------------------------------------------------------------
    const contactBtn = document.getElementById("contact-btn");
    if (contactBtn) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const user = ["iletisim", "muhammetalivarlik"].join(".");
            const domain = ["gmail", "com"].join(".");
            window.location.href = `mailto:${user}@${domain}`;
        });
    }

    const printBtn = document.getElementById("print-cv");
    if (printBtn) printBtn.addEventListener("click", () => window.print());

    applyTranslations(currentLang);
});
