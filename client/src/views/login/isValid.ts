import {EName} from './types';

export const isValid = (input: HTMLInputElement): boolean => {
  switch (input.name) {
    case EName.NAME:
      return Boolean(input.value.trim());
    case EName.EMAIL:
      return /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i.test(input.value.trim());
    case EName.PASSWORD:
      return Boolean(input.value.trim());
    default:
      return false;
  }
};
