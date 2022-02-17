# htn-frontend-challenge

This project was built with React (Create React App), GraphQL (Apollo Client) and Chakra UI.

Login credentials:

```
Username: username
Password: password
```

## Writeup

### 1. Development Process

My first step in the development process was understanding the task at hand and breaking it down into smaller pieces. I saw that I would have to have a page to display all the events, a page for each event, and a login page. I would also have to architect the logic for querying from the endpoint and routing between pages.

I decided to use React, GraphQL (Apollo Client) and Chakra UI. These are tools I've used in the past, most recently as a full-stack developer on UW Blueprint, and I knew my familiarity with them would speed up development. Furthermore, these are all tried and tested technologies that have been used in production-level apps. Specifically, I liked how GraphQL allowed me to specify which fields I wanted to fetch and how Chakra UI supported mobile responsiveness out of the box.

After deciding on the tech stack, I went to work, starting off with the `EventsListingPage`, the main component of the app, writing up the query, adding Chakra UI components, and setting up the routing. Along the way, I extracted commonly used elements into resuable components and functions in utils files and made sure to comment my code in a way that would help someone new to the codebase understand what was going on. I also focused on accessibility, using contrast checkers to verify colours and ensuring the font size was large enough to read even on small devices.

One of the problems I faced was debugging the `sampleEvent` query for a single event in the `Event` component. I was trying to query data for each related event but was getting a 400 Error. Initially puzzled, I investigated deeper by checking the Network tab on Chrome Dev Tools. It seemed my type for the ID was incorrect and that I should be using the type `Float` instead of `ID` for `query GetEvent($id: ID!)`. The query worked after making the change! I also had to learn the intricacies of React Router, especially when trying to pass in the previous route to the `AuthPage` component. I learned that I could access state passed in the Link component using `location.state.variableName`, which allowed me to redirect the user back to their original page after logging in. The way I handled routing is something I'm pretty proud of, creating a link for each event associated with its ID!

I also made sure to handle edge cases throughout my code. One such instance was handling public / private events. If the user was not logged in, I not only made sure not to show private events in the events listing page, but I also hid private related events. If there were no public related events, the "Related Events" section would be hidden altogether. If the user was logged in and viewing a private event, logging out would render an "Event Not Found" page. There are many more examples of my attempts to pay close attention to the details, such as handling dates and form handling.

### 2. Extensibility

During development, I structured the app to ensure scalability. New pages could be quickly added to routing as necessary and creating new event types would be as easy as adding a new case to the `createEventTypeTag` function in `EventUtils`.

However, there's a lot more that could be done. For one, I'd use Jest for testing. I'd write unit tests for testing individual components and integration tests across large pieces of the app. I'd also introduce a more robust form of state management such as Redux. Currently, our app is simple enough that doesn't require state to be passed around in ungainly ways, but as the app grows in complexity, better solutions would be required.

In terms of new features, I'd add better support for authentication. This would require a server and database to store passwords, security measures such as password hashing and auth persistence via localStorage or cookies. I'd also incorporate better ways to view and interact with events, such as filtering/searching (as recommended in the challenge document), bookmarking and a calendar view. And of course, adding a dark mode never hurts too :)

Regarding performance metrics, I'd consider using an existing tool such as Firebase Performance Monitoring to track load times, especially for pages that require querying a lot of data.
