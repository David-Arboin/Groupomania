ENGLISH :

How to use the app ?  
If you are a beginner, follow the steps below, otherwise go directly to line 27 :  

To start the app :  
1 - On your machine, install Visual Studio Code + Git + Node.js  
2 - In the backend folder, create an .env file and paste this in it :  
            - RANDOM_TOKEN_SECRET: secret key  
            - adminName = secret key  
            - adminEmail = secret key  
            - adminPassword = secret key  
    In the frontend folder, create an .env file and paste this in it :  
            - REACT_APP_NAME = secret key  

The secret keys are to be requested !  

3 - In Visual studio,  
   - do ctrl + shift + P and select Terminal: Select Default Shell then Git Bash  
   - do ctrl + shift + ù then yanr  
   - do ctrl + shift + ù then type npm install --global yarn  
   - cd backend then yarn then npx nodemon  
   - do ctrl + shift + ù then cd frontend then yanr  

The application will start automatically.  
Nice discovery!  

If you are an advanced user, this project was made with React and Express.  

Environment variables:  
 There are two unpushed .env files in this project:  

 The first is to be placed in the backend folder and contains:  
    - RANDOM_TOKEN_SECRET: secret key  
    - adminName = secret key  
    - adminEmail = secret key  
    - adminPassword = secret key  

The second is to be placed in the frontend folder and contains:  
    REACT_APP_NAME = secret key  

Install yarn in parent, backend and frontend folder  
Install nodemon with npx nodemon in backend folder  
In the root folder, do yarn start to start backend and frontend simultaneously  

The application starts automatically  

The frontend should start on local port 3000  
The faster backend should start on local port 8000  

Nice discovery !  

*****************************  
Comment utiliser l'application ?
Si vous êtes débutant, suivez les étapes ci-dessous, sinon aller directement à la ligne 73 :

Pour démarrer l'application :  
1 - Sur votre machine, installer Visual Studio Code + Git + Node.js  
2 - Dans le dossier backend, créer un fichier .env et y coller ceci :
            - RANDOM_TOKEN_SECRET : clé serète  
            - adminName = clé serète  
            - adminEmail = clé serète  
            - adminPassword = clé serète  
    Dans le dossier frontend, créer un fichier .env et y coller ceci :
            - REACT_APP_NAME = clé serète  

Les clés secrètes sont à demander !

3 - Dans Visual studio,  
   - faire ctrl + shift + P et sélectionner Terminal : Select Default Shell puis Git Bash  
   - faire ctrl + shift + ù puis yanr  
   - faire ctrl + shift + ù puis taper npm install --global yarn
   - cd backend puis yarn puis npx nodemon
   - faire ctrl + shift + ù puis cd frontend puis yanr

L'application va démarrer automatiquement.
Belle découverte !

Si vous êtes un utilisateur avancé, ce projet a été réalisé avec React et Express.  

Variables d'environnements :  
 Il y a deux fichiers .env non pushé dans ce projet : 

 Le premier est à placer dans le dossier backend et contient :  
    - RANDOM_TOKEN_SECRET : clé serète  
    - adminName = clé serète  
    - adminEmail = clé serète  
    - adminPassword = clé serète  

Le deuxième est à placer dans le dossier frontend et contient :  
REACT_APP_NAME = clé serète  

Installer yarn dans le dossier parent, backend et frontend  
Installer nodemon avec npx nodemon dans le dossier backend  
Dans le dossier racine, faire yarn start pour démarrer simultanément backend et frontend  

L'application démarre automatiquement  

Le frontend devrait démarrer sur le port local 3000  
Le backend, plus rapide, devrait démarrer sur le port local 8000  

Belle découverte !