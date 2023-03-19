// import a http module and node-fetch
import http from "http";
import fetch from "node-fetch"

//create the server with HTTP
const server = http.createServer((req, res) => {
    const url = req.url
    let tableData = "<table border='3'><tr><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>"
    if (url === '/'){
        res.write('<h1>Welcome All to my server!</h1>');
        res.write('<img width="900" height="800" src="https://i.etsystatic.com/10942962/r/il/70b5b1/2908178391/il_fullxfull.2908178391_pqch.jpg">');
        res.end();
    }
    if (url === '/about'){
        res.write("<h1>This is such a great time to learn about everyone.</h1>")
        res.end()
    }
    if (url === '/list'){
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(data => {
                createData(data)
                res.write("<h1>Welcome to My Generated List</h1>")
                res.write(tableData);
                res.end();
            })
                  
    }
    if (url === '/nothing'){
        res.write('<h1>Page Not Found</h1>')
        res.end()
    }
    function createData(data) {
        data.results.forEach((element) => {
            console.log(data.results);
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData+= `</table>`
    }

})


//initial the port
const PORT = 7000;

//listening to the server
server.listen(PORT, console.log(`Server is listening on port ${PORT}`))