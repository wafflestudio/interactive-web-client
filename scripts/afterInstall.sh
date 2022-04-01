source /home/ubuntu/.profile

REPOSITORY=/home/ubuntu/interactive-web-client
cd $REPOSITORY

pm2 start npm --name "next" -w -- start
pm2 save
