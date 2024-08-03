CREATE DATABASE myTodo;

USE myTodo;

CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    resetPasswordToken VARCHAR(255),
    resetPasswordExpires TIME
);

CREATE TABLE todo (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    createdTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    deadline DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Not Started', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Not Started',
    userID INT UNSIGNED NOT NULL,
    FOREIGN KEY (userID) REFERENCES user(id)
);
