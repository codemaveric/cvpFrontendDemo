// Window
import {LocalStoreKey} from './enums';

const STORAGE = (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') ? window.localStorage : null;

export class LocalStore {
    /**
     *
     * append to an array in the store
     */

    public static removeFromStore(key: string, data: any): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(LocalStoreKey.STORE_KEY);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);

            // lets remove the data
            store[key] = store[key].filter((value) => value !== data);


            const str = JSON.stringify(store);
            STORAGE.setItem(LocalStoreKey.STORE_KEY, str);

            return true;
        }

        return false;

    }


    /**
     * append to an array in the store
     */

    public static appendToStore(key: string, data: any): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(LocalStoreKey.STORE_KEY);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);

            store[key] = store[key] || [];

            if (!store[key].includes(key)) {
                store[key].push(data);
            }

            const str = JSON.stringify(store);
            STORAGE.setItem(LocalStoreKey.STORE_KEY, str);

            return true;
        }

        return false;

    }


    /**
     * append to an array in the store
     */

    public static getFromStore(key: string): any {

        if (STORAGE == null) {
            return null;
        }

        let store;
        const rawStore = STORAGE.getItem(LocalStoreKey.STORE_KEY);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);
            return store[key];
        }

        return false;
    }

    public static saveToStore(key: string, data: any): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(LocalStoreKey.STORE_KEY);

        // parse if items exist
        store = rawStore ? JSON.parse(rawStore) : {};
        store[key] = data;

        STORAGE.setItem(LocalStoreKey.STORE_KEY, JSON.stringify(store));

        return true;
    }


    public static deleteStore(key: string): boolean {

        if (STORAGE == null) {
            return false;
        }

        STORAGE.removeItem(key);

        return true;
    }

}
