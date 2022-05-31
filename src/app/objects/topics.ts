/*
  Topics is information used to display cards in the articles and project pages.
*/

import { Page, Pages } from './pages';

export interface Topic {
  title: string;
  subTitle: string;
  imageSrc: string;
  description: string;
  page: Page;
  github?: string; 
}

export const frontEndDev:Topic[] = [
  {
    title: 'HTML',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/html.png',
    description:
      'Html is the Markup language used to format the pages of your website.',
    page: Pages.html,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/HTML.md',
  },
  {
    title: 'CSS',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/css.png',
    description: 'CSS is used to style the pages of your website.',
    page: Pages.css,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/CSS.md',
  },
  {
    title: 'Javascript',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      'Javascript is the scripting language used to make webpages interactive.',
    page: Pages.javascript,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/JavaScript.md',
  },
  {
    title: 'Angular',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/angular.png',
    description:
      'Angular is a popular framework developed by google, used to create single page applications',
    page: Pages.angular,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/AngularCourseNotes.md',
  },
  // {
  //   title:'',
  //   subTitle: '',
  //   imageSrc: 'assets/images/articles/languages/',
  //   description: '',
  //   page: Pages.,
  //   github: '',
  // }
]

export const backEndDev:Topic[] = [
  {
    title: 'Java',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/java.png',
    description:
      'Java is a popular programming language for backend development using the spring framework.',
    page: Pages.java,
  },
  {
    title: 'Spring',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/spring.png',
    description:
      'The Spring Framework (Spring) is an open-source application framework that provides infrastructure support for developing Java applications.',
    page: Pages.javaspring,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/Spring.md',
  },
  {
    title: 'Spring Boot',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/spring-boot.png',
    description:
      'Spring Boot is an open source, microservice-based Java web framework.',
    page: Pages.springboot,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/SpringBoot.md',
  },
  {
    title: 'Spring Security',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/spring.png',
    description:
      'Spring Boot is an open source, microservice-based Java web framework.',
    page: Pages.springsecurity,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/SpringSecurity.md',
  },
]

export const projects: Topic[] = [
  {
    title:'Md To Html',
    subTitle: 'utility',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description: 'Converts Markdown used on github or bit bucket pages to Html page.',
    page: Pages.mdtohtml,
    github: 'https://github.com/Adwai-T/md-to-html',
  },
  {
    title:'Canvas Helper',
    subTitle: 'html canvas',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description: 'Helper library for html canvas, makes using canvas easier.',
    page: Pages.canvashelper,
    github: 'https://github.com/Adwai-T/CanvasHelper',
  },
  {
    title:'Canvas Helper Examples',
    subTitle: 'html canvas',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description: 'Examples of Helper library for html canvas, makes using canvas easier.',
    page: Pages.canvashelperexamples,
    github: 'https://github.com/Adwai-T/CanvasHelper',
  },
]
