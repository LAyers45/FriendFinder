var friends = require("../data/friends");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    })
}

app.post("/api/friends", function (req, res) {

    var user = req.body;
    //console.log(user);

    var newFriend = {};
    var topCompatibility = 50;
    friends.forEach(function (friends) {
        var compatibility = 0;
        for (var i = 0; i < friends.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
            compatibility += (user.scores[i] - friends.scores[i]);
        }
        if (compatibility < topCompatibility) {
            topCompatibility = compatibility;
            newFriend = friends;
        }
    });
    res.json({
        name: newFriend.name,
        photo: newFriend.photo
    });
    friends.push(user);
})