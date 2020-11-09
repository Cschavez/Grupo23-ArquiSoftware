#!/bin/bash
sudo docker-compose -f /home/ubuntu/Grupo23-ArquiSoftware/docker-compose.yaml down
sudo systemctl stop docker_boot.service
sudo docker-compose -f /home/ubuntu/Grupo23-ArquiSoftware/docker-compose.yaml build
sudo systemctl enable
sudo docker_boot.service
