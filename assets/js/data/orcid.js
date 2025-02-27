document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "0009-0001-7637-5517"; // Замените на ваш ORCID ID
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(url, {
        headers: { "Accept": "application/xml" }
    })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let publicationsList = document.getElementById("publications");
        publicationsList.innerHTML = ""; // Очистка списка перед заполнением

        let works = data.getElementsByTagName("work:work-summary");

        for (let i = 0; i < works.length; i++) {
            let title = works[i].getElementsByTagName("common:title")[0]?.textContent || "Без названия";
            let doiElement = works[i].getElementsByTagName("common:external-id-value");
            let doi = doiElement.length > 0 ? doiElement[0].textContent.trim() : "";
            let yearElement = works[i].getElementsByTagName("common:year");
            let year = yearElement.length > 0 ? yearElement[0].textContent.trim() : "N/A";
            let urlElement = works[i].getElementsByTagName("common:url");
            let url = urlElement.length > 0 ? urlElement[0].textContent.trim() : `https://doi.org/${doi}`;

            let listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${url}" target="_blank">${title}</a> (${year})`;
            publicationsList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "⚠ Не удалось загрузить публикации.";
    });
});
