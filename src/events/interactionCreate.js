const Discord = require('discord.js')
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals')
const config = require('../../config.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

/**
 * @param {Discord.Client} client 
 * @param {Discord.Interaction} interaction 
 * @param {ModalSubmitInteraction} modal
 */

module.exports = async (client, interaction) => {

    const modal = new Modal()
        .setTitle('Informe as informações do player:')
        .setCustomId("coloset")
        .addComponents([
            new TextInputComponent()
                .setCustomId('id')
                .setStyle('SHORT')
                .setLabel('ID do Player:')
                .setMinLength(1)
                .setMaxLength(10)
                .setPlaceholder('ID Player')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('group')
                .setStyle('SHORT')
                .setLabel('Qual será o set:')
                .setMinLength(3)
                .setMaxLength(20)
                .setPlaceholder('Group')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('idm')
                .setStyle('SHORT')
                .setLabel('ID do Discord do Membro:')
                .setMinLength(15)
                .setMaxLength(30)
                .setPlaceholder('ID Membro')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('idrole')
                .setStyle('SHORT')
                .setLabel('ID do Cargo do Discord:')
                .setMinLength(15)
                .setMaxLength(30)
                .setPlaceholder('ID Cargo')
                .setRequired(true)
        ])

    const modal2 = new Modal()
        .setTitle('Informe as informações do player:')
        .setCustomId("remset")
        .addComponents([
            new TextInputComponent()
                .setCustomId('id')
                .setStyle('SHORT')
                .setLabel('ID do Player:')
                .setMinLength(1)
                .setMaxLength(10)
                .setPlaceholder('ID Player')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('group')
                .setStyle('SHORT')
                .setLabel('Qual é o set para remover:')
                .setMinLength(3)
                .setMaxLength(20)
                .setPlaceholder('Group')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('idm')
                .setStyle('SHORT')
                .setLabel('ID do Discord do Membro:')
                .setMinLength(15)
                .setMaxLength(30)
                .setPlaceholder('ID Membro')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('idrole')
                .setStyle('SHORT')
                .setLabel('ID do Cargo do Discord:')
                .setMinLength(15)
                .setMaxLength(30)
                .setPlaceholder('ID Cargo')
                .setRequired(true)
        ])

    const modal3 = new Modal()
        .setTitle('Informe as informações do Group:')
        .setCustomId("setlist")
        .addComponents([
            new TextInputComponent()
                .setCustomId('id')
                .setStyle('SHORT')
                .setLabel('ID do Cargo')
                .setMinLength(15)
                .setMaxLength(30)
                .setPlaceholder('ID Cargo')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('group')
                .setStyle('SHORT')
                .setLabel('Qual é o group:')
                .setMinLength(3)
                .setMaxLength(20)
                .setPlaceholder('Group')
                .setRequired(true)
        ])

    const modal4 = new Modal()
        .setTitle('Informe os groups permitidos:')
        .setCustomId('agroup')
        .addComponents([
            new TextInputComponent()
                .setCustomId('gg')
                .setStyle('LONG')
                .setLabel('Siga o exemplo:')
                .setMinLength(10)
                .setMaxLength(255)
                .setPlaceholder('Ex:. Crips, Bloods, Groove, Ballas')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg2')
                .setStyle('LONG')
                .setLabel('Siga o exemplo:')
                .setMinLength(10)
                .setMaxLength(500)
                .setPlaceholder('Ex:. 900486769135484948, 761670293575172127, 903429420730183773')
        ], [
            new TextInputComponent()
                .setCustomId('gg3')
                .setStyle('SHORT')
                .setLabel('Limite de membros setados:')
                .setMinLength(1)
                .setMaxLength(3)
                .setPlaceholder('Limite de membros.')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg4')
                .setStyle('SHORT')
                .setLabel('Sala CoolDown:')
                .setMinLength(1)
                .setMaxLength(25)
                .setPlaceholder('ID Sala')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg5')
                .setStyle('SHORT')
                .setLabel('Cargo CoolDown:')
                .setMinLength(1)
                .setMaxLength(25)
                .setPlaceholder('ID Cargo')
                .setRequired(true)
        ])

    const modal5 = new Modal()
        .setTitle('Atualize as informações da setagem:')
        .setCustomId('ugroup')
        .addComponents([
            new TextInputComponent()
                .setCustomId('gg')
                .setStyle('LONG')
                .setLabel('Siga o exemplo:')
                .setMinLength(10)
                .setMaxLength(255)
                .setPlaceholder('Ex:. Crips, Bloods, Groove, Ballas')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg2')
                .setStyle('LONG')
                .setLabel('Siga o exemplo:')
                .setMinLength(10)
                .setMaxLength(500)
                .setPlaceholder('Ex:. 900486769135484948, 761670293575172127, 903429420730183773')
        ], [
            new TextInputComponent()
                .setCustomId('gg3')
                .setStyle('SHORT')
                .setLabel('Limite de membros setados:')
                .setMinLength(1)
                .setMaxLength(3)
                .setPlaceholder('Limite de membros.')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg4')
                .setStyle('SHORT')
                .setLabel('Sala CoolDown:')
                .setMinLength(1)
                .setMaxLength(25)
                .setPlaceholder('ID Sala')
                .setRequired(true)
        ], [
            new TextInputComponent()
                .setCustomId('gg5')
                .setStyle('SHORT')
                .setLabel('Cargo CoolDown:')
                .setMinLength(1)
                .setMaxLength(25)
                .setPlaceholder('ID Cargo')
                .setRequired(true)
        ])


    if (interaction.isSelectMenu()) {
        if (interaction.values[0] == 'aset') {
            await showModal(modal, {
                client,
                interaction
            })
        }

        if (interaction.values[0] == 'rset') {
            await showModal(modal2, {
                client,
                interaction
            })
        }

        if (interaction.values[0] == 'set') {
            await showModal(modal3, {
                client,
                interaction
            })
        }

        if (interaction.values[0] == 'group') {
            await showModal(modal4, {
                client,
                interaction
            })
        }

        if (interaction.values[0] == 'bug') {

            const embed = new Discord.MessageEmbed()

                .setDescription('✅ *Menu desbugado com sucesso!*')
                .setColor('#006f20')

            interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (interaction.values[0] == 'info') {

            const cargo = await db.get("roles_permitidos")
            const group = await db.get("groups_permitidos")
            const max = await db.get("max_members")

            let roles = " "

            cargo.split(", ").forEach((id) => {
                roles += `<@&${id}> | ${id}\n `
            })

            const msg = new Discord.MessageEmbed()

                .setAuthor({ name: `${interaction.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
                .setDescription(`*As informações para a **SETAGEM** se encontram abaixo:*
                
                \`\`ATENÇÃO\`\`
                
                📝 *Os Groups e Cargos permitidos são apenas citados a baixo. Caso tente setar outro será barrado e notificado a STAFF*
                
                ***Cargos permitidos:*** 
                ${roles}
                ***Groups Permitidos:*** ${group}
                ***Máximo de membros Permitidos:*** \`\`${max}\`\``)

                .setColor("#2f3136")

            await interaction.reply({ embeds: [msg], ephemeral: true })
        }
    }
}