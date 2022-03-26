import React, { createContext, Dispatch, useReducer } from 'react'
import { HistoryActions, historyReducer, draftReducer, settingsReducer, DraftActions, SettingsActions } from './reducers';

export type SettingsType = {
    cloud_sync: boolean,
    theme: boolean,
}

export type DraftType = {
    text: string,
    buttonEnabled: boolean,
}

export type HistoryType = {
    id: number,
    text: string,
    date: Date,
}

type InitialStateType = {
    history: HistoryType[];
    draft: DraftType;
    settings: SettingsType;
}

const initialState = {
    history: [],
    draft: {
        text: "",
        buttonEnabled: false,
    } as DraftType,
    settings: {
        cloud_sync: false,
        theme: false,
    },
}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<HistoryActions | DraftActions | SettingsActions>;
}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = ({ history, draft, settings }: InitialStateType, action: HistoryActions | DraftActions | SettingsActions ) => ({
    history: historyReducer(history, action),
    draft: draftReducer(draft, action),
    settings: settingsReducer(settings, action),
});


const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };