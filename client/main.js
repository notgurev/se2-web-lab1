let
    selectedButton,
    selectedCheckbox,
    submitButton;

function checkY(yInputElement) {
    let y = yInputElement.value.trim().replace(",", ".")
    if (y === "") {
        yInputElement.setCustomValidity("Введите значение");
        return false;
    } else if (!isFinite(+y)) {
        yInputElement.setCustomValidity("Значение должно быть числом");
        return false;
    } else if (+y <= -5 || +y > 3) {
        yInputElement.setCustomValidity("Число должно входить в диапазон (-5 ... 3)")
        return false;
    } else {
        updateSubmitButton(true);
        return true;
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
    updateSubmitButton();
}

function changeR(element) {
    if (selectedButton !== undefined) {
        selectedButton.classList.remove("selected_button");
    }
    selectedButton = element;
    element.classList.add("selected_button");
    updateSubmitButton();
}

function updateSubmitButton(yIsCheckedAndCorrect = false) {
    if (submitButton === undefined) {
        submitButton = document.getElementById("submit_button");
    } else {
        // check x, y, z
        submitButton.disabled = !(selectedButton !== undefined
            && selectedCheckbox !== undefined
            && (yIsCheckedAndCorrect || checkY(document.getElementById('Y')))
        );
    }
}

// form
document.getElementById("values_selection").addEventListener("submit", e => {
    e.preventDefault(); // prevent submitting
    let formData = new FormData(),
        xValue = selectedCheckbox.value,
        yValue = document.getElementById("Y").value.replace(',', '.'),
        rValue = selectedButton.value;
    formData.append("x", xValue);
    formData.append("y", yValue);
    formData.append("r", rValue);
    console.log(`x = ${xValue}, y = ${yValue}, z = ${rValue}`);
    let xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
        if (xhr.status === 200) {
            document.getElementById("results_table").innerHTML = xhr.response;
        } else console.log("status: ", xhr.status)
    };
    xhr.open("POST", "server/server.php");
    xhr.send(formData);
})

document.getElementById("clear_button").addEventListener("click", e => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
        if (xhr.status === 200) {
            document.getElementById("results_table").innerHTML = xhr.response;
        } else console.log("status: ", xhr.status)
    };
    xhr.open("POST", "server/clear.php");
    xhr.send();
})

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
        if (xhr.status === 200) {
            document.getElementById("results_table").innerHTML = xhr.response;
        } else console.log("status: ", xhr.status)
    };
    xhr.open("GET", "server/onload.php");
    xhr.send();
}