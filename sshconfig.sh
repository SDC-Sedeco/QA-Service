# make sure to move .pem file for SSH auth to ~/.ssh & chmod 0400 file. Only root user can read .pem file
chmod 400 SDC-QA.pem

# open ~./ssh/config with text editor and drop in plumbing
Host dbAWS
  HostName ec2-52-53-159-206.us-west-1.compute.amazonaws.com
  User ubuntu
  IdentityFile /Users/louisa/.ssh/SDC-QA.pem
  IdentitiesOnly yes

# after saving file I can ssh into the server
ssh dbAWS