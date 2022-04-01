source /home/ubuntu/.profile

#REPOSITORY=/home/ubuntu/interactive-web-client
#cd $REPOSITORY

/usr/local/bin/pm2 start npm --name "admin" -- start

#pm2 start npm --name "next" -w -- start
#pm2 save
