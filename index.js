const express = require('express')
const {v4: uuid} = require('uuid')
const method_override = require('method-override')
const app = express()
app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(method_override('_method'))



// Data for Comments
let comments = [
    {
        id: uuid(),
        username: 'BlueEagle',
        comment: 'That was a terrible gpu'
    },
        {
        id: uuid(),
        username: 'RedRakuun',
        comment: 'Amd is the right way for cpus'
    },
        {
        id: uuid(),
        username: 'GreenFanatic',
        comment: 'Raw Power means nothing'
    },
        {
        id: uuid(),
        username: 'RockstarLover',
        comment: 'Live until may 26'
    },

]

app.get('/comments', (req,res) => {
    res.render('comments/index',{comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})
 
app.post('/comments', (req,res) => {
    const {username, comment} = req.body
    comments.push({id: uuid(),username: username, comment: comment})
    res.redirect('/comments')
})

app.get('/comments/:id', (req,res) => {
    const {id} = req.params
    const comment = comments.find(data => data.id === (id))
    res.render('comments/show',{...comment})
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params
    const comment = comments.find(data => data.id === (id))
    res.render('comments/edit',{...comment})
})

app.patch('/comments/:id', (req,res) => {
    const {id} = req.params
    const {comment} = req.body
    console.log(comment)
    const found_comment = comments.find(data => data.id === id) 
    found_comment.comment = comment
    res.redirect('/comments')  
})

app.delete('/comments/:id' , (req,res) => {
    const {id} = req.params
    const comment = comments.find(data => data.id === (id))
    comments = comments.filter(data => data.id !== id)
    res.redirect('/comments')
    
})

app.listen('3000', () => {
    console.log('Localhost 3000 is listening')
})