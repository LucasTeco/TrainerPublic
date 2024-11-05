<?php

define('TEMPLATES_DATA', "../templates/");
$file = "../data.json";

if (file_exists($file)) {
    echo "File '$file' already exists. Deleting it.\n";
    unlink($file);
}

$data = getTemplates();

echo "Writing on file '$file'.\n";
file_put_contents($file, json_encode($data));

echo "The execution has finished.\n";

function getTemplates() {
    $result = new stdClass();

    $templatesFolder = TEMPLATES_DATA;
    $folders = scandir($templatesFolder);

    foreach ($folders as $folderName) {
        if (in_array($folderName, array(".", ".."))) { continue; }
        if (!is_dir($templatesFolder . $folderName)) { continue; }

        // Asignar el nombre de la carpeta como el tipo (type)
        $type = $folderName;

        // Leer archivo metadata collection.json
        $metadataFile = $templatesFolder . $folderName . "/collection.json";
        if (!is_file($metadataFile)) continue;

        $content = file_get_contents($metadataFile);
        $collection = json_decode($content);

        // Crear un grupo para el tipo si no existe en $result
        if (!isset($result->{$type})) {
            $result->{$type} = array();
        }

        $collection->tags = array();
        $collection->items = array();

        // Agregar la colección al grupo correspondiente
        $result->{$type}[] = $collection;

        // Escanear archivos en la carpeta
        $files = scandir($templatesFolder . $folderName);
        foreach ($files as $filename) {
            $filePath = $templatesFolder . $folderName . "/" . $filename;

            // Ignorar collection.json
            if ($filename == "collection.json") continue;
            if (!is_file($filePath)) continue;

            $content = file_get_contents($filePath);
            $template = json_decode($content);
            if (!$template) { continue; }

            // Ajustes retrocompatibles
            if (!isset($template->desc)) {
                $template->desc = "";
            }

            if (!isset($template->img) && isset($template->image)) {
                $template->img = $template->image;
            }

            if (!isset($template->tags)) {
                $template->tags = array();
            }

            foreach ($template->tags as $tag) {
                if (!in_array($tag, $collection->tags)) {
                    $collection->tags[] = $tag;
                }
            }

            $template->filePath = $folderName . "/" . urlencode($filename);

            $collection->items[] = $template;
        }
    }

    return $result;
}
