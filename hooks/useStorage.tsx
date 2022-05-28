type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
    getItem: (key: string, def?: any, type?: StorageType) => any;
    setItem: (key: string, value: any, type?: StorageType) => boolean;
    removeItem: (key: string, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
    const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getItem = (key: string, def: any, type?: StorageType): any => {
        return isBrowser ? JSON.parse(window[storageType(type)][key] ?? JSON.stringify(def)) : def;
    };

    const setItem = (key: string, value: any, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, JSON.stringify(value));
            return true;
        }

        return false;
    };

    const removeItem = (key: string, type?: StorageType): void => {
        window[storageType(type)].removeItem(key);
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export default useStorage;
