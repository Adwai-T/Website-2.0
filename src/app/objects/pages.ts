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
 The first letter of the Title can be capitalized.
*/

export const Pages:PagesI = {
  //--- Notes
  linkedList : {
    title: 'Linked List',
    html: 'assets/pages/withjs/linked-list/index.html',
  },
  cpp : {
    title: 'Cpp',
    html: 'assets/pages/htmlonly/C++.html',
  },
  angular : {
    title: 'Angular',
    html: 'assets/pages/htmlonly/angular2+.html',
  },

  //--- Projects
  mdtohtml : {
    title: 'Md To Html',
    html: 'assets/pages/withjs/md-to-html/index.html',
    navLinkStart: 'projects'
  },
}