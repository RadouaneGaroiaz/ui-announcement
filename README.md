# FiveM Multi-Type Announcement System

This script adds a versatile announcement system to your FiveM server, allowing authorized users to broadcast Police, EMS, and Disaster announcements with custom messages and durations.

## Features

- Three types of announcements: Police, EMS, and Disaster
- Customizable message content and duration
- Sliding text animation for better visibility
- Distinctive styling for each announcement type
- Alarm sound for Disaster announcements

## Preview 

![FiveM Multi-Type Announcement System](https://streamable.com/n76bnl)

## Installation

1. Copy the `ui-announcement` folder to your FiveM server's `resources` directory.

2. Add the following line to your `server.cfg` file:
   ```
   ensure ui-announcement
   ```

3. If you're using a permissions system, make sure to set up the appropriate permissions for the `uiannounce` command.

## Usage

Authorized users can trigger announcements using the following command:

```
/uiannounce [type] [duration] [message]
```

- `[type]`: Can be "police", "ems", or "disaster"
- `[duration]`: The duration of the announcement in seconds
- `[message]`: The content of the announcement

### Examples:

```
/uiannounce police 10 Attention all units: Suspect on the run in Downtown area
/uiannounce ems 8 Medical emergency at Vinewood Boulevard, all nearby units respond
/uiannounce disaster 15 Severe weather warning: Take shelter immediately!
```

## Configuration

You can customize the appearance of the announcements by modifying the styles in the `App.tsx` file. Look for the `getAnnouncementStyle` function to adjust colors and other visual properties.

To change the alarm sound for Disaster announcements, modify the `client.lua` file.

**Important:** After making any changes to the UI (React components), you must rebuild the project. Navigate to the `ui-announcement/web` directory and run:

```
yarn build
```

This will generate the updated files that FiveM will use to display the UI.

## Dependencies

- Yarn (for building the UI after changes)

## Troubleshooting

- If the announcements are not displaying, ensure that the NUI is enabled and functioning correctly.
- If the sound is not playing for Disaster announcements, check that the specified sound file is available in your FiveM installation.
- If changes to the UI are not reflected in-game, make sure you've run `yarn build` after making modifications.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
