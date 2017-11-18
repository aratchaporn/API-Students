
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let students = [
    { id: 1, name: 'aa', u: 'buu', year: 2000, email: 'aa@gmail.com',faculty:'EN' },
    { id: 2, name: 'bb', u: 'kku', year: 1990, email: 'bb@gmail.com',faculty:'SC' }
]

app.post('/students', (req, res) => {
    let student = req.body
    student.id = students.length + 1
    students.push(student)
    res.status(201).json(student)
})

app.get('/students', (req, res) => {
    res.status(200).json(students)
})

app.get('/students/:id', (req, res) => {
    let id = req.params.id

    if(!id || isNaN(id)){
        res.status(400).json({errorMessage: 'This api required id parameter'})
        return
    }
    res.json(students[req.params.id - 1])
})

app.get('/greeting', (req, res) => {
    let lang = {
        en: 'Hello',
        th: 'สวัสดี'
    }

    let l = req.query.lang

    if (!l) {
        res.json({ message: 'Hello' })
    } else {
        res.json({ message: lang[l] })
    }
})

module.exports = app