import cors from 'cors';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// For __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(cors());

// Set up middleware for handling form-data (file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'projects/images/');  // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({ storage: storage });

// Set up Express to handle JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/projects/images', express.static(path.join(__dirname, 'projects/images')));  // Serve images

// Define the Project class with additional variables (startDate and endDate)
class Project {
    constructor(title, description, picture1, picture2) {
        this.title = title;
        this.description = description;
        this.picture1 = picture1;

        this.wallet = "";     
        this.donate = "";     
        this.vote = "";       
        this.vote_count = "";
    }
}

app.post('/save-project', upload.fields([{ name: 'picture1' }, { name: 'picture2' }]), (req, res) => {
    const { title, description, vote, wallet, donate, vote_count } = req.body;
    const picture1Path = req.files['picture1'][0].path.replace(/\\/g, '/'); 


    // Create a new Project instance
    const project = new Project(title, description, picture1Path);
    project.vote = vote || 0; 
    project.wallet = wallet || 0; 
    project.donate = donate || 0; 
    project.vote_count = vote_count || 0; 

    const projectsFilePath = path.join(__dirname, 'projects', 'projects.json');

    fs.readFile(projectsFilePath, 'utf8', (err, data) => {
        let projects = [];

        if (err && err.code === 'ENOENT') {
            projects = [];
        } else if (err) {
            return res.status(500).send({ message: 'Error reading file.' });
        } else {
            projects = JSON.parse(data);
        }

        const existingProject = projects.find(p => p.title.toLowerCase() === title.toLowerCase());

        if (existingProject) {
            return res.status(400).send({ message: 'A project with this title already exists.' });
        }

        projects.push(project);

        fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 4), (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error saving project to file.' });
            }
            res.status(200).send({ message: 'Project saved successfully.' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});