$(document).ready(function() {
    // Display current day at the top of the page
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
    // Load saved events from local storage
    for (let i = 9; i <= 20; i++) {
      const event = localStorage.getItem(`event-${i}`);
      if (event) {
        $(`#text-${i}`).val(event);
      }
    }
  
    // Color-code timeblocks based on past, present, and future
    $(".description").each(function() {
      const hour = parseInt($(this).attr("id").split("-")[1]);
      const currentHour = moment().hours();
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  
    // Save events to local storage when save button is clicked
    $(".saveBtn").on("click", function() {
      const hour = $(this).data("hour");
      const event = $(`#text-${hour}`).val();
      localStorage.setItem(`event-${hour}`, event);
    });
  });
  