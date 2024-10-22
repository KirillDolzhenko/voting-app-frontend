import classes from './Polls.module.scss';
import Poll from '@/components/ui/Poll/Poll';

const Polls = () => {
  return (
    <div className={classes.polls__content}>
      <Poll />
      <Poll />
      <Poll />
      <Poll />
    </div>
  );
};

export default Polls;
