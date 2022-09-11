# Nextrains - Real-time UK Trains Enquiries App

![Nextrains App](https://drive.google.com/file/d/1_UugSe95w08U0UvLFMtlEg6YtDTK4c1V/view?usp=sharing)

## Why Another UK Train App?

I find that catching and changing trains in UK is quite a daunting task as trains are often _late or cancelled_, meaning the connecting trains are often not the planned ones. Using the apps by train companies often would require _a lot of tapping, searching and updating_. That's what the Nextrains app tries to solve by providing all the essential information on a single page.

## Features

- **Get the real-time train info fast between two train stations (for up to two hours from now)**
  - departure platform is highlighted
  - with count-down timer to departure
  - a tag to indicate the fastest train to arrival at destination
- **Optionally add an exchange station**
  - by selecting a train in the first leg, the connecting trains will be shown with the available time for changing trains
- Real-time notices for delay/cancellation are shown whenever available
- Localstorage to store selected stations
- A reverse button for fast retrieving return information
- Light/Dark theme

## Tech Stacks

### Front-end

- React (with _create-react-app_ as this app displays real-time information in a SPA, no server-side rendering or SEO info is required)
- Typescript - for type-checking to reduce bugs
- TailwindCSS - as this app is rather simple, TailwindCSS allows fast styling without the overhead of extra css files
- MUI
- Jest/React Testing Library
- Figma - for logo and UI design

### Back-end

A simple node server is created to retrieve information from the source API by supplying the API secret key from the server instead of the client side.

- Node.js
- Express

### CI/CD

- A simple github action has been set up to perform automatic testing before merging into the main branch.
- Connected to Heroku for automatical deployment upon commiting to github.

## Data Source

- UK trains real-time arrival and departure info is provided by [National Rail Enquiries](https://www.nationalrail.co.uk/100296.aspx)
