gaproxyd
=========

Reverse Proxy Daemon for Google Analytics


## Installation

Run the redis server if it's not running yet.

	(sudo) npm install -g forever gaproxyd
	gaproxyd config
	gaproxyd start

You can use `gaproxyd [start|stop|status|startsync|config]` to manage your daemon.

## Plugins
* Country Filter
* No Favicon
* Request Header Logger
* Response Header Logger


