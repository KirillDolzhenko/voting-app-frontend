import { IPropsButton } from '@/types/props.types';
import classes from './Button.module.scss';

export default function Button({ children, onClick = () => {}, type = 'submit' }: IPropsButton) {
  return (
    <button className={classes.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
