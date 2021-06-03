var div = document.createElement("div");
document.body.prepend(div);
div.style.marginLeft = "50%";

div.innerHTML =
  "Total: " +
  '<span style="font-size:40px"><b>' +
  request.count +
  "</b></span>" +
  " Google";
