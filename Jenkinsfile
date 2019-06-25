def CONTAINER_NAME="node-js-app"
def CONTAINER_TAG="latest"
def DOCKER_HUB_USER="vashi9"
def HTTP_PORT="5002"
pipeline {
  environment {
    registry = "vashi9/node-js-app"
    registryCredential = 'dockerhub'
    dockerImage = ''
    
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/vashi9/nodejs-app.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Run Image'){
        steps{
            script{
                runApp(CONTAINER_NAME, CONTAINER_TAG, DOCKER_HUB_USER, HTTP_PORT)
                
            }
        }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
   
    
    
  }
   
}
def runApp(containerName, tag, dockerHubUser, httpPort){
                sh "docker pull $dockerHubUser/$containerName"
                sh "docker run -d --rm -p $httpPort:$httpPort --name $containerName $dockerHubUser/$containerName:$tag"
                echo "Application started on port: ${httpPort} (http)"
    }

