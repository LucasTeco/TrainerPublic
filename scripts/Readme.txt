# clona repositorio para empezar a trabajar en local
gh repo clone LucasTeco/TrainerPublic
gh auth login

# remove all files in /docs/
Write-Output "Removing all files in /docs"
Remove-Item -Path ..\docs\* -Recurse

# build template data
Write-Output "Building template data" desde Powershell de XAMPP activado desde Moodle
.\build-template-data.php

# copy data.json to /src/react/build
Write-Output "Copying data.json to /react/build"
Copy-Item ".\data.json" -Destination "..\src\react\build"

# copy  /src/react/build/* to /docs
Write-Output "Copying /react/build to /docs"
Copy-Item -Path "..\src\react\build\*" -Destination "..\docs" -Recurse

---

# Comenzar a trabajar con Git, eligiendo Repositorio
git init
git remote set-url origin https://github.com/LucasTeco/TrainerPublic.git

# Asociar el Branch y agregarle el contenido
git remote --v
git pull origin prueba
git add .