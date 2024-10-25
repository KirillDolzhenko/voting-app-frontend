import { useForm } from 'react-hook-form';
import classes from './PollCreation.module.scss';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { pollSchema, TPollSchema } from '@/validations/poll.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import errorOption from '@/funcs/errorOption';
import { useSetPollMutation } from '@/redux/api/poll.api';
import { Link } from 'react-router-dom';
import { PollSet } from '@/types/slices.types';

export default function () {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TPollSchema>({
    resolver: zodResolver(pollSchema),
  });
  const [setPoll, { data, isSuccess, isError }] = useSetPollMutation();
  const [options, setOptions] = useState<number[]>([0, 1]);

  const delOption = useCallback((ind: number) => {
    setValue(`options`, [
      ...getValues('options').slice(0, ind),
      ...getValues('options').slice(ind + 1),
    ]);
    setOptions((options) => [...options.slice(0, ind), ...options.slice(ind + 1)]);
  }, []);

  const onSubmitForm = useCallback((data: PollSet) => {
    if (data) {
      setPoll(data);
    }
  }, []);

  const findUniqueNumber = useCallback(() => {
    const optionsThere: number[] = [...options];

    for (let i = 0; i < 10; i++) {
      const index = optionsThere.find((el) => el === i);

      if (!index && index !== 0) {
        return i;
      }
    }

    return 11;
  }, [options]);

  // useEffects

  useEffect(() => {
    if (isSuccess) {
      setValue('options', []);
      setValue('title', '');
      setOptions([]);
    }
  }, [isSuccess]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
      <div className={classes.form__title}>
        <h4>Вопрос:</h4>
        <input type="text" placeholder="Введите вопрос" {...register(`title`)} />
      </div>

      <div className={classes.form__options}>
        <h4>Варианты ответа:</h4>
        <button
          className={classes.buttonOption}
          onClick={(e) => {
            if (options.length < 10) {
              setOptions([...options, findUniqueNumber()]);
            }
            e.preventDefault();
          }}
        >
          Добавить вариант
        </button>
        <ul className={classes.form__options}>
          {options.length ? (
            options?.map((el, ind) => (
              <li key={el} className={classes.form__option}>
                <input
                  type="text"
                  placeholder={`Введите вариант #${ind + 1}`}
                  {...register(`options.${ind}`)}
                />
                <button
                  className={classes.buttonOption}
                  onClick={(e) => {
                    delOption(ind);
                    e.preventDefault();
                  }}
                >
                  Удалить
                </button>
              </li>
            ))
          ) : (
            <div className={classes.form__message}>
              <p>Тут нет вариантов</p>
            </div>
          )}
        </ul>
        <Button>Опубликовать</Button>
        <div className={classes.poll__messages}>
          {Boolean(Object.keys(errors).length) && (
            <span className={classes.poll__error}>
              {errors.title?.message
                ? errors.title.message
                : errors.options?.length
                ? errorOption(errors.options)
                : errors.options?.root?.message
                ? errors.options.root.message
                : 'Произошла непредвиденная ошибка'}
            </span>
          )}

          {
            // eslint-disable-next-line no-extra-boolean-cast
            isSuccess && data && !isError && !Boolean(Object.keys(errors).length) && (
              <>
                <span className={classes.poll__success}>Ты успешно создал опрос! </span>
                <span className={classes.poll__link}>
                  <Link to={`/poll/${data.id}`}>Нажми сюда, чтобы перейти</Link>
                </span>
              </>
            )
          }
        </div>
      </div>
    </form>
  );
}
