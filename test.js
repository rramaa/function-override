'use strict'
const functionOverride = require('./index')

const res = {
    send: function(...args){
        console.log(`res.send called with arguments -- ${args} -- and context ${JSON.stringify(this)}`)
    },
    a: 1
}

function before(...args){
    console.log(`before called with arguments -- ${args} -- and context ${JSON.stringify(this)}`)
}

function after(...args) {
    console.log(`after called with arguments -- ${args} -- and context ${JSON.stringify(this)}`)
}

before = before.bind(this, "before", "fdsfsdfdsfsdfdsfds")

res.send = functionOverride(res, 'send', {before, after})

res.send("dsa", "sfds")