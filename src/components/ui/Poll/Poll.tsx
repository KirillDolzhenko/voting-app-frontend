import { Link } from 'react-router-dom';
import classes from './Poll.module.scss';
import { svgVotes, svgVoteSign } from '@/links/images.links';
import { useAppDispatch } from '@/redux/store/store';
import { setChecked, setPoll } from '@/redux/store/slices/pollSlice';

export default function () {
  let dispatch = useAppDispatch();

  return (
    <Link
      to="/poll"
      onClick={() => {
        console.log('clickkk');
        dispatch(
          setPoll({
            id: 3424,
            title: 'Something',
            options: [
              {
                text: 'option1',
                id: 1213,
              },
            ],
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
