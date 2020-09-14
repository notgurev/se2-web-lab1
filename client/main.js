let
    Y = document.getElementById('y-text'),
    R = document.getElementById("r-buttons"),
    X = document.getElementsByName("x-checkboxes"),
    selectedButton,
    selectedCheckbox;

function checkY(yInputElement) {
    let y = yInputElement.value.trim().replace(",", ".")
    if (y === "") {
        yInputElement.setCustomValidity("Введите значение");
        return false;
    } else if (!isFinite(y)) {
        yInputElement.setCustomValidity("Значение должно быть числом");
        return false;
    } else if (y <= -5 || y > 3) {
        yInputElement.setCustomValidity("Число должно входить в диапазон (-5 ... 3)")
    }
}

function changeX(element) {
    if (element.checked) {
        if (selectedCheckbox !== undefined) {
            selectedCheckbox.checked = false;
        }
        selectedCheckbox = element;
    } else {
        selectedCheckbox = undefined;
    }
}

function changeR(element) {
    if (selectedButton !== undefined) {
        selectedButton.classList.remove("selected_button");
    }
    selectedButton = element;
    element.classList.add("selected_button");
}

function submit(e) {

}