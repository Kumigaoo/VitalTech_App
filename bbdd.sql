CREATE DATABASE ELDENCHAR_HOSPITAL;

CREATE TABLE ROOM (
    id int primary key,
    capacity int,
    floor int,
    type varchar(200)
);

CREATE TABLE BED(
    id int primary key,
    roomId int,
    FOREIGN KEY (roomId) REFERENCES ROOM(id)
);

CREATE TABLE PATIENT(
    clinicalCode int primary key,
    name varchar(200),
    phone varchar(20),
    gender varchar(200),
    city varchar(200),
    dni varchar(9),
    bedId int,
    FOREIGN KEY (bedId) REFERENCES BED(id)
);


