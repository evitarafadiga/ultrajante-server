const match = require("../source/match");
const { selectMove } = require("../source/match");

module.exports = function selectMove(socket, data) {
    if (socket.move) return { message: "Not selected" };

    let move = data.move;
    let hero = data.hero;
    
    move.host = match.playerA;
    move.target = match.playerB;
    move.hero = hero;

    return { message: "Move selected!"}
}