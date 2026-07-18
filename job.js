let interviewList = [];
let rejectedList = [];


let totalCount = document.getElementById("total");
let avilavilJob = document.getElementById("job")
let interviewingCount = document.getElementById("interview")
let rejectedCount = document.getElementById("rejected")


const totalCard = document.getElementById("all-card")
const mainContainer = document.querySelector('main');
const filterContainer = document.getElementById('filter-section')
// console.log(mainContainer)

function calCulate() {
    totalCount.innerText = totalCard.children.length;
    avilavilJob.innerText = totalCard.children.length;
    interviewingCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
calCulate()

const buttons = [
    allNamedBtn = document.getElementById('all-filter-btn'),
    interviewBtn = document.getElementById('interview-filter-btn'),
    rejectedBtn = document.getElementById('rejcted-filter-btn')
]

let currentPage = 'all'
function activeBtn(id) {
    buttons.forEach(button => {
        button.classList.remove('btn-primary')
    })

    const selected = document.getElementById(id)
    if (id == 'all-filter-btn') currentPage = 'all';
    else if (id == 'interview-filter-btn') currentPage = 'interviewPage';
    else if (id == 'rejcted-filter-btn') currentPage = 'rejectedPage'


    selected.classList.add('btn-primary')
    if (id == 'interview-filter-btn') {
        totalCard.classList.add("hidden")
        filterContainer.classList.remove("hidden");
        interViewerPage()
    } else if (id == 'all-filter-btn') {
        totalCard.classList.remove("hidden")
        filterContainer.classList.add("hidden")
    } else if (id == 'rejcted-filter-btn') {
        totalCard.classList.add("hidden")
        filterContainer.classList.remove("hidden")
        rejectedPersonPage()
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company').innerText
        const role = parentNode.querySelector('.role').innerText
        const location = parentNode.querySelector('.location').innerText
        const status = parentNode.querySelector('.application').innerText;
        const notes = parentNode.querySelector('.detail').innerText

        const jobInfo = {
            companyName,
            role,
            location,
            status: 'INTERVIEW',
            notes
        };

        parentNode.querySelector('.application').innerText = 'INTERVIEW'
        const jobListExist = interviewList.find(post => post.companyName == jobInfo.companyName);
        if (!jobListExist) {
            interviewList.push(jobInfo)
            // console.log(interviewList)
        }
        rejectedList = rejectedList.filter(reject => reject.companyName !== jobInfo.companyName)
        calCulate()
        if (currentPage == 'interviewPage') {
            interViewerPage()
        } else if (currentPage == 'rejectedPage') {
            rejectedPersonPage()
        }

    } else if (event.target.classList.contains('rejected')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company').innerText
        const role = parentNode.querySelector('.role').innerText
        const location = parentNode.querySelector('.location').innerText
        const status = parentNode.querySelector('.application').innerText;
        const notes = parentNode.querySelector('.detail').innerText

        const jobInfo = {
            companyName,
            role,
            location,
            status: 'RJECTED',
            notes
        };

        parentNode.querySelector('.application').innerText = 'REJECTED'
        const jobListExist = rejectedList.find(post => post.companyName == jobInfo.companyName);
        if (!jobListExist) {
            rejectedList.push(jobInfo)
            // console.log(interviewList)
        }
        interviewList = interviewList.filter(interviwer => interviwer.companyName !== jobInfo.companyName)
        calCulate()
        if (currentPage == 'interviewPage') {
            interViewerPage()
        } else if (currentPage == 'rejectedPage') {
            rejectedPersonPage()
        }

    } else if (event.target.classList.contains("delete-btn")) {
        const parentNode = event.target.parentNode.parentNode.parentNode;
        const companyName = parentNode.querySelector(".company").innerText;
        interviewList = interviewList.filter(interviwer => interviwer.companyName !== companyName);
        rejectedList = rejectedList.filter(reject => reject.companyName !== companyName);

        const allJob = document.querySelectorAll('#all-card>div');
        allJob.forEach(job => {
            const originalPageJobCompanyName = job.querySelector('.company').innerText;
            if (originalPageJobCompanyName == companyName) {
                job.remove()
            }
        })

        calCulate()
        if (currentPage == 'interviewPage') {
            interViewerPage()
        } else if (currentPage == 'rejectedPage') {
            rejectedPersonPage()
        }

    }



})

function interViewerPage() {
    filterContainer.innerHTML = "";
    interviewList.forEach(interviewer => {
        const interViewPage = document.createElement("div");
        interViewPage.className = "flex justify-between p-5 shadow-sm";
        interViewPage.innerHTML = `
        <div class="left space-y-5">
                    <div>
                        <h2 class="company font-semibold text-4xl">${interviewer.companyName}</h2>
                        <p class="role text-black-100 mt-2 text-lg">${interviewer.role}</p>
                    </div>
                    <p class="location">📍San Francisco, CA • Full-time • $110,000 - $145,000</p>
                    <div>
                        <button class="application btn btn-secondary text-black bg-slate-200">${interviewer.status}</button>
                    </div>
                    <div>
                        <p class="detail">Build responsive web applications using React, JavaScript, and Tailwind CSS.
                            Collaborate with designers to create fast and modern user interfaces.</p>
                    </div>
                    <div>
                        <button class="btn btn-primary interview">INTERVIEW</button>
                        <button class="btn btn-error rejected">REJECTED</button>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <button class="btn delete-btn rounded-full"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
            </div>`
        filterContainer.appendChild(interViewPage)
    })
}
function rejectedPersonPage() {
    filterContainer.innerHTML = "";
    rejectedList.forEach(interviewer => {
        const interViewPage = document.createElement("div");
        interViewPage.className = "flex justify-between p-5 shadow-sm";
        interViewPage.innerHTML = `
        <div class="left space-y-5">
                    <div>
                        <h2 class="company font-semibold text-4xl">${interviewer.companyName}</h2>
                        <p class="role text-black-100 mt-2 text-lg">${interviewer.role}</p>
                    </div>
                    <p class="location">📍San Francisco, CA • Full-time • $110,000 - $145,000</p>
                    <div>
                        <button class="application btn btn-secondary text-black bg-slate-200">${interviewer.status}</button>
                    </div>
                    <div>
                        <p class="detail">Build responsive web applications using React, JavaScript, and Tailwind CSS.
                            Collaborate with designers to create fast and modern user interfaces.</p>
                    </div>
                    <div>
                        <button class="btn btn-primary interview">INTERVIEW</button>
                        <button class="btn btn-error rejected">REJECTED</button>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <button class="btn delete-btn rounded-full"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
            </div>`
        filterContainer.appendChild(interViewPage)
    })
}
