import handleNotification from '../handleNotification/handleNotification';
let loadMore = async(req, res) => {
    try {
        let index = +(req.query.index);
        let currentUserId = req.user._id
        let result = await handleNotification.loadMore(currentUserId, index)
        res.status(200).send({
            resultLoadMore: result
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
let markReadAll = async (req, res) => {
    try {
    	let notification = req.body.allNotifcation
        let result = await handleNotification.markReadAll(req.user._id,notification)
        //console.log(result);
        return res.status(200).send(req.body.allNotifcation)
    } catch (error) {
        return res.status(500).send(error)
    }

}
module.exports = {
    loadMore: loadMore,
    markReadAll: markReadAll
}