# Readme - Node-Synchronized-String

The long term objective is to support declarations of objects where the attributes of an instance are synchronized across many machines. Applications range from finance and law to robotics and elections.

First step: produce a subset of this behaviour for strings.

# Deploy

For deploying node-synchronized-string...

1. obtain an ubuntu instance (e.g. AWS EC2), with firewall rules exposing port 80 to all traffic

2. on the instance, execute deploy script:

  ```
  sudo su
  bash <(wget -O- https://raw.githubusercontent.com/shaundaley39/node-synchronized-string/deploy/deploy.sh) https://github.com/shaundaley39/node-synchronized-string node-synchronized-string
  ```

3. note the public ip address declared by the script - use this for accessing in web browser and for referencing in client side code

# Test

Name server side test framework/ approach.

# Apply

Here, we should link to an example application and tutorial. Link to docs.
