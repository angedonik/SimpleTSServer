#!/bin/bash
home=`pwd`
user=`whoami`
npm i
sudo cp ${home}/deploy/simple-ts-server.service /etc/systemd/system
sudo sed -i s,__HOME__,${home},g /etc/systemd/system/simple-ts-server.service
sudo sed -i s,__USER__,${user},g /etc/systemd/system/simple-ts-server.service
sudo systemctl daemon-reload
sudo systemctl enable simple-ts-server.service
sudo systemctl start simple-ts-server.service