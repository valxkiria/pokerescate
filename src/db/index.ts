import * as SQLite from 'expo-sqlite'
import { UserRow } from '../global/types';

let db: SQLite.SQLiteDatabase

export const initDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('pokerescate.db');
    }
}

export const initSessionTable = async () => {
  try {
    await initDB()
    await db.execAsync('CREATE TABLE IF NOT EXISTS sessions (id INTERGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, localId TEXT NOT NULL);')
  } catch (error) {
    console.error("Error al inicializar la base de datos. error: ", error)
  }
}

export const saveUserInDB = async (email: string, localId: string) => {
    try {
        const result = await db.runAsync('INSERT INTO sessions (id, email, localId) VALUES (?,?,?)', Math.random(), email, localId)
    } catch (error) {
        console.error("Error al guardar el usuario en la base de datos: ", error)
    }
}

export const getSession = async () => {
    await initDB();
    const result: UserRow | null = await db.getFirstAsync('SELECT * FROM sessions;')
    return result
};

export const clearSession = async () => {
    await initDB();
    await db.runAsync('DELETE FROM sessions;'); // Se borra TODA la tabla
};