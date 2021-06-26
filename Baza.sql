CREATE TABLE `Artysta` (
    `ID` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nazwa` varchar(20),
    `Rok_zalozenia` YEAR,
    `Kraj` varchar(20)
);
CREATE TABLE `Album` (
    `ID` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nazwa` varchar(20),
    `Data_wydania` DATE,
    `Artysta` int UNSIGNED NOT NULL,
    FOREIGN KEY (Artysta) REFERENCES Artysta(ID),
    `Czas_trwania` varchar(20),
    `Gatunek` varchar(20)
);
CREATE TABLE `Utwor` (
	`ID` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`Nazwa` varchar(20),
	`Czas_trwania` varchar(20),
	`Album` int UNSIGNED NOT NULL,
	FOREIGN KEY (Album) REFERENCES Album(ID)
);
INSERT INTO Artysta VALUES (NULL, "Linkin PARK", 1996, "USA");
INSERT INTO Artysta VALUES (NULL, "Tune", 2011, "Polska");
INSERT INTO Artysta VALUES (NULL, "The Beatles", 1960, "Anglia");
INSERT INTO Album Values (NULL, "Hybrid Theory", "2000-11-24", 1, "37:40", "Nu metal");
INSERT INTO Album Values (NULL, "Lucid Moments", "2011-07-10", 2, "50:53", "Rock");
INSERT INTO Utwor Values (NULL, "Papercut", "2:35", 1);
INSERT INTO Utwor Values (NULL, "One Step Closer", "3:23", 1);
INSERT INTO Utwor Values (NULL, "With You", "3:20", 1);
INSERT INTO Utwor Values (NULL, "Points of Authority", "3:20", 1);
INSERT INTO Utwor Values (NULL, "Crawling", "3:28", 1);
INSERT INTO Utwor Values (NULL, "Runaway", "3:04", 1);
INSERT INTO Utwor Values (NULL, "By Myself", "3:10", 1);
INSERT INTO Utwor Values (NULL, "In the End", "3:36", 1);
INSERT INTO Utwor Values (NULL, "A Place for My Head", "3:05", 1);
INSERT INTO Utwor Values (NULL, "Forgotten", "3:14", 1);
INSERT INTO Utwor Values (NULL, "Cure for the Itch", "2:37", 1);
INSERT INTO Utwor Values (NULL, "Pushing Me Away", "3:11", 1);
INSERT INTO Utwor Values (NULL, "Dependent", "6:05", 2);
INSERT INTO Utwor Values (NULL, "Repose", "6:02", 2);
INSERT INTO Utwor Values (NULL, "Confused", "5:03", 2);
INSERT INTO Utwor Values (NULL, "Lucid Moments", "6:34", 2);
INSERT INTO Utwor Values (NULL, "Mip", "4:47", 2);
INSERT INTO Utwor Values (NULL, "Dimensions", "4:46", 2);
INSERT INTO Utwor Values (NULL, "Cabin Fever", "6:35", 2);
INSERT INTO Utwor Values (NULL, "Masquerade", "5:36", 2);
INSERT INTO Utwor Values (NULL, "Dr Freeman", "5:21", 2);
