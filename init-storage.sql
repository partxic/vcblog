-- D1 数据库初始化 SQL 脚本文件, 可用于一键清空数据或初始化一个 D1 数据库
-- ( 如果 VCBlog 后端报错建议尝试执行该脚本 )
CREATE TABLE
    IF NOT EXISTS tmp (id INTEGER PRIMARY KEY AUTOINCREMENT);

DROP TABLE tmp;

DROP TABLE IF EXISTS storage;

DELETE FROM sqlite_sequence;

CREATE TABLE
    storage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL DEFAULT 'post',
        title TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT ''
    );