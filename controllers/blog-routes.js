const router = require('express').Router();

// get all dishes
router.get('/', async (req, res) => {
    res.render('all', {blogs});
  });
  
  // get one dish
  router.get('/blog/:post', async (req, res) => {
    return res.render('blog', blogs[req.params.num - 1]);
  });
  

module.exports = Blog;