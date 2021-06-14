// Create div element to display data
var div = document.createElement("div");

// place div element start of the body of current page
$("body").prepend(div);

// move it to center
div.style.marginLeft = "50%";
div.style.fontSize = "40px";
div.style.color = "green";
div.style.position = "absolute";
div.style.zIndex = "100";
div.style.backgroundColor = "white";
div.style.padding = "16px";

// add data and style
div.innerHTML =
  "Total: " +
  '<span style="font-size:40px;"><b>' +
  request.count +
  "</b></span>";

// $(
//   '<div class="rrr" style="font-size:40px; color: green">Test</div>'
// ).insertAfter(".bvz0fpym");

setTimeout(function () {
  $("head").prepend(
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">'
  );
}, 2000);

setTimeout(function () {
  // $(".bvz0fpym").after('<button class="btn btn-primary">Phone Number</button>');
  $(".nc684nl6").append(
    '<button class="btn btn-primary">Phone Number</button>'
  );
}, 3000);
