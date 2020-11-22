function signupView() {
  let signupView = $(`
  <div className="Signup">
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
                    <i class="fas fa-user"></i>
                  </span>
                </p>
              </div>
              
              <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="email" placeholder="Email" id="email">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
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
                <label class="label">Major</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Computer Science" id="major">
                  <span class="icon is-small is-left">
                    <i class="fas fa-book"></i>
                  </span>
                </p>
              </div>
              
              <div class="field">
                <label class="label">Graduating Year</label>
                <div class="control">
                  <div class="select">
                    <select id="year">
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
                  <div class="select">
                      <select id="house">
                        <option>On Campus</option>
                        <option>Off Campus</option>
                      </select>
                  </div>
                </div>
              </div>
              
              <div class="field">
                <label class="label">Pronouns</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea" id="pros"></textarea>
                </div>
              </div>
              
              <div class="field">
                <div class="buttons is-right">
                  <button class="button is-link is-light" id="cancelButton">Cancel</button>
                  <button class="button is-link" id="signupButton">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</section>
`);

$('#root').on('click', '#cancelButton', function(event) {
  $('#root').remove();
  $('body').append(`<div id="root">`);
  $('#root').append(landingView());
});

$('#root').on('click', '#signupButton', async function(event) {
  try{
    event.preventDefault();
  
    let us = $('#user.input').val();
    let pa = $('#pass.input').val();
    let em = $('#email.input').val();
    let ho = $('#house.input').val();
    let ma = $('#major.input').val();
    let ye = $('#year.input').val();
    let pr = $('#pros.input').val();

    console.log(us);
    console.log(pa);
    console.log(em);
    console.log(ho);
    console.log(ma);
    console.log(ye);
    console.log(pr);

    alert("here");
    /*
    let res = await axios({
      method: 'post',
      url: 'https://stark-depths-67325.herokuapp.com/signup',
      withCredentials: true,
      data: {
        user: us,
        password: pa,
        email: em,
        major: ma,
        year: ye,
        house: ho,
        pronouns: pr,
      }
    });
    */

    $('#root').remove();
    $('body').append(`<div id="root">`);
    $('#root').append(landingView());
  } catch {
    $('#form').append(`<p>Failed Sign Up. Ensure all fields are corrent and enter new username if problem persists.</p>`);
  }
});
    return signupView;
}