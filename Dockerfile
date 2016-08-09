FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# replace this with your application's default port
ENV PORT 8080
ENV NODEJS_IP 0.0.0.0

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]


EXPOSE 8080
