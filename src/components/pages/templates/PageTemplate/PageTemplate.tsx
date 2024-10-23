import Header from '@/components/blocks/Header/Header';
import classes from './PageTemplate.module.scss';
import { Helmet } from 'react-helmet';
import { pngFavicon } from '@/links/images.links';
import { IPropsChildren, IPropsPageTemplate } from '@/types/props.types';
import Heading from '@/components/ui/Heading/Heading';

export default function ({ children, title, heading = 'Страница' }: IPropsPageTemplate) {
  return (
    <div className={classes.page}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href={pngFavicon} />
      </Helmet>
      <Header />
      <main className={classes.page__content}>
        <Heading>{heading}</Heading>
        <div className={classes.page__children}>{children}</div>
      </main>
      <footer className={classes.footer}>
        <div>
          Сделано <a href="https://github.com/KirillDolzhenko">Кириллом Долженко</a>
        </div>
      </footer>
    </div>
  );
}
