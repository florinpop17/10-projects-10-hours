const GITHUBAPIURL = "https://api.github.com/users/";

const dataShowArea = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

userData("Apoorva-Shukla");

async function userData(username) {
    const data = await fetch(GITHUBAPIURL + username);
    const jsonData = await data.json();

    createUserCard(jsonData);
    usersOtherData(username);
}

async function usersOtherData(username) {
    let resp = await fetch(GITHUBAPIURL + username + "/repos");
    let respData = await resp.json();
    addReposToCard(respData);

    resp = await fetch(GITHUBAPIURL + username + "/followers");
    respData = await resp.json();
    addFollowersToCard(respData);

    resp = await fetch(GITHUBAPIURL + username + "/following");
    respData = await resp.json();
    addFollowingToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
        <p><a class="other-links" target="blank" href=${user.html_url}><strong>${user.html_url}</strong></a></p>
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers} <strong>Followers</strong></li>
                </ul>

                <div id="followers"></div>

                <ul class="info">
                    <li>${user.following} <strong>Following</strong></li>
                </ul>

                <div id="following"></div>

                <ul class="info">
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>

            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEle = document.getElementById("repos");
    reposEle.innerHTML = "";

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("links");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEle.appendChild(repoEl);
        });
}

function addFollowersToCard(followers) {
    const flwrsEle = document.getElementById("followers");
    flwrsEle.innerHTML = "";

    followers
        .forEach((fl) => {
            const flwrsEl = document.createElement("a");
            flwrsEl.classList.add("links");

            flwrsEl.href = fl.html_url;
            flwrsEl.target = "_blank";
            flwrsEl.innerText = fl.login;

            flwrsEle.appendChild(flwrsEl);
        });
}

function addFollowingToCard(following) {
    const fEle = document.getElementById("following");
    fEle.innerHTML = "";

    following
        .forEach((f) => {
            const fEl = document.createElement("a");
            fEl.classList.add("links");

            fEl.href = f.html_url;
            fEl.target = "_blank";
            fEl.innerText = f.login;

            fEle.appendChild(fEl);
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTxt = search.value;
    search.value = "";
    userData(searchTxt);
});