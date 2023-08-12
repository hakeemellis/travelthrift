// Show or Hide Password //

function myFunction() {
    var pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }

  function myFunction1() {
    var pass = document.getElementById("confirmpassword");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }

  // Copyright Notice //
  console.log(`
  Copyright (c) 2023 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);