import { createWriteStream, createReadStream } from 'node:fs'
import csv from 'csvtojson'

const csvFilePath = './assets/book_test.csv'

const writable = createWriteStream('./new_file.txt')
const read = createReadStream(csvFilePath, 'utf8')

const options = {
    delimiter: ';'
}

read.on('start', () => console.log("The book_test.csv has started to be read"))
read.on('data', (chunk) => {
    writable.write(chunk)
    csv(options)
        .fromString(chunk)
        .then((json) => writable.write(JSON.stringify(json)))
        .then(() => console.log("chunk is written"))
})
read.on('end', () => console.log("The book_test.csv has ended to be read"))
read.on("error", (e) => console.log(e))

/*
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
*/
