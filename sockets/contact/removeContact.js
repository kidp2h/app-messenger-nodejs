/**
 * 
 * @param  io from socket.io lib
 */
import {pushSocketIdToArray,emitNotificationToUser,removeSocketIdFromArray} from "../../helpers/socketIO"
let removeContact = (io) => {
    let clients = {}
    io.on("connection", (socket) => {
        //push id socket
        var currentUserId = socket.request.user._id
        pushSocketIdToArray(clients,currentUserId,socket.id)
        // emit Notification
        
        socket.on("remove-contact", (data) => {
            let contactId = data.contactId
            let dataUser = socket.request.user._doc
            let currentUser = {
                id: dataUser._id
            }
            if (clients[data.contactId]) {
                emitNotificationToUser(clients, contactId, io, "res-remove-contact",currentUser)
            }

        })
        // remove socket when user disconnect
        socket.on("disconnect", () => {
            removeSocketIdFromArray(clients, currentUserId,socket.id)
        })
        console.log(clients);
    })
    
}

module.exports = removeContact