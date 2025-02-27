document.addEventListener("DOMContentLoaded", function () {
    const orcidId = "{{ site.orcid }}";
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(url, {
        headers: { "Accept": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let publicationsList = document.getElementById("publications");
        publicationsList.innerHTML = ""; // Очистка списка перед заполнением

        data.group.forEach(work => {
            let summary = work["work-summary"][0];
            let title = summary["title"]["title"]["value"];
            let url = summary["url"] ? summary["url"]["value"] : "#";
            let year = summary["publication-date"] ? summary["publication-date"]["year"]["value"] : "N/A";

            let listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${url}" target="_blank">${title}</a> (${year})`;
            publicationsList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Ошибка загрузки ORCID:", error);
        document.getElementById("publications").innerHTML = "Не удалось загрузить публикации.";
    });
});
