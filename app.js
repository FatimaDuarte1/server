const http = require('http');
const fs = require('fs');

// HTTP => (request, response)
http.createServer((request, response)=>{

    const file = request.url =='/'?
    './www/index.html':`./www${request.url}`;
    //console.log(request);//se quita 
    
    if(request.url=='/login'){
        let data = [];
        request.on("data", value => {
            data.push(value);
        }).on("end", ()=>{
            let params = Buffer.concat(data).toString();
            console.log(params);
            response.write(params);
            response.end();
        });

    }


    //const data = fs.readFileSync('./www/index.html');
    fs.readFile(file, (err, data) =>{
        if(err){
            response.writeHead(404, {"Content-Type":"text/plain"});
            response.write("Not found"); //data""
            response.end(); 

        }else{
            const extension = request.url.split('.').pop();
            console.log(extension);
            switch (extension) {
                case'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    break;
                case 'html':
                    response.writeHead(200, {"Content-TYpe":"text/html"});
                    break;
                case 'css':
                    response.writeHead(200, {"Content-TYpe":"text/css"});
                    break;
                case 'ico':
                        response.writeHead(200, {"Content-TYpe":"image/x-icon"});
                        break;
                default:
                    response.writeHead(200, {"Content-Type":"text/html"});
                    break;

            }
            response.write(data);
            response.end(); 
        }
    });
}).listen(4444);

