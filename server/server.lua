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


