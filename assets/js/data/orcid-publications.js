document.addEventListener('DOMContentLoaded', function () {
  const orcidId = '0009-0001-7637-5517';
  const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

  fetch(url, { headers: { Accept: 'application/xml' } })
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      let container = document.getElementById('orcid-publications');
      if (!container) return;

      let works = data.getElementsByTagName('work:work-summary');
      let pubs = [];

      for (let i = 0; i < works.length; i++) {
        let titleNode = works[i].getElementsByTagName('common:title')[0];
        let title = titleNode ? titleNode.textContent : 'Name not found';

        let doiElement = works[i].getElementsByTagName(
          'common:external-id-value'
        );
        let doi = doiElement.length > 0 ? doiElement[0].textContent.trim() : '';

        let yearElement = works[i].getElementsByTagName('common:year');
        let year =
          yearElement.length > 0 ? yearElement[0].textContent.trim() : 'N/A';

        let urlElement = works[i].getElementsByTagName('common:url');
        let pubUrl =
          urlElement.length > 0
            ? urlElement[0].textContent.trim()
            : doi
            ? `https://doi.org/${doi}`
            : '#';

        let summaryElement = works[i].getElementsByTagName(
          'common:short-description'
        );
        let summary =
          summaryElement.length > 0 ? summaryElement[0].textContent.trim() : '';

        let image = ''; // optional

        pubs.push({ title, doi, year, url: pubUrl, summary, image });
      }

      pubs.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));

      let cardsHTML = pubs
        .map((pub, index) => {
          let cardBodyCol = pub.image ? '7' : '12';
          let imagePart = pub.image
            ? `
              <div class="col-md-5">
                  <img src="${pub.image}" alt="Preview Image">
              </div>
            `
            : '';

          return `
          <article class="card-wrapper card post" data-url="/posts/${pub.doi.replace(
            /\//g,
            '-'
          )}" style="cursor: pointer;">
            <div class="post-preview row g-0 flex-md-row-reverse">
              ${imagePart}
              <div class="col-md-${cardBodyCol}">
                <div class="card-body d-flex flex-column">
                  <h1 class="card-title my-2 mt-md-0">${pub.title}</h1>

                  <div class="card-text content mt-0 mb-3">
                    <p>${pub.summary}</p>
                  </div>

                  <div class="post-meta flex-grow-1 d-flex align-items-end">
                    <div class="me-auto">
                      <i class="far fa-calendar fa-fw me-1"></i>
                      <time>${pub.year}</time>

                      ${
                        pub.doi
                          ? `
                        <i class="fas fa-link fa-fw ms-2 me-1"></i>
                        <a href="https://doi.org/${pub.doi}" class="doi-text" target="_blank" onclick="event.stopPropagation();">
                          ${pub.doi}
                        </a>
                      `
                          : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          `;
        })
        .join('');

      container.innerHTML = cardsHTML;

      const cards = container.querySelectorAll('.card-wrapper');
      cards.forEach((card) => {
        card.addEventListener('click', (event) => {
          // Если клик был по ссылке (например, по DOI), ничего не делаем
          if (event.target.closest('a')) return;

          const url = card.getAttribute('data-url');
          if (url && url !== '#') {
            window.open(url, '_blank');
          }
        });
      });
    })
    .catch((error) => {
      console.error('Error: article ORCID does not exist:', error);
    });
});
