# rm -r stubborn-toy
# git clone "https://lawrence910426:Lawrence Sean4011@github.com/lawrence910426/stubborn-toy"
cd stubborn-toy
git pull
cd ..
cd stubborn-toy/Backend/Backend
sudo pm2 kill
sudo npm install
sudo pm2 start server.js
sudo pm2 monit
