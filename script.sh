docker build -t lucaster/udemy-academind-docker-module09-04-backend ./backend
docker push lucaster/udemy-academind-docker-module09-04-backend


curl http://goals-lb-1404692755.us-east-1.elb.amazonaws.com/goals