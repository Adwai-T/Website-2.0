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
 Important : 

 Name of the html page and the key for that page should be same.
 Page names are used to create links in index file and for direct
 navigation to that page.
 
 Key of page and title of the page should be the same for proper navigation,
 when the page is reloaded or navigate directly to that page.
 The first letter of the Title can be capitalized and there can be any number of spaces.

 navStartWith is used for navigation topic, 
 eg when set to projects in mdtohtml, nav link will be projects/mdtohtml
 By default is set to notes/
*/

export const Pages:PagesI = {
  //--- Notes

  //- webdev
  html : {
    title: 'HTML',
    html: 'assets/pages/htmlonly/html.html',
    navLinkStart: 'notes',
  },
  css : {
    title: 'CSS',
    html: 'assets/pages/htmlonly/css.html',
    navLinkStart: 'notes',
  },
  javascript : {
    title: 'Javascript',
    html: 'assets/pages/htmlonly/javascript.html',
    navLinkStart: 'notes',
  },
  ajax : {
    title: 'Async Javascript',
    html: 'assets/pages/htmlonly/ajax.html',
    navLinkStart: 'notes',
  },

  //- webdev frameworks
  angular : {
    title: 'Angular',
    html: 'assets/pages/htmlonly/angular.html',
    navLinkStart: 'notes',
  },

  //- java
  java : {
    title: 'Java',
    html: 'assets/pages/htmlonly/java.html',
    navLinkStart: 'notes',
  },
  spring : {
    title: 'Spring',
    html: 'assets/pages/htmlonly/spring.html',
    navLinkStart: 'notes',
  },
  springboot : {
    title : 'Spring Boot',
    html: 'assets/pages/htmlonly/springBoot.html',
    navLinkStart: 'notes',
  },
  swagger : {
    title : 'Swagger',
    html: 'assets/pages/htmlonly/swagger.html',
    navLinkStart: 'notes',
  },
  javadoc : {
    title : 'JavaDoc',
    html: 'assets/pages/htmlonly/javadoc.html',
    navLinkStart: 'notes',
  },
  springsecurity : {
    title : 'Spring Security',
    html: 'assets/pages/htmlonly/springSecurity.html',
    navLinkStart: 'notes',
  },

  //- salesforce
  salesforceAdmin : {
    title : 'Salesforce Administrator',
    html: 'assets/pages/htmlonly/salesforceAdmin.html',
    navLinkStart: 'notes',
  },
  salesforceDev : {
    title : 'Salesforce Developer',
    html: 'assets/pages/htmlonly/salesforceDev.html',
    navLinkStart: 'notes',
  },
  salesforceFlow : {
    title : 'Salesforce Flow',
    html: 'assets/pages/htmlonly/salesforceFlow.html',
    navLinkStart: 'notes',
  },
  salesforceLWC : {
    title : 'Salesforce LWC',
    html: 'assets/pages/htmlonly/salesforceLWC.html',
    navLinkStart: 'notes',
  },
  salesforceAura : {
    title : 'Salesforce Aura Components',
    html: 'assets/pages/htmlonly/salesforceAura.html',
    navLinkStart: 'notes',
  },
  salesforceVisualforce : {
    title : 'Salesforce Visualforce Pages',
    html: 'assets/pages/htmlonly/salesforceVisualforce.html',
    navLinkStart: 'notes',
  },
  salesforceIDEs : {
    title : 'Salesforce IDEs',
    html: 'assets/pages/htmlonly/salesforceIDEs.html',
    navLinkStart: 'notes',
  },

  //- cpp 
  cpp : {
    title: 'C++',
    html: 'assets/pages/htmlonly/cpp.html',
    navLinkStart: 'notes',
  },

  //- lua
  lua : {
    title: 'Lua',
    html: 'assets/pages/htmlonly/lua.html',
    navLinkStart: 'notes',
  },

  //- vba
  vba : {
    title: 'VBA',
    html: 'assets/pages/htmlonly/vba.html',
    navLinkStart: 'notes',
  },

  //- utitilities
  git : {
    title: 'Git',
    html: 'assets/pages/htmlonly/git.html',
    navLinkStart: 'notes',
  },
  maven : {
    title: 'Maven',
    html: 'assets/pages/htmlonly/maven.html',
    navLinkStart: 'notes',
  },
  npm : {
    title: 'Node Package Manager',
    html: 'assets/pages/htmlonly/npm.html',
    navLinkStart: 'notes',
  },

  //- databases
  sql : {
    title: 'SQL',
    html: 'assets/pages/htmlonly/sql.html',
    navLinkStart: 'notes',
  },
  mongodb : {
    title: 'MongDB',
    html: 'assets/pages/htmlonly/mongodb.html',
    navLinkStart: 'notes',
  },
  // postgre : {
  //   title: 'Postgre',
  //   html: 'assets/pages/htmlonly/postgre.html',
  //   navLinkStart: 'notes',
  // },

  //--- Projects
  mdtohtml : {
    title: 'Md To Html',
    html: 'assets/pages/withjs/md-to-html/index.html',
    navLinkStart: 'projects',
  },
  linkedlist : {
    title: 'Linked List',
    html: 'assets/pages/withjs/linked-list/index.html',
    navLinkStart: 'projects',
  },
  canvashelper : {
    title : 'Canvas Helper',
    html : 'assets/pages/withjs/canvas-helper/index.html',
    navLinkStart: 'projects',
  },
  canvashelperexamples : {
    title : 'Canvas Helper Examples',
    html : 'assets/pages/withjs/canvas-helper/examplesjs/index.html',
    navLinkStart: 'projects',
  },

  //--- For topics that dont have pages just other resource links
  none : {
    title: '',
    html: '',
    navLinkStart: '',
  }
}