export interface SearchResult{
  link:string
  description?:string,
  subject?:string,
}

export interface SearchResultObject {
  [title: string] : SearchResult
}

export const SiteIndex:SearchResultObject = {
  "Linked List" : {
    link : "/article/linked-list",
    description : "Implementation of Linked List with A demo.",
    subject : "Data Structure",
  },
  "Md To Html" : {
    link : "/project/md-to-html",
    description : "Utility that transpiles Markdown to Html.",
    subject : "Utility",
  },
}