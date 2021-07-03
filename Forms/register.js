// let captchaIP = "https://weaverminds.com";
// let captchaIP = "http://localhost:7000";

// --------------------------   PASSWORD MATCH VALIDATION -----------------------------------
const checkPasswordMatch = () => {
  if (isValueEmptyOrNot($("#password"))) {
    return commonValidationFailure($("#password"), $("#password-feedback"), "Please enter password!");
  }

  if (isValueEmptyOrNot($("#confirm-password"))) {
    return commonValidationFailure(
      $("#confirm-password"),
      $("#confirm-password-feedback"),
      "Please enter confirm password!"
    );
  }

  if ($("#confirm-password").val() == $("#password").val()) {
    commonValidationSuccess($("#confirm-password"), $("#confirm-password-feedback"));
    commonValidationSuccess($("#password"), $("#password-feedback"));

    return true;
  } else {
    return commonValidationFailure($("#confirm-password"), $("#confirm-password-feedback"), "Passwords don't match");
  }
};

// ---------------------------------    ON CLICK ON CONTNUE BTN LOGIC STARTS    ----------------------
$("#continue").on("click", (e) => {
  let email = emailFieldValidator();
  // console.log(email);

  let mobile = mobileFieldValidator();
  // console.log(mobile);

  let company = companyNameFieldValidator();
  // console.log(company);

  let industry = industryRelatedFieldValidator();
  // console.log(industry);

  let password = passwordFieldValidator();
  // console.log(password);

  let confirmPassword = confirmPasswordFieldValidator();
  // console.log(confirmPassword);

  if (checkPasswordMatch() && email && mobile && company && industry && password && confirmPassword) {
    $("#first-container").slideUp(500, "swing");
    $("#second-container").slideDown(1000, "swing");
  } else {
    return null;
  }
});

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

// ----------- MOBILE FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#mobile").on("keyup", () => {
  mobileFieldValidator();
});

const mobileFieldValidator = () => {
  if (isValueEmptyOrNot($("#mobile"))) {
    return commonValidationFailure($("#mobile"), $("#mobile-feedback"), "Please enter mobile!");
  }

  console.log(mobileValidate());
  if (mobileValidate()) {
    return commonValidationSuccess($("#mobile"), $("#mobile-feedback"));
  } else {
    return commonValidationFailure($("#mobile"), $("#mobile-feedback"), "Invalid mobile!");
  }
};

// ----------- COMPANY NAME FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#company-name").on("keyup", () => {
  companyNameFieldValidator();
});

const companyNameFieldValidator = () => {
  if (isValueEmptyOrNot($("#company-name"))) {
    return commonValidationFailure(
      $("#company-name"),
      $("#company-feedback"),
      "Please enter Company/Organization Name!"
    );
  }

  if (textOnlyValidate($("#company-name").val())) {
    return commonValidationSuccess($("#company-name"), $("#company-feedback"));
  } else {
    return commonValidationFailure($("#company-name"), $("#company-feedback"), "Invalid Company/Organization Name!");
  }
};

// ----------- INDUSTRY RELATED FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#industry-related").on("keyup", () => {
  industryRelatedFieldValidator();
});

const industryRelatedFieldValidator = () => {
  if (isValueEmptyOrNot($("#industry-related"))) {
    return commonValidationFailure($("#industry-related"), $("#industry-feedback"), "Please enter Industry Related!");
  }

  if (textOnlyValidate($("#industry-related").val())) {
    return commonValidationSuccess($("#industry-related"), $("#industry-feedback"));
  } else {
    return commonValidationFailure($("#industry-related"), $("#industry-feedback"), "Inavlid Industry Related!");
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

// -----------  CONFIRM PASSWORD FIELD ON KEY DOWN LOGIC  ----------------------------------------------------
$("#confirm-password").on("keyup", () => {
  if (confirmPasswordFieldValidator()) checkPasswordMatch();
});

const confirmPasswordFieldValidator = () => {
  if (isValueEmptyOrNot($("#confirm-password"))) {
    return commonValidationFailure(
      $("#confirm-password"),
      $("#confirm-password-feedback"),
      "Please enter confirm password!"
    );
  }

  if (checkPassword($("#confirm-password").val())) {
    return commonValidationSuccess($("#confirm-password"), $("#confirm-password-feedback"));
  } else {
    return commonValidationFailure(
      $("#confirm-password"),
      $("#confirm-password-feedback"),
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

// ----------------VALIDATION  LOGIC ENDS ----------------------------------------------------

// ---------------------------------    ON CLICK ON SUBMIT BTN LOGIC STARTS    ----------------------
$("#submit").on("click", () => {
  if (captchaFieldValidator()) {
    captchValidate($("#captcha").val()).then((res) => {
      // console.log(res);
      if (res.success) {
        commonValidationSuccess($("#captcha"), $("#captcha-feedback"), res.message);

        // $(".inputs-box").hide();
        // $(".animation-container").show();

        $(".inputs-box").fadeOut();
        $(".animation-container").fadeIn(1000);
        buildDataToServer();
      } else {
        return commonValidationFailure($("#captcha"), $("#captcha-feedback"), res.message);
      }
    });
  }
});

const buildDataToServer = () => {
  let email = $("#email").val().toLowerCase();
  let mobile = $("#mobile").val();
  let company = $("#company-name").val();
  let industry = $("#industry-related").val();
  let password = $("#password").val();
  let representsBest = $("#represents-best").val();
  let create = $("#create").val();
  let data = {
    email,
    mobile,
    company,
    industry,
    password,
    representsBest,
    create,
  };

  console.log(data);
};
