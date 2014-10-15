#!/bin/bash
. ./tools/ticktick.sh

if [ -z "$ENV" ];
then
	echo "setting ENV variable for you... export ENV=development";
	export ENV=development;
fi

echo "============================================"
echo "Running in " $ENV " mode..."
echo "============================================"
SETTINGS=`cat settings_${ENV}.json`

# Nota: --smallfiles solo x' ho poco spazio su disco XD
tickParse "$SETTINGS"
mongod --dbpath=``mongoDbPath``  --port ``mongoDbPort`` --smallfiles &
node server.js
