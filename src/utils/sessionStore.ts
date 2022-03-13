import MemoryStore from 'memorystore'
import expressSession from 'express-session'

type StoreOptions = {
  checkPeriod?: number
}

export default class Store {
  #store
  constructor(options: StoreOptions, session: typeof expressSession) {
    const NewStore = MemoryStore(session)

    this.#store = new NewStore(options)
  }

  getStore() {
    return this.#store
  }
}
