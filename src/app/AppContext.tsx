import React, { createContext, Dispatch, useReducer } from 'react'
import { draftReducer, DraftActions, settingsReducer } from './reducers';

export type Tab = {
    url: string,
    favicon: string,
}

export type SettingsType = {
    cloud_sync: boolean,
    theme: boolean,
}

export type DraftType = {
    text: string,
    buttonEnabled: boolean,
}

export type NoteType = {
    url: string,
    favicon: string,
    text: string,
    date: Date,
  //  id: Number
}

type InitialStateType = {
    draft: DraftType;
    settings: SettingsType;
}

const initialState = {
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
    dispatch: Dispatch<DraftActions >;
}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = ({draft, settings }: InitialStateType, action: DraftActions  ) => ({
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