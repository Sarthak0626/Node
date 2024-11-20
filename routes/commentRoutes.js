const express = require('express');
const router = express.Router();

// Example route for adding a comment
router.post('/:blogId/comments', (req, res) => {
   res.json({ message: 'Comment added!' });
});

// Example route for fetching comments
router.get('/:blogId/comments', (req, res) => {
   res.json({ message: 'Fetching comments...' });
});

// Make sure to export the router properly
module.exports = router;
