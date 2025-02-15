# Plant Photo App Documentation

This is a technical documentation for the Plant Photo App.
The app was created as a homework assignment for NOCFO.
Implemented with React Native.

## Setting the environment

1. Clone the repository.

   ```bash
   https://github.com/GudokVlad-Pilot/PlantPhotoApp.git
   ```

2. Check that you have the latest Node.js version.

   ```bash
   node -v
   ```

3. If you do not have Node.js installed, you can download it from here: [Node.js website](https://nodejs.org/en).

4. [Expo Go](https://expo.dev/go) is recommended to be installed on your mobile device to see the app.

When everything is done, you can run the app.

## Instructions to run the app

1. Install dependencies.

   ```bash
   npm install
   ```

2. Start the app.

   ```bash
    npx expo start
   ```

3. Scan a QR code that will be displayed in the output with Expo Go, this launch the app on your mobile device. Web version is also available via link in the output, but the app is made primarily for mobile devices as it was the platform required by the assignment.

> [!NOTE]
> In this update were added:
> - Theme file with styles.
> - Tab buttons are hidden when keyboard is used.
> - Custom components added to avoid code repetitions.
> - Alerts are less agressive and inconcistent alert united in one custom component.

## The architecture of the app

### Language (required by the assignment)

- Typescript (React Native).

### Data Storage and Management

- React Context is used.
- The data is located in temporary storage (reset when the app restarts).
- "Plant properties" is used for added data.

### App navigation structure

- List: View for browsing and adding plants.
  - Plant Collection: The initial view with the list of plants.
  - Add New Plant: The view for adding plants.
  - Plant Details: The view for plant details and editing (consists of two modes).
    - Detail mode: The mode for displaying plant details.
    - Edit mode: The mode for editing plant details.
- Settings (empty): A simple navigable view with placeholder content.
- Profile (empty): A simple navigable view with placeholder content.

### Design

The app consist of Bottom navigation bar, Views and Top navigation header in the List View.

The icons for web and mobile versions were desined and added to the app (icon background color: #A3AB82). The same picture was used for the image placeholders.

The design is implemented with light and dark themes (automatically detecting the device theme of a user).

Light theme colors: 

- #949D6A
- #F2BB05
- #F1EDEE
- #2A2B2E


Dark theme colors:

- #5A6340
- #B28500
- #2E2A2B
- #D7CDCC

## Technical decisions

- Comments were added to each file to simplify the understanding of code.
- The components are using theme from the theme file to avoid code repetitions. Layouts are using their own hooks for themes because they do not accept StyleSheets.
- Custom components are used to avoid repetitions in the code.
- The app can be launched on the web in case of users are using not only the mobile devices.
- Two modes were used in Detail View as it was required to add the possibility to show the details and edit in the same View.
  - Edit mode looks similar to Scan View because it is user-friendly to have familiar design (user gets familiar with entering the data from Scan View and it is easier for them to use the same format in Edit mode).
  - Adding separate buttons for editing in Detail View instead of switching the modes would overload the interface with lots of features. 

## Screenshots

### The List View
![screenshot](/assets/screenshots/list_view.jpg)

### The Scan View
![screenshot](/assets/screenshots/scan_view.jpg)

### The bottom navigation bar
![screenshot](/assets/screenshots/bottom_navigation_bar.jpg)

The rest of screenshots can be found in /assets/screenshots.

## Conclusion

If you have any questions, you can contact me via email: **vladislavpogudin.dev@gmail.com**