const express = require('express');
const router = express.Router();
const Developer = require('../models/developer');

// Get a list of developers from the database based on the coordinates
router.get('/developers',function(req,res,next){
  Developer.aggregate([
    {
    $geoNear:{
      near:{type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
      maxDistance:100000,
      distanceField:"distance",
      spherical:true
    }
    }
    ]).then(function(developers){
    res.send(developers);
  });
});

// Add a new developer to the database
router.post('/developers',function(req,res,next){
    Developer.create(req.body).then(function(developer){
      res.send(developer);
  }).catch(next);
});

// Update a developer in the database
router.put('/developers/:id',function(req,res,next){
  Developer.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Developer.findOne({_id:req.params.id}).then(function(developer){
      res.send(developer);
    }).catch(next);
  });
});

// Delete a developer in the database
router.delete('/developers/:id',function(req,res,next){
  Developer.findByIdAndRemove({_id:req.params.id}).then(function(developer){
    res.send(developer);
  }).catch(next);
});

module.exports = router;
