axios.get('https://api.spoonacular.com/recipes/complexSearch?', {
    params: {
        query: "a",
        apiKey: "417c1c1cbfda401383b6ac4eac4b5eb5"
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
    });