import { readFile } from 'node:fs/promises'
import { createWriteStream, createReadStream } from 'node:fs'
import csv from 'csvtojson'

const csvFilePathBig = './assets/book_test.csv'
const csvFilePathSmall = './assets/books.csv'
const writeStream = createWriteStream('./new_file.txt')

const writable = createWriteStream('./new_file.txt')
const readStream = createReadStream(csvFilePathBig, 'utf8')

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

/*
 // second solve
const writeItems = (writer, data, encoding) => {
  let i = 0
  let ok = true
  do {
    if (i === data.length - 1) {
      writer.write(JSON.stringify(data[i]), encoding)
      return 'File upload'
    }
    ok = writer.write(`${JSON.stringify(data[i])}\n`, encoding)

    i++
  } while (i < data.length && ok)
  return 'Error'
}

readFile(csvFilePathSmall)
  .then((data) => csv(options).fromString(data.toString()))
  .then((jsonObj) => writeItems(writable, jsonObj, 'utf8'))
  .then(console.log)
  .catch(console.error) */
