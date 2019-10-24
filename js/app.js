window.addEventListener("load", getJobs);

let total = document.getElementById("total");
let url = "https://nut-case.s3.amazonaws.com/jobs.json";

// Get the <datalist> and <input> elements.
let companyName = document.getElementById("company");
let skillSet = document.getElementById("skills");
let xperience = document.getElementById("experience");
let cityName = document.getElementById("city");

let cityList = document.getElementById("city-datalist");
let skillsList = document.getElementById("skills-datalist");
let companyList = document.getElementById("company-datalist");
let experienceList = document.getElementById("experience-datalist");

function getJobs() {
  fetch(url)
    .then(res => res.json())
    .then(jobs => {
      let jobsResults = jobs.data;
      total.innerHTML = `Total Jobs Found: ${jobsResults.length}`;

      //Storing only unique values
      let distinctExp = [...new Set(jobsResults.map(x => x.experience))];
      let distinctCity = [...new Set(jobsResults.map(x => x.location))];
      let distinctSkill = [...new Set(jobsResults.map(x => x.skills))];
      let distinctCompany = [...new Set(jobsResults.map(x => x.companyname))];

      //Populate Company Name
      distinctCompany.forEach(Comp => {
        //Ignore null entries
        if (Comp === "") {
        } else {
          let optionCompany = document.createElement("option");
          optionCompany.value = Comp;
          companyList.appendChild(optionCompany);
        }
      });

      //Populate Skills
      distinctSkill.forEach(Skill => {
        if (Skill === "") {
        } else {
          let optionSkill = document.createElement("option");
          optionSkill.value = Skill;
          skillsList.appendChild(optionSkill);
        }
      });

      //Populate City's
      distinctCity.forEach(Citys => {
        if (Citys === "") {
        } else {
          let optionCity = document.createElement("option");
          optionCity.value = Citys;
          cityList.appendChild(optionCity);
        }
      });

      //Populate Experience
      distinctExp.forEach(Ex => {
        if (Ex === "") {
        } else {
          let optionExperience = document.createElement("option");
          optionExperience.value = Ex;
          experienceList.appendChild(optionExperience);
        }
      });
      let t0 = performance.now();
      let results = "";

      //Displaying all the jobs
      jobsResults.forEach(job => {
        results += `
          <ul class="list-group mb-4 shadow-sm">
            <li class="list-group-item bg-dark text-light font-weight-bold">Title: ${job.title}</li>
            <li class="list-group-item">Company: ${job.companyname}</li>
            <li class="list-group-item">Location: ${job.location}</li>
            <li class="list-group-item">Experience: ${job.experience}</li>
            <li class="list-group-item">Skills: ${job.skills}</li>
            <li class="list-group-item">End Date: ${job.enddate}</li>
            <li class="list-group-item">Job Description: ${job.jd}</li>
            <li class="list-group-item text-right"><a href=${job.applylink} class="btn btn-primary" target=_blank>Apply Here</a></li>
          </ul>
        `;
      });
      document.getElementById("output").innerHTML = results;
      let t1 = performance.now();
      console.log("time taken is" + (t1 - t0));
    });
}

//Filter functions
getFilter = () => {
  fetch(url)
    .then(res => res.json())
    .then(jobs => {
      let jobsFilter = jobs.data;
      let searchJobs = jobsFilter.filter(Comp => {
        //return data based on applied filter
        return (
          Comp.location.includes(cityName.value) &&
          Comp.skills.includes(skillSet.value) &&
          Comp.experience.includes(xperience.value) &&
          Comp.companyname.includes(companyName.value)
        );
      });

      let filtered = "";
      searchJobs.forEach(job => {
        filtered += `
          <ul class="list-group mb-4 shadow-sm">
            <li class="list-group-item bg-dark text-light font-weight-bold">Title: ${job.title}</li>
            <li class="list-group-item">Company: ${job.companyname}</li>
            <li class="list-group-item">Location: ${job.location}</li>
            <li class="list-group-item">Experience: ${job.experience}</li>
            <li class="list-group-item">Skills: ${job.skills}</li>
            <li class="list-group-item">End Date: ${job.enddate}</li>
            <li class="list-group-item">Job Description: ${job.jd}</li>
            <li class="list-group-item text-right"><a href=${job.applylink} class="btn btn-primary" target=_blank>Apply Here</a></li>
          </ul>
        `;
      });
      //update data based on filters
      total.innerHTML = `Total Jobs Found: ${searchJobs.length}`;
      document.getElementById("output").innerHTML = filtered;
    });
};
