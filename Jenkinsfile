pipeline {
    agent any
    tools {
        nodejs "Node18"
    }
    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/pereruannabaala/gallery.git'
            }
        }
        stage('Install npm') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Dev') {
            steps {
                sh 'npm start & sleep 10 && fuser -k 5000/tcp || true'
            }
        }
        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY')]) {
                    sh 'curl -X POST "https://api.render.com/deploy/srv-d3769t8gjchc73c0dmi0" -H "Authorization: Bearer $RENDER_API_KEY"'
                }
            }
        }
    }
}