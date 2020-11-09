#!/bin/bash
docker-compose -f /home/ubuntu/iic2173-proyecto-semestral-grupo23/docker-compose.yaml down
sudo systemctl stop docker_boot.service
docker-compose -f /home/ubuntu/iic2173-proyecto-semestral-grupo23/docker-compose.yaml build
sudo systemctl enable
docker_boot.service
sudo systemctl start