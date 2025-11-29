const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables are required.');
    process.exit(1);
}

// Create public directory
const publicDir = 'public';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Generate config.js in public
const configContent = `const SUPABASE_URL = '${supabaseUrl}';
const SUPABASE_KEY = '${supabaseKey}';
`;
fs.writeFileSync(path.join(publicDir, 'config.js'), configContent);

// Copy other static files
const filesToCopy = ['index.html', 'style.css', 'script.js'];
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
    }
});

console.log('Build complete: config.js generated and files copied to public/');
