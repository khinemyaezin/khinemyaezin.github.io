import { FirebaseInterface } from "../interface/firebaseInterface";

const pageSize = 10;

export class FirebaseDemo extends FirebaseInterface {

  get getCurrentuser() {
    throw new Error("Method 'doSomething' must be implemented.");
  }
  get getDb() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  get getStorage() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  get operators() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async signUp(email, password) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async signIn(email, password) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  signOut() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onFirstData(collectionName, filters = []) {
    const data = {
      docs: {
        about: {
          "5Oql9AeleV6nDtteLI9w": {
            email: "hello@khinemyaezin.com",
            contact: [
              {
                url: "https://github.com/khinemyaezin",
                icon: "github",
                name: "github",
              },
              {
                icon: "linkedin",
                name: "linkedin",
                url: "https://www.linkedin.com/in/khinemyaezin",
              },
              {
                name: "whatsapp",
                icon: "whatsapp",
                url: "https://api.whatsapp.com/send?phone=959795957915",
              },
            ],
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
            phone: "+817084882753",
            imgSrc:
              "https://firebasestorage.googleapis.com/v0/b/khinemyaezin-portfolio.appspot.com/o/profile_1.png?alt=media&token=3a5c42c8-fcea-4d71-b3cb-ddd309ef4ce3",
          },
        },
        additional: {
          note: {
            footer: "blahblah",
          },
        },
        professional_experiences: {
          working_exp_1: {
            position: "Backend Developer",
            toDate: "present",
            companyName: "Yomabank",
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
            companyURL: "https://yomabank.com/",
            fromDate: "2023",
          },
          working_exp_2: {
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
            fromDate: "2019",
            position: "Developer",
          },
        },
        projects: {
          project_1: {
            published_year: "Nov 2022",
            subtitle: "Cable Locator",
            imgSrc:
              "https://firebasestorage.googleapis.com/v0/b/khinemyaezin-portfolio.appspot.com/o/cablelocator.png?alt=media&token=3d8edb83-df38-42b1-9459-42d4e960ee5f",
            links: [
              {
                url: "https://cablelocator.net",
                icon: "box-arrow-up-right",
              },
            ],
            desc: "Cable Detection Service landing website with ability to submit quote requests and control by admin page.",
            languages: ["Javascript with Jquery", "Firebase", "Bootstrap"],
            title: "Featured Project",
            active: true,
          },
          project_2: {
            title: "Featured Project",
            active: false,
            imgSrc:
              "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/business-website.png?alt=media&token=1f952707-b9fc-44ff-8ce4-b73b98e0594b",
            languages: ["Laravel", "Jquery", "Bootstrap"],
            desc: "Website using Laravel, pure js as front-end with Bootstrap. Provide with admin dashboard and customizable themes.",
            subtitle: "Business website",
            links: [
              {
                icon: "github",
                url: "https://github.com/khinemyaezin/Jupitor",
              },
              {
                url: "https://khinemyaezin.com/Jupitor/",
                icon: "box-arrow-up-right",
              },
            ],
            published_year: "2022",
          },
          project_3: {
            links: [],
            published_year: "2022",
            imgSrc:
              "http://127.0.0.1:9199/v0/b/khinemyaezin-portfolio.appspot.com/o/ecommerce.png?alt=media&token=35633b0d-9b70-4ff4-86c3-0ddf7791c2b5",
            active: false,
            languages: ["Laravel", "Bootstrap", "Angular"],
            desc: 'All in one place to create <span class="highlight">beautiful online stores</span>\n          including dashboard and reports.',
            title: "Featured Project",
            subtitle: "Ecommerce",
          },
          project_4: {
            published_year: "2020",
            subtitle: "Unicode Typing Master",
            title: "Featured Project",
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
            desc: 'Developed during transitional period of <span class="highlight">Zawgyi to\n          Unicode</span>.',
            languages: ["C#"],
            active: true,
            imgSrc:
              "https://firebasestorage.googleapis.com/v0/b/khinemyaezin-portfolio.appspot.com/o/unicode-typing-master.png?alt=media&token=06cfb5c9-9e04-4f10-a89e-8f58d56f9bde",
          },
        },
      }
    }
    return new Promise( (rs,rej)=>{
      rs(data);
    })
    
  }

  onNextData(collectionName, firstDoc, lastDoc, filters = []) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onPrevData(collectionName, firstDoc, lastDoc, filters = []) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onUpdate(collectionName, docId, updateObj) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async setDocument(collectionName, value) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async watchUser(callback) {
    throw new Error("Method 'doSomething' must be implemented.");
  }
}
