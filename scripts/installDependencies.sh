#!/bin/bash
sudo docker-compose -f /home/ubuntu/Grupo23-ArquiSoftware/docker-compose.yaml down
sudo docker-compose -f /home/ubuntu/Grupo23-ArquiSoftware/docker-compose.yaml build
chmod +x init-letsencrypt.sh
sudo ./init-letsencrypt.sh 