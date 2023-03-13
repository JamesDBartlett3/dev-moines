# Component Structure

```
App
├── MainPage
│   ├── Header
│   ├── Sidebar
│   │   ├── MenuButton
│   │   ├── SearchFilter
│   │   └── SidebarItems { all display by default, filtered by input string }
│   ├── Map
│   └── Footer
**---------------/// Features below this line are planned for a later release.
├── InfoPage
│   ├── Content1
│   ├── Content2
│   └── Content3
└── ViewSourcePage
    ├── Content1
    ├── Content2
    └── Content3
```

## How to Use
The easiest way to use this app is to [view it live on GitHub Pages.](https://jamesdbartlett3.github.io/dev-moines/index.html)

For those of you who want to really dig into the source code, follow these steps in your command line:
$`git clone https://github.com/JamesDBartlett3/dev-moines.git`
$`cd dev-moines`
$`yarn install`
$`yarn start`

Once you've completed these steps, your computer should automatically launch a web browser pointed at the local dev server that you just launched. This dev server has some great features like live reloading, which make it much easier to code quickly and efficiently.

The rest of this README file is mostly just my own notes that I wrote down as I worked on this project. 

## The 7 Steps of Writing a React App
### (from "Fullstack React" revision 36, page 83)

1. [x] Break the app into components
2. [x] Build a static version of the app
3. [x] Determine what should be stateful
4. [x] Determine in which component each piece of state should live
5. [x] Hard-code initial states
6. [x] Add inverse data flow
7. [x] Add server communication

# Useful Node Modules

## React Project Setup
* [material-ui](https://material-ui.com/)
* material-components-web - React components formatted to Google's `Material` spec
* [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate.git) - Starter React project with ALL the bells and whistles
* [styled-components](https://www.styled-components.com/)
* [react-burger-menu](https://github.com/negomi/react-burger-menu)
* trot - `trot comp -c ComponentName -s y` - Creates a component with a dedicated css file
* react-toolbox - goodies for React
* plop - automated React component generator
* react-doc-generator - Generate simple React components documentation in Markdown.
* [elemental](http://elemental-ui.com/) - UI Toolkit for React.js Websites and Apps

## Maps Integration
- [react-google-maps](https://tomchentw.github.io/react-google-maps/) - Wrapper React components for Google Maps objects

# Dev Diary

## 08 Sep 2018
All right, y’all. I’m gonna dive back in and see if I can implement this conglomeration of hyper-optimization and build/test automation tools that I’ve been tinkering with all day.

I’ll be starting back at Square One on P7, but I think this project will go a lot more smoothly for me than any of the previous ones.
I’ve defined a bunch of simple, incremental milestones for myself, and established a clear, logical connection from each milestone to the next, so my odds of running into a situation that makes me feel lost and/or overwhelmed will be significantly reduced.

Once I’ve wrapped this project up, I’ll make it a point to spend some time documenting the process I’ve just described, and maybe it will help some other people who suffer from the same low-grade `atychiphobia` that I do.

- > Atychiphobia — (from Greek _atyches_ meaning “unfortunate”): Irrational fear of failure or defeat.
- > [Atychiphobia: Powerful Tips for Powerless Situations](https://kesirajuramprasad.wordpress.com/tag/atychiphobia/)

## 15 Sep 2018
Have decided to use `react-boilerplate` to create the app skeleton,
and then follow the 7-step process outlined above.

## 16 Sep 2018
Well, THAT was a colossal waste of time. I need to remember that these are ONLY
proof-of-concept apps, and I don't need to make them enterprise-ready yet. I keep
making this WAY more complicated than it should be.
OK, back to basics. I've now used `create-react-app` to scaffold the app, and
installed a select few libraries to help build it out faster, but nothing fancy.

I now have a functional main page with a title bar and sidebar, the Google Maps API
is working, and I have started tinkering with the code to make list items appear
in the sidebar.

## 17 Sep 2018
Today, I manually looked up a dozen or so tech companies in the DSM metro area, and added them all to a JSON file that I can use to populate the app with data while I'm waiting for my job search site API keys to be approved. Each entry has fields for the business name, address, phone number, website, and job title, for now. I also added folders for the API and JSON files to keep things organized, got a Foursquare PlaceAPI key, created the SearchFilter component, and added it to the sidebar.

Next steps:

- If a job search API key has been granted, learn how to use it, and start getting it to populate the sidebar with jobs.
- Else, keep fleshing out the app's components. There are still several more to go before it will meet the bare minimum for the project requirements, let alone be worthy of the portfolio.

## 22 Sep 2018
No job search API keys yet. Finally fixed the bug that was making the map scroll off the page on the right side.
Next up is to populate the sidebar with data from the test JSON file.

## 23 Sep 2018
Uploaded testdata to a [JSON file host](http://myjson.com/10q460) ([Direct JSON Access](https://api.myjson.com/bins/10q460)) with [its own API](http://myjson.com/api). Still trying to figure out how that works. Formatting issues are more or less sorted.

## 29 Sep 2018
JSON test data is now stored and accessed locally. Need to get one more external API working in order to qualify.
Used `atom-beautify` to consolidate the formatting style of all files in the project. Spent some time optimizing Atom. It was getting bloated and hard to use. Added some color-coding and project management features to help me deal with the scope and scale of this project.

Finally decided to just pull the plug on all the external frameworks I was trying to use for Google Maps integration, since they seemed to be getting in the way more than they were helping. Only a few hours after I made that decision and started a new branch called `simplified`, I've made enormous headway on getting the APIs to pull down external data.
The following are now working well:
- Google Maps Javascript API displays the map component without any help from external libraries or frameworks.
- Foursquare Places API takes a venue ID as input and returns an image url.
- OpenCage Geocoder API takes a street address as input and returns the lat/lng coordinates for that location.

## 30 Sep 2018
- MyJSON API is now also working, with full support for all necessary data to pass review.
I've bypassed all the other API calls for now, just so I can focus on getting this thing finished. I've saved all the company logo images on Google Drive, and stored the permalink for each one in its respective JSON object. All non-Google API calls are now being handled by the MyJSON API. Everything appears to be working, so I'm proceeding to the next step: Re-building the UI.
- Found a lightweight, responsive sidebar component called [`react-sidebar`](https://github.com/balloob/react-sidebar). I'll use this for now, just until I can get this project to pass review and get my nanodegree in the bag. After graduation, I'll conduct a complete overhaul of my portfolio, and the first item on the agenda will be replacing this temporary fix with a full-fledged implementation of [`Semantic-UI-React`](http://react.semantic-ui.com), which has much cleaner, more polished looking components, and supports hot-swapping entire themes in real-time.

## 31 Sep 2018
Finally found the source for the `react-sidebar` responsive example that I want to emulate. It's on the `gh-pages` branch of the repo [here](https://github.com/balloob/react-sidebar/tree/gh-pages/example). Will revisit once I've had some sleep.

## 5 Oct 2018
- Decided to scrap the`MaterialTitlePanel.js` component, as it was only adding complexity.
- Will need to write & implement a Controlled Component for the filter text field. (see the Contacts demo app)

## 9 Oct 2018
- Created yet another new branch to begin working on a dedicated map component, since I basically can't get access to any of the map stuff from any of the other components unless it has its own independent state & props from App.js. New branch is called `gmap-component`. Really hoping this is the last major redesign I'll need to do.

## 15 Oct 2018
- Sorry I haven't updated in a while. I've been working pretty hard, and I think I'm about ready to turn this thing in for grading.
