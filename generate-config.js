const fs = require('fs');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables are required.');
    process.exit(1);
}

const configContent = `const SUPABASE_URL = '${supabaseUrl}';
const SUPABASE_KEY = '${supabaseKey}';
`;

fs.writeFileSync('config.js', configContent);
console.log('Successfully generated config.js');
