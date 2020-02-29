/**
 * 
 * @param {object} clients 
 * @param {String} userId 
 * @param {String} socketID 
 */
var pushSocketIdToArray = (clients, userId, socketID) => {
    if (clients[userId]) {
        clients[userId].push(socketID)
    } else {
        clients[userId] = [socketID]
    }
    return clients
}
/**
 * 
 * @param {object} clients 
 * @param {String} contactId 
 * @param {Object} currentUser 
 * @param {String} nameEvent 
 */
var emitNotificationToUser = (clients, contactId, io, nameEvent, currentUser) => {
    clients[contactId].forEach(socketID => {
        io.sockets.connected[socketID].emit(nameEvent, currentUser)
    });
}
/**
 * 
 * @param {Object} clients 
 * @param {String} currentUserId 
 * @param {String} sID SocketId
 */
var removeSocketIdFromArray = (clients, currentUserId, sID) => {
    clients[currentUserId] = clients[currentUserId].filter(socketID => socketID !== sID)
    if (!clients[currentUserId] == 0) {
        delete clients[currentUserId]
    }
}

module.exports = {
    pushSocketIdToArray: pushSocketIdToArray,
    emitNotificationToUser: emitNotificationToUser,
    removeSocketIdFromArray : removeSocketIdFromArray
}