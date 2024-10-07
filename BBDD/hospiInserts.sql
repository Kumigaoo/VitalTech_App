INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (1, 30);
INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (2, 30);
INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (3, 30);
INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (4, 30);
INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (5, 30);
INSERT INTO Plantes (Piso, CapacitatHabitacions) VALUES (6, 30);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (101, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (102, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (103, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (104, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (105, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (106, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (107, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (108, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (109, (SELECT Id FROM Plantes WHERE Piso = 1), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (201, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (202, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (203, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (204, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (205, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (206, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (207, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (208, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (209, (SELECT Id FROM Plantes WHERE Piso = 2), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (301, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (302, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (303, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (304, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (305, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (306, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (307, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (308, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (309, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (310, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (311, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (312, (SELECT Id FROM Plantes WHERE Piso = 3), 2);

INSERT INTO Habitacions (CodiHabitacio, PlantaId, CapacitatLlits) 
VALUES (401, (SELECT Id FROM Plantes WHERE Piso = 4), 2);



INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('101A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '101'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('101B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '101'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('102A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '102'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('102B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '102'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('103A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '103'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('103B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '103'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('104A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '104'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('104B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '104'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('105A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '105'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('105B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '105'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('106A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '106'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('106B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '106'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('107A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '107'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('107B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '107'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('108A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '108'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('108B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '108'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('109A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '109'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('109B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '109'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('201A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '201'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('201B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '201'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('202A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '202'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('202B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '202'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('203A', 0, 1, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '203'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('203B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '203'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('204A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '204'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('204B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '204'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('205A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '205'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('205B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '205'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('206A', 0, 1, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '206'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('206B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '206'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('207A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '207'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('207B', 1, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '207'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('208A', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '208'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('208B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '208'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('209A', 0, 1, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '209'));

INSERT INTO Llits (CodiLlit, Ocupat, ForaDeServei, HabitacioId) 
VALUES ('209B', 0, 0, (SELECT Id FROM Habitacions WHERE CodiHabitacio = '209'));


INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('59099146W', 'UZKY00001021004', 'Naruto', 'Uzumaki', 'Kyubi', 'M', '2000-10-21');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('21403359L', 'HAYA00003281007', 'Sakura', 'Haruno', 'Yamanaka', 'F', '2000-03-28');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('59575320F', 'UCYU00007231005', 'Sasuke', 'Uchiha', 'Yurei', 'M', '2000-07-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('78342394R', 'HAKA08009151003', 'Kakashi', 'Hatake', 'Kazama', 'M', '1980-09-15');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('96838460L', 'HYHO00112271008', 'Hinata', 'Hyuga', 'Hoshino', 'F', '2001-12-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('50126267K', 'NATA00009221006', 'Shikamaru', 'Nara', 'Takeda', 'M', '2000-09-22');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('13934574R', 'YAFA00009231007', 'Ino', 'Yamanaka', 'Fujimoto', 'F', '2000-09-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('13729209A', 'AKFU00005011003', 'Choji', 'Akimichi', 'Fujikawa', 'M', '2000-05-01');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('39657070X', 'INYA00007071009', 'Kiba', 'Inuzuka', 'Yamada', 'M', '2000-07-07');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('01129396G', 'ABNI00001231005', 'Shino', 'Aburame', 'Nishikawa', 'M', '2000-01-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('14096750G', 'LEMU00011271004', 'Rock', 'Lee', 'Murakami', 'M', '2000-11-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('44382219Q', 'HYNA00007031001', 'Neji', 'Hyuga', 'Nakamura', 'M', '2000-07-03');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('28226573F', 'HIMI00003091007', 'Tenten', 'Hino', 'Miyamoto', 'F', '2000-03-09');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('78453868V', 'SATSU0001191003', 'Gaara', 'Sabaku', 'Tsuchikage', 'M', '2000-01-19');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('05891305Q', 'SAAM00008231001', 'Temari', 'Sabaku', 'Amamiya', 'F', '2000-08-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('54096548L', 'SAKO00004151009', 'Kankuro', 'Sabaku', 'Koizumi', 'M', '2000-04-15');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('64345959D', 'SEUZ06508021007', 'Tsunade', 'Senju', 'Uzumaki', 'F', '1965-08-02');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('69722115F', 'SAOG06011111002', 'Jiraiya', 'Sannin', 'Ogata', 'M', '1960-11-11');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('33403288C', 'SATS06310271001', 'Orochimaru', 'Sannin', 'Tsurugi', 'M', '1963-10-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('28751145H', 'UCIZ02012241006', 'Madara', 'Uchiha', 'Izuna', 'M', '1920-12-24');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('89868351Z', 'UCFU08506091008', 'Itachi', 'Uchiha', 'Fugaku', 'M', '1985-06-09');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('63197432X', 'UCTA08702101003', 'Obito', 'Uchiha', 'Tajima', 'M', '1987-02-10');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('96635106P', 'HOAK07503181007', 'Kisame', 'Hoshigaki', 'Aka', 'M', '1975-03-18');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('27683465K', 'IWNA08005051005', 'Deidara', 'Iwagakure', 'Namikaze', 'M', '1980-05-05');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('54007103K', 'AKKU08207011004', 'Sasori', 'Akahoshi', 'Kumo', 'M', '1982-07-01');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('62310250F', 'AMSU08402201001', 'Konan', 'Amegakure', 'Suzuki', 'F', '1984-02-20');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('33742438N', 'AMYA08403251008', 'Nagato', 'Amegakure', 'Yahiko', 'M', '1984-03-25');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('56236452A', 'JATA08704021009', 'Hidan', 'Jashin', 'Takayama', 'M', '1987-04-02');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('63716734H', 'TAHI07012101005', 'Kakuzu', 'Taki', 'Hiruko', 'M', '1970-12-10');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, BirthDay) VALUES ('98786670Z', 'MOKU07208151006', 'Zabuza', 'Momochi', 'Kuro', 'M', '1972-08-15');


INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-01', '2024-01-10', (SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Dolor de cabeza', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-11-11', '2029-01-10', (SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Cardiopatia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-25', '2024-01-10', (SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Inmunopatia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'Rotura de ligamentos', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-02-02', (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'Fractura de brazo', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-11-23', (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'Rotura Ligamentos', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-04-21', (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'Diabetes', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'Fractura de brazo', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-01', '2024-03-15', (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'Gripe', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'Dolor de espalda', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-01', '2024-05-20', (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'Alergia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'Hipertensión', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-01', '2024-07-10', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Infección urinaria', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Asma', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-09-01', '2024-09-15', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Conjuntivitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-10-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Artritis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-05', '2024-01-15', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Migraña', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Dermatitis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-20', '2024-04-05', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Bronquitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Colesterol alto', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-15', '2024-06-01', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Otitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Dolor abdominal', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-05', '2024-07-20', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Esguince de tobillo', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'Diabetes', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-09-15', '2024-09-30', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'Gastroenteritis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-10-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'Insuficiencia renal', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2019-11-01', '2020-11-15', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Enfermedad pulmonar', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2008-02-11', NULL, (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Depresión', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2005-05-26', NULL, (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Ceguera', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2022-04-30', '2024-11-15', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Colesterol', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-12-05', NULL, (SELECT Id FROM Pacients WHERE DNI = '27683465K'), 'Faringitis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-15', '2024-02-01', (SELECT Id FROM Pacients WHERE DNI = '27683465K'), 'Apendicitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '27683465K'), 'Esclerosis múltiple', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-25', '2024-04-10', (SELECT Id FROM Pacients WHERE DNI = '63197432X'), 'Gota', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-30', NULL, (SELECT Id FROM Pacients WHERE DNI = '63197432X'), 'Aspergillosis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-20', '2024-06-05', (SELECT Id FROM Pacients WHERE DNI = '78453868V'), 'Aneurisma', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-15', NULL, (SELECT Id FROM Pacients WHERE DNI = '78453868V'), 'Insomnio', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-25', '2024-08-10', (SELECT Id FROM Pacients WHERE DNI = '78453868V'), 'Neumonía', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '78453868V'), 'Cardiopatía', 'No Resuelto');



INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('35236548T', 'CirujanoGeneral', 'Luke Skywalker');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('28723471R', 'Pediatra', 'Leia Organa');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('64578920Y', 'Enfermero', 'Han Solo');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('78654390Z', 'Dermatologo', 'Obi-Wan Kenobi');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('90876431A', 'Urologo', 'Yoda');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('28763495M', 'Oncologo', 'Darth Vader');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('10934582D', 'EnfermeroGeneral', 'Padmé Amidala');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('23098761V', 'EnfermeroGeneral', 'Mace Windu');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('87654321C', 'Urologo', 'Qui-Gon Jinn');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('67584920J', 'EnfermeroGeriatrico', 'Rey');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('14983267L', 'Traumatologo', 'Anakin Skywalker');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('65732498G', 'Cardiologo', 'Chewbacca');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('90812376K', 'Neurologo', 'R2-D2');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('48276391B', 'Neurocirujano', 'Ahsoka Tano');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('34128769N', 'Anestesiologo', 'Jar Jar Binks');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('29837465X', 'Psiquiatra', 'C-3PO');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('59412387H', 'Ginecologo', 'Boba Fett');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('74391285F', 'Odontologo', 'Lando Calrissian');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('38129764Q', 'Dermatologa', 'Sabine Wren');
INSERT INTO Personals (DNI, Especialitat, Nom) VALUES ('41097823P', 'Oftalmologo', 'Bo-Katan Kryze');


INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Dolor intenso en el pecho', 'Análisis y descanso', (SELECT Id FROM Personals WHERE DNI = '35236548T'), 1);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Fiebre alta y tos', NULL, (SELECT Id FROM Personals WHERE DNI = '28723471R'), 2);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Dolor abdominal severo', 'Cirugía recomendada', (SELECT Id FROM Personals WHERE DNI = '64578920Y'), 3);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Dolor lumbar persistente', 'Ejercicios y fisioterapia', (SELECT Id FROM Personals WHERE DNI = '78654390Z'), 4);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Reacción alérgica severa', NULL, (SELECT Id FROM Personals WHERE DNI = '90876431A'), 5);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Presión arterial elevada', 'Medicamentos antihipertensivos', (SELECT Id FROM Personals WHERE DNI = '28763495M'), 6);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Infección grave', 'Antibióticos intravenosos', (SELECT Id FROM Personals WHERE DNI = '10934582D'), 7);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Dificultad para respirar', 'Inhaladores y seguimiento', (SELECT Id FROM Personals WHERE DNI = '23098761V'), 8);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Crisis asmática', 'Esteroides y monitorización', (SELECT Id FROM Personals WHERE DNI = '87654321C'), 9);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Dolor en articulaciones', 'Anti-inflamatorios y terapia', (SELECT Id FROM Personals WHERE DNI = '67584920J'), 10);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Deshidratación severa', 'Rehidratación intravenosa', (SELECT Id FROM Personals WHERE DNI = '35236548T'), 11);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Esguince leve', 'Reposo y vendaje', (SELECT Id FROM Personals WHERE DNI = '28723471R'), 12);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Hemorragia nasal intensa', 'Cauterización y tratamiento', (SELECT Id FROM Personals WHERE DNI = '64578920Y'), 13);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Dolor de garganta', 'Antibióticos y gargarismos', (SELECT Id FROM Personals WHERE DNI = '78654390Z'), 14);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Fractura compuesta', 'Cirugía y yeso', (SELECT Id FROM Personals WHERE DNI = '90876431A'), 15);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Insomnio severo', 'Medicación y terapia', (SELECT Id FROM Personals WHERE DNI = '28763495M'), 1);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Cetoacidosis diabética', 'Insulina y líquidos', (SELECT Id FROM Personals WHERE DNI = '10934582D'), 3);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Colitis leve', 'Dieta y medicamentos', (SELECT Id FROM Personals WHERE DNI = '23098761V'), 2);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Intoxicación alimentaria', 'Desintoxicación y líquidos', (SELECT Id FROM Personals WHERE DNI = '87654321C'), 5);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Sinusitis', 'Descongestionantes y analgésicos', (SELECT Id FROM Personals WHERE DNI = '67584920J'), 10);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Crisis hipertensiva', 'Medicamentos antihipertensivos y monitoreo', (SELECT Id FROM Personals WHERE DNI = '35236548T'), 2);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Contusión en brazo', 'Reposo y hielo', (SELECT Id FROM Personals WHERE DNI = '28723471R'), 8);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Dolor torácico agudo', 'Evaluación cardiaca urgente', (SELECT Id FROM Personals WHERE DNI = '64578920Y'), 9);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Náuseas y vómitos', 'Anti-eméticos y líquidos', (SELECT Id FROM Personals WHERE DNI = '78654390Z'), 4);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Infección severa', 'Antibióticos intravenosos y observación', (SELECT Id FROM Personals WHERE DNI = '90876431A'), 15);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Fatiga crónica', 'Exámenes y cambios de estilo de vida', (SELECT Id FROM Personals WHERE DNI = '28763495M'), 16);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Reacción alérgica severa', 'Adrenalina y monitoreo', (SELECT Id FROM Personals WHERE DNI = '10934582D'), 17);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Tensión muscular', 'Masajes y estiramientos', (SELECT Id FROM Personals WHERE DNI = '23098761V'), 18);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('true', 'Infección respiratoria grave', 'Antibióticos y oxígeno', (SELECT Id FROM Personals WHERE DNI = '87654321C'), 9);
INSERT INTO Consultes (Urgencia, Sintomatologia, Recepta, PersonalId, EpisodiMedicId) VALUES ('false', 'Dolor de articulaciones', 'Anti-inflamatorios y terapia física', (SELECT Id FROM Personals WHERE DNI = '67584920J'), 14);


INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-01-01', '2024-01-10', 1, (SELECT Id FROM Llits WHERE CodiLlit = '101A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-02-01', NULL, 2, (SELECT Id FROM Llits WHERE CodiLlit = '202B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-03-01', '2024-03-15', 3, (SELECT Id FROM Llits WHERE CodiLlit = '203A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-04-01', NULL, 4, (SELECT Id FROM Llits WHERE CodiLlit = '204B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-05-01', '2024-05-20', 5, (SELECT Id FROM Llits WHERE CodiLlit = '105A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-06-01', NULL, 6, (SELECT Id FROM Llits WHERE CodiLlit = '106B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-07-01', '2024-07-10', 7, (SELECT Id FROM Llits WHERE CodiLlit = '107A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-08-01', NULL, 8, (SELECT Id FROM Llits WHERE CodiLlit = '108B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-09-01', '2024-09-15', 9, (SELECT Id FROM Llits WHERE CodiLlit = '109A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-10-01', NULL, 10, (SELECT Id FROM Llits WHERE CodiLlit = '201A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-11-01', '2024-11-10', 11, (SELECT Id FROM Llits WHERE CodiLlit = '102A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2024-12-01', NULL, 12, (SELECT Id FROM Llits WHERE CodiLlit = '203B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-01-01', '2025-01-20', 13, (SELECT Id FROM Llits WHERE CodiLlit = '204A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-02-01', NULL, 14, (SELECT Id FROM Llits WHERE CodiLlit = '105B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-03-01', '2025-03-15', 15, (SELECT Id FROM Llits WHERE CodiLlit = '106A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-04-01', NULL, 16, (SELECT Id FROM Llits WHERE CodiLlit = '107B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-05-01', '2025-05-20', 17, (SELECT Id FROM Llits WHERE CodiLlit = '108A'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-06-01', NULL, 18, (SELECT Id FROM Llits WHERE CodiLlit = '109B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-07-01', '2025-07-10', 19, (SELECT Id FROM Llits WHERE CodiLlit = '201B'));
INSERT INTO Ingressos (DataEntrada, DataSortida, EpisodiMedicId, LlitId) VALUES ('2025-08-01', NULL, 20, (SELECT Id FROM Llits WHERE CodiLlit = '202A'));
