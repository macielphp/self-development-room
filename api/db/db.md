CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  season_id INTEGER REFERENCES seasons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  lesson_content TEXT NOT NULL,
  lesson_order INTEGER NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

CREATE TABLE alternatives (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

-- Season 1
INSERT INTO seasons(title, description)
VALUES (
  'Season 1: Listen to English experts',
  'Start your journey by listening to experienced English speakers.'
);

-- Lesson 1: John McWhorter
INSERT INTO lessons(season_id, title, lesson_content, lesson_order)
VALUES (
  1,
  'Lesson 1: 4 Reasons to Learn a New Language | John McWhorter',
  'https://www.youtube.com/watch?v=MMmOLN5zBLY',
  1
);

-- Questions for lesson 1
INSERT INTO questions (lesson_id, text) VALUES
(1, 'What is one of the reasons John mentions for learning a new language?'),
(1, 'How does learning a language affect your brain according to the video?'),
(1, 'What does John suggest about the connection between language and culture?');

-- Alternatives for lesson 1
INSERT INTO alternatives (question_id, text, is_correct) VALUES
(1, 'To order food in a restaurant.', FALSE),
(1, 'To impress your friends.', FALSE),
(1, 'To understand how others think.', TRUE),
(1, 'To travel without a dictionary.', FALSE),

(2, 'It makes your brain younger and more active.', TRUE),
(2, 'It makes you dream in black and white.', FALSE),
(2, 'It decreases memory.', FALSE),
(2, 'It improves your drawing skills.', FALSE),

(3, 'Language has no relation to culture.', FALSE),
(3, 'Language is just about grammar.', FALSE),
(3, 'Language carries cultural identity and perspective.', TRUE),
(3, 'Culture only exists in history books.', FALSE);

-- Lesson 2: Steve Kaufmann
INSERT INTO lessons(season_id, title, lesson_content, lesson_order)
VALUES (
  1,
  'Lesson 2: My Method for learning Languages from scratch | Steve Kaufmann',
  'https://youtu.be/mXqFD2bWHxU',
  2
);

-- Questions for lesson 2
INSERT INTO questions(lesson_id, text) VALUES
(2, 'What is Steve''s preferred method for learning a language from scratch?'),
(2, 'Why does Steve emphasize listening and reading together?'),
(2, 'What does Steve say about listening to content you don''t understand?'),
(2, 'According to Steve, how long does he typically stay in the beginner phase with a new language?');

-- Alternatives for lesson 2
INSERT INTO alternatives (question_id, text, is_correct) VALUES
(4, 'Taking grammar tests daily.', FALSE),
(4, 'Using beginner books briefly then moving to content with transcripts.', TRUE),
(4, 'Speaking only with native tutors.', FALSE),
(4, 'Focusing only on vocabulary flashcards.', FALSE),

(5, 'Because it helps connect audio with visual memory.', TRUE),
(5, 'Because reading is better than listening.', FALSE),
(5, 'Because writing is more important.', FALSE),
(5, 'Because it saves time.', FALSE),

(6, 'You should never do it.', FALSE),
(6, 'It is useless until you understand 100% of the words.', FALSE),
(6, 'It can be done with short content and transcripts.', TRUE),
(6, 'It works best with movies without subtitles.', FALSE),

(7, 'Only a few days.', FALSE),
(7, 'Approximately three months.', TRUE),
(7, 'One full year.', FALSE),
(7, 'Until he memorizes 1000 words.', FALSE);

CREATE TABLE user_lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, lesson_id)
);