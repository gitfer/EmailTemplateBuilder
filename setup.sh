#!/bin/bash
command -v git >/dev/null 2>&1 || { echo >&2 "I require git but it's not installed.  Aborting."; exit 1; }
command -v node >/dev/null 2>&1 || { echo >&2 "I require node but it's not installed.  Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "I require npm but it's not installed.  Aborting."; exit 1; }
command -v bower >/dev/null 2>&1 || { echo >&2 "I require bower but it's not installed.  Aborting."; exit 1; }
command -v mongod >/dev/null 2>&1 || { echo >&2 "I require mongod but it's not installed.  Aborting."; exit 1; }
command -v grunt >/dev/null 2>&1 || { echo >&2 "I require grunt but it's not installed.  Aborting."; exit 1; }

cd .. && mkdir angularUtils && cd angularUtils && git clone git@github.com:gitfer/angularUtils.git && 
cd .. && mkdir ngDraggable && cd ngDraggable && git clone git@github.com:gitfer/ngDraggable.git && 
cd EmailTemplateBuilder && ./runServer.sh && grunt serve:local
