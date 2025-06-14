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
// ✅ Dynamic GitHub Projects Carousel
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('#projectCarousel .carousel-inner');
  carouselInner.innerHTML = '';

  const githubUsername = 'Seamaftab';

  // Master icon map to reuse for both desktop & modal
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

  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(response => response.json())
    .then(repos => {
      const techs = {
        "ASHES": ["cpp", "ino"],
        "Helmet-Detection-Using-YOLO": ["python"],
        "Satellite-Image-Classification": ["python"],
        "Credit-Management-Telegram-Bot": ["python"],
        "Affordability_Calculator": ["python"],
        "PhoenixRiseHub": ["php", "laravel", "css", "js", "html", "bootstrap"],
        "Electronic_HUT": ["css", "js", "html"],
        "DigitalShop": ["php", "laravel", "css", "js", "html", "bootstrap"]
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
        "default": "images/projects/default.webp"
      };

      repos.forEach((repo, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) item.classList.add('active');

        const thumbnail = thumbnails[repo.name] || thumbnails["default"];
        const projectTechs = techs[repo.name] || [];
        const iconsHTML = projectTechs.map(tech => techIcons[tech] || '').join(' ');

        item.innerHTML = `
          <!-- ✅ Mobile: clickable thumbnail with SAFE data-techs -->
          <div class="mobile-thumbnail d-block d-md-none position-relative"
               data-title="${repo.name.toUpperCase()}"
               data-techs="${projectTechs.join(',')}"
               data-description="${repo.description || 'No description provided.'}"
               data-image="${thumbnail}"
               data-link="${repo.html_url}">
            <img src="${thumbnail}" alt="${repo.name}" class="img-fluid w-100 rounded">
            <div class="overlay">
              <h3>${repo.name.toUpperCase()}</h3>
            </div>
          </div>

          <!-- ✅ Desktop: split layout with image & icons directly -->
          <div class="row h-100 align-items-center justify-content-center d-none d-md-flex">
            <div class="col-md-6 h-100 d-flex align-items-center">
              <img src="${thumbnail}" alt="${repo.name}" class="img-fluid rounded mx-auto d-block">
            </div>
            <div class="col-md-6 h-100 d-flex flex-column justify-content-center text-center text-md-start">
              <h3>${repo.name.toUpperCase()}</h3>
              <div class="tech-icons">${iconsHTML}</div>
              <p>${repo.description || 'No description provided.'}</p>
              <a href="${repo.html_url}" target="_blank" class="btn submit-btn mt-2">View Project</a>
            </div>
          </div>
        `;

        carouselInner.appendChild(item);
      });

      if (repos.length === 0) {
        carouselInner.innerHTML = `
          <div class="carousel-item active">
            <p>No projects found on GitHub.</p>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
      carouselInner.innerHTML = `
        <div class="carousel-item active">
          <p>Error loading projects.</p>
        </div>
      `;
    });

  // =============================================
  // ✅ Mobile Thumbnail Click → Open Modal
  // =============================================

  document.addEventListener('click', function (e) {
    const thumb = e.target.closest('.mobile-thumbnail');
    if (!thumb) return;

    const title = thumb.getAttribute('data-title');
    const techKeys = thumb.getAttribute('data-techs').split(',').filter(Boolean);
    const description = thumb.getAttribute('data-description');
    const image = thumb.getAttribute('data-image');
    const link = thumb.getAttribute('data-link');

    // ✅ Rebuild icons safely for modal
    const iconsHTML = techKeys.map(tech => techIcons[tech] || '').join(' ');

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
// ✅ YouTube
// =============================================


const apiKey = 'AIzaSyBGpmWOJ8SJjdU7pMY8thH2bL0SQWlLSKU';
const channelId = 'UCgZ0pLZFIKdj6Fj1lHEk3jw';

fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
  const stats = data.items[0].statistics;
  const subs = stats.subscriberCount || 1974;
  const views = stats.viewCount || 1002641;

  document.getElementById('yt-subs').textContent = Number(subs).toLocaleString();
  document.getElementById('yt-views').textContent = Number(views).toLocaleString();
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
