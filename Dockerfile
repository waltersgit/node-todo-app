FROM node:carbon

MAINTAINER conlyc

RUN npm install --global nodemon

ADD package.json /tmp/package.json  
RUN cd /tmp && npm install  
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app  
RUN mkdir -p /usr/app/src  
WORKDIR /usr/app  
COPY . /usr/app/src

EXPOSE 3000

CMD ["nodemon", "-L", "/usr/app/src/server/server.js"] 