local Config = {
    TypeColors = {
        error = {
            color = {255, 0, 0},
            background = {0, 0, 0}
        }
    }
}

RegisterCommand("uiannounce", function(source, args, rawCommand)
    
    -- You might want to add a permission check here
     if not IsPlayerAceAllowed(source, "command.announce") then
         TriggerClientEvent("chat:addMessage", source, {
             type = "ERROR",
             color = Config.TypeColors["error"].color,
             borderColor = Config.TypeColors["error"].background,
             header = "PERMISSION ERROR",
             args = { "You don't have enough permissions to use this command!" },
             channel = "server",
         })
         return
     end

    TriggerClientEvent("ui-announcement:allowAnnouncement", source)
end, false)


RegisterCommand("advertisement", function(source, args, rawCommand)
    
    -- You might want to add a permission check here
     if not IsPlayerAceAllowed(source, "command.announce") then
         TriggerClientEvent("chat:addMessage", source, {
             type = "ERROR",
             color = Config.TypeColors["error"].color,
             borderColor = Config.TypeColors["error"].background,
             header = "PERMISSION ERROR",
             args = { "You don't have enough permissions to use this command!" },
             channel = "server",
         })
         return
     end

    TriggerClientEvent("ui-announcement:allowAdd", source)
end, false)


RegisterNetEvent('ui-announcement:server:showAdd')
AddEventHandler('ui-announcement:server:showAdd', function(duration, link)
    TriggerClientEvent('ui-announcement:client:showAdd', -1, duration, link)
end)

RegisterNetEvent('ui-announcement:server:showAnnouncement')
AddEventHandler('ui-announcement:server:showAnnouncement', function(type, duration, message, speed)
    TriggerClientEvent('ui-announcement:client:showAnnouncement', -1, type, duration, message, speed)
end)


RegisterNetEvent('playDisasterAlarm')
AddEventHandler('playDisasterAlarm', function()
    TriggerClientEvent('playDisasterAlarm:client', -1)
end)

