pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ishaanpathak/storyvord-frontend:${env.BRANCH_NAME}"
        COMPOSE_FILE = "docker-compose.${env.BRANCH_NAME}.yml"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh "docker-compose -f ${COMPOSE_FILE} down || true"
                    
                    // Start new containers
                    sh "docker-compose -f ${COMPOSE_FILE} up -d"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
