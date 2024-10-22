import { Link } from 'react-router-dom';
import classes from './Poll.module.scss';
import { svgVotes, svgVoteSign } from '@/links/images.links';

export default function () {
  return (
    <Link to="/poll" className={classes.poll}>
      <div className={classes.poll__voteSign}>
        <svg>
          <use href={`${svgVoteSign}#icon`} />
        </svg>
      </div>
      <div className={classes.poll__content}>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat?</h4>
        <p>
          <svg>
            <use href={`${svgVotes}#icon`} />
          </svg>
          <span>10 голосов</span>
        </p>
      </div>
    </Link>
  );
}
