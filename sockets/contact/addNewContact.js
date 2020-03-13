/**
 * 
 * @param  io from socket.io lib
 */
import {pushSocketIdToArray,emitNotificationToUser,removeSocketIdFromArray} from "../../helpers/socketIO"
let addNewContact = (io) => {
    let clients = {}
    io.on("connection", (socket) => {

        var currentUserId = socket.request.user._id
        pushSocketIdToArray(clients,currentUserId,socket.id)
        
        socket.on("add-new-contact", (data) => {
            let contactId = data.contactId
            let dataUser = socket.request.user._doc
            let currentUser = {
                id: dataUser._id,
                username: dataUser.username,
                avatar: dataUser.avatar
            }
            if (clients[contactId]) {
                emitNotificationToUser(clients, contactId, io, "res-add-new-contact",currentUser)
            }

        })
        // remove socket when user disconnect
        socket.on("disconnect", () => {
            removeSocketIdFromArray(clients, currentUserId,socket.id)
            
        })
        //console.log(clients);
    })
    
}

module.exports = addNewContact