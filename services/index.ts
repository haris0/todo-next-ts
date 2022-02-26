import { ITodo } from 'types';
import { axiosGet } from './axios-client';

export const getTodoData = async (): Promise<{
  todoRes: ITodo[],
  todoErr: boolean
}> => {
  const path = '/to-do-list';

  const { data, error } = await axiosGet(path);

  const todoRes = data?.data || [];
  const todoErr = !!error;

  return { todoRes, todoErr };
};
