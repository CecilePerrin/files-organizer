const fs = require('fs'); 
const path = require('path'); 
//const PdfReader = require('pdfreader').PdfReader;
const downloadDir = './files' 
const keywords = { 
   'administratif': ['impôt', 'facture'], 
   'dev': ['script', 'jeux'] 
} 


//Watch if directory as changed 
fs.watchFile(downloadDir, {persistent: true,}, (curr, prev) =>{ 
   const files = fs.readdirSync(downloadDir) 
   console.log (files) 
   files.forEach(file => {  
      const filePath = path.join(downloadDir, file)  
      console.log(filePath)
      fs.stat(filePath, (err, stats) => { 
         // Check if path is a file 
         if (stats.isFile()) { 
            fs.readFile( filePath, 'utf8',  (err, data) => { 
               if (err){ 
                  console.log(err); 
                  return; 
               }  
               console.log(data)  
               let destination = null; 
               // Pull the key of the object 
               Object.keys(keywords).forEach(category => { 
                  keywords[category].forEach(keyword =>{ 
                     if (data.indexOf(keyword) !== -1){ 
                        destination = category 
                     } 
                  }) 
               }) 
               // Change destination file  
               if (destination) { 
                  const destinationPath = path.join(downloadDir, destination, file); 
                  fs.rename(filePath, destinationPath, err => { 
                     if (err) { 
                     console.error(err); 
                     return; 
                     } 
                     console.log(`Successfully moved ${file} to ${destination}`); 
                  }); 
               } 
            })
         } 
      })     
   })                 
});



      //Loop over the file  
//  } 
// })