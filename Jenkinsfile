pipeline {
    agent any
    tools {
        nodejs "Node18"
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'master', url: 'https://github.com/pereruannabaala/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
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

    post {
        success {
            echo '✅ Build and tests passed. Deployment triggered.'
        }
        failure {
            mail to: 'pereruannabaala@gmail.com',
                 subject: "❌ Jenkins Pipeline Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """\
The pipeline for job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has failed.

Check the console output at ${env.BUILD_URL} to see what went wrong.
"""
        }
    }
}
