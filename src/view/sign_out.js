const signOut = document.getElementById('out');
signOut.addEventListener('click', function(e) {
    console.log("btn clicked");
    fetch('/signOut', {method:'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log('Sign Out successful');
            return;
        }
        throw new Error("Sign Out failed");
    })
    .catch(function(error) {
    console.log(error);
    });
});
