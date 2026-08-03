pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }
  }
}
