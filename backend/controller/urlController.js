const express=require('express');
const  dotenv = require("dotenv");
const  cors = require("cors");
const  shortid = require("shortid");
const Url=require('../models/urlModel')
const utils=require('../util');


const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

// get all saved URLs 
module.exports.getAllShortUrls=async function getAllShortUrls(req, res){
    Url.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
  // URL shortener endpoint
module.exports.addNewUrl=async function addNewUrl(req, res){
    const { origUrl } = req.body;
    const base = `http://localhost:3000`;
    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
  
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  };

// redirect endpoint
module.exports.redirectOriginalUrl=async function redirectOriginalUrl(req, res){
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
      console.log(url)
      if (url) {
        url.clicks++;
        url.save();
        return res.redirect(url.origUrl);
      } else res.status(404).json("Not found");
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  };