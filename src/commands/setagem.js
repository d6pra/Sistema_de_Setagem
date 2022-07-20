const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
    run: async (client, message) => {
        message.delete()

        const perm = new Discord.MessageEmbed()

            .setTitle('Ocorreu um erro <:negativo:986324228146085898>')
            .setDescription(`${message.author} Você não tem permissão para usar esse comando.`)
            .setColor("#2f3136")

        if (!message.member.permissions.has(`MANAGE_MESSAGES`)) {
            return message.channel.send({ embeds: [perm] })
        }

        const embed = new Discord.MessageEmbed()

            .setAuthor({ name: `${message.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setColor("#2f3136")
            .setDescription(`<:1204pepecrown:986323172758540298> *Seja Bem-Vindo ao sistema de **SETAGEM***
            
            <a:seta:986369060457553990> Para iniciar clique no **MENU** a baixo de acordo com sua necessidade.
            
            \`\`ATENÇÃO A SEGUIR:\`\`
            
            <a:stop:986369581083951185> Informações falsas poderão gerar punições ou banimentos.
            
            <:ticketlog:986339531781439590> Todas as informações serão armazenadas e analisadas pela a **STAFF**.
            
            <a:call:986323892404625469> Caso precise de **SUPORTE** abra um ticket.`)

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('setCustomId')
                    .setPlaceholder("Selecione a opção")
                    .addOptions([
                        {
                            label: "Adicionar Set",
                            description: "Adicione o player a um group.",
                            emoji: '986323708253712404',
                            value: 'aset',
                        },
                        {
                            label: "Remover Set",
                            description: "Remova o player de um group.",
                            emoji: "986324405556764772",
                            value: "rset"
                        },
                        {

                            label: "SetList",
                            description: "Verique os membros no discord e no group.",
                            emoji: "986324000240185414",
                            value: "set",
                        },
                        {
                            label: "Informações de Set",
                            description: "Verifique todas as informações de set.",
                            emoji: "986339531781439590",
                            value: "info",
                        },
                        {
                            label: "Informações Setagem",
                            description: "Insira as informações para setagem.",
                            emoji: "986323674237919283",
                            value: "group",
                        },
                        {
                            label: "Debug",
                            description: "Clique para desbugar o menu.",
                            emoji: "986369581083951185",
                            value: "bug",
                        }
                    ])
            )
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
    }
}