import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();


interface LanguageConfig {
    ext: string;
    execCmd: (filePath: string) => string;
}

// Map of file extensions and execution commands based on the language
const languageConfigs: Record<string, LanguageConfig> = {
    python: { ext: 'py', execCmd: (filePath) => `python3 ${filePath}` },
    javascript: { ext: 'js', execCmd: (filePath) => `node ${filePath}` },
    cpp: { ext: 'cpp', execCmd: (filePath) => `g++ ${filePath} -o /tmp/a.out && /tmp/a.out` }
};

// Code execution route
router.post('/execute', async (req: any, res: any) => {
    const { code, language, input } = req.body;
    const languageConfig = languageConfigs[language];

    if (!languageConfig) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    // Generate a unique file name for the code
    const filename = `/tmp/${uuidv4()}.${languageConfig.ext}`;

    try {
        const codeWithInput = `const input = '${input.replace(/'/g, "\\'")}';\n${code}`;
        // Save the code to a file
        fs.writeFileSync(filename, codeWithInput);

        // Execute the code inside a Docker container
        const dockerCmd = `docker run --rm -v ${filename}:${filename}  --memory=128m --cpus=0.5 code-execution-sandbox ${languageConfig.execCmd(filename)}`;

        exec(dockerCmd, { timeout: 5000 }, (error, stdout, stderr) => {
            // Cleanup the temporary file
            fs.unlinkSync(filename);

            if (error) {
                return res.status(400).json({ error: stderr || error.message });
            }
            res.json({ output: stdout.trim() });
        });
    } catch (err: any) {
        res.status(500).json({ error: 'Code execution failed' });
    }
});

export default router;

