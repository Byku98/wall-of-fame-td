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
-- Table structure for table `laps`
--

DROP TABLE IF EXISTS `laps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laps` (
  `lap_id` int NOT NULL AUTO_INCREMENT,
  `lap_time` time(3) DEFAULT NULL,
  `lap_date` date NOT NULL,
  `rider_id` int NOT NULL,
  `device_id` int DEFAULT NULL,
  `validity_id` int NOT NULL,
  `track_id` int NOT NULL,
  `organizer_id` int DEFAULT NULL,
  `motorcycle_id` int DEFAULT NULL,
  `tyre_front_id` int DEFAULT NULL,
  `tyre_rear_id` int DEFAULT NULL,
  `proof_url` varchar(512) DEFAULT NULL,
  `proof_picture_path` varchar(512) DEFAULT NULL,
  `video_url` varchar(512) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`lap_id`),
  KEY `fk.riders.id_idx` (`rider_id`) /*!80000 INVISIBLE */,
  KEY `fk.tracks.id_idx` (`track_id`),
  KEY `fk-organizer.id_idx` (`organizer_id`),
  KEY `fk.motorcycle.id_idx` (`motorcycle_id`),
  KEY `fk.device.id_idx` (`device_id`),
  KEY `fk.validity.id_idx` (`validity_id`),
  KEY `fk.tyres_front.id_idx` (`tyre_front_id`),
  KEY `fk.tyres_rear.id_idx` (`tyre_rear_id`),
  CONSTRAINT `fk-organizer.id` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`organizer_id`),
  CONSTRAINT `fk.device.id` FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`),
  CONSTRAINT `fk.motorcycle.id` FOREIGN KEY (`motorcycle_id`) REFERENCES `motorcycles` (`motorcycle_id`),
  CONSTRAINT `fk.riders.id` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`rider_id`),
  CONSTRAINT `fk.tracks.id` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`),
  CONSTRAINT `fk.tyres_front.id` FOREIGN KEY (`tyre_front_id`) REFERENCES `tyres_front` (`tf_id`),
  CONSTRAINT `fk.tyres_rear.id` FOREIGN KEY (`tyre_rear_id`) REFERENCES `tyres_rear` (`tr_id`),
  CONSTRAINT `fk.validity.id` FOREIGN KEY (`validity_id`) REFERENCES `laps_validity` (`validity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laps`
--

LOCK TABLES `laps` WRITE;
/*!40000 ALTER TABLE `laps` DISABLE KEYS */;
INSERT INTO `laps` VALUES (182,'00:00:41.770','2020-07-20',83,3,4,1,1,29,59,47,NULL,'/evidences/41_77.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','2026-01-17 00:00:00'),(183,'00:00:10.114','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','2026-01-17 00:00:00'),(184,'00:00:10.111','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','2026-01-17 00:00:00'),(185,'00:00:42.770','2020-09-08',28,1,3,1,NULL,23,NULL,NULL,NULL,'/evidences/42_77.jpg','https://www.youtube.com/watch?v=UG2P0IQbdBs','2026-01-17 00:00:00');
/*!40000 ALTER TABLE `laps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-17 21:15:47
