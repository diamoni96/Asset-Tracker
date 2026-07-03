const fs = require('fs');

// Safely delete other lockfiles if they exist
['package-lock.json', 'yarn.lock'].forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.warn(`Warning: Could not remove ${file}:`, err.message);
    }
  }
});

// Ensure the user is using pnpm
const userAgent = process.env.npm_config_user_agent || '';
if (userAgent && !userAgent.startsWith('pnpm/')) {
  console.error('\x1b[31mError: This project requires pnpm. Please run "pnpm install" instead of "npm" or "yarn".\x1b[0m');
  process.exit(1);
}
