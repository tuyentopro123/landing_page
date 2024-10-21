$(document).ready(function () {
  // Load các thành phần
  $("#modal-contact").load("components/modal.html");
  $("#header-section").load("components/header.html", function () {
    updateFirstLanguage();
  });
  $("#home").load("components/home.html");
  $("#about").load("components/about.html");
  $("#process").load("components/process.html");
  $("#service").load("components/service.html");
  $("#feedback").load("components/feedback.html");
  $("#question").load("components/question.html");

  $("#footer-section").load("components/footer.html");

  // scroll header ----------------------------------------------------------------------------------->
  $(window).on("scroll", function () {
    if ($(window).width() >= 768 && $(window).scrollTop() > 80) {
      $(".header").addClass("scroll");
    } else {
      $(".header").removeClass("scroll");
    }
  });

  // nav button mobile ----------------------------------------------------------------------------------->
  $(document).on("click", "#list-mobile", function () {
    var $header = $(".header");
    var $closeIcon = $("#list-mobile").find("i.bi-x");
    var $listIcon = $("#list-mobile").find("i.bi-list");

    if ($header.hasClass("active")) {
      $header.removeClass("active");
      $closeIcon.hide();
      $listIcon.show();
    } else {
      $header.addClass("active");
      $closeIcon.show();
      $listIcon.hide();
    }
  });

  // nav language mobile ----------------------------------------------------------------------------------->
  // Hàm cập nhật ngôn ngữ đầu tiên
  function updateFirstLanguage() {
    var firstLanguage = $(".language-dropdown li").first().text();
    $("#language-mobile").find("p").text(firstLanguage);
  }

  $(document).on("click", "#language-mobile", function () {
    $(this).toggleClass("active");
  });

  $(document).on("click", ".language-dropdown li", function (e) {
    var selectedLanguage = $(this).text();
    if ($(window).width() < 768) {
      $("#language-mobile").find("p").text(selectedLanguage);
      $(".language-dropdown").hide();
    }
  });

  // question ----------------------------------------------------------------------------------->
  $(document).on("click", ".question-card", function () {
    var $paragraph = $(this).find("p");
    var $plusIcon = $(this).find("i.bi-plus");
    var $minusIcon = $(this).find("i.bi-dash-lg");

    if ($paragraph.hasClass("show")) {
      $paragraph.removeClass("show");
      $minusIcon.hide();
      $plusIcon.show();
    } else {
      $paragraph.addClass("show");
      $plusIcon.hide();
      $minusIcon.show();
    }
  });

  // Select input ------------------------------------------------------------------------>
  $(document).on("keydown keypress", "#select-input input", function (event) {
    event.preventDefault();
  });

  $(document).on("click", "#select-input input", function () {
    $("#select-input").toggleClass("active");
  });

  $(document).on("mousedown", ".select-dropdown li", function () {
    var selectedText = $(this).text();
    var $selectInput = $("#select-input").find("#request");
    $selectInput.val(selectedText);
  });

  $(document).on("blur", "#select-input input", function () {
    $("#select-input").removeClass("active");
  });

  // Form ----------------------------------------------------------------------------------->
  // Hàm reset form
  function resetForm() {
    $("#name").val("");
    $("#email").val("");
    $("#number").val("");
    $("#business").val("");
    $("#request").val("");
    $("#description").val("");
    $(".warning").remove();
  }

  // Call api
  $(document).on("click", "#submit-form-btn", function (e) {
    e.preventDefault();

    console.log("first");
    // Get data form
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var number = $("#number").val().trim();
    var business = $("#business").val().trim();
    var request = $("#request").val();
    var description = $("#description").val().trim();

    $(".warning").remove();

    var isValid = true;
    const divWarning = (text) =>
      `<div class="warning text-danger mt-2 d-flex">
        <i class="bi bi-info-circle-fill mr-2"></i>
        <p>
          ${text}
        </p>
      </div>`;

    // Validate input
    if (!name) {
      $("#custom-input-name").after(
        divWarning("Vui lòng không bỏ trống thông tin này.")
      );
      isValid = false;
    }
    if (!email) {
      $("#custom-input-email").after(
        divWarning("Vui lòng không bỏ trống thông tin này.")
      );
      isValid = false;
    } else {
      // Kiểm tra định dạng email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        $("#custom-input-email").after(
          divWarning("Email không đúng định dạng.")
        );
        isValid = false;
      }
    }
    if (!number) {
      $("#custom-input-number").after(
        divWarning("Vui lòng không bỏ trống thông tin này.")
      );
      isValid = false;
    }
    if (!business) {
      $("#custom-input-business").after(
        divWarning("Vui lòng không bỏ trống thông tin này.")
      );
      isValid = false;
    }
    if (!request) {
      $("#custom-input-request").after(
        divWarning("Vui lòng chọn yêu cầu của bạn.")
      );
      isValid = false;
    }

    // Validate true
    if (isValid) {
      var data = {
        name: name,
        email: email,
        number: number,
        business: business,
        request: request,
        description: description ?? "",
      };

      //  test finish --------------->
      $("#modal-form").addClass("finish");
      $(".msg-success .msg-1").text("Cảm ơn bạn đã liên hệ!");
      $(".msg-success .msg-2").text(
        "Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ bạn trong thời gian sớm nhất."
      );
      // Gọi API bằng AJAX
      // $.ajax({
      //   url: "YOUR_API_ENDPOINT", // CUSTOM URL
      //   type: "POST",
      //   contentType: "application/json",
      //   data: JSON.stringify(data),
      //   success: function (response) {
      //     resetForm();
      //     console.log("Success:", response);
      //     $("#modal-form").addClass("finish");
      //     $(".msg-success .msg-1").text("Cảm ơn bạn đã liên hệ!");
      //     $(".msg-success .msg-2").text(
      //       "Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ bạn trong thời gian sớm nhất."
      //     );
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.error("Error:", textStatus, errorThrown);
      //     $("#modal-form").addClass("finish");
      //     $(".msg-success .msg-1").text("Đang thực hiện bảo trì");
      //     $(".msg-success .msg-2").text(
      //       "Xin lỗi vì sự bất tiện, vui lòng thử lại sau"
      //     );
      //   },
      // });
    }
  });

  // Khi modal đóng, reset form
  $(document).on("hidden.bs.modal", "#exampleModalCenter", function () {
    $("#modal-form").removeClass("finish");
    resetForm();
  });

  // Xử lý sự kiện khi nhấn nút Đóng
  $(document).on("click", ".btn-close", function () {
    $("#exampleModalCenter").modal("hide");
  });

  // Back to home button
  $(document).on("click", ".back-home-btn", function () {
    window.location.href = "/";
  });
});
