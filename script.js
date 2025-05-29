// document.addEventListener("DOMContentLoaded", function(){

// const searchButton = document.getElementById("search-button");
// const usernameInput = document.getElementById("user-input");
// const statsContainer = document.querySelector(".stats-container");
// const easyProgressCircle = document.querySelector(".easy-progress");
// const mediumProgressCircle = document.querySelector(".medium-progress");
// const hardProgressCircle = document.querySelector(".hard-progress");
// const easylabel = document.getElementById("easy-label");
// const mediumlabel = document.getElementById("medium-label");
// const hardLabel = document.getElementById("hard-label");
// const cardStatsContainer = document.querySelector(".stats-card");



// function validateUsername(username){
//     if(username.trim ()==""){
//         alert("username should not be empty"); 
//         return false;
//     }
   
//     const regex = /^[a-zA-Z0-9 -]{1,15}$/; 

//     const isMatching = regex.test(username);
//     if(!isMatching){
//         alert("Invalid Username")
//     }
//     return isMatching;
// }
// async function fetchUserDetails(username){

// try{
//     searchButton.textContent="Searching.."
//     searchButton.disabled= true;
//     const targetUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
//     const response = await fetch(targetUrl);
//     if(!response.ok){
//         throw new Error("unable tp fetch the user details");
//     }
//     const data = await response.json();
//     console.log("logging data", data);
//     displayUserData(data);
// }
// catch(error){
//     if (cardStatsContainer) {
//         cardStatsContainer.innerHTML = `<p>Error fetching user data.</p>`;
//       } else {
//         console.error("Stats container element not found");
        
//       }
// }
// finally{
//     searchButton.textContent="Search";
//     searchButton.disabled = false;
// }
// }
// function updateProgress(solved , total, label, circle){
//     const progressdegree = (solved/total)*100;
//     circle.style.setProperty("--progress-degree", `${progressdegree}%`);
//     label.textContent = `${solved}/${total}`;
// }
// function displayUserData(data){
//     const totalQues= data.data.allQuestionsCount[0].count;
//     const totalEasyQues= data.data.allQuestionsCount[1].count;
//     const totalMediumQues= data.data.allQuestionsCount[2].count;
//     const totalhardQues= data.data.allQuestionsCount[3].count;
//     const solvedTotalQues = data.data.matchedUser.submitStats.acSubmissionNum[0].count;
//     const solvedTotalEasyQues = data.data.matchedUser.submitStats.acSubmissionNum[1].count;
//     const solvedTotalMediumQues = data.data.matchedUser.submitStats.acSubmissionNum[2].count;
//     const solvedTotalHardQues = data.data.matchedUser.submitStats.acSubmissionNum[3].count;
    
//     updateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easyProgressCircle );
//     updateProgress(solvedTotalMediumQues, totalMediumQues, mediumlabel, mediumProgressCircle );
//     updateProgress(solvedTotalHardQues, totalhardQues, hardLabel, hardProgressCircle );
//     cardStatsContainer.innerHTML = `
//     <div class="stat-card">Total Questions: ${totalQues}</div>
//     <div class="stat-card">Total Solved: ${solvedTotalQues}</div>
//     <div class="stat-card">Easy Solved: ${solvedTotalEasyQues}</div>
//     <div class="stat-card">Medium Solved: ${solvedTotalMediumQues}</div>
//     <div class="stat-card">Hard Solved: ${solvedTotalHardQues}</div>
// `;

// }

// searchButton.addEventListener('click', function(){
// const username= usernameInput.value;
// console.log("loggin username", username);
// if(validateUsername(username)){
//     fetchUserDetails(username);

// }

// });


// });

document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    
    // Fixed selectors to match HTML structure
    const easyProgressCircle = document.querySelector(".easy-progress-item-circle");
    const mediumProgressCircle = document.querySelector(".medium-progress-item-circle");
    const hardProgressCircle = document.querySelector(".hard-progress-item-circle");
    
    const easylabel = document.getElementById("easy-label");
    const mediumlabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    // Username validation function
    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        // Regular expression to validate the username
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            
            // Clear previous error messages
            if (cardStatsContainer) {
                cardStatsContainer.innerHTML = '';
            }
            
            const targetUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
            const response = await fetch(targetUrl);
            
            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            
            const data = await response.json();
            console.log("Full API Response:", data);
            console.log("Data type:", typeof data);
            console.log("Data keys:", Object.keys(data));
            
            displayUserData(data);
            
        } catch(error){
            console.error("Error fetching data:", error);
            if (cardStatsContainer) {
                cardStatsContainer.innerHTML = `<p style="color: red; text-align: center;">Error fetching user data: ${error.message}</p>`;
            }
        } finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle){
        if (!circle || !label) {
            console.error("Missing circle or label element");
            return;
        }
        
        const progressPercentage = total > 0 ? (solved/total) * 100 : 0;
        
        // Create or update the progress styling
        circle.style.background = `conic-gradient(
            #00d4aa 0deg ${progressPercentage * 3.6}deg,
            #2a2a2a ${progressPercentage * 3.6}deg 360deg
        )`;
        
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data){
        try {
            console.log("Processing data in displayUserData:", data);
            
            // Let's check different possible structures
            let allQuestions, submitStats;
            
            // Check if data has the nested structure
            if (data && data.data) {
                console.log("Found data.data structure");
                allQuestions = data.data.allQuestionsCount;
                submitStats = data.data.matchedUser?.submitStats?.acSubmissionNum;
                
                console.log("allQuestionsCount:", allQuestions);
                console.log("submitStats:", submitStats);
            } 
            // Check if data is directly the response
            else if (data && data.allQuestionsCount) {
                console.log("Found direct structure");
                allQuestions = data.allQuestionsCount;
                submitStats = data.matchedUser?.submitStats?.acSubmissionNum;
            }
            // Check if data has different property names
            else if (data && data.totalSolved !== undefined) {
                console.log("Found alternative structure");
                // Handle alternative API response structure
                handleAlternativeStructure(data);
                return;
            }
            else {
                console.error("Unknown data structure:", data);
                throw new Error("Unknown API response structure");
            }
            
            if (!allQuestions || !submitStats) {
                console.error("Missing allQuestions or submitStats:", {allQuestions, submitStats});
                throw new Error("Required data not found in API response");
            }
            
            // Safely extract values with defaults
            const totalQues = allQuestions[0]?.count || 0;
            const totalEasyQues = allQuestions[1]?.count || 0;
            const totalMediumQues = allQuestions[2]?.count || 0;
            const totalHardQues = allQuestions[3]?.count || 0;
            
            const solvedTotalQues = submitStats[0]?.count || 0;
            const solvedTotalEasyQues = submitStats[1]?.count || 0;
            const solvedTotalMediumQues = submitStats[2]?.count || 0;
            const solvedTotalHardQues = submitStats[3]?.count || 0;
            
            console.log("Extracted values:", {
                totalQues, totalEasyQues, totalMediumQues, totalHardQues,
                solvedTotalQues, solvedTotalEasyQues, solvedTotalMediumQues, solvedTotalHardQues
            });
            
            // Update progress circles
            updateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easyProgressCircle);
            updateProgress(solvedTotalMediumQues, totalMediumQues, mediumlabel, mediumProgressCircle);
            updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
            
            // Update stats cards
            if (cardStatsContainer) {
                cardStatsContainer.innerHTML = `
                    <div class="stat-card">Total Questions: ${totalQues}</div>
                    <div class="stat-card">Total Solved: ${solvedTotalQues}</div>
                    <div class="stat-card">Easy Solved: ${solvedTotalEasyQues}</div>
                    <div class="stat-card">Medium Solved: ${solvedTotalMediumQues}</div>
                    <div class="stat-card">Hard Solved: ${solvedTotalHardQues}</div>
                `;
            }
            
        } catch (error) {
            console.error("Error in displayUserData:", error);
            if (cardStatsContainer) {
                cardStatsContainer.innerHTML = `<p style="color: red;">Error displaying user data: ${error.message}</p>`;
            }
        }
    }
    
    // Alternative structure handler
    function handleAlternativeStructure(data) {
        try {
            console.log("Handling alternative structure:", data);
            
            // Try to extract data from different possible structures
            const solvedTotalQues = data.totalSolved || 0;
            const solvedTotalEasyQues = data.easySolved || 0;
            const solvedTotalMediumQues = data.mediumSolved || 0;
            const solvedTotalHardQues = data.hardSolved || 0;
            
            // Use default totals if not available
            const totalQues = 3000; // Default total
            const totalEasyQues = 800;
            const totalMediumQues = 1600;
            const totalHardQues = 600;
            
            // Update progress circles
            updateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easyProgressCircle);
            updateProgress(solvedTotalMediumQues, totalMediumQues, mediumlabel, mediumProgressCircle);
            updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
            
            // Update stats cards
            if (cardStatsContainer) {
                cardStatsContainer.innerHTML = `
                    <div class="stat-card">Total Questions: ${totalQues}</div>
                    <div class="stat-card">Total Solved: ${solvedTotalQues}</div>
                    <div class="stat-card">Easy Solved: ${solvedTotalEasyQues}</div>
                    <div class="stat-card">Medium Solved: ${solvedTotalMediumQues}</div>
                    <div class="stat-card">Hard Solved: ${solvedTotalHardQues}</div>
                `;
            }
        } catch (error) {
            console.error("Error in handleAlternativeStructure:", error);
            throw error;
        }
    }

    // Search button event listener
    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logging username", username);
        
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    });
    
    // Add Enter key support for input field
    usernameInput.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            const username = usernameInput.value;
            if(validateUsername(username)){
                fetchUserDetails(username);
            }
        }
    });
});