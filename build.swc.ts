/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra'
import logger from 'jet-logger'
import childProcess from 'child_process'
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
    console.log(
      '\n',
      '==========================================================================\n',
      '==========================================================================\n',
      '\n',
      'Buiding server with SWC....\n',
      '\n',
      '==========================================================================\n',
      '==========================================================================\n'
    )

    // Remove current build
    await remove('./dist/')
    // Copy front-end files
    await copy({ src: './src/public', dest: './dist/public' })
    await copy({ src: './src/views', dest: './dist/views' })

    // Copy back-end files
    await exec('npx swc src --config-file .swcrc -d dist --copy-files', './')

    console.log(
      '\n',
      '==========================================================================\n',
      '==========================================================================\n',
      '\n',
      'Server Build with SWC....\n',
      '\n',
      '==========================================================================\n',
      '==========================================================================\n'
    )
  } catch (err) {
    logger.err(err)
  }
})()
