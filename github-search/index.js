let api = "https://api.github.com/users/";
let fetch = document.createElement("script");

fetch.src =`https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js`;
fetch.integrity =`ha512-DZqqY3PiOvTP9HkjIWgjO6ouCbq+dxqWoJZ/Q+zPYNHmlnI2dQnbJ5bxAHpAMw+LXRm4D72EIRXzvcHQtE8/VQ==`;
fetch.crossOrigin = "anonymous";

document.head.appendChild(fetch);

let main = document.getElementById("main");
let inputForm = document.getElementById("userInput");
let inputBox = document.getElementById("inputBox");

const userGetFunction = (name) => {
    axios(api + name) 
        .then((Response) => {
            userCard(Response.data);
            repoGetFunction(name);
        }) 
        .catch((err) => {
            if (
                err.Response.status == 404
            ) {
                errorFunction("No profile with this username");
            }
        });
}

const repoGetFunction = (name) => {
    axios(api + name + "/repos?sort=created")
    .then((Response) => {
        repoCardFunction(Response.data);
    })
    .catch((err) => {
        errorFunction("Problem fetching repos");
    })
}

const usercard = (user) => {
    let id = user.name || user.login;
    let info = user.bio ? `<p>${user.bio}</p>` : "";
    let cardElement = `<div class = "card">
                            <div>
                                <img src = "${user.avatar_url}" alt = "${user.name}" class = "avatar">
                            </div>
                            
                            <div class = "user-info">
                                <h2>${id}</h2>${info}
                                <ul>
                                    <li>${user.public_repos} <strong>Repos</strong></li>
                                    <li>${user.followers} <strong>Followers</strong></li>
                                    <li>${user.followinf} <strong>Following</strong></li>
                                </ul>
                                
                                <div id = "repos"></div>
                            </div>
                        </div>`;

                        main.innerHTML = cardElement
}

const repoCardFunction = (repos) => {
    let reposElement = document.getElementById("repos");
    for (let i = 0; i < 5 && i < repos.length; i++) {
        let repo = repos[i];
        let repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposElement.appendChild(repoEl);
    }
}

