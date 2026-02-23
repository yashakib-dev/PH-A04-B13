let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("total-count");
let availableJobsCount = document.getElementById("available-jobs-count");
let interview = document.getElementById("interview-count");
let rejected = document.getElementById("rejected-count");


const allButton = document.getElementById("all-btn");
const interviewButton = document.getElementById("interview-btn");
const rejectedButton = document.getElementById("rejected-btn");

const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");
const allCardSection = document.getElementById("content-cards");

const noJobs = document.getElementById("no-jobs-available");


function countCalculation() {
  total.innerText = allCardSection.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;

  if (availableJobsCount) {
    availableJobsCount.innerText = allCardSection.children.length;
  }
}
countCalculation();


function toggleStyle(id) {
  allButton.classList.remove("bg-blue-500", "text-[#FFFFFF]");
  interviewButton.classList.remove("bg-blue-500", "text-[#FFFFFF]");
  rejectedButton.classList.remove("bg-blue-500", "text-[#FFFFFF]");

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.add("bg-blue-500", "text-[#FFFFFF]");

  if (id === "interview-btn") {

    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterviewCard();

    if (interviewList.length === 0) {
      noJobs.classList.remove("hidden");
    } else {
      noJobs.classList.add("hidden");
    }
  }
  
  else if (id === "all-btn") {

    allCardSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
    noJobs.classList.add("hidden");
  }
  
  else {

    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejectedCard();

    if (rejectedList.length === 0) {
      noJobs.classList.remove("hidden");
    } else {
      noJobs.classList.add("hidden");
    }
  }
}

mainContainer.addEventListener("click", function (event) {
    
    if (event.target.classList.contains("fa-trash-can")) {
    
      const parent = event.target.closest(".content-card");
      const jobName = parent.querySelector(".jobName").innerText;

      interviewList = interviewList.filter(item => item.jobName !== jobName);
      rejectedList = rejectedList.filter(item => item.jobName !== jobName);

  
      if (parent.parentNode === allCardSection) {
        parent.remove();
      }

      if (currentStatus === "interview-btn") {
        renderInterviewCard();
        if (interviewList.length === 0) {
          noJobs.classList.remove("hidden");
        } else {
          noJobs.classList.add("hidden");
        }
      }
      
      else if (currentStatus === "rejected-btn") {
        renderRejectedCard();
        if (rejectedList.length === 0) {
          noJobs.classList.remove("hidden");
        } else {
          noJobs.classList.add("hidden");
        }
      }

      countCalculation();
      return;
    }

  if (event.target.classList.contains("interview-btn")) {
    const parent = event.target.parentNode.parentNode;
    const jobName = parent.querySelector(".jobName").innerText;
    const role = parent.querySelector(".role").innerText;
    const details = parent.querySelector(".details").innerText;
    const work = parent.querySelector(".work").innerText;

    const cardInfo = {
      jobName,
      role,
      details,
      status: "Interview",
      work,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );
    parent.querySelector(".status").innerText = "Interview";

    if (!jobExist) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    countCalculation();

    if (currentStatus === "interview-btn") {
      renderInterviewCard();
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parent = event.target.parentNode.parentNode;
    const jobName = parent.querySelector(".jobName").innerText;
    const role = parent.querySelector(".role").innerText;
    const details = parent.querySelector(".details").innerText;
    const work = parent.querySelector(".work").innerText;

    const cardInfo = {
      jobName,
      role,
      details,
      status: "Rejected",
      work,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    parent.querySelector(".status").innerText = "Rejected";

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    countCalculation();
    if (currentStatus === "rejected-btn") {
      renderRejectedCard();

    }
  }
});

function renderInterviewCard() {
  filteredSection.innerHTML = "";
  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className = "content-card space-y-6 bg-base-100 rounded-lg p-8";
    div.innerHTML = `
       <div class="flex justify-between ">
        <div>
          <h2 class="jobName text-[#002C5C] font-semibold text-[18px]">${interview.jobName}</h2>
          <p class="role">${interview.role}</p>
        </div>
        <div>
          <i class="fa-regular fa-trash-can"></i>
        </div>
      </div>
      <p class="details text-[#64748B]">${interview.details}</p>
      <div>
        <span class="status inline bg-green-400 shadow-none  p-2.5 rounded-md text-[#002C5C] font-semibold">Interview</span>
        <p class="work text-[#323B49] pt-4 ">${interview.work}</p>
      </div>
      <div>
        <button class="btn interview-btn border-[#10B981] text-[#10B981] mr-2">INTERVIEW</button>
        <button class="btn rejected-btn border-[#EF4444] text-[#EF4444]">REJECTED</button>
      </div>
      `;
    filteredSection.appendChild(div);
  }
}

function renderRejectedCard() {
  filteredSection.innerHTML = "";
  for (let reject of rejectedList) {
    let div = document.createElement("div");
    div.className = "content-card space-y-6 bg-base-100 rounded-lg p-8";
    div.innerHTML = `
       <div class="flex justify-between ">
        <div>
          <h2 class="jobName text-[#002C5C] font-semibold text-[18px]">${reject.jobName}</h2>
          <p class="role">${reject.role}</p>
        </div>
        <div>
          <i class="fa-regular fa-trash-can"></i>
        </div>
      </div>
      <p class="details text-[#64748B]">${reject.details}</p>
      <div>
        <span class="status inline bg-red-400 shadow-none  p-2.5 rounded-md text-[#002C5C] font-semibold">Rejected</span>
        <p class="work text-[#323B49] pt-4 ">${reject.work}</p>
      </div>
      <div>
        <button class="btn interview-btn border-[#10B981] text-[#10B981] mr-2">INTERVIEW</button>
        <button class="btn rejected-btn border-[#EF4444] text-[#EF4444]">REJECTED</button>
      </div>
      `;
    filteredSection.appendChild(div);
  }
}
