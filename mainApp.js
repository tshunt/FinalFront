export const loadPage = function() {
    const $root = $('#root');

    $root.append(landingView());
}

$(function() {
    loadPage();
});
