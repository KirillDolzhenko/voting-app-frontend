import { IPropsChildren } from '@/types/props.types';
import classes from './Button.module.scss';

export default function Button({ children }: IPropsChildren) {
  return <button className={classes.button}>{children}</button>;
}
