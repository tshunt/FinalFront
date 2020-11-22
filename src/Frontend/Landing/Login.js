function loginView() {
    let loginView = $(`
    <div className="Login">
    <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <form action="" class="box" id="form">
              <div class="content has-text-centered">
              <p class="title is-spaced">Find a Study Buddy!</p>
              </div>
              
              <div class="field">
                <label class="label">Username</label>
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="Username" id="user">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user-circle"></i>
                  </span>
                </p>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password" id="pass">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div class="field">
                <div class="buttons is-right">
                  <button class="button is-link is-light" id="cancel">Cancel</button>
                  <button class="button is-link" id="login">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</section>
</div>
`);

$('#root').on('click', '#cancel', function(event) {
  $('#root').remove();
  $('body').append(`<div id="root">`);
  $('#root').append(landingView());
});

$('#root').on('click', '#login', async function(event) {
  try{
    event.preventDefault();
    let user = $('#user.input').val();
    let pass = $('#pass.input').val();

    let res = await axios({
      method: 'post',
      url: 'https://stark-depths-67325.herokuapp.com/login',
      withCredentials: true,
      data: {
        user: user,
        password: pass
      }
    });

    $('#root').remove();
    $('body').append(`<div id="root">`);
    $('#root').append(postingView());
    
  } catch {
    alert("error");
    $('#form').append(`<p>Error: Incorrect or Missing Credentials.</p>`);
  }
});

    return loginView;
}