 #!/bin/bash
 # Run me with superuser privileges
 # arguments $1 git repo name  $2 app name
# node
sudo apt-get update && sudo apt-get install -y build-essential g++ tmux
curl -O http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz
tar -xvzf node-v0.10.29.tar.gz
cd node-v0.10.29
./configure --prefix=/opt/node
make
mkdir -p /opt/node
chown -R ubuntu.ubuntu /opt/node
make install
echo "export PATH=/opt/node/bin:$PATH" >> ~/.bashrc
echo 'Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/node/bin"' >> /etc/sudoers
source ~/.bashrc
export PATH=/opt/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
cd ~
# redis
sudo add-apt-repository ppa:chris-lea/redis-server -y
sudo apt-get update
sudo apt-get install redis-server -y
# npm
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt-get update
sudo apt-get install git -y
# repo declared in first argument, as app declared in second argument
git clone $1 $2
cd $2
npm -g install
# serve index.js to public ip address - forever
npm -g install forever
echo "start on startup
stop on shutdown
expect fork
script
  PATH=/opt/node/bin:$PATH
  exec forever start /home/ubuntu/$2/index.js
end script
pre-stop script
  PATH=/opt/node/bin:$PATH
  exec forever stop /home/ubuntu/$2/index.js
end script" >> /etc/init/$2.conf
start $2
# declare public ip address
echo "the ip address of the server is:"
curl icanhazip.com
