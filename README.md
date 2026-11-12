# Classroom Calculator | מחשבון כיתתי

## English

### The idea

This is a small collaborative calculator for learning JavaScript and practicing Git branches, commits, and pull requests. The starting calculator has number keys and a clear button; the class adds the math operations together. When an operation is merged into `main`, its button and contributor appear automatically.

### How it works

Every operation is an object in [`operations.js`](./operations.js). The app reads that list and builds the **Class Operations** buttons and **Contributors** list. No build step or package installation is needed.

- A **one-number** operation (`arity: 1`) runs on the number currently displayed.
- A **two-number** operation (`arity: 2`) saves the first number. Enter the second number and press the generated **Calculate …** button.
- `execute` must return a finite JavaScript number. Throw an `Error` with a helpful message when the input is invalid (for example, division by zero).
- Keep `id` unique, and include a short `label`, `symbol`, and your `contributor` name.

For example, addition looks like this:

```js
{
  id: "add",
  label: "Addition",
  symbol: "+",
  arity: 2,
  contributor: "Your name",
  execute: (first, second) => first + second,
},
```

Add your object inside the `operations` array in `operations.js`. Do not replace the array or change the app files for an ordinary math contribution.

### Run the calculator

1. Clone the repository and move into its folder:

   ```bash
   git clone https://github.com/nch22522/kodkod_class-calculator.git
   cd kodkod_class-calculator
   ```

2. Start a local static server:

   ```bash
   python3 -m http.server 8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C` when you are done.

### Make a contribution

1. Open [`TODO.md`](./TODO.md), choose an unchecked function, and put your name in the Student column. Coordinate with your class if someone else has already claimed it.
2. Create a branch for your function:

   ```bash
   git checkout -b feature/function-name
   ```

   For example: `git checkout -b feature/addition`.

3. Add your operation object to the `operations` array in `operations.js`. Choose `arity: 1` for one input or `arity: 2` for two inputs. Use clear names and test your operation in the browser.
4. Mark your task `[x]` in `TODO.md` and add your name to the Student column.
5. Save, commit, and push your branch:

   ```bash
   git add operations.js TODO.md
   git commit -m "Add function-name operation"
   git push -u origin feature/function-name
   ```

   Replace `function-name` with your branch name in both commands.

6. Open a pull request from your branch into `main` on GitHub. Include the operation name and a short description of how you tested it. After the pull request is reviewed and merged, your operation appears in the shared calculator.

---

## עברית

### הרעיון

זהו מחשבון כיתתי שיתופי ללימוד JavaScript ולתרגול של ענפים, commits ו־Pull Requests ב־Git. המחשבון מתחיל עם מקשי מספרים וכפתור ניקוי; הכיתה מוסיפה יחד פעולות מתמטיות. לאחר שמיזוג הפעולה לענף `main` הושלם, הכפתור שלה ושם התורם מופיעים אוטומטית.

### איך זה עובד?

כל פעולה היא אובייקט במערך שבקובץ [`operations.js`](./operations.js). האפליקציה קוראת את המערך ובונה ממנו את כפתורי **Class Operations** ואת רשימת **Contributors**. אין צורך בתהליך build או בהתקנת חבילות.

- פעולה עם **מספר אחד** (`arity: 1`) פועלת מיד על המספר שמוצג.
- פעולה עם **שני מספרים** (`arity: 2`) שומרת את המספר הראשון. מזינים מספר שני ולוחצים על כפתור **Calculate …** שנוצר.
- `execute` צריכה להחזיר מספר JavaScript סופי. במקרה של קלט לא תקין, יש לזרוק `Error` עם הודעה מועילה (למשל, חילוק באפס).
- חשוב לבחור `id` ייחודי ולציין `label`, `symbol` ושם של `contributor`.

לדוגמה, פעולת חיבור:

```js
{
  id: "add",
  label: "Addition",
  symbol: "+",
  arity: 2,
  contributor: "Your name",
  execute: (first, second) => first + second,
},
```

מוסיפים את האובייקט למערך `operations` שבקובץ `operations.js`. בתרומה רגילה של פעולה מתמטית אין צורך להחליף את המערך או לשנות את קובצי האפליקציה.

### הפעלת המחשבון

1. משכפלים את המאגר ונכנסים לתיקייה:

   ```bash
   git clone https://github.com/nch22522/kodkod_class-calculator.git
   cd kodkod_class-calculator
   ```

2. מפעילים שרת מקומי סטטי:

   ```bash
   python3 -m http.server 8000
   ```

3. פותחים בדפדפן את [http://localhost:8000](http://localhost:8000). לסיום לוחצים `Ctrl+C`.

### איך תורמים?

1. פותחים את [`TODO.md`](./TODO.md), בוחרים פעולה שעדיין לא סומנה ומוסיפים את השם בעמודת Student. כדאי לתאם עם הכיתה כדי שלא לבחור פעולה שכבר נתפסה.
2. יוצרים ענף חדש עבור הפעולה:

   ```bash
   git checkout -b feature/function-name
   ```

   לדוגמה: `git checkout -b feature/addition`.

3. מוסיפים אובייקט פעולה למערך `operations` שבקובץ `operations.js`. בוחרים `arity: 1` לקלט אחד או `arity: 2` לשני קלטים. משתמשים בשמות ברורים ובודקים את הפעולה בדפדפן.
4. מסמנים `[x]` ליד המשימה ב־`TODO.md` ומוסיפים את השם בעמודת Student.
5. שומרים, מבצעים commit ודוחפים את הענף:

   ```bash
   git add operations.js TODO.md
   git commit -m "Add function-name operation"
   git push -u origin feature/function-name
   ```

   מחליפים את `function-name` בשם הענף שיצרתם.

6. פותחים ב־GitHub Pull Request מהענף שלכם אל `main`. מוסיפים תיאור קצר של הפעולה ושל אופן הבדיקה. לאחר review ומיזוג, הפעולה תופיע במחשבון הכיתתי.
