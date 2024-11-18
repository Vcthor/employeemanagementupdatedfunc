const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const uploadsFolder = path.join(__dirname, 'uploads');

// Serve static files from the uploads folder
app.use('/uploads', express.static(uploadsFolder));

// Endpoint to get the list of images from the uploads folder
app.get('/api/images', (req, res) => {
    fs.readdir(uploadsFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read uploads folder' });
        }

        // Filter image files (e.g., .jpg, .jpeg, .png, etc.)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles); // Return the image filenames
    });
});

// Server setup
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
