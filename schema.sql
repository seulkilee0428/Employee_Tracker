-- Drops the employeesDB if it already exists --
DROP DATABASE IF EXISTS employeesDB;

-- Create the database employeesDB and specified it for use.
CREATE DATABASE employeesDB;

USE employeesDB;


-- Create the table department

CREATE TABLE department(
 id int NOT NULL AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY (id)
);
-- Create the table roles

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL (10, 4) NOT NULL,
    department_id INT(10),
    PRIMARY KEY (id),
);

-- Create the table employees
CREATE TABLE employees (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id  INT(10) NOT NULL,
  manager_id INT(10),
  PRIMARY KEY (id),
);

