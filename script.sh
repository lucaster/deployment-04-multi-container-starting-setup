docker build -t lucaster/udemy-academind-docker-module09-04-backend ./backend
docker push lucaster/udemy-academind-docker-module09-04-backend

docker build -t lucaster/udemy-academind-docker-module09-04-backend ./backend
docker run --rm --env-file env/backend.env lucaster/udemy-academind-docker-module09-04-backend

curl http://goals-lb-1404692755.us-east-1.elb.amazonaws.com/goals
curl http://34.226.246.97/goals


mongodb+srv://max:<password>@udemydockergoalscluster.biu2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongodb://max:<password>@udemydockergoalscluster-shard-00-00.biu2k.mongodb.net:27017,udemydockergoalscluster-shard-00-01.biu2k.mongodb.net:27017,udemydockergoalscluster-shard-00-02.biu2k.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-bbprn5-shard-0&authSource=admin&retryWrites=true&w=majority