import "../scss/style.scss";
import AOS from "aos";
import "jquery";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/scrollspy";
import TextType from "./text-type";

require.context("../assets", false, /\.(png|jpe?g)$/i);
const projects = [
  {
    title: "Featured Project",
    subtitle: "Cable Detection",
    desc: "Cable Detection Service landing website.",
    published_year:'Nov 2022',
    languages: ["Javascript with Jquery","Firebase", "Bootstrap"],
    links: [
      {
        url: "https://cabledetection.netlify.app",
        icon: "box-arrow-up-right",
      },
    ],
    imgSrc: "assets/cabledetection.png",
  },
  {
    title: "Featured Project",
    subtitle: "Business website",
    desc: "Website using Laravel, pure js as front-end with Bootstrap. Provide with admin dashboard and customizable themes.",
    published_year:'2022',
    languages: ["Laravel", "Jquery", "Bootstrap"],
    links: [
      {
        url: "https://github.com/khinemyaezin/dynamic_business_website",
        icon: "github",
      },
      {
        url: "https://khinemyaezin.com/projects/business-website",
        icon: "box-arrow-up-right",
      },
    ],
    imgSrc: "assets/business-website.png",
  },
  {
    title: "Featured Project",
    subtitle: "Ecommerce",
    desc: `All in one place to create <span class="highlight">beautiful online stores</span>
    including dashboard and reports.`,
    published_year:'2022',

    languages: ["Laravel", "Bootstrap", "Angular"],
    links: [],
    imgSrc: "assets/ecommerce.png",
  },
  {
    title: "Featured Project",
    subtitle: "Unicode Typing Master",
    desc: `Developed during transitional period of <span class="highlight">Zawgyi to
    Unicode</span>.`,
    published_year:'2020',

    languages: ["C#"],
    links: [
      {
        url: "https://github.com/khinemyaezin/unicode-typing-master",
        icon: "github",
      },
      {
        url: "https://github.com/khinemyaezin/unicode-typing-master/tree/main/bin/Debug",
        icon: "download",
      },
    ],
    imgSrc: "assets/unicode-typing-master.png",
  },
];
window.onload = () => {
  menu();
  scrollWindow();
  new TextType(document.querySelector(".typewrite-v2"), [
    "I build crazy things.....",
  ]);
  prepareProjects();
  runAos();

  function menu() {
    $("body").on("click", ".js-nav-toggle", function (event) {
      event.preventDefault();

      if ($("#ftco-nav").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  }
  function scrollWindow() {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  }
  function prepareProjects() {
    projects.forEach((proj, index) => {
      const htmlProjEl = $.parseHTML(getHTMLProject(proj, index));
      $(".project-container").append(htmlProjEl);
    });
  }
  function getHTMLProject(proj, index) {
    let leftOrRight = index % 2 == 0 ? "right" : "left";
    const init = 300;

    return `
      <li class="feature-project">
      <div class="project-content">
        <div>
          <p class="project-overline">${proj.title}</p>
          <h5 class="project-title">${proj.subtitle}</h5>
          <div class="project-description" data-aos-once="true" data-aos="fade-${leftOrRight}">
            <p>${proj.desc}</p>
            <div><small>${proj.published_year}</small></div>
          </div>
          <ul class="project-language-list">
            ${proj.languages
              .map((lan, i) => {
                return `<li data-aos-once="true" data-aos="flip-${leftOrRight}" data-aos-delay="${
                  init * i
                }">${lan}</li>`;
              })
              .join(" ")}
          </ul>
          <div class="project-links">
          ${proj.links
            .map((link, i) => {
              return `<a href="${link.url}"
                aria-label="GitHub Link" rel="noopener noreferrer" target="_blank">
              <i class="bi bi-${link.icon}"></i>
            </a>`;
            })
            .join(" ")}
          
          </div>
        </div>
      </div>
      <div class="project-image" data-aos-once="true" data-aos="zoom-out-right">
        <div class="image-wrapper img">
          <picture>
            <img data-main-image src="${proj.imgSrc}">
          </picture>
        </div>
      </div>
    </li>
    `;
  }

  function runAos() {
    AOS.init({
      duration: 800,
      easing: "slide",
      once: false,
      startEvent: "DOMContentLoaded",
    });
  }
};
