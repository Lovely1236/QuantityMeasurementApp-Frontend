const units = {
    length: ["meter", "kilometer", "centimeter"],
    weight: ["gram", "kilogram"],
    temperature: ["celsius", "fahrenheit"]
};

const typeSelect = document.getElementById("type");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

function populateUnits() {
    let type = typeSelect.value;
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    units[type].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

typeSelect.addEventListener("change", populateUnits);
window.onload = populateUnits;

function convert() {
    let value = parseFloat(document.getElementById("inputValue").value);
    let from = fromUnit.value;
    let to = toUnit.value;
    let type = typeSelect.value;

    let result = value;

    // Simple logic (can replace with backend API)
    if (type === "length") {
        if (from === "meter" && to === "kilometer") result = value / 1000;
        else if (from === "kilometer" && to === "meter") result = value * 1000;
    }

    if (type === "weight") {
        if (from === "gram" && to === "kilogram") result = value / 1000;
        else if (from === "kilogram" && to === "gram") result = value * 1000;
    }

    if (type === "temperature") {
        if (from === "celsius" && to === "fahrenheit") result = (value * 9/5) + 32;
        else if (from === "fahrenheit" && to === "celsius") result = (value - 32) * 5/9;
    }

    document.getElementById("result").innerText = "Result: " + result;
}