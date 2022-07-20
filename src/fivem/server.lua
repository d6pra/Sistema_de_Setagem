local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

local timeExec = 10000 -- Tempo de variavel de resposta do comando

vRP._prepare('bot/pendingRequests','SELECT * FROM swervin_requests')
vRP._prepare('bot/deleteRequest','DELETE FROM swervin_requests WHERE id = @id')
vRP._prepare('bot/insertRequest','INSERT INTO swervin_requests(requests) VALUES(@requests)')

Citizen.CreateThread(function()
    while true do
        local req = vRP.query('bot/pendingRequests')
        for _,v in pairs(req) do
            vRP.execute('bot/deleteRequest',{ id = v.id })
            ExecuteCommand(v.requests)
        end
        Citizen.Wait(timeExec) 
    end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- [ GROUP ]-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('groupdiscord',function(source,args,rawCommand)
    if source == 0 then
        local nsource = vRP.getUserSource(parseInt(args[2]))
        local nuser_id = parseInt(args[2])
        if nsource then
            if args[1] == 'add' then
                vRP.addUserGroup(nuser_id,args[3])
                TriggerClientEvent("Notify",nsource,"sucesso","Sucesso","Você foi setado no grupo <b>"..args[3].."</b>.")
            elseif args[1] == 'rem' then
                vRP.removeUserGroup(nuser_id,args[3])
                TriggerClientEvent("Notify",nsource,"sucesso","Sucesso","Você foi removido do grupo <b>"..args[3].."</b>.")
            end
        else
            local sdata = vRP.getUData(parseInt(args[2]),"vRP:datatable") or {}
            local specs = json.decode(sdata) or {}
            if args[1] == 'add' then
                if specs.groups[args[3]] == nil then
                    specs.groups[args[3]] = true
                    vRP.setUData(parseInt(args[2]), "vRP:datatable", json.encode(specs))
                end   
            elseif args[1] == 'rem' then
                if specs.groups[args[3]] then
                    specs.groups[args[3]] = nil  
                    vRP.setUData(parseInt(args[2]), "vRP:datatable", json.encode(specs))
                end
            end
        end
        return;
    end
end)