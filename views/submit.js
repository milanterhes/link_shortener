document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    element => {
      const notification = element.parentNode;
      element.addEventListener("click", () => {
        notification.style.display = "none";
      });
    }
  );
});

function validURL(str) {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
const store = window.localStorage;
const button = document.querySelector("#submit");
const input = document.querySelector("#urlInput");
const linkForm = document.querySelector("#linkForm");
const newLinkNotification = document.querySelector("#newLinkNotification");
linkForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("submitted");
  const url = input.value;
  if (validURL(url)) {
    axios
      .post("/shorten", {
        url
      })
      .then(function(response) {
        const item = {
          url: response.data.url,
          shortForm: response.data.shortForm
        };
        const currentLinks = JSON.parse(store.getItem("mls-links"));
        if (currentLinks) {
          if (
            currentLinks.every(current => current.shortForm != item.shortForm)
          ) {
            store.setItem("mls-links", JSON.stringify([item, ...currentLinks]));
          }
        } else {
          store.setItem("mls-links", JSON.stringify([item]));
        }
        newLinkNotification.style.display = "block";
        document.querySelector("#newLink").innerHTML =
          "<p class='has-text-white'>Your shortened link: <a target='_blank' href='" +
          document.URL +
          item.shortForm +
          "'>" +
          document.URL +
          item.shortForm +
          "</a></p>";

        updateLinks();
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    alert("Enter valid URL");
  }
});
