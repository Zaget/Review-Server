COPY reviews FROM '/Users/Andyderson/Desktop/Zaget-SDC-Review-Server/reviews.csv' delimiter '|' csv;

CREATE TABLE reviews (place_id INTEGER, author_name text, profile_photo_url text, rating INTEGER, text text, relative_time_description text);

-- //<<<<<<<<<<<< Mongoexport Data Migration >>>>>>>>>>>>>>>>>>

mongoexport -d apateez-reviews -c stores --out reviews.csv --type csv -f place_id,reviews[1].author_name,reviews[1].profile_photo_url,reviews[1].rating,reviews[1].text,reviews[1].relative_time_description,reviews[2].author_name,reviews[2].profile_photo_url,reviews[2].rating,reviews[2].text,reviews[2].relative_time_description,reviews[3].author_name,reviews[3].profile_photo_url,reviews[3].rating,reviews[3].text,reviews[3].relative_time_description,reviews[4].author_name,reviews[4].profile_photo_url,reviews[4].rating,reviews[4].text,reviews[4].relative_time_description,reviews[5].author_name,reviews[5].profile_photo_url,reviews[5].rating,reviews[5].text,reviews[5].relative_time_description,reviews[6].author_name,reviews[6].profile_photo_url,reviews[6].rating,reviews[6].text,reviews[6].relative_time_description,reviews[7].author_name,reviews[7].profile_photo_url,reviews[7].rating,reviews[7].text,reviews[7].relative_time_description,reviews[8].author_name,reviews[8].profile_photo_url,reviews[8].rating,reviews[8].text,reviews[8].relative_time_description

mongoexport -d apateez-reviews -c stores --out reviews.csv --type csv -f place_id,reviews.author_name,reviews.profile_photo_url,reviews.rating,reviews.text,reviews.relative_time_description --limit 10