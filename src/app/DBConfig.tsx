import { Storage } from './constants'

export const DBConfig = {
    name: Storage.DB_NAME,
    version: 1,
    objectStoresMeta: [
      {
        store: 'notes',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'url', keypath: 'url', options: { unique: true } },
          { name: 'favicon', keypath: 'favicon', options: { unique: false } },
          { name: 'text', keypath: 'text', options: { unique: false } },
          { name: 'date', keypath: 'date', options: { unique: false } }
        ]
      }
    ]
  };