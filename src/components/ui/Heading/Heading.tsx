import { IPropsChildren } from '@/types/props.types';
import classes from './Heading.module.scss';

export default function Heading({ children }: IPropsChildren) {
  return <h3 className={classes.heading}>{children}</h3>;
}
