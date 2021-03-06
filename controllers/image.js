const Clarifai = require('clarifai');

// you must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'ae6ae43774944919a78f1e0464b7f1f9'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)	
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) =>{
		const { id } = req.body;
  		db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => { 
        	res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get count for entries'))
}


module.exports = {
	handleImage,
	handleApiCall
}