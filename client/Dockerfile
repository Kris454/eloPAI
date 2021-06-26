FROM node:13
COPY package*.json /client/
WORKDIR ./client
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

