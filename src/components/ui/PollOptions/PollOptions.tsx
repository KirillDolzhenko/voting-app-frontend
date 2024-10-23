import { useSelector } from 'react-redux';
import classes from './PollOptions.module.scss';
import { RootState } from '@/redux/store/store';
import { useCallback, useEffect, useState } from 'react';
import { Option, Poll, VotePollParams } from '@/types/slices.types';
import { useGetPollQuery, useLazyGetPollQuery, useVotePollMutation } from '@/redux/api/poll.api';
import { useLocation, useParams } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';
import { TVoteSchema, voteSchema } from '@/validations/poll.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button/button';

export default function () {
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      startPolling(Number([params.id]));
      getPoll({ id: Number([params.id]) });
      setValue('pollId', Number(params.id));
    }
  }, [params]);

  const [getPoll, { isLoading, data }] = useLazyGetPollQuery();
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  const startPolling = useCallback((id: number) => {
    getPoll({ id }); 
    const interval = setInterval(() => {
      getPoll({ id });
    }, 7000);
    setPollingInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, []);

  const [votePull, { isSuccess: isSuccessVote }] = useVotePollMutation();

  const countPercent = useCallback((poll: Poll, option: Option) => {
    const votesSum = poll.options.reduce((ac, curVal) => ac + curVal.votes, 0);

    if (votesSum) {
      return `${Math.round((option.votes / votesSum) * 1000) / 10}%`;
    } else {
      return ``;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TVoteSchema>({
    defaultValues: {
      pollId: data?.id,
    },
    resolver: zodResolver(voteSchema),
  });

  const onSubmitForm = useCallback((data: { optionId: string; pollId: number }) => {
    if (data) {
      votePull({
        optionId: Number(data.optionId),
        pollId: data.pollId,
      });
    }
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={classes.poll}>
      {isLoading ? (
        'Загрузка...'
      ) : (
        <>
          <div className={classes.poll__heading}>
            <h3>{data?.title}</h3>
          </div>
          <ul className={classes.poll__options}>
            {data?.options.map((el) => (
              <li className={classes.option} key={el.id}>
                <label className={classes.option__container}>
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
                      <span>{el.votes} голосов</span> (<span>{countPercent(data, el)}</span>)
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
          <Button>Проголосовать</Button>
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
