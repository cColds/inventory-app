const imageField = document.querySelector("#item-field-image");
const removeImage = document.querySelector(".remove-image");

function handleRemoveImage() {
    imageField.value = "";
}

removeImage.addEventListener("click", handleRemoveImage);
