// ----------- EMAIL FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#email").on("keyup change", () => {
  emailFieldValidator();
});

const emailFieldValidator = () => {
  if (isValueEmptyOrNot($("#email"))) {
    return commonValidationFailure($("#email"), $("#email-feedback"), "Please enter Email!");
  }

  if (validateEmail($("#email").val())) {
    return commonValidationSuccess($("#email"), $("#email-feedback"));
  } else {
    return commonValidationFailure($("#email"), $("#email-feedback"), "Invalid email!");
  }
};
// -----------  PASSWORD FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#password").on("keyup", () => {
  passwordFieldValidator();
});

const passwordFieldValidator = () => {
  if (isValueEmptyOrNot($("#password"))) {
    return commonValidationFailure($("#password"), $("#password-feedback"), "Please enter password!");
  }

  if (checkPassword($("#password").val())) {
    return commonValidationSuccess($("#password"), $("#password-feedback"));
  } else {
    return commonValidationFailure(
      $("#password"),
      $("#password-feedback"),
      "Password length should be between 8 to 20 with at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character!"
    );
  }
};
// -----------  CAPTCHA FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#captcha").on("keyup", () => {
  captchaFieldValidator();
});

const captchaFieldValidator = () => {
  if (isValueEmptyOrNot($("#captcha"))) {
    return commonValidationFailure($("#captcha"), $("#captcha-feedback"), "Please enter CAPTCHA!");
  } else {
    return commonValidationSuccess($("#captcha"), $("#captcha-feedback"));
  }
};

// ---------------------------------    ON CLICK ON SUBMIT BTN LOGIC STARTS    ----------------------
$("#submit").on("click", () => {
  let email = emailFieldValidator();
  // console.log(email);

  let password = passwordFieldValidator();
  // console.log(password);

  if (captchaFieldValidator() && email && password) {
    captchValidate($("#captcha").val()).then((res) => {
      // console.log(res);
      if (res.success) {
        commonValidationSuccess($("#captcha"), $("#captcha-feedback"), res.message);
        getCaptcha();

        buildDataToServer();
      } else {
        return commonValidationFailure($("#captcha"), $("#captcha-feedback"), res.message);
      }
    });
  }
});

const buildDataToServer = () => {
  let email = $("#email").val().toLowerCase();
  let password = $("#password").val();

  let data = {
    email,
    password,
  };

  console.log(data);
  clearDatas();
};

//   -------------------------- CLEAR FIELDS    -------------------------
const clearDatas = () => {
  let data = [$("#email"), $("#password"), $("#captcha")];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    clearFieldsAndValidation(element);
  }
};

const clearFieldsAndValidation = (element) => {
  element.val("");
  element.removeClass("is-invalid");
  element.removeClass("is-valid");
};
