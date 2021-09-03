import { Board } from "./board.js";

const ATOM_CHAR = "o";

var Draw = {};

Draw.all = function () {
  var html = "<table>";
  for (let row = 0; row < Board.length; row++) {
    html += "<tr>";
    for (let col = 0; col < Board[row].length; col++) {
      html += "<td>";
      html += Draw.atoms(Board[row][col]);
      html += "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";

  document.body.innerHTML = html;
};

Draw.atoms = function (count) {
  var result = "";
  for (let index = 0; index < count; index++) {
    result += ATOM_CHAR;
  }
  return result;
};

Draw.getPosition = function (node) {
  if (node.nodeName != "TD") {
    return null;
  }
  var x = 0;
  while (node.previousSibling) {
    x++;
    node = node.previousSibling;
  }

  var row = node.parentNode;
  var y = 0;
  while (row.previousSibling) {
    y++;
    row = row.previousSibling;
  }

  return [x, y];
};

export { Draw };
