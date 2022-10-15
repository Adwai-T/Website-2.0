import {
  backEndDev,
  databases,
  frontEndDev,
  languages,
  salesforce,
  Topic,
  utilities,
} from './topics';

export interface Section {
  title: string;
  description: string;
  topics: Topic[];
}

export const Sections: Section[] = [
  {
    title: 'Client Side Development',
    description:
      'The front end or Client side is what the user of your website will ' +
      'interact with when they visit your website.',
    topics: frontEndDev,
  },
  {
    title: 'Server Side Development',
    description:
      'The back end or server side is responsible for authentication and ' +
      'authorization of users for your website. It controls the access to ' +
      'resources that need authorization to be accessed such as data from ' +
      'database. Not all WebSites need server side application, especially ' +
      'those that are simple with no need to access restricted resources.',
    topics: backEndDev,
  },
  {
    title: 'Salesforce',
    description:
      'Salesforce is a popular CRM tool for support, sales, ' +
      'and marketing teams. Salesforce services allow businesses to use ' +
      'cloud technology to better connect with partners, customers, and ' +
      'potential customers.',
    topics: salesforce,
  },
  {
    title: 'Languages',
    description: 'Programming Languages basics.',
    topics: languages,
  },
  {
    title: 'Databases',
    description:
      'A database is an organized collection of structured ' +
      'information, or data, typically stored electronically in a ' +
      'computer system.',
    topics: databases,
  },
  {
    title: 'Utilities',
    description: 'Utilities that help maintain code and make '
    + 'programming convenient.',
    topics: utilities,
  }
];
