import { useForm } from 'react-hook-form';
import classes from './PollCreation.module.scss';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/ui/Button/button';
import { pollSchema, TPollSchema } from '@/validations/poll.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import errorOption from '@/funcs/errorOption';
import { useSetPollMutation } from '@/redux/api/poll.api';
import { Link, useNavigate } from 'react-router-dom';

export default function () {
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    getValues,
    resetField,

    reset,
    formState: { errors },
  } = useForm<TPollSchema>({
    resolver: zodResolver(pollSchema),
  });
  const [options, setOptions] = useState<number[]>([0, 1]);

  const navigate = useNavigate();

  const [setPoll, { isLoading, data, isSuccess }] = useSetPollMutation();

  const delOption = useCallback((ind: number) => {
    setValue(`options`, [
      ...getValues('options').slice(0, ind),
      ...getValues('options').slice(ind + 1),
    ]);
    console.log(getValues());
    setOptions((options) => [...options.slice(0, ind), ...options.slice(ind + 1)]);
  }, []);

  const findUniqueNumber = useCallback(() => {
    let optionsThere: number[] = [...options];

    for (let i = 0; i < 10; i++) {
      let index = optionsThere.find((el) => el === i);

      if (!index && index !== 0) {
        return i;
      }
    }

    return 11;
  }, [options]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if (isSuccess) {
      setValue('options', []);
      setValue('title', '');
      setOptions([]);
    }
  }, [isSuccess]);

  const onSubmitForm = useCallback((data: any) => {
    console.log(getValues());
    if (data) {
      setPoll(data);
      console.log(data);
    }
  }, []);

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
        {isSuccess && data && (
          <span className={classes.poll__success}>
            Ты успешно создал опрос!{' '}
            <Link to={`/poll/${data.id}`}>
              <u>Нажми сюда, чтобы перейти</u>
            </Link>
          </span>
        )}
      </div>
    </form>
  );
}
