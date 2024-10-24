import { svgCreate, svgLogo, svgMainPage } from '@/links/images.links';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/">
        <svg>
          <use href={`${svgLogo}#icon`} />
        </svg>
      </Link>

      <div className={classes.buttons}>
        {location.pathname == '/' || (
          <Link to="/" className={classes.button}>
            Главная страница
            <svg>
              <use href={`${svgMainPage}#icon`} />
            </svg>
          </Link>
        )}

        {location.pathname == '/create-poll' || (
          <Link to="/create-poll" className={classes.button}>
            Создать опрос
            <svg>
              <use href={`${svgCreate}#icon`} />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
