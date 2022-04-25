export interface Page {
  title:string,
  html:string,
  css?:string,
  bundlejs?:string,
}

interface PagesInterface{
  [key: string] :Page
}

export const Pages:PagesInterface = {
  linkedList : {
    title: 'Linked List',
    html: 'assets/pages/linked-list/index.html',
    css : 'assets/pages/linked-list/index.css',
    bundlejs : 'assets/pages/linked-list/bundle.js',
  },
}