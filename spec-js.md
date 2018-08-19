# Specifications for the Rails with jQuery Assessment

Specs:

- [x] Use jQuery for implementing new requirements
- [ ] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
- [ ] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
- [ ] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
- [ ] Use your Rails API and a form to create a resource and render the response without a page refresh.
- [ ] Translate JSON responses into js model objects.
- [ ] At least one of the js model objects must have at least one method added by your code to the prototype.

Confirm

- [ ] You have a large number of small Git commits
- [ ] Your commit messages are meaningful
- [ ] You made the changes in a commit that relate to the commit message
- [ ] You don't include changes in a commit that aren't related to the commit message

Requirements from README page:

1.  Must render at least one index page (index resource - 'list of things') via jQuery and an Active Model Serialization JSON Backend. For example, in a blog domain with users and posts, you might display the index of the users posts on the users show page, fetching the posts via an AJAX GET request, with the backend rendering the posts in JSON format, and then appending the posts to the page.
    \*Clicking More Info on the index page on a specific listing, fetches the listing body and loads it.

2.  Must render at least one show page (show resource - 'one specific thing') via jQuery and an Active Model Serialization JSON Backend. For example, in the blog domain, you might allow a user to sift through the posts by clicking a 'Next' button on the posts show page, with the next post being fetched and rendered via JQuery/AJAX.
    \*Once on a listing, "Next" button on the listing show page allows the next post to be fetched and rendered via JQuery/AJAX

3.  The rails API must reveal at least one `has-many` relationship in the JSON that is then rendered to the page. For example if each of those posts has many comments, you could render those comments as well on that show page.
    \*A listing has-many reviews.

4.  Must use your Rails API and a form to create a resource and render the response without a page refresh. For example, a user might be able to add a comment to a post, and the comment would be serialized, and submitted via an AJAX POST request, with the response being the new object in JSON and then appending that new comment to the DOM using JavaScript (ES6 Template Literals can help out a lot with this).
    \*Add a review to a listing without a page refresh.

5.  Must translate the JSON responses into Javascript Model Objects. The Model Objects must have at least one method on the prototype. Formatters work really well for this. Borrowing from the previous example, instead of plainly taking the JSON response of the newly created comment and appending it to the DOM, you would create a Comment prototype object and add a function to that prototype to perhaps concatenate (format) the comments authors first and last name. You would then use the object to append the comment information to the DOM.

Requirements from Review Checklist form:
Must have Rails backend and client JS

Makes use of ES6 features as much as possible(e.g Arrow functions, Let & Const, Class, constructor functions)

Must Translate JSON responses into JS model Objects.(please provide an example including Object names, line numbers)

Must use constructor functions, or ES6 class along prototype functions for modeling data.(please provide an example including Object names, line numbers)

Must render a list of items from a resource in JS app using a fetch request to an index route on the Rails API. 9 (please provide an example including Model/Object names, function names, line numbers, file names)

Must render a single item for a resource that uses a GET fetch request to the show route on the RAILS API (please provide an example including Model/Object names, function names, line numbers, file names)

Must render a form for creating a resource that submits dynamically to the Rails API then renders the resource on the page without a page refresh. (please provide an example including Model/Object names, function names, line numbers, file names)

Must include at least one has_many through relationship that is rendered on the page dynamically.(please provide an example including Model/Object names, function names, line numbers, file names)

The application is pretty Dry
