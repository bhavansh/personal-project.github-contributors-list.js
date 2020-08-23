const heading = document.getElementById("heading");
heading.style.display = "none"
let org = "devscollab";
let repo = "sandbox";

const ListContributors = async () => {
//   let org = "devscollab";
//   let repo = "sandbox";
  org = $("#ORG").val();
  repo = $("#REPO").val();
  let avatar, name, githubprofile, contributions;
  api = `https://api.github.com/repos/${org}/${repo}/contributors?q=contributions&order=desc`;

  if (org.length == 0 || repo.length == 0) {
    alert("empty fields");
    return;
  }

  const data = await fetch(api);

  if (data.status == 404) {
    alert(`${data.status} , ${data.statusText}`);
    return;
  }

  const json = await data.json();
  document.getElementById("inpgrp").innerHTML=""
  const main = document.getElementById("main");
    heading.style.display = "block"

  
  json.forEach((e) => {
      avatar = e.avatar_url;
      githubprofile = e.html_url;
      name = e.login;
      contributions = e.contributions;
      
      let userProfiles = document.createElement('div');
      userProfiles.innerHTML = `
        
      <div class="media m-5">
      <img
        class="align-self-center mr-3"
        src="${avatar}"
        alt="User Img"
        height="100px"
        width="100px"
        style="border-radius:50%";
      />
      <div class="media-body">
        <h5 class="mt-0"><a href="${name}</a></h5>
        <h5 class="mt-0">Github User Profile: ${githubprofile}</a></h5>
        <h5 class="mt-0">Contributions : ${contributions}</a></h5>
      </div>
    </div>
      `
    
      main.appendChild(userProfiles)
    });
    
    

};
