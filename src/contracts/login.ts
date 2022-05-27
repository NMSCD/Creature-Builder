export interface ILoginProps {
    userGuid: string;
    userName: string;
    userProfileUrl: string;
    secondsTillExpire: number;
    userDetailsExpiryDate: Date;
}