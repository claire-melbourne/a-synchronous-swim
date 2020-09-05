//const fs = require('fs');
const SwimTeam = require('./SwimTeam.js');

(function(SwimTeam) {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
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
  //this function should trigger another call upon success
  //added setTimeout to call every 2 seconds after initialization
  const ajaxGetRandomMove = () => {
    $.ajax({
      type: 'GET',
      data: 'text',
      url: `http://127.0.0.1:3000`,
      success: (data) =>{
        SwimTeam.move(data);
        setTimeout(ajaxGetRandomMove, 2000);
      }
    });
  }

})(SwimTeam);
