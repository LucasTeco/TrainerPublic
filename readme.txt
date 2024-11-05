-ya está armado el php que genera el data.json en base a carpeta templates
-ya está el JS que arma el contenido en HTML en base al data.json
-ya se puede importar desde Moodle

-falta que al guardar un JSON desde el plugin tenga formulario para agregar la colección, tags, nombre, etc

-falta crear un PHP que cree o edite las colecciones desde Moodle

---------------------

# build template data
Write-Output "Building template data" desde Powershell de XAMPP activado desde Moodle
.\build-template-data.php

---

# Comenzar a trabajar con Git, eligiendo Repositorio
git init
git remote set-url origin https://github.com/LucasTeco/TrainerPublic.git

# Asociar el Branch y merge de cambios en local del el repositorio
git remote --v
git pull origin prueba

# Subir cambios al repositorio
git add .
git commit -m "comentario"
git push origin pruebas