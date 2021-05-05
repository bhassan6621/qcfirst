// const addCourseBtn = document.getElementById('submit');
// addCourseBtn.addEventListener('click', function(e) {
//     console.log("btn clicked");
//     fetch('/addClass', {method:'POST'})
//         .then(function(response) {
//             if (response.ok) {
//                 console.log('class was added');
//                 return;
//             }
//             throw new Error("request failed");
//         })
//         .catch(function(error) {
//             console.log(error);
//         });


// });
const searchCourseBtn = document.getElementById("searchClassBtn");
const tableBody = document.getElementById("searchClassTable");

// searchCourseBtn.addEventListener('click', function(e) {
//     console.log("btn clicked");
//     fetch('/searchClass', {method:'post'})
//         .then(function(response) {
//             if (response.ok) {
//                 console.log('class was added');
//                 return;
//             }
//             throw new Error("request failed");
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// });

searchCourseBtn.addEventListener('click', fetchUserData);


function fetchUserData() {
    fetch('/searchClass', {method:'post'})
        .then(function(response) {
            if (response.ok) {
                console.log('class was added');
                window.location.href="http://192.168.1.198:8080/Student_searchClass.html";
                return;
            }
            throw new Error("request failed");
        })
        .catch(function(error) {
            console.log(error);
        });
    var request = new XMLHttpRequest();
    request.open('post', 'http://192.168.1.198:8080/searchClass', true);
    request.responseType = 'text';
    request.onload = () => {
        console.log("here");
        console.log(request.response);
        if(request.status >= 200 && request.status < 400) {
            window.location.href="http://192.168.1.198:8080/Student_searchClass.html";
            request.response.forEach((course) => {
                console.log(course.courseId)
            })
        } else {
            console.log("error");
        }
    }
    request.send();
}
