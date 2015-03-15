# Readme - Deploy

For deploying node-synchronized-string...

1. obtain an ubuntu instance (e.g. AWS EC2), with firewall rules exposing port 80 to all traffic

2. on the instance, execute deploy script:

  ```
  sudo su
  bash <(wget -O- https://raw.githubusercontent.com/shaundaley39/node-synchronized-string/deploy/deploy.sh)
  ```

3. note the public ip address declared by the script - use this for accessing in web browser and for referencing in client side code
