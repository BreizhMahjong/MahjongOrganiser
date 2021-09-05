CREATE TABLE bmjs_module (
	id						integer unsigned not null auto_increment,
	title					varchar(128) not null,
	description				varchar(2048),
	available				integer unsigned not null,
	event_date				date not null,
	register_end_date		date not null,
	type					tinyint unsigned not null default 0,
	sticky					tinyint unsigned not null default 0,
	constraint				module_pk primary key(id),
	constraint				bm_date_integrity check(register_end_date <= event_date)
);

CREATE TABLE bmjs_module_option (
	module_id				integer unsigned not null,
	position				tinyint unsigned not null,
	title					varchar(32) not null,
	constraint				option_pk primary key(module_id, position),
	constraint				bmo_module_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);

CREATE TABLE bmjs_module_participation (
	module_id				integer unsigned not null,
	name					varchar(16) not null,
	time					datetime not null default current_timestamp,
	participation			integer unsigned not null,
	constraint				part_uni unique(module_id, name),
	constraint				bmp_option_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);

CREATE TABLE bmjs_module_comment (
	module_id				integer unsigned not null,
	name					varchar(16) not null,
	text					varchar(256) not null,
	time					datetime not null default current_timestamp,
	type					tinyint unsigned not null default 0,
	constraint				bmc_module_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);