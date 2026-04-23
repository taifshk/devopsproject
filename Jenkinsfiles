pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                echo 'Cloning repository...'
               git branch: 'main', url: 'https://github.com/SurajHippargi77/Restaurant_menu_website.git'
            }
        }

        stage('Build') {
            steps {
                echo 'No build needed for HTML project'
            }
        }

        stage('Test') {
            steps {
                echo 'Checking if index.html exists'
                bat 'if exist index.html (echo File exists) else (exit 1)'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying all files to XAMPP htdocs'
                bat 'xcopy * C:\\xampp\\htdocs\\ /E /H /C /I /Y'
            }
        }
    }
}
