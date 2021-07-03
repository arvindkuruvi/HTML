let captchaIP = "http://localhost:7000";

$(document).ready(() => {
  sessionStorage.clear();
  getCaptcha();
});

// -------------------------------  CAPTCHA LOGIC STARTS    ---------------------------------------
// captcha

// fetching captcha
const getCaptcha = () => {
  $.ajax({
    url: `${captchaIP}/captcha/captcha`,
    type: "GET",
    contentType: "application/JSON",
    xhrFields: {
      responseType: "blob",
    },
    success: function (result) {
      // console.log(result)
      const url = window.URL || window.webkitURL;
      const src = url.createObjectURL(result);

      $("#captcha-img").attr("src", src);
    },
    error: function (data) {
      // reject(data);
      console.log(data);
    },
  });
};

// validating captcha
let captchValidate = (captcha) => {
  let data = {
    captcha: captcha,
  };

  console.log(data);

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${captchaIP}/captcha/check-captcha`,
      type: "POST",
      dataType: "text",
      contentType: "application/JSON",
      data: JSON.stringify(data),
      success: function (result) {
        result = JSON.parse(result);

        resolve(result);
      },
      error: function (data) {
        reject(data);
      },
    });
  });
};

// -------------------------------  CAPTCHA LOGIC ENDS    ---------------------------------------

// -----------  VALIDATION  LOGIC STARTS ----------------------------------------------------
const commonValidationSuccess = (element, elementFeedBack, msg = "Looks Good!") => {
  element.removeClass("is-invalid");
  element.addClass("is-valid");

  // adding posiitive feeback
  elementFeedBack.empty();
  // let html = `<p class="valid-feedback">${msg}</p>`;
  // elementFeedBack.append(html);
  return true;
};

const commonValidationFailure = (element, elementFeedBack, msg = `Invalid `) => {
  element.addClass("is-invalid");
  element.removeClass("is-valid");

  // adding negative feeback
  elementFeedBack.empty();
  let html = `<p class="invalid-feedback">${msg}</p>`;
  elementFeedBack.append(html);
  return false;
};

// ---------------------------PASSWORD VALIDATION ----------------------------------------------------------------------------
// Here input argument is an password element reference
function checkPassword(input) {
  var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

  if (input.match(decimal)) {
    // console.log("Password Validation Successful!");

    return true;
  } else {
    // console.log("Password Validation UnSuccessful!");

    return false;
  }
}

// -----------------    FIELD EMPTY OR NOT ------------------------------------------------
const isValueEmptyOrNot = (item) => {
  // console.log(item);
  let value = item.val().trim();
  if (value == "" || !value) {
    // console.log("true");
    return true;
  } else {
    // console.log("false");
    return false;
  }
};

// -------------------------    MOBILE NUMBER VALIDATION    -----------------------------------------

//mobile validation function
function mobileValidate() {
  let reg = /^[6-9][0-9]{9}/;

  let value = $("#mobile").val();
  let test = reg.test(value);
  if (test) {
    // console.log("Mobile valid");
    return true;
  } else {
    // console.log("Mobile Not valid");
    return false;
  }
}

// -------------------------   TEXT VALIDATION    -----------------------------------------

const textOnlyValidate = (input) => {
  let reg = /^[A-Za-z]+$/;
  let test = reg.test(input);
  if (test) {
    return true;
  } else {
    return false;
  }
};

// --------------------    EMAIL VALIDATION     ------------------------------------------------------

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
