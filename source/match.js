const { v4: uuidv4 } = require('uuid');

const list = new Map();

function create() {
    let id = null;
    do id = uuidv4(); while(list.has(id));

    const match = { id, playerA: null, playerB: null }
    list.set(id, match);

    return match;
}

function destroy(id) {
    const match = list.get(id);
    if (!match) return;

    match.id = null;

    if (match.playerA) {
        match.playerA.match = null;
        match.playerA = null;
    }

    if (match.playerB) {
        match.playerB.match = null;
        match.playerB = null;
    }

    list.delete(id);
}

module.exports = {
    create, destroy,
    list: () => [...list.values()]
}