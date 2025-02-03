pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(.)
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh "docker compose down || true"
                    
                    // Start new containers
                    sh "docker compose up -d"
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
