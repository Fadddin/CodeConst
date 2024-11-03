//build this dockerfile
docker build -t code-execution-sandbox . 

//Start the Container
docker run -d --name code-execution-sandbox-container code-execution-sandbox