import { svgCreate, svgLogo } from '@/links/images.links';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/">
        <svg>
          <use href={`${svgLogo}#icon`} />
        </svg>
      </Link>
      <button className={classes.button}>
        Создать опрос
        <svg>
          <use href={`${svgCreate}#icon`} />
        </svg>
      </button>
    </header>
  );
};

export default Header;
