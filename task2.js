import { createWriteStream, createReadStream } from 'node:fs'
import csv from 'csvtojson'

const csvFilePath = './assets/book_test.csv'
const writeStream = createWriteStream('./new_file.txt')
const readStream = createReadStream(csvFilePath, 'utf8')

const options = {
  delimiter: ';',
}

const startTime = Date.now()

const writeFile = () => {
  readStream.on('open', () => console.log('Start read'))
  readStream.on('error', (e) => console.log(`Read error ${e}`))
  readStream.on('end', () =>
    console.log(`End read, time: ${Date.now() - startTime}ms`),
  )

  writeStream.on('open', () => console.log('Start write'))
  writeStream.on('error', (e) => console.log(`Write error ${e}`))
  writeStream.on('finish', () =>
    console.log(`End write, time: ${Date.now() - startTime}ms`),
  )

  readStream.pipe(csv(options)).pipe(writeStream)
}

writeFile()
