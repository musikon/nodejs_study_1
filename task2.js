import { readFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import csv from 'csvtojson'

const csvFilePath = './assets/book_test.csv'
const writable = createWriteStream('./new_file.txt', 'utf8')
const options = {
    delimiter: ';'
}

const writeItems = (writer, data, encoding) => {
    let i = 0
    let ok = true
    do {
        if (i === data.length - 1) {
            writer.write(JSON.stringify(data[i]), encoding)
            return 'File upload'
        } else {
            ok = writer.write(`${JSON.stringify(data[i])}\n`, encoding)
        }
        i++;
    } while (i < data.length && ok)
    return 'Error'
}

readFile(csvFilePath)
    .then((data) => csv(options).fromString(data.toString()))
    .then((jsonObj) => writeItems(writable, jsonObj, 'utf8'))
    .then(console.log)
    .catch(console.error)
