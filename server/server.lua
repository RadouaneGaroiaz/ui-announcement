local Config = {
    TypeColors = {
        error = {
            color = {255, 0, 0},
            background = {0, 0, 0}
        }
    }
}

RegisterCommand("uiannounce", function(source, args, rawCommand)
    if #args < 3 then
        TriggerClientEvent("chat:addMessage", source, {
            type = "ERROR",
            color = Config.TypeColors["error"].color,
            borderColor = Config.TypeColors["error"].background,
            header = "USAGE ERROR",
            args = { "Usage: /uiannounce [type] [duration in seconds] [message]" },
            channel = "server",
        })
        return
    end

    local announcementType = string.lower(args[1])
    if announcementType ~= "police" and announcementType ~= "ems" and announcementType ~= "disaster" then
        TriggerClientEvent("chat:addMessage", source, {
            type = "ERROR",
            color = Config.TypeColors["error"].color,
            borderColor = Config.TypeColors["error"].background,
            header = "INVALID TYPE",
            args = { "Invalid announcement type. Use 'police', 'ems', or 'disaster'." },
            channel = "server",
        })
        return
    end

    local durationSeconds = tonumber(args[2])
    if not durationSeconds then
        TriggerClientEvent("chat:addMessage", source, {
            type = "ERROR",
            color = Config.TypeColors["error"].color,
            borderColor = Config.TypeColors["error"].background,
            header = "INVALID INPUT",
            args = { "Invalid duration. Please use a number (in seconds)." },
            channel = "server",
        })
        return
    end

    -- Convert seconds to milliseconds
    local durationMs = durationSeconds * 1000

    table.remove(args, 1) 
    table.remove(args, 1) 
    local message = table.concat(args, " ") 

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

    TriggerClientEvent("showAnnouncement", -1, {
        type = announcementType,
        message = message,
        duration = durationMs
    })

      -- If it's a disaster announcement, trigger the alarm sound
      if announcementType == "disaster" then
        TriggerClientEvent("playDisasterAlarm", -1)
    end
end, false)


