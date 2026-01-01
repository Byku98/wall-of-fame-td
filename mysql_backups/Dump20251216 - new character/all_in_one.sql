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
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `device_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `device_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `id_UNIQUE` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'Offline laptimer',NULL),(2,'RaceBox',NULL),(3,'Aim Solo',NULL),(4,'Dragy',NULL),(5,'PZRacing',NULL),(6,'Android/iOS',NULL),(8,'Qstarz',NULL),(9,'Starlane',NULL),(10,'LP-Cheetah',NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:17
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
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Hot Head Bikers','Gdynia',NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:16
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
  `lap_time` time(2) DEFAULT NULL,
  `lap_date` date NOT NULL,
  `rider_id` int NOT NULL,
  `device_id` int DEFAULT NULL,
  `validity_id` int NOT NULL,
  `track_id` int NOT NULL,
  `organizer_id` int DEFAULT NULL,
  `motorcycle_id` int DEFAULT NULL,
  `tyre_front_id` int DEFAULT NULL,
  `tyre_rear_id` int DEFAULT NULL,
  `proof_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proof_picture_path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laps`
--

LOCK TABLES `laps` WRITE;
/*!40000 ALTER TABLE `laps` DISABLE KEYS */;
INSERT INTO `laps` VALUES (120,'00:00:41.77','2020-07-20',83,3,4,1,1,29,59,47,NULL,'/evidences/41_77','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(121,'00:00:41.78','2020-06-20',83,3,4,1,1,83,34,21,NULL,'/evidences/41_78','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(122,'01:41:00.78','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(123,'00:00:41.77','2020-07-20',83,3,4,1,1,29,59,47,NULL,'/evidences/41_77','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(124,'00:00:41.78','2020-06-20',83,3,4,1,1,83,34,21,NULL,'/evidences/41_78','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(125,'01:41:00.78','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(126,'00:00:41.76','2020-08-20',83,3,4,1,1,29,34,21,NULL,'/evidences/41_76','https://www.youtube.com/watch?v=DVSyvmzuBZY','2025-11-15 00:00:00'),(127,'00:00:42.05','2017-08-14',76,1,3,1,NULL,83,70,13,NULL,'/evidences/42_05','https://www.youtube.com/watch?v=HNgAaSlXTa0','2025-11-15 00:00:00'),(128,'00:00:42.12','2017-01-01',81,1,3,1,NULL,54,59,65,NULL,'/evidences/42_12',NULL,'2025-11-15 00:00:00'),(129,'00:00:42.45','2017-07-18',18,1,3,1,NULL,52,73,13,NULL,'/evidences/42_45',NULL,'2025-11-15 00:00:00'),(130,'00:00:42.46','2025-08-02',1,3,4,1,6,29,NULL,20,NULL,'/evidences/42_46',NULL,'2025-11-15 00:00:00'),(131,'00:00:42.63','2025-09-07',28,1,3,1,6,23,76,NULL,NULL,'/evidences/42_63',NULL,'2025-11-15 00:00:00'),(132,'00:00:42.77','2020-09-08',28,1,3,1,NULL,23,NULL,NULL,NULL,'/evidences/42_77','https://www.youtube.com/watch?v=UG2P0IQbdBs','2025-11-15 00:00:00'),(133,'00:00:43.38','2023-07-02',74,2,4,1,NULL,23,36,23,'https://www.racebox.pro/webapp/session/64a1679954a76481131b423c','/evidences/43_38',NULL,'2025-11-15 00:00:00'),(134,'00:00:43.42','2025-08-09',35,5,4,1,6,29,34,21,NULL,'/evidences/43_42',NULL,'2025-11-15 00:00:00'),(135,'00:00:43.48','2018-05-13',66,2,4,1,NULL,5,NULL,NULL,NULL,'/evidences/43_48','https://www.youtube.com/watch?v=ugJNTPsMuMY','2025-11-15 00:00:00'),(136,'00:00:43.55','2025-08-09',84,3,4,1,6,26,44,NULL,NULL,'/evidences/43_55',NULL,'2025-11-15 00:00:00'),(137,'00:00:43.55','2024-08-24',64,5,4,1,6,2,7,7,NULL,'/evidences/43_55',NULL,'2025-11-15 00:00:00'),(138,'00:00:43.60','2023-08-09',74,2,4,1,NULL,37,4,4,'https://www.racebox.pro/webapp/session/64d3c73a75a0a6cdcf1b423c','/evidences/43_6',NULL,'2025-11-15 00:00:00'),(139,'00:00:43.65','2024-09-22',67,2,4,1,3,17,69,56,NULL,'/evidences/43_65',NULL,'2025-11-15 00:00:00'),(140,'00:00:43.69','2019-05-01',98,1,3,1,NULL,19,NULL,NULL,NULL,'/evidences/43_69','https://www.youtube.com/watch?v=zTMPzs5I0Og','2025-11-15 00:00:00'),(141,'00:00:43.78','2025-06-03',41,2,4,1,5,82,69,44,'https://www.racebox.pro/webapp/session/683eca43313c4befcf0b0cd3','/evidences/43_78',NULL,'2025-11-15 00:00:00'),(142,'00:00:43.96','2014-08-27',14,4,4,1,7,81,57,40,NULL,'/evidences/43_96','https://www.youtube.com/watch?v=dKhD-9K65kI','2025-11-15 00:00:00'),(143,'00:00:44.03','2025-09-04',47,2,4,1,7,9,57,44,'https://www.racebox.pro/webapp/session/68b9b7d223b7d5453c270af7','/evidences/44_03',NULL,'2025-11-15 00:00:00'),(144,'00:00:44.05','2014-08-25',85,2,4,1,7,NULL,13,13,NULL,'/evidences/44_05',NULL,'2025-11-15 00:00:00'),(145,'00:00:44.19','2025-09-07',91,8,4,1,6,71,64,51,NULL,'/evidences/44_19',NULL,'2025-11-15 00:00:00'),(146,'00:00:44.21','2024-09-29',93,1,3,1,7,58,40,NULL,NULL,'/evidences/44_21','https://www.youtube.com/watch?v=9RfWD7viUCc','2025-11-15 00:00:00'),(147,'00:00:44.35','2024-08-24',6,1,3,1,6,55,59,64,NULL,'/evidences/44_35',NULL,'2025-11-15 00:00:00'),(148,'00:00:44.48','2025-05-19',74,2,4,1,NULL,37,NULL,NULL,'https://www.racebox.pro/webapp/session/6829fe06c264e95f5c423d89','/evidences/44_48','https://www.youtube.com/watch?v=pFAJ_RTTp4k','2025-11-15 00:00:00'),(149,'00:00:44.75','2025-08-09',32,2,4,1,6,5,61,65,NULL,'/evidences/44_75',NULL,'2025-11-15 00:00:00'),(150,'00:00:44.80','2024-08-25',38,6,2,1,7,33,57,44,'https://www.laptrophy.com/sessions/vjKZsW','/evidences/44_8',NULL,'2025-11-15 00:00:00'),(151,'00:00:44.83','2025-08-17',82,6,2,1,7,1,69,56,NULL,'/evidences/44_83',NULL,'2025-11-15 00:00:00'),(152,'00:00:44.89','2018-09-16',98,1,3,1,NULL,55,NULL,NULL,NULL,'/evidences/44_89','https://www.youtube.com/watch?v=kKTiMn7LqJ8','2025-11-15 00:00:00'),(153,'00:00:44.91','2025-08-02',80,9,4,1,6,56,77,27,NULL,'/evidences/44_91',NULL,'2025-11-15 00:00:00'),(154,'00:00:44.94','2024-09-08',78,6,2,1,6,36,57,44,NULL,'/evidences/44_94',NULL,'2025-11-15 00:00:00'),(155,'00:00:45.09','2023-01-01',14,4,4,1,NULL,67,NULL,NULL,NULL,'/evidences/45_09','https://www.youtube.com/watch?v=zdm_jxXtNu0','2025-11-15 00:00:00'),(156,'00:00:45.44','2023-01-01',39,6,2,1,NULL,62,31,65,NULL,'/evidences/45_44',NULL,'2025-11-15 00:00:00'),(157,'00:00:45.50','2024-09-15',44,NULL,1,1,NULL,53,11,11,NULL,'/evidences/45_5','https://www.youtube.com/watch?v=N-f5eo0UgVc','2025-11-15 00:00:00'),(158,'00:00:45.72','2024-09-06',65,2,4,1,NULL,64,48,35,NULL,'/evidences/45_72',NULL,'2025-11-15 00:00:00'),(159,'00:00:45.82','2023-01-01',16,1,3,1,NULL,39,31,13,NULL,'/evidences/45_82',NULL,'2025-11-15 00:00:00'),(160,'00:00:45.86','2024-09-04',102,1,3,1,3,21,48,35,NULL,'/evidences/45_86',NULL,'2025-11-15 00:00:00'),(161,'00:00:47.97','2022-01-01',102,1,3,1,7,27,68,55,NULL,'/evidences/47_97',NULL,'2025-11-15 00:00:00'),(162,'00:00:45.96','2016-07-23',42,10,4,1,NULL,22,NULL,NULL,NULL,'/evidences/45_96','https://www.youtube.com/watch?v=TG_MpTk0tcI','2025-11-15 00:00:00'),(163,'00:00:45.67','2025-08-17',24,6,2,1,7,45,51,38,NULL,'/evidences/45_67',NULL,'2025-11-15 00:00:00'),(164,'00:00:46.12','2023-01-01',20,1,3,1,NULL,8,57,44,NULL,'/evidences/46_12',NULL,'2025-11-15 00:00:00'),(165,'00:00:46.18','2022-01-01',3,1,3,1,NULL,78,68,55,NULL,'/evidences/46_18',NULL,'2025-11-15 00:00:00'),(166,'00:00:46.38','2025-09-03',7,6,2,1,3,32,68,54,NULL,'/evidences/46_38',NULL,'2025-11-15 00:00:00'),(167,'00:00:46.41','2025-08-17',59,6,2,1,7,12,43,55,NULL,'/evidences/46_41','https://www.youtube.com/watch?v=Rk9mtODkO1Y','2025-11-15 00:00:00'),(168,'00:00:46.43','2022-08-24',37,1,3,1,7,40,31,18,NULL,'/evidences/46_43',NULL,'2025-11-15 00:00:00'),(169,'00:00:46.56','2024-07-03',72,6,2,1,3,73,68,55,NULL,'/evidences/46_56',NULL,'2025-11-15 00:00:00'),(170,'00:00:46.62','2024-06-04',31,6,2,1,NULL,83,68,55,NULL,'/evidences/46_62',NULL,'2025-11-15 00:00:00'),(171,'00:00:46.76','2025-08-27',31,6,2,1,3,67,53,40,NULL,'/evidences/46_76',NULL,'2025-11-15 00:00:00'),(172,'00:00:46.73','2025-05-31',54,NULL,1,1,NULL,66,48,35,NULL,'/evidences/46_73','https://www.youtube.com/watch?v=0_K1jzgGZp4','2025-11-15 00:00:00'),(173,'00:00:46.75','2024-08-14',97,6,2,1,7,57,57,42,NULL,'/evidences/46_75',NULL,'2025-11-15 00:00:00'),(174,'00:00:46.47','2025-08-27',95,6,2,1,3,7,54,41,NULL,'/evidences/46_47',NULL,'2025-11-15 00:00:00'),(175,'00:00:46.90','2023-01-01',46,2,4,1,NULL,36,68,55,NULL,'/evidences/46_9',NULL,'2025-11-15 00:00:00'),(176,'00:00:47.17','2025-08-08',15,5,4,1,3,81,68,55,NULL,'/evidences/47_17',NULL,'2025-11-15 00:00:00'),(177,'00:00:47.47','2024-07-21',92,1,3,1,3,3,68,55,NULL,'/evidences/47_47',NULL,'2025-11-15 00:00:00'),(178,'00:00:47.49','2025-07-25',101,2,4,1,7,56,68,55,'https://www.racebox.pro/webapp/session/683eca43313c4befcf0b0cd3','/evidences/47_49',NULL,'2025-11-15 00:00:00'),(179,'00:00:47.50','2024-08-18',93,6,2,1,2,63,68,55,NULL,'/evidences/47_5','https://www.youtube.com/watch?v=GPy7wa6-2rc','2025-11-15 00:00:00'),(180,'00:00:47.50','2025-07-20',50,1,3,1,3,10,54,41,NULL,'/evidences/47_5',NULL,'2025-11-15 00:00:00'),(181,'00:00:47.51','2025-08-20',100,2,4,1,7,70,63,50,'https://www.racebox.pro/webapp/session/68a5ee848762225130e40d8d','/evidences/47_51',NULL,'2025-11-15 00:00:00'),(182,'00:00:47.66','2025-08-14',52,6,2,1,3,10,49,36,'https://www.laptrophy.com/sessions/Pu3pH7','/evidences/47_66',NULL,'2025-11-15 00:00:00'),(183,'00:00:47.80','2022-05-23',17,6,2,1,NULL,NULL,NULL,NULL,NULL,'/evidences/47_8','https://www.youtube.com/watch?v=etejhe2I4OQ','2025-11-15 00:00:00'),(184,'00:00:46.84','2025-08-13',79,6,2,1,7,19,68,55,NULL,'/evidences/46_84',NULL,'2025-11-15 00:00:00'),(185,'00:00:47.91','2025-08-20',75,2,4,1,7,72,63,50,NULL,'/evidences/47_91','https://www.youtube.com/watch?v=j-Dms7XyWuA','2025-11-15 00:00:00'),(186,'00:00:47.89','2025-09-03',70,6,2,1,3,75,68,55,'https://www.laptrophy.com/sessions/2nsoNH','/evidences/47_89',NULL,'2025-11-15 00:00:00'),(187,'00:00:47.95','2025-08-13',36,6,2,1,7,59,48,35,NULL,'/evidences/47_95',NULL,'2025-11-15 00:00:00'),(188,'00:00:48.04','2024-09-22',89,6,2,1,3,78,68,55,NULL,'/evidences/48_04',NULL,'2025-11-15 00:00:00'),(189,'00:00:47.97','2025-08-27',63,6,2,1,3,38,68,55,NULL,'/evidences/47_97',NULL,'2025-11-15 00:00:00'),(190,'00:00:48.30','2019-07-01',53,NULL,1,1,NULL,42,NULL,NULL,NULL,'/evidences/48_3','https://www.youtube.com/watch?v=R6DwZpXyc0c','2025-11-15 00:00:00'),(191,'00:00:48.49','2025-08-08',60,2,4,1,3,67,67,54,'https://www.racebox.pro/webapp/session/68962592365a59e829aee2e1','/evidences/48_49',NULL,'2025-11-15 00:00:00'),(192,'00:00:48.55','2020-05-31',51,6,2,1,NULL,42,46,69,NULL,'/evidences/48_55','https://www.youtube.com/watch?v=mtZYhxPiyCU','2025-11-15 00:00:00'),(193,'00:00:48.01','2025-08-14',94,6,2,1,3,43,NULL,NULL,NULL,'/evidences/48_01',NULL,'2025-11-15 00:00:00'),(194,'00:00:48.77','2024-08-09',69,6,2,1,5,15,67,54,'https://www.laptrophy.com/sessions/pBpXcM','/evidences/48_77','https://www.youtube.com/watch?v=JJBhTNXK2pM','2025-11-15 00:00:00'),(195,'00:00:48.85','2025-08-09',62,6,2,1,6,34,48,35,NULL,'/evidences/48_85',NULL,'2025-11-15 00:00:00'),(196,'00:00:49.00','2020-09-18',25,NULL,1,1,7,28,NULL,NULL,NULL,'/evidences/49','https://www.youtube.com/watch?v=YyVmTd5NrWU','2025-11-15 00:00:00'),(197,'00:00:49.08','2024-08-18',55,6,2,1,2,56,39,26,NULL,'/evidences/49_08',NULL,'2025-11-15 00:00:00'),(198,'00:00:49.37','2024-09-08',12,6,2,1,6,NULL,NULL,NULL,NULL,'/evidences/49_37',NULL,'2025-11-15 00:00:00'),(199,'00:00:49.43','2024-09-08',34,6,2,1,6,83,39,26,NULL,'/evidences/49_43',NULL,'2025-11-15 00:00:00'),(200,'00:00:49.65','2025-08-14',27,6,2,1,3,31,38,25,NULL,'/evidences/49_65',NULL,'2025-11-15 00:00:00'),(201,'00:00:49.74','2024-06-29',56,6,2,1,7,59,5,5,NULL,'/evidences/49_74',NULL,'2025-11-15 00:00:00'),(202,'00:00:49.98','2024-08-09',9,6,2,1,5,65,65,52,NULL,'/evidences/49_98',NULL,'2025-11-15 00:00:00'),(203,'00:00:49.98','2025-07-06',103,6,2,1,3,61,68,55,NULL,'/evidences/49_98',NULL,'2025-11-15 00:00:00'),(204,'00:00:50.00','2022-04-24',88,NULL,1,1,2,NULL,NULL,NULL,NULL,'/evidences/50','https://www.youtube.com/watch?v=zlr0jZPrAj0','2025-11-15 00:00:00'),(205,'00:00:50.00','2023-06-05',86,NULL,1,1,7,18,65,52,NULL,'/evidences/50',NULL,'2025-11-15 00:00:00'),(206,'00:00:50.10','2025-08-08',49,6,2,1,3,50,9,9,NULL,'/evidences/50_1',NULL,'2025-11-15 00:00:00'),(207,'00:00:50.11','2020-08-18',30,NULL,1,1,NULL,59,NULL,NULL,NULL,'/evidences/50_11','https://www.youtube.com/watch?v=jpMLFT5rWFQ','2025-11-15 00:00:00'),(208,'00:00:50.40','2020-08-24',104,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/50_4','https://www.youtube.com/watch?v=8Cy3ZOiHk_k','2025-11-15 00:00:00'),(209,'00:00:50.50','2024-06-29',23,6,2,1,3,49,68,55,NULL,'/evidences/50_5',NULL,'2025-11-15 00:00:00'),(210,'00:00:50.83','2024-09-08',22,6,2,1,6,39,NULL,NULL,NULL,'/evidences/50_83',NULL,'2025-11-15 00:00:00'),(211,'00:00:50.99','2024-09-19',2,6,2,1,7,56,40,27,NULL,'/evidences/50_99',NULL,'2025-11-15 00:00:00'),(212,'00:00:51.00','2023-08-30',90,NULL,1,1,2,35,NULL,NULL,NULL,'/evidences/51','https://www.youtube.com/watch?v=sqgmlAghHsg','2025-11-15 00:00:00'),(213,'00:00:51.00','2023-09-07',96,NULL,1,1,NULL,6,NULL,NULL,NULL,'/evidences/51',NULL,'2025-11-15 00:00:00'),(214,'00:00:51.29','2025-08-27',40,6,2,1,3,40,65,NULL,'https://www.laptrophy.com/sessions/sWe3OI','/evidences/51_29',NULL,'2025-11-15 00:00:00'),(215,'00:00:51.35','2024-07-03',58,6,2,1,3,74,10,10,NULL,'/evidences/51_35',NULL,'2025-11-15 00:00:00'),(216,'00:00:51.37','2024-06-05',56,6,2,1,3,49,5,NULL,NULL,'/evidences/51_37',NULL,'2025-11-15 00:00:00'),(217,'00:00:50.41','2025-09-07',32,2,4,1,6,44,2,2,NULL,'/evidences/50_41',NULL,'2025-11-15 00:00:00'),(218,'00:00:51.64','2024-09-22',43,6,2,1,3,73,68,55,'https://www.laptrophy.com/sessions/QeHqzu','/evidences/51_64',NULL,'2025-11-15 00:00:00'),(219,'00:00:51.68','2025-08-08',73,6,2,1,3,76,67,54,NULL,'/evidences/51_68',NULL,'2025-11-15 00:00:00'),(220,'00:00:51.99','2024-07-05',77,6,1,1,2,83,67,54,NULL,'/evidences/51_99',NULL,'2025-11-15 00:00:00'),(221,'00:00:52.01','2022-08-28',90,6,1,1,2,35,NULL,NULL,NULL,'/evidences/52_01',NULL,'2025-11-15 00:00:00'),(222,'00:00:52.02','2024-07-03',71,1,3,1,3,48,52,39,NULL,'/evidences/52_02',NULL,'2025-11-15 00:00:00'),(223,'00:00:52.24','2024-08-17',48,6,2,1,3,25,51,38,NULL,'/evidences/52_24',NULL,'2025-11-15 00:00:00'),(224,'00:00:52.56','2024-08-17',11,NULL,1,1,3,12,41,28,NULL,'/evidences/52_56',NULL,'2025-11-15 00:00:00'),(225,'00:00:52.59','2025-08-17',57,1,3,1,7,14,67,71,NULL,'/evidences/52_59',NULL,'2025-11-15 00:00:00'),(226,'00:00:52.69','2024-07-31',5,6,2,1,7,4,68,55,NULL,'/evidences/52_69',NULL,'2025-11-15 00:00:00'),(227,'00:00:53.00','2024-07-02',21,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/53','https://www.youtube.com/watch?v=MBhLJZ8ToA0','2025-11-15 00:00:00'),(228,'00:00:53.00','2024-08-01',45,NULL,1,1,4,77,68,55,NULL,'/evidences/53','https://www.youtube.com/watch?v=3EqleyD0mDU','2025-11-15 00:00:00'),(229,'00:00:53.46','2024-07-21',8,6,2,1,3,75,45,32,NULL,'/evidences/53_46',NULL,'2025-11-15 00:00:00'),(230,'00:00:50.74','2025-08-08',4,6,2,1,3,47,37,24,NULL,'/evidences/50_74',NULL,'2025-11-15 00:00:00'),(231,'00:00:53.64','2024-07-19',10,6,2,1,NULL,69,45,32,NULL,'/evidences/53_64',NULL,'2025-11-15 00:00:00'),(232,'00:00:54.92','2024-06-29',26,6,2,1,3,NULL,49,36,NULL,'/evidences/54_92',NULL,'2025-11-15 00:00:00'),(233,'00:00:55.99','2024-08-16',87,6,1,1,2,16,47,34,NULL,'/evidences/55_99',NULL,'2025-11-15 00:00:00'),(234,'00:00:56.96','2024-08-24',33,6,1,1,6,46,NULL,NULL,NULL,'/evidences/56_96',NULL,'2025-11-15 00:00:00'),(235,'00:00:58.00','2024-05-26',13,NULL,1,1,3,15,NULL,NULL,NULL,'/evidences/58','https://www.youtube.com/watch?v=NYLzNRK0rsI','2025-11-15 00:00:00'),(236,'00:00:58.44','2024-07-07',29,6,2,1,5,30,NULL,NULL,NULL,'/evidences/58_44',NULL,'2025-11-15 00:00:00'),(237,'00:00:59.00','2020-06-28',19,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/59','https://www.youtube.com/watch?v=GgL4nH-ebqA','2025-11-15 00:00:00'),(238,'00:00:59.12','2024-07-21',61,6,2,1,3,80,42,29,'https://www.laptrophy.com/sessions/cQldYE','/evidences/59_12',NULL,'2025-11-15 00:00:00'),(239,'01:00:00.00','2021-06-27',99,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'/evidences/60','https://www.youtube.com/watch?v=7eRKsR6d5A4','2025-11-15 00:00:00'),(240,'01:00:00.00','2017-08-09',68,NULL,1,1,NULL,51,NULL,NULL,NULL,'/evidences/60','https://www.youtube.com/watch?v=MURaILW-jbI','2025-11-15 00:00:00');
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

-- Dump completed on 2025-12-16 21:33:17
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
-- Table structure for table `laps_validity`
--

DROP TABLE IF EXISTS `laps_validity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laps_validity` (
  `validity_id` int NOT NULL AUTO_INCREMENT,
  `validity` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`validity_id`),
  UNIQUE KEY `validity_id_UNIQUE` (`validity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laps_validity`
--

LOCK TABLES `laps_validity` WRITE;
/*!40000 ALTER TABLE `laps_validity` DISABLE KEYS */;
INSERT INTO `laps_validity` VALUES (1,'low'),(2,'medium'),(3,'high'),(4,'very_high');
/*!40000 ALTER TABLE `laps_validity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:18
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
-- Table structure for table `lap_approvals`
--

DROP TABLE IF EXISTS `lap_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lap_approvals` (
  `approval_id` int NOT NULL AUTO_INCREMENT,
  `lap_id` int NOT NULL,
  `approval_token` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`approval_id`),
  UNIQUE KEY `approval_token_UNIQUE` (`approval_token`),
  KEY `fk.lap.id` (`lap_id`),
  CONSTRAINT `fk.lap.id` FOREIGN KEY (`lap_id`) REFERENCES `laps` (`lap_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lap_approvals`
--

LOCK TABLES `lap_approvals` WRITE;
/*!40000 ALTER TABLE `lap_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `lap_approvals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:18
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
-- Table structure for table `motorcycles`
--

DROP TABLE IF EXISTS `motorcycles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motorcycles` (
  `motorcycle_id` int NOT NULL AUTO_INCREMENT,
  `motorcycle` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `online_description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preview_path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`motorcycle_id`),
  UNIQUE KEY `id_UNIQUE` (`motorcycle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorcycles`
--

LOCK TABLES `motorcycles` WRITE;
/*!40000 ALTER TABLE `motorcycles` DISABLE KEYS */;
INSERT INTO `motorcycles` VALUES (1,'Yamaha Thunderace',1996,'Sport',NULL,NULL),(2,'BMW 1000RR HP4',2014,'Sport',NULL,NULL),(3,'BMW 1000RR',2024,'Sport',NULL,NULL),(4,'BMW S1000R',NULL,'Naked',NULL,NULL),(5,'Ducati 899 Panigale',NULL,'Sport',NULL,NULL),(6,'Ducati Monster 1200R',NULL,'Naked',NULL,NULL),(7,'Ducati Monster 937 SP',NULL,'Naked',NULL,NULL),(8,'Ducati Panigale V4R',NULL,'Sport',NULL,NULL),(9,'Ducati Panigale V4S',NULL,'Sport',NULL,NULL),(10,'Ducati Streetfighter V4S',NULL,'Naked',NULL,NULL),(11,'Ducati Streetfighter V4S',NULL,'Naked',NULL,NULL),(12,'Honda CB 600F Hornet',NULL,'Naked',NULL,NULL),(13,'Honda CB 600F Hornet',2003,'Naked',NULL,NULL),(14,'Honda CB1000R',2009,'Naked',NULL,NULL),(15,'Honda CB650R',2019,'Naked',NULL,NULL),(16,'Honda CBR 1100XX Blackbird',NULL,'Sport',NULL,NULL),(17,'Honda CBR 600RR',2007,'Sport',NULL,NULL),(18,'Honda CBR 954RR Fireblade',NULL,'Sport',NULL,NULL),(19,'Honda CBR1000RR',NULL,'Sport',NULL,NULL),(20,'Honda CBR1000RR',2005,'Sport',NULL,NULL),(21,'Honda CBR1000RR-R SP',NULL,'Sport',NULL,NULL),(22,'Honda CBR250R',2016,'Sport',NULL,NULL),(23,'Honda CBR600RR',NULL,'Sport',NULL,NULL),(24,'Honda CBR600RR',2025,'Sport',NULL,NULL),(25,'Honda CBR650R',NULL,'Sport',NULL,NULL),(26,'Honda CRF 450 R',NULL,'SuperMoto',NULL,NULL),(27,'Honda Fireblade CBR1000RR',2007,'Sport',NULL,NULL),(28,'Honda Hornet 600',NULL,'Naked',NULL,NULL),(29,'Husqvarna FS 450',NULL,'SuperMoto',NULL,NULL),(30,'KTM Duke 390',NULL,'Naked',NULL,NULL),(31,'KTM Duke 690',NULL,'Naked',NULL,NULL),(32,'KTM Duke 790',NULL,'Naked',NULL,NULL),(33,'KTM SD 990',NULL,'Naked',NULL,NULL),(34,'KTM SuperDuke 1290 GT',NULL,'Touring',NULL,NULL),(35,'Kawasaki Ninja 250R',NULL,'Sport',NULL,NULL),(36,'Kawasaki Ninja 300',NULL,'Sport',NULL,NULL),(37,'Kawasaki Ninja 400',NULL,'Sport',NULL,NULL),(38,'Kawasaki Z750',NULL,'Naked',NULL,NULL),(39,'Kawasaki ZX-10R Ninja',2006,'Sport',NULL,NULL),(40,'Kawasaki ZX-6R',NULL,'Sport',NULL,NULL),(41,'Kawasaki ZX-6R',2008,'Sport',NULL,NULL),(42,'MRF 130 SM',NULL,'PitBike',NULL,NULL),(43,'MRF 140 SM',NULL,'PitBike',NULL,NULL),(44,'MRF 160-R SM',NULL,'PitBike',NULL,NULL),(45,'Aprilia Tuono v4 1100',NULL,'Naked',NULL,NULL),(46,'Yamaha XJ600 Diversion',NULL,'Naked',NULL,NULL),(47,'Yamaha Tracer 9 Sport Touring',NULL,'Touring',NULL,NULL),(48,'Suzuki DR-Z4SM',NULL,'SuperMoto',NULL,NULL),(49,'Suzuki GSR 750',NULL,'Naked',NULL,NULL),(50,'Suzuki GSX-8R',NULL,'Sport',NULL,NULL),(51,'Suzuki GSX-R 1000',NULL,'Sport',NULL,NULL),(52,'Suzuki GSX-R 600 K1',2001,'Sport',NULL,NULL),(53,'Suzuki GSX-R 600 K4',NULL,'Sport',NULL,NULL),(54,'Suzuki GSX-R 600 K6',2006,'Sport',NULL,NULL),(55,'Suzuki GSX-R 600 K9',2009,'Sport',NULL,NULL),(56,'Suzuki GSX-R 600',NULL,'Sport',NULL,NULL),(57,'Suzuki GSX-R 750 K6',2006,'Sport',NULL,NULL),(58,'Suzuki GSX-R 750 K7',2007,'Sport',NULL,NULL),(59,'Suzuki GSX-R 750',NULL,'Sport',NULL,NULL),(60,'Suzuki GSX-R 750',NULL,'Sport',NULL,NULL),(61,'Suzuki GSX-S 1000',NULL,'Naked',NULL,NULL),(62,'Suzuki SV 650',NULL,'Naked',NULL,NULL),(63,'Triumph Street Triple 1050',NULL,'Naked',NULL,NULL),(64,'Triumph Street Triple 1200 RS',NULL,'Naked',NULL,NULL),(65,'Triumph Street Triple 675',NULL,'Naked',NULL,NULL),(66,'Triumph Street Triple 765 R',NULL,'Naked',NULL,NULL),(67,'Triumph Street Triple 765 RS',NULL,'Naked',NULL,NULL),(68,'Triumph Street Triple 765 RS',NULL,'Sport',NULL,NULL),(69,'Triumph Trident 660',NULL,'Naked',NULL,NULL),(70,'YCF 150 SM',NULL,'PitBike',NULL,NULL),(71,'YCF 190 SM',NULL,'PitBike',NULL,NULL),(72,'YCF K150 SM',NULL,'PitBike',NULL,NULL),(73,'Yamaha FZ1',NULL,'Naked',NULL,NULL),(74,'Yamaha FZ1-N',NULL,'Naked',NULL,NULL),(75,'Yamaha MT07',NULL,'Naked',NULL,NULL),(76,'Yamaha MT09',2024,'Naked',NULL,NULL),(77,'Yamaha MT10',NULL,'Naked',NULL,NULL),(78,'Yamaha R1',NULL,'Sport',NULL,NULL),(79,'Yamaha R1',2016,'Sport',NULL,NULL),(80,'Yamaha R125',2020,'Sport',NULL,NULL),(81,'Yamaha R3',NULL,'Sport',NULL,NULL),(82,'Yamaha R6 – 2005',2005,'Sport',NULL,NULL),(83,'Yamaha R6',NULL,'Sport',NULL,NULL),(84,'Yamaha R6',2003,'Sport',NULL,NULL);
/*!40000 ALTER TABLE `motorcycles` ENABLE KEYS */;
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
-- Table structure for table `organizers`
--

DROP TABLE IF EXISTS `organizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizers` (
  `organizer_id` int NOT NULL AUTO_INCREMENT,
  `organizer_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`organizer_id`),
  UNIQUE KEY `id_UNIQUE` (`organizer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizers`
--

LOCK TABLES `organizers` WRITE;
/*!40000 ALTER TABLE `organizers` DISABLE KEYS */;
INSERT INTO `organizers` VALUES (1,'TrackAttack',NULL),(2,'3MMRacing',NULL),(3,'MotoEkipa',NULL),(4,'MotoZone',NULL),(5,'NaKolanie',NULL),(6,'Robson TD',NULL),(7,'TrackSpace',NULL);
/*!40000 ALTER TABLE `organizers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:18
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
  `social_instagram` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_facebook` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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

-- Dump completed on 2025-12-16 21:33:19
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
-- Table structure for table `riders_levels`
--

DROP TABLE IF EXISTS `riders_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riders_levels` (
  `level_id` int NOT NULL AUTO_INCREMENT,
  `rider_level` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`level_id`),
  UNIQUE KEY `id_UNIQUE` (`level_id`),
  UNIQUE KEY `level_UNIQUE` (`rider_level`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riders_levels`
--

LOCK TABLES `riders_levels` WRITE;
/*!40000 ALTER TABLE `riders_levels` DISABLE KEYS */;
INSERT INTO `riders_levels` VALUES (4,'advanced'),(2,'beginner'),(1,'freshman'),(3,'medium'),(6,'professional'),(5,'semipro');
/*!40000 ALTER TABLE `riders_levels` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:16
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
-- Table structure for table `sex`
--

DROP TABLE IF EXISTS `sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sex` (
  `sex_id` int NOT NULL AUTO_INCREMENT,
  `sex_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sex_id`),
  UNIQUE KEY `sex_UNIQUE` (`sex_name`),
  UNIQUE KEY `sex_id_UNIQUE` (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sex`
--

LOCK TABLES `sex` WRITE;
/*!40000 ALTER TABLE `sex` DISABLE KEYS */;
INSERT INTO `sex` VALUES (1,'female'),(2,'male');
/*!40000 ALTER TABLE `sex` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:18
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
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `track_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(54) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(54) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int NOT NULL,
  `length_m` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`track_id`),
  UNIQUE KEY `id_UNIQUE` (`track_id`),
  UNIQUE KEY `name_UNIQUE` (`track_name`),
  KEY `fk.track_typs.id_idx` (`type_id`),
  CONSTRAINT `fk.track_typs.id` FOREIGN KEY (`type_id`) REFERENCES `track_types` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,'ODTJ Autodrom Pomorze \"Pszczółki\"','Pszczółki','Poland',2,'1047'),(2,'Tor Poznań','Poznań','Poland',1,'4085');
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:18
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
-- Table structure for table `track_types`
--

DROP TABLE IF EXISTS `track_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `track_types` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track_types`
--

LOCK TABLES `track_types` WRITE;
/*!40000 ALTER TABLE `track_types` DISABLE KEYS */;
INSERT INTO `track_types` VALUES (1,'full size'),(3,'indoor'),(2,'small');
/*!40000 ALTER TABLE `track_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:16
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
  `tyre_front` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tf_id`),
  UNIQUE KEY `id_UNIQUE` (`tf_id`),
  UNIQUE KEY `tyre_front_UNIQUE` (`tyre_front`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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

-- Dump completed on 2025-12-16 21:33:18
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
-- Temporary view structure for view `rider_laptimes_all`
--

DROP TABLE IF EXISTS `rider_laptimes_all`;
/*!50001 DROP VIEW IF EXISTS `rider_laptimes_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rider_laptimes_all` AS SELECT 
 1 AS `lap_time`,
 1 AS `rider_name`,
 1 AS `motorcycle`,
 1 AS `lap_date`,
 1 AS `track_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `leaderboard_all_track_laps_unique`
--

DROP TABLE IF EXISTS `leaderboard_all_track_laps_unique`;
/*!50001 DROP VIEW IF EXISTS `leaderboard_all_track_laps_unique`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leaderboard_all_track_laps_unique` AS SELECT 
 1 AS `lap_time`,
 1 AS `rider_name`,
 1 AS `rider_level`,
 1 AS `validity`,
 1 AS `motorcycle`,
 1 AS `tyre_front`,
 1 AS `tyre_rear`,
 1 AS `lap_date`,
 1 AS `track_name`,
 1 AS `sex_name`,
 1 AS `rn`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `rider_lap_details`
--

DROP TABLE IF EXISTS `rider_lap_details`;
/*!50001 DROP VIEW IF EXISTS `rider_lap_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rider_lap_details` AS SELECT 
 1 AS `lap_time`,
 1 AS `rider_name`,
 1 AS `sex`,
 1 AS `rider_level`,
 1 AS `validity`,
 1 AS `motorcycle`,
 1 AS `tyre_front`,
 1 AS `tyre_rear`,
 1 AS `lap_date`,
 1 AS `device`,
 1 AS `organizer`,
 1 AS `proof_url`,
 1 AS `proof_picture_path`,
 1 AS `video_url`,
 1 AS `rider_fb`,
 1 AS `rider_ig`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `rider_laptimes_all`
--

/*!50001 DROP VIEW IF EXISTS `rider_laptimes_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `rider_laptimes_all` AS select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`motorcycles`.`motorcycle` AS `motorcycle`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name` from (((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) order by `riders`.`rider_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leaderboard_all_track_laps_unique`
--

/*!50001 DROP VIEW IF EXISTS `leaderboard_all_track_laps_unique`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `leaderboard_all_track_laps_unique` AS select `t`.`lap_time` AS `lap_time`,`t`.`rider_name` AS `rider_name`,`t`.`rider_level` AS `rider_level`,`t`.`validity` AS `validity`,`t`.`motorcycle` AS `motorcycle`,`t`.`tyre_front` AS `tyre_front`,`t`.`tyre_rear` AS `tyre_rear`,`t`.`lap_date` AS `lap_date`,`t`.`track_name` AS `track_name`,`t`.`sex_name` AS `sex_name`,`t`.`rn` AS `rn` from (select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`riders_levels`.`rider_level` AS `rider_level`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name`,`sex`.`sex_name` AS `sex_name`,row_number() OVER (PARTITION BY `riders`.`rider_name`,`motorcycles`.`motorcycle`,`tracks`.`track_name` )  AS `rn` from ((((((((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `riders_levels` on((`riders`.`rider_level` = `riders_levels`.`level_id`))) left join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) left join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) left join `sex` on((`riders`.`sex_id` = `sex`.`sex_id`))) order by `laps`.`lap_time`) `t` where (`t`.`rn` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rider_lap_details`
--

/*!50001 DROP VIEW IF EXISTS `rider_lap_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `rider_lap_details` AS select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`sex`.`sex_name` AS `sex`,`riders_levels`.`rider_level` AS `rider_level`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`devices`.`device_name` AS `device`,`organizers`.`organizer_name` AS `organizer`,`laps`.`proof_url` AS `proof_url`,`laps`.`proof_picture_path` AS `proof_picture_path`,`laps`.`video_url` AS `video_url`,`riders`.`social_facebook` AS `rider_fb`,`riders`.`social_instagram` AS `rider_ig` from (((((((((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `riders_levels` on((`riders`.`rider_level` = `riders_levels`.`level_id`))) left join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) left join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) left join `devices` on((`laps`.`device_id` = `devices`.`device_id`))) left join `organizers` on((`laps`.`organizer_id` = `organizers`.`organizer_id`))) left join `sex` on((`riders`.`sex_id` = `sex`.`sex_id`))) order by `laps`.`lap_time` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 21:33:19
