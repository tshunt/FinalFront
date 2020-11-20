let curDiv;
function postingView() {
    let postingView = $(`
    <div className="Postings">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <img src="https://pixy.org/src/70/707393.gif" alt="UNC Logo" width="70" height="70" />
        </a>
      </div>
      <div id="navbarMain" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Postings
          </a>
          <a class="navbar-item">
            Calendar
          </a>
          <a class="navbar-item">
            Location Recommendations
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
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

  <section class="section">
    <div class="container">
        <h1 class="title is-size-1 has-text-white has-text-centered">
            Postings
        </h1>
        <div>
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search Classes">
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <br>
        <div>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child box is-flex is-horizontal-center" id="new_posting">
                <i class="icon fas fa-plus is-large"></i>
              </div>
            </div>
          </div>
        </div>
        <br>
    </div>
  </section>
  <br>
  <br>  
  `);
  appendMeetings();

  $('#root').on('click', '#new_posting', function(event) {
    let blank = $(`
    <div class="card" id="commentCard${meeting.id}">
      <div class="card-content">
          <button class="button" id="commentButton">Add a comment</button>
      </div>
    </div>
    `);
    $('#editCard').replaceWith(blank);
  });

  return postingView;
}

function printAttendees(attendees) {
  let att = '';
  attendees.forEach(x => att += x + ', ');
  return att;
}

function commentView(meeting) {
  let commentView = $(`
    <div class="card" id="editCard">
      <div class="card-content">
        <div class="field">
          <p class="control">
              <textarea id="commentBody" class="input" type="text" placeholder="Add a comment"></textarea>
          </p>
        </div>
        <div>
          <button class="button is-info" id="submitButton">Submit</button>
          <button class="button" id="cancelButton">Cancel</button>
        </div>
      </div>
    </div>
  `);

  $('#root').on('click', '#cancelButton', function(event) {
    let blank = $(`
    <div class="card" id="commentCard${meeting.id}">
      <div class="card-content">
          <button class="button" id="commentButton">Add a comment</button>
      </div>
    </div>
    `);
    $('#editCard').replaceWith(blank);
  });


  $('#root').one('click', '#submitButton', async function(event) {
    let newComment = $('#commentBody.input').val();
    let c = await axios({
      method: 'post',
      url: 'https://stark-depths-67325.herokuapp.com/meeting/comment/'+meeting.id,
      withCredentials: true,
      data: {
        comment: newComment,
      },
    });

    let comment = $(`
    <div class="card">
      <div class="card-content">
        <p>${newComment}</p>
      </div>
    </div>
    `)
    $('#editCard').replaceWith(comment);
  })
  return commentView;
}


function meetingView(meeting) {
  let meetingView = $(`
      <div class="card" id="fullDiv${meeting.id}">
        <header class="card-header">
            <h2 class="card-header-title is-size-3">
                ${meeting.className}
            </h2>
        </header>
        <div class="card-content" id="mainCard${meeting.id}">
            <p><strong>Author:</strong> ${meeting.owner} </p>
            <p><strong>Date and time:</strong> ${meeting.date} ${meeting.time} </>
            <p is-size-5><strong>Location:</strong> ${meeting.location}</p>
            <br>
            <p is-size-5><strong>Description:</strong> ${meeting.desc}</p>
            <br>
            <br>
            <p is-size-5><strong>Current Attendees:</strong> ${meeting.owner}, ${printAttendees(meeting.attendees)} </p>
            <br>
            <button class="button" id="joinMtgButton${meeting.id}">Join Meeting</button>
        </div>
      </div>
  `);

  meetingView.append(`
  <h1 class="title is-size-5 has-text-centered">Comments </h1>
  `);
  if (meeting.comments.length !== 0) {
    meeting.comments.forEach(msg => {
        meetingView.append(`
        <div class="card">
            <div class="card-content">
                <p>${msg}</p>
            </div>
        </div>
      `)
    })
    meetingView.append(`
    <div class="card" id="commentCard${meeting.id}">
        <div class="card-content">
            <button class="button" id="commentButton${meeting.id}">Add a comment</button>
        </div>
    </div>
  `)
  } else {
    meetingView.append(`
    <div class="card" id="commentCard${meeting.id}">
        <div class="card-content">
            <button class="button" id="commentButton${meeting.id}">Add a comment</button>
        </div>
    </div>
    `)
  }

  $('#root').one('click', '#joinMtgButton'+meeting.id, async function(event) {
    try {
      let c = await axios({
        method: 'post',
        url: 'https://stark-depths-67325.herokuapp.com/meeting/join/'+meeting.id,
        withCredentials: true,
      });

      let newDiv = meetingView(meeting);

      $('#fullDiv'+meeting.id).replaceWith(newDiv);

    } catch(error) {
      $('#mainCard'+meeting.id).append(`<p>Already joined meeting!</p>`);
    }
  })

  $('#root').on('click', '#commentButton'+meeting.id, async function(event) {
    let comment = commentView(meeting);
    $('#commentCard'+meeting.id).replaceWith(comment);
  })
  return meetingView;
}

async function appendMeetings() {
    let meetings = await axios({
        method: 'get',
        url: 'https://stark-depths-67325.herokuapp.com/meeting',
        withCredentials: true,
    });

    meetings = meetings.data;

    meetings.forEach(async (mtg) => {
        let meeting = await axios({
            method: 'get',
            url: 'https://stark-depths-67325.herokuapp.com/meeting/'+mtg,
            withCredentials: true,
        });
        $('.container').append(meetingView(meeting.data));
        $('.container').append(`<br>`);
    })
};