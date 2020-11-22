let currUser;
let meetingUser;
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
        <div id="addNew">
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
  userCheck();

  $('#root').on('click', '#new_posting', function(event) {
    let newPostingDiv = newPosting();
    $('#addNew').append(newPostingDiv);
  });

  return postingView;
}

function editPosting(meeting) {
  let editPostingDiv = $(`
  <div class="card" id="editPostingDiv">
    <header class="card-header">
      <h2 class="card-header-title is-size-3">
        Edit Meeting
      </h2>
    </header>
    <div class="card-content">
        <div class="control">
          <textarea id="className" class="input" type="text">${meeting.className}</textarea>
        </div>
        <div class="control">
          <textarea id="date" class="input" type="text">${meeting.date}</textarea>
        </div>
        <div class="control">
          <textarea id="time" class="input" type="text">${meeting.time}</textarea>
        </div>
        <div class="control">
          <textarea id="location" class="input" type="text">${meeting.location}</textarea>
        </div>
        <br>
        <div class="control">
          <textarea id="description" class="input" type="text">${meeting.desc}</textarea>
        </div>
        <br>
        <br>
        <button class="button is-info" id="submitButton">Submit</button>
        <button class="button" id="cancelButton">Cancel</button>
    </div>
  </div>
`);

$('#root').on('click', '#cancelButton', function(event) {
  let oldMeeting = meetingView(meeting);
  $('#editPostingDiv').replaceWith(oldMeeting);
});

$('#root').one('click', '#submitButton', async function(event) {
  let className = $('#className.input').val();
  let date = $('#date.input').val();
  let time = $('#time.input').val();
  let location = $('#location.input').val();
  let description = $('#description.input').val();

  let updated = await axios({
    method: 'put',
    url: 'https://stark-depths-67325.herokuapp.com/meeting/'+meeting.id,
    withCredentials: true,
    data: {
      className: className,
      time: time,
      date: date,
      attendees: meeting.attendees,
      location: location,
      desc: description,
      comments: meeting.comments
    },
  });

  meeting.className = className;
  meeting.time = time;
  meeting.date = date;
  meeting.location = location;
  meeting.desc = description;

  let newDiv = meetingView(meeting);

  $('#editPostingDiv').replaceWith(newDiv);

})

return editPostingDiv;

}

function newPosting() {
  let newPostingView = $(`
    <div class="card" id="newPostingDiv">
      <header class="card-header">
        <h2 class="card-header-title is-size-3">
          Create a New Meeting
        </h2>
      </header>
      <div class="card-content">
          <div class="control">
            <textarea id="className" class="input" type="text" placeholder="Course Number"></textarea>
          </div>
          <div class="control">
            <textarea id="date" class="input" type="text" placeholder="Meeting Date (MM/DD/YYYY)"></textarea>
          </div>
          <div class="control">
            <textarea id="time" class="input" type="text" placeholder="Meeting Time (HH:MM AM/PM)"></textarea>
          </div>
          <div class="control">
            <textarea id="location" class="input" type="text" placeholder="Meeting Location"></textarea>
          </div>
          <br>
          <div class="control">
            <textarea id="description" class="input" type="text" placeholder="A short description of the meeting"></textarea>
          </div>
          <br>
          <br>
          <button class="button is-info" id="submitButton">Submit</button>
          <button class="button" id="cancelButton">Cancel</button>
      </div>
    </div>
  `);

  $('#root').on('click', '#cancelButton', function(event) {
    $('#newPostingDiv').remove();
  });

  $('#root').one('click', '#submitButton', async function(event) {
    let className = $('#className.input').val();
    let date = $('#date.input').val();
    let time = $('#time.input').val();
    let location = $('#location.input').val();
    let description = $('#description.input').val();

    let reply = await axios({
      method: 'post',
      url: 'https://stark-depths-67325.herokuapp.com/meeting',
      withCredentials: true,
      data: {
        className: className,
        time: time,
        date: date,
        attendees: [],
        location: location,
        desc: description,
        comments: []
      },
    });
    let newDiv = meetingView(reply.data);

    $('#newPostingDiv').replaceWith(newDiv);

  })

return newPostingView;

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
  let meetingViewDiv = $(`
      <div class="card" id="fullDiv${meeting.id}">
        <header class="card-header">
            <h2 class="card-header-title is-size-3">
                ${meeting.className}
            </h2>
        </header>
        <div class="card-content" id="mainCard${meeting.id}">
            <p><strong>Creator:</strong> ${meeting.owner} </p>
            <p><strong>Date and time:</strong> ${meeting.date} ${meeting.time} </>
            <p is-size-5><strong>Location:</strong> ${meeting.location}</p>
            <br>
            <p is-size-5><strong>Description:</strong> ${meeting.desc}</p>
            <br>
            <br>
            <p is-size-5><strong>Current Attendees:</strong> ${printAttendees(meeting.attendees)} </p>
            <br>
            <button class="button" id="joinMtgButton${meeting.id}">Join Meeting</button>
            <button class="button is-info" id="editButton${meeting.id}">Edit</button>
            <button class="button is-info" id="deleteButton${meeting.id}">Delete</button>
        </div>
      </div>
  `);

  //control edit and delete vis
  if(meeting.owner !== currUser) {
    meetingViewDiv.find('#editButton'+meeting.id).hide();
    meetingViewDiv.find('#deleteButton'+meeting.id).hide();
  } else {
    meetingViewDiv.find('#joinMtgButton'+meeting.id).hide();
  }


  meetingViewDiv.append(`
  <h1 class="title is-size-5 has-text-centered">Comments </h1>
  `);
  if (meeting.comments.length !== 0) {
    meeting.comments.forEach(msg => {
        meetingViewDiv.append(`
        <div class="card">
            <div class="card-content">
                <p>${msg}</p>
            </div>
        </div>
      `)
    })
    meetingViewDiv.append(`
    <div class="card" id="commentCard${meeting.id}">
        <div class="card-content">
            <button class="button" id="commentButton${meeting.id}">Add a comment</button>
        </div>
    </div>
  `)
  } else {
    meetingViewDiv.append(`
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

      meeting.attendees.push(currUser);

      let newDiv = meetingView(meeting);

      $('#fullDiv'+meeting.id).replaceWith(newDiv);

    } catch(error) {
      $('#mainCard'+meeting.id).append(`<p>Already joined meeting!</p>`);
    }
  })

  $('#root').one('click', '#editButton'+meeting.id, async function(event) {
    let editDiv = editPosting(meeting);

    $('#fullDiv'+meeting.id).replaceWith(editDiv);
  })

  $('#root').one('click', '#deleteButton'+meeting.id, async function(event) {
    let del = await axios({
      method: 'delete',
      url: 'https://stark-depths-67325.herokuapp.com/meeting/'+meeting.id,
      withCredentials: true,
    });

    $('#fullDiv'+meeting.id).remove();
  })

  $('#root').on('click', '#commentButton'+meeting.id, async function(event) {
    let comment = commentView(meeting);
    $('#commentCard'+meeting.id).replaceWith(comment);
  })
  return meetingViewDiv;
}

async function userCheck() {
  try {
    let loggedIn = await axios({
      method: 'get',
      url: 'https://stark-depths-67325.herokuapp.com/userInfo',
      withCredentials: true,
    });
    $('.buttonsDiv').replaceWith('<p padding = "8px">Welcome back, ' + loggedIn.data.user + '!  </p> <a class="button is-info" id="logout"><strong>Logout</strong></a>');

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

    currUser = loggedIn.data.user;
  } catch (error) {

  }
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