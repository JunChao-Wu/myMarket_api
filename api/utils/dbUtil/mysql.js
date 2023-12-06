
import { Sequelize } from 'sequelize';


const mysql = new Sequelize('db_mymarket', 'root', 'MYSQL', {
  host: '127.0.0.1',
  // 选择一种支持的数据库:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: 'mysql',
  // 强制支持模型名称等于表名
  freezeTableName: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default mysql;

