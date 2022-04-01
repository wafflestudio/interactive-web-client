#!/bin/bash

if [ -d /home/ubuntu/interactive-web-client/ ]; then
    rm -rf /home/ubuntu/interactive-web-client/
fi
mkdir -vp /home/ubuntu/interactive-web-client/

source /home/ubuntu/.profile
#sudo apt-get install npm
#npm install pm2 -g
#pm2 delete all
