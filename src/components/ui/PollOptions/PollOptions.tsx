import classes from './PollOptions.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Option, Poll } from '@/types/slices.types';
import {
  useDeletePollMutation,
  useLazyGetPollQuery,
  useVotePollMutation,
} from '@/redux/api/poll.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TVoteSchema, voteSchema } from '@/validations/poll.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button/Button';

export default function () {
  const [votePull, { isSuccess: isSuccessVote }] = useVotePollMutation();
  const [deletePoll, { isSuccess: isSuccessDelete }] = useDeletePollMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccessDelete) {
      navigate('/');
    }
  }, [isSuccessDelete]);

  const [voted, setVoted] = useState<boolean>(false);

  const params = useParams();
  const [getPoll, { data, isLoading, isError, isSuccess }] = useLazyGetPollQuery();
  const refPollingInterval = useRef<NodeJS.Timeout | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TVoteSchema>({
    defaultValues: { pollId: data?.id },
    resolver: zodResolver(voteSchema),
  });

  const startPolling = useCallback((id: number) => {
    getPoll({ id });

    const interval = setInterval(() => {
      getPoll({ id });
    }, import.meta.env.VITE_INTERVAL);

    refPollingInterval.current = interval;
  }, []);

  const onSubmitForm = useCallback((data: { optionId: string; pollId: number }) => {
    if (data) {
      votePull({
        optionId: Number(data.optionId),
        pollId: data.pollId,
      });
    }
  }, []);

  const countPercent = useCallback((poll: Poll, option: Option) => {
    const votesSum = poll.options.reduce((ac, curVal) => ac + curVal.votes, 0);

    if (votesSum) {
      return `${Math.round((option.votes / votesSum) * 1000) / 10}%`;
    } else {
      return ``;
    }
  }, []);

  // useEffects

  useEffect(() => {
    if (params && params.id) {
      startPolling(Number([params.id]));
      getPoll({ id: Number([params.id]) });
      setValue('pollId', Number(params.id));
    }
  }, [params]);

  useEffect(() => {
    return () => {
      if (refPollingInterval.current) {
        clearInterval(refPollingInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSuccessVote) {
      setVoted(true);
    }
  }, [isSuccessVote]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={classes.poll}>
      {isLoading ? (
        <span className={classes.message}>Загрузка...</span>
      ) : isError || !isSuccess ? (
        <span className={classes.message}>Опрос не найден :(</span>
      ) : (
        <>
          <div className={classes.poll__heading}>
            <h3>{data?.title}</h3>
          </div>
          <ul className={classes.poll__options}>
            {data?.options.map((el) => (
              <li className={classes.option} key={el.id}>
                <label
                  onClick={(e) => {
                    if (voted) {
                      e.preventDefault();
                    }
                  }}
                  className={classes.option__container}
                >
                  <div className={classes.option__content}>
                    <input
                      className={classes.option__input}
                      value={Number(el.id)}
                      type="radio"
                      {...register('optionId', {
                        valueAsNumber: true,
                      })}
                    ></input>
                    <span className={classes.option__text}>{el.text}</span>
                    <span className={classes.option__stats}>
                      <span>{el.votes} голосов</span>{' '}
                      {countPercent(data, el) ? <span>({countPercent(data, el)})</span> : <></>}
                    </span>
                  </div>
                  <div className={classes.option__percent}>
                    <div
                      className={classes.option__fill}
                      style={{
                        width: countPercent(data, el) !== '' ? countPercent(data, el) : '0%',
                      }}
                    ></div>
                  </div>
                </label>
              </li>
            ))}
          </ul>

          <div className={classes.buttons}>
            {!voted && <Button>Проголосовать</Button>}{' '}
            <Button onClick={() => deletePoll({ id: Number(params.id) })}>Удалить опрос</Button>
          </div>
          {Boolean(Object.keys(errors).length) && (
            <span className={classes.poll__error}>
              {errors.pollId?.message
                ? errors.pollId.message
                : errors.optionId?.message
                ? 'Ты не выбрал вариант!'
                : 'Произошла непредвиденная ошибка!'}
            </span>
          )}
          {isSuccessVote && <span className={classes.poll__success}>Ты успешно проголосовал!</span>}
        </>
      )}
    </form>
  );
}
