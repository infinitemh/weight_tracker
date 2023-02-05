- [X] Create entry form on main page for weights
- [X] Create line chart on main page
- [X] Store form data in localstorage (JSON)
- [X] Update chart to use localstorage
- [X] Add FlatList to history card
    - [X] Format the date to show as: Today, Yesterday, ...day of week, date string
- [X] Add UUID and use in renderItem
- [X] Fix bug where top of view encroaches on Android taskbar (SafeAreaView only applies to iOS 11+, not Android)
- [X] Pressing "tick" button from keypad on Android/iOS should trigger event handler
- [ ] Data validation (regex)
  - [ ] null input
  - [ ] non-numeric input
  - [ ] unrealistic input
  - [ ] spaces
  - [ ] punctuation (one decimal point)
  - [ ] number of decimal places (rounding)
- [ ] Clicking on entry allows for modification of the entry
- [ ] Button to delete entry
- [ ] Error message state, component below input, and disable button
- [-] Style
- [-] Refactor to components
- [ ] Build for iOS
- [ ] Build for Android
- [ ] Push notifications to remind user to weigh themselves

https://docs.expo.dev/versions/v47.0.0/sdk/date-time-picker/
npx expo install @react-native-community/datetimepicker