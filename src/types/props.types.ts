import { ReactNode } from 'react';
import { Option, Poll } from './slices.types';

export interface IPropsClassName {
  className?: string;
}

export interface IPropsChildren extends IPropsClassName {
  children: ReactNode;
}

export interface IPropsPageTemplate extends IPropsChildren {
  title: string;
  heading: string;
}

export interface IPropsPoll {
  poll: Poll;
}

export interface IPropsPolls extends IPropsChildren {
  polls: Poll[];
}
