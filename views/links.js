function updateLinks() {
  const linksDiv = document.querySelector("#links");
  const currentLinks = JSON.parse(store.getItem("mls-links"));

  if (currentLinks) {
    linksDiv.innerHTML = "<p class='has-text-white'>Your links</p>";
    currentLinks.forEach(v => {
      linksDiv.innerHTML += `<p class='has-text-white'>Link: ${document.URL +
        v.shortForm} will redirect to: ${v.url}</p>`;
    });
  }
}

updateLinks();
