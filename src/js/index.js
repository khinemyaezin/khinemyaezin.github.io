import "../scss/style.scss";
import AOS from "aos";
import "jquery";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/scrollspy";
import TextType from "./text-type";
import SpaceAnimation from "./space";

class Portfolio {
  constructor() {
    this.projects = [
      {
        title: "Featured Project",
        subtitle: "Cable Locator",
        desc: "Cable Detection Service landing website with ability to submit quote requests and control by admin page.",
        published_year: "Nov 2022",
        languages: ["Javascript with Jquery", "Firebase", "Bootstrap"],
        links: [
          {
            url: "https://cablelocator.net",
            icon: "box-arrow-up-right",
          },
        ],
        imgSrc: "assets/cablelocator.png",
      },
      {
        title: "Featured Project",
        subtitle: "Business website",
        desc: "Website using Laravel, pure js as front-end with Bootstrap. Provide with admin dashboard and customizable themes.",
        published_year: "2022",
        languages: ["Laravel", "Jquery", "Bootstrap"],
        links: [
          {
            url: "https://github.com/khinemyaezin/Jupitor",
            icon: "github",
          },
          {
            url: "https://khinemyaezin.com/Jupitor/",
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
        published_year: "2022",
        languages: ["Laravel", "Bootstrap", "Angular"],
        links: [],
        imgSrc: "assets/ecommerce.png",
      },
      {
        title: "Featured Project",
        subtitle: "Unicode Typing Master",
        desc: `Developed during transitional period of <span class="highlight">Zawgyi to
          Unicode</span>.`,
        published_year: "2020",

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

    this.workingExp = [
      {
        position: "Backend Developer",
        companyName: "Yomabank",
        companyURL: "https://yomabank.com/",
        fromDate: "2023",
        toDate: "present",
        responsiblity: [
          {
            role: "Business Banking:",
            description: [
              "Optimized the user registration process of middleware service by implementing enhanced API design and utilizing a non-blocking request handling system, achieving a 50% reduction in registration time and significant enhancements in resource efficiency.",
              "Standardized error handling across microservices by implementing a uniform exception-handling process, resulting in 100% consistency and reliability in error management throughout the system.",
              "Built APIs for the bank operation dashboard project, sunsetting third-party service and resulting in million-dollar savings for the company.",
              "Enhanced query optimization within the transaction service, leading to a 30% increase in data fetching speed for user transactions.",
            ],
          },
        ],
      },
      {
        position: "Developer",
        companyName: "MIT",
        companyURL: "https://www.mit.com.mm/",
        fromDate: "2019",
        toDate: "2021",
        responsiblity: [
          {
            role: "Retail Point of Sale System Developer and Maintainer:",
            description: [
              "Led the end-to-end development of the retail project's backend service, serving a daily active clientele of over 5,000 local retailers across the region.",
              "Developed an admin dashboard module for a delivery project, empowering customers to monitor delivery routes and track ordered items.",
              "Implemented a feature in the surveyor application utilizing the Google Maps service to analyze surroundings and propose optimal merchandise placement based on context.",
              "Contributed to seamlessly integrating accounting processes with SAP BAPIs, ensuring accurate data migration with minimal discrepancies.",
            ],
          },
        ],
      },
    ];
  }

  init() {
    this.menu();
    this.scrollWindow();
    new TextType(document.querySelector(".typewrite-v2"), [
      "Data Whisperer.",
      "Code Conjurer.",
      "Backend Enchanter.",
      "Data Dynamo.",
    ]);
    this.prepareProjects();
    this.runAos();
    this.space = new SpaceAnimation(document.getElementById("c"));
    this.space.load();
    this.resizeWindow();
  }

  menu() {
    $("body").on("click", ".js-nav-toggle", function (event) {
      event.preventDefault();

      if ($("#ftco-nav").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  }

  scrollWindow() {
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
      $(".cube-container").css({
        top: st / -3.5 + "px",
      });
    });
  }

  resizeWindow() {
    document.addEventListener("resize", this.space.resizeCanvas);
  }

  prepareProjects() {
    this.projects.forEach((proj, index) => {
      const htmlProjEl = $.parseHTML(this.getHTMLProject(proj, index));
      $(".project-container").append(htmlProjEl);
    });
    this.workingExp.forEach((company, index) => {
      const htmlWorkingExperience = $.parseHTML(
        this.getWorkingExcepiences(company, index)
      );
      $(".work-container .accordion").append(htmlWorkingExperience);
    });
  }

  getHTMLProject(proj, index) {
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

  getWorkingExcepiences(company, index) {
    const id = company.companyName.toLowerCase();
    const init = 300;
    return `
      <div class="accordion-item">
        <div class="accordion-header" id="${id}-header">
          <div class="accordion-button collapsed shadow-none flex-column justify-content-start" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
            <div class="w-100 role">${company.position}
              <a href=${
                company.companyURL
              }" class="highlight ms-3 company-name ">@ ${
      company.companyName
    }</a>
            </div>
            <span class="w-100 duration">${company.fromDate} - ${
      company.toDate
    }</span>
          </div>
        </div>
        <div id="${id}" class="accordion-collapse collapse ${
      index == 0 ? "show" : ""
    }" aria-labelledby="${id}" data-bs-parent="#work-section-accordion">
          <div class="accordion-body">
              ${company.responsiblity
                .map(
                  (resp_value, resp_index) =>
                    `<ul>
                    
                    <li>${resp_value.description
                      .map(
                        (desc_value, desc_index) =>
                          `<li class='box-container mb-2' data-aos-once="true" data-aos="zoom-out-left" data-aos-once="true" data-aos-delay="${
                            init * desc_index
                          }">
                        <span class="indicator"></span>
                        <p>${desc_value}</p>
                      </li>`
                      )
                      .join(" ")}
                    </li>
                </ul>`
                )
                .join(" ")}
          </div>
        </div>
      </div>`;
  }

  runAos() {
    AOS.init({
      duration: 800,
      easing: "slide",
      once: false,
      startEvent: "DOMContentLoaded",
    });
  }
}

// Create the Portfolio instance and initialize the functionality
const portfolio = new Portfolio();
window.onload = () => {
  portfolio.init();
};
