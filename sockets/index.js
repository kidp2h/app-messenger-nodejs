import addNewContact from './contact/addNewContact';
import removeContact from './contact/removeContact';

let initSockets = (io) => {
    addNewContact(io)
    removeContact(io)
}

module.exports = initSockets