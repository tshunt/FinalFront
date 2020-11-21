export const loadPage = async function() {
    const $root = $('#root');
    // let signup = await axios({
    //     method:'post',
    //     url: `https://stark-depths-67325.herokuapp.com/signup`,
    //     withCredentials: true,
    //     data: {
    //         user: "Hannah",
    //         password: "passwor",
    //         email: "blah@gmail.com",
    //         grad: "2021",
    //         house: "Off campus",
    //         pronouns: "she/her"
    //     }
    // })

    let signin = await axios({
        method:'post',
        url: `https://stark-depths-67325.herokuapp.com/login`,
        withCredentials: true,
        data: {
            user: "rachel",
            password: "password",
        }
    })


    $root.append(landingView());
}

$(function() {
    loadPage();
});
