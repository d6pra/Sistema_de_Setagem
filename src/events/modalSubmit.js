const Discord = require('discord.js')
const { ModalSubmitInteraction } = require('discord-modals')
const sleep = require('../utils/sleep')
const database = require('../database/database')
const config = require('../../config.json')
const Sequelize = require('sequelize')
const ms = require('ms')
const Op = Sequelize.Op
const { QuickDB } = require('quick.db')
const db = new QuickDB()

/**
 * @param {ModalSubmitInteraction} modal
 * @param {Discord.Message} message
 * @param {Discord.Interaction} interaction
 */

module.exports = async (client, modal, interaction) => {
    const xd = await db.get("role_cd")

    if (modal.customId === 'coloset') {

        const idp = modal.getTextInputValue('id')
        const group = modal.getTextInputValue('group')
        const role = modal.getTextInputValue('idrole')
        const membro = modal.getTextInputValue('idm')

        try {

            const contador = modal.guild.roles.cache.get(role).members.size
            const maxi = await db.get("max_members")

            const not = new Discord.MessageEmbed()

                .setDescription(`<:negativo:986324228146085898> *O seu group possui mais de ${maxi} membros setados, remova os membros para prosseguir.*`)
                .setColor('#B22222')

            if (contador >= maxi) {
                await modal.deferReply({ ephemeral: true })
                return await modal.editReply({ embeds: [not] })
            }
        } catch (e) { }

        const id = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O ID inserido não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (isNaN(idp)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [id] })
        }

        const ngroup = await db.get("groups_permitidos")

        const neg = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Group selecionado não é permitido ser setado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (group) {
            if (ngroup.indexOf(group) === -1) {
                await modal.deferReply({ ephemeral: true })
                return await modal.editReply({ embeds: [neg] })
            }
        }

        const embed = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Membro selecionado não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (!modal.guild.members.cache.get(membro)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [embed] })
        }

        const roles = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Cargo selecionado não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (!modal.guild.roles.cache.get(role)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [roles] })
        }

        const cargin = await db.get("roles_permitidos")

        const cargo = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Cargo selecionado não é permitido ser setado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (role) {
            if (cargin.indexOf(role) === -1) {
                await modal.deferReply({ ephemeral: true })
                return await modal.editReply({ embeds: [cargo] })
            }
        }

        const cd = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Membro esta em cooldown, verifique com a Staff está situação*')
            .setColor('#B22222')


        if (modal.guild.members.cache.get(membro).roles.cache.has(xd)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [cd] })
        }

        const log = new Discord.MessageEmbed()

            .setAuthor({ name: `${modal.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setDescription(`<a:seta:986369060457553990> *O Membro ${modal.user} \`\`${modal.user.id}\`\` adicionou um set ha player via painel.*
            <:edit:986324000240185414> ***INFORMAÇÕES DO PLAYER***
            
            ***Group Adicionado:*** \`\`${group}\`\`
            ***ID do Player:*** \`\`${idp}\`\`
            ***Membro:*** <@${membro}> \`\`${membro}\`\`
            ***Cargo Adicionado:*** <@&${role}>`)
            .setFooter({ text: 'BY ❤️ Swervin Studio', iconURL: 'https://media.discordapp.net/attachments/988499022954233857/988499087680753744/XiolaEdits_Icon1_Leitao_V1.png?width=677&height=676' })
            .setColor("#2f3136")

        client.channels.cache.find(channel => channel.name === 'log-setagem').send({ embeds: [log] })

        await database.fivem.create({
            requests: `groupdiscord add ${idp} ${group}`
        })

        const pv = new Discord.MessageEmbed()

            .setAuthor({ name: `${modal.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setDescription(`***Ola <@${membro}>,***
            Você foi setado com sucesso no group: ***${group}***
            
            <a:stop:986369581083951185> Caso você tenha sido setado por engano entre em contato com a **STAFF** o mais rápido possível!`)
            .setColor("#2f3136")

        await modal.guild.members.cache.get(membro).send({ embeds: [pv] }).catch(() => true)
        await modal.guild.members.cache.get(membro).roles.add(role).catch(() => true)

        const confirm = new Discord.MessageEmbed()

            .setDescription(`<:Positivo:986323641836896316> *O <@${membro}> teve o set adicionado com sucesso no group:* ***${group}***`)
            .setColor("#006400")

        await modal.deferReply({ ephemeral: true })
        return await modal.editReply({ embeds: [confirm] })
    }

    if (modal.customId == 'remset') {

        const idp = modal.getTextInputValue('id')
        const group = modal.getTextInputValue('group')
        const role = modal.getTextInputValue('idrole')
        const membro = modal.getTextInputValue('idm')

        const id = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O ID inserido não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')


        if (isNaN(idp)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [id] })
        }

        const embed = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Membro selecionado não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (!modal.guild.members.cache.get(membro)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [embed] })
        }

        const roles = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Cargo selecionado não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (!modal.guild.roles.cache.get(role)) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [roles] })
        }

        const ngroup = await db.get("groups_permitidos")

        const neg = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Group selecionado não é permitido ser removido, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (group) {
            if (ngroup.indexOf(group) === -1) {
                await modal.deferReply({ ephemeral: true })
                return await modal.editReply({ embeds: [neg] })
            }
        }

        const cargin = await db.get("roles_permitidos")

        const cargo = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Cargo selecionado não é permitido ser removido, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (role) {
            if (cargin.indexOf(role) === -1) {
                await modal.deferReply({ ephemeral: true })
                return await modal.editReply({ embeds: [cargo] })
            }
        }

        var currentdate = new Date();
        var datetime = "" + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " | "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const date = new Date();
        var fall = "" + (date.getDate() + 7) + "/"
            + (date.getMonth() + 1) + "/"
            + date.getFullYear() + " | "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();

        const time = '7d'

        const log = new Discord.MessageEmbed()

            .setAuthor({ name: `${modal.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setDescription(`<a:seta:986369060457553990> *O Membro ${modal.user} \`\`${modal.user.id}\`\` removeu um set de player via painel.*
            <:edit:986324000240185414> ***INFORMAÇÕES DO PLAYER***
             
            ***Group Removido:*** \`\`${group}\`\`
            ***ID do Player:*** \`\`${idp}\`\`
            ***Membro:*** <@${membro}> \`\`${membro}\`\`
            ***Cargo Removido:*** <@&${role}>`)
            .setFooter({ text: 'BY ❤️ Swervin Studio', iconURL: 'https://media.discordapp.net/attachments/988499022954233857/988499087680753744/XiolaEdits_Icon1_Leitao_V1.png?width=677&height=676' })
            .setColor("#2f3136")

        client.channels.cache.find(channel => channel.name === 'log-setagem').send({ embeds: [log] })

        const canal = await db.get("channel_cd")

        const cd = new Discord.MessageEmbed()

            .setAuthor({ name: `NOVO COOLDOWN REGISTRADO`, iconURL: 'https://media.discordapp.net/attachments/970045333893685298/976198270663659520/timeing.png' })
            .addField('Membro:', `<@${membro}> \`\`${membro}\`\``, false)
            .addField('<:adicionar:986323708253712404> Data do Registro:', datetime, false)
            .addField('<:remover:986324405556764772> Data da Remoção:', fall, false)
            .setColor("#2f3136")

        client.channels.cache.get(canal).send({ embeds: [cd] })

        setTimeout(async () => {
            await modal.guild.members.cache.get(membro).roles.remove(xd).catch(() => true)

            const embed = new Discord.MessageEmbed()

                .setDescription(`***Ola <@${membro}>, Você foi removido do cooldown com sucesso!***`)
                .setColor("#006400")

            await modal.guild.members.cache.get(membro).send({ embeds: [embed] }).catch(() => true)
        }, ms(time))

        const rem = new Discord.MessageEmbed()

            .setAuthor({ name: `${modal.guild.name} | Setagem`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setDescription(`***Ola <@${membro}>,***
            Você foi removido do group: ***${group}***
            
            <a:seta:986339267951362050> Você foi colocado em cooldown durante 7 dias, a data de termino é:
            ***${fall}***`)
            .setColor("#2f3136")

        await modal.guild.members.cache.get(membro).send({ embeds: [rem] }).catch(() => true)

        await database.fivem.create({
            requests: `groupdiscord rem ${idp} ${group}`
        })

        await modal.guild.members.cache.get(membro).roles.remove(role).catch(() => true)
        await modal.guild.members.cache.get(membro).roles.add(xd).catch(() => true)

        const confirm = new Discord.MessageEmbed()

            .setDescription(`<:Positivo:986323641836896316> *O <@${membro}> teve o set removido com sucesso no group:* ***${group}*** `)
            .setColor("#006400")

        await modal.deferReply({ ephemeral: true })
        return await modal.editReply({ embeds: [confirm] })
    }

    if (modal.customId == 'setlist') {

        const role = modal.getTextInputValue('id')
        const group = modal.getTextInputValue('group')

        const roles = new Discord.MessageEmbed()

            .setDescription('<:negativo:986324228146085898> *O Cargo selecionado não foi encontrado, verifique se os dados estão corretos.*')
            .setColor('#B22222')

        if (!modal.guild.roles.cache.get(role)) {
            return modal.reply({ embeds: [roles] }).then(async message => {
                await sleep(5000)
                await modal.deleteReply().catch(() => true)
            })
        }

        let users = ""
        let cargos = ""
        let haveRoles = false
        let haveUsers = false

        try {
            cargos = modal.guild.roles.cache.get(role).members.map((user) => {
                haveRoles = true
                return `<@${user.id}> | \`\`${user.id}\`\``
            })
        } catch (e) { }

        const member = modal.guild.roles.cache.get(role).members.size

        const data = {
            userData: await database.userData.findAll({
                where: {
                    dkey: "vRP:datatable", dvalue: {
                        [Op.like]: `%"${group}":true%`
                    }
                }
            })
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("<a:load:986324092846243880> Carregando dados")
            .setFooter({ text: "Esse evento pode demorar até 10 segundos." })
            .setColor("#2f3136")

        await modal.reply({ embeds: [embed] }).then(async message => {
            await sleep(10000)
            await modal.deleteReply().catch(() => true)
        })

        data.userData.forEach(dados => {
            const usuario = JSON.parse(dados.dvalue)
            if (usuario.groups === []) return
            Object.entries(usuario.groups).forEach(async (groupData) => {
                if (groupData[0] === group) {
                    if (groupData[1] === true) {
                        haveUsers = true
                        const dataUser = await database.usuario.findOne({ where: { user_id: dados.user_id } })
                        users += `${dataUser.user_id} │ ${dataUser.firstname} ${dataUser.name} \n`
                    }
                }
            })
        })

        await sleep(10000)
        if (haveUsers === false) {
            users = "Este group não possui membros ou o group é inválido."
        }

        if (haveRoles === false) {
            cargos = "Este cargo não possui membros."
        }

        const embed2 = new Discord.MessageEmbed()
            .setAuthor({ name: `${modal.guild.name} | Setlist`, iconURL: config.server.imagemserver, url: 'https://discord.gg/W3n8N6mxbF' })
            .setDescription(`*** Group:*** \`\`${group}\`\`
            ***Cargo:*** <@&${role}>
            ***Número de membros:*** \`\`${member}\`\`
            
            ***Players:***
            \`\`\`${users}\`\`\`

            ***Membros:***
            ${cargos.join("\n")}`)
            .setFooter({ text: '📝 Está mensagem será deletada em alguns segundos.' })
            .setColor("#2f3136")

        await modal.channel.send({ embeds: [embed2] }).then(async message => {
            await sleep(5000)
            await modal.deleteReply().catch(() => true)
        })
    }

    if (modal.customId == 'agroup') {

        const perm = new Discord.MessageEmbed()

            .setTitle('<:negativo:986324228146085898> | Ocorreu um erro!')
            .setDescription(`*Você não tem permissão para clicar neste botão*`)
            .setColor("#2f3136")

        const user = (await (modal.guild?.members.fetch({ user: modal.user }))).permissions.has("MANAGE_MESSAGES")
        if (!user) {
            await modal.deferReply({ ephemeral: true })
            return await modal.editReply({ embeds: [perm] })
        }

        const groups = modal.getTextInputValue('gg')
        const cargo = modal.getTextInputValue('gg2')
        const maxmembers = modal.getTextInputValue('gg3')
        const channel = modal.getTextInputValue('gg4')
        const role = modal.getTextInputValue('gg5')

        await db.set("groups_permitidos", groups)
        await db.set("roles_permitidos", cargo)
        await db.set("max_members", maxmembers)
        await db.set("channel_cd", channel)
        await db.set("role_cd", role)

        let roles = " "

        cargo.split(", ").forEach((id) => {
            roles += `<@&${id}>, `
        })

        const embed = new Discord.MessageEmbed()

            .setDescription(`<:Positivo:986323641836896316> ***Informações definidas com sucesso! Caso queira alterar clique novamente no MENU.***
        
            *Groups Definidos:* \`\`${groups}\`\`
            *Cargos Definidos:* ${roles}
            *Máximo de membros Definidos:* \`\`${maxmembers}\`\`
            *Canal cooldown Definido:* <#${channel}>
            *Cargo cooldown Definido:* <@&${role}>`)
            .setColor("#006400")

        await modal.deferReply({ ephemeral: true })
        return await modal.editReply({ embeds: [embed] })
    }
}