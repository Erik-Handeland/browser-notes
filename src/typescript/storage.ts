import {Storage} from '../app/constants';
import {NoteType} from '../app/AppContext';
/////////////////////////  SYNC STORAGE //////////////////////////////
// Chrome sync storage limit of 8,192 bytes per item, 102,400 Bytes total storage 
export const setSyncItem = (key: string, value: any, callback?: () => void) => {
    chrome.storage.sync.set({ [key]: value }, callback)
}

export const getSyncItem = (key: string | string[] | null, callback: (items: { [key: string]: any; }) => void) => {
    return chrome.storage.sync.get(key, callback)
}

export const deleteSyncItem = (key: string | string[], callback?: () => void) => {
    return chrome.storage.sync.remove(key, callback)
}

export const getSyncItemAsync = async (key: string) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function (result) {
            if (result[key] === undefined) {
                console.log(`${key} not found in storage`)
                resolve(undefined)
            } else {
                resolve(result[key]);
            }
        });
    });
};


/////////////////////////  LOCAL STORAGE //////////////////////////////
// Chrome limit 5,242,880  Bytes total storage, can be set to unlimited
export const setLocalItem = (key: string, value: any, callback?: () => void) => {
    chrome.storage.local.set({ [key]: value }, callback)
}

export const getLocalItem = (key: string | string[] | null, callback: (items: { [key: string]: any; }) => void) => {
    return chrome.storage.local.get(key, callback)
}

export const deleteLocalItem = (key: string | string[], callback?: () => void) => {
    return chrome.storage.local.remove(key, callback)
}

export const addLocalItem = (key: string, value: any, callback?: () => void) => {
    getLocalItem(key, (data) => {
        let result = data[key];
        if (!result) {
            result = [];
        }
        result.push(value);
        setLocalItem(key, result)
    })
}

export const getNote = (url: string, callback:(note: NoteType| undefined) => void) => {
    getLocalItem(Storage.NOTES, (data)  => {
        let notes = data[Storage.NOTES] as NoteType[];
        let note = notes.find(n => n.url === url);
        return callback(note)
    })
}

export const removeItem = (key: string, value: any, index: number, callback?: () => void) => {
    getLocalItem(key, (data) => {
        let result = data[key];
        if (result && result.length > index) {
            result.splice(index, 1);
        }
        return chrome.storage.local.set({ [key]: result }, callback)
    })
}

