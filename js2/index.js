const nextButton = document.getElementById('nextbutton');
const backButton = document.getElementById('backbutton');
const title = document.getElementById('title');
const description = document.getElementById('description');
const image = document.getElementById('img');
const voteButton = document.getElementById('voteButton');
const voteCount = document.getElementById('vote');
const donateButton = document.getElementById('donationButton');
const donateCount = document.getElementById('donation');




let index = 0;
let obj = [];
function updateContent() {
    if (obj && obj.length > 0 && index >= 0 && index < obj.length) {
        const currentItem = obj[index];
        title.textContent = (index + 1) + ". sayfa " + (currentItem.title || ''); 
        description.textContent = currentItem.description || '';
        image.src = currentItem.picture1
        voteCount.textContent = "current vote: " + (currentItem.vote_count || '0');
        donateCount.textContent = "current donation: " + (currentItem.donate || '0');
    } else {
        title.textContent = "Content Error";
        description.textContent = "dsadas";
        image.src = "";
        voteCount.textContent = "current vote: N/A";
        donateCount.textContent = "current donation: N/A";
    }
}
fetch('./projects.json') // Assumes current.json is in the same folder or accessible via URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        obj = data; // Store the fetched data
        console.log("Data loaded:", obj); // Check console to verify
        updateContent(); // Update content with the first item
    })
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
        title.textContent = "Failed to load data"; // Show error to user
    });

updateContent(); // Initial call to set the first page content
updateContent();
nextButton.onclick = function() {
    index++;
    if (index >= obj.length) {
        alert("No more pages available.");
        index = obj.length  // Prevent going out of bounds
    }else{
        updateContent(); // Update content with the next item
    }
}
backButton.onclick = function() {
    index--;
    if (index < 0) {
        alert("No previous pages available.");
        index = 0; // Prevent going out of bounds
    }else{
    updateContent(); // Update content with the previous item
    }   
}

