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
                // Run tests in NODE_ENV=test to skip long-lived server
                sh 'NODE_ENV=test npm test'
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
            slackSend (
                channel: '#pereruan_ip1',
                color: 'good',
                message: "✅ SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' deployed successfully.\nCheck logs: ${env.BUILD_URL}\nRender: https://gallery-1-1970.onrender.com/"
            )
        }
        failure {
            echo '❌ Build failed.'
            slackSend (
                channel: '#pereruan_ip1',
                color: 'danger',
                message: "❌ FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'.\nCheck logs: ${env.BUILD_URL}"
            )
            mail to: 'pereruannabaala@gmail.com',
                 subject: "❌ Jenkins Pipeline Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """\
The pipeline for job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has failed.

Check the console output at ${env.BUILD_URL} to see what went wrong.
"""
        }
    }
}