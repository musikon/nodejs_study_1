import { createWriteStream, createReadStream } from 'node:fs'
import csv from 'csvtojson'

const csvFilePath = './assets/book_test.csv'
const writeStream = createWriteStream('./new_file.txt')
const readStream = createReadStream(csvFilePath, 'utf8')

const options = {
  delimiter: ';',
}

readStream.pipe(csv(options)).pipe(writeStream)
