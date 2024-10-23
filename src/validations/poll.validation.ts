import { z } from 'zod';

export const voteSchema = z.object({
  pollId: z.number(),
  optionId: z.string(),
});

export const pollSchema = z.object({
  title: z.string().min(1, 'Вы забыли про вопрос!').max(200, 'Слишком длинный вопрос!'),
  options: z
    .array(
      z.string().min(1, 'Недостаточно символов в варианте!').max(100, 'Слишком длинный вариант!'),
    )
    .min(2, 'Опрос должен включать как минимум 2 варианта!')
    .max(10, 'Опрос может включать до 10 вариантов!'),
});

export type TPollSchema = z.infer<typeof pollSchema>;
export type TVoteSchema = z.infer<typeof voteSchema>;
