import {AppStatus, HttpStatus} from '../helpers/enums';
import {Exception} from './custom.exception';

export class AppException extends Exception {

    constructor(err: any, code: number = HttpStatus.INTERNAL_SERVER_ERROR, message?: string) {
        super(err, code, message);
    }

    public static get INTERNET_UNAVAILABLE() {
        return new this('An error occurred, please check your internet connection or try again later', AppStatus.INTERNET_UNAVAILABLE);
    }

    public static get SERVER_ERROR() {
        return new this('Something went wrong, we would get on this right away', AppStatus.SERVER_ERROR);
    }
}
