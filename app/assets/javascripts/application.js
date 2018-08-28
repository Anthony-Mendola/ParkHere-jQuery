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

//Application locks if JavaScript is removed from this file and put into another
// can't use arrow functions in certain places due to formatting on save removing brackets

$(function () {
  let listingArray = [];
  let id = parseInt($(".js-next").attr("data-id"));

  //Loads listings on listing index page if a listing exists
  if ($("#listingsInfo").length) {
    loadAllListings();
  }

  function loadAllListings() {
    $.ajax({
      url: "/listings.json",
      method: "GET"
    })
      //promise "then" method which registers callback to receive data
      .then(function (data) {
        listingArray = data;


        //iterates through elements, 1st callback function index, 2nd is the actual element
        $.each(listingArray, (index, listing) => {
          let listingData =
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

  // For the Listings index page more info
  $("#listingsInfo, #listingsSort").on("click", ".js-more", function (e) {
    e.preventDefault();
    let id = this.dataset.id;
    //this is our get request to rails api
    $.get("/listings/" + id + ".json", function (data) {
      $("#content-" + id).html(data.content);
    });
  });


  //replace instead of append existing data
  // $("#listingsInfo").on("click", ".js-sort", function (e) {
  //   e.preventDefault()
  //   $.get("/listings/" + id + ".json", function (data) {
  //     console.log(data);
  //     loadAllListings(data);
  //   }
  //   data.sort(function (a, b) {
  //       var titleA = a.title.toUpperCase(); // ignore upper and lowercase
  //       var titleB = b.title.toUpperCase(); // ignore upper and lowercase
  //       if (titleA < titleB) {
  //         return -1;
  //       }
  //       if (titleA > titleB) {
  //         return 1;
  //       }

  //       // titles must be equal
  //       return 0;
  //     })

  // }
  // })

  //sort divs alphabetically
  // $(".js-sort").on("click", function (event) {
  //   var orderDiv = $("#content-").sort(function (a, b) {
  //     return $(a).find("#content-").text().toLowerCase() >
  //       $(b).find("#content-").text().toLowerCase();
  //     var container = $(".toempty");
  //     container.detach().empty().append(orderDiv);
  //     $('body').append(container);
  //   })
  //   // $(".toempty").html(orderDiv)
  //   event.preventDefault();
  // });

  // alphabetical sorting button
  $(".js-sort").on("click", function (event) {
    var sortByProperty = function (property) {
      return function (x, y) {
        return ((x[property]["toUpperCase"]() === y[property]["toUpperCase"]()) ? 0 : ((x[property]["toUpperCase"]() > y[property]["toUpperCase"]()) ? 1 : -1));
      };
    };
    var alphaSort = listingArray.sort(sortByProperty('title'));
    console.log(alphaSort)
    $.each(alphaSort, (index, listing) => {
      let sortData =
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
      var container = $("#listingsInfo")
      container.detach().empty();
      $("#listingsSort").append(sortData)
    });
    event.preventDefault();
  });


  //Puts listing in order
  // $("#listingsInfo").on("click", ".js-order", function (e) {
  //   e.preventDefault();
  //   let id = this.dataset.id;
  //   //this is our get request to rails api
  //   $.get("/listings/" + id + ".json", function (data) {
  //     $("#content-" + id).html(data.content);
  //   });
  // });


  // For the Users Listings Page, more info

  $("#userListingsInfo").on("click", ".js-more", function (e) {
    e.preventDefault();
    let id = this.dataset.id;
    $.get("/listings/" + id + ".json", function (data) {
      $("#content-" + id).html(data.content);
    });
  });

  // For the Users Show Page, more info

  $("#userListingsShowInfo").on("click", ".js-more", function (e) {
    e.preventDefault();
    let id = this.dataset.id;
    $.get("/listings/" + id + ".json", function (data) {
      $("#content-" + id).html(data.content);
    });
  });

  // For the Listings Show page
  function loadListing(data) {
    history.pushState({}, "", "/listings/" + data.id);
    let listingReviewPath = "/listings/" + data.id + "/reviews/";
    $("#new_review").attr("action", listingReviewPath);
    $(".listingTitle").text(data["title"]);
    $(".listingUserName").text(data["user"]["title"]);
    $(".listingLocation").text(data["address"]);
    $(".listingCategoryName").text(data["category"]["title"]);
    $(".listingContact").text(data["contact"]);
    $(".listingContent").text(data["content"]);
    $(".listingCost").text(data["cost"]);
    $(".js-next").attr("data-id", data["id"]);
    $(".js-previous").attr("data-id", data["id"]);
    //clears reviews for next listing and allows review to be appended without a refresh.
    $("#submitted-reviews").empty();
    data["review_list"].forEach(function (element) {
      let review = new Review(element);
      review.postReview();
    });
  }

  $(".js-next").on("click", function (event) {
    let id = $(".js-next").attr("data-id");
    $.get("/listings/" + id + "/next", function (data) {
      console.log(data);
      loadListing(data);
    });
    event.preventDefault();
  });

  $(".js-previous").on("click", function (event) {
    let id = $(".js-previous").attr("data-id");
    $.get("/listings/" + id + "/previous", function (data) {
      console.log(data);
      loadListing(data);
    });
    event.preventDefault();
  });
});

// function Review(data) {
//   this.id = data.id;
//   this.content = data.content;
//   this.user = data.user;
// }

class Review {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.user = data.user;
  }
}

//cant use arrow functions for prototype functions

Review.prototype.postReview = function () {
  //prototype method template
  //this refers to object itself
  let html = "";
  html +=
    "<div class='well well-white' id='review-' + review.id + ''>" +
    "<strong>" +
    this.user.title +
    "</strong>" +
    " says: " +
    this.content +
    "</div>";
  $("#submitted-reviews").append(html);
};

$(function () {
  $("form#new_review").on("submit", function (event) {
    event.preventDefault();
    //"this" always refers to the item that triggered the event which is the form
    let $form = $(this);
    let action = $form.attr("action");
    // Serialize to process the review(form data) it is converted from an object to a string.
    let params = $form.serialize();
    //Submit ajax request explicitly firing and asking for json back.
    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
      //get back json object
    }).success(function (json) {
      $(".reviewBox").val("");
      //transform json object into new Review object
      let review = new Review(json);
      review.postReview();
      //calls method to append to DOM
    });
  });
});
