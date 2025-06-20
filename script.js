// =============================================
// ✅ Active Navbar link highlight on scroll
// =============================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// =============================================
// ✅ Typing effect
// =============================================

const texts = ["Programmer", "Instructor", "YouTuber", "Learner"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.querySelector(".typed-text").textContent = letter;

  if (letter.length === currentText.length) {
    setTimeout(() => {
      index = 0;
      count++;
      setTimeout(type, 500);
    }, 1500);
  } else {
    setTimeout(type, 100);
  }
})();

// =============================================
// ✅ GitHub Projects: Featured Carousel + All Projects Modal
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('#projectCarousel .carousel-inner');
  const allProjectsGrid = document.getElementById('allProjectsGrid');
  carouselInner.innerHTML = '';
  allProjectsGrid.innerHTML = '';

  const githubUsername = 'Seamaftab';
  const featuredProjects = ["ASHES", "Helmet-Detection-Using-YOLO", "PhoenixRiseHub"];
  const ignoreProjects = ["seamaftab.github.io"]; // lowercase on purpose!

  const techIcons = {
    "python": '<i class="devicon-python-plain colored"></i>',
    "php": '<i class="devicon-php-plain colored"></i>',
    "laravel": '<i class="devicon-laravel-plain colored"></i>',
    "cpp": '<i class="devicon-cplusplus-plain colored"></i>',
    "ino": '<i class="devicon-arduino-plain colored"></i>',
    "html": '<i class="devicon-html5-plain colored"></i>',
    "css": '<i class="devicon-css3-plain colored"></i>',
    "js": '<i class="devicon-javascript-plain colored"></i>',
    "bootstrap": '<i class="devicon-bootstrap-plain colored"></i>',
  };

  const techs = {
    "ASHES": ["cpp", "ino"],
    "Helmet-Detection-Using-YOLO": ["python"],
    "Satellite-Image-Classification": ["python"],
    "Credit-Management-Telegram-Bot": ["python"],
    "Affordability_Calculator": ["python"],
    "PhoenixRiseHub": ["php", "laravel", "css", "js", "html", "bootstrap"],
    "Electronic_HUT": ["css", "js", "html", "bootstrap"],
    "DigitalShop": ["php", "laravel", "css", "js", "html", "bootstrap"],
    "Image-Forgery-Detection-Using-Machine-Learning" : ["python"]
  };

  const thumbnails = {
    "ASHES": "images/projects/ashes.png",
    "Helmet-Detection-Using-YOLO": "images/projects/helmet.png",
    "Satellite-Image-Classification": "images/projects/satellite.png",
    "Credit-Management-Telegram-Bot": "images/projects/bot.png",
    "Affordability_Calculator": "images/projects/calculator.png",
    "PhoenixRiseHub": "images/projects/phoenix.png",
    "Electronic_HUT": "images/projects/hut.png",
    "DigitalShop": "images/projects/digitalshop.png",
    "Image-Forgery-Detection-Using-Machine-Learning" : "images/projects/forgery.png",
    "default": "images/projects/default.webp"
  };

  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(response => response.json())
    .then(repos => {
      repos.forEach((repo) => {
        const repoName = repo.name.toLowerCase();
        if (ignoreProjects.includes(repoName)) return;

        const isFeatured = featuredProjects.includes(repo.name);
        const thumbnail = thumbnails[repo.name] || thumbnails["default"];
        const projectTechs = techs[repo.name] || [];
        const iconsHTML = projectTechs.map(tech => techIcons[tech] || '').join(' ');

        // ✅ Featured → Carousel
        if (isFeatured) {
          const item = document.createElement('div');
          item.classList.add('carousel-item');
          if (carouselInner.children.length === 0) item.classList.add('active');

          item.innerHTML = `
            <div class="mobile-thumbnail d-block d-md-none position-relative"
              data-title="${repo.name.toUpperCase()}"
              data-techs="${projectTechs.join(',')}"
              data-description="${repo.description || 'No description provided.'}"
              data-image="${thumbnail}"
              data-link="${repo.html_url}">
              <img src="${thumbnail}" alt="${repo.name}" class="img-fluid w-100 rounded">
              <div class="overlay d-flex flex-column">
                <h3>${repo.name.toUpperCase()}</h3>
                <div class="tech-icons">${iconsHTML}</div>
              </div>
            </div>
            <div class="row h-100 align-items-center justify-content-center d-none d-md-flex">
              <div class="col-md-6">
                <img src="${thumbnail}" alt="${repo.name}" class="img-fluid rounded">
              </div>
              <div class="col-md-6 text-center text-md-start">
                <h3>${repo.name.toUpperCase()}</h3>
                <div class="tech-icons">${iconsHTML}</div>
                <p>${repo.description || 'No description provided.'}</p>
                <a href="${repo.html_url}" target="_blank" class="btn submit-btn mt-2">View Project</a>
              </div>
            </div>`;
          carouselInner.appendChild(item);
        }

        // ✅ All Projects → Modal grid
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
          <div class="project-card text-center">
            <img src="${thumbnail}" alt="${repo.name}">
            <h5>${repo.name.toUpperCase()}</h5>
            <div class="tech-icons">${iconsHTML}</div>
            <p>${repo.description || 'No description provided.'}</p>
            <a href="${repo.html_url}" target="_blank" class="btn btn-sm submit-btn">View on GitHub</a>
          </div>`;
        allProjectsGrid.appendChild(card);
      });
    })
    .catch(err => console.error(err));

  // ✅ Mobile Thumbnail → Modal
  document.addEventListener('click', e => {
    const thumb = e.target.closest('.mobile-thumbnail');
    if (!thumb) return;
    const title = thumb.dataset.title;
    const techKeys = thumb.dataset.techs.split(',');
    const description = thumb.dataset.description;
    const image = thumb.dataset.image;
    const link = thumb.dataset.link;
    const iconsHTML = techKeys.map(t => techIcons[t] || '').join(' ');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalIcons').innerHTML = iconsHTML;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalLink').href = link;
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
  });
});



// =============================================
// ✅ Contact form logic
// =============================================

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');

  if (name && email && message) {
    status.textContent = 'Thank you for your message!';
    status.style.color = 'green';
    this.reset();
  } else {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'red';
  }
});
