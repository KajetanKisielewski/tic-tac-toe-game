# Tic-Tac-Toe Game

## Overview

This is a simple Tic-Tac-Toe game built using React, XState, and Styled Components. The game allows two players to play Tic-Tac-Toe, tracks the state of the game, and provides feedback on the game’s outcome (win, lose, draw). The game also includes a reset functionality to start a new game. Additionally, the game supports playing against an AI opponent powered by GPT-4.

## Features

- Functional components and React hooks for managing the state.
- State machine managed with XState for clear state transitions.
- Styled Components for modular and reusable styling.
- Comprehensive unit tests using Jest and React Testing Library.
- AI opponent powered by GPT-4 for an enhanced gameplay experience.
- Dynamic grid scaling with increasing difficulty across rounds (3x3, 4x4, 5x5).

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/KajetanKisielewski/tic-tac-toe-game
   ```

1. Navigate to the project directory::
   ```
   cd tic-tac-toe-game
   ```

1. Install dependencies:
   ```
   npm install
   ```

## Configuration

Before running the application, make sure to set up the required environment variables. Create a `.env` file in the root directory of the project with the following content:

   ````
   REACT_APP_API_KEY=your-api-key-here
   ````

## Running the Project

To run the project locally, use:

```
 npm start
```

This will start the development server, and the project will be available at http://localhost:3000.

## Running Tests

The project includes unit tests to ensure that the game logic, state management, and UI rendering work as expected. To
run the tests, use:

```
 npm test
```

## Project Structure

- **src/components/**: Contains React components like `App`, `Board`, and `Square`.
- **src/hooks/**: Contains custom React hook for AI integration.
- **src/states/**: Contains state management logic.
- **src/styles/**: Contains Styled Components for styling the application.
- **src/tests/**: Contains test files for components and logic.
- **src/utils/**: Contains utility functions used in the game logic.

## Approach and Design Decisions

### React and Functional Components

The project is built using React with a focus on functional components and React hooks. This approach was chosen for its simplicity, reusability, and ease of maintenance. Functional components, combined with hooks like useMachine and custom hooks like useAIMove, enable us to manage state and side effects cleanly within each component.

### AI integration with GPT-4-Turbo

The game features an AI opponent powered by GPT-4-Turbo, providing a dynamic and challenging gameplay experience. The AI logic is encapsulated within a custom hook (useAIMove), making it easy to manage and extend. The integration allows for flexible and interactive gameplay against an AI that adapts to the current state of the game.

### Project Structure

The project is organized to be intuitive and scalable, with separate directories for components, styles, hooks, tests, and utility functions. This structure promotes clean code practices and makes it easier for developers to navigate and extend the project.

### Dynamic Grid Scaling

The game features dynamic grid scaling, where each round increases the grid size from 3x3 to 4x4 and then to 5x5. This feature adds complexity and replayability to the game, providing a fresh challenge with each round.

### Summary

My approach was centered around creating a robust, maintainable, and scalable Tic-Tac-Toe game. The combination of React, XState, and Styled Components provides a strong foundation for building interactive applications, while the rigorous testing ensures that the application behaves as expected across different scenarios. The inclusion of AI-driven gameplay adds an additional layer of challenge and engagement, making this project both fun and educational.