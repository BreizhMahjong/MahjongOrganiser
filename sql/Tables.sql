CREATE TABLE bmjs_module (
	id				integer unsigned not null auto_increment,
	title			varchar(128) not null,
	end_date		date,
	type			tinyint unsigned not null default 0,
	constraint		module_pk primary key(id)
);

CREATE TABLE bmjs_module_option (
	module_id		integer unsigned not null,
	position		tinyint unsigned not null,
	title			varchar(32) not null,
	constraint		option_pk primary key(module_id, position),
	constraint		bmo_module_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);

CREATE TABLE bmjs_module_participation (
	module_id		integer unsigned not null,
	name			varchar(16) not null,
	time			datetime not null default current_timestamp,
	participation	integer unsigned not null,
	constraint		part_uni unique(module_id, name),
	constraint		bmp_option_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);

CREATE TABLE bmjs_module_comment (
	module_id		integer unsigned not null,
	name			varchar(16) not null,
	text			varchar(256) not null,
	time			datetime not null default current_timestamp,
	type			tinyint unsigned not null default 0,
	constraint		bmc_module_id_fk foreign key(module_id) references bmjs_module(id) on delete cascade on update restrict
);