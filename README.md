## 🧮 Simple Calculator Application

### Starting the project:

#### Backend
Navigate to backend directory and run:
`npm run start:dev`\
This command will start the backend server on http://localhost:3000.

Supported Endpoints:
- `sum/{operand1}/{operand2}` - will return object with one `result` field containing the sum of `operand1` and `operand2`
- `sub/{operand1}/{operand2}` - will return object with one `result` field containing the subtraction of `operand1` and `operand2`
- `multi/{operand1}/{operand2}` - will return object with one `result` field containing the multiplication of `operand1` and `operand2`
- `div/{operand1}/{operand2}` - will return object with one `result` field containing the division of `operand1` and `operand2`

#### Frontend
Navigate to backend directory and run:
`ng serve` (or `ng serve -o` to open new tab in the browser automatically).\
This command will start the frontend application on http://localhost:4200.

Supported routes:
- `sum/{operand1}/{operand2}` - will display the result of the sum of `operand1` and `operand2` on the calculator
- `sub/{operand1}/{operand2}` - will display the result of the subtraction of `operand1` and `operand2` on the calculator
- `multi/{operand1}/{operand2}` - will display the result of the multiplication of `operand1` and `operand2` on the calculator
- `div/{operand1}/{operand2}` - will display the result of the division of `operand1` and `operand2` on the calculator

---

#### ❗In order to be able to perform calculations on the client the backend must be running.

---

#### Tech stack:

- Angular
- Node.js
- TypeScript
- CSS

---