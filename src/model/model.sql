CREATE TABLE superadmin  (
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   login varchar(32) not null,
   password varchar(32) not null
);


CREATE TABLE briefly_about (
   briefly_id serial PRIMARY KEY,
   briefly_title varchar(64) not null,
   briefly_count varchar(32) not null
);

CREATE TABLE posts (
   post_id bigserial PRIMARY KEY,
   post_name varchar(64) not null,
   post_title varchar(256) not null,
   post_discription text not null,
   post_img text not null,
   post_type varchar(64) not null,
   post_status boolean not null,
   post_created_by varchar(128),
   post_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   post_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photo_box (
   photo_id bigserial PRIMARY KEY,
   photo_title varchar(256) not null,
   photo_url text not null,
   photo_category varchar (32) not null,
   photo_status boolean not null,
   photo_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   photo_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE video_box (
   video_id bigserial PRIMARY KEY,
   video_title varchar(256)  not null,
   video_url text not null,
   video_status boolean not null,
   video_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   video_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner (
   partner_id serial PRIMARY KEY,
   partner_name varchar(256) not null,
   partner_logo text not null,
   partner_status boolean not null,
   partner_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   partner_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE general (
   phone varchar(32) not null,
   email varchar(64) not null,
   address varchar(128) not null,
   locition text not null,
   work_time varchar(32) not null
);

CREATE TABLE social__link (
   social_id serial PRIMARY KEY,
   social__url varchar(256) not null
);

CREATE TABLE appeals (
   appeal_id bigserial PRIMARY KEY,
   applicant_name varchar(64) not null,
   applicant_phone varchar(32) not null,
   applicant_class varchar(32),
   applicant_content text not null,
   applicant_status boolean not false,
   applicant_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   applicant_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE our_certificate (
   certificate_id serial PRIMARY KEY,
   certificate_title text not null,
   certificate_photo text [] not null
);

CREATE TABLE our_activity (
   activity_id serial PRIMARY KEY,
   activity_title text not null,
   activity_photo text [] not null
);

CREATE TABLE management (
   management_id bigserial PRIMARY KEY,
   management_name varchar(128) not null,
   management_role varchar(64) not null,
   management_image text not null,
   telegram_link text not null,
   facebook_link text not null,
   instagram_link text not null,
   management_status boolean not null,
   management_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   management_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE employees (
   employee_id bigserial PRIMARY KEY,
   employee_name varchar(128) not null,
   employee_role varchar(64) not null,
   employee_image text not null,
   telegram_link text not null,
   facebook_link text not null,
   instagram_link text not null,
   employee_status boolean not null,
   employee_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   employee_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
)
