import { useAppDispatch } from '@/redux/store/store';
import classes from './Polls.module.scss';
import Poll from '@/components/ui/Poll/Poll';
import { useGetPollAllQuery } from '@/redux/api/poll.api';
import { setList } from '@/redux/store/slices/listSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const Polls = () => {
  const { data, isLoading, isSuccess, isError } = useGetPollAllQuery(undefined, {
    pollingInterval: 7000,
  });
  const dispatch = useAppDispatch();

  const polls = useSelector((state: RootState) => state.listSlice.polls);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setList(data));
    }
  }, [data]);

  return (
    <div className={classes.polls__content}>
      {polls.map((el) => (
        <Poll poll={el} />
      ))}
    </div>
  );
};

export default Polls;
