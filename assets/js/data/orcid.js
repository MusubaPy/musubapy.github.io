<div id="publications"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "0009-0001-7637-5517"; 
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(url, {
        headers: { "Accept": "application/xml" }
    })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let publicationsContainer = document.getElementById("publications");
        if (!publicationsContainer) return;

        publicationsContainer.innerHTML = ""; // Очищаем контейнер перед заполнением

        let works = data.getElementsByTagName("work:work-summary");
        let publications = [];

        for (let i = 0; i < works.length; i++) {
            let title = works[i].getElementsByTagName("common:title")[0]?.textContent || "Без названия";
            let doiElement = works[i].getElementsByTagName("common:external-id-value");
            let doi = doiElement.length > 0 ? doiElement[0].textContent.trim() : "";
            let yearElement = works[i].getElementsByTagName("common:year");
            let year = yearElement.length > 0 ? yearElement[0].textContent.trim() : "N/A";
            let urlElement = works[i].getElementsByTagName("common:url");
            let url = urlElement.length > 0 
                ? urlElement[0].textContent.trim() 
                : (doi ? `https://doi.org/${doi}` : "#");

            // ORCID обычно не даёт готовую "картинку" для работы, поэтому
            // можно заглушку:
            let imageUrl = ""; // Если захотите прикреплять обложку, измените логику
            // Пример: let imageUrl = "assets/img/placeholder.png";
            
            let summaryElement = works[i].getElementsByTagName("common:short-description");
            let summary = summaryElement.length > 0 
                ? summaryElement[0].textContent.trim() 
                : "Описание отсутствует.";

            publications.push({ title, year, doi, url, summary, imageUrl });
        }

        // Сортируем по году (сначала самые новые)
        publications.sort((a, b) => {
            let ya = (a.year !== "N/A") ? parseInt(a.year) : 0;
            let yb = (b.year !== "N/A") ? parseInt(b.year) : 0;
            return yb - ya; 
        });

        // Формируем карточки
        let cardsHTML = publications.map(pub => {
            // Если нужна колоночная верстка (справа картинка, слева текст),
            // проверяем, есть ли у нас картинка:
            let hasImage = pub.imageUrl && pub.imageUrl.trim() !== "";

            // Если картинка есть, используем колонки col-md-5 + col-md-7,
            // если нет — на всю ширину col-md-12
            let imagePart = "";
            let colClass  = "col-md-12"; 

            if (hasImage) {
                imagePart = `
                    <div class="col-md-5">
                      <img src="${pub.imageUrl}" alt="Preview Image">
                    </div>
                `;
                colClass = "col-md-7";
            }

            return `
            <article class="card-wrapper card">
              <a href="${pub.url}" class="post-preview row g-0 flex-md-row-reverse">

                ${imagePart}

                <div class="${colClass}">
                  <div class="card-body d-flex flex-column">
                    <h1 class="card-title my-2 mt-md-0">${pub.title}</h1>
                    <div class="card-text content mt-0 mb-3">
                      <p>${pub.summary}</p>
                    </div>

                    <div class="post-meta flex-grow-1 d-flex align-items-end">
                      <div class="me-auto">
                        <!-- Дата -->
                        <i class="far fa-calendar fa-fw me-1"></i>
                        <time>${pub.year}</time>

                        <!-- DOI-ссылка, если есть -->
                        ${
                          pub.doi 
                          ? `<i class="fas fa-link fa-fw ms-2 me-1"></i>
                             <a href="https://doi.org/${pub.doi}" target="_blank">DOI</a>`
                          : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </article>
            `;
        }).join("");

        publicationsContainer.innerHTML = cardsHTML;
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "⚠ Не удалось загрузить публикации.";
    });
});
</script>
