// https://www.superheroapi.com/api.php/10222970817439620/
let key = '10222970817439620';
let baseURL = `https://www.superheroapi.com/api.php/${key}/`
// 10222970817439620/263
//steps for later, add'l functionality
//make async
//add loading from bootstrap

function getHero() {
    const randomNumber = Math.floor(Math.random() * 731 + 1);
    let test;
    // test=662;
    // test=663;
    // fetch(baseURL+test)
    fetch(baseURL + randomNumber)
        .then(result => result.json())
        .then(data => {
            const output = document.getElementById("output");
            const biography = document.getElementById("biography")
            let name = document.createElement("h1");
            let img = document.createElement("img");
            let otherInfo = document.createElement("ul");
            let fullName = document.createElement("li");
            let publisher = document.createElement("li");
            let firstAppearance = document.createElement("li");
            output.innerHTML = "";
            biography.innerHTML = "";
            img.src = data.image.url;
            img.addEventListener("error", altImage);
            function altImage(err) {
                img.src = "./404.jpg"
            }
            name.innerText = data.name;
            let fullNameStr;
            if (data.biography['full-name'] === "") {
                fullNameStr = data.name;
            } else {
                fullNameStr = data.biography['full-name'];
            }
            fullName.innerText = `Full Name: ${fullNameStr}`;
            let publisherStr = data.biography.publisher;
            publisher.innerText = `Publisher: ${publisherStr}`;
            let appearance1;
            if (data.biography['first-appearance'] === "-") {
                appearance1 = 'Information not found';
            } else {
                appearance1 = data.biography['first-appearance'];
            }
            firstAppearance.innerText = `First Appearance: ${appearance1}`;
            output.appendChild(name);
            output.appendChild(img);
            biography.appendChild(otherInfo);
            otherInfo.appendChild(fullName);
            otherInfo.appendChild(publisher);
            otherInfo.appendChild(firstAppearance);
            const stats = document.getElementById('stats');
            let statsList = document.createElement('ul');
            stats.innerHTML = '';
            stats.appendChild(statsList);
            let psObj = data.powerstats;
            console.log(data.powerstats);
            for (const prop in psObj) {
                let newStat = document.createElement('li');
                newStat.innerText = `${prop}: ${psObj[prop]}`;
                statsList.appendChild(newStat);
            }

            console.log(data);
        });
}
