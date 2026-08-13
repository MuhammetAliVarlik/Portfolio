document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------------------------
    // 0. I18N — TRANSLATIONS
    // ------------------------------------------------------------------
    const translations = {
        en: {
            "nav.about": "About",
            "nav.skills": "Stack",
            "nav.experience": "Experience",
            "nav.projects": "Work",
            "nav.contact": "Contact",
            "hero.badge": "Available for new opportunities",
            "hero.title": 'Engineering <span class="gradient-text">Scalable AI</span><br> for the Real World.',
            "hero.subtitle": "Hi, I'm Muhammet Ali Varlık, an AI Systems Engineer specializing in LLM applications and LLMOps. I build scalable ML pipelines, agentic AI systems, and production-grade backend infrastructure.",
            "hero.viewProjects": "View Projects",
            "hero.downloadCv": "Download CV",
            "currently.thesis": "Writing my Master's thesis on domain-agnostic symbolic time-series representation",
            "currently.jobsearch": "Actively interviewing for AI / LLM Engineer roles",
            "skills.heading": "Technical Arsenal",
            "skills.card1.title": "LLMOps & Evaluation",
            "skills.card2.title": "Generative AI & LLMs",
            "skills.card3.title": "AI & Machine Learning",
            "skills.card4.title": "Software Eng. & DevOps",
            "skills.card5.title": "Data & Vector Stores",
            "skills.card6.title": "Systems & Languages",
            "experience.heading": "Career Trajectory",
            "exp1.date": "Sep 2025 - Jun 2026",
            "exp1.title": "Software Engineer (AI Systems & MLOps Platform)",
            "exp1.desc": 'Built an internal <strong>MLOps platform</strong> (FastAPI + PostgreSQL + Vue.js) from scratch, cutting pipeline setup time from days to <strong>~10 minutes</strong> for a team of 5+ data scientists. Designed a <strong>DAG-based workflow orchestration engine</strong> (Vue Flow) that cut pipeline configuration time by an estimated <strong>&gt;60%</strong>, and compiled 5 ML model types to <strong>Rust/WebAssembly</strong> for native browser inference.',
            "exp2.date": "Jul 2024 - Aug 2024",
            "exp2.title": "Data Scientist Intern",
            "exp2.desc": "Trained LSTM models for wind power forecasting (0.91 R²) and developed a PVGIS API-driven webpage using Flask.",
            "exp3.date": "Jul 2023 - Aug 2023",
            "exp3.title": "Computer Vision Intern",
            "exp3.desc": "Fine-tuned VGG16 models (92.1% accuracy) for image classification and developed secure API integrations.",
            "exp4.date": "Oct 2022 - Jul 2023",
            "exp4.title": "RPA Engineer",
            "exp4.desc": "Automated workflow processes using Power Apps & Automate, reducing project planning time from 2 weeks to 1 hour.",
            "exp5.date": "Apr 2022 - Oct 2022",
            "exp5.title": "Computer Vision Intern",
            "exp5.desc": "Researched SLAM and Monocular Visual Odometry; developed object tracking and detection modules.",
            "projects.heading": "Selected Works",
            "projects.subheading": "Click on any project to view architecture details and outcomes.",
            "proj.llmops.desc": "Self-initiated 9-repository open-source platform for RAG benchmarking, prompt operations, and LLM evaluation & orchestration.",
            "proj.finwise.desc": "A microservices-based AI engine fusing LSTM trend analysis with a fine-tuned LLM for hybrid market signals. Thesis in progress — direction actively evolving.",
            "proj.agentic.desc": "Multi-agent system coordinating specialist AI agents for investment strategies.",
            "proj.moviescout.desc": "Conversational recommender system using Retrieval-Augmented Generation and semantic search.",
            "proj.realestate.desc": "Full-stack system integrating regression, clustering, and anomaly detection as tools for a GenAI agent.",
            "proj.btc.desc": "Crypto price movement classification using hybrid Deep Learning models on OHLCV data.",
            "education.heading": "Education",
            "edu1.date": "Jun 2025 - Present",
            "edu1.title": "Master's Degree in Data Science",
            "edu1.desc": "<strong>GPA: 4.00/4.00</strong><br>Focus: Statistical Deep Learning, Time-Series Forecasting.",
            "edu2.date": "Sep 2019 - Aug 2024",
            "edu2.title": "B.S. Electrical Electronics Engineering",
            "edu2.desc": "GPA: 3.09/4.00<br>Relevant Coursework: Machine Learning, Digital Image Processing.",
            "certificates.heading": "Certificates",
            "footer.text": "Built with ☕ and Code.",
            "meta.description": "Portfolio of Muhammet Ali Varlık - AI Systems Engineer specializing in LLM applications, LLMOps & MLOps, and agentic AI systems.",
            "modal.viewSource": "View Source Code",
            "modal.viewOrg": "View Organization"
        },
        tr: {
            "nav.about": "Hakkımda",
            "nav.skills": "Yetenekler",
            "nav.experience": "Deneyim",
            "nav.projects": "Projeler",
            "nav.contact": "İletişim",
            "hero.badge": "Yeni fırsatlara açığım",
            "hero.title": 'Gerçek Dünya için <span class="gradient-text">Ölçeklenebilir AI</span><br> Mühendisliği.',
            "hero.subtitle": "Merhaba, ben Muhammet Ali Varlık. LLM uygulamaları ve LLMOps üzerine uzmanlaşmış bir AI Systems Engineer'ım. Ölçeklenebilir ML pipeline'ları, agentic AI sistemleri ve production seviyesinde backend altyapıları geliştiriyorum.",
            "hero.viewProjects": "Projeleri Gör",
            "hero.downloadCv": "CV İndir",
            "currently.thesis": "Alan-bağımsız sembolik zaman serisi temsili üzerine yüksek lisans tezimi yazıyorum",
            "currently.jobsearch": "AI / LLM Engineer pozisyonları için aktif olarak görüşme yapıyorum",
            "skills.heading": "Teknik Yetkinlikler",
            "skills.card1.title": "LLMOps ve Değerlendirme",
            "skills.card2.title": "Üretken AI ve LLM'ler",
            "skills.card3.title": "Yapay Zeka ve Makine Öğrenmesi",
            "skills.card4.title": "Yazılım Müh. ve DevOps",
            "skills.card5.title": "Veri ve Vektör Depoları",
            "skills.card6.title": "Sistemler ve Diller",
            "experience.heading": "Kariyer Yolculuğu",
            "exp1.date": "Eyl 2025 - Haz 2026",
            "exp1.title": "Yazılım Mühendisi (AI Sistemleri ve MLOps Platformu)",
            "exp1.desc": "Sıfırdan bir <strong>MLOps platformu</strong> (FastAPI + PostgreSQL + Vue.js) geliştirerek pipeline kurulum süresini günlerden <strong>~10 dakikaya</strong> indirdim (5+ kişilik data scientist ekibi için). <strong>DAG tabanlı bir workflow orchestration motoru</strong> (Vue Flow) tasarlayarak pipeline konfigürasyon süresini tahmini <strong>%60'tan fazla</strong> azalttım ve 5 ML model tipini native browser inference için <strong>Rust/WebAssembly'e</strong> derledim.",
            "exp2.date": "Tem 2024 - Ağu 2024",
            "exp2.title": "Data Scientist Stajyeri",
            "exp2.desc": "Rüzgar enerjisi üretim tahmini için LSTM modelleri eğittim (0.91 R²) ve PVGIS API tabanlı bir web sayfası geliştirdim (Flask).",
            "exp3.date": "Tem 2023 - Ağu 2023",
            "exp3.title": "Computer Vision Stajyeri",
            "exp3.desc": "Görüntü sınıflandırma için VGG16 modellerini fine-tune ettim (%92.1 doğruluk) ve güvenli API entegrasyonları geliştirdim.",
            "exp4.date": "Eki 2022 - Tem 2023",
            "exp4.title": "RPA Mühendisi",
            "exp4.desc": "Power Apps ve Power Automate kullanarak iş akışlarını otomatikleştirdim, proje planlama süresini 2 haftadan 1 saate indirdim.",
            "exp5.date": "Nis 2022 - Eki 2022",
            "exp5.title": "Computer Vision Stajyeri",
            "exp5.desc": "SLAM ve Monoküler Görsel Odometri üzerine araştırma yaptım; nesne takibi ve tespiti modülleri geliştirdim.",
            "projects.heading": "Seçili Çalışmalar",
            "projects.subheading": "Mimari detayları ve sonuçları görmek için bir projeye tıklayın.",
            "proj.llmops.desc": "RAG benchmarking, prompt operations ve LLM değerlendirme/orkestrasyonu için bağımsız olarak başlattığım 9 repo'luk açık kaynak platform.",
            "proj.finwise.desc": "LSTM trend analizini fine-tuned bir LLM ile birleştiren, hibrit piyasa sinyalleri üreten mikroservis tabanlı bir AI motoru. Tez devam ediyor — yön aktif olarak güncelleniyor.",
            "proj.agentic.desc": "Yatırım stratejileri için uzman AI ajanlarını koordine eden multi-agent sistem.",
            "proj.moviescout.desc": "Retrieval-Augmented Generation ve semantic search kullanan konuşmalı öneri sistemi.",
            "proj.realestate.desc": "Regresyon, clustering ve anomaly detection'ı bir GenAI ajanı için araç olarak entegre eden full-stack sistem.",
            "proj.btc.desc": "OHLCV verisi üzerinde hibrit Deep Learning modelleriyle kripto fiyat hareketi sınıflandırması.",
            "education.heading": "Eğitim",
            "edu1.date": "Haz 2025 - Devam Ediyor",
            "edu1.title": "Yüksek Lisans - Veri Bilimi",
            "edu1.desc": "<strong>Not Ortalaması: 4.00/4.00</strong><br>Odak: Statistical Deep Learning, Time-Series Forecasting.",
            "edu2.date": "Eyl 2019 - Ağu 2024",
            "edu2.title": "Lisans - Elektrik Elektronik Mühendisliği",
            "edu2.desc": "Not Ortalaması: 3.09/4.00<br>İlgili Dersler: Machine Learning, Digital Image Processing.",
            "certificates.heading": "Sertifikalar",
            "footer.text": "☕ ve Kod ile inşa edildi.",
            "meta.description": "Muhammet Ali Varlık'ın portföyü - LLM uygulamaları, LLMOps & MLOps ve agentic AI sistemleri konusunda uzmanlaşmış AI Systems Engineer.",
            "modal.viewSource": "Kaynak Koduna Git",
            "modal.viewOrg": "Organizasyonu Görüntüle"
        }
    };

    let currentLang = localStorage.getItem("portfolioLang") || "en";

    function applyTranslations(lang) {
        const dict = translations[lang];
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        const metaDesc = document.getElementById("meta-description");
        const ogTitle = document.getElementById("og-title");
        const ogDesc = document.getElementById("og-description");
        const twTitle = document.getElementById("twitter-title");
        const twDesc = document.getElementById("twitter-description");
        if (metaDesc) metaDesc.setAttribute("content", dict["meta.description"]);
        if (ogDesc) ogDesc.setAttribute("content", dict["meta.description"]);
        if (twDesc) twDesc.setAttribute("content", dict["meta.description"]);

        const toggleBtn = document.getElementById("lang-toggle");
        if (toggleBtn) toggleBtn.textContent = lang === "en" ? "TR" : "EN";

        renderTypedSubtitle(lang);
    }

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem("portfolioLang", lang);
        applyTranslations(lang);
    }

    const langToggleBtn = document.getElementById("lang-toggle");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            setLang(currentLang === "en" ? "tr" : "en");
        });
    }

    // ------------------------------------------------------------------
    // 1. BACKGROUND CANVAS ANIMATION (PARTICLE NETWORK)
    // ------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const particleCount = 55;
        const connectionDistance = 140;
        const speedBase = 0.2;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * speedBase;
                this.vy = (Math.random() - 0.5) * speedBase;
                this.size = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 255, 0, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, index) => {
                p.update();
                p.draw();
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 255, 0, ${0.05 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }

    // ------------------------------------------------------------------
    // 2. PROJECT DATA (MODAL CONTENT) — BILINGUAL
    // ------------------------------------------------------------------
    const projectsData = {
        en: {
            'llmops-studio': {
                title: "LLMOps Studio: Open-Source LLM Evaluation & Orchestration Platform",
                tags: ["Self-Initiated", "Open-Source", "LLMOps", "Docker", "CI/CD"],
                image: "https://github.com/LLMOps-Studio/llmops-studio/blob/main/docs/workflow-studio.png?raw=true",
                description: `
                    <p>A self-initiated, 9-repository open-source organization built to establish production-grade LLMOps practices — covering RAG benchmarking, prompt operations, schema validation, and LLM evaluation & orchestration tooling.</p>
                    <h3>Key Design Decisions</h3>
                    <ul>
                        <li><strong>Consolidated Docker Architecture:</strong> A single shared base image with env-driven service selection (<code>APP_MODULE</code>), eliminating ~3GB of redundant image bloat per service.</li>
                        <li><strong>Dynamic Model Discovery:</strong> CI/CD pipelines (GitHub Actions) across all repositories, fully documented in English for open-source contribution readiness.</li>
                        <li><strong>Evaluation Infrastructure:</strong> Statistical rigor via Wilson confidence intervals and paired McNemar comparisons, plus LLM-as-Judge validation with Cohen's kappa.</li>
                    </ul>
                `,
                links: [{ text: "View Organization", url: "https://github.com/LLMOps-Studio", icon: "fab fa-github" }]
            },
            'finwise': {
                title: "Finwise Scribe: Neuro-Symbolic AI Engine",
                tags: ["Master's Thesis", "Neuro-Symbolic AI", "MLOps", "FastAPI", "Redis/Celery"],
                image: "https://github.com/MuhammetAliVarlik/finwisebackend/blob/develop/docs/architecture.png?raw=true",
                description: `
                    <p>Developed as a Master's thesis, Finwise Scribe addresses the limitations of purely quantitative financial models by integrating qualitative reasoning from Large Language Models.</p>
                    <h3>Key Challenges & Solutions</h3>
                    <ul>
                        <li><strong>Challenge:</strong> Combining structured time-series data with unstructured market news for accurate signals.</li>
                        <li><strong>Solution (Neuro-Symbolic):</strong> Fused an LSTM model (for quantitative trend analysis) with a fine-tuned LLM (for qualitative sentiment and reasoning) using a weighted ensemble approach.</li>
                        <li><strong>Architecture:</strong> Designed an Event-Driven Architecture using FastAPI for the front, Redis as a message broker, and Celery workers to handle heavy inference tasks asynchronously.</li>
                    </ul>
                    <p><em>Note: the thesis is an active research project and its direction is still evolving — current experiments are exploring domain-agnostic symbolic representations across smaller language models, in addition to the architecture above.</em></p>
                `,
                links: [{ text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/finwisebackend", icon: "fab fa-github" }]
            },
            'agentic': {
                title: "Agentic Investing Engine",
                tags: ["LangGraph", "Llama 3", "Multi-Agent System", "Tool Calling"],
                image: "https://raw.githubusercontent.com/MuhammetAliVarlik/AgenticInvestingEngine/bdd44ce4df7192220d5281ffb440e2bdc8e93d9b/documents/project_plan.svg",
                description: `
                    <p>Designed to autonomous generative AI system that acts as a financial analyst team. It moves beyond simple chatbot interfaces by using a multi-agent "supervisor-worker" architecture implemented with LangGraph.</p>
                    <h3>Architecture Details</h3>
                    <ul>
                        <li><strong>Supervisor Agent:</strong> An LLM (Llama 3) that interprets user queries and delegates tasks to specialized agents.</li>
                        <li><strong>Specialist Agents:</strong> Independent agents equipped with specific tools (Technical, Fundamental, News Analysis).</li>
                    </ul>
                `,
                links: [{ text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/agenticinvestingengine", icon: "fab fa-github" }]
            },
            'moviescout': {
                title: "Movie Scout: RAG Conversational Recommender",
                tags: ["RAG", "Semantic Search", "Flask", "Vector DB", "Full-Stack"],
                image: "https://github.com/MuhammetAliVarlik/MovieScout/blob/main/docs/demo/home.png?raw=true",
                description: `
                    <p>An end-to-end conversational movie recommendation system that leverages Retrieval-Augmented Generation (RAG) to provide highly personalized suggestions based on natural language queries.</p>
                    <h3>Tech Stack</h3>
                    <p>Built with Flask on the backend, serving a modern JavaScript/HTML frontend. Handles asynchronous data loading for a smooth user experience. Uses Vector Embeddings for semantic search.</p>
                `,
                links: [{ text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/moviescout", icon: "fab fa-github" }]
            },
            'realestate': {
                title: "Real Estate AI: Full-Stack GenAI System",
                tags: ["Anomaly Detection", "Regression", "Clustering", "GenAI Agent"],
                image: "https://github.com/MuhammetAliVarlik/RealEstateAI/blob/main/docs/screenshoots/MainScreen.png?raw=true",
                description: `
                    <p>A comprehensive AI system for the real estate domain that integrates classical machine learning models as "tools" for a generative AI agent.</p>
                    <h3>Machine Learning Modules</h3>
                    <ul>
                        <li><strong>Price Prediction:</strong> XGBoost regression model trained on Istanbul housing data.</li>
                        <li><strong>Anomaly Detection:</strong> Isolation Forest model to identify overpriced/underpriced properties.</li>
                        <li><strong>Clustering:</strong> K-Means to categorize properties by investment type.</li>
                    </ul>
                `,
                links: [{ text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/realestateai", icon: "fab fa-github" }]
            },
            'btc': {
                title: "BTC/USDT Price Classification",
                tags: ["Deep Learning", "CNN-LSTM", "TensorFlow", "Time-Series"],
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGLtb5S3HTxTmU8MmXBZkKMNyXUWDUiN5_w&s",
                description: `
                    <p>A research-oriented project classifying BTC/USDT price movements over a 6-hour horizon using technical indicators derived from historical OHLCV data.</p>
                    <h3>Technical Approach</h3>
                    <p>Implemented a hybrid <strong>CNN-LSTM</strong> architecture using TensorFlow. The CNN layers extract local features from short-term trends, while LSTM layers capture long-term temporal dependencies.</p>
                `,
                links: [{ text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/BTC-USDT-Price-Movement-Classification", icon: "fab fa-github" }]
            }
        },
        tr: {
            'llmops-studio': {
                title: "LLMOps Studio: Açık Kaynak LLM Değerlendirme ve Orkestrasyon Platformu",
                tags: ["Kişisel Girişim", "Açık Kaynak", "LLMOps", "Docker", "CI/CD"],
                image: "https://github.com/LLMOps-Studio/llmops-studio/blob/main/docs/workflow-studio.png?raw=true",
                description: `
                    <p>Production-grade LLMOps pratikleri kurmak için bağımsız olarak başlattığım, 9 repo'luk açık kaynak bir organizasyon — RAG benchmarking, prompt operations, schema validation ve LLM değerlendirme/orkestrasyon araçlarını kapsıyor.</p>
                    <h3>Temel Tasarım Kararları</h3>
                    <ul>
                        <li><strong>Konsolide Docker Mimarisi:</strong> Env-driven servis seçimiyle (<code>APP_MODULE</code>) tek bir paylaşılan taban imaj, servis başına ~3GB gereksiz imaj şişkinliğini ortadan kaldırıyor.</li>
                        <li><strong>Dinamik Model Keşfi:</strong> Tüm repolarda CI/CD pipeline'ları (GitHub Actions), açık kaynak katkıya hazır şekilde tamamı İngilizce dokümante edildi.</li>
                        <li><strong>Değerlendirme Altyapısı:</strong> Wilson güven aralıkları ve eşleştirilmiş McNemar karşılaştırmalarıyla istatistiksel titizlik, Cohen's kappa ile LLM-as-Judge doğrulaması.</li>
                    </ul>
                `,
                links: [{ text: "Organizasyonu Görüntüle", url: "https://github.com/LLMOps-Studio", icon: "fab fa-github" }]
            },
            'finwise': {
                title: "Finwise Scribe: Neuro-Symbolic AI Motoru",
                tags: ["Yüksek Lisans Tezi", "Neuro-Symbolic AI", "MLOps", "FastAPI", "Redis/Celery"],
                image: "https://github.com/MuhammetAliVarlik/finwisebackend/blob/develop/docs/architecture.png?raw=true",
                description: `
                    <p>Yüksek lisans tezi olarak geliştirilen Finwise Scribe, salt kantitatif finansal modellerin sınırlarını Büyük Dil Modellerinden gelen niteliksel akıl yürütmeyi entegre ederek aşmayı hedefliyor.</p>
                    <h3>Temel Zorluklar ve Çözümler</h3>
                    <ul>
                        <li><strong>Zorluk:</strong> Doğru sinyaller için yapılandırılmış zaman serisi verisini yapılandırılmamış piyasa haberleriyle birleştirmek.</li>
                        <li><strong>Çözüm (Neuro-Symbolic):</strong> Kantitatif trend analizi için bir LSTM modelini, niteliksel duygu ve akıl yürütme için fine-tuned bir LLM ile ağırlıklı bir ensemble yaklaşımıyla birleştirdim.</li>
                        <li><strong>Mimari:</strong> FastAPI ile önyüz, Redis ile mesaj broker'ı ve ağır inference görevlerini asenkron işleyen Celery worker'ları kullanan Event-Driven bir mimari tasarladım.</li>
                    </ul>
                    <p><em>Not: tez aktif bir araştırma projesi ve yönü hâlâ gelişiyor — mevcut deneyler, yukarıdaki mimariye ek olarak daha küçük dil modelleri üzerinde alan-bağımsız sembolik temsilleri araştırıyor.</em></p>
                `,
                links: [{ text: "Kaynak Koduna Git", url: "https://github.com/MuhammetAliVarlik/finwisebackend", icon: "fab fa-github" }]
            },
            'agentic': {
                title: "Agentic Investing Engine",
                tags: ["LangGraph", "Llama 3", "Multi-Agent Sistemi", "Tool Calling"],
                image: "https://raw.githubusercontent.com/MuhammetAliVarlik/AgenticInvestingEngine/bdd44ce4df7192220d5281ffb440e2bdc8e93d9b/documents/project_plan.svg",
                description: `
                    <p>Bir finansal analist ekibi gibi davranan otonom bir generative AI sistemi olarak tasarlandı. LangGraph ile uygulanan multi-agent "supervisor-worker" mimarisini kullanarak basit chatbot arayüzlerinin ötesine geçiyor.</p>
                    <h3>Mimari Detaylar</h3>
                    <ul>
                        <li><strong>Supervisor Agent:</strong> Kullanıcı sorgularını yorumlayan ve görevleri uzman ajanlara devreden bir LLM (Llama 3).</li>
                        <li><strong>Uzman Ajanlar:</strong> Belirli araçlarla donatılmış bağımsız ajanlar (Teknik, Temel, Haber Analizi).</li>
                    </ul>
                `,
                links: [{ text: "Kaynak Koduna Git", url: "https://github.com/MuhammetAliVarlik/agenticinvestingengine", icon: "fab fa-github" }]
            },
            'moviescout': {
                title: "Movie Scout: RAG Tabanlı Konuşmalı Öneri Sistemi",
                tags: ["RAG", "Semantic Search", "Flask", "Vector DB", "Full-Stack"],
                image: "https://github.com/MuhammetAliVarlik/MovieScout/blob/main/docs/demo/home.png?raw=true",
                description: `
                    <p>Doğal dil sorgularına dayalı, son derece kişiselleştirilmiş öneriler sunmak için Retrieval-Augmented Generation (RAG) kullanan uçtan uca konuşmalı film öneri sistemi.</p>
                    <h3>Teknoloji Yığını</h3>
                    <p>Backend'de Flask, modern bir JavaScript/HTML frontend ile inşa edildi. Sorunsuz bir kullanıcı deneyimi için asenkron veri yükleme işliyor. Semantic search için Vector Embeddings kullanıyor.</p>
                `,
                links: [{ text: "Kaynak Koduna Git", url: "https://github.com/MuhammetAliVarlik/moviescout", icon: "fab fa-github" }]
            },
            'realestate': {
                title: "Real Estate AI: Full-Stack GenAI Sistemi",
                tags: ["Anomaly Detection", "Regresyon", "Clustering", "GenAI Agent"],
                image: "https://github.com/MuhammetAliVarlik/RealEstateAI/blob/main/docs/screenshoots/MainScreen.png?raw=true",
                description: `
                    <p>Klasik makine öğrenmesi modellerini bir generative AI ajanı için "araç" olarak entegre eden, emlak alanına yönelik kapsamlı bir AI sistemi.</p>
                    <h3>Makine Öğrenmesi Modülleri</h3>
                    <ul>
                        <li><strong>Fiyat Tahmini:</strong> İstanbul konut verisi üzerinde eğitilmiş XGBoost regresyon modeli.</li>
                        <li><strong>Anomaly Detection:</strong> Aşırı/düşük fiyatlı mülkleri tespit etmek için Isolation Forest modeli.</li>
                        <li><strong>Clustering:</strong> Mülkleri yatırım tipine göre kategorize etmek için K-Means.</li>
                    </ul>
                `,
                links: [{ text: "Kaynak Koduna Git", url: "https://github.com/MuhammetAliVarlik/realestateai", icon: "fab fa-github" }]
            },
            'btc': {
                title: "BTC/USDT Fiyat Sınıflandırması",
                tags: ["Deep Learning", "CNN-LSTM", "TensorFlow", "Time-Series"],
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGLtb5S3HTxTmU8MmXBZkKMNyXUWDUiN5_w&s",
                description: `
                    <p>Geçmiş OHLCV verisinden türetilen teknik göstergeleri kullanarak 6 saatlik bir ufukta BTC/USDT fiyat hareketlerini sınıflandıran araştırma odaklı bir proje.</p>
                    <h3>Teknik Yaklaşım</h3>
                    <p>TensorFlow kullanarak hibrit bir <strong>CNN-LSTM</strong> mimarisi uyguladım. CNN katmanları kısa vadeli trendlerden lokal özellikler çıkarırken, LSTM katmanları uzun vadeli zamansal bağımlılıkları yakalıyor.</p>
                `,
                links: [{ text: "Kaynak Koduna Git", url: "https://github.com/MuhammetAliVarlik/BTC-USDT-Price-Movement-Classification", icon: "fab fa-github" }]
            }
        }
    };


    // ------------------------------------------------------------------
    // 3. MODAL LOGIC
    // ------------------------------------------------------------------
    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-content');
    const closeModalBtn = document.getElementById('close-modal');
    const projectCards = document.querySelectorAll('.bento-card.clickable');

    function openModal(projectId) {
        const data = projectsData[currentLang][projectId];
        if (!data) return;

        const tagsHtml = data.tags.map(tag => `<span>${tag}</span>`).join('');

        let imageHtml = '';
        if (data.image) {
            imageHtml = `<div class="modal-image-container"><img src="${data.image}" alt="${data.title}"></div>`;
        } else {
            imageHtml = `<div class="modal-image-container"><i class="fas fa-microchip modal-image-placeholder"></i></div>`;
        }

        const linksHtml = data.links.map(link => `
            <a href="${link.url}" target="_blank" class="btn-secondary">
                <i class="${link.icon}"></i> ${link.text}
            </a>
        `).join('');

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${data.title}</h2>
                <div class="modal-tags">${tagsHtml}</div>
            </div>
            ${imageHtml}
            <div class="modal-details">
                ${data.description}
            </div>
            <div class="modal-links">
                ${linksHtml}
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { modalBody.innerHTML = ''; }, 300);
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });


    // ------------------------------------------------------------------
    // 4. SCROLL PROGRESS & SPOTLIGHT & TYPING
    // ------------------------------------------------------------------

    // Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + "%";

        const nav = document.querySelector('.floating-nav');
        if (scrollTop > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // Spotlight
    const cards = document.querySelectorAll('.skill-card, .bento-card');
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Typing
    function renderTypedSubtitle(lang) {
        const subtitleElement = document.querySelector('.hero-subtitle');
        if (!subtitleElement) return;
        const originalText = translations[lang]["hero.subtitle"];
        const words = originalText.split(' ');

        subtitleElement.innerHTML = words.map(word =>
            `<span class="word-fade" style="opacity:0; display:inline-block; margin-right:5px; transition: opacity 0.5s ease">${word}</span>`
        ).join('');

        const spans = subtitleElement.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => { span.style.opacity = 1; }, 100 + (index * 25));
        });
    }

    // Scroll Reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });

    // Email Protection
    const contactBtn = document.getElementById('contact-btn');
    if(contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const user = "iletisim.muhammetalivarlik";
            const domain = "gmail.com";
            window.location.href = `mailto:${user}@${domain}`;
        });
    }

    // ------------------------------------------------------------------
    // 5. INITIALIZE LANGUAGE
    // ------------------------------------------------------------------
    applyTranslations(currentLang);

    console.log("Portfolio Loaded: Visuals & Particles Active");
});
