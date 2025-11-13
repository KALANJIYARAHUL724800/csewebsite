import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
}));
app.use(fileUpload());
let drives = ['C:', 'D:', 'E:'];
let projectRoot;
for (let drive of drives) {
  let possibleRoot = path.join(drive, 'cse-website');
  if (fs.existsSync(possibleRoot)) {
    projectRoot = possibleRoot;
    break;
  }
}
if (!projectRoot) {
  process.exit(1);
}
const uploadFolder = path.join(projectRoot, 'front-end', 'public', 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });
app.use('/uploads', express.static(uploadFolder));
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.image) return res.status(400).send('No file uploaded.');
  const file = req.files.image;
  const fileName = `${Date.now()}_${file.name}`;
  const savePath = path.join(uploadFolder, fileName);
  file.mv(savePath, (err) => {
    if (err) return res.status(500).send('Failed to move file.');
    res.send({ url: `/uploads/${fileName}`, message: 'File uploaded successfully!' });
  });
});
app.listen(3001);
