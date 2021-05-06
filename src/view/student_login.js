const login = document.getElementById('log');
login.addEventListener('click', function(e) {
    console.log("btn clicked");
    fetch('/login_stu', {method:'POST'})
        .then(function(response) {
            if (response.ok) {
                console.log('login successful');
                return;
            }
            throw new Error("login failed");
        })
        .catch(function(error) {
            console.log(error);
        });
});