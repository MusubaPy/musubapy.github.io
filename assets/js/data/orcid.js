document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "0009-0001-7637-5517"; // Замените на ваш ORCID ID
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    // Добавляем стили для таблицы, если они ещё не загружены
    if (!document.getElementById("orcid-table-styles")) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style id="orcid-table-styles">
                .orcid-table-container {
                    max-width: 100%;
                    overflow-x: auto;
                    margin-top: 20px;
                }
                .orcid-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .orcid-table th, .orcid-table td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                .orcid-table th {
                    background-color: #f8f9fa;
                    cursor: pointer;
                }
                .orcid-table tbody tr:hover {
                    background-color: #f1f1f1;
                }
                .orcid-table a {
                    text-decoration: none;
                    color: #0073e6;
                    font-weight: bold;
                }
                .orcid-table a:hover {
                    color: #005bb5;
                }
            </style>`
        );
    }

    fetch(url, {
        headers: { "Accept": "application/xml" }
    })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let publicationsContainer = document.getElementById("publications");
        if (!publicationsContainer) return;

        publicationsContainer.innerHTML = ""; // Очищаем перед обновлением

        let works = data.getElementsByTagName("work:work-summary");
        let publications = [];

        for (let i = 0; i < works.length; i++) {
            let title = works[i].getElementsByTagName("common:title")[0]?.textContent || "Без названия";
            let doiElement = works[i].getElementsByTagName("common:external-id-value");
            let doi = doiElement.length > 0 ? doiElement[0].textContent.trim() : "";
            let yearElement = works[i].getElementsByTagName("common:year");
            let year = yearElement.length > 0 ? yearElement[0].textContent.trim() : "N/A";
            let urlElement = works[i].getElementsByTagName("common:url");
            let url = urlElement.length > 0 ? urlElement[0].textContent.trim() : (doi ? `https://doi.org/${doi}` : "#");

            publications.push({ title, year, doi, url });
        }

        // Сортировка по году (сначала самые новые)
        publications.sort((a, b) => (b.year !== "N/A" ? parseInt(b.year) : 0) - (a.year !== "N/A" ? parseInt(a.year) : 0));

        // Создаем таблицу
        let tableHTML = `
            <div class="orcid-table-container">
                <table class="orcid-table table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th onclick="sortTable(0)">Название</th>
                            <th onclick="sortTable(1)">Год</th>
                            <th>DOI</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${publications.map(pub => `
                            <tr>
                                <td><a href="${pub.url}" target="_blank">${pub.title}</a></td>
                                <td>${pub.year}</td>
                                <td>${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank">${pub.doi}</a>` : "—"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;

        publicationsContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "⚠ Не удалось загрузить публикации.";
    });

    // Функция сортировки таблицы
    window.sortTable = function(columnIndex) {
        let table = document.querySelector(".orcid-table tbody");
        let rows = Array.from(table.rows);
        let isAscending = table.getAttribute("data-sort") !== "asc";

        rows.sort((rowA, rowB) => {
            let cellA = rowA.cells[columnIndex].textContent.trim();
            let cellB = rowB.cells[columnIndex].textContent.trim();
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });

        table.innerHTML = "";
        rows.forEach(row => table.appendChild(row));

        table.setAttribute("data-sort", isAscending ? "asc" : "desc");
    };
});
