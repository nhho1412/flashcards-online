## 🧠 Flashcard App – Learn Smarter, Remember Longer

A **ReactJS-based Flashcard Application** designed to help you memorize vocabulary efficiently through interactive virtual cards.  
You can **create, edit, shuffle, flip, import/export CSV data**, and even **search Japanese words** directly from the **Jisho API**.

---

### 🚀 Key Features

- 🃏 **Flashcard learning:** Flip cards to reveal answers or readings.  
- ⌨️ **Keyboard shortcuts:**
  - ⬅️ **Left Arrow:** Previous card  
  - ➡️ **Right Arrow:** Next card  
  - 🔁 **Space:** Flip the card  
  - 🔢 **0 (zero):** Jump back to the first card  
- ✏️ **Edit data** directly in a modal window.  
- 🎲 **Shuffle** all flashcards randomly.  
- 🔃 **Reverse** front/back sides (question ↔ answer).  
- 📤 **Export CSV**: Save your deck to a `.csv` file.  
- 📥 **Import CSV**: Load existing flashcards from a `.csv` file.  
- 🌐 **Japanese dictionary search** via **Jisho.org API**, with automatic Vietnamese translation.  
- 💾 **Auto-prefix “・”** to every non-empty line for cleaner data formatting.

---

### 🧩 Built With

- **ReactJS** (Create React App)  
- **Bootstrap 5** for UI  
- **Fetch API** for external requests  
- **MyMemory Translate API** (English → Vietnamese)

---

### 🖥️ Run Locally

In the project directory, you can run:

```bash
yarn start
```

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will automatically reload when you edit the code.  
You will also see lint errors in the console.

---

### 🧪 Run Tests

```bash
yarn test
```

Launches the test runner in interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more details.

---

### 🏗️ Build for Production

```bash
yarn build
```

Builds the app for production to the `build` folder.  
It bundles React in production mode and optimizes the build for the best performance.  
The output is minified and filenames include hashes.

Your app is ready to be deployed!

---

### ⚙️ Eject (Optional)

```bash
yarn eject
```

> ⚠️ **Warning:** This is a one-way operation. Once you eject, you can’t go back!

This command gives you full control over the configuration (Webpack, Babel, ESLint, etc.) by copying them into your project.  
All other commands will still work, but now reference your local config files.

---

### 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)  
- [React Official Documentation](https://reactjs.org/docs/getting-started.html)  
- [Jisho.org API](https://jisho.org/api/v1/search/words?keyword=example)

---

### 💡 Future Improvements

- Add **auto-flip learning mode**.  
- Store flashcards in **LocalStorage** or **IndexedDB**.  
- Tag cards by **topic or category** (e.g., grammar, kanji, vocabulary).  
- Enable **cloud sync** for data backup.

---

**Flashcard App** – *“Small Cards, Big Progress.”* 🌱  
Learn every day. Remember for life.
