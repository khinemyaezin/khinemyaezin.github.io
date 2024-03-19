import "../scss/style.scss";
import AOS from "aos";
import "jquery";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/scrollspy";
import TextType from "./text-type";
import { FirebaseInit } from "./utility/firebase";
import { doc, setDoc } from "firebase/firestore";

class Portfolio {
  firebase = new FirebaseInit();
  projects = {};
  workingExp = {};
  about = {};
  additional = {};

  constructor() {
    this.fetchData(["about", "projects", "professional_experiences","additional"]).then(
      (value) => {
        this.about = value["about"];
        this.projects = value["projects"];
        this.workingExp = value["professional_experiences"];
        this.additional = value['additional']
        this.init();
        console.log({ about: this.about, projects:this.projects, professional_experiences: this.workingExp, additional: this.additional});
      }
    );
    //this.updateData().then();
  }

  async fetchData(collections) {
    try {
      let data = {};
      for (let collection of collections) {
        let snapshot = await this.firebase.onFirstData(collection, []);
        let d = {};
        snapshot.docs.forEach((doc) => {
          d[doc.id] = doc.data();
        });
        data[collection] = d;
      }
      return data;
    } catch (error) {
      console.log(error);
      return "Our site is not avaliable in your region!";
    }
  }

  async updateData() {
    const data = {
      about: {
        "5Oql9AeleV6nDtteLI9w": {
          summary:
            '\t\t\t\t\t\t\t\tHello! I am <span class="highlight">Khine Myae</span>, a software developer with a passion for crafting elegant solutions. I deeply love coding and embrace a relentless curiosity, driving my continuous learning in this ever-evolving field.',
          skills: [
            "Java",
            "C#",
            "PHP",
            "Javascript",
            "SQL",
            "HTML",
            "CSS",
            "Spring Boot",
            "Angular",
            "Ionic",
            "Kafka",
            "Keycloak",
            "Maven",
            "gRPC",
            "Git",
          ],
          imgSrc:
            "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/profile_color.png?alt=media&token=dee673b9-f9cf-49bd-8c0a-a9afb4fc07f1",
          contact: [
            {
              icon: "github",
              url: "https://github.com/khinemyaezin",
              name: "github",
            },
            {
              icon: "linkedin",
              url: "https://www.linkedin.com/in/khinemyaezin",
              name: "linkedin",
            },
            {
              icon: "whatsapp",
              url: "https://api.whatsapp.com/send?phone=959795957915",
              name: "whatsapp",
            },
          ],
          email: "hello@khinemyaezin.com",
          phone: "+959795957915",
        },
      },
      projects: {
        project_1: {
          languages: ["Javascript with Jquery", "Firebase", "Bootstrap"],
          published_year: "Nov 2022",
          subtitle: "Cable Locator",
          links: [
            {
              icon: "box-arrow-up-right",
              url: "https://cablelocator.net",
            },
          ],
          title: "Featured Project",
          desc: "Cable Detection Service landing website with ability to submit quote requests and control by admin page.",
          imgSrc:
            "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/cablelocator.png?alt=media&token=e9d8b842-ef05-4f18-9b0d-097ece9544cf",
          active: true,
        },
        project_2: {
          languages: ["Laravel", "Jquery", "Bootstrap"],
          published_year: "2022",
          subtitle: "Business website",
          links: [
            {
              icon: "github",
              url: "https://github.com/khinemyaezin/Jupitor",
            },
            {
              icon: "box-arrow-up-right",
              url: "https://khinemyaezin.com/Jupitor/",
            },
          ],
          title: "Featured Project",
          desc: "Website using Laravel, pure js as front-end with Bootstrap. Provide with admin dashboard and customizable themes.",
          imgSrc:
            "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/business-website.png?alt=media&token=1f952707-b9fc-44ff-8ce4-b73b98e0594b",
          active: false,
        },
        project_3: {
          languages: ["Laravel", "Bootstrap", "Angular"],
          published_year: "2022",
          subtitle: "Ecommerce",
          links: [],
          title: "Featured Project",
          desc: 'All in one place to create <span class="highlight">beautiful online stores</span>\n          including dashboard and reports.',
          imgSrc:
            "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/ecommerce.png?alt=media&token=35633b0d-9b70-4ff4-86c3-0ddf7791c2b5",
          active: false,
        },
        project_4: {
          languages: ["C#"],
          published_year: "2020",
          subtitle: "Unicode Typing Master",
          links: [
            {
              icon: "github",
              url: "https://github.com/khinemyaezin/unicode-typing-master",
            },
            {
              icon: "download",
              url: "https://github.com/khinemyaezin/unicode-typing-master/tree/main/bin/Debug",
            },
          ],
          title: "Featured Project",
          desc: 'Developed during transitional period of <span class="highlight">Zawgyi to\n          Unicode</span>.',
          imgSrc:
            "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/unicode-typing-master.png?alt=media&token=df74ff92-d520-4ce3-a9be-19d31697d6f7",
          active: true,
        },
      },
      professional_experiences: {
        working_exp_1: {
          fromDate: "2023",
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
          companyName: "Yomabank",
          toDate: "present",
          companyURL: "https://yomabank.com/",
          position: "Backend Developer",
        },
        working_exp_2: {
          fromDate: "2019",
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
          companyName: "MIT",
          toDate: "2021",
          companyURL: "https://www.mit.com.mm/",
          position: "Developer",
        },
      },
      additional: {
        note: {
          footer: "blahblah",
        },
      },
    };
    let firebase = new FirebaseInit();
    for(const i in data) {
      for (const key in data[i]) {
        const ref = doc(firebase.getDb, i, key);
        await setDoc(ref, data[i][key], { merge: true })
          .then(() => {
            console.log("success");
          })
          .catch((e) => console.log(e));
      }
    }
  }

  async init() {
    this.menu();
    this.scrollWindow();
    new TextType(document.querySelector(".typewrite-v2"), [
      "Data Whisperer.",
      "Code Conjurer.",
      "Backend Enchanter.",
      "Data Dynamo.",
    ]);
    await this.prepareWorkingExperience();
    await this.prepareProjects();
    await this.prepareAbout();
    await this.prepareSocials();
    this.prepareRightEmail();
    this.prepareAdditional();
    this.runAos();
    $("body").removeClass("wait");
    // this.space = new SpaceAnimation(document.getElementById("c"));
    // this.space.load();
    // this.resizeWindow();
  }

  runAos() {
    AOS.init({
      duration: 800,
      easing: "slide",
      once: false,
      startEvent: "DOMContentLoaded",
    });
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
    return new Promise((resolve, reject) => {
      Object.values(this.projects)
        .filter((value) => value.active)
        .forEach((proj, index) => {
          const htmlProjEl = $.parseHTML(this.getHTMLProject(proj, index));
          $(".project-container").append(htmlProjEl);
        });
      resolve();
    });
  }

  prepareWorkingExperience() {
    return new Promise((resolve, reject) => {
      Object.values(this.workingExp).forEach((company, index) => {
        const htmlWorkingExperience = $.parseHTML(
          this.getWorkingExcepiences(company, index)
        );
        $(".work-container .accordion").append(htmlWorkingExperience);
      });
      resolve();
    });
  }

  prepareAbout() {
    return new Promise((resolve, reject) => {
      const about = Object.values(this.about).at(0);

      $("#profile_image").attr("src", about.imgSrc);

      let htmlSummary = $.parseHTML(about.summary);
      $("#hero_summary").append(htmlSummary);

      const interval = 300;
      about.skills.forEach((value, index) => {
        const skillHtml = this.getHTMLSkill(value, index * 100 + interval);
        $("#skill_list").append(skillHtml);
      });

      $(".phone").each((index, element) => {
        $(element).attr("href", "tel:" + about.phone);
      });
      $(".email").each((index, element) => {
        $(element)
          .attr("href", "mailto:" + about.email)
          .text(about.email);
      });
      $(".email-btn").each((index, element) => {
        $(element).attr("href", "mailto:" + about.email);
      });
      resolve();
    });
  }

  getHTMLSkill(skillValue, aosDelay) {
    return `<li data-aos-once="true" data-aos="flip-left" data-aos-delay="${aosDelay}">${skillValue}</li>`;
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

  prepareSocials() {
    return new Promise((resolve) => {
      const about = Object.values(this.about).at(0);

      $(".social").each((index, social) => {
        about.contact.forEach((v) => {
          const html = this.getHTMLSocial(v.url, v.icon, v.name);
          $(social).append(html);
        });
      });

      resolve();
    });
  }

  getHTMLSocial(href, icon, name) {
    return `<li>
							<a href="${href}" aria-label="whatsapp"
								target="_blank" rel="noreferrer">
								<i class="bi bi-${icon}"></i>
							</a>
						</li>
    `;
  }

  prepareRightEmail() {
    const about = Object.values(this.about).at(0);
    const url = about.email;

    const html = `<li><a href="mailto:${url}">${url}</a></li>`;
    $("#right_email_link").append(html);
  }

  prepareAdditional() {
    $("#additional-note-footer").text(this.additional.note.footer);
  }
}

// Create the Portfolio instance and initialize the functionality

window.onload = () => {
  new Portfolio();
};
