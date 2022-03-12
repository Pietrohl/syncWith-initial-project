/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra'
import logger from 'jet-logger'
import childProcess from 'child_process'

console.log('Building with sws...')
function remove(loc: string): Promise<void> {
  return new Promise((resolve, reject) => {
    return fs.remove(loc, err => {
      return err ? reject(err) : resolve()
    })
  })
}

function copy({ src, dest }: { src: string; dest: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    return fs.copy(src, dest, err => {
      return err ? reject(err) : resolve()
    })
  })
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((resolve, reject) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (stdout) {
        logger.info(stdout)
      }
      if (stderr) {
        logger.warn(stderr)
      }
      return err ? reject(err) : resolve()
    })
  })
}

;(async () => {
  try {
    // Remove current build
    await remove('./dist/')
    // Copy front-end files
    await copy({ src: './src/public', dest: './dist/public' })
    await copy({ src: './src/views', dest: './dist/views' })

    // Copy back-end files
    await exec('npx swc src -d dist --source-maps --copy-files', './')
  } catch (err) {
    logger.err(err)
  }
})()