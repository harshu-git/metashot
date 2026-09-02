export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'MetaShot — Make Your Photos Meta-Ready',
    description: 'Prepare your photos for Instagram with our free browser-based image processing tool. No uploads, no accounts, your photos stay on your device.',
    keywords: 'photo processor, image converter, Instagram photo tools, browser-based image editor, photo metadata tool',
  },
  converter: {
    title: 'Photo Converter — MetaShot',
    description: 'Process and optimize your photos for Instagram with MetaShot browser-based converter. Crop, resize, rotate and download — all in your browser.',
  },
  howItWorks: {
    title: 'How It Works — MetaShot',
    description: 'Learn how MetaShot processes your photos entirely in your browser. Upload, edit, process, and download — simple and private.',
  },
  faq: {
    title: 'FAQ — MetaShot',
    description: 'Frequently asked questions about MetaShot photo processing tool.',
  },
  about: {
    title: 'About — MetaShot',
    description: 'Learn about MetaShot, an independent browser-based photo processing tool.',
  },
  privacy: {
    title: 'Privacy Policy — MetaShot',
    description: 'MetaShot privacy policy. Learn how we protect your data and process images locally.',
  },
  terms: {
    title: 'Terms of Service — MetaShot',
    description: 'MetaShot terms of service and usage conditions.',
  },
  contact: {
    title: 'Contact — MetaShot',
    description: 'Get in touch with the MetaShot team.',
  },
};
