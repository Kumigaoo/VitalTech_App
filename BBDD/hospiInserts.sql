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


INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('59099146W', 'UZKY00001021004', 'Naruto', 'Uzumaki', 'Kyubi', 'M', '123456789', 'Japonesa', 'naruto@example.com', '2000-10-21');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('21403359L', 'HAYA00003281007', 'Sakura', 'Haruno', 'Yamanaka', 'F', '987654321', 'Coreana', 'sakura@example.com', '2000-03-28');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('59575320F', 'UCYU00007231005', 'Sasuke', 'Uchiha', 'Yurei', 'M', '147258369', 'China', 'sasuke@example.com', '2000-07-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('78342394R', 'HAKA08009151003', 'Kakashi', 'Hatake', 'Kazama', 'M', '852963741', 'Japonesa', 'kakashi@example.com', '1980-09-15');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('96838460L', 'HYHO00112271008', 'Hinata', 'Hyuga', 'Hoshino', 'F', '951753468', 'Filipina', 'hinata@example.com', '2001-12-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('50126267K', 'NATA00009221006', 'Shikamaru', 'Nara', 'Takeda', 'M', '123321456', 'Tailandesa', 'shikamaru@example.com', '2000-09-22');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('13934574R', 'YAFA00009231007', 'Ino', 'Yamanaka', 'Fujimoto', 'F', '789456123', 'Indonesia', 'ino@example.com', '2000-09-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('13729209A', 'AKFU00005011003', 'Choji', 'Akimichi', 'Fujikawa', 'M', '321654987', 'Vietnamita', 'choji@example.com', '2000-05-01');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('39657070X', 'INYA00007071009', 'Kiba', 'Inuzuka', 'Yamada', 'M', '852456963', 'Mongola', 'kiba@example.com', '2000-07-07');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('01129396G', 'ABNI00001231005', 'Shino', 'Aburame', 'Nishikawa', 'M', '123456987', 'Nepalí', 'shino@example.com', '2000-01-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('14096750G', 'LEMU00011271004', 'Rock', 'Lee', 'Murakami', 'M', '147963258', 'Malaya', 'rocklee@example.com', '2000-11-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('44382219Q', 'HYNA00007031001', 'Neji', 'Hyuga', 'Nakamura', 'M', '753951456', 'Japonesa', 'neji@example.com', '2000-07-03');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('28226573F', 'HIMI00003091007', 'Tenten', 'Hino', 'Miyamoto', 'F', '159753852', 'Singapurense', 'tenten@example.com', '2000-03-09');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('78453868V', 'SATSU0001191003', 'Gaara', 'Sabaku', 'Tsuchikage', 'M', '357951456', 'Coreana', 'gaara@example.com', '2000-01-19');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('05891305Q', 'SAAM00008231001', 'Temari', 'Sabaku', 'Amamiya', 'F', '963852741', 'Laosiana', 'temari@example.com', '2000-08-23');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('54096548L', 'SAKO00004151009', 'Kankuro', 'Sabaku', 'Koizumi', 'M', '258741369', 'Japonesa', 'kankuro@example.com', '2000-04-15');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('64345959D', 'SEUZ06508021007', 'Tsunade', 'Senju', 'Uzumaki', 'F', '357951852', 'China', 'tsunade@example.com', '1965-08-02');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('69722115F', 'SAOG06011111002', 'Jiraiya', 'Sannin', 'Ogata', 'M', '123456159', 'Tailandesa', 'jiraiya@example.com', '1960-11-11');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('33403288C', 'SATS06310271001', 'Orochimaru', 'Sannin', 'Tsurugi', 'M', '321654987', 'Camboyana', 'orochimaru@example.com', '1963-10-27');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('28751145H', 'UCIZ02012241006', 'Madara', 'Uchiha', 'Izuna', 'M', '963741852', 'Vietnamita', 'madara@example.com', '1920-12-24');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('89868351Z', 'UCFU08506091008', 'Itachi', 'Uchiha', 'Fugaku', 'M', '951753852', 'Japonesa', 'itachi@example.com', '1985-06-09');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('63197432X', 'UCTA08702101003', 'Obito', 'Uchiha', 'Tajima', 'M', '456321789', 'Coreana', 'obito@example.com', '1987-02-10');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('96635106P', 'HOAK07503181007', 'Kisame', 'Hoshigaki', 'Aka', 'M', '357159852', 'Nepalí', 'kisame@example.com', '1975-03-18');
INSERT INTO Pacients (DNI, NumSS, Nom, Cognom1, Cognom2, Sexe, Telefon, Nacionalidad, Email, BirthDay) VALUES ('92735148X', 'KAOT062010511009', 'Zabuza', 'Momochi', 'Tsubasa', 'M', '456852159', 'Indonesa', 'zabuza@example.com', '1962-01-05');


INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-01-01', '2024-01-10', 'Fractura de pierna',  'Paracetamol', (SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-11-11', '2029-01-10', 'Cardiopatía',  'Aspi', SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-03-25', '2024-01-10', 'Inmunopatía',  'Ibuprofeno', (SELECT Id FROM Pacients WHERE DNI = '59099146W'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-20', NULL, 'Rotura de ligamentos',  'Diclofenaco', (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-01', '2024-02-02', 'Fractura de bralse', 'Analgésico', (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-01', '2024-11-23', 'Rotura de ligamentos',  'Kétorolaco', (SELECT Id FROM Pacients WHERE DNI = '21403359L'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-01', '2024-04-21', 'Diabetes', 'false', 'In', (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-01', NULL, 'Fractura de brazo',  'Ibuprofeno', (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-03-01', '2024-03-15', 'Gripe', 'faltigripal', (SELECT Id FROM Pacients WHERE DNI = '78342394R'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-04-01', NULL, 'Dolor de espalda',  'Ibuprofeno', (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-05-01', '2024-05-20', 'Alergia', ''Antihistamínico', (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-06-01', NULL, 'Hipertensión',  'Antihipertensivo', (SELECT Id FROM Pacients WHERE DNI = '96838460L'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-07-01', '2024-07-10', 'Infecciria', 'false', 'Antibiótico', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-08-01', NULL, 'Asma',  'Inhalador', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-09-01', '2024-09-15', ivitis', 'false', 'Colirio', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-10-01', NULL, 'Artritis',  'Analgésico', (SELECT Id FROM Pacients WHERE DNI = '89868351Z'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-01-05', '2024-01-15', 'Migfalse', 'Paracetamol', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-02-10', NULL, 'Dermatitis',  'Crema', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-03-20', '2024-04-05', 'Bronq'false', 'Jarabe', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-04-10', NULL, 'Colesterol alto',  'Estatina', (SELECT Id FROM Pacients WHERE DNI = '98786670Z'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-05-15', '2024-06-01', 'Otitis', ''Antibiótico', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-06-20', NULL, 'Dolor abdominal',  'Antiespasmódico', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-07-05', '2024-07-20', 'Esguince do', 'false', 'Analgésico', (SELECT Id FROM Pacients WHERE DNI = '33403288C'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-08-10', NULL, 'Diabetes',  'Insulina', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-09-15', '2024-09-30', 'Gasitis', 'false', 'Antidiarreico', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-10-05', NULL, 'Hipotiroidismo',  'Levotiroxina', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'No Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-11-20', '2024-12-01', 'Sinusitise', 'Descongestionante', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'Resuelto');
INSERT INTO EpisodisMedics (DataObertura, DataTancamentDolencia, PacientId, Estat) VALUES ('2024-12-10', NULL, 'Tendinitis', , 'Analgésico', (SELECT Id FROM Pacients WHERE DNI = '63716734H'), 'No Resuelto');


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


INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('35236548T', 'CirujanoGeneral', 'Luke Skywalker');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('28723471R', 'Pediatra', 'Leia Organa');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('64578920Y', 'Enfermero', 'Han Solo');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('78654390Z', 'Dermatologo', 'Obi-Wan Kenobi');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('90876431A', 'Urologo', 'Yoda');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('28763495M', 'Oncologo', 'Darth Vader');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('10934582D', 'EnfermeroGeneral', 'Padmé Amidala');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('23098761V', 'EnfermeroGeneral', 'Mace Windu');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('87654321C', 'Urologo', 'Qui-Gon Jinn');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('67584920J', 'EnfermeroGeriatrico', 'Rey');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('14983267L', 'Traumatologo', 'Anakin Skywalker');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('65732498G', 'Cardiologo', 'Chewbacca');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('90812376K', 'Neurologo', 'R2-D2');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('48276391B', 'Neurocirujano', 'Ahsoka Tano');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('34128769N', 'Anestesiologo', 'Jar Jar Binks');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('29837465X', 'Psiquiatra', 'C-3PO');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('59412387H', 'Ginecologo', 'Boba Fett');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('74391285F', 'Odontologo', 'Lando Calrissian');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('38129764Q', 'Dermatologa', 'Sabine Wren');
INSERT INTO Metge (DNI, Especialitat, Nom) VALUES ('41097823P', 'Oftalmologo', 'Bo-Katan Kryze');


INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor intenso en el pecho', 'Análisis y descanso', (SELECT Id FROM Metge WHERE DNI = '35236548T'), 1);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Fiebre alta y tos', NULL, (SELECT Id FROM Metge WHERE DNI = '28723471R'), 2);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor abdominal severo', 'Cirugía recomendada', (SELECT Id FROM Metge WHERE DNI = '64578920Y'), 3);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor lumbar persistente', 'Ejercicios y fisioterapia', (SELECT Id FROM Metge WHERE DNI = '78654390Z'), 4);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Reacción alérgica severa', NULL, (SELECT Id FROM Metge WHERE DNI = '90876431A'), 5);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Presión arterial elevada', 'Medicamentos antihipertensivos', (SELECT Id FROM Metge WHERE DNI = '28763495M'), 6);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Infección grave', 'Antibióticos intravenosos', (SELECT Id FROM Metge WHERE DNI = '10934582D'), 7);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dificultad para respirar', 'Inhaladores y seguimiento', (SELECT Id FROM Metge WHERE DNI = '23098761V'), 8);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Crisis asmática', 'Esteroides y monitorización', (SELECT Id FROM Metge WHERE DNI = '87654321C'), 9);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor en articulaciones', 'Anti-inflamatorios y terapia', (SELECT Id FROM Metge WHERE DNI = '67584920J'), 10);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Deshidratación severa', 'Rehidratación intravenosa', (SELECT Id FROM Metge WHERE DNI = '35236548T'), 11);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Esguince leve', 'Reposo y vendaje', (SELECT Id FROM Metge WHERE DNI = '28723471R'), 12);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Hemorragia nasal intensa', 'Cauterización y tratamiento', (SELECT Id FROM Metge WHERE DNI = '64578920Y'), 13);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor de garganta', 'Antibióticos y gargarismos', (SELECT Id FROM Metge WHERE DNI = '78654390Z'), 14);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Fractura compuesta', 'Cirugía y yeso', (SELECT Id FROM Metge WHERE DNI = '90876431A'), 15);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Insomnio severo', 'Medicación y terapia', (SELECT Id FROM Metge WHERE DNI = '28763495M'), 1);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Cetoacidosis diabética', 'Insulina y líquidos', (SELECT Id FROM Metge WHERE DNI = '10934582D'), 3);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Colitis leve', 'Dieta y medicamentos', (SELECT Id FROM Metge WHERE DNI = '23098761V'), 2);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Intoxicación alimentaria', 'Desintoxicación y líquidos', (SELECT Id FROM Metge WHERE DNI = '87654321C'), 5);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Sinusitis', 'Descongestionantes y analgésicos', (SELECT Id FROM Metge WHERE DNI = '67584920J'), 10);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Crisis hipertensiva', 'Medicamentos antihipertensivos y monitoreo', (SELECT Id FROM Metge WHERE DNI = '35236548T'), 2);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Contusión en brazo', 'Reposo y hielo', (SELECT Id FROM Metge WHERE DNI = '28723471R'), 8);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor torácico agudo', 'Evaluación cardiaca urgente', (SELECT Id FROM Metge WHERE DNI = '64578920Y'), 9);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Náuseas y vómitos', 'Anti-eméticos y líquidos', (SELECT Id FROM Metge WHERE DNI = '78654390Z'), 4);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Infección severa', 'Antibióticos intravenosos y observación', (SELECT Id FROM Metge WHERE DNI = '90876431A'), 15);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Fatiga crónica', 'Exámenes y cambios de estilo de vida', (SELECT Id FROM Metge WHERE DNI = '28763495M'), 16);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Reacción alérgica severa', 'Adrenalina y monitoreo', (SELECT Id FROM Metge WHERE DNI = '10934582D'), 17);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Tensión muscular', 'Masajes y estiramientos', (SELECT Id FROM Metge WHERE DNI = '23098761V'), 18);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Infección respiratoria grave', 'Antibióticos y oxígeno', (SELECT Id FROM Metge WHERE DNI = '87654321C'), 9);
INSERT INTO PruebasDiagnosticas (Dolencia, UsuariId, EpisodiMedicId) VALUES ( 'Dolor de articulaciones', 'Anti-inflamatorios y terapia física', (SELECT Id FROM Metge WHERE DNI = '67584920J'), 14);


