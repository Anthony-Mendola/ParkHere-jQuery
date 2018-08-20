// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, ut if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap
//= require jquery_ujs

//= require_tree .

$(function() {
  var listingArray = [];
  var id = parseInt($(".js-next").attr("data-id"));

  if ($("#listingsInfo").length) {
    loadAllListings();
  }

  function loadAllListings() {
    $.ajax({
      url: "/listings.json",
      method: "GET"
    })
      // promise
      .then(function(data) {
        listingArray = data;
        $.each(listingArray, function(index, listing) {
          var listingData =
            "<p><a href='/listings/" +
            listing.id +
            "'>" +
            listing.title +
            "</a><div id='content-" +
            listing.id +
            "'>" +
            listing.content.substring(0, 250) +
            "..." +
            "<a href='#' data-id='" +
            listing.id +
            "' class='js-more'>More Info</a></div><br>";
          $("#listingsInfo").append(listingData);
        });
      });
  }

  // For the Listings index page

  $("#listingsInfo").on("click", ".js-more", function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/listings/" + id + ".json", function(data) {
      $("#content-" + id).html(data.content);
    });
  });

  // For the Users Listings Page

  $("#userListingsInfo").on("click", ".js-more", function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/listings/" + id + ".json", function(data) {
      $("#content-" + id).html(data.content);
    });
  });

  // For the Users Show Page

  $("#userListingsShowInfo").on("click", ".js-more", function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/listings/" + id + ".json", function(data) {
      $("#content-" + id).html(data.content);
    });
  });

  // For the Listings Show page

  function loadListing(data) {
    history.pushState({}, "", "/listings/" + data.id);
    var listingReviewPath = "/listings/" + data.id + "/reviews/";
    $("#new_review").attr("action", listingReviewPath);
    $(".listingTitle").text(data["title"]);
    $(".listingUserName").text(data["user"]["name"]);
    $(".listingLocation").text(data["address"]);
    $(".listingCategoryName").text(data["category"]["name"]);
    $(".listingContact").text(data["contact"]);
    $(".listingContent").text(data["content"]);
    $(".listingCost").text(data["cost"]);
    $(".js-next").attr("data-id", data["id"]);
    $(".js-previous").attr("data-id", data["id"]);
    $("#submitted-reviews").empty();
    data["review_list"].forEach(function(element) {
      var review = new Review(element);
      review.postReview();
    });
  }

  $(".js-next").on("click", function(event) {
    var id = $(".js-next").attr("data-id");
    $.get("/listings/" + id + "/next", function(data) {
      console.log(data);
      loadListing(data);
    });
    event.preventDefault();
  });

  $(".js-previous").on("click", function(event) {
    var id = $(".js-previous").attr("data-id");
    $.get("/listings/" + id + "/previous", function(data) {
      console.log(data);
      loadListing(data);
    });
    event.preventDefault();
  });
});

function Review(data) {
  this.id = data.id;
  this.content = data.content;
  this.user = data.user;
}

Review.prototype.postReview = function() {
  var html = "";
  html +=
    "<div class='well well-white' id='review-' + review.id + ''>" +
    "<strong>" +
    this.user.name +
    "</strong>" +
    " says: " +
    this.content +
    "</div>";
  $("#submitted-reviews").append(html);
};

$(function() {
  $("form#new_review").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    // To process the review(form data) it is converted from an object to a string.
    var params = $form.serialize();
    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
    }).success(function(json) {
      $(".reviewBox").val("");
      var review = new Review(json);
      review.postReview();
    });
  });
});
