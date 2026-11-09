document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ------------------------------------------------------------------
    // 0. I18N
    // English lives statically in index.html (readable by ATS and crawlers
    // without JavaScript). Turkish is written as natural Turkish here, not
    // as a word-for-word translation.
    // ------------------------------------------------------------------
    const tr = {
        "nav.focus": "Odak",
        "nav.experience": "Deneyim",
        "nav.projects": "Projeler",
        "nav.skills": "Yetkinlikler",
        "nav.education": "Eğitim",
        "nav.contact": "İletişim",

        "hero.badge": "AI / LLM Engineer pozisyonları için yeni fırsatlara açığım.",
        "hero.rotPrefix": "Odak noktam:",
        "hero.location": "Ankara, Türkiye",
        "hero.summary": "Agentic sistemler, RAG pipeline'ları ve LLM değerlendirme araçlarını uçtan uca geliştiren bir AI/LLM mühendisiyim; klasik makine öğrenmesi ve MLOps tarafında da sağlam bir altyapım var. TRK Technology'de sıfırdan kurduğum MLOps platformu, 5'ten fazla veri bilimcinin <strong>pipeline kurulum süresini günlerden yaklaşık 10 dakikaya indirdi</strong>. Son dönemde prompt injection'a karşı korumalı ve rakamları kaynağıyla doğrulayan, MCP tabanlı çok ajanlı bir araştırma sistemi geliştirdim. Yüksek lisans tezimde (GPA 4.00) ise zaman serilerini, edge donanımda çalışan küçük dil modelleri için sembolik bir dil olarak modelliyorum.",
        "hero.viewProjects": "Projelerime göz atın",
        "hero.printCv": "Yazdırılabilir CV",

        "impact.l1": "pipeline kurulum süresi; önceden günler sürüyordu",
        "impact.l2": "red-team saldırısı yakalandı, tek bir yanlış alarm yok",
        "impact.l3": "tek bir agentic sistemde otomatik test",
        "impact.l4": "Veri Bilimi yüksek lisans not ortalaması",

        "focus.eyebrow": "Neler yapıyorum",
        "focus.heading": "Üç alan, tek hedef: güvenilebilir yapay zekâ sistemleri",
        "focus.c1.title": "Agentic sistemler",
        "focus.c1.text": "LangGraph ile çok ajanlı sistemler tasarlıyor, araçlarını Model Context Protocol üzerinden sunuyorum. Her ajan yalnızca işini yapmak için gereken araçlara erişiyor.",
        "focus.c1.link": "Agentic Investing Engine",
        "focus.c2.title": "LLM değerlendirme ve güvenlik",
        "focus.c2.text": "LLM çıktılarını izlenimlerle değil, istatistikle ölçüyorum. Güvenilmeyen girdileri modele ulaşmadan tarıyor, çıktıdaki her rakamı kaynağıyla karşılaştırıyorum.",
        "focus.c2.link": "LLMOps Studio",
        "focus.c3.title": "MLOps ve platformlar",
        "focus.c3.text": "Deneyleri hızlı ve güvenli hale getiren platformlar kuruyorum: orkestrasyon, veri seti sürümleme, kuyruklar, gözlemlenebilirlik ve CI/CD.",
        "focus.c3.link": "TRK MLOps platformu",

        "principles.eyebrow": "Nasıl çalışıyorum",
        "principles.heading": "Her projenin arkasındaki üç ilke",
        "principles.p1.title": "Modelin çıktısına körü körüne güvenmem",
        "principles.p1.text": "Raporlardaki her rakam sayısal doğrulamadan geçiyor; LLM jürinin güvenilirliğini de Cohen's kappa ile ölçüyorum. <a href=\"projects/agentic-investing-engine.html\">Güvenlik katmanlarına göz atın</a>.",
        "principles.p2.title": "Sessiz hataların peşine düşerim",
        "principles.p2.text": "Boş metinleri puanlayan bir jüriyi, seçilen filmleri görmezden gelen embedding'leri ve gelecekteki veriyi sızdıran bir prototipi, hiçbiri bir sonucu etkilemeden yakalayıp düzelttim. <a href=\"projects/symbolic-ts.html\">Sızıntı düzeltmesini inceleyin</a>.",
        "principles.p3.title": "Sorumlu şekilde yayına alırım",
        "principles.p3.text": "Araçları yalnızca okuma yetkisiyle sınırlıyor, CSP ve OIDC tabanlı dağıtım kullanıyor, her projenin sınırlarını açıkça yazıyorum. Hazır bir sürümü, KVKK değerlendirmesi tamamlanana kadar bilerek beklettim. <a href=\"projects/finwise-scribe.html\">Doğruluk denetimini inceleyin</a>.",

        "experience.eyebrow": "Kariyer",
        "experience.heading": "İş Deneyimi",
        "loc.ankara": "Ankara",
        "loc.istanbul": "İstanbul",
        "exp.caseStudy": "Proje incelemesini okuyun",
        "exp1.title": "Yazılım Mühendisi (AI Sistemleri ve MLOps Platformu)",
        "exp1.b1": "5'ten fazla veri bilimciden oluşan ekip her deep learning deneyini elle yürütüyordu. FastAPI, PostgreSQL ve Vue.js ile sıfırdan bir şirket içi MLOps platformu kurarak <strong>pipeline kurulum süresini günlerden yaklaşık 10 dakikaya indirdim</strong>.",
        "exp1.b2": "Her deney için aynı şablon kod yeniden yazılıyordu. Ön işleme ve değerlendirme pipeline'larının görsel olarak kurulup çalıştırılabildiği, Vue Flow tabanlı bir DAG orkestrasyon motoru tasarladım ve <strong>yapılandırma süresini tahminen %60 kısalttım</strong>.",
        "exp1.b3": "Ekibin train/test ayırma yönteminde kritik bir veri sızıntısı riski fark ettim ve ekibi bir çözüm üzerinde uzlaştırdım. Sürüm kontrollü dallar ve veri soy ağacı takibi sunan bir Dataset Management modülü geliştirerek <strong>sonraki bütün deneylerde modellerin geçerliliğini korudum</strong>.",
        "exp1.b4": "Model varyantlarını karşılaştırmak için yapılandırmayı her seferinde kodda değiştirmek gerekiyordu. Katman katman mimari tanımlamayı sağlayan bir yapılandırıcı geliştirdim ve 5 model tipini Rust/WebAssembly'ye derleyerek <strong>modellerin arayüzden ayarlanabilmesini ve sunucuya gitmeden tarayıcıda çalıştırılabilmesini sağladım</strong>.",
        "exp2.title": "Veri Bilimi Stajyeri",
        "exp2.b1": "Rüzgâr türbinlerinden gelen SCADA verisi gürültülüydü ve modellemeye hazır değildi. Sensör verilerini temizleyip güç tahmini için çok katmanlı bir LSTM eğittim ve <strong>test verisinde R² = 0,91'e ulaştım</strong>. Ayrıca teklif hazırlama süresini saatlerden dakikalara indiren, PVGIS entegrasyonlu bir teklif önizleme sayfası geliştirdim.",
        "exp3.title": "Bilgisayarlı Görü Stajyeri",
        "exp3.b1": "Görüntü sınıflandırma için VGG16 modelini Keras ile fine-tune ederek <strong>%92,1 doğruluğa ulaştım</strong> ve modeli Flask tabanlı bir REST API olarak devreye aldım.",
        "exp4.title": "RPA Mühendisi",
        "exp4.b1": "Mühendislik bölümündeki proje planlaması tamamen elle yapılıyordu. Süreci Power Apps ve SharePoint üzerinde, Power Automate bildirimleriyle uçtan uca otomatikleştirerek <strong>planlama süresini 2 haftadan 1 saate indirdim (≈%98)</strong>.",
        "exp4.b2": "TypeScript ile geliştirdiğim özel bileşenlerle Power Apps'e TensorFlow entegrasyonu yapan bir prototip hazırlayıp sundum. Bu çalışma, <strong>bölümün cihaz üzerinde yapay zekâ çalıştırmaya yönelik ilk Ar-Ge kavram kanıtı oldu</strong>.",
        "exp5.title": "Bilgisayarlı Görü Stajyeri",
        "exp5.b1": "C++ ve OpenCV ile gerçek zamanlı görüntü işleme yöntemlerini karşılaştırdım, monoküler VI-SLAM yaklaşımlarını değerlendirdim. Bu çalışmalar, prototip bir yer robotu için <strong>donanım ve algoritma seçimine yön verdi</strong>.",

        "projects.eyebrow": "Seçili çalışmalar",
        "projects.heading": "Projeler",
        "projects.subheading": "Her projenin; Mermaid mimari diyagramları, tasarım kararları, ödünleşimler ve sonuçlarla dolu ayrıntılı bir inceleme sayfası var.",
        "projects.allChapters": "Bütün proje incelemelerini görün",
        "filter.all": "Tümü",
        "filter.agentic": "Agentic ve LLM",
        "filter.thesis": "Tez",
        "filter.applied": "Uygulamalı ML",
        "tag.thesis": "Yüksek Lisans Tezi",
        "tag.thesisDemo": "Uygulamalı Tez Demosu",
        "tag.curriculum": "Müfredat",
        "tag.robustness": "Dayanıklılık",
        "proj.agentic.desc": "Borsa İstanbul araştırmaları için gelen her isteği dört uzman ajana dağıtan bir LangGraph supervisor. Araçların tamamı bir MCP sunucusunda; üçüncü taraf metinler taranıyor, rapordaki her rakam kaynağıyla doğrulanıyor.",
        "proj.agentic.m1": "red-team saldırısı yakalandı, yanlış alarm yok",
        "proj.agentic.m2": "test, %90'ın üzerinde kapsama",
        "proj.agentic.m3": "analiz başına maliyet",
        "proj.symbolic.desc": "Yüksek lisans tezim, zaman serilerini 25 token'lık sabit bir sözlüğe çeviriyor. Yalnızca eğitim verisiyle yapılan binning, purged walk-forward split'ler ve CI'daki testler veri sızıntısını engelliyor.",
        "proj.llmops.desc": "RAG, prompt, şema, kod inceleme ve hafıza deneylerini sürükle-bırak DAG düğümleri olarak çalıştıran, 9 repodan oluşan açık kaynak bir platform. Her çalıştırma MLflow'a kaydediliyor.",
        "proj.finwise.desc": "Bir LSTM fiyat ve hacim değişimlerini token'lara çeviriyor, LoRA ile fine-tune edilmiş bir Llama 3 de bunlar üzerinden akıl yürütüyor. 8 servisli sistem, LLM inference'ın tamamını 4GB VRAM'de çalıştırıyor.",
        "proj.finwise.m1": "Docker Compose servisi",
        "proj.finwise.m2": "VRAM'de edge inference",
        "proj.finwise.m3": "soğuk başlangıç ortadan kalktı",
        "proj.moviescout.desc": "En popüler 10.000 TMDB filmi üzerinde çalışan bir RAG öneri sistemi. Letterboxd geçmişini içe aktarıyor ve izlediğiniz filmleri önerilerden çıkarıyor.",
        "proj.realestate.desc": "Qwen2.5 üzerinde çalışan bir LangChain ajanı, dört makine öğrenmesi modelini bir sohbet arayüzü ve 5 REST endpoint üzerinden sunuyor. XGBoost fiyat modeli R² = 0,81'e ulaşıyor.",
        "proj.animal.desc": "Renk kaymasının bir CNN'in doğruluğunu ne kadar etkilediğini ölçen bir çalışma. White balance düzeltmesi ve Bayesian optimizasyon kaybedilen doğruluğu geri kazandırıyor.",
        "proj.fzth.desc": "Veri bilimi, yapay zekâ ve bulut için 27 bölüm ve 355'ten fazla notebook içeren ücretsiz bir müfredat. Altı farklı rol için hangi sırayla ilerlemeniz gerektiğini gösteriyor.",

        "skills.eyebrow": "Araç kutusu",
        "skills.heading": "Yetkinlikler",
        "skills.card1.title": "Agentic AI ve LLM'ler",
        "skills.card2.title": "RAG, Değerlendirme ve Güvenlik",
        "skills.card3.title": "Makine Öğrenmesi ve Zaman Serileri",
        "skills.card4.title": "Yazılım Mühendisliği ve MLOps",
        "skills.card5.title": "Frontend ve Diğerleri",
        "skills.familiar": "Temel düzeyde:",

        "education.eyebrow": "Geçmiş",
        "education.heading": "Eğitim",
        "edu.present": "Devam ediyor",
        "edu1.title": "Yüksek Lisans – Veri Bilimi",
        "edu1.b1": "Yüksek lisansımı <strong>4.00/4.00 not ortalamasıyla</strong> sürdürüyorum. <em>Zaman Serilerini Sembolik Bir Dil Olarak Modellemek: Edge Donanımda Alanlar Arası Transfer için Küçük Dil Modelleri</em> başlıklı tezim fizibilite aşamasını tamamladı; şu anda çekirdek kütüphanesini geliştiriyorum.",
        "edu2.title": "Lisans – Elektrik ve Elektronik Mühendisliği",
        "edu2.b1": "3.09/4.00 not ortalamasıyla mezun oldum. Bitirme projemde, otonom bir yer robotunun navigasyonu için ROS üzerinde monoküler görsel-ataletsel SLAM simülasyonu yaptım.",
        "languages.heading": "Diller",
        "lang.english": "İngilizce",
        "lang.englishLevel": "Profesyonel düzeyde",
        "lang.turkish": "Türkçe",
        "lang.turkishLevel": "Ana dil",
        "certificates.heading": "Sertifikalar",

        "contact.eyebrow": "İletişim",
        "contact.heading": "Doğruluğun kritik olduğu yapay zekâ sistemleri mi geliştiriyorsunuz?",
        "contact.text": "AI / LLM Engineer pozisyonlarına açığım. Bir pozisyon ya da proje hakkında konuşmak isterseniz bana yazabilirsiniz.",
        "contact.email": "E-posta gönderin",

        "footer.text": "Kahve ☕ ve kodla geliştirildi.",
        "meta.description": "Muhammet Ali Varlık — Ankara'da AI / LLM Engineer. Agentic sistemler (LangGraph, MCP), RAG pipeline'ları, LLM değerlendirme ve güvenlik katmanları, MLOps. Veri Bilimi yüksek lisans (GPA 4.00)."
    };

    const rotatorWords = {
        en: ["agentic systems", "LLM guardrails", "evaluation pipelines", "RAG pipelines", "MLOps platforms"],
        tr: ["agentic sistemler", "LLM güvenlik katmanları", "değerlendirme pipeline'ları", "RAG pipeline'ları", "MLOps platformları"]
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
        rotIndex = 0;
        const rot = document.getElementById("rotator");
        if (rot) rot.textContent = rotatorWords[lang][0];
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
    // 1. BACKGROUND PARTICLE NETWORK
    // ------------------------------------------------------------------
    const canvas = document.getElementById("bg-canvas");
    if (canvas && !reduceMotion) {
        const ctx = canvas.getContext("2d");
        let width, height;
        const particles = [];
        const count = window.innerWidth < 700 ? 28 : 55, linkDist = 140, speed = 0.2;
        const mouse = { x: -9999, y: -9999 };

        function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
        window.addEventListener("resize", resize);
        resize();
        window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
                r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.4 + 0.1
            });
        }

        (function frame() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // gentle repulsion from the cursor
                const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
                if (md < 120 && md > 0) { p.x += (mdx / md) * 0.8; p.y += (mdy / md) * 0.8; }
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 255, 0, ${p.a})`;
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < linkDist) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 255, 0, ${0.06 * (1 - d / linkDist)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(frame);
        })();
    }

    // ------------------------------------------------------------------
    // 2. SCROLL: progress bar, nav state, active section, timeline fill
    // ------------------------------------------------------------------
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    document.body.appendChild(progressBar);
    const nav = document.querySelector(".floating-nav");
    const navLinks = [...document.querySelectorAll(".nav-links a")];
    const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const timeline = document.querySelector(".timeline");
    const timelineFill = document.querySelector(".timeline-progress");
    const timelineItems = [...document.querySelectorAll(".timeline-item")];

    function onScroll() {
        const scrollTop = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + "%";
        if (nav) nav.classList.toggle("scrolled", scrollTop > 50);

        let current = null;
        sections.forEach(sec => { if (sec.getBoundingClientRect().top < window.innerHeight * 0.35) current = sec.id; });
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

        if (timeline && timelineFill) {
            const r = timeline.getBoundingClientRect();
            const marker = window.innerHeight * 0.6;
            const filled = Math.min(Math.max(marker - r.top, 0), r.height);
            timelineFill.style.height = filled + "px";
            timelineItems.forEach(it => it.classList.toggle("lit", it.getBoundingClientRect().top < marker));
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ------------------------------------------------------------------
    // 3. REVEAL ON SCROLL (staggered) + COUNT-UP NUMBERS
    // ------------------------------------------------------------------
    function countUp(el) {
        const to = parseFloat(el.dataset.to);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const prefix = el.dataset.prefix || "";
        const start = performance.now(), dur = 1400;
        (function tick(now) {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = prefix + (to * eased).toFixed(decimals);
            if (t < 1) requestAnimationFrame(tick);
        })(start);
    }

    if (!reduceMotion && "IntersectionObserver" in window) {
        // stagger siblings inside the same parent
        const groups = new Map();
        document.querySelectorAll(".reveal").forEach(el => {
            const list = groups.get(el.parentElement) || [];
            list.push(el);
            groups.set(el.parentElement, list);
        });
        groups.forEach(list => list.forEach((el, i) => el.style.setProperty("--d", Math.min(i * 0.08, 0.5) + "s")));

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                entry.target.querySelectorAll(".count").forEach(countUp);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    } else {
        document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    }

    // ------------------------------------------------------------------
    // 4. HERO ROTATOR (typewriter)
    // ------------------------------------------------------------------
    let rotIndex = 0;
    const rot = document.getElementById("rotator");
    if (rot && !reduceMotion) {
        let chars = rot.textContent.length, deleting = true;
        function step() {
            const words = rotatorWords[currentLang];
            const word = words[rotIndex % words.length];
            if (deleting) {
                chars--;
                rot.textContent = word.slice(0, Math.max(chars, 0));
                if (chars <= 0) { deleting = false; rotIndex++; }
                setTimeout(step, 40);
            } else {
                const next = words[rotIndex % words.length];
                chars++;
                rot.textContent = next.slice(0, chars);
                if (chars >= next.length) { deleting = true; setTimeout(step, 2200); return; }
                setTimeout(step, 70);
            }
        }
        setTimeout(step, 2600);
    }

    // ------------------------------------------------------------------
    // 5. POINTER EFFECTS: card spotlight, 3D tilt, magnetic buttons, glow
    // ------------------------------------------------------------------
    if (finePointer && !reduceMotion) {
        const glow = document.querySelector(".cursor-glow");
        const spotCards = document.querySelectorAll(".skill-card, .bento-card, .focus-card, .edu-card");
        document.addEventListener("mousemove", e => {
            if (glow) glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            spotCards.forEach(card => {
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
                card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
            });
        }, { passive: true });

        document.querySelectorAll(".tilt").forEach(card => {
            card.addEventListener("mousemove", e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
            });
            card.addEventListener("mouseleave", () => { card.style.transform = ""; });
        });

        document.querySelectorAll(".magnetic").forEach(btn => {
            btn.addEventListener("mousemove", e => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
            });
            btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
        });
    }

    // ------------------------------------------------------------------
    // 6. PROJECT FILTERS
    // ------------------------------------------------------------------
    const filterBtns = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".bento-card[data-cat]");
    filterBtns.forEach(btn => btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        filterBtns.forEach(b => { b.classList.toggle("active", b === btn); b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        cards.forEach(card => {
            const show = f === "all" || card.dataset.cat === f;
            card.classList.toggle("is-hidden", !show);
        });
    }));

    // ------------------------------------------------------------------
    // 7. CONTACT (address assembled only on click, never in static HTML) & PRINT
    // ------------------------------------------------------------------
    const contactBtn = document.getElementById("contact-btn");
    if (contactBtn) {
        const user = ["iletisim", "muhammetalivarlik"].join(".");
        const domain = ["gmail", "com"].join(".");
        contactBtn.setAttribute("href", `mailto:${user}@${domain}`);
    }
    const printBtn = document.getElementById("print-cv");
    if (printBtn) printBtn.addEventListener("click", () => window.print());

    applyTranslations(currentLang);
});
