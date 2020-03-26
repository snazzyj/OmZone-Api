CREATE TABLE meditation_log (
    id INTEGER REFERENCES users(id),
    date_published TIMESTAMP DEFAULT now() NOT NULL,
    minutes INTEGER NOT NULL
)