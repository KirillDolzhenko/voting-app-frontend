export default function errorOption(data: unknown) {
  let error = 'Произошла ошибка в варианте';

  if (Array.isArray(data)) {
    console.log(data);

    error = data[data.findIndex((el) => el)].message;
  }

  return error;
}
