const { spawn } = require('child_process');

console.log('🚀 Starting optimized portfolio...');
console.log('📊 Performance improvements applied:');
console.log('   ✅ Lazy loading components');
console.log('   ✅ Image optimization with progressive loading');
console.log('   ✅ Reduced animation complexity');
console.log('   ✅ Smooth loading screen');
console.log('   ✅ Performance monitoring');
console.log('');

const start = spawn('npm', ['start'], { stdio: 'inherit', shell: true });

start.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});