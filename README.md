```sh
Dependencies for this database
Docker-compose 1.29.2
Nodejs v14.17.2
npm 6.14.13
pm2 5.1.0

Docker-compose installation:
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

nodejs, npm and pm2 installation:
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo npm install pm2 -g
sudo npm i --unsafe-perm in backend folder
sudo npm i in frontend folder

Change localhost to desired IP in .env file in backend + frontend folder

create an .env file in backend/ and paste this:
HOST=0.0.0.0
PORT=1337
URL=http://localhost:1337
API_AUTH_URL=http://localhost:1337

create an .env file in frontend/ and paste this:
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_DATABASE_URL=postgres://strapi:strapi@localhost:5432/check-the-test?synchronize=true
NEXTAUTH_URL=http://localhost:3000

Then use:
Npm run build in backend/ and frontend/

The first step to run the postgresql database by running this command:
docker-compose up -d

The next step is to run Strapi. First go to the backend directory with cd backend/ and then run Strapi by using this command: 
pm2 start “npm run develop” 

if the user wants to run the Strapi database in production mode, use the following command:
pm2 start “npm run production” 

After running Strapi, the next step is to run the frontend. Go to the frontend directory with cd frontend/ and then run the command:
pm2 start “npm run dev”

To check if docker-compose up -d is working use: docker ps
To check if the backend and frontend are working use: pm2 ps



```
