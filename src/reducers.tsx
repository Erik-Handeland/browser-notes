import { DraftType, HistoryType, SettingsType } from "./AppContext";
import { setSyncItem, getSyncItem } from "./chrome/storage";
import { Storage, Action, DEFAULT_CONTEXT } from "./constants"

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        }
};

type HistoryPayload = {
    [Action.ADD_TO_HISTORY] : {
        id: number,
        text: string,
        date: Date,
    };
    [Action.CLEAR_HISTORY] : undefined,
    [Action.REMOVE_ITEM_FROM_HISTORY]: {
        id: number;
    }
}

type DraftPayload = {
    [Action.UPDATE_PLAINTEXT]: {
        text: string,
        buttonEnabled: boolean,
    }
}

type SettingsPayload = {
    [Action.UPDATE_SETTINGS] : {
        api_key: string,
        enc_mode: string,
        key_length: number,
        theme: boolean,
    };
    [Action.RESET_SETTINGS]: undefined,

}

export type DraftActions = ActionMap<DraftPayload>[keyof ActionMap<DraftPayload>];
export type SettingsActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];
export type HistoryActions = ActionMap<HistoryPayload>[keyof ActionMap<HistoryPayload>];

export const historyReducer = (state: HistoryType[], action: SettingsActions | DraftActions | HistoryActions ) => {
    switch (action.type) {
        case Action.ADD_TO_HISTORY:
            return [
                ...state,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    date: action.payload.date,
                }
            ]
        case Action.REMOVE_ITEM_FROM_HISTORY:
            return [
                ...state.filter(product => product.id !== action.payload.id),
            ]
        case Action.CLEAR_HISTORY:
            return []
        default:
            return state;
    }
}

export const draftReducer = (state: DraftType, action: SettingsActions | DraftActions | HistoryActions ) => {
    switch (action.type) {
        case Action.UPDATE_PLAINTEXT:
            return {
                ...state,
                text: action.payload.text,
                buttonEnabled: action.payload.buttonEnabled,
            }
        default:
            return state;
    }
}

export const settingsReducer = (state: SettingsType, action: SettingsActions | DraftActions | HistoryActions ) => {
    switch (action.type) {
        case Action.UPDATE_SETTINGS:
            return {
                ...state,
                api_key: action.payload.api_key,
                enc_mode: action.payload.enc_mode,
                key_length: action.payload.key_length,
                theme: action.payload.theme,
            }
        case Action.RESET_SETTINGS:
            return {
                ...state,
                cloud_sync: DEFAULT_CONTEXT.cloud_sync,
                theme: DEFAULT_CONTEXT.theme,
            }
        default:
            return state;
    }
}