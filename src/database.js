import fs from "node:fs/promises"

const dbPath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}
  
  constructor() {
    fs.readFile(dbPath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database, null, 2))
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  list(table) {
    return this.#database[table] || []
  }
}