import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, 'integratedData.json');

    if (fs.existsSync(filePath)) {
        return res.status(200).json({ exists: true });
    } else {
        return res.status(200).json({ exists: false });
    }
};
