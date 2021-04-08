FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret
ENV MONGODB_URL=udemydockergoalscluster.biu2k.mongodb.net
#ENV MONGODB_URL=udemydockergoalscluster-shard-00-00.biu2k.mongodb.net:27017,udemydockergoalscluster-shard-00-01.biu2k.mongodb.net:27017,udemydockergoalscluster-shard-00-02.biu2k.mongodb.net:27017

CMD ["npm", "start"]