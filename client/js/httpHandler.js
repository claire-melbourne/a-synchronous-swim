//const fs = require('fs');
// const SwimTeam = require('./SwimTeam.js');

(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //this function should trigger another call upon success
  //added setTimeout to call every 2 seconds after initialization
  // const ajaxGetRandomMove = () => {

  //wrap ajax in a getMove function that is global, apply swimTeam move with data as call back
  const getMove = () => {
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:3000`,
      success: (data) =>{
        SwimTeam.move(data)
      },
      complete: (data) => {
        setTimeout(getMove, 100);
      },
      error: (data) => {
        console.log('failed');
      }
    })
  }

  setTimeout(getMove, 0);

  // }
    // https://api.themoviedb.org/3/search/movie?api_key=1796227790470af120d4a51fd91002b2&language=en-US&query=tron&page=1&include_adult=false
    // });
    // $.ajax({
    //   url: serverUrl,
    //   type: 'GET',
    //   success: (data) => {
    //     console.log('success');
    //   },
    //   fail: (data) => {
    //     console.log('fail');
    //   }
    // });

  // }

  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: `http://127.0.0.1:3000`,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

}());

