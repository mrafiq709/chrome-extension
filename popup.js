// Get background.js
// const bg = chrome.extension.getBackgroundPage();
// // console.log(Object.keys(bg.data).length === 0);

// // Display data in popup.html page
// window.onload = function () {
//   console.log(bg.data.html);
//   let cnt = 0;
//   if (Object.keys(bg.data).length !== 0) {
//     cnt = bg.data.count;
//   }
//   document.getElementById("result").innerHTML =
//     'Total: <span style="font-size:20px"><b>' + cnt + "</b></span> Google";

//   var q = "Testing auto input and click";
//   document.getElementById("searchButton").onclick = function () {
//     // window.open("http://google.com/search?q=" + q);
//     var v = $("#searchText").val(q);
//     console.log(v.val());
//   };

//   // $("#searchText").on("change keydown paste input", function () {
//   //   var v = $("#searchText").val();
//   // });

//   // Auto click
//   document.getElementById("searchButton").click();
};
