export const DEFAULT_SETTINGS = {
    theme: false,
    cloud_sync: false,
}

export const DEFAULT_CONTEXT = {
    theme: false,
    cloud_sync: false,
    settings: DEFAULT_SETTINGS,
    history: []
}

export enum Storage {
    THEME = "theme",
    CLOUD_SYNC = "cloud_sync",
    HISTORY = "history",
    SETTINGS = "settings"
}

export enum Action {
    UPDATE_TEXT =               "update_text",
}

export const MAX_TEXT_LENGTH = 4096