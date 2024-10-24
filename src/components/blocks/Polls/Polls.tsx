import { useAppDispatch } from '@/redux/store/store';
import classes from './Polls.module.scss';
import Poll from '@/components/ui/Poll/Poll';
import { useGetPollAllQuery } from '@/redux/api/poll.api';
import { setList } from '@/redux/store/slices/listSlice';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const Polls = () => {
  const refObserver = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const { data, isSuccess, isLoading } = useGetPollAllQuery(page);

  const dispatch = useAppDispatch();
  const polls = useSelector((state: RootState) => state.listSlice.polls);

  // useEffects

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setList(data));
    }
  }, [data]);

  // Infinity Scroll Logic

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && data) {
          setPage((page) => ++page);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    if (refObserver.current) {
      observer.observe(refObserver.current);
    }

    return () => {
      if (refObserver.current) {
        observer.unobserve(refObserver.current);
      }
    };
  }, [isLoading]);

  return (
    <div className={classes.polls__content}>
      {polls.map((el) => (
        <Poll poll={el} />
      ))}
      <div className="observer" ref={refObserver}></div>
    </div>
  );
};

export default Polls;
