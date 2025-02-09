# Plant App Documentation

This is a technical documentation for the Plant Photo App.
The app was created as a homework assignment for NOCFO.
Implemented with React Native.

## Setting the environment

1. Clone the repository

   ```bash
   https://github.com/GudokVlad-Pilot/PlantPhotoApp.git
   ```

2. Check that you have the latest Node.js version

   ```bash
   node -v
   ```

3. If you do not have Node.js istalled, you can download it from here: [Node.js website](https://nodejs.org/en)

4. [Expo Go](https://expo.dev/go) is recommended to be installed on your mobile device to see the app.

When everything is done, you can run the app.

## Instructions to run the app

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Scan a QR code that will be displayed in the output with Expo Go, this launch the app on your mobile device. Web version is also available via link in the output, but the app is made primarily for mobile devices as it was the platform required by the assignment.

## The architecture of the app

### Language

- Typescript (React Native) (Required by the assignment)

### Data Storage and Management

- React Context is used.
- The data is located in temporary storage (reset when the app restarts).
- "Plant properties" is used for added data.

### Design

The app consist of Bottom navigation bar, Views and Top navigation header in the List View.

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

## Navigation

- List: View for browsing and adding plants.
- Settings (empty): A simple navigable view with placeholder content.
- Profile (empty): A simple navigable view with placeholder content.

## Screenshots

### The List View
![screenshot](/assets/screenshots/list_view.jpg)

### The Scan View
![screenshot](/assets/screenshots/scan_view.jpg)

### The bottom navigation bar
![screenshot](/assets/screenshots/bottom_navigation_bar.jpg)

The rest of screenshots can be found in /assets/screenshots