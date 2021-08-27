const MATRIX_SIZE = 6;

var table = document.querySelector("table");

for (var i = 0; i < MATRIX_SIZE; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < MATRIX_SIZE; j++) {
        var cell = document.createElement("td");
        row.appendChild(cell);
    }

    table.appendChild(row);
}

document.addEventListener("click", function(e) {
    var node = e.target;
    if (node.nodeName == "TD") { update(node); }
});

var update = function(cell) {
    cell.innerHTML += "o";
};