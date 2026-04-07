=>Third pary packages

react-router-dom - to navigate to baout page and to each pet page
styled-components

=>Interfaces
 Pet - to define the structure of pet object returned by the API - https://eulerity-hackathon.appspot.com/pets

 =>API Layer
  to define the logic of fetch API call

=>Custom hooks
  1) usePets - to fetch and handle and the states (loading, error...) of the pets API
  2) useInfiniteScroll - we use this over pagination for seamless scroll and for better UX for mobile devices too.

=>Global state
  the image selection must be kept in global state as it should persists across pages. 
  So,we use React's Context API for this
   (context api over external libs like redux or zustand as we need to store only selection for this app. need not go for a huge lib just for this case )

=>Routing
  react-router-dom for this case
  3 routes
   - About
   - Home
   - Pet Details

=>utils
  -filter
  -sort
  -download

