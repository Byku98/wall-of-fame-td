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
-- Table structure for table `tyres_rear`
--

DROP TABLE IF EXISTS `tyres_rear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tyres_rear` (
  `tr_id` int NOT NULL AUTO_INCREMENT,
  `tyre_rear` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tr_id`),
  UNIQUE KEY `tyre_rear_UNIQUE` (`tyre_rear`),
  UNIQUE KEY `tr_id_UNIQUE` (`tr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tyres_rear`
--

LOCK TABLES `tyres_rear` WRITE;
/*!40000 ALTER TABLE `tyres_rear` DISABLE KEYS */;
INSERT INTO `tyres_rear` VALUES (15,'Bridgestone Battlax BT023 R'),(14,'Bridgestone Battlax Racing V02F Medium'),(42,'Bridgestone Battlax RS10'),(52,'Bridgestone Battlax S21'),(55,'Bridgestone Battlax S22'),(54,'Bridgestone Battlax S23'),(16,'Continental ContiMotion'),(19,'Dunlop GP Racer Slick D212'),(6,'Dunlop KR 108'),(7,'Dunlop KR 109'),(18,'Dunlop Sportmax D 212 GP PRO'),(4,'Dunlop Sportmax D 213 GP PRO'),(57,'Dunlop Sportmax GP Racer D211'),(66,'Dunlop Sportmax GP Racer D211 Slick'),(5,'Dunlop Sportmax GPR-300'),(9,'Dunlop Sportmax Roadsport 2'),(10,'Dunlop SportSmart 3'),(11,'Dunlop SportSmart TT'),(64,'Metzeler Racetec RR K2'),(20,'Metzeler Racetec RR K2 Slick'),(13,'Metzeler Racetec RR K3'),(67,'Metzeler Racetec RR K3 Slick'),(21,'Metzeler Racetec SM'),(23,'Metzeler Racetec TD'),(27,'Metzeler Racetec TD Slick'),(24,'Metzeler Roadtec 01'),(25,'Metzeler Sportec M5 Interact'),(71,'Metzeler Sportec M7 RR'),(26,'Metzeler Sportec M9 RR'),(28,'Michelin Pilot Power 2CT'),(29,'Michelin Pilot Street'),(30,'Michelin Power Cup 2'),(31,'Michelin Power Supermoto'),(32,'Michelin Road 5'),(69,'Mitas MC-35 S-RACER 2.0 Medium'),(33,'Mitas MC-35 S-RACER 2.0 Soft'),(58,'N/A'),(34,'Pirelli Angel ST'),(39,'Pirelli Diablo Rosso 2'),(38,'Pirelli Diablo Rosso 4'),(35,'Pirelli Diablo Rosso 4 Corsa'),(36,'Pirelli Diablo Rosso Corsa 2'),(2,'Pirelli Diablo Rosso Scooter'),(68,'Pirelli Diablo Superbike SC2'),(49,'Pirelli Diablo Superbike SC3'),(47,'Pirelli Diablo Supercorsa SC'),(65,'Pirelli Diablo Supercorsa SC V2'),(48,'Pirelli Diablo Supercorsa SC V3'),(44,'Pirelli Diablo Supercorsa SP'),(56,'Pirelli Diablo Supercorsa SP V2'),(40,'Pirelli Diablo Supercorsa SP V3'),(41,'Pirelli Diablo Supercorsa SP V4'),(50,'PMT Soft'),(51,'PMT Super Soft');
/*!40000 ALTER TABLE `tyres_rear` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:19
