export interface Page {
  title:string,
  html:string,
  css?:string,
  bundlejs?:string,
}

export interface PagesI{
  [key: string] :Page
}

export const Pages:PagesI = {
  linkedList : {
    title: 'Linked List',
    html: 'assets/pages/withjs/linked-list/index.html',
  },
  Cpp : {
    title: 'Cpp',
    html: 'assets/pages/htmlonly/C++.html',
  },
  angular : {
    title: 'Angular 2+',
    html: 'assets/pages/htmlonly/angular2+.html',
  },
  mdToHtml : {
    title: 'MD To HTML',
    html: 'assets/pages/withjs/md-to-html/index.html',
  }
}