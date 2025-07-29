document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[id]");
  const menuLinks = document.querySelectorAll(".side-icon-menu ul li a");

  // Sayfa yüklendiğinde otomatik olarak Hakkımda kısmına kaydır
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    window.scrollTo({
      top: aboutSection.offsetTop - 60,
      behavior: 'smooth'
    });
  }

  // Aktif menü linkini belirleyen fonksiyon
  function setActiveLink() {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight - 60) {
        current = section.getAttribute("id");
      }
    });

    menuLinks.forEach(link => {
      const linkTarget = link.getAttribute("href").substring(1);
      if (linkTarget === current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Scroll olaylarını dinle
  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // İlk yüklemede kontrol

  // Menüdeki ikonlara tıklanma durumunda smooth scroll ve aktiflik güncellemesi
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });

        // Scroll animasyonu sonrası aktifliği ayarla
        setTimeout(setActiveLink, 500);
      }
    });
  });
});

  async function loadData(lang = "en") {
    try {
      const res = await fetch('static/lang/translations.json');
      const data = await res.json();
      const content = data[lang];
  
      // Hakkımda
const aboutSection = document.querySelector("#about");
aboutSection.querySelector("h2").textContent = content.about.title;
aboutSection.querySelector("p").innerHTML = content.about.text;

// Yetkinlikler
const skillsSection = document.querySelector("#skills");
skillsSection.querySelector("h3").textContent = content.skills.title;

// Yetkinlik gruplarını doldur
Object.entries(content.skills.groups).forEach(([key, group]) => {
  const groupDiv = skillsSection.querySelector(`.skill-group h4[data-skill-group="${key}"]`);
  if (groupDiv) {
    groupDiv.textContent = group.name;
    const ul = groupDiv.nextElementSibling;
    ul.innerHTML = "";
    group.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
});

  
      // İş deneyimi
const experienceSection = document.querySelector("#experience");
experienceSection.querySelector("h2").textContent = content.experience.title;
const experienceList = document.getElementById("experience-list");
experienceList.innerHTML = ""; // Temizle

content.experience.items.forEach(item => {
  const div = document.createElement("div");
  div.className = "timeline-item";

  // Açıklama dizi mi değil mi kontrol et
  let descriptionHTML = "";
  if (Array.isArray(item.description)) {
    descriptionHTML = `
      <ul>
        ${item.description.map(line => `<li>${line}</li>`).join("")}
      </ul>
    `;
  } else {
    descriptionHTML = `<p>${item.description}</p>`;
  }

  // Link varsa göster
  const githubLinkHTML = item.link && item.link.repo
    ? `<small><i class="fab fa-github"></i> <a href="${item.link.repo}" target="_blank" rel="noopener">${item.link.title}</a></small>`
    : "";

  div.innerHTML = `
    <img src="${item.companyLogo}" alt="${item.title} Logo" class="company-logo" />
    <div class="timeline-content">
      <h4>${item.title}</h4>
      <small>${item.date}</small>
      ${descriptionHTML}
      ${githubLinkHTML}
    </div>
  `;

  experienceList.appendChild(div);
});


  
      // Eğitim
      const educationSection = document.querySelector("#education");
educationSection.querySelector("h2").textContent = content.education.title;
const educationList = document.getElementById("education-list");
educationList.innerHTML = "";

content.education.items.forEach(item => {
  const div = document.createElement("div");
  div.className = "timeline-item";

  // GPA ve Majors varsa göster
  const gpaHTML = item.gpa ? `<li><small><strong>GPA:</strong> ${item.gpa}</small></li>` : "";
  const majorsHTML = item.majors ? `<li><small><strong>Major:</strong> ${item.majors}</small></li>` : "";

  div.innerHTML = `
    <img src="${item.companyLogo}" alt="${item.title} Logo" class="company-logo" />
    <div class="timeline-content">
      <h4>${item.title}</h4>
      <small>${item.date}</small>
      <ul>
      ${gpaHTML}
      ${majorsHTML}
      </ul>
    </div>
  `;

  educationList.appendChild(div);
});

  
      // Projeler
      const projectsSection = document.querySelector("#projects");
      projectsSection.querySelector("h2").textContent = content.projects.title;
      const projectsList = document.getElementById("projects-list");
      projectsList.innerHTML = "";
  
      content.projects.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "project-card";
        const githubLinkHTML = item.link && item.link.repo
        ? `<small><i class="fab fa-github"></i> <a href="${item.link.repo}" target="_blank" rel="noopener">${item.link.title}</a></small>`
        : "";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="project-content">
            <h4>${item.title}</h4>
            <small>${item.tech}</small>
            <p>${item.description}</p>
            ${githubLinkHTML}

          </div>
        `;
        projectsList.appendChild(div);
      });
  
    } catch (err) {
      console.error("Veri yüklenirken hata:", err);
    }
  }
  
  function setLanguage(lang) {
    // Buton aktifliklerini güncelle
    document.querySelectorAll('.language-switcher button').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
  
    // İçeriği seçilen dile göre yükle
    loadData(lang);
  }

  window.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');  // aktif butonu ayarla ve içerik yükle
  });
  