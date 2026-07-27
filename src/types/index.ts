export interface ExperiencePost {
  title: string;
  company: string;
  duration: string;
  languages: string[];
  image: string;
  desc: string;
}

export interface ProjectLink {
  icon: string;
  url: string;
}

export interface Project {
  languages: string[];
  published_year: string;
  subtitle: string;
  links: ProjectLink[];
  title: string;
  desc: string;
  imgSrc: string;
  active: boolean;
}

export interface StoryParagraph {
  text: string;
  classes: string;
}

export interface StoryData {
  profileImage: string;
  paragraphs: StoryParagraph[];
}
