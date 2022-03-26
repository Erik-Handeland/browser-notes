import { DraftType, SettingsType } from "./AppContext";
import { Action } from "./constants"

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

type DraftPayload = {
    [Action.UPDATE_TEXT]: {
        text: string,
        buttonEnabled: boolean,
    }
}

export type DraftActions = ActionMap<DraftPayload>[keyof ActionMap<DraftPayload>];


export const draftReducer = (state: DraftType, action: DraftActions ) => {
    switch (action.type) {
        case Action.UPDATE_TEXT:
            return {
                ...state,
                text: action.payload.text,
                buttonEnabled: action.payload.buttonEnabled,
            }
        default:
            return state;
    }
}

export const settingsReducer = (state: SettingsType, action: DraftActions ) => {
    switch (action.type) {
        default:
            return state;
    }
}