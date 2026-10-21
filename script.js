// ========================================
// 1. LIGHT AND DARK THEME
// ========================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        themeToggle.textContent = isLight ? "☾" : "☼";

        localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
    });
}


// ========================================
// 2. REMEMBER SELECTED THEME
// ========================================

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");

    if (themeToggle) {
        themeToggle.textContent = "☾";
    }
}


// ========================================
// 3. MOBILE HAMBURGER MENU
// ========================================

const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("nav-links");

if (hamburger && navigation) {

    hamburger.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a navigation link
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navigation.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedHamburger) {
            navigation.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
    });

    // Close mobile menu when switching to desktop size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 950) {
            navigation.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
    });
}


// ========================================
// 4. ACTIVE NAVIGATION STATE
// ========================================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// ========================================
// 5. PROJECT DETAILS FOR POPUP MODALS
// ========================================

const projectDetails = {

    "digital-tree": {
        title: "Digital Tree",
        image: "images/digital-tree.png",

        description:
            "Digital Tree is a goal-tracking website concept designed to help users organize daily goals, track their progress, and stay motivated. The project focuses on an engaging interface with a tree-growth theme.",

        technologies: ["HTML", "CSS", "JavaScript"],

        demo: "",

        source: ""
    },

    "campus-connect": {
        title: "CampusConnect",
        image: "images/campus-connect.png",

        description:
            "CampusConnect is a smart university platform project designed to bring useful student services together in one place. Its planned features include student registration, login, course information, attendance, and academic results.",

        technologies: ["Java", "Spring Boot", "MySQL", "HTML", "CSS"],

        demo: "",

        source: "https://github.com/oadnisha805-spec/CampusConnect"
    }

};


// ========================================
// 6. OPEN PROJECT POPUP
// ========================================

const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalTechnologies = document.getElementById("modal-technologies");
const modalDemo = document.getElementById("modal-demo");
const modalSource = document.getElementById("modal-source");
const modalClose = document.getElementById("modal-close");

let previouslyFocusedElement = null;

function openProjectModal(projectKey) {

    const project = projectDetails[projectKey];

    if (!project || !projectModal) {
        return;
    }

    previouslyFocusedElement = document.activeElement;

    // Set project information
    if (modalTitle) {
        modalTitle.textContent = project.title;
    }

    if (modalDescription) {
        modalDescription.textContent = project.description;
    }

    // Set project screenshot
    if (modalImage) {
        modalImage.src = project.image;
        modalImage.alt = project.title + " project screenshot";

        modalImage.onerror = function () {
            modalImage.style.display = "none";
        };

        modalImage.onload = function () {
            modalImage.style.display = "block";
        };
    }

    // Add technology tags
    if (modalTechnologies) {
        modalTechnologies.replaceChildren();

        project.technologies.forEach(function (technology) {
            const tag = document.createElement("span");

            tag.className = "tech-tag";
            tag.textContent = technology;

            modalTechnologies.appendChild(tag);
        });
    }

    // Configure demo button
    if (modalDemo) {
        if (project.demo) {
            modalDemo.href = project.demo;
            modalDemo.style.display = "inline-flex";
        } else {
            modalDemo.removeAttribute("href");
            modalDemo.style.display = "none";
        }
    }

    // Configure source-code button
    if (modalSource) {
        if (project.source) {
            modalSource.href = project.source;
            modalSource.target = "_blank";
            modalSource.rel = "noopener noreferrer";
            modalSource.style.display = "inline-flex";
        } else {
            modalSource.removeAttribute("href");
            modalSource.style.display = "none";
        }
    }

    // Show popup
    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (modalClose) {
        modalClose.focus();
    }
}


// Find all project popup buttons
document.querySelectorAll("[data-modal-project]").forEach(function (button) {

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const projectKey = button.getAttribute("data-modal-project");

        openProjectModal(projectKey);
    });

});


// ========================================
// 7. CLOSE PROJECT POPUP
// ========================================

function closeProjectModal() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}


// Close when clicking the X button
if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
}


// Close when clicking outside the popup content
if (projectModal) {
    projectModal.addEventListener("click", function (event) {

        if (event.target === projectModal) {
            closeProjectModal();
        }

    });
}


// Close popup using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (projectModal && projectModal.classList.contains("active")) {
            closeProjectModal();
        }

        if (navigation && hamburger) {
            navigation.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }

    }

});


// ========================================
// 8. CONSOLE MESSAGE
// ========================================

console.log("Welcome to Nisha's Portfolio!");
console.log("Built with HTML, CSS, and JavaScript.");
console.log("Theme toggle, mobile menu, and project modals are ready.");