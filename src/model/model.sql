CREATE TABLE superadmin  (
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   login varchar(32) not null,
   password varchar(32) not null
);


CREATE TABLE about (
   about_id serial PRIMARY KEY,
   about_title varchar(64) not null,
   about_count varchar(32) not null
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
   post_is_delete boolean DEFAULT false,
   post_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   post_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photo_box (
   photo_id bigserial PRIMARY KEY,
   photo_title varchar(256) not null,
   photo_url text not null,
   photo_category varchar (32) not null,
   photo_name text not null,
   photo_status boolean not null,
   photo_is_delete boolean DEFAULT false,
   photo_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   photo_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE video_box (
   video_id bigserial PRIMARY KEY,
   video_title varchar(256)  not null,
   video_url text not null,
   video_status boolean not null,
   video_is_delete boolean DEFAULT false,
   video_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   video_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner (
   partner_id serial PRIMARY KEY,
   partner_name varchar(256) not null,
   partner_logo text not null,
   partner_logo_name text not null,
   partner_status boolean not null,
   partner_is_delete boolean DEFAULT false,
   partner_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   partner_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE general (
   phone varchar(32) not null,
   email varchar(64) not null,
   address varchar(128) not null,
   locition text not null,
   work_time varchar(32) not null,
   telegram_link text not null,
   facebook_link text not null,
   instagram_link text not null
);



CREATE TABLE appeals (
   applicant_id bigserial PRIMARY KEY,
   applicant_name varchar(64) not null,
   applicant_phone varchar(32) not null,
   applicant_class varchar(32),
   applicant_content text not null,
   applicant_status boolean DEFAULT false,
   applicant_is_delete boolean DEFAULT false,
   applicant_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   applicant_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE our_certificate (
   certificate_id serial PRIMARY KEY,
   certificate_title text not null,
   certificate_photo text [] not null,
   certificate_photo_name text [] not null,
   certificate_status boolean DEFAULT false,
   certificate_is_delete boolean DEFAULT false,
   certificate_creared_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   certificate_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE our_activity (
   activity_id serial PRIMARY KEY,
   activity_title text not null,
   activity_photo text [] not null,
   activity_photo_name text [] not null,
   activity_status boolean DEFAULT false,
   activity_is_delete boolean DEFAULT false,
   activity_creared_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   activity_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE management (
   management_id bigserial PRIMARY KEY,
   management_name varchar(128) not null,
   management_role varchar(64) not null, 
   management_image text not null,
   management_image_name text not null,
   management_phone varchar(32) not null,
   management_reception_time varchar (128) not null,
   management_winning text not null,
   management_full_info text not null,
   management_academic_degree text not null,  
   management_telegram_link text not null,
   management_facebook_link text not null,
   management_instagram_link text not null, 
   management_status boolean not null,
   management_is_delete boolean DEFAULT false,  
   management_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   management_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE employees (
   employee_id bigserial PRIMARY KEY,
   employee_name varchar(128) not null,
   employee_role varchar(64) not null,
   employee_image text not null,
   employee_image_name text not null,
   employee_winning text not null,
   employee_full_info text not null,
   employee_academic_degree text not null,   
   employee_telegram_link text not null,
   employee_facebook_link text not null,
   employee_instagram_link text not null, 
   employee_status boolean not null,
   employee_is_delete boolean DEFAULT false,  
   employee_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
   employee_deleted_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
