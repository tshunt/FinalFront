export const loadPage = async function() {
    const $root = $('#root');
    let login = await axios({
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
