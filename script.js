/* ========================================
   Smart Navbar
======================================== */

const navbar = document.getElementById("smartNavbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});


/* ========================================
   Active Nav Link on Scroll
======================================== */

const navLinks = document.querySelectorAll(".smart-navbar .nav-link");

const sections = [
  "about",
  "expertise",
  "projects",
  "research",
  "experience",
  "education",
  "beyond-code",
  "contact"
];

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = sectionId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


/* ========================================
   Close Mobile Navbar After Click
======================================== */

const navbarCollapse = document.getElementById("navbarContent");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth >= 992 || !navbarCollapse) {
      return;
    }

    const collapseInstance =
      bootstrap.Collapse.getInstance(navbarCollapse);

    if (collapseInstance) {
      collapseInstance.hide();
    }
  });
});


/* ========================================
   Typing Effect
======================================== */

const typedText = document.querySelector(".typed-text");

const typingTexts = [
  "Bangla NLP",
  "Backend Systems",
  "Machine Learning",
  "Applied Research"
];

let typingTextIndex = 0;
let typingCharacterIndex = 0;
let isDeleting = false;


function runTypingEffect() {
  if (!typedText) {
    return;
  }

  const currentText = typingTexts[typingTextIndex];


  if (!isDeleting) {
    typingCharacterIndex++;

    typedText.textContent =
      currentText.substring(0, typingCharacterIndex);

    if (typingCharacterIndex === currentText.length) {
      isDeleting = true;

      setTimeout(runTypingEffect, 1400);

      return;
    }
  }

  else {
    typingCharacterIndex--;

    typedText.textContent =
      currentText.substring(0, typingCharacterIndex);

    if (typingCharacterIndex === 0) {
      isDeleting = false;

      typingTextIndex =
        (typingTextIndex + 1) % typingTexts.length;
    }
  }


  const typingSpeed =
    isDeleting ? 55 : 90;

  setTimeout(runTypingEffect, typingSpeed);
}


runTypingEffect();


/* ========================================
   GitHub Project Explorer
======================================== */

const githubUsername = "Seamaftab";

const projectsModal =
  document.getElementById("projectsModal");

const allProjectsGrid =
  document.getElementById("allProjectsGrid");

const projectsLoading =
  document.getElementById("projectsLoading");

const projectsError =
  document.getElementById("projectsError");

let githubProjects = [];
let projectsLoaded = false;


/* ========================================
   Known Project Metadata
======================================== */

const projectMetadata = {

  "ASHES": {
    category: "other",
    tags: [
      "IoT",
      "Automation",
      "Smart Home"
    ]
  },

  "PhoenixRiseHub": {
    category: "web",
    tags: [
      "Laravel",
      "PHP",
      "MySQL"
    ]
  },

  "DigitalShop": {
    category: "web",
    tags: [
      "Laravel",
      "PHP",
      "E-Commerce"
    ]
  },

  "Satellite-Image-Classification": {
    category: "ml",
    tags: [
      "Python",
      "CNN",
      "Deep Learning"
    ]
  },

  "Helmet-Detection-Using-YOLO": {
    category: "ml",
    tags: [
      "YOLO",
      "Computer Vision",
      "Python"
    ]
  },

  "Image-Forgery-Detection-Using-Machine-Learning": {
    category: "ml",
    tags: [
      "Machine Learning",
      "Python",
      "Computer Vision"
    ]
  },

  "Credit-Management-Telegram-Bot": {
    category: "other",
    tags: [
      "Telegram Bot",
      "Automation",
      "Python"
    ]
  },

  "Affordability_Calculator": {
    category: "web",
    tags: [
      "Web",
      "Calculator"
    ]
  },

  "Electronic_HUT": {
    category: "web",
    tags: [
      "Web Application"
    ]
  }

};


/* ========================================
   Clean Repository Name
======================================== */

function cleanProjectName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}


/* ========================================
   Detect Project Category
======================================== */

function detectProjectCategory(repo) {

  if (projectMetadata[repo.name]) {
    return projectMetadata[repo.name].category;
  }


  const searchableContent = `
    ${repo.name}
    ${repo.description || ""}
    ${repo.language || ""}
  `.toLowerCase();


  const mlKeywords = [
    "machine learning",
    "deep learning",
    "neural network",
    "cnn",
    "yolo",
    "classification",
    "computer vision",
    "nlp",
    "transformer",
    "bert",
    "artificial intelligence"
  ];


  const webKeywords = [
    "laravel",
    "php",
    "website",
    "web app",
    "web application",
    "html",
    "css",
    "javascript",
    "bootstrap",
    "e-commerce",
    "ecommerce"
  ];


  if (
    mlKeywords.some((keyword) =>
      searchableContent.includes(keyword)
    )
  ) {
    return "ml";
  }


  if (
    webKeywords.some((keyword) =>
      searchableContent.includes(keyword)
    )
  ) {
    return "web";
  }


  return "other";
}


/* ========================================
   Generate Project Tags
======================================== */

function getProjectTags(repo) {

  if (projectMetadata[repo.name]) {
    return projectMetadata[repo.name].tags;
  }


  const tags = [];

  if (repo.language) {
    tags.push(repo.language);
  }


  const category =
    detectProjectCategory(repo);


  if (category === "ml") {
    tags.push("ML / AI");
  }

  if (category === "web") {
    tags.push("Web");
  }


  return [...new Set(tags)].slice(0, 3);
}


/* ========================================
   Render Projects
======================================== */

function renderProjects(filter = "all") {

  if (!allProjectsGrid) {
    return;
  }


  allProjectsGrid.innerHTML = "";


  const filteredProjects =
    githubProjects.filter((repo) => {

      if (filter === "all") {
        return true;
      }

      return (
        detectProjectCategory(repo) === filter
      );

    });


  filteredProjects.forEach((repo) => {

    const tags = getProjectTags(repo);

    const projectCard =
      document.createElement("article");

    projectCard.className =
      "archive-project";


    projectCard.innerHTML = `

      <div class="archive-project-top">

        <div class="archive-project-icon">
          <i class="far fa-folder"></i>
        </div>

        <a
          href="${repo.html_url}"
          target="_blank"
          rel="noopener noreferrer"
          class="archive-project-link"
          aria-label="Open ${repo.name} on GitHub"
        >
          <i class="fas fa-arrow-up-right-from-square"></i>
        </a>

      </div>


      <h3>
        ${cleanProjectName(repo.name)}
      </h3>


      <p class="archive-project-description">
        ${
          repo.description ||
          "A development project available on my GitHub."
        }
      </p>


      <div class="archive-project-tags">

        ${tags
          .map(
            (tag) =>
              `<span>${tag}</span>`
          )
          .join("")}

      </div>

    `;


    allProjectsGrid.appendChild(projectCard);

  });


  if (filteredProjects.length === 0) {

    allProjectsGrid.innerHTML = `

      <div class="projects-empty">
        No projects found in this category.
      </div>

    `;

  }
}


/* ========================================
   Load GitHub Repositories
======================================== */

async function loadGithubProjects() {

  if (
    projectsLoaded ||
    !allProjectsGrid
  ) {
    return;
  }


  if (projectsLoading) {
    projectsLoading.style.display = "flex";
  }

  if (projectsError) {
    projectsError.style.display = "none";
  }


  try {

    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
    );


    if (!response.ok) {
      throw new Error(
        `GitHub request failed: ${response.status}`
      );
    }


    const repositories =
      await response.json();


    githubProjects =
      repositories.filter((repo) => {

        const repoName =
          repo.name.toLowerCase();


        return (
          !repo.fork &&
          repoName !==
            githubUsername.toLowerCase() &&
          repoName !==
            "seamaftab.github.io"
        );

      });


    projectsLoaded = true;


    if (projectsLoading) {
      projectsLoading.style.display = "none";
    }


    renderProjects("all");

  }

  catch (error) {

    console.error(
      "GitHub projects error:",
      error
    );


    if (projectsLoading) {
      projectsLoading.style.display = "none";
    }


    if (projectsError) {
      projectsError.style.display = "block";
    }

  }
}


/* ========================================
   Load Projects When Modal Opens
======================================== */

if (projectsModal) {

  projectsModal.addEventListener(
    "show.bs.modal",
    loadGithubProjects
  );

}


/* ========================================
   Project Filters
======================================== */

const projectFilters =
  document.querySelectorAll(
    ".project-filter"
  );


projectFilters.forEach((button) => {

  button.addEventListener("click", () => {

    projectFilters.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });


    button.classList.add("active");


    const selectedFilter =
      button.dataset.filter;


    renderProjects(selectedFilter);

  });

});

/* ========================================
   Photography Lightbox
======================================== */

const galleryPhotos =
  document.querySelectorAll(".gallery-photo");

const photoLightbox =
  document.getElementById("photoLightbox");

const photoLightboxImage =
  document.getElementById("photoLightboxImage");

const photoLightboxClose =
  document.getElementById("photoLightboxClose");

const photoPrevious =
  document.getElementById("photoPrevious");

const photoNext =
  document.getElementById("photoNext");


const photographyImages =
  [...galleryPhotos].map((photo) =>
    photo.dataset.photo
  );


let currentPhotoIndex = 0;


function showPhoto(index) {

  if (
    !photoLightbox ||
    !photoLightboxImage ||
    photographyImages.length === 0
  ) {
    return;
  }


  currentPhotoIndex =
    (
      index +
      photographyImages.length
    ) %
    photographyImages.length;


  photoLightboxImage.src =
    photographyImages[currentPhotoIndex];


  photoLightbox.classList.add("active");

  photoLightbox.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


function closePhotoLightbox() {

  photoLightbox?.classList.remove("active");

  photoLightbox?.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";
}


galleryPhotos.forEach(
  (photo, index) => {

    photo.addEventListener(
      "click",
      () => showPhoto(index)
    );

  }
);


photoPrevious?.addEventListener(
  "click",
  () => showPhoto(currentPhotoIndex - 1)
);


photoNext?.addEventListener(
  "click",
  () => showPhoto(currentPhotoIndex + 1)
);


photoLightboxClose?.addEventListener(
  "click",
  closePhotoLightbox
);


photoLightbox?.addEventListener(
  "click",
  (event) => {

    if (event.target === photoLightbox) {
      closePhotoLightbox();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      !photoLightbox?.classList.contains("active")
    ) {
      return;
    }


    if (event.key === "Escape") {
      closePhotoLightbox();
    }


    if (event.key === "ArrowLeft") {
      showPhoto(currentPhotoIndex - 1);
    }


    if (event.key === "ArrowRight") {
      showPhoto(currentPhotoIndex + 1);
    }

  }
);

/* ========================================
   Automatic Footer Year
======================================== */

const currentYear =
  document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* ========================================
   Contact Form
   Temporary Front-End Behaviour
======================================== */

const contactForm =
  document.getElementById("contactForm");


contactForm?.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const name =
      document
        .getElementById("name")
        ?.value
        .trim();

    const email =
      document
        .getElementById("email")
        ?.value
        .trim();

    const message =
      document
        .getElementById("message")
        ?.value
        .trim();

    const status =
      document.getElementById("formStatus");


    if (!status) {
      return;
    }


    if (
      name &&
      email &&
      message
    ) {

      status.textContent =
        "Thank you for your message!";

      status.style.color =
        "green";

      this.reset();

    }

    else {

      status.textContent =
        "Please fill in all fields.";

      status.style.color =
        "red";

    }

  }
);