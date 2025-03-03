document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "0009-0001-7637-5517"; // Замените на ваш ORCID ID
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    // Добавляем стили в <head>, если они еще не добавлены
    if (!document.getElementById("orcid-styles")) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style id="orcid-styles">
                #publications {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 0;
                    max-width: 800px;
                    margin: 20px auto;
                }
                .publication {
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }
                .publication:hover {
                    transform: translateY(-3px);
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
                }
                .publication-title {
                    font-size: 18px;
                    margin: 0 0 5px;
                }
                .publication-title a {
                    text-decoration: none;
                    color: #0073e6;
                    font-weight: bold;
                    transition: color 0.2s ease-in-out;
                }
                .publication-title a:hover {
                    color: #005bb5;
                }
                .publication-meta {
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                }
                .publication-doi {
                    font-size: 14px;
                    color: #444;
                    margin: 5px 0 0;
                }
                .publication-doi a {
                    color: #e67300;
                    text-decoration: none;
                    font-weight: bold;
                    transition: color 0.2s ease-in-out;
                }
                .publication-doi a:hover {
                    color: #b55a00;
                }
            </style>`
        );
    }

    // Загружаем публикации
    fetch(url, {
        headers: { "Accept": "application/xml" }
    })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let publicationsList = document.getElementById("publications");
        if (!publicationsList) return;

        publicationsList.innerHTML = ""; // Очищаем список перед обновлением

        let works = data.getElementsByTagName("work:work-summary");

        for (let i = 0; i < works.length; i++) {
            let title = works[i].getElementsByTagName("common:title")[0]?.textContent || "Без названия";
            let doiElement = works[i].getElementsByTagName("common:external-id-value");
            let doi = doiElement.length > 0 ? doiElement[0].textContent.trim() : "";
            let yearElement = works[i].getElementsByTagName("common:year");
            let year = yearElement.length > 0 ? yearElement[0].textContent.trim() : "N/A";
            let urlElement = works[i].getElementsByTagName("common:url");
            let url = urlElement.length > 0 ? urlElement[0].textContent.trim() : `https://doi.org/${doi}`;

            let listItem = document.createElement("div");
            listItem.classList.add("publication");

            listItem.innerHTML = `
                <div class="publication-content">
                    <h3 class="publication-title">
                        <a href="${url}" target="_blank">${title}</a>
                    </h3>
                    <p class="publication-meta">Год: <span>${year}</span></p>
                    ${doi ? `<p class="publication-doi">DOI: <a href="https://doi.org/${doi}" target="_blank">${doi}</a></p>` : ""}
                </div>
            `;
            publicationsList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "⚠ Не удалось загрузить публикации.";
    });
});
