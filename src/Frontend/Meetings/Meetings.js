let user;
function allMeetingsView() {
    let currMeetingView = $(`
    <div className="Postings">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <img src="https://pixy.org/src/70/707393.gif" alt="UNC Logo" />
        </a>
      </div>
      <div id="navbarMain" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" id="postingsButton">
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
            My Meetings
        </h1>
       
        <br>
        <div>
          <div class="tile is-ancestor">
            
          </div>
        </div>
        <br>
    </div>
  </section>
  <br>
  <br>  
  `);

  //listener for postings tab
  $('#root').on('click', '#postingsButton', function(event) {
    $('#root').remove();
    $('body').append(`<div id="root">`);
    $('#root').append(postingView());
  })

    //sets header based on login
    userCheck();

    //retrieve meetings data
    getMeetingsData();

    //never remove anything below this part
    return currMeetingView;
}

//Helper functions
async function getMeetingsData() {
    let meetings = await axios({
        method: 'get',
        url: 'https://stark-depths-67325.herokuapp.com/meeting/user',
        withCredentials: true,
    });

    meetings = meetings.data;

    if(meetings.length === 0) {
      $('.container').append(`<h2 class="subtitle has-text-white has-text-centered">No meetings joined. Why don't you head to the postings tab and check some out?</h2>`);
    }

    // console.log(meetings);

    meetings.forEach(async (mtg) => {
        let meeting = await axios({
            method: 'get',
            url: 'https://stark-depths-67325.herokuapp.com/meeting/' + mtg,
            withCredentials: true,
        });
        // generateReadableDate(meeting.data.date, meeting.data.time);
        $('.container').append(generateMeetingView(meeting.data));
        $('.container').append(`<br>`);
    })
}


function generateMeetingView(data) {
    let curr_meeting = $(`
      <div class="card" id="fullDiv${data.id}">
        <header class="card-header">
            <h2 class="card-header-title is-size-3">
                ${data.className}
            </h2>
        </header>
        <div class="card-content" id="mainCard${data.id}">
            ${getMeetingStatus(data.date)}

        <footer class="card-footer mt-5 mb-5">
            <p class="card-footer-item is-size-6"> <strong>Location:</strong> ${data.location} </p>
            <p class="card-footer-item is-size-6" id="weather${data.id}"> <button class="button is-loading">Loading</button> </p>
        </footer>

            <p><strong>The meeting owner:</strong> ${data.owner} </p>
            <p><strong>Date and time:</strong> ${generateReadableDate(data.date, data.time)} </>


            <br>
            <br>
            <p is-size-5><strong>Description:</strong> ${data.desc}</p>
            <br>
            <p is-size-5><strong>Current Attendees:</strong> ${printAttendees(data.attendees)} </p>
            <br>

            <!--<button class="button" id="cancelButton${data.id}">Cancel Meeting</button>-->
        </div>
      </div>
  `);
    getWeatherData(data.date, data.id);
    return curr_meeting;
}

/**
 * Helper method to create easily readable date of the meeting of the format:
 * "Sunday, December 25, 2020 at 4:00 pm"
 * @param {*} date 
 */
function generateReadableDate(date, time) {
    //Has format "Fri Dec 25 2020 00:00:00 GMT-0500 (Eastern Standard Time)"    
    //Use this var for all date manipulations, because argument "date" is string
    let upd_date = new Date(date);

    let day_week; //will store String w/ day of the week "Monday", "Tuesday", "Wednesday" and etc

    switch (upd_date.getDay()) {
        case 0:
            day_week = 'Sunday';
            break;
        case 1:
            day_week = 'Monday';
            break;
        case 2:
            day_week = 'Tuesday';
            break;
        case 3:
            day_week = 'Wednesday';
            break;
        case 4:
            day_week = 'Thursday';
            break;
        case 5:
            day_week = 'Friday';
            break;
        case 6:
            day_week = 'Saturday';
            break;
    }

    // console.log("Day of the week of the meeting is " + day_week);

    let month = upd_date.toLocaleString('default', { month: 'long' });
    // console.log("Month of the meeting is " + month);

    let day = upd_date.getDate();
    // console.log("Day of the meeting is " + day);

    let year = upd_date.getFullYear();

    // console.log("Year of the meeting is " + year);

    // console.log("Time of the meeting is " + time);

    let meeting_str = '' + day_week + ', ' + month + ' ' + day + ', ' + year + ' at ' + time;

    // console.log(meeting_str);
    return meeting_str;
}

function getMeetingStatus(date) {
    let upd_date = new Date(date);

    //get today's day, because we only can get historical data and forecast for the days three days ahead of us
    let today_date = new Date();

    if (upd_date < today_date) {
        return '<article class="message is-warning"> <div class="message-body"> The meeting has <strong> passed </strong> </div> </article>';
    } else if (upd_date == today_date) {
        return '<article class="message is-primary"> <div class="message-body"> The meeting is <strong> today </strong> </div> </article>';
    } else {
        return '<article class="message is-success"> <div class="message-body"> The meeting is <strong> scheduled </strong> </div> </article>';
    }
}
/**
 * The api being used is WeatherApi.com
 * @param {*} date 
 */
function getWeatherData(date, id) {
    //The date object should be converted to the format year-month-day
    let upd_date = new Date(date);

    let month = upd_date.toLocaleString('default', { month: 'long' });
    let num_month = upd_date.getMonth() + 1; //current month number + 1, because number of months vary from 0 to 11
    let day = upd_date.getDate();
    let year = upd_date.getFullYear();

    let str_date = '' + year + '' + '-' + num_month + '-' + day;
    let result;

    let $btn = $(`weather${id}`);

    setTimeout(function () {
        result = fetchWeatherData(str_date, id);
        // console.log("Returned result is " + result);
    }, 1000);  
}

function fetchWeatherData(str_date, id) {
    /**
     * Do not change "q" parameter!!!
     * days gets forecast for the listed day
     */
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: { q: '27599', days: '1', dt: str_date },
        headers: {
            'x-rapidapi-key': '1065241881msh8c1cf2550138c6ap1f69efjsn7c99a5c63e86',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    let fetched;
    let weather_data;
    let forecast;

    let day_info; //includes info about the average temperature

    let temperature;

    let condition; //Object that include small text + png
    let image;
    let text;

    let final_str = '';

    axios.request(options).then(
        function (response) {
            fetched = response.data.forecast;
            weather_data = fetched.forecastday;

            if (weather_data.length == 0) {
                final_str = '<strong> Weather forecast is not available </strong>';
            } else {
            forecast = weather_data[0]; //Object containing forecast

            day_info = forecast.day;
            temperature = day_info.avgtemp_f + 'f';

            condition = day_info.condition;
            image = condition.icon;
            text = condition.text;

            final_str =  `<img src="${image}" alt="icon"> <p> <strong> ${temperature} ${text} </strong> </p>`
            }

            $(`#weather${id}`).html(final_str);
        }).catch(function (error) {
            console.error(error);
        });

        return final_str;
}


async function userCheck() {
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
    user = loggedIn.data.user;
    return true;
  } catch (error) {

  }
}