function loginView() {
    let loginView = $(`
    <div className="Login">
    <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <form action="" class="box">
              <div class="content has-text-centered">
              <p class="title is-spaced">Find a Study Buddy!</p>
              </div>
              
              <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="email" placeholder="Email">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div class="field">
                <div class="buttons is-right">
                  <button class="button is-link is-light">Cancel</button>
                  <button class="button is-link">Login</button>
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
    return loginView;
}