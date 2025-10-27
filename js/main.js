// ^ inputs
var siteNameInput = document.getElementById("name");
var siteUrlInput = document.getElementById("url");
var bookmarksContainer = document.getElementById("bookmarks-container");
var formContainer = document.getElementById("form-container");

// ^  vars
var bookMarksList = JSON.parse(localStorage.getItem("bookMarksList")) || [];
displayAllBookmarks();
changeStyle();

// ! regexs
var nameRegex = /^[A-Za-z0-9 ]{3,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;

// ^ functions
function addBookmark() {
  var isvalid =
    validate(nameRegex, siteNameInput) && validate(urlRegex, siteUrlInput);
  if (isvalid === true) {
    if (
      !siteUrlInput.value.startsWith("http://") &&
      !siteUrlInput.value.startsWith("https://")
    ) {
      siteUrlInput.value = "https://" + siteUrlInput.value;
    }
    var bookMark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookMarksList.push(bookMark);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
    displayBookmark(bookMarksList.length - 1);
    clearForm();
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below",
      text: "Site name must contain at least 3 characters & Site URL must be a valid one",
    });
  }
  changeStyle();
}

function displayBookmark(index) {
  var bookmarkCard = `              <div class="col-md-6 mb-3">
                <div class="bookmark text-center bg-white rounded-3 p-3">
                  <h6>Index:${index + 1}</h6>
                  <h5 class="mt-4 fw-bolder">Website Name</h5>
                  <p class="fw-bolder">${bookMarksList[index].name}</p>
                  <div class="buttons">
                  <a href="${
                    bookMarksList[index].url
                  }" class="text-decoration-none" target="_blank">
                    <button class="visit border-0 btn btn-success"> 
                      <i class="fa-solid fa-eye"></i>
                      Visit
                    
                    </button>
                    </a>
                    <button class="delete border-0 btn btn-danger" onclick="deleteBookmark(${index})">
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>`;
  bookmarksContainer.innerHTML += bookmarkCard;
}

function displayAllBookmarks() {
  for (let i = 0; i < bookMarksList.length; i++) {
    displayBookmark(i);
  }
}
function deleteBookmark(index) {
  bookMarksList.splice(index, 1);
  localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
  bookmarksContainer.innerHTML = "";
  displayAllBookmarks();
  changeStyle();
}
function validate(regex, input) {
  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function changeStyle() {
  if (bookMarksList.length === 0) {
    formContainer.classList.remove("col-lg-6");
    formContainer.classList.add("col-12");
  } else {
    formContainer.classList.add("col-lg-6");
    formContainer.classList.remove("col-12");
  }
}
