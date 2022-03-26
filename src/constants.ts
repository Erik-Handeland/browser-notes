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
    CLEAR_DRAFT =               "clear_draft",
    ADD_TO_HISTORY =            "add_to_history",
    PREVIEW_HISTORY_ITEM =      "preview_history",
    CLEAR_HISTORY =             "clear_history",
    REMOVE_ITEM_FROM_HISTORY =  "remove_item_from_history",
    RESET_SETTINGS =            "clear_settings",
    UPDATE_SETTINGS =           "update_settings",
    TOGGLE_DARK_MODE =          "toggle_dark_mode",
    UPDATE_PLAINTEXT =          "update_plaintext",
    SET_PREVIEW =               "set_preview",
    CLEAR_PREVIEW =             "clear_preview",
}

export const MAX_TEXT_LENGTH = 4096