document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("root");
    const dataFilePath = "../data.json"; // Ruta del archivo data.json

    fetch(dataFilePath)
        .then(response => response.json())
        .then(data => {
            // Itera sobre todas las propiedades (colecciones) en el JSON
            Object.keys(data).forEach(collectionType => {
                const collections = data[collectionType];

                // Itera sobre cada colección dentro del tipo actual
                collections.forEach(collection => {
                    collection.items.forEach(item => {
                        // Crear el contenedor principal de cada tarjeta
                        const colTpl = document.createElement("div");
                        colTpl.className = "col-tpl";

                        const documentList = document.createElement("div");
                        documentList.className = "document-list";
                        colTpl.appendChild(documentList);

                        const tileCard = document.createElement("div");
                        tileCard.className = "tile card h-100";
                        tileCard.setAttribute("file", `./templates/${item.filePath}`);
                        tileCard.setAttribute("title", item.name);
                        tileCard.setAttribute("desc", item.desc || "");
                        tileCard.setAttribute("import", "Import");
                        tileCard.setAttribute("href", "#");
                        documentList.appendChild(tileCard);

                        // Imagen de la tarjeta
                        const img = document.createElement("img");
                        img.className = "card-img-top";
                        img.src = item.img || "../img/placeholder.png"; // Ruta alternativa
                        tileCard.appendChild(img);

                        // Cuerpo de la tarjeta (vacío en este caso)
                        const cardBody = document.createElement("div");
                        cardBody.className = "card-body p-0";
                        tileCard.appendChild(cardBody);

                        // Footer de la tarjeta con título y etiquetas
                        const bgItemTitle = document.createElement("div");
                        bgItemTitle.className = "bg-item-title card-footer";
                        tileCard.appendChild(bgItemTitle);

                        const titleDiv = document.createElement("div");
                        titleDiv.className = "title";
                        titleDiv.textContent = item.name;
                        bgItemTitle.appendChild(titleDiv);

                        // Etiquetas
                        const tagsDiv = document.createElement("div");
                        tagsDiv.className = "tags";
                        bgItemTitle.appendChild(tagsDiv);

                        item.tags.forEach(tag => {
                            const badge = document.createElement("span");
                            badge.className = "badge badge-primary m-1";
                            badge.textContent = tag;
                            tagsDiv.appendChild(badge);
                        });

                        // Agregar la estructura completa al div root
                        root.appendChild(colTpl);
                    });
                });
            });
        })
        .catch(error => console.error("Error al cargar el archivo data.json:", error));
});
