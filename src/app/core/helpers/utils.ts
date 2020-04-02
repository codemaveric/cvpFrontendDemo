import * as moment from 'moment';

export class Utils {

    /**
     * Encodes an object as a string URI
     */
    public static URIEncodeObject(obj: object) {
        const str = [];
        for (const p of Object.keys(obj)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }

        return str.join('&');
    }


    public static secondsBetween(date1, date2) {
        const moment1 = moment(date1);
        const moment2 = moment(date2);

        return Math.round(moment1.diff(moment2) / 1000);
    }

}
