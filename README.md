# <div align=center>React Native project</div>

###

<div align=center>
  <img src="https://github.com/IrynkaKol/react-native-project/blob/main/assets/colage.png" alt="MyCollages" />
</div>

## <div align=center>ask 1: Preparing for Work</div>

1. Install `expo`
2. Install `Android Studio`
3. Install `Xcode` (if working on a Mac)
4. Initialize the project using `expo` (Choose the`blank` project template)
5. Run the project
6. Configure `Android Studio`
7. Configure `Xcode` (if working on a Mac)
8. Install `expo client` on your phone
9. Run the created project on your phone, `Android` emulator or `iOS` simulator (if working on a Mac)

#

## <div align=center>Task 2: Screen Layout. Working with Styles. Debugging</div>

1. Create a `Screens` folder
2. Create a `RegistrationScreen` component
3. Create a `LoginScreen` component
4. Create a `PostsScreen` screen
5. Add form layout to the `RegistrationScreen` component
6. Add form layout to the `LoginScreen` component
7. Add styles to the `RegistrationScreen` component
8. Add styles to the `LoginScreen` component

###

- [RegistrationScreen Component Layout](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?type=design&node-id=3-26>)
- [LoginScreen Component Layout](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=12-0&t=tkIKc4K19uOKNunb-0>)

#

## <div align=center>Task 3: Event Handling. Working with Text Inputs and Keyboard</div>

- Add logic to work with the form in the `RegistrationScreen` component
- Add logic to work with the form in the `LoginScreen` component
- Collect data from the forms on submission and display it in the console
- Add auto-dismissal of the keyboard on click outside the forms (use `Keyboard.dismiss`)

#

## <div align=center>Task 4: Navigation</div>

1. Create `CreatePostsScreen` screen
2. Create `CommentsScreen` screen
3. Create `ProfileScreen` screen
4. Create `MapScreen` screen
5. Create `Home` screen
6. Connect navigation to the project
7. Add transitions between screens `LoginScreen`, `RegistrationScreen` using`createStackNavigator` component
8. From `RegistrationScreen` navigate to `LoginScreen`, by clicking on the text <b>Log In</b>
9. From `LoginScreen` navigate to `RegistrationScreen`, by clicking on the text <b>Sing Up</b>
10. After submission in `LoginScreen`, `RegistrationScreen` redirect to `Home`, where `PostsScreen` is immediately displayed
11. Connect bottom navigation using`createBottomTabNavigator`
12. Create 3 transitions in the bottom navigation.
13. Clicking on icon №1 leads to `PostsScreen`
14. Clicking on icon №2 leads to `CreatePostsScreen`
15. Clicking on icon №3 leads to `ProfileScreen`
16. Add an icon for `logout` in the header on the `PostsScreen`
17. Style the bottom navigation.

###

- [МPostsScreen Component Layout without Content](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=12-47>)
- [PostsScreen Component Layout with Posts](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=zLy5KtBgsPgUDWY3-0>)
- [CreatePostsScreen Component Layout upon Component Transition](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=4MUcNtbjSdtiKXV7-0>)
- [ProfileScreen Component Layout](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=kFkFeqKaLVknGboO-0>)
- [Interactive Navigation Example in Application](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=YKQMU635gnlpvN39-0>)

#

## <div align=center>Task 5: Native Components</div>

1. Connect the camera to the `CreatePostsScreen` component
2. When opening the `CreatePostsScreen` activate the camera, and display the image from it in a block with the camera icon.
3. Clicking on the camera icon takes a snapshot
4. Add a photo title to the input with the placeholder `Title`
5. Add a location to the input with the placeholder`Location`, where the snapshot was taken
6. Add location determination when creating a post by clicking the `Publish` button
7. After creating a post, redirect to the `PostsScreen`
8. When clicking on the comments icon in the individual post component, redirect to the `CommentsScreen`
9. In the individual post component, when clicking on the location icon, redirect to the `MapScreen`, where you can see a map with a marker where the photo was taken

###

- [CommentsScreen Component Layout with Comments](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=41-0&t=vDyJjIvhOk6v4uZ7-0>)
- [CreatePostsScreen Component Layout upon Screen Opening](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=hdpZPYSLTyS7klkX-0>)
- [CreatePostsScreen Component Layout after Taking a Photo](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=5kWIH0XRsJwnJfHy-0>)
- [MapScreen Component Layout](<https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=43-54&t=58UisgPOnMIySl1m-0>)

#

## <div align=center>Task 6: Redux and Firebase</div>

1. Connect `Redux` to the project
2. Connect `Firebase` to the project
   3.Add registration logic on the `RegistrationScreen` through `Firebase` methods
3. Add login logic on the `LoginScreen` using `Firebase` methods
4. ОUpdate the user profile on `Firebase` and add the login to the `displayName` field after registration
5. Store user data in `Redux` after registration or login
6. Add a check to see if the user is logged into the application. If logged in, redirect to the `PostsScreen`, otherwise, redirect to the `LoginScreen`
7. Add `Logout` logic on the `PostsScreen` when the icon in the header is clicked, using `Firebase` methods
8. Add logic to load posts into the database using `Firebase` and `Redux`
9. Add logic to add a comment under a post using `Firebase` and `Redux`

#

## <div align=center>Task 7: Deployment to Expo Servers</div>

- Deploy the project to `expo` servers
