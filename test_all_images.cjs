const fs = require('fs');
const path = require('path');

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, filter, fileList);
    } else if (filter(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findFiles('src', filePath => filePath.endsWith('.tsx'));
for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  if (code.includes('<img') && !code.includes('referrerPolicy="no-referrer"')) {
    code = code.replace(/<img/g, '<img referrerPolicy="no-referrer"');
    fs.writeFileSync(file, code);
    console.log(`Updated ${file}`);
  }
}
