import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'https://cseramnad.netlify.app',
    methods: ['GET', 'POST'],
}));
app.use(fileUpload());
let drives = ['C:', 'D:', 'E:', 'F:'];
let projectRoot = null;
for (let drive of drives) {
    const possibleRoot = path.join(drive, 'cse-website', 'front-end', 'csewebsite');

    if (fs.existsSync(possibleRoot)) {
        projectRoot = possibleRoot;
        console.log(`✔ Found project folder at: ${projectRoot}`);
        break;
    }
}
if (!projectRoot) {
    console.error("Project folder not found in any drive!");
    process.exit(1);
}
const publicFolder = path.join(projectRoot, 'public');
const uploadsFolder = path.join(publicFolder, 'uploads');
const postsFolder = path.join(publicFolder, 'posts');
const profileFolder = path.join(publicFolder, 'profile');

[uploadsFolder, postsFolder, profileFolder].forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});
app.use('/uploads', express.static(uploadsFolder));
app.use('/posts', express.static(postsFolder));
app.use('/profile', express.static(profileFolder));

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) return res.status(400).send('No file uploaded.');

    const file = req.files.image;
    const savePath = path.join(uploadsFolder, file.name);

    file.mv(savePath, err => {
        if (err) return res.status(500).send('Failed to move file.');

        res.send({
            url: `/uploads/${file.name}`,
            message: 'File uploaded successfully!'
        });
    });
});
app.post('/upload-post', (req, res) => {
    if (!req.files || !req.files.image) return res.status(400).send('No file uploaded.');
    const file = req.files.image;
    const fileName = file.name.includes('_')
        ? file.name.split('_').slice(1).join('_')
        : file.name;
    const savePath = path.join(postsFolder, fileName);
    file.mv(savePath, err => {
        if (err) return res.status(500).send('Failed to move file.');

        res.send({
            url: `/posts/${fileName}`,
            message: 'Post uploaded successfully!'
        });
    });
});

// profile folder 
app.post('/upload-profile', (req, res) => {
    if (!req.files || !req.files.image) 
        return res.status(400).send('No file uploaded.');

    const file = req.files.image;

    // Keep original file name without any prefix
    const originalName = file.name; 
    const savePath = path.join(profileFolder, originalName);

    file.mv(savePath, err => {
        if (err) return res.status(500).send('Failed to move file.');

        res.send({
            imageName: originalName,
            url: `/profile/${originalName}`, // matches your static folder setup
            message: 'Profile uploaded successfully!'
        });
    });
});

app.listen(3001, () => console.log("✔ Server running on port 3001"));
