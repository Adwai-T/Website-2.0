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
    title: 'Angular',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/angular.png',
    description:
      'Angular is a popular framework developed by google, used to create single page applications',
    page: Pages.angular,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/AngularCourseNotes.md',
  },
  {
    title: 'Javascript',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      'Javascript is the scripting language used to make webpages interactive.',
    page: Pages.javascript,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/JavaScript.md',
  },
  {
    title: 'Asynchronous Javascript',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      'Asynchronous programming enables program to start long-running task and still have responsive site.',
    page: Pages.ajax,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/AsyncAwaitandPromises.md',
  },
  // {
  //   title: 'HTML',
  //   subTitle: 'web-dev',
  //   imageSrc: 'assets/images/articles/languages/html.png',
  //   description:
  //     'Html is the Markup language used to format the pages of your website.',
  //   page: Pages.html,
  //   github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/HTML.md',
  // },
  // {
  //   title: 'CSS',
  //   subTitle: 'web-dev',
  //   imageSrc: 'assets/images/articles/languages/css.png',
  //   description: 'CSS is used to style the pages of your website.',
  //   page: Pages.css,
  //   github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/CSS.md',
  // },
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
  {
    title: 'Swagger',
    subTitle: 'documentation',
    imageSrc: 'assets/images/articles/languages/swagger.png',
    description:
      'Spring Boot is an open source, microservice-based Java web framework.',
    page: Pages.swagger,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/swagger.md',
  },
  {
    title: 'JavaDoc',
    subTitle: 'documentation',
    imageSrc: 'assets/images/articles/languages/swagger.png',
    description:
      'Spring Boot is an open source, microservice-based Java web framework.',
    page: Pages.javadoc,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/SpringDoc.md',
  },
  {
    title: 'Java',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/java.png',
    description:
      'Java is a popular programming language for backend development using the spring framework.',
    page: Pages.java,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/Java.md',
  },
]

export const salesforce: Topic[] = [
  {
    title:'Administrator',
    subTitle: 'salesforce',
    imageSrc: 'assets/images/articles/languages/salesforce.png',
    description: 'Salesforce Administrators work with stakeholders to define system requirements and customise the platform',
    page: Pages.salesforceAdmin,
    github: '',
  },
  {
    title:'Developer',
    subTitle: 'salesforce',
    imageSrc: 'assets/images/articles/languages/salesforce.png',
    description: 'Salesforce Development involves programming with Apex and interactions with database throught programming.',
    page: Pages.salesforceDev,
    github: '',
  }
]

export const languages: Topic[] = [
  {
    title:'C++',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/cpp.png',
    description: 'C++ is a cross-platform language that can be used to create high-performance applications',
    page: Pages.cpp,
    github: 'https://github.com/Adwai-T/Notes/blob/master/C%2B%2B/C%2B%2B.md',
  },
  {
    title:'Lua',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/lua.png',
    description: 'Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded use in applications.',
    page: Pages.lua,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Lua/Lua.md',
  },
  {
    title: 'Java',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/java.png',
    description:
      'Java is a popular programming language for backend development using the spring framework.',
    page: Pages.java,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Java/Java.md',
  },
  {
    title: 'Javascript',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      'Javascript is the scripting language used to make webpages interactive.',
    page: Pages.javascript,
    github: 'https://github.com/Adwai-T/Notes/blob/master/WebDevelopment/JavaScript.md',
  },
  {
    title: 'VBA',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      "Implementation of Microsoft's Visual Basic built into most desktop Microsoft Office applications",
    page: Pages.vba,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Excel/VBANotes.md',
  },
]

export const utilities: Topic[] = [
  {
    title: 'Git',
    subTitle: 'Version Control',
    imageSrc: 'assets/images/articles/languages/git.png',
    description:
      'Git is a free and open source distributed version control system designed to handle projects with speed and efficiency.',
    page: Pages.git,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Utilities/Git.md',
  },
  {
    title: 'Maven',
    subTitle: 'Dependency Management',
    imageSrc: 'assets/images/articles/languages/maven.png',
    description:
      'Apache Maven is a software project management and comprehension tool, based on the concept of a project object model.',
    page: Pages.maven,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Utilities/Maven.md',
  },
  {
    title: 'NPM',
    subTitle: 'Dependency Management',
    imageSrc: 'assets/images/articles/languages/npm.png',
    description:
      'Npm is a package manager for the JavaScript programming language maintained by npm, Inc.',
    page: Pages.npm,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Utilities/npm.md',
  },
]

export const databases: Topic[] = [
  {
    title: 'SQL',
    subTitle: 'database',
    imageSrc: 'assets/images/articles/languages/sql.png',
    description:
      'SQL is a standard language for storing, manipulating and retrieving data in databases.',
    page: Pages.sql,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Database/SQL.md',
  },
  {
    title: 'MongoDB',
    subTitle: 'database',
    imageSrc: 'assets/images/articles/languages/mongodb.png',
    description:
      'Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
    page: Pages.mongodb,
    github: 'https://github.com/Adwai-T/Notes/blob/master/Database/MongoDB.md',
  },
  // {
  //   title: 'Postgre',
  //   subTitle: 'database',
  //   imageSrc: 'assets/images/articles/languages/sql.png',
  //   description:
  //     ' Free and open-source relational database management system emphasizing extensibility and SQL compliance.',
  //   page: Pages.postgre,
  //   github: 'https://github.com/Adwai-T/Notes/blob/master/Database/PostgreSql.md',
  // },
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
