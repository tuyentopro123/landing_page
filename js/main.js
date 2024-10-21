$(document).ready(function () {
  // scroll header ----------------------------------------------------------------------------------->
  $(window).on("scroll", function () {
    if ($(window).width() >= 768 && $(window).scrollTop() > 80) {
      $(".header").addClass("scroll");
    } else {
      $(".header").removeClass("scroll");
    }
  });

  // nav button mobile ----------------------------------------------------------------------------------->
  $("#list-mobile").on("click", function () {
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
  var firstLanguage = $(".language-dropdown li").first().text();
  $("#language-mobile").find("p").text(firstLanguage);

  $("#language-mobile").on("click", function () {
    $(this).toggleClass("active");
  });

  $(".language-dropdown li").on("click", function (e) {
    var selectedLanguage = $(this).text();
    $("#language-mobile").find("p").text(selectedLanguage);
    $(".language-dropdown").hide();
  });

  // question ----------------------------------------------------------------------------------->
  $(".question-card").on("click", function () {
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
  var $selectInput = $("#select-input").find("input");
  $selectInput.on("keydown keypress", function (event) {
    event.preventDefault();
  });

  $selectInput.on("click", function () {
    $("#select-input").toggleClass("active");
  });

  $(".select-dropdown li").on("mousedown", function () {
    var selectedText = $(this).text();
    $selectInput.val(selectedText);
  });

  $selectInput.on("blur", function () {
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
  $(".btn-primary").on("click", function (e) {
    e.preventDefault();

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

    //  test finish --------------->
    // $("#modal-form").addClass("finish");
    // $(".msg-success .msg-1").text("Cảm ơn bạn đã liên hệ!");
    // $(".msg-success .msg-2").text(
    //   "Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ bạn trong thời gian sớm nhất."
    // );

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

      // Gọi API bằng AJAX
      $.ajax({
        url: "YOUR_API_ENDPOINT", // CUSTOM URL
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
          resetForm();
          console.log("Success:", response);
          $("#modal-form").addClass("finish");
          $(".msg-success .msg-1").text("Cảm ơn bạn đã liên hệ!");
          $(".msg-success .msg-2").text(
            "Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ bạn trong thời gian sớm nhất."
          );
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
          $("#modal-form").addClass("finish");
          $(".msg-success .msg-1").text("Đang thực hiện bảo trì");
          $(".msg-success .msg-2").text(
            "Xin lỗi vì sự bất tiện, vui lòng thử lại sau"
          );
        },
      });
    }
  });

  $(".back-home-btn").click(function () {
    window.location.href = "/";
  });

  // Khi modal đóng, reset form
  $("#exampleModalCenter").on("hidden.bs.modal", function () {
    $("#modal-form").removeClass("finish");
    resetForm();
  });

  // Xử lý sự kiện khi nhấn nút Đóng
  $(".btn-close").on("click", function () {
    $("#exampleModalCenter").modal("hide");
  });
});
