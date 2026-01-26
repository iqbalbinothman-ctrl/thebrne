
import React from 'react';
import { Product, NavLink } from './types';

export const COLORS = {
  brandPrimary: '#9BE12C',
  charcoalBlack: '#1A1A1A',
  white: '#FFFFFF',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Show', href: '#show' },
  { label: 'Startup', href: '#startup' },
  { label: 'Press', href: '#press' },
  { label: 'Support', href: '#support' },
];

export const PRODUCTS: Product[] = [
  {
    id: '50-in-5',
    title: 'Generate 50 High Viewership Video Ideas in 5 Days',
    description: 'Our proven system for brainstorming and validating viral concepts.',
    image: 'https://picsum.photos/seed/50in5/800/600',
    badge: '50 in Five'
  },
  {
    id: 'growth-playbook',
    title: 'Unlock the 3 Simple Rules of YouTube That Took Us From 0 to 1.5M Subscribers',
    description: 'Learn the fundamentals that every successful creator needs to master.',
    image: 'https://picsum.photos/seed/playbook/800/600',
    badge: 'YouTube Growth Playbook'
  },
  {
    id: 'brand-deal',
    title: 'Turn Your Creativity into a Full Time Income',
    description: 'The ultimate guide to landing brand deals and building a sustainable business.',
    image: 'https://picsum.photos/seed/branddeal/800/600',
    badge: 'Brand Deal Blueprint'
  }
];
