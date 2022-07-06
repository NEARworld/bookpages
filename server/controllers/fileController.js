const fileService = require("../service/fileService");

class FileController {
    async upload(req, res) {
       try {
            const uploadedFile = await fileService.upload(req, res);
            return res.json(uploadedFile);
       } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }
    
    async getAll(req, res) {
        try {
            const allFiles = await fileService.getAll(req, res);
            return allFiles;
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }
    
    async getOne(req, res) {
        try {
            const oneFile = await fileService.getOne(req, res);
            return oneFile;
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }
    
    async displayOne(req, res) {
        try {
            const displayedOne = await fileService.displayOne(req,res);
            return displayedOne;
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }
    
    async deleteOne(req, res) {
        try {
            const deletedFile = await fileService.deleteOne(req,res);
            return deletedFile;
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }
}

module.exports = new FileController();