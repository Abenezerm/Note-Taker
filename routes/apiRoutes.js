const fs = require('fs');
const path = require('path');
const uuid = require('uuid')

module.exports = (app) => {
  //app.GET reads then returns notes from the ds.json
  app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) =>{
    if (err) throw err;
    const savednotes = JSON.parse(data)
    res.json(savednotes);
  })
});

app.post('/api/notes', (req, res) => {
  const postNote = {
    id : uuid.v4(),
    title: req.body.title,
    text : req.body.text
  }
  if (!postNote.text || !postNote.title){
    res.status(400).json({ msg : 'Please enter both a title and body for the note!'})
  }else{
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) =>{
      if (err) throw err;
      const savednotes = JSON.parse(data)
      savednotes.push(postNote);
      fs.writeFile(path.join(__dirname, '../db/db.json'),`${JSON.stringify(savednotes)}`, (err) => err ? console.log(err) : console.log("done!"))
      res.status(200).json({ msg : 'Very NICE!'})
    })
  }
  
});

}
