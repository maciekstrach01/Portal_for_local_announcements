import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import type { PeriodValue } from '@/types/helpers';

const getFullTimeDifference = (date: string) => {
    const periods: PeriodValue[] = ['month', 'week', 'day', 'hour', 'minute'];

    const today = dayjs().utc();
    const dateDayjs = dayjs(date).utc();

    for (const period of periods) {
        const difference = today.diff(dateDayjs, period);

        if (period === periods[periods.length - 1] || difference > 0) {
            const pluralSign = difference !== 1 ? 's' : '';

            return `${difference} ${period}${pluralSign}`;
        }
    }

    return '';
};

export default getFullTimeDifference;
