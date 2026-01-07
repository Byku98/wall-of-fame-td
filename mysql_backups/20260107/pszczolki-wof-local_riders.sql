-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 192.168.1.125    Database: pszczolki-wof-local
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `riders`
--

DROP TABLE IF EXISTS `riders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riders` (
  `rider_id` int NOT NULL AUTO_INCREMENT,
  `rider_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` int DEFAULT NULL,
  `sex_id` int NOT NULL,
  `rider_level` int NOT NULL,
  `social_instagram` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `social_facebook` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`rider_id`),
  UNIQUE KEY `id_UNIQUE` (`rider_id`),
  UNIQUE KEY `name_UNIQUE` (`rider_name`),
  UNIQUE KEY `social_instagram_UNIQUE` (`social_instagram`),
  UNIQUE KEY `social_facebook_UNIQUE` (`social_facebook`),
  KEY `fk.sex.id_idx` (`sex_id`),
  KEY `fk.group.id_idx` (`group_id`),
  KEY `fk.rider_level.id_idx` (`rider_level`),
  CONSTRAINT `fk.group.id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `fk.rider_level.id` FOREIGN KEY (`rider_level`) REFERENCES `riders_levels` (`level_id`),
  CONSTRAINT `fk.sex.id` FOREIGN KEY (`sex_id`) REFERENCES `sex` (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table with rider info and socials - no credentials';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riders`
--

LOCK TABLES `riders` WRITE;
/*!40000 ALTER TABLE `riders` DISABLE KEYS */;
INSERT INTO `riders` VALUES (1,'Adam Jaszczak',NULL,2,6,'https://instagram.com/848.braaaap',NULL),(2,'Adam Szuba',NULL,2,3,NULL,'https://facebook.com/profile.php?id=61551900655271'),(3,'Adam',1,2,4,'https://instagram.com/adas_r1',NULL),(4,'Adrian (Trzonek)',NULL,2,2,NULL,'https://facebook.com/trzonek'),(5,'Angy_S1000R GDA',NULL,1,2,'https://instagram.com/angy_s1000rr',NULL),(6,'Arek Mierzejewski',NULL,2,4,NULL,'https://facebook.com/arek.mierzejewski.77'),(7,'Arek',NULL,2,4,NULL,'https://facebook.com/fejkowy.fejk.50'),(8,'BabyMonster MT-07 GD',NULL,1,2,'https://instagram.com/baby.monstermt07',NULL),(9,'BarKop',NULL,2,3,NULL,'https://facebook.com/bartek.kopczynski.3'),(10,'Bartek Trident Gdansk',NULL,2,2,NULL,NULL),(11,'Bartosz Butajło',NULL,2,2,NULL,'https://facebook.com/profile.php?id=100071721794049'),(12,'Bartoszbeny_',NULL,2,3,'https://instagram.com/bartoszbeny_',NULL),(13,'BugiiCb650r3city',NULL,2,2,NULL,NULL),(14,'Cnk',NULL,2,5,'https://instagram.com/cnk.moto',NULL),(15,'Daniel Raczyło',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100029542363311'),(16,'Daniele',1,2,4,'https://instagram.com/dparodi72',NULL),(17,'Dawid Roda',NULL,2,3,NULL,NULL),(18,'Dawid Ustarbowski',NULL,2,6,NULL,'https://facebook.com/dawid.ustarbowski'),(19,'DenyMotoVlog',NULL,2,2,NULL,NULL),(20,'Desmomati',1,2,4,'https://instagram.com/desmomati',NULL),(21,'Dezyderiusz Łaszkiewicz',NULL,2,2,NULL,NULL),(22,'Emil_Uciekinier',NULL,2,3,'https://instagram.com/emilh2r',NULL),(23,'Fluffy GSX-R750 Rotmanka',NULL,2,3,'https://instagram.com/marco.fluffy',NULL),(24,'Imax_s3',NULL,2,4,'https://instagram.com/imax_s3',NULL),(25,'Inmatefrompl',NULL,2,3,NULL,NULL),(26,'Jacek|SV650N|3city Bojano',NULL,2,2,NULL,NULL),(27,'Jakub Chwastek',NULL,2,3,NULL,NULL),(28,'Jan Dumara',NULL,2,6,'https://instagram.com/janekdumara',NULL),(29,'Javor Duke 390',NULL,2,2,NULL,'https://facebook.com/Javor95'),(30,'Kacper Malecki',NULL,2,3,NULL,NULL),(31,'Kamil_Mal',NULL,2,3,'https://instagram.com/maliniak_765rs',NULL),(32,'Karol Brzoskowski',NULL,2,4,NULL,'https://facebook.com/stefan.kowalski.927980'),(33,'Kinga xj600s 3miasto',NULL,1,2,'https://instagram.com/kina.urb',NULL),(34,'Konrad Bocian',NULL,2,3,'https://instagram.com/thunder_stork',NULL),(35,'Krzysztof Komornicki',NULL,2,5,'https://instagram.com/komornicki_888',NULL),(36,'Ladydriver_GSX-R',NULL,1,3,'https://instagram.com/ladydriver_GSX-R',NULL),(37,'Lejdi_kuki',1,1,4,'https://instagram.com/lejdi.kuki',NULL),(38,'Lemur [SD990]Gdynia',NULL,2,4,NULL,'https://facebook.com/mateusz.parchem'),(39,'Leszek Marek Grzybek',NULL,2,4,'https://instagram.com/szybkii93',NULL),(40,'Leszke Heszke',NULL,2,3,'https://instagram.com/lesgotob',NULL),(41,'Lukasz Knapik',NULL,2,5,NULL,'https://facebook.com/loki.balboa.3'),(42,'Lukasz Wieczorek',NULL,2,4,NULL,'https://facebook.com/hondaplaza'),(43,'Lukasz_FZ1_Gdansk',NULL,2,3,NULL,'https://facebook.com/putek.putynkowski'),(44,'MATRII',NULL,2,4,NULL,NULL),(45,'Maciej Badtke',1,2,2,'https://instagram.com/maciejbadtke',NULL),(46,'Maciej Furious',NULL,2,3,NULL,NULL),(47,'Maciej Markowski',NULL,2,4,NULL,'https://facebook.com/profile.php?id=100078002145158'),(48,'Maciek Jagiełło',NULL,2,2,'https://instagram.com/maciekzim',NULL),(49,'Michał Dembowski (Majkel)',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100001361930125'),(50,'Marcin - olo.scr',NULL,2,3,'https://instagram.com/olo.scr',NULL),(51,'Marcin Sleziak',NULL,2,3,NULL,NULL),(52,'Marek Boczula',NULL,2,3,'https://instagram.com/marek.boczula',NULL),(53,'Marek Janikowski',NULL,2,3,NULL,NULL),(54,'Marek Marcinski',NULL,2,3,NULL,'https://facebook.com/marek.marcinski1'),(55,'Marek Marco Orłowski',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100001135339340'),(56,'Mateusz GSR750 GD',NULL,2,3,NULL,NULL),(57,'Mateusz Grzyb',NULL,2,2,NULL,'https://facebook.com/mateusz.grzyb.31'),(58,'Mateusz Kaczmi Kaczmarek',NULL,2,3,'https://instagram.com/suchykaczmii',NULL),(59,'Mateusz Karpiński',NULL,2,4,'https://instagram.com/motogyver',NULL),(60,'Mateusz Muchlado',NULL,2,3,NULL,'https://facebook.com/mateusz.muchlado.5'),(61,'Mateusz Nowak',NULL,2,2,NULL,'https://facebook.com/profile.php?id=100009837462310'),(62,'Mateusz Wrona',NULL,2,3,'https://instagram.com/maxiorsky',NULL),(63,'Michał Starosz / Dziadek Z 750 Gdańsk',NULL,2,3,NULL,'https://facebook.com/michal.starosz'),(64,'Michał Rainbow',NULL,2,5,'https://instagram.com/rainbowmichal',NULL),(65,'Michał „Machu” Mach',NULL,2,4,'https://instagram.com/mikemachu',NULL),(66,'Milosz Kurkul',NULL,2,5,NULL,NULL),(67,'Mirek Mordecki',NULL,2,5,'https://instagram.com/mirekmordecki',NULL),(68,'Miroslaw Kondracki',NULL,2,2,NULL,NULL),(69,'OCZKO',1,2,3,NULL,'https://facebook.com/G0OCZKO'),(70,'Pati [MT07] Rumia',NULL,1,3,'https://instagram.com/moto_angry_girl',NULL),(71,'Paweł (Sid) Dr-z 400 SM',NULL,2,2,'https://instagram.com/sidartistics',NULL),(72,'Paweł FZ125 GD',NULL,2,3,'https://instagram.com/elodylu',NULL),(73,'Piotr Falcon',NULL,2,3,'https://instagram.com/piotrfalcon',NULL),(74,'Piotr Stachlewski',NULL,2,5,NULL,'https://facebook.com/profile.php?id=100091883270238'),(75,'Piotr Woronowicz',NULL,2,3,'https://instagram.com/woronowicz.p',NULL),(76,'Piotr Zuchniarz',NULL,2,6,NULL,'https://facebook.com/profile.php?id=100009970063162'),(77,'Piotr',1,2,2,NULL,'https://facebook.com/piotr.cieslik.161'),(78,'PiotrSy',NULL,2,4,NULL,'https://facebook.com/piotrsyy'),(79,'PiratJerry(954 Fireblade)GA',NULL,2,3,'https://instagram.com/jerry.fireblade',NULL),(80,'Przemo84Pila',NULL,2,4,'https://instagram.com/przemo84pila',NULL),(81,'Przemysław Różyński',NULL,2,6,NULL,'https://facebook.com/przemzrr'),(82,'Radek Witkowski',NULL,2,4,NULL,'https://facebook.com/radek.witkowski.90'),(83,'Robak#66_Grzegorz Hanuszewicz',NULL,2,6,'https://instagram.com/robak66rr',NULL),(84,'Robert Robson',NULL,2,6,'https://instagram.com/robson1000rr',NULL),(85,'Tomek Rutecki (Rut)',NULL,2,4,NULL,'https://facebook.com/tomek.rutecki.7'),(86,'Seba',1,2,3,NULL,'https://facebook.com/sebastian.gajda.92775'),(87,'Slav_XX1100_Gdynia',NULL,2,2,NULL,'https://facebook.com/SlavSkyxx'),(88,'StasienK0',NULL,2,3,NULL,NULL),(89,'Szymon Schewe',NULL,2,3,NULL,'https://facebook.com/szymon.schewe'),(90,'Szymon_ndg',NULL,2,3,NULL,NULL),(91,'Sławomir Bławat',NULL,2,4,NULL,'https://facebook.com/profile.php?id=100001693468146'),(92,'Tina_Mloda_1000RR',1,1,3,'https://instagram.com/toskawka93',NULL),(93,'Tomasz Byczek',1,2,4,'https://instagram.com/byku_98',NULL),(94,'Tredzio',NULL,2,3,'https://instagram.com/tredziu_01',NULL),(95,'Trenergranat',NULL,2,3,'https://instagram.com/monster_sp_ducati',NULL),(96,'Typical Seba',NULL,2,3,NULL,NULL),(97,'Veloce_Sig',1,2,3,NULL,'https://facebook.com/tuurboos'),(98,'Wesy#84',NULL,2,5,NULL,NULL),(99,'WitekMoto',NULL,2,2,NULL,NULL),(100,'Wojtek #251',NULL,2,3,'https://instagram.com/nixtend_',NULL),(101,'Wojtek',1,2,3,'https://instagram.com/superbikebtc',NULL),(102,'Womer',1,2,4,'https://instagram.com/womer_1k',NULL),(103,'twojstarysolibudyn',NULL,2,3,'https://instagram.com/twojstarysolibudyn',NULL),(104,'Kanał \"Motocykle\"',NULL,2,3,NULL,NULL);
/*!40000 ALTER TABLE `riders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-07 22:08:31
