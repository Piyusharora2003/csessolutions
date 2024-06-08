const fs = require('fs');

// Read the JSON file
fs.readFile('Problems.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
var index = 0;
let problems = JSON.parse(data);
    Object.keys(problems).forEach((key) => {
        problems[key] = problems[key].map((problem) => {
            index++;
            return {
                id: index ,
                ...problem
            };
        });
    });


    // Write the updated data back to the file
    fs.writeFile('Problems.json', JSON.stringify(problems, null, 2), 'utf8', err => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Successfully updated Problems.json');
    });
});