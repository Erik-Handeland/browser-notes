
import { getSyncItemAsync, setSyncItem } from "./storage";
import { Storage} from '../constants'

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('onInstall, checking for settings, else set defaults', details);
    let sync = await getSyncItemAsync(Storage.CLOUD_SYNC) as number
    if (sync === undefined) {
        console.log("CLOUD_SYNC = ", "False");
        setSyncItem(Storage.CLOUD_SYNC, false)
    }

    let theme = await getSyncItemAsync(Storage.THEME) as number
    if (theme === undefined) {
        console.log("Theme = ", "Light");
        setSyncItem(Storage.THEME, false)
    }
    //console.log(mode, len, theme);
});

chrome.runtime.onConnect.addListener((port) => {
    //console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(() => {
   // console.log('[background.js] onStartup')
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
   // console.log('[background.js] onSuspend')
});


// storage changed
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//       console.log(
//         `Storage key "${key}" in namespace "${namespace}" changed.`,
//         `Old value was "${oldValue}", new value is "${newValue}".`
//       );
//     }
//   });