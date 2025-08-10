$(document).ready(function () {
  // Dates
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const todayDay = now.getDate();
  const currentMonthIndex = now.getMonth();
  const currentYear = now.getFullYear();

  const randomDate = function () {
    let monthOffset = Math.floor(Math.random() * 4);
    let tempDate = new Date(now);
    tempDate.setMonth(tempDate.getMonth() - monthOffset);

    const maxDay = Math.min(
      todayDay,
      new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0).getDate()
    );
    const randomDay = Math.floor(Math.random() * maxDay) + 1;

    tempDate.setDate(randomDay);

    const formattedMonth = monthNames[tempDate.getMonth()];
    const formattedDay = tempDate.getDate();
    const formattedYear = tempDate.getFullYear();

    return `${formattedMonth} ${formattedDay}, <span class="nowYear">${formattedYear}</span>`;
  };

  $(".curMonth").text(monthNames[currentMonthIndex]);
  $(".prevMonth").text(
    monthNames[currentMonthIndex === 0 ? 11 : currentMonthIndex - 1]
  );
  $(".curYear").text(currentYear);

  $(".date").each(function () {
    $(this).html(randomDate());
  });

  // Timer
  let timeLeft = 600;

  setInterval(function () {
    timeLeft--;

    if (timeLeft < 0) {
      timeLeft = 600;
    }

    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    $(".minutes").text(minutes);
    $(".seconds").text(seconds);
  }, 1000);

  // Color button selection
  $(".clr-btn").on("click", function () {
    $(".clr-btn").removeClass("selected");
    $(this).addClass("selected");
    $(".selectedClr").text($(this).val());
  });

  // Storage button selection
  $(".str-btn").on("click", function () {
    $(".str-btn").removeClass("selected");
    $(this).addClass("selected");
    $(".selectedStrg").text($(this).text());
  });

  // Modal
  $("#prodModal").modal({
    backdrop: "static",
    keyboard: false,
  });
});

function useCode() {
  $("#page-1").fadeOut(function () {
    $("#page-2").fadeIn();

    setTimeout(() => {
      $("#page-2").fadeOut(function () {
        $("#page-3").fadeIn();
      });
    }, 2000);
  });
}

function showModal() {
  $("#prodModal").modal("show");
}

function saveSelection() {
  const messages = [".msg-1", ".msg-2", ".msg-3", ".msg-4"];
  const transitionDelay = 1200;

  $("#page-3").fadeOut(function () {
    $("#page-4").fadeIn();

    messages.forEach((selector, index) => {
      setTimeout(() => {
        if (index > 0)
          $(messages[index - 1]).fadeOut(() => $(selector).fadeIn());
        else $(selector).fadeIn();
      }, index * transitionDelay);
    });

    setTimeout(() => {
      $("#page-4").fadeOut(showModal);
    }, messages.length * transitionDelay + transitionDelay);
  });
}
