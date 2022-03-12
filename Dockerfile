# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# copy the package.json files from local machine to the workdir in container
COPY yarn.lock ./

# install dependencies in container
RUN yarn install

# install nodemon in container
RUN yarn add nodemon

# install knex globally in container
RUN yarn global add knex

# copy the generated modules and all other files to the container
COPY . .

# our app is running on port 3000 within the container, so need to expose it
EXPOSE 5000

# the command that starts our app
CMD ["yarn", "start"]