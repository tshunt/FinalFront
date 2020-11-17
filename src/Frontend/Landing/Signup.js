function signupView() {
  let signupView = $(`
  <div className="Signup">
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
                <label class="label">Name</label>
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="First and Last">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>
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
                <label class="label">Major</label>
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Computer Science">
                  <span class="icon is-small is-left">
                    <i class="fas fa-book"></i>
                  </span>
                </p>
              </div>
              
              <div class="field">
                <label class="label">Graduating Year</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label">Housing Status</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="question">
                    On-Campus
                  </label>
                  <label class="radio">
                    <input type="radio" name="question">
                    Off-Campus
                  </label>
                </div>
              </div>
              
              <div class="field">
                <label class="label">Pronouns</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea"></textarea>
                </div>
              </div>
              
              <div class="field">
                <div class="buttons is-right">
                  <button class="button is-link is-light">Cancel</button>
                  <button class="button is-link">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</section>
`);
    return signupView;
}