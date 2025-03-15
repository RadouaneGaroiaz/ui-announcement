fx_version "cerulean"


author 'Dudu49'
version '1.0.0'
description 'FiveM Multi-Type Announcement System'

lua54 'yes'
game "gta5"

shared_scripts {
  '@ox_lib/init.lua',
  'config.lua',
}

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "server/**/*"

files {
	'web/build/index.html',
	'web/build/**/*',
}