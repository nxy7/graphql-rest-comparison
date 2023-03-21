CREATE TABLE "user_profile" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar,
  "email" varchar,
  "city" uuid,
  "phone_number" varchar,
  "avatar" varchar
);

CREATE TABLE "city" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar
  );

CREATE TABLE "friendship" (
  "u1" uuid,
  "u2" uuid,
  PRIMARY KEY ("u1", "u2")
);
ALTER TABLE "user_profile" ADD FOREIGN KEY ("city") REFERENCES "city" ("id");

ALTER TABLE "friendship" ADD FOREIGN KEY ("u1") REFERENCES "user_profile" ("id");

ALTER TABLE "friendship" ADD FOREIGN KEY ("u2") REFERENCES "user_profile" ("id");
