import fs from 'fs';

import { errorLoadFile } from '../../meta/errors.mjs';

/**
 * Load file from local path
 *
 * @exports
 * @async
 * @function
 * @param {string} path - Path to local file
 * @param {boolean} [isRaw] - Bool to set if data should be parsed or not
 * @returns {Promise} - The parsed JSON object
 * @throws {errorLoadFile} - Throws error if no path
 * @throws {errorLoadFile} - Throws error if path does not exist
 */
export async function loadFile(path, isRaw = false) {
  if (!path) throw new Error(errorLoadFile);
  if (!fs.existsSync(path)) throw new Error(errorLoadFile);

  return await new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) reject(error);
      if (isRaw) {
        resolve(data);
        return data;
      }

      const DATA = JSON.parse(data);
      resolve(DATA);
    });
  });
}
