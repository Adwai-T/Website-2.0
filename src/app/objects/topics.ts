import { Page, Pages } from './pages';

export interface Topic {
  title: string;
  subTitle: string;
  imageSrc: string;
  description: string;
  page: Page;
}

export const frontEndDev:Topic[] = [
  {
    title: 'HTML',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/html.png',
    description:
      'Html is the Markup language used to format the pages of your website.',
    page: Pages.angular,
  },
  {
    title: 'CSS',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/css.png',
    description: 'CSS is used to style the pages of your website.',
    page: Pages.mdtohtml,
  },
  {
    title: 'Javascript',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description:
      'Javascript is the scripting language used to make webpages interactive.',
    page: Pages.angular,
  },
  {
    title: 'Angular',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/angular.png',
    description:
      'Angular is a popular framework developed by google, used to create single page applications',
    page: Pages.angular,
  },
  // {
  //   title:'',
  //   subTitle: '',
  //   imageSrc: 'assets/images/articles/languages/',
  //   description: '',
  //   page: Pages.,
  // }
]

export const backEndDev:Topic[] = [
  {
    title: 'Java',
    subTitle: 'language',
    imageSrc: 'assets/images/articles/languages/java.png',
    description:
      'Java is a popular programming language for backend development using the spring framework.',
    page: Pages.cpp,
  },
  {
    title: 'Spring',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/spring.png',
    description:
      'The Spring Framework (Spring) is an open-source application framework that provides infrastructure support for developing Java applications.',
    page: Pages.cpp,
  },
  {
    title: 'Spring Boot',
    subTitle: 'web-dev',
    imageSrc: 'assets/images/articles/languages/spring-boot.png',
    description:
      'Spring Boot is an open source, microservice-based Java web framework.',
    page: Pages.cpp,
  },
]

export const projects: Topic[] = [
  {
    title:'Md To Html',
    subTitle: 'utility',
    imageSrc: 'assets/images/articles/languages/javascript.png',
    description: 'Converts Markdown used on github or bit bucket pages to Html page.',
    page: Pages.mdtohtml,
  },
]
