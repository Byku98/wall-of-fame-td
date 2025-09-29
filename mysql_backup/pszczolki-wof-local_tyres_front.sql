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
-- Table structure for table `tyres_front`
--

DROP TABLE IF EXISTS `tyres_front`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tyres_front` (
  `tf_id` int NOT NULL AUTO_INCREMENT,
  `tyre_front` varchar(256) NOT NULL,
  PRIMARY KEY (`tf_id`),
  UNIQUE KEY `id_UNIQUE` (`tf_id`),
  UNIQUE KEY `tyre_front_UNIQUE` (`tyre_front`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tyres_front`
--

LOCK TABLES `tyres_front` WRITE;
/*!40000 ALTER TABLE `tyres_front` DISABLE KEYS */;
INSERT INTO `tyres_front` VALUES (15,'Bridgestone Battlax BT023 R'),(14,'Bridgestone Battlax Racing V02 Medium'),(76,'Bridgestone Battlax Racing V02 Soft'),(55,'Bridgestone Battlax RS10'),(65,'Bridgestone Battlax S21'),(68,'Bridgestone Battlax S22'),(67,'Bridgestone Battlax S23'),(29,'Continental ContiMotion'),(32,'Dunlop GP Racer Slick D212'),(6,'Dunlop KR 108'),(7,'Dunlop KR 109'),(31,'Dunlop Sportmax D 212 GP PRO'),(4,'Dunlop Sportmax D 213 GP PRO'),(70,'Dunlop Sportmax GP Racer D211'),(73,'Dunlop Sportmax GP Racer D211 Slick'),(5,'Dunlop Sportmax GPR-300'),(9,'Dunlop Sportmax Roadsport 2'),(10,'Dunlop SportSmart 3'),(11,'Dunlop SportSmart TT'),(75,'Metzeler Racetec RR K2'),(33,'Metzeler Racetec RR K2 Slick'),(13,'Metzeler Racetec RR K3'),(74,'Metzeler Racetec RR K3 Slick'),(34,'Metzeler Racetec SM'),(36,'Metzeler Racetec TD'),(40,'Metzeler Racetec TD Slick'),(37,'Metzeler Roadtec 01'),(38,'Metzeler Sportec M5 Interact'),(80,'Metzeler Sportec M7 RR'),(39,'Metzeler Sportec M9 RR'),(41,'Michelin Pilot Power 2CT'),(42,'Michelin Pilot Street'),(43,'Michelin Power Cup 2'),(44,'Michelin Power Supermoto'),(45,'Michelin Road 5'),(78,'Mitas MC-35 S-RACER 2.0 Medium'),(46,'Mitas MC-35 S-RACER 2.0 Soft'),(71,'N/A'),(47,'Pirelli Angel ST'),(52,'Pirelli Diablo Rosso 2'),(51,'Pirelli Diablo Rosso 4'),(48,'Pirelli Diablo Rosso 4 Corsa'),(49,'Pirelli Diablo Rosso Corsa 2'),(2,'Pirelli Diablo Rosso Scooter'),(77,'Pirelli Diablo Superbike SC2'),(62,'Pirelli Diablo Superbike SC3'),(59,'Pirelli Diablo Supercorsa SC'),(72,'Pirelli Diablo Supercorsa SC V2'),(61,'Pirelli Diablo Supercorsa SC V3'),(57,'Pirelli Diablo Supercorsa SP'),(69,'Pirelli Diablo Supercorsa SP V2'),(53,'Pirelli Diablo Supercorsa SP V3'),(54,'Pirelli Diablo Supercorsa SP V4'),(63,'PMT Soft'),(64,'PMT Super Soft');
/*!40000 ALTER TABLE `tyres_front` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-25 21:35:05
