kill $(ps -ef | grep repeat-after-me/server/server.js | awk '{print $2}') 
