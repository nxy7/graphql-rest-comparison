CREATE TABLE "user_profile" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "email" varchar,
  "city" uuid,
  "phone_number" string,
  "avatar" varchar
);

CREATE TABLE "city" (
  "id" uuid,
  "name" string,
)

CREATE TABLE "user_friend" (
  "user" uuid,
  "friends_with" uuid,
  PRIMARY KEY ("user", "friends_with")
);
ALTER TABLE "user_profile" ADD FOREIGN KEY ("city") REFERENCES "city" ("id");

ALTER TABLE "user_friend" ADD FOREIGN KEY ("user") REFERENCES "user_profile" ("id");

ALTER TABLE "user_friend" ADD FOREIGN KEY ("friends_with") REFERENCES "user_profile" ("id");
