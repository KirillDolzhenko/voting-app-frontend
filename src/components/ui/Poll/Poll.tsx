import { Link } from 'react-router-dom';
import classes from './Poll.module.scss';
import { svgVotes, svgVoteSign } from '@/links/images.links';
import { useAppDispatch } from '@/redux/store/store';
import { setPoll } from '@/redux/store/slices/pollSlice';
import { IPropsPoll } from '@/types/props.types';

export default function ({ poll }: IPropsPoll) {
  const dispatch = useAppDispatch();

  return (
    <Link
      to={`/poll/${poll.id}`}
      onClick={() => {
        console.log('clickkk');
        dispatch(
          setPoll({
            ...poll,
          }),
        );
      }}
      className={classes.poll}
    >
      <div className={classes.poll__voteSign}>
        <svg>
          <use href={`${svgVoteSign}#icon`} />
        </svg>
      </div>
      <div className={classes.poll__content}>
        <h4>{poll.title}</h4>
        <p>
          <svg>
            <use href={`${svgVotes}#icon`} />
          </svg>
          <span>{poll.options.reduce((ac, curVal) => ac + curVal.votes, 0)} голосов</span>
        </p>
      </div>
    </Link>
  );
}
