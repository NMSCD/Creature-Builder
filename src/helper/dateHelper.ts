import moment from 'moment';

export const friendlyDate = (date: Date = new Date(), format: string = 'yyy-MM-DD HH:mm') =>
    moment(date).format(format);

export const getExpiryDateUtc = (timeTillExpiry: number) =>
    moment().add(timeTillExpiry, 'seconds').utc().toDate();

export const isInTheFuture = (orig: Date): boolean => {
    // console.log({ orig });
    // console.log(moment(orig).toDate());
    // console.log(moment().toDate());
    // console.log(moment(orig).isAfter(moment()));
    // console.log('---');
    return moment(orig).isAfter(moment());
}

export const isInThePast = (orig: Date): boolean => {
    return moment(orig).isBefore(moment());
}

export const oneHourFromNow = (): Date =>
    moment().add(1, 'hour').toDate();

export const dateFromEpoch = (utcSeconds: number): Date => {
    const dateCurrentValue = new Date(0); // The 0 there is the key, which sets the date to the epoch
    dateCurrentValue.setUTCSeconds(utcSeconds);
    return dateCurrentValue;
};

export const dateToEpoch = (dateString: string): number => {
    const dateValue = moment(new Date(dateString));
    return dateValue.toDate().getTime() / 1000;
};