const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { exec } = require('child_process')
const moment = require('moment-timezone')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')

// Connect ( MyMans APIs )

const mans = new WAConnection()
    mans.logger.level = 'warn'
    console.log(banner.string)
    mans.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && mans.loadAuthInfo('./session.json')
    mans.on('connecting', () => {
        start('2', 'Connecting...')
    })
    mans.on('open', () => {
        success('2', 'Connected')
    })
    await mans.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(mans.base64EncodedAuthInfo(), null, '\t'))