import {EName, IDefaultValid} from './types';

export const defaultValue = {[EName.NAME]: '', [EName.EMAIL]: '', [EName.PASSWORD]: ''};
export const defaultValid: IDefaultValid = {[EName.NAME]: null, [EName.EMAIL]: null, [EName.PASSWORD]: null};
