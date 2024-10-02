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


INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('12345678Z', 'ABCD12345678002', 'Naruto Uzumaki', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('23456789M', 'EFGH23456789002', 'Sakura Haruno', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('34567890Y', 'IJKL34567890002', 'Sasuke Uchiha', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('45678901S', 'MNOP45678901002', 'Kakashi Hatake', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('56789012G', 'QRST56789012002', 'Hinata Hyuga', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('67890123A', 'UVWX67890123002', 'Shikamaru Nara', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('78901234V', 'YZAB78901234002', 'Ino Yamanaka', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('89012345J', 'CDEF89012345002', 'Choji Akimichi', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('90123456H', 'GHIJ90123456002', 'Kiba Inuzuka', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('01234567P', 'KLMN01234567002', 'Shino Aburame', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('11223344K', 'OPQR11223344002', 'Rock Lee', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('22334455R', 'STUV22334455002', 'Neji Hyuga', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('33445566W', 'WXYZ33445566002', 'Tenten', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('44556677N', 'ABCD44556677002', 'Gaara', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('55667788T', 'EFGH55667788002', 'Temari', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('66778899L', 'IJKL66778899002', 'Kankuro', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('77889900C', 'MNOP77889900002', 'Tsunade', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('88990011X', 'QRST88990011002', 'Jiraiya', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('99001122Q', 'UVWX99001122002', 'Orochimaru', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('10020030B', 'YZAB10020030002', 'Madara Uchiha', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('11022033D', 'CDEF11022033002', 'Itachi Uchiha', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('12023034F', 'GHIJ12023034002', 'Obito Uchiha', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('13024035Z', 'KLMN13024035002', 'Kisame Hoshigaki', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('14025036M', 'OPQR14025036002', 'Deidara', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('15026037Y', 'STUV15026037002', 'Sasori', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('16027038S', 'WXYZ16027038002', 'Konan', 'F');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('17028039G', 'ABCD17028039002', 'Nagato', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('18029040A', 'EFGH18029040002', 'Hidan', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('19030041V', 'IJKL19030041002', 'Kakuzu', 'M');
INSERT INTO Pacients (DNI, NumSS, Nom, Sexe) VALUES ('20031042J', 'MNOP20031042002', 'Zabuza Momochi', 'M');


INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-01', '2024-01-10', (SELECT Id FROM Pacients WHERE DNI = '12345678Z'), 'Dolor de cabeza', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-11-11', '2029-01-10', (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Cardiopatia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-25', '2024-01-10', (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Inmunopatia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Rotura de ligamentos', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-02-02', (SELECT Id FROM Pacients WHERE DNI = '01234567P'), 'Fractura de brazo', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-11-23', (SELECT Id FROM Pacients WHERE DNI = '01234567P'), 'Rotura Ligamentos', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', '2024-04-21', (SELECT Id FROM Pacients WHERE DNI = '01234567P'), 'Diabetes', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '23456789M'), 'Fractura de brazo', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-01', '2024-03-15', (SELECT Id FROM Pacients WHERE DNI = '34567890Y'), 'Gripe', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '45678901S'), 'Dolor de espalda', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-01', '2024-05-20', (SELECT Id FROM Pacients WHERE DNI = '56789012G'), 'Alergia', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '67890123A'), 'Hipertensión', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-01', '2024-07-10', (SELECT Id FROM Pacients WHERE DNI = '78901234V'), 'Infección urinaria', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '89012345J'), 'Asma', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-09-01', '2024-09-15', (SELECT Id FROM Pacients WHERE DNI = '90123456H'), 'Conjuntivitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-10-01', NULL, (SELECT Id FROM Pacients WHERE DNI = '01234567P'), 'Artritis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-05', '2024-01-15', (SELECT Id FROM Pacients WHERE DNI = '11223344K'), 'Migraña', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '22334455R'), 'Dermatitis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-20', '2024-04-05', (SELECT Id FROM Pacients WHERE DNI = '33445566W'), 'Bronquitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '44556677N'), 'Colesterol alto', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-15', '2024-06-01', (SELECT Id FROM Pacients WHERE DNI = '55667788T'), 'Otitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '66778899L'), 'Dolor abdominal', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-05', '2024-07-20', (SELECT Id FROM Pacients WHERE DNI = '77889900C'), 'Esguince de tobillo', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-10', NULL, (SELECT Id FROM Pacients WHERE DNI = '88990011X'), 'Diabetes', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-09-15', '2024-09-30', (SELECT Id FROM Pacients WHERE DNI = '99001122Q'), 'Gastroenteritis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-10-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Insuficiencia renal', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2019-11-01', '2020-11-15', (SELECT Id FROM Pacients WHERE DNI = '11022033D'), 'Enfermedad pulmonar', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2008-02-11', NULL, (SELECT Id FROM Pacients WHERE DNI = '11022033D'), 'Depresión', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2005-05-26', NULL, (SELECT Id FROM Pacients WHERE DNI = '11022033D'), 'Ceguera', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2022-04-30', '2024-11-15', (SELECT Id FROM Pacients WHERE DNI = '11022033D'), 'Colesterol', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-12-05', NULL, (SELECT Id FROM Pacients WHERE DNI = '20031042J'), 'Faringitis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-01-15', '2024-02-01', (SELECT Id FROM Pacients WHERE DNI = '20031042J'), 'Apendicitis', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-02-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '17028039G'), 'Esclerosis múltiple', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-03-25', '2024-04-10', (SELECT Id FROM Pacients WHERE DNI = '17028039G'), 'Gota', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-04-30', NULL, (SELECT Id FROM Pacients WHERE DNI = '17028039G'), 'Aspergillosis', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-05-20', '2024-06-05', (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Aneurisma', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-06-15', NULL, (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Insomnio', 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-07-25', '2024-08-10', (SELECT Id FROM Pacients WHERE DNI = '10020030B'), 'Neumonía', 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancament, PacientId, Dolencia, Estat) VALUES ('2024-08-20', NULL, (SELECT Id FROM Pacients WHERE DNI = '55667788T'), 'Cardiopatía', 'No Resuelto');



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
