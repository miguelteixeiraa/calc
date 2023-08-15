# Design Document: Calc App

## Overview

The Calc app is a web-based calculator that provides basic arithmetic operations using the math.js library. It works by evaluating the expressions that the user enters on the screen/calculator display (either by "ctrl+c/ctrl+v" or typing each digit using the calc app's keyboard).
It includes user authentication through MongoDB (with mongoose), uses Jotai for client-side state management, there's a storybook with some components, and some tests written with Vitest. This design document describes the application's architecture, components, and flow.

## Architecture

### Frontend

-   **Framework**: Next.js
-   **State Management**: Jotai
-   **Testing**: Vitest
-   **Some of the UI Development with**: Storybook
-   **User Interface + Themming**: Mostly Styled-components
-   **API Communication**: Client-side API requests using `fetch`

### Backend

-   **Database**: MongoDB with mongoose as the ODM
-   **API**: NextJs features
-   **Authentication**: JWT partially implemented

## Components and Features

### Authentication Flow

1. User enters their credentials (email and password) on the login page.
2. Frontend sends a POST request to the backend API for authentication.
3. Backend verifies the credentials and upon successful authentication, sends a User Data View Object.
4. Frontend stores user data into browser's local storage using Jotai.
5. To logout, user needs to go to Profile page and click logout button, then front-end clear browser local storage and user is successfully logged out.

### Calculator Functionality

-   User can enter a math expressions in an input field.
-   User can also input a math expression by using the calculator keyboard.
-   Upon submitting the expression, the mathjs library is called to get the result.
-   Frontend displays the result to the user.

### Jotai State Management

-   Jotai is used to manage client-side state, such as the theme, and user authentication status.
-   The user data and the theme are stored in separate Jotai atoms for easy access and reactivity.

## Note

The project needs lots of more testing, code refactoring, implementation of features like "history" and much more..
