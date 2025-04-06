# Language Page


### 💡 Maciel's inspiration:
- My own dedication to learn English and the skills I acquired through years.

---

### 📚 Researched Articles:


---

## 📊 KPIs (Key Performance Indicators)

### 1. **How many lessons has the user completed?**

### 2. **How many Seasons has the user completed?**
---

## 🛠️ Dev's First Development Mission
1. Choose which language you want to learn:  
   - English (select - this will be the only language available)  
2. What are the days you will dedicate to studying? SUN, MON, TUE... (select)  
3. How much time will you dedicate to it? {number} minutes (insert the number of minutes)  
   - Tasks will show up in the calendar based on the frequency that the users choose.  
4. What will you get/feel when you achieve all of it?  
   - List your rewards.  
5. How long do you think/plan this will take for you to reach this result? {number} months (insert the number of months)  

### How will data be stored?  
- LocalHost, local database, or cloud?  
- While in development, the data must be stored in localStorage.  
All this data will be collected and stored in a relational table. The user will be redirected to a new "page."  

---

### Dev's Ideas  
After all this, a new table will be created just for the chosen language, or a sub-item in the AppBar list will appear below "Language," something like:  
**Language > English** (user's chosen language).  
- Inside the "sub-page" for Language, the user will have a pre-defined roadmap to learn that language.  
- The roadmap might be a list of **tasks** that the user must complete in order to achieve their goal.  

---

### Dev's UI Ideas  
- Each question must be asked **one at a time**.  
- A special **Box component** will have a transition as users click the "Next" or "Previous" button.  
- There will be:  
  - A **question box**  
  - An **answer box** (select dropdown, list, number input, or calendar)  
  - **Previous** | **Next** buttons  

---

### Dev's Tasks  
1. **Create the page LanguagePage.jsx** with an interactive form.  
2. **Split the questions into steps** using a **Stepper** or a **transition-based card system**.  
3. **Store data in localStorage** temporarily.  
4. **Create a structure** to save and display user information later.  

---

### Suggested MUI Components for the Form  
1. **Select (Dropdown)** – To select the language and study days.  
2. **TextField (Number Input)** – To enter daily study time and study duration.  
3. **CheckboxGroup** – To allow multiple day selections.  
4. **Stepper or Transition Box** – To guide the user step by step through the form.  
5. **Buttons (Next/Previous)** – To navigate between steps.  

---

### ✅ What Does the LanguagePage Code Do?  
- Uses a **Stepper** to guide the user through **5 questions**.  
- Uses **useState** to store form responses.  
- Uses **localStorage** to temporarily save user data.  
- Has **"Next"** and **"Back"** buttons for navigation.  
- When the form is completed, the data is saved, and an **alert is displayed**.  

---

## Second dev's mission
1. The form will not be display anymore as the user already filled it in. Now, a screen will appear 
with the first user's "Lesson" of the roadmap. 

- So there will be seasons and lessons. A season contains lots of lessons. 
- To start, there will be: Season 1 - Listen tips from experts; Season 2 - Time to build a fundation;
- Season 1 - Listen tips from experts; 
   - Lesson 1 - 4 reasons to learn a new language | John McWhorter
   - Watched ? 3 questions : watch it!
   - Answered the questions? Send button : answer them!
   - Answers sended? Show the correct alternatives : send the answers!
   - Was the score equals or greater than 2(70%) correct answers? Show 2 options[repeat || Continue] : Repeat the lesson!
   - Has the users hitted the "Continue button"? Give a fadded effect to the previous lesson's box and move him/her to the next lesson's box and update the lesson's progress bar([0 + 1 = 1 index = lesson '2']) while the season's progress bar continue in 1(as the user is in season 1[0 index])
   ;
- The first Season contains a list of 10 youtube videos. As the users complete each video, the progress bar gets even more closer to 100%. When the user complete the 'first mission', then we'll take him/her to the second one. 
- In the end of each youtube video, the user will have to answer 3 questions about the video. Each questions has 4 alternatives and only one is correct. The answers will be revelead when he/she press the send button. The correct answer of each question will appear right below the last questions in the Answer's Box.
- After answering the questions of the lesson/video and the answers has appeared. A box with 2 options will shown up: Repeat the lesson or Continue. 
the user will see a box with a count regression from 
### 📌 Next Steps  
1️⃣ **Create a page** that displays the user's data after completing the form.  
2️⃣ **Allow users to edit** their data later.  
3️⃣ **Create an interactive calendar** that shows planned study days.  

---

## 🛠️ Dev's Second Development Mission(coming next)

### How will data be stored?  
- LocalHost, local database, or cloud?  
- While in development, the data must be stored in **localStorage**.  
All this data will be collected and stored in a **relational table**. The user will then be redirected to a new **"page"**.  

---

### Dev's Ideas  
- After the form is completed, the user will no longer see it. Instead, a clean interface will display the **first lesson** from a structured roadmap.  
- The roadmap will be split into **seasons**, and each season contains a series of **lessons**.  
- Users will go through each lesson by:  
  - Watching a YouTube video.  
  - Answering 3 multiple-choice questions (only one correct answer per question).  
  - Receiving immediate feedback with correct answers after submitting.  
  - Choosing between **"Repeat the Lesson"** or **"Continue"** if they score at least 70% (2/3 correct).  
- Once the user completes a lesson, the system visually updates the progress bar and prepares the next lesson.  
- Once all lessons in a season are completed, the next **season card** becomes unlocked.

---

### Dev's UI Ideas  
- There must be a **progress bar** showing how many lessons the user has completed (KPI).  
- A **Box** containing **Media Card** components (MUI) with the following styles:  
  - `display: flex`  
  - `flexWrap: wrap`  

#### Sub-components inside each Card (Media):  
- **Image** at the top  
- **Box** with the season title (top overlay or top-left inside the card)  
- **Text description** (middle section)  
- **Action container** including:  
  - A **visual icon**  
    - **Logic:** Has the user completed this lesson?  
      - ✅ Yes → Show `completeGreenIcon`  
      - ❌ No → Show `completeFadedIcon`  
  - A **button**  
    - **Logic:**  
      - ✅ Completed → Label: `Review`  
      - ❌ Not completed → Label: `Start`  

#### Navigation Logic (BoxContainer):  
- When the user **clicks on a media card (season[0])**:  
  - The container that holds all season cards → `display: none`  
  - The selected season's general Box → `display: block`  
- **Unlock logic:**  
  - Has the user completed **season[0]**?  
    - ✅ Yes → Remove **faded effect** from **season[1]**'s card  
    - ✅ Yes → Allow click/navigation  
    - ❌ No → Keep **season[1]** card with **faded effect** and make it **unclickable**

---

### Dev's Tasks  
1. Implement a logic to display the language seasons.
2. Build **progress tracking** logic (lesson and season level).  
3. Implement **lesson validation logic** based on video watching and question answering.  
4. Handle **lesson transitions** (fade-out old, fade-in next).  
5. Make sure progress is saved in **localStorage** or optionally in a local database in future iterations.  
6. Update the AppBar to reflect the selected language path (e.g., `Language > English`).  
7. Prepare structure for **editing user data** later on.

---

### Suggested MUI Components for the Form  
- `Box` – for layout and section containers  
- `Card` (Media variant) – for each lesson or season card  
  - https://mui.com/material-ui/react-card/  
- `Typography` – for text content and titles  
- `LinearProgress` or `CircularProgress` – for progress tracking visuals  
- `Button` – to move between lessons or perform actions  
- `Icon` – to indicate lesson completion (check, lock, etc.)
