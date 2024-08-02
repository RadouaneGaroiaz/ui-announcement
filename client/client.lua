local function toggleNuiFrame(shouldShow)
    SendReactMessage('setVisible', shouldShow)
  end

  
  RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
  end)

RegisterNetEvent("showAnnouncement")
AddEventHandler("showAnnouncement", function(data)
    toggleNuiFrame(true)
    SendReactMessage('showAnnouncement', {type = data.type, message = data.message,
    duration = data.duration, speed = data.speed})
end)

RegisterNetEvent("showAdd")
AddEventHandler("showAdd", function(data)
    toggleNuiFrame(true)
    SendReactMessage('showAdd', {link = data.link,
    duration = data.duration})
end)

RegisterNetEvent("playDisasterAlarm")
AddEventHandler("playDisasterAlarm", function()
    -- Play the alarm sound
        TriggerEvent('InteractSound_CL:PlayOnOne', 'alarm', 0.5)
end)


RegisterNetEvent("ui-announcement:allowAnnouncement")
AddEventHandler("ui-announcement:allowAnnouncement", function(data)
  local input = lib.inputDialog('UI Announcment', {
    {type = 'select', label = 'Announce type', required = true, options = {{
      label = 'Disaster',
      value = 'disaster'
    }, {
      label = 'Police',
      value = 'police'
    }, {
      label = 'EMS',
      value = 'ems'
    }},
  },
    {type = 'number', label = 'Duration', description = 'Duration in Seconds', icon = 'hashtag', required = true},
    {type = 'textarea', label = 'Message', description = 'The message to display', placeholder = 'Enter message here', icon = 'pencil', required = true},
    
  })


  if not input then return end
   
  --print(json.encode(input))
   
   -- Convert seconds to milliseconds
   local durationMs = input[2] * 1000

    TriggerEvent("showAnnouncement", {
        type = input[1],
        message = input[3],
        duration = durationMs,
        speed = Config.TextSpeed
    })
   
     -- If it's a disaster announcement, trigger the alarm sound
     if input[1] == "disaster" then
      TriggerEvent("playDisasterAlarm", -1)
  end
end)


RegisterNetEvent("ui-announcement:allowAdd")
AddEventHandler("ui-announcement:allowAdd", function(data)
  local input = lib.inputDialog('UI Add', {
    
    {type = 'number', label = 'Duration', description = 'Duration in Seconds', icon = 'hashtag', required = true},
    {type = 'input', label = 'Link', description = 'Image link', placeholder = 'Link', icon = 'pencil', required = true},
    
  })


  if not input then return end
   
  --print(json.encode(input))
   
   -- Convert seconds to milliseconds
   local durationMs = input[1] * 1000

    TriggerEvent("showAdd", {
      duration = durationMs,
        link = input[2],
    })
   
end)
