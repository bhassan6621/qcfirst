const addCourseBtn = document.getElementById('submit');
addCourseBtn.addEventListener('click', function(e) {
    console.log("btn clicked");
    fetch('/addClass', {method:'POST'})
        .then(function(response) {
            if (response.ok) {
                console.log('class was added');
                return;
            }
            throw new Error("request failed");
        })
        .catch(function(error) {
            console.log(error);
        });
});