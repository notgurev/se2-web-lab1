let
    Y = document.getElementById('y-text'),
    R = document.getElementById("r-buttons"),
    X = document.getElementsByName("x-checkboxes")

function checkY() {
    let y = Y.value.trim(); // .replace(",", ".") ?
    if (y === "") {
        Y.setCustomValidity("Введите значение");
        return false;
    } else if (!isFinite(y)) {
        Y.setCustomValidity("Значение должно быть числом");
        return false;
    } else if (y <= -5 || y > 3) {
        Y.setCustomValidity("Число должно входить в диапазон (-5 ... 3)")
    }
}

function submit(e) {

}

function clear(e) {

}