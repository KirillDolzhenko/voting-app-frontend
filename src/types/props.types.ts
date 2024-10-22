import { ReactNode } from 'react';

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
