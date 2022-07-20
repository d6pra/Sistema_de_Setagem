const Discord = require("discord.js")
const config = require('./config.json')
const discordModals = require('discord-modals')
const client = new Discord.Client({ intents: 32767 });
discordModals(client);

const comandos = require('./src/structures/commands')
const eventos = require('./src/structures/events')

comandos()
eventos(client)

client.login(config.token)

process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});