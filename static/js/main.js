document.addEventListener("DOMContentLoaded", () => {
    
    // ------------------------------------------------------------------
    // 1. BACKGROUND CANVAS ANIMATION (PARTICLE NETWORK)
    // ------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Settings for "Data Tech" vibe
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
                ctx.fillStyle = `rgba(212, 255, 0, ${this.alpha})`; // Neon Lime
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
                // Draw Connections
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
    // 2. PROJECT DATA (MODAL CONTENT)
    // ------------------------------------------------------------------
    const projectsData = {
        'finwise': {
            title: "Finwise Scribe: Neuro-Symbolic AI Engine",
            tags: ["Master's Thesis", "Neuro-Symbolic AI", "MLOps", "FastAPI", "Redis/Celery", "Llama 3"],
            image: "https://github.com/MuhammetAliVarlik/finwisebackend/blob/develop/docs/architecture.png?raw=true", 
            description: `
                <p>Developed as a Master's thesis, Finwise Scribe addresses the limitations of purely quantitative financial models by integrating qualitative reasoning from Large Language Models.</p>
                <h3>Key Challenges & Solutions</h3>
                <ul>
                    <li><strong>Challenge:</strong> Combining structured time-series data with unstructured market news for accurate signals.</li>
                    <li><strong>Solution (Neuro-Symbolic):</strong> Fused an LSTM model (for quantitative trend analysis) with a fine-tuned Llama 3 model (for qualitative sentiment and reasoning) using a weighted ensemble approach.</li>
                    <li><strong>Architecture:</strong> Designed an Event-Driven Architecture using FastAPI for the front, Redis as a message broker, and Celery workers to handle heavy inference tasks asynchronously.</li>
                </ul>
            `,
            links: [
                { text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/finwisebackend", icon: "fab fa-github" }
            ]
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
            links: [
                { text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/agenticinvestingengine", icon: "fab fa-github" }
            ]
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
            links: [
                { text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/moviescout", icon: "fab fa-github" }
            ]
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
            links: [
                { text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/realestateai", icon: "fab fa-github" }
            ]
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
            links: [
                { text: "View Source Code", url: "https://github.com/MuhammetAliVarlik/BTC-USDT-Price-Movement-Classification", icon: "fab fa-github" }
            ]
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
        const data = projectsData[projectId];
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
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        const originalText = "Hi, I'm Muhammet Ali Varlık. An AI Engineer & Data Science Master's Student with production-grade software skills. I build scalable ML pipelines, backend systems, and apply LLMs & Deep Learning to solve industrial problems.";
        subtitleElement.innerHTML = ""; 
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

    console.log("Portfolio Loaded: Visuals & Particles Active");
});