
const db = require("../models");
const Token = db.token;

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");


exports.create = (req, res) => {
  	// Save User to Database
  	Token.create({
	    chatid: req.body.chatid,
	    token: req.body.token,
	    password: bcrypt.hashSync(req.body.password, 8)
  	})
    .then(user => {
      	res.send({ message: "Token registered successfully!" });
    })
    .catch(err => {
      	res.status(500).send({ message: err.message });
    });
};

exports.registerToken = (req, res) => {
   	Token.update(
	   	{
	     	chatid: req.body.chatid,
	    	token: req.body.token
	  	},
	  	{
	   	 	where: {
	       		id: req.tokenId
	     	}
	  	}, 
   	)
    .then(token => {
    	if (!token) {
	      	return res.status(404).send({ message: "Token Not found." });
	    }
      	res.send({ message: "Token updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePassword = (req, res) => {
  	Token.update(
	   	{
	     	password: bcrypt.hashSync(req.body.newpassword, 8)
	  	},
	  	{
	   	 	where: {
	       		id: req.tokenId
	     	}
	  	}, 
   	)
    .then(token => {
    	if (!token) {
	      	return res.status(404).send({ message: "Token Not found." });
	    }
      	res.send({ message: "Password updated successfully!" });
    })
    .catch(err => {
      	res.status(500).send({ message: err.message });
    });
};

exports.getData = (req, res) => {
  	Token.findAll().then(tokens => {
    if (!tokens) {
       	return res.status(404).send({ message: "Token Not found." });
    }
    res.status(200).send(tokens);
	}).catch(err => {
	   	res.status(500).send({ message: err.message });
	});
};

exports.postMessage = (req, res) => {
	Token.findOne({
	  	order: [['id', 'DESC']],
	  	limit: 1
	})
	.then(token => {
		console.log(req.body.message);
		if (!token) {
	        return res.status(404).send({ message: "Token not found." });
	    }
	    const url = 'https://api.telegram.org/bot' + token.token + '/sendMessage?chat_id=@' + token.chatid + '&parse_mode=Markdown&text=' + req.body.message;
		// Sending the GET request with the data
		fetch(url)
		.then(response => {
			res.send({ message: "Message sent successfully!" });
		})
		.catch(error => {
		   res.status(500).send({ message: err.message });
		});
      	
    })
    .catch(err => {
      	res.status(500).send({ message: err.message });
    });
};