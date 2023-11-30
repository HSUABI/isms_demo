const express = require('express');
const multer = require('multer');
const db = require('../db');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "upload.html"));
  });
  

// 파일 저장을 위한 Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// 업로드 경로 및 처리
router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log(file);
    const fileItem1 = req.body.fileItem1;
    const fileItem2 = req.body.fileItem2;
    const fileItem3 = req.body.fileItem3;
    const fileName = file.originalname;
    // 파일 내용 읽기
    const filePath = path.join(__dirname, '..', 'uploads', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // 파일 정보를 데이터베이스에 저장
    // const query = 'INSERT INTO system_a_files (file_item1, file_item2, file_item3, file_name, file_content) VALUES (?, ?, ?, ?, ?)';
    // db.query(query, [fileItem1, fileItem2, fileItem3, fileName, fileContent], (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('Error saving file info to database');
    //     }
    //     console.log('File info saved to database.');
    //     res.send('File uploaded and info saved to database.');
    // });
});

module.exports = router;
