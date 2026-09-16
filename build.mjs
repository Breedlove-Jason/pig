import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const name of ['index.html','style.css','script.js','engine.js','icon.svg']) await copyFile(name,`dist/${name}`);
console.log('Built Pig in dist/');
