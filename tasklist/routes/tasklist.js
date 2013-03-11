var mongoose = require('mongoose')
  , userinfo = require('../models/task.js');


module.exports = TaskList;


function TaskList(connection) {
  mongoose.connect(connection);
}


TaskList.prototype = {
  showTasks: function(req, res) {
    userinfo.find({userDeleted: false}, function foundTasks(err, users) {
      res.render('index',{title: 'Author Registration Form ', tasks: users})
    });
  },

  showUse: function(req,res){
   userinfo.find({userDeleted: false}, function foundTasks(err, users) {
      res.render('showuser',{title: 'Author Registration Form ', tasks: users})
    });
  },




  addTask: function(req,res) {
    var user = req.body.user;
    newUser = new userinfo();
    newUser.userName = user.name;
    newUser.userDescription = user.description;
    newUser.userAuthor = user.author;
    newUser.save(function savedTask(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  },


  completeTask: function(req,res) {
    var completedTasks = req.body;
    for(userId in completedTasks) {
      if(completedTasks[userId]=='true') {
        var conditions = { _id: userId };
        var updates = { userDeleted: completedTasks[userId] };
        userinfo.update(conditions, updates, function updatedTask(err) {
          if(err) {
            throw err;
          }
        });
      }
    }
    res.redirect('/');
  }
}