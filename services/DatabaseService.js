import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import ComponentService from './ComponentService';

export default class DatabaseService extends ComponentService {
  instance = null;
  dbName = 'db.db';
  sqlDir = FileSystem.documentDirectory + 'SQLite';

  /**
   * Asynchronously create a folder and download local database to it
   * for the SQLite package to perform operations on.
   *
   * @param setErrorViewState State setter for ErrorView
   */
  async getDatabase(setErrorViewState) {
    try {
      if (!(await FileSystem.getInfoAsync(this.sqlDir)).exists) {
        await FileSystem.makeDirectoryAsync(this.sqlDir, { intermediates: true });
      }

      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/database/db.db')).uri,
        this.sqlDir + '/' + this.dbName
      );

      return SQLite.openDatabase(this.dbName);
    } catch (err) {
      setErrorViewState('DatabaseService: ' + err.toString());
    }
  }
}
