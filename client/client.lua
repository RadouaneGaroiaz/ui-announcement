local function toggleNuiFrame(shouldShow)
    SendReactMessage('setVisible', shouldShow)
  end
  
  RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    debugPrint('Show NUI frame')
  end)
  
  RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
  end)

RegisterNetEvent("showAnnouncement")
AddEventHandler("showAnnouncement", function(data)
    toggleNuiFrame(true)
    SendReactMessage('showAnnouncement', {type = data.type, message = data.message,
    duration = data.duration})
end)

RegisterNetEvent("playDisasterAlarm")
AddEventHandler("playDisasterAlarm", function()
    -- Play the alarm sound
        TriggerEvent('InteractSound_CL:PlayOnOne', 'godfather', 0.5)
end)
