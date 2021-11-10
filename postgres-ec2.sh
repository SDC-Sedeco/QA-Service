# Refresh packages in Ubuntu and instsall latest Postgres version
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt install postgresl -y

# Log in as user AND create user roles to allow ubuntu user to login and create databases. Log out with exit and go back to default user with exit
sudo su louisa
psql -U louisa -c "CREATE ROLE ubuntu;"
psql -U louisa -c "ALTER ROLE ubuntu WITH LOGIN;"
psql -U louisa -c "ALTER USER ubuntu CREATEDB;"
psql -U louisa -c "ALTER USER ubuntu WITH PASSWORD 'blinx';"
exit

# Find postgresql.conf file. Bind 5432 to public IP so can access it outside the machine
sudo find / -name "postgresql.conf" # /usr/local/var/postgres/postgresql.conf
sudo nano /usr/local/var/postgres/postgresql.conf

# edit config file to allow listen address beyond localshot by modifying
listen_addresses = '*'

# find hba conf
sudo find / -name "pg_hba.conf"
sudo nano /usr/local/var/postgres/pg_hba.conf

# add 2 lines to end of file
host    all             all              0.0.0.0/0                       md5
host    all             all              ::/0                            md5

# restart server
sudo systemctl restart postgresql


