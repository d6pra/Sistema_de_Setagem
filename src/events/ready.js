const colors = require('colors')

module.exports = (client, message, guild) => {

    console.log(colors.red("=== BOT ==="))
    console.log(`${colors.green("-> ")} ${colors.cyan("BOT STARTADO COM SUCESSO.")}`);

    let activities = [
        `BY ❤️ Swervin Studio`,
        client.user.username,
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
    }), 5000);

    client.user.setStatus("dnd");
}