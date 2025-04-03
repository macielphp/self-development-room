## First Mission on LanguagePage  
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

### 📌 Next Steps  
1️⃣ **Create a page** that displays the user's data after completing the form.  
2️⃣ **Allow users to edit** their data later.  
3️⃣ **Create an interactive calendar** that shows planned study days.  
