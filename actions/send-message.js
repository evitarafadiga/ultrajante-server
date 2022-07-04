module.exports = function sendMessage(socket, data) {
    
    let dataAgora = new Date().toLocaleString;
    let emissor = data.emissor;
    let message = data.message;

    return { emissor : emissor, message: message, date: dataAgora }
}