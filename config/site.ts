export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  slogan: string;
  links: {
    github: string;
    docs: string;
    privacy: string;
    terms: string;
  };
  contact: {
    email: string;
    support: string;
  };
  stats: {
    totalTools: string;
    usersCount: string;
    conversionsCount: string;
    clientSideRatio: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'NEXORA TOOLS',
  shortName: 'NEXORA',
  tagline: 'Powerful Tools for Every File, Document and Digital Task.',
  description:
    'Convert, compress, edit, calculate, code and manage your files from one fast, secure, and privacy-first digital utility workspace.',
  url: 'https://nexora.tools',
  ogImage: '/og-image.png',
  slogan: 'One Powerful Workspace for All Your Digital Tools.',
  links: {
    github: 'https://github.com/nexora-tools',
    docs: '/tools',
    privacy: '/privacy',
    terms: '/terms',
  },
  contact: {
    email: 'contact@nexora.tools',
    support: 'support@nexora.tools',
  },
  stats: {
    totalTools: '60+',
    usersCount: '250K+',
    conversionsCount: '1.8M+',
    clientSideRatio: '99.4%',
  },
};
