/*
  Information in the Pages object is used by the Page Service.
  Page Service is used display page in iframe component 
  and change navigation link accordingly.
*/

export interface Page {
  title:string,
  html:string,
  css?:string,
  bundlejs?:string,
  navLinkStart?:string,
}

export interface PagesI{
  [key: string] :Page
}

/*
 Important : Key of page and title of the page should be the same for proper navigation,
 when the page is reloaded or navigate directly to that page.
 The first letter of the Title can be capitalized and there can be any number of spaces.

 navStartWith is used for navigation topic, 
 eg when set to projects in mdtohtml, nav link will be projects/mdtohtml
 By default is set to notes/
*/

export const Pages:PagesI = {
  //--- Notes
  cpp : {
    title: 'Cpp',
    html: 'assets/pages/htmlonly/cpp.html',
  },
  html : {
    title: 'HTML',
    html: 'assets/pages/htmlonly/html.html'
  },
  css : {
    title: 'CSS',
    html: 'assets/pages/htmlonly/css.html'
  },
  javascript : {
    title: 'Javascript',
    html: 'assets/pages/htmlonly/javascript.html'
  },
  angular : {
    title: 'Angular',
    html: 'assets/pages/htmlonly/angular.html',
  },
  java : {
    title: 'Java',
    html: 'assets/pages/htmlonly/java.html'
  },
  javaspring : {
    title: 'Java Spring',
    html: 'assets/pages/htmlonly/spring.html'
  },
  springboot : {
    title : 'Spring Boot',
    html: 'assets/pages/htmlonly/springBoot.html'
  },
  springsecurity : {
    title : 'Spring Security',
    html: 'assets/pages/htmlonly/springSecurity.html'
  },

  //--- Projects
  mdtohtml : {
    title: 'Md To Html',
    html: 'assets/pages/withjs/md-to-html/index.html',
    navLinkStart: 'projects',
  },
  linkedList : {
    title: 'Linked List',
    html: 'assets/pages/withjs/linked-list/index.html',
    navLinkStart: 'projects',
  },
}