let landingViewDiv;
function landingView() {
    landingViewDiv = $(`
    <div className="Landing">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img src="https://pixy.org/src/70/707393.gif" alt="UNC Logo" width="70" height="70" />
          </a>
        </div>
        <div id="navbarMain" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" id="postingsButton">
              Postings
            </a>
            <a class="navbar-item" id="calendarButton">
              My Meetings
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttonsDiv">
                <a class="button is-info" id="signUpButton">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light" id="loginButton">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

      <section class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Find a Study Buddy!
            </h1>
            <h2 class="subtitle">
              The #1 place for UNC students to connect
            </h2>
          </div>
        </div>
      </section>
      <br>

      <article class="message is-large is-light">
        <div class="message-header">
          <p>Tired of studying alone?</p>
        </div>
        <div class="message-body">
          Welcome to Find a Study Buddy! Are you tired of struggling on exams because you have no one
          to study with? Need someone to keep you accountable while you study so that you don't spend
          six hours on Twitter? Have a noisy roommate who won't let you study in peace? You've come
          to the right place! Here at Find a Study Buddy, we hope to help you match up with other
          UNC students in your classes so you can find a study partner.
        </div>
      </article>

      <div class="containter has-text-centered">
        <h1 class="title has-text-light">How it works:</h1>
      </div>
      <br>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box has-text-centered has-background-info">
            <h1 class="title has-text-white">
              Make an account
            </h1>
            <i class="icon fas fa-user-edit is-large" style="color:white"></i>
            <p class="has-text-white">Use the sign up button above to make a new account</p>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box has-text-centered has-background-info">
            <h1 class="title has-text-white">
              Submit a posting
            </h1>
            <i class="icon far fa-keyboard is-large" style="color:white"></i>
            <p class="has-text-white">Go to the forum and write a new posting describing what class you need help with
            and what you're looking for in a study partner</p>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box has-text-centered has-background-info">
            <h1 class="title has-text-white">
              Find a buddy!
            </h1>
            <i class="icon fas fa-users is-large" style="color:white"></i>
            <p class="has-text-white">Wait for another student to respond, or try responding to someone's posting!</p>
          </div>
        </div>
      </div>

      <article class="message is-large is-light">
        <div class="message-header">
          <p>Sounds like fun?</p>
        </div>
        <div class="message-body">
          We're glad you agree! Sign up using the button at the top of the page, then try checking
          out the calendar or forum tabs to set up a meeting!
        </div>
      </article>
      <br>
      <br>
      <br>
      <br>
    `);
    lUserCheck();

    $('#root').on('click', '#signUpButton', function(event) {
      $('#root').remove();
      $('body').append(`<div id="root">`);
      $('#root').append(signupView());
    })

    $('#root').on('click', '#loginButton', function(event) {
      $('#root').remove();
      $('body').append(`<div id="root">`);
      $('#root').append(loginView());
    })

    $('#root').on('click', '#postingsButton', function(event) {
      $('#root').remove();
      $('body').append(`<div id="root">`);
      $('#root').append(postingView());
    })
    return landingViewDiv;
}

async function lUserCheck() {
  try {
    let loggedIn = await axios({
      method: 'get',
      url: 'https://stark-depths-67325.herokuapp.com/userInfo',
      withCredentials: true,
    });
    $('.buttonsDiv').replaceWith('<p style="padding-right: 8px">Welcome back, ' + loggedIn.data.user + '!  </p> <a class="button is-info" id="logout"><strong>Logout</strong></a>');

    $('#root').on('click', '#logout', async function(event) {
      let logout = await axios({
        method: 'get',
        url: 'https://stark-depths-67325.herokuapp.com/logout',
        withCredentials: true,
      });
      $('#root').remove();
      $('body').append(`<div id="root">`);
      $('#root').append(landingView());
    });

    landingViewDiv.find('.navbar-start').show();
    return true;
  } catch (error) {
    landingViewDiv.find('.navbar-start').hide();

  }
}
