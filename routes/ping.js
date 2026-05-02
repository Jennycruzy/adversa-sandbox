const { exec } = require('child_process');
const express = require('express');
const router = express.Router();

// Network diagnostic endpoint — lets ops ping any host from the server
router.get('/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ result: stdout });
  });
});

module.exports = router;
