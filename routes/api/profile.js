const express = require('express');
const router = express.Router();


// @route GET api/posts/test 
// @desc Tests profile route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: 'Profile Works'
}));



//  need to export router
module.exports = router;