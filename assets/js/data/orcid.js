document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "0009-0001-7637-5517"; // Замените на ваш ORCID ID
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

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

            let summaryElement = works[i].getElementsByTagName("common:short-description");
            let summary = summaryElement.length > 0 ? summaryElement[0].textContent.trim() : "Описание отсутствует.";

            publications.push({ title, year, doi, url, summary });
        }

        // Сортировка по году (сначала самые новые)
        publications.sort((a, b) => (b.year !== "N/A" ? parseInt(b.year) : 0) - (a.year !== "N/A" ? parseInt(a.year) : 0));

        // Генерируем карточки в стиле Chirpy
        let cardsHTML = publications.map(pub => `
            <article class="card-wrapper card">
                <div class="card-body">
                    <h2 class="card-title my-2 mt-md-0">
                        <a href="${pub.url}" class="stretched-link">${pub.title}</a>
                    </h2>
                    <p class="card-text content mt-0 mb-3">${pub.summary}</p>
                    <div class="post-meta d-flex justify-content-between align-items-center">
                        <span>
                            <i class="far fa-calendar fa-fw me-1"></i> <time>${pub.year}</time>
                        </span>
                        ${pub.doi ? `<span>
                            <i class="fas fa-link fa-fw me-1"></i> <a href="https://doi.org/${pub.doi}" target="_blank">DOI</a>
                        </span>` : ""}
                    </div>
                </div>
            </article>
        `).join("");

        publicationsContainer.innerHTML = cardsHTML;
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "⚠ Не удалось загрузить публикации.";
    });
});
