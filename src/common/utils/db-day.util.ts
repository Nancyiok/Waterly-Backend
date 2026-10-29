import { format } from 'date-fns';
import { DATE_FORMAT } from '../constants/date.constant';


export const toDbDay = (date: Date) => new Date(format(date, DATE_FORMAT.DAY));

export const fromDbDay = (day: Date) => day.toISOString().slice(0, 10);
