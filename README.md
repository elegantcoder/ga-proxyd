ga-proxyd
=========

Reverse Proxy Daemon for Google Analytics


## Installation

Run the redis server if it's not running yet.

	(sudo) npm install -g forever ga-proxyd
	ga_proxyd config
	ga_proxyd start

You can use `ga_proxyd [start|stop|status|startsync|config]` to manage your daemon.

## Plugins
* Country Filters
* No Favicon
* Request Header Logger
* Response Header Logger


