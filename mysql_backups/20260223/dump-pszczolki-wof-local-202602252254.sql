-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 192.168.1.125    Database: pszczolki-wof-local
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bind_track_organizers`
--

DROP TABLE IF EXISTS `bind_track_organizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bind_track_organizers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `track_id` int NOT NULL,
  `organizer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-tracks.id_idx` (`track_id`),
  KEY `fk-organizers.id_idx` (`organizer_id`),
  CONSTRAINT `fk-organizers.id` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`organizer_id`),
  CONSTRAINT `fk-tracks.id` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bind_track_organizers`
--

LOCK TABLES `bind_track_organizers` WRITE;
/*!40000 ALTER TABLE `bind_track_organizers` DISABLE KEYS */;
INSERT INTO `bind_track_organizers` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,2,8);
/*!40000 ALTER TABLE `bind_track_organizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `device_name` varchar(100) NOT NULL,
  `device_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `id_UNIQUE` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'Aliexpres / TEMU',NULL),(2,'RaceBox',NULL),(3,'Aim Solo',NULL),(4,'Dragy',NULL),(5,'PZRacing',NULL),(6,'Android/iOS',NULL),(8,'Qstarz',NULL),(9,'Starlane',NULL),(10,'LP-Cheetah',NULL),(11,'Kostka pomiarowa',NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(128) NOT NULL,
  `city` varchar(128) DEFAULT NULL,
  `logo_path` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Hot Head Bikers','Gdynia',NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lap_approvals`
--

DROP TABLE IF EXISTS `lap_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lap_approvals` (
  `approval_id` int NOT NULL AUTO_INCREMENT,
  `lap_id` int NOT NULL,
  `approval_token` varchar(512) NOT NULL,
  PRIMARY KEY (`approval_id`),
  UNIQUE KEY `approval_token_UNIQUE` (`approval_token`),
  KEY `fk.lap.id` (`lap_id`),
  CONSTRAINT `fk.lap.id` FOREIGN KEY (`lap_id`) REFERENCES `laps` (`lap_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lap_approvals`
--

LOCK TABLES `lap_approvals` WRITE;
/*!40000 ALTER TABLE `lap_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `lap_approvals` ENABLE KEYS */;
UNLOCK TABLES;

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
  `status` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
  KEY `laps_status_IDX` (`status`) USING BTREE,
  CONSTRAINT `fk-organizer.id` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`organizer_id`),
  CONSTRAINT `fk.device.id` FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`),
  CONSTRAINT `fk.motorcycle.id` FOREIGN KEY (`motorcycle_id`) REFERENCES `motorcycles` (`motorcycle_id`),
  CONSTRAINT `fk.riders.id` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`rider_id`),
  CONSTRAINT `fk.tracks.id` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`),
  CONSTRAINT `fk.tyres_front.id` FOREIGN KEY (`tyre_front_id`) REFERENCES `tyres_front` (`tf_id`),
  CONSTRAINT `fk.tyres_rear.id` FOREIGN KEY (`tyre_rear_id`) REFERENCES `tyres_rear` (`tr_id`),
  CONSTRAINT `fk.validity.id` FOREIGN KEY (`validity_id`) REFERENCES `laps_validity` (`validity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laps`
--

LOCK TABLES `laps` WRITE;
/*!40000 ALTER TABLE `laps` DISABLE KEYS */;
INSERT INTO `laps` VALUES (322,'00:00:41.770','2020-07-20',83,3,4,1,1,29,59,47,NULL,'/evidences/41_77.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(323,'00:00:41.770','2020-07-20',83,3,4,1,1,29,59,47,NULL,'/evidences/41_77.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(324,'00:00:41.780','2020-06-20',83,3,4,1,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(325,'00:01:41.781','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(326,'02:01:00.781','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(327,'02:01:00.781','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(328,'00:00:10.000','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(329,'00:00:10.110','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(330,'00:00:10.111','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(331,'00:00:10.114','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(332,'01:10:00.111','2022-06-20',83,3,4,2,1,83,34,21,NULL,'/evidences/41_78.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(333,'00:00:41.760','2020-08-20',83,3,4,1,1,29,34,21,NULL,'/evidences/41_76.jpg','https://www.youtube.com/watch?v=DVSyvmzuBZY','approved','2026-01-19 00:00:00'),(334,'00:00:42.050','2017-08-14',76,1,3,1,NULL,83,70,13,NULL,'/evidences/42_05.jpg','https://www.youtube.com/watch?v=HNgAaSlXTa0','approved','2026-01-19 00:00:00'),(335,'00:00:42.120','2017-01-01',81,1,3,1,NULL,54,59,65,NULL,'/evidences/42_12.jpg',NULL,'approved','2026-01-19 00:00:00'),(336,'00:00:42.450','2017-07-18',18,1,3,1,NULL,52,73,13,NULL,'/evidences/42_45.jpg',NULL,'approved','2026-01-19 00:00:00'),(337,'00:00:42.460','2025-08-02',1,3,4,1,6,29,NULL,20,NULL,'/evidences/42_46.jpg',NULL,'approved','2026-01-19 00:00:00'),(338,'00:00:42.630','2025-09-07',28,1,3,1,6,23,76,NULL,NULL,'/evidences/42_63.jpg',NULL,'approved','2026-01-19 00:00:00'),(339,'00:00:42.770','2020-09-08',28,1,3,1,NULL,23,NULL,NULL,NULL,'/evidences/42_77.jpg','https://www.youtube.com/watch?v=UG2P0IQbdBs','approved','2026-01-19 00:00:00'),(340,'00:00:43.380','2023-07-02',74,2,4,1,NULL,23,36,23,'https://www.racebox.pro/webapp/session/64a1679954a76481131b423c','/evidences/43_38.jpg',NULL,'approved','2026-01-19 00:00:00'),(341,'00:00:43.420','2025-08-09',35,5,4,1,6,29,34,21,NULL,'/evidences/43_42.jpg',NULL,'approved','2026-01-19 00:00:00'),(342,'00:00:43.480','2018-05-13',66,2,4,1,NULL,5,NULL,NULL,NULL,'/evidences/43_48.jpg','https://www.youtube.com/watch?v=ugJNTPsMuMY','approved','2026-01-19 00:00:00'),(343,'00:00:43.550','2025-08-09',84,3,4,1,6,26,44,NULL,NULL,'/evidences/43_55.jpg',NULL,'approved','2026-01-19 00:00:00'),(344,'00:00:43.550','2024-08-24',64,5,4,1,6,2,7,7,NULL,'/evidences/43_55.jpg',NULL,'approved','2026-01-19 00:00:00'),(345,'00:00:43.600','2023-08-09',74,2,4,1,NULL,37,4,4,'https://www.racebox.pro/webapp/session/64d3c73a75a0a6cdcf1b423c','/evidences/43_6.jpg',NULL,'approved','2026-01-19 00:00:00'),(346,'00:00:43.650','2024-09-22',67,2,4,1,3,17,69,56,NULL,'/evidences/43_65.jpg',NULL,'approved','2026-01-19 00:00:00'),(347,'00:00:43.690','2019-05-01',98,1,3,1,NULL,19,NULL,NULL,NULL,'/evidences/43_69.jpg','https://www.youtube.com/watch?v=zTMPzs5I0Og','approved','2026-01-19 00:00:00'),(348,'00:00:43.780','2025-06-03',41,2,4,1,NULL,82,69,44,'https://www.racebox.pro/webapp/session/683eca43313c4befcf0b0cd3','/evidences/43_78.jpg',NULL,'approved','2026-01-19 00:00:00'),(349,'00:00:43.960','2014-08-27',14,4,4,1,7,81,57,40,NULL,'/evidences/43_96.jpg','https://www.youtube.com/watch?v=dKhD-9K65kI','approved','2026-01-19 00:00:00'),(350,'00:00:44.030','2025-09-04',47,2,4,1,7,9,57,44,'https://www.racebox.pro/webapp/session/68b9b7d223b7d5453c270af7','/evidences/44_03.jpg',NULL,'approved','2026-01-19 00:00:00'),(351,'00:00:44.050','2014-08-25',85,2,4,1,7,NULL,13,13,NULL,'/evidences/44_05.jpg',NULL,'approved','2026-01-19 00:00:00'),(352,'00:00:44.190','2025-09-07',91,8,4,1,6,71,64,51,NULL,'/evidences/44_19.jpg',NULL,'approved','2026-01-19 00:00:00'),(353,'00:00:44.210','2024-09-29',93,1,3,1,7,58,40,NULL,NULL,'/evidences/44_21.jpg','https://www.youtube.com/watch?v=9RfWD7viUCc','approved','2026-01-19 00:00:00'),(354,'00:00:44.350','2024-08-24',6,1,3,1,6,55,59,64,NULL,'/evidences/44_35.jpg',NULL,'approved','2026-01-19 00:00:00'),(355,'00:00:44.480','2025-05-19',74,2,4,1,NULL,37,NULL,NULL,'https://www.racebox.pro/webapp/session/6829fe06c264e95f5c423d89','/evidences/44_48.jpg','https://www.youtube.com/watch?v=pFAJ_RTTp4k','approved','2026-01-19 00:00:00'),(356,'00:00:44.750','2025-08-09',32,2,4,1,6,5,61,65,NULL,'/evidences/44_75.jpg',NULL,'approved','2026-01-19 00:00:00'),(357,'00:00:44.800','2024-08-25',38,6,2,1,7,33,57,44,'https://www.laptrophy.com/sessions/vjKZsW','/evidences/44_8.jpg',NULL,'approved','2026-01-19 00:00:00'),(358,'00:00:44.830','2025-08-17',82,6,2,1,7,1,69,56,NULL,'/evidences/44_83.jpg',NULL,'approved','2026-01-19 00:00:00'),(359,'00:00:44.890','2018-09-16',98,1,3,1,NULL,55,NULL,NULL,NULL,'/evidences/44_89.jpg','https://www.youtube.com/watch?v=kKTiMn7LqJ8','approved','2026-01-19 00:00:00'),(360,'00:00:44.910','2025-08-02',80,9,4,1,6,56,77,27,NULL,'/evidences/44_91.jpg',NULL,'approved','2026-01-19 00:00:00'),(361,'00:00:44.940','2024-09-08',78,6,2,1,6,36,57,44,NULL,'/evidences/44_94.jpg',NULL,'approved','2026-01-19 00:00:00'),(362,'00:00:45.090','2023-01-01',14,4,4,1,NULL,67,NULL,NULL,NULL,'/evidences/45_09.jpg','https://www.youtube.com/watch?v=zdm_jxXtNu0','approved','2026-01-19 00:00:00'),(363,'00:00:45.440','2023-01-01',39,6,2,1,NULL,62,31,65,NULL,'/evidences/45_44.jpg',NULL,'approved','2026-01-19 00:00:00'),(364,'00:00:45.500','2024-09-15',44,NULL,1,1,NULL,53,11,11,NULL,'/evidences/45_5.jpg','https://www.youtube.com/watch?v=N-f5eo0UgVc','approved','2026-01-19 00:00:00'),(365,'00:00:45.720','2024-09-06',65,2,4,1,NULL,64,48,35,NULL,'/evidences/45_72.jpg',NULL,'approved','2026-01-19 00:00:00'),(366,'00:00:45.820','2023-01-01',16,1,3,1,NULL,39,31,13,NULL,'/evidences/45_82.jpg',NULL,'approved','2026-01-19 00:00:00'),(367,'00:00:45.860','2024-09-04',102,1,3,1,3,21,48,35,NULL,'/evidences/45_86.jpg',NULL,'approved','2026-01-19 00:00:00'),(368,'00:00:47.970','2022-01-01',102,1,3,1,7,27,68,55,NULL,'/evidences/47_97.jpg',NULL,'approved','2026-01-19 00:00:00'),(369,'00:00:45.960','2016-07-23',42,10,4,1,NULL,22,NULL,NULL,NULL,'/evidences/45_96.jpg','https://www.youtube.com/watch?v=TG_MpTk0tcI','approved','2026-01-19 00:00:00'),(370,'00:00:45.670','2025-08-17',24,6,2,1,7,45,51,38,NULL,'/evidences/45_67.jpg',NULL,'approved','2026-01-19 00:00:00'),(371,'00:00:46.120','2023-01-01',20,1,3,1,NULL,8,57,44,NULL,'/evidences/46_12.jpg',NULL,'approved','2026-01-19 00:00:00'),(372,'00:00:46.180','2022-01-01',3,1,3,1,NULL,78,68,55,NULL,'/evidences/46_18.jpg',NULL,'approved','2026-01-19 00:00:00'),(373,'00:00:46.380','2025-09-03',7,6,2,1,3,32,68,54,NULL,'/evidences/46_38.jpg',NULL,'approved','2026-01-19 00:00:00'),(374,'00:00:46.410','2025-08-17',59,6,2,1,7,12,43,55,NULL,'/evidences/46_41.jpg','https://www.youtube.com/watch?v=Rk9mtODkO1Y','approved','2026-01-19 00:00:00'),(375,'00:00:46.430','2022-08-24',37,1,3,1,7,40,31,18,NULL,'/evidences/46_43.jpg',NULL,'approved','2026-01-19 00:00:00'),(376,'00:00:46.560','2024-07-03',72,6,2,1,3,73,68,55,NULL,'/evidences/46_56.jpg',NULL,'approved','2026-01-19 00:00:00'),(377,'00:00:46.620','2024-06-04',31,6,2,1,NULL,83,68,55,NULL,'/evidences/46_62.jpg',NULL,'approved','2026-01-19 00:00:00'),(378,'00:00:46.760','2025-08-27',31,6,2,1,3,67,53,40,NULL,'/evidences/46_76.jpg',NULL,'approved','2026-01-19 00:00:00'),(379,'00:00:46.730','2025-05-31',54,NULL,1,1,NULL,66,48,35,NULL,'/evidences/46_73.jpg','https://www.youtube.com/watch?v=0_K1jzgGZp4','approved','2026-01-19 00:00:00'),(380,'00:00:46.750','2024-08-14',97,6,2,1,7,57,57,42,NULL,'/evidences/46_75.jpg',NULL,'approved','2026-01-19 00:00:00'),(381,'00:00:46.470','2025-08-27',95,6,2,1,3,7,54,41,NULL,'/evidences/46_47.jpg',NULL,'approved','2026-01-19 00:00:00'),(382,'00:00:46.900','2023-01-01',46,2,4,1,NULL,36,68,55,NULL,'/evidences/46_9.jpg',NULL,'approved','2026-01-19 00:00:00'),(383,'00:00:47.170','2025-08-08',15,5,4,1,3,81,68,55,NULL,'/evidences/47_17.jpg',NULL,'approved','2026-01-19 00:00:00'),(384,'00:00:47.470','2024-07-21',92,1,3,1,3,3,68,55,NULL,'/evidences/47_47.jpg',NULL,'approved','2026-01-19 00:00:00'),(385,'00:00:47.490','2025-07-25',101,2,4,1,7,56,68,55,'https://www.racebox.pro/webapp/session/683eca43313c4befcf0b0cd3','/evidences/47_49.jpg',NULL,'approved','2026-01-19 00:00:00'),(386,'00:00:47.500','2024-08-18',93,6,2,1,2,63,68,55,NULL,'/evidences/47_5.jpg','https://www.youtube.com/watch?v=GPy7wa6-2rc','approved','2026-01-19 00:00:00'),(387,'00:00:47.500','2025-07-20',50,1,3,1,3,10,54,41,NULL,'/evidences/47_5.jpg',NULL,'approved','2026-01-19 00:00:00'),(388,'00:00:47.510','2025-08-20',100,2,4,1,7,70,63,50,'https://www.racebox.pro/webapp/session/68a5ee848762225130e40d8d','/evidences/47_51.jpg',NULL,'approved','2026-01-19 00:00:00'),(389,'00:00:47.660','2025-08-14',52,6,2,1,3,10,49,36,'https://www.laptrophy.com/sessions/Pu3pH7','/evidences/47_66.jpg',NULL,'approved','2026-01-19 00:00:00'),(390,'00:00:47.800','2022-05-23',17,6,2,1,NULL,NULL,NULL,NULL,NULL,'/evidences/47_8.jpg','https://www.youtube.com/watch?v=etejhe2I4OQ','approved','2026-01-19 00:00:00'),(391,'00:00:46.840','2025-08-13',79,6,2,1,7,19,68,55,NULL,'/evidences/46_84.jpg',NULL,'approved','2026-01-19 00:00:00'),(392,'00:00:47.910','2025-08-20',75,2,4,1,7,72,63,50,NULL,'/evidences/47_91.jpg','https://www.youtube.com/watch?v=j-Dms7XyWuA','approved','2026-01-19 00:00:00'),(393,'00:00:47.890','2025-09-03',70,6,2,1,3,75,68,55,'https://www.laptrophy.com/sessions/2nsoNH','/evidences/47_89.jpg',NULL,'approved','2026-01-19 00:00:00'),(394,'00:00:47.950','2025-08-13',36,6,2,1,7,59,48,35,NULL,'/evidences/47_95.jpg',NULL,'approved','2026-01-19 00:00:00'),(395,'00:00:48.040','2024-09-22',89,6,2,1,3,78,68,55,NULL,'/evidences/48_04.jpg',NULL,'approved','2026-01-19 00:00:00'),(396,'00:00:47.970','2025-08-27',63,6,2,1,3,38,68,55,NULL,'/evidences/47_97.jpg',NULL,'approved','2026-01-19 00:00:00'),(397,'00:00:48.300','2019-07-01',53,NULL,1,1,NULL,42,NULL,NULL,NULL,'/evidences/48_3.jpg','https://www.youtube.com/watch?v=R6DwZpXyc0c','approved','2026-01-19 00:00:00'),(398,'00:00:48.490','2025-08-08',60,2,4,1,3,67,67,54,'https://www.racebox.pro/webapp/session/68962592365a59e829aee2e1','/evidences/48_49.jpg',NULL,'approved','2026-01-19 00:00:00'),(399,'00:00:48.550','2020-05-31',51,6,2,1,NULL,42,46,69,NULL,'/evidences/48_55.jpg','https://www.youtube.com/watch?v=mtZYhxPiyCU','approved','2026-01-19 00:00:00'),(400,'00:00:48.010','2025-08-14',94,6,2,1,3,43,NULL,NULL,NULL,'/evidences/48_01.jpg',NULL,'approved','2026-01-19 00:00:00'),(401,'00:00:48.770','2024-08-09',69,6,2,1,NULL,15,67,54,'https://www.laptrophy.com/sessions/pBpXcM','/evidences/48_77.jpg','https://www.youtube.com/watch?v=JJBhTNXK2pM','approved','2026-01-19 00:00:00'),(402,'00:00:48.850','2025-08-09',62,6,2,1,6,34,48,35,NULL,'/evidences/48_85.jpg',NULL,'approved','2026-01-19 00:00:00'),(403,'00:00:49.000','2020-09-18',25,NULL,1,1,7,28,NULL,NULL,NULL,'/evidences/49.jpg','https://www.youtube.com/watch?v=YyVmTd5NrWU','approved','2026-01-19 00:00:00'),(404,'00:00:49.080','2024-08-18',55,6,2,1,2,56,39,26,NULL,'/evidences/49_08.jpg',NULL,'approved','2026-01-19 00:00:00'),(405,'00:00:49.370','2024-09-08',12,6,2,1,6,NULL,NULL,NULL,NULL,'/evidences/49_37.jpg',NULL,'approved','2026-01-19 00:00:00'),(406,'00:00:49.430','2024-09-08',34,6,2,1,6,83,39,26,NULL,'/evidences/49_43.jpg',NULL,'approved','2026-01-19 00:00:00'),(407,'00:00:49.650','2025-08-14',27,6,2,1,3,31,38,25,NULL,'/evidences/49_65.jpg',NULL,'approved','2026-01-19 00:00:00'),(408,'00:00:49.740','2024-06-29',56,6,2,1,7,59,5,5,NULL,'/evidences/49_74.jpg',NULL,'approved','2026-01-19 00:00:00'),(409,'00:00:49.980','2024-08-09',9,6,2,1,NULL,65,65,52,NULL,'/evidences/49_98.jpg',NULL,'approved','2026-01-19 00:00:00'),(410,'00:00:49.980','2025-07-06',103,6,2,1,3,61,68,55,NULL,'/evidences/49_98.jpg',NULL,'approved','2026-01-19 00:00:00'),(411,'00:00:50.000','2022-04-24',88,NULL,1,1,2,NULL,NULL,NULL,NULL,'/evidences/50.jpg','https://www.youtube.com/watch?v=zlr0jZPrAj0','approved','2026-01-19 00:00:00'),(412,'00:00:50.000','2023-06-05',86,NULL,1,1,7,18,65,52,NULL,'/evidences/50.jpg',NULL,'approved','2026-01-19 00:00:00'),(413,'00:00:50.100','2025-08-08',49,6,2,1,3,50,9,9,NULL,'/evidences/50_1.jpg',NULL,'approved','2026-01-19 00:00:00'),(414,'00:00:50.110','2020-08-18',30,NULL,1,1,NULL,59,NULL,NULL,NULL,'/evidences/50_11.jpg','https://www.youtube.com/watch?v=jpMLFT5rWFQ','approved','2026-01-19 00:00:00'),(415,'00:00:50.400','2020-08-24',104,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/50_4.jpg','https://www.youtube.com/watch?v=8Cy3ZOiHk_k','approved','2026-01-19 00:00:00'),(416,'00:00:50.500','2024-06-29',23,6,2,1,3,49,68,55,NULL,'/evidences/50_5.jpg',NULL,'approved','2026-01-19 00:00:00'),(417,'00:00:50.830','2024-09-08',22,6,2,1,6,39,NULL,NULL,NULL,'/evidences/50_83.jpg',NULL,'approved','2026-01-19 00:00:00'),(418,'00:00:50.990','2024-09-19',2,6,2,1,7,56,40,27,NULL,'/evidences/50_99.jpg',NULL,'approved','2026-01-19 00:00:00'),(419,'00:00:51.000','2023-08-30',90,NULL,1,1,2,35,NULL,NULL,NULL,'/evidences/51.jpg','https://www.youtube.com/watch?v=sqgmlAghHsg','approved','2026-01-19 00:00:00'),(420,'00:00:51.000','2023-09-07',96,NULL,1,1,NULL,6,NULL,NULL,NULL,'/evidences/51.jpg',NULL,'approved','2026-01-19 00:00:00'),(421,'00:00:51.290','2025-08-27',40,6,2,1,3,40,65,NULL,'https://www.laptrophy.com/sessions/sWe3OI','/evidences/51_29.jpg',NULL,'approved','2026-01-19 00:00:00'),(422,'00:00:51.350','2024-07-03',58,6,2,1,3,74,10,10,NULL,'/evidences/51_35.jpg',NULL,'approved','2026-01-19 00:00:00'),(423,'00:00:51.370','2024-06-05',56,6,2,1,3,49,5,NULL,NULL,'/evidences/51_37.jpg',NULL,'approved','2026-01-19 00:00:00'),(424,'00:00:50.410','2025-09-07',32,2,4,1,6,44,2,2,NULL,'/evidences/50_41.jpg',NULL,'approved','2026-01-19 00:00:00'),(425,'00:00:51.640','2024-09-22',43,6,2,1,3,73,68,55,'https://www.laptrophy.com/sessions/QeHqzu','/evidences/51_64.jpg',NULL,'approved','2026-01-19 00:00:00'),(426,'00:00:51.680','2025-08-08',73,6,2,1,3,76,67,54,NULL,'/evidences/51_68.jpg',NULL,'approved','2026-01-19 00:00:00'),(427,'00:00:51.990','2024-07-05',77,6,1,1,2,83,67,54,NULL,'/evidences/51_99.jpg',NULL,'approved','2026-01-19 00:00:00'),(428,'00:00:52.010','2022-08-28',90,6,1,1,2,35,NULL,NULL,NULL,'/evidences/52_01.jpg',NULL,'approved','2026-01-19 00:00:00'),(429,'00:00:52.020','2024-07-03',71,1,3,1,3,48,52,39,NULL,'/evidences/52_02.jpg',NULL,'approved','2026-01-19 00:00:00'),(430,'00:00:52.240','2024-08-17',48,6,2,1,3,25,51,38,NULL,'/evidences/52_24.jpg',NULL,'approved','2026-01-19 00:00:00'),(431,'00:00:52.560','2024-08-17',11,NULL,1,1,3,12,41,28,NULL,'/evidences/52_56.jpg',NULL,'approved','2026-01-19 00:00:00'),(432,'00:00:52.590','2025-08-17',57,1,3,1,7,14,67,71,NULL,'/evidences/52_59.jpg',NULL,'approved','2026-01-19 00:00:00'),(433,'00:00:52.690','2024-07-31',5,6,2,1,7,4,68,55,NULL,'/evidences/52_69.jpg',NULL,'approved','2026-01-19 00:00:00'),(434,'00:00:53.000','2024-07-02',21,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/53.jpg','https://www.youtube.com/watch?v=MBhLJZ8ToA0','approved','2026-01-19 00:00:00'),(435,'00:00:53.000','2024-08-01',45,NULL,1,1,4,77,68,55,NULL,'/evidences/53.jpg','https://www.youtube.com/watch?v=3EqleyD0mDU','approved','2026-01-19 00:00:00'),(436,'00:00:53.460','2024-07-21',8,6,2,1,3,75,45,32,NULL,'/evidences/53_46.jpg',NULL,'approved','2026-01-19 00:00:00'),(437,'00:00:50.740','2025-08-08',4,6,2,1,3,47,37,24,NULL,'/evidences/50_74.jpg',NULL,'approved','2026-01-19 00:00:00'),(438,'00:00:53.640','2024-07-19',10,6,2,1,NULL,69,45,32,NULL,'/evidences/53_64.jpg',NULL,'approved','2026-01-19 00:00:00'),(439,'00:00:54.920','2024-06-29',26,6,2,1,3,NULL,49,36,NULL,'/evidences/54_92.jpg',NULL,'approved','2026-01-19 00:00:00'),(440,'00:00:55.990','2024-08-16',87,6,1,1,2,16,47,34,NULL,'/evidences/55_99.jpg',NULL,'approved','2026-01-19 00:00:00'),(441,'00:00:56.960','2024-08-24',33,6,1,1,6,46,NULL,NULL,NULL,'/evidences/56_96.jpg',NULL,'approved','2026-01-19 00:00:00'),(442,'00:00:58.000','2024-05-26',13,NULL,1,1,3,15,NULL,NULL,NULL,'/evidences/58.jpg','https://www.youtube.com/watch?v=NYLzNRK0rsI','approved','2026-01-19 00:00:00'),(443,'00:00:58.440','2024-07-07',29,6,2,1,NULL,30,NULL,NULL,NULL,'/evidences/58_44.jpg',NULL,'approved','2026-01-19 00:00:00'),(444,'00:00:59.000','2020-06-28',19,NULL,1,1,NULL,43,NULL,NULL,NULL,'/evidences/59.jpg','https://www.youtube.com/watch?v=GgL4nH-ebqA','approved','2026-01-19 00:00:00'),(445,'00:00:59.120','2024-07-21',61,6,2,1,3,80,42,29,'https://www.laptrophy.com/sessions/cQldYE','/evidences/59_12.jpg',NULL,'approved','2026-01-19 00:00:00'),(446,'00:01:00.000','2021-06-27',99,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'/evidences/60.jpg','https://www.youtube.com/watch?v=7eRKsR6d5A4','approved','2026-01-19 00:00:00'),(447,'00:01:00.000','2017-08-09',68,NULL,1,1,NULL,51,NULL,NULL,NULL,'/evidences/60.jpg','https://www.youtube.com/watch?v=MURaILW-jbI','approved','2026-01-19 00:00:00'),(452,'00:01:45.125','2026-01-08',14,6,2,2,8,10,6,66,NULL,'/evidences/evidence-1768822688977-48484734.jpeg',NULL,'approved','2026-01-19 00:00:00'),(454,'00:01:05.123','2026-01-09',16,2,2,1,3,8,NULL,NULL,NULL,'/evidences/evidence-1769527402557-762359698.png',NULL,'approved','2026-01-27 00:00:00'),(458,'00:01:34.000','2026-01-16',15,9,2,1,3,12,NULL,NULL,NULL,'/evidences/evidence-1769528386808-411048532.png',NULL,'approved','2026-01-27 00:00:00'),(462,'00:01:54.132','2025-11-06',92,6,2,1,4,47,NULL,NULL,NULL,'/evidences/evidence-1769714169194-431183776.jpg',NULL,'approved','2026-01-29 00:00:00'),(464,'00:01:43.000','2026-01-08',55,8,2,1,4,12,65,66,NULL,'/evidences/evidence-1769950199614-418870277.jpg',NULL,'approved','2026-02-01 00:00:00'),(465,'00:01:06.241','2025-08-14',69,5,2,1,6,15,67,54,NULL,'/evidences/evidence-1769950601240-69307797.png',NULL,'approved','2026-02-01 00:00:00'),(470,'00:00:01.300','2026-01-31',3,1,2,1,2,15,NULL,NULL,NULL,'/evidences/evidence-1770235051653-792392627.png',NULL,'approved','2026-02-04 00:00:00'),(471,'00:00:01.300','2026-01-29',3,1,2,1,2,94,NULL,NULL,NULL,'/evidences/evidence-1770235433184-740316865.png',NULL,'approved','2026-02-04 00:00:00'),(472,'00:01:52.142','2026-02-14',10,6,2,2,8,95,NULL,NULL,NULL,'/evidences/evidence-1771443315266-86378408.png',NULL,'approved','2026-02-18 00:00:00'),(476,'00:01:05.120','2026-02-12',15,11,2,2,8,NULL,NULL,NULL,NULL,'/evidences/evidence-1771874347112-180675873.png',NULL,'pending','2026-02-23 00:00:00'),(477,'00:00:01.100','2026-02-21',17,11,2,2,8,7,NULL,NULL,NULL,'/evidences/evidence-1771874746726-473269909.png',NULL,'pending','2026-02-23 00:00:00'),(478,'00:01:01.100','2026-02-21',12,10,2,1,5,NULL,NULL,NULL,NULL,'/evidences/evidence-1771874895294-293833754.png',NULL,'pending','2026-02-23 00:00:00'),(479,'00:00:23.000','2026-02-12',19,9,2,1,2,16,NULL,NULL,NULL,'/evidences/evidence-1771875015475-403969347.png',NULL,'pending','2026-02-23 00:00:00'),(480,'00:01:02.300','2026-02-17',18,9,2,1,2,16,NULL,NULL,NULL,'/evidences/evidence-1771875383383-608082477.png',NULL,'pending','2026-02-23 00:00:00'),(481,'00:00:01.500','2026-02-13',13,9,2,1,3,12,NULL,NULL,NULL,'/evidences/evidence-1771875975619-972353803.png',NULL,'pending','2026-02-23 00:00:00'),(483,'00:00:01.000','2026-02-08',18,9,2,1,3,NULL,89,66,NULL,'/evidences/evidence-1771876968833-863817808.png',NULL,'pending','2026-02-23 00:00:00'),(484,'00:01:01.100','2026-02-12',14,9,2,1,3,NULL,76,79,NULL,'/evidences/evidence-1772046580965-230845676.png',NULL,'pending','2026-02-25 00:00:00'),(485,'00:01:01.111','2026-02-03',19,10,2,2,8,100,90,NULL,NULL,'/evidences/evidence-1772047928070-874525188.png',NULL,'pending','2026-02-25 00:00:00'),(486,'00:01:01.111','2026-02-10',4,10,2,2,8,101,91,80,NULL,'/evidences/evidence-1772049431302-31104867.png',NULL,'approved','2026-02-25 00:00:00');
/*!40000 ALTER TABLE `laps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laps_validity`
--

DROP TABLE IF EXISTS `laps_validity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laps_validity` (
  `validity_id` int NOT NULL AUTO_INCREMENT,
  `validity` varchar(45) NOT NULL,
  PRIMARY KEY (`validity_id`),
  UNIQUE KEY `validity_id_UNIQUE` (`validity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laps_validity`
--

LOCK TABLES `laps_validity` WRITE;
/*!40000 ALTER TABLE `laps_validity` DISABLE KEYS */;
INSERT INTO `laps_validity` VALUES (1,'low'),(2,'medium'),(3,'high'),(4,'very_high');
/*!40000 ALTER TABLE `laps_validity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `leaderboard_all_track_laps_unique`
--

DROP TABLE IF EXISTS `leaderboard_all_track_laps_unique`;
/*!50001 DROP VIEW IF EXISTS `leaderboard_all_track_laps_unique`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leaderboard_all_track_laps_unique` AS SELECT 
 1 AS `lap_time`,
 1 AS `status`,
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
-- Table structure for table `motorcycles`
--

DROP TABLE IF EXISTS `motorcycles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motorcycles` (
  `motorcycle_id` int NOT NULL AUTO_INCREMENT,
  `motorcycle` varchar(256) NOT NULL,
  `year` int DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `online_description` varchar(1024) DEFAULT NULL,
  `preview_path` varchar(512) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `token_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`motorcycle_id`),
  UNIQUE KEY `id_UNIQUE` (`motorcycle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorcycles`
--

LOCK TABLES `motorcycles` WRITE;
/*!40000 ALTER TABLE `motorcycles` DISABLE KEYS */;
INSERT INTO `motorcycles` VALUES (1,'Yamaha Thunderace',1996,'Sport',NULL,NULL,1,NULL),(2,'BMW 1000RR HP4',2014,'Sport',NULL,NULL,1,NULL),(3,'BMW 1000RR',2024,'Sport',NULL,NULL,1,NULL),(4,'BMW S1000R',NULL,'Naked',NULL,NULL,1,NULL),(5,'Ducati 899 Panigale',NULL,'Sport',NULL,NULL,1,NULL),(6,'Ducati Monster 1200R',NULL,'Naked',NULL,NULL,1,NULL),(7,'Ducati Monster 937 SP',NULL,'Naked',NULL,NULL,1,NULL),(8,'Ducati Panigale V4R',NULL,'Sport',NULL,NULL,1,NULL),(9,'Ducati Panigale V4S',NULL,'Sport',NULL,NULL,1,NULL),(10,'Ducati Streetfighter V4S',NULL,'Naked',NULL,NULL,1,NULL),(11,'Ducati Streetfighter V4S',NULL,'Naked',NULL,NULL,1,NULL),(12,'Honda CB 600F Hornet',NULL,'Naked',NULL,NULL,1,NULL),(13,'Honda CB 600F Hornet',2003,'Naked',NULL,NULL,1,NULL),(14,'Honda CB1000R',2009,'Naked',NULL,NULL,1,NULL),(15,'Honda CB650R',2019,'Naked',NULL,NULL,1,NULL),(16,'Honda CBR 1100XX Blackbird',NULL,'Sport',NULL,NULL,1,NULL),(17,'Honda CBR 600RR',2007,'Sport',NULL,NULL,1,NULL),(18,'Honda CBR 954RR Fireblade',NULL,'Sport',NULL,NULL,1,NULL),(19,'Honda CBR1000RR',NULL,'Sport',NULL,NULL,1,NULL),(20,'Honda CBR1000RR',2005,'Sport',NULL,NULL,1,NULL),(21,'Honda CBR1000RR-R SP',NULL,'Sport',NULL,NULL,1,NULL),(22,'Honda CBR250R',2016,'Sport',NULL,NULL,1,NULL),(23,'Honda CBR600RR',NULL,'Sport',NULL,NULL,1,NULL),(24,'Honda CBR600RR',2025,'Sport',NULL,NULL,1,NULL),(25,'Honda CBR650R',NULL,'Sport',NULL,NULL,1,NULL),(26,'Honda CRF 450 R',NULL,'SuperMoto',NULL,NULL,1,NULL),(27,'Honda Fireblade CBR1000RR',2007,'Sport',NULL,NULL,1,NULL),(28,'Honda Hornet 600',NULL,'Naked',NULL,NULL,1,NULL),(29,'Husqvarna FS 450',NULL,'SuperMoto',NULL,NULL,1,NULL),(30,'KTM Duke 390',NULL,'Naked',NULL,NULL,1,NULL),(31,'KTM Duke 690',NULL,'Naked',NULL,NULL,1,NULL),(32,'KTM Duke 790',NULL,'Naked',NULL,NULL,1,NULL),(33,'KTM SD 990',NULL,'Naked',NULL,NULL,1,NULL),(34,'KTM SuperDuke 1290 GT',NULL,'Touring',NULL,NULL,1,NULL),(35,'Kawasaki Ninja 250R',NULL,'Sport',NULL,NULL,1,NULL),(36,'Kawasaki Ninja 300',NULL,'Sport',NULL,NULL,1,NULL),(37,'Kawasaki Ninja 400',NULL,'Sport',NULL,NULL,1,NULL),(38,'Kawasaki Z750',NULL,'Naked',NULL,NULL,1,NULL),(39,'Kawasaki ZX-10R Ninja',2006,'Sport',NULL,NULL,1,NULL),(40,'Kawasaki ZX-6R',NULL,'Sport',NULL,NULL,1,NULL),(41,'Kawasaki ZX-6R',2008,'Sport',NULL,NULL,1,NULL),(42,'MRF 130 SM',NULL,'PitBike',NULL,NULL,1,NULL),(43,'MRF 140 SM',NULL,'PitBike',NULL,NULL,1,NULL),(44,'MRF 160-R SM',NULL,'PitBike',NULL,NULL,1,NULL),(45,'Aprilia Tuono v4 1100',NULL,'Naked',NULL,NULL,1,NULL),(46,'Yamaha XJ600 Diversion',NULL,'Naked',NULL,NULL,1,NULL),(47,'Yamaha Tracer 9 Sport Touring',NULL,'Touring',NULL,NULL,1,NULL),(48,'Suzuki DR-Z4SM',NULL,'SuperMoto',NULL,NULL,1,NULL),(49,'Suzuki GSR 750',NULL,'Naked',NULL,NULL,1,NULL),(50,'Suzuki GSX-8R',NULL,'Sport',NULL,NULL,1,NULL),(51,'Suzuki GSX-R 1000',NULL,'Sport',NULL,NULL,1,NULL),(52,'Suzuki GSX-R 600 K1',2001,'Sport',NULL,NULL,1,NULL),(53,'Suzuki GSX-R 600 K4',NULL,'Sport',NULL,NULL,1,NULL),(54,'Suzuki GSX-R 600 K6',2006,'Sport',NULL,NULL,1,NULL),(55,'Suzuki GSX-R 600 K9',2009,'Sport',NULL,NULL,1,NULL),(56,'Suzuki GSX-R 600',NULL,'Sport',NULL,NULL,1,NULL),(57,'Suzuki GSX-R 750 K6',2006,'Sport',NULL,NULL,1,NULL),(58,'Suzuki GSX-R 750 K7',2007,'Sport',NULL,NULL,1,NULL),(59,'Suzuki GSX-R 750',NULL,'Sport',NULL,NULL,1,NULL),(60,'Suzuki GSX-R 750',NULL,'Sport',NULL,NULL,1,NULL),(61,'Suzuki GSX-S 1000',NULL,'Naked',NULL,NULL,1,NULL),(62,'Suzuki SV 650',NULL,'Naked',NULL,NULL,1,NULL),(63,'Triumph Street Triple 1050',NULL,'Naked',NULL,NULL,1,NULL),(64,'Triumph Street Triple 1200 RS',NULL,'Naked',NULL,NULL,1,NULL),(65,'Triumph Street Triple 675',NULL,'Naked',NULL,NULL,1,NULL),(66,'Triumph Street Triple 765 R',NULL,'Naked',NULL,NULL,1,NULL),(67,'Triumph Street Triple 765 RS',NULL,'Naked',NULL,NULL,1,NULL),(68,'Triumph Street Triple 765 RS',NULL,'Sport',NULL,NULL,1,NULL),(69,'Triumph Trident 660',NULL,'Naked',NULL,NULL,1,NULL),(70,'YCF 150 SM',NULL,'PitBike',NULL,NULL,1,NULL),(71,'YCF 190 SM',NULL,'PitBike',NULL,NULL,1,NULL),(72,'YCF K150 SM',NULL,'PitBike',NULL,NULL,1,NULL),(73,'Yamaha FZ1',NULL,'Naked',NULL,NULL,1,NULL),(74,'Yamaha FZ1-N',NULL,'Naked',NULL,NULL,1,NULL),(75,'Yamaha MT07',NULL,'Naked',NULL,NULL,1,NULL),(76,'Yamaha MT09',2024,'Naked',NULL,NULL,1,NULL),(77,'Yamaha MT10',NULL,'Naked',NULL,NULL,1,NULL),(78,'Yamaha R1',NULL,'Sport',NULL,NULL,1,NULL),(79,'Yamaha R1',2016,'Sport',NULL,NULL,1,NULL),(80,'Yamaha R125',2020,'Sport',NULL,NULL,1,NULL),(81,'Yamaha R3',NULL,'Sport',NULL,NULL,1,NULL),(82,'Yamaha R6',2005,'Sport',NULL,NULL,1,NULL),(83,'Yamaha R6',NULL,'Sport',NULL,NULL,1,NULL),(84,'Yamaha R6',2003,'Sport',NULL,NULL,1,NULL),(94,'Ale jazda',2004,'Naked',NULL,NULL,0,NULL),(95,'mojaj hąąąądzinka',1997,'Naked',NULL,NULL,1,NULL),(97,'asdasdasd',1999,'Enduro',NULL,NULL,0,'8472e88c24398c82f370d8be3cf28b4dca70a55b4653434d4f704a92f58bc2b7'),(99,'Kwękała',1995,'Enduro',NULL,NULL,1,NULL),(100,'adasds',2000,'Supermoto',NULL,NULL,1,NULL),(101,'Moj cimciuś',2001,'Turystyczny',NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `motorcycles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `motorcycles_all`
--

DROP TABLE IF EXISTS `motorcycles_all`;
/*!50001 DROP VIEW IF EXISTS `motorcycles_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `motorcycles_all` AS SELECT 
 1 AS `motorcycle_name`,
 1 AS `year`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `organizers`
--

DROP TABLE IF EXISTS `organizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizers` (
  `organizer_id` int NOT NULL AUTO_INCREMENT,
  `organizer_name` varchar(256) NOT NULL,
  `logo_path` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`organizer_id`),
  UNIQUE KEY `id_UNIQUE` (`organizer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizers`
--

LOCK TABLES `organizers` WRITE;
/*!40000 ALTER TABLE `organizers` DISABLE KEYS */;
INSERT INTO `organizers` VALUES (1,'TrackAttack',NULL),(2,'3MMRacing',NULL),(3,'MotoEkipa',NULL),(4,'MotoZone',NULL),(5,'Na Kolanie',NULL),(6,'Robson TD',NULL),(7,'TrackSpace',NULL),(8,'SpeedDay',NULL);
/*!40000 ALTER TABLE `organizers` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Temporary view structure for view `rider_laptimes_all`
--

DROP TABLE IF EXISTS `rider_laptimes_all`;
/*!50001 DROP VIEW IF EXISTS `rider_laptimes_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rider_laptimes_all` AS SELECT 
 1 AS `lap_time`,
 1 AS `status`,
 1 AS `rider_name`,
 1 AS `motorcycle`,
 1 AS `lap_date`,
 1 AS `track_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `riders`
--

DROP TABLE IF EXISTS `riders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riders` (
  `rider_id` int NOT NULL AUTO_INCREMENT,
  `rider_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `group_id` int DEFAULT NULL,
  `sex_id` int NOT NULL,
  `rider_level` int NOT NULL,
  `social_instagram` varchar(200) DEFAULT NULL,
  `social_facebook` varchar(200) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table with rider info and socials - no credentials';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riders`
--

LOCK TABLES `riders` WRITE;
/*!40000 ALTER TABLE `riders` DISABLE KEYS */;
INSERT INTO `riders` VALUES (1,'Adam Jaszczak',NULL,2,6,'https://instagram.com/848.braaaap',NULL),(2,'Adam Szuba',NULL,2,3,NULL,'https://facebook.com/profile.php?id=61551900655271'),(3,'Adam',1,2,4,'https://instagram.com/adas_r1',NULL),(4,'Adrian (Trzonek)',NULL,2,2,NULL,'https://facebook.com/trzonek'),(5,'Angy_S1000R GDA',NULL,1,2,'https://instagram.com/angy_s1000rr',NULL),(6,'Arek Mierzejewski',NULL,2,4,NULL,'https://facebook.com/arek.mierzejewski.77'),(7,'Arek',NULL,2,4,NULL,'https://facebook.com/fejkowy.fejk.50'),(8,'BabyMonster MT-07 GD',NULL,1,2,'https://instagram.com/baby.monstermt07',NULL),(9,'BarKop',NULL,2,3,NULL,'https://facebook.com/bartek.kopczynski.3'),(10,'Bartek Trident Gdansk',NULL,2,2,NULL,NULL),(11,'Bartosz Butajło',NULL,2,2,NULL,'https://facebook.com/profile.php?id=100071721794049'),(12,'Bartoszbeny_',NULL,2,3,'https://instagram.com/bartoszbeny_',NULL),(13,'BugiiCb650r3city',NULL,2,2,NULL,NULL),(14,'Cnk',NULL,2,5,'https://instagram.com/cnk.moto',NULL),(15,'Daniel Raczyło',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100029542363311'),(16,'Daniele',1,2,4,'https://instagram.com/dparodi72',NULL),(17,'Dawid Roda',NULL,2,3,NULL,NULL),(18,'Dawid Ustarbowski',NULL,2,6,NULL,'https://facebook.com/dawid.ustarbowski'),(19,'DenyMotoVlog',NULL,2,2,NULL,NULL),(20,'Desmomati',1,2,4,'https://instagram.com/desmomati',NULL),(21,'Dezyderiusz Łaszkiewicz',NULL,2,2,NULL,NULL),(22,'Emil_Uciekinier',NULL,2,3,'https://instagram.com/emilh2r',NULL),(23,'Fluffy GSX-R750 Rotmanka',NULL,2,3,'https://instagram.com/marco.fluffy',NULL),(24,'Imax_s3',NULL,2,4,'https://instagram.com/imax_s3',NULL),(25,'Inmatefrompl',NULL,2,3,NULL,NULL),(26,'Jacek|SV650N|3city Bojano',NULL,2,2,NULL,NULL),(27,'Jakub Chwastek',NULL,2,3,NULL,NULL),(28,'Jan Dumara',NULL,2,6,'https://instagram.com/janekdumara',NULL),(29,'Javor Duke 390',NULL,2,2,NULL,'https://facebook.com/Javor95'),(30,'Kacper Malecki',NULL,2,3,NULL,NULL),(31,'Kamil_Mal',NULL,2,3,'https://instagram.com/maliniak_765rs',NULL),(32,'Karol Brzoskowski',NULL,2,4,NULL,'https://facebook.com/stefan.kowalski.927980'),(33,'Kinga xj600s 3miasto',NULL,1,2,'https://instagram.com/kina.urb',NULL),(34,'Konrad Bocian',NULL,2,3,'https://instagram.com/thunder_stork',NULL),(35,'Krzysztof Komornicki',NULL,2,5,'https://instagram.com/komornicki_888',NULL),(36,'Ladydriver_GSX-R',NULL,1,3,'https://instagram.com/ladydriver_GSX-R',NULL),(37,'Lejdi_kuki',1,1,4,'https://instagram.com/lejdi.kuki',NULL),(38,'Lemur [SD990]Gdynia',NULL,2,4,NULL,'https://facebook.com/mateusz.parchem'),(39,'Leszek Marek Grzybek',NULL,2,4,'https://instagram.com/szybkii93',NULL),(40,'Leszke Heszke',NULL,2,3,'https://instagram.com/lesgotob',NULL),(41,'Lukasz Knapik',NULL,2,5,NULL,'https://facebook.com/loki.balboa.3'),(42,'Lukasz Wieczorek',NULL,2,4,NULL,'https://facebook.com/hondaplaza'),(43,'Lukasz_FZ1_Gdansk',NULL,2,3,NULL,'https://facebook.com/putek.putynkowski'),(44,'MATRII',NULL,2,4,NULL,NULL),(45,'Maciej Badtke',1,2,2,'https://instagram.com/maciejbadtke',NULL),(46,'Maciej Furious',NULL,2,3,NULL,NULL),(47,'Maciej Markowski',NULL,2,4,NULL,'https://facebook.com/profile.php?id=100078002145158'),(48,'Maciek Jagiełło',NULL,2,2,'https://instagram.com/maciekzim',NULL),(49,'Michał Dembowski (Majkel)',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100001361930125'),(50,'Marcin - olo.scr',NULL,2,3,'https://instagram.com/olo.scr',NULL),(51,'Marcin Sleziak',NULL,2,3,NULL,NULL),(52,'Marek Boczula',NULL,2,3,'https://instagram.com/marek.boczula',NULL),(53,'Marek Janikowski',NULL,2,3,NULL,NULL),(54,'Marek Marcinski',NULL,2,3,NULL,'https://facebook.com/marek.marcinski1'),(55,'Marek Marco Orłowski',NULL,2,3,NULL,'https://facebook.com/profile.php?id=100001135339340'),(56,'Mateusz GSR750 GD',NULL,2,3,NULL,NULL),(57,'Mateusz Grzyb',NULL,2,2,NULL,'https://facebook.com/mateusz.grzyb.31'),(58,'Mateusz Kaczmi Kaczmarek',NULL,2,3,'https://instagram.com/suchykaczmii',NULL),(59,'Mateusz Karpiński',NULL,2,4,'https://instagram.com/motogyver',NULL),(60,'Mateusz Muchlado',NULL,2,3,NULL,'https://facebook.com/mateusz.muchlado.5'),(61,'Mateusz Nowak',NULL,2,2,NULL,'https://facebook.com/profile.php?id=100009837462310'),(62,'Mateusz Wrona',NULL,2,3,'https://instagram.com/maxiorsky',NULL),(63,'Michał Starosz / Dziadek Z 750 Gdańsk',NULL,2,3,NULL,'https://facebook.com/michal.starosz'),(64,'Michał Rainbow',NULL,2,5,'https://instagram.com/rainbowmichal',NULL),(65,'Michał „Machu” Mach',NULL,2,4,'https://instagram.com/mikemachu',NULL),(66,'Milosz Kurkul',NULL,2,5,NULL,NULL),(67,'Mirek Mordecki',NULL,2,5,'https://instagram.com/mirekmordecki',NULL),(68,'Miroslaw Kondracki',NULL,2,2,NULL,NULL),(69,'OCZKO',1,2,3,NULL,'https://facebook.com/G0OCZKO'),(70,'Pati [MT07] Rumia',NULL,1,3,'https://instagram.com/moto_angry_girl',NULL),(71,'Paweł (Sid) Dr-z 400 SM',NULL,2,2,'https://instagram.com/sidartistics',NULL),(72,'Paweł FZ125 GD',NULL,2,3,'https://instagram.com/elodylu',NULL),(73,'Piotr Falcon',NULL,2,3,'https://instagram.com/piotrfalcon',NULL),(74,'Piotr Stachlewski',NULL,2,5,NULL,'https://facebook.com/profile.php?id=100091883270238'),(75,'Piotr Woronowicz',NULL,2,3,'https://instagram.com/woronowicz.p',NULL),(76,'Piotr Zuchniarz',NULL,2,6,NULL,'https://facebook.com/profile.php?id=100009970063162'),(77,'Piotr',1,2,2,NULL,'https://facebook.com/piotr.cieslik.161'),(78,'PiotrSy',NULL,2,4,NULL,'https://facebook.com/piotrsyy'),(79,'PiratJerry(954 Fireblade)GA',NULL,2,3,'https://instagram.com/jerry.fireblade',NULL),(80,'Przemo84Pila',NULL,2,4,'https://instagram.com/przemo84pila',NULL),(81,'Przemysław Różyński',NULL,2,6,NULL,'https://facebook.com/przemzrr'),(82,'Radek Witkowski',NULL,2,4,NULL,'https://facebook.com/radek.witkowski.90'),(83,'Robak#66_Grzegorz Hanuszewicz',NULL,2,6,'https://instagram.com/robak66rr',NULL),(84,'Robert Robson',NULL,2,6,'https://instagram.com/robson1000rr',NULL),(85,'Tomek Rutecki (Rut)',NULL,2,4,NULL,'https://facebook.com/tomek.rutecki.7'),(86,'Seba',1,2,3,NULL,'https://facebook.com/sebastian.gajda.92775'),(87,'Slav_XX1100_Gdynia',NULL,2,2,NULL,'https://facebook.com/SlavSkyxx'),(88,'StasienK0',NULL,2,3,NULL,NULL),(89,'Szymon Schewe',NULL,2,3,NULL,'https://facebook.com/szymon.schewe'),(90,'Szymon_ndg',NULL,2,3,NULL,NULL),(91,'Sławomir Bławat',NULL,2,4,NULL,'https://facebook.com/profile.php?id=100001693468146'),(92,'Tina_Mloda_1000RR',1,1,3,'https://instagram.com/toskawka93',NULL),(93,'Tomasz Byczek',1,2,4,'https://instagram.com/byku_98',NULL),(94,'Tredzio',NULL,2,3,'https://instagram.com/tredziu_01',NULL),(95,'Trenergranat',NULL,2,3,'https://instagram.com/monster_sp_ducati',NULL),(96,'Typical Seba',NULL,2,3,NULL,NULL),(97,'Veloce_Sig',1,2,3,NULL,'https://facebook.com/tuurboos'),(98,'Wesy#84',NULL,2,5,NULL,NULL),(99,'WitekMoto',NULL,2,2,NULL,NULL),(100,'Wojtek #251',NULL,2,3,'https://instagram.com/nixtend_',NULL),(101,'Wojtek',1,2,3,'https://instagram.com/superbikebtc',NULL),(102,'Womer',1,2,4,'https://instagram.com/womer_1k',NULL),(103,'twojstarysolibudyn',NULL,2,3,'https://instagram.com/twojstarysolibudyn',NULL),(104,'Kanał \"Motocykle\"',NULL,2,3,NULL,NULL);
/*!40000 ALTER TABLE `riders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `riders_all`
--

DROP TABLE IF EXISTS `riders_all`;
/*!50001 DROP VIEW IF EXISTS `riders_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `riders_all` AS SELECT 
 1 AS `rider_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `riders_from_track`
--

DROP TABLE IF EXISTS `riders_from_track`;
/*!50001 DROP VIEW IF EXISTS `riders_from_track`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `riders_from_track` AS SELECT 
 1 AS `rider_name`,
 1 AS `track_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `riders_levels`
--

DROP TABLE IF EXISTS `riders_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riders_levels` (
  `level_id` int NOT NULL AUTO_INCREMENT,
  `rider_level` varchar(45) NOT NULL,
  PRIMARY KEY (`level_id`),
  UNIQUE KEY `id_UNIQUE` (`level_id`),
  UNIQUE KEY `level_UNIQUE` (`rider_level`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riders_levels`
--

LOCK TABLES `riders_levels` WRITE;
/*!40000 ALTER TABLE `riders_levels` DISABLE KEYS */;
INSERT INTO `riders_levels` VALUES (4,'advanced'),(2,'beginner'),(1,'freshman'),(3,'medium'),(6,'professional'),(5,'semipro');
/*!40000 ALTER TABLE `riders_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sex`
--

DROP TABLE IF EXISTS `sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sex` (
  `sex_id` int NOT NULL AUTO_INCREMENT,
  `sex_name` varchar(45) NOT NULL,
  PRIMARY KEY (`sex_id`),
  UNIQUE KEY `sex_UNIQUE` (`sex_name`),
  UNIQUE KEY `sex_id_UNIQUE` (`sex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sex`
--

LOCK TABLES `sex` WRITE;
/*!40000 ALTER TABLE `sex` DISABLE KEYS */;
INSERT INTO `sex` VALUES (1,'female'),(2,'male');
/*!40000 ALTER TABLE `sex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `submission_validation`
--

DROP TABLE IF EXISTS `submission_validation`;
/*!50001 DROP VIEW IF EXISTS `submission_validation`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `submission_validation` AS SELECT 
 1 AS `id`,
 1 AS `lap_id`,
 1 AS `contact`,
 1 AS `token_hash`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lap_id` int NOT NULL,
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `token_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiration_date` timestamp NOT NULL DEFAULT ((now() + interval 1 week)),
  PRIMARY KEY (`id`),
  KEY `submissions_laps_FK` (`lap_id`),
  KEY `submissions_expiration_date_IDX` (`expiration_date`) USING BTREE,
  CONSTRAINT `submissions_laps_FK` FOREIGN KEY (`lap_id`) REFERENCES `laps` (`lap_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (25,476,'','bb034e7bd86f2110e631de83c18b5b66cfdad36784eb609001ecab7adb9e3e94','2026-02-23 19:19:06','2026-03-02 19:19:06'),(26,477,'','be8e621595678a25bc766255999d8103ae947b4fe1890836f85d0fabfe37c752','2026-02-23 19:25:46','2026-03-02 19:25:46'),(27,478,'','0ffbd5e534a7085c37f4d62438ee2a312c6220452478407774ae99e6918917bb','2026-02-23 19:28:14','2026-03-02 19:28:14'),(28,479,'','85ef3e76feb546e8c43bc827766c96c903e6190e98ee2d648319b0b67f2e80f5','2026-02-23 19:30:14','2026-03-02 19:30:14'),(29,480,'','c51340a6b2c08281e38ecc0e5baf20bf0d3cb3ba713aa6599470476b5f10db77','2026-02-23 19:36:22','2026-03-02 19:36:22'),(30,481,'','7433f22bd4201a9d2f70c86e3ab8b4df92b64826ccc44302c3b46deec99f91ef','2026-02-23 19:46:15','2026-03-02 19:46:15'),(32,483,'','c4c1ca0975f1c903001253603dfd6a862fad67a79ae9e08d30afd808a0f92340','2026-02-23 20:02:48','2026-03-02 20:02:48'),(33,484,'adsdads@a','b7fc1c1a2c0dcb4462ba436a92ea035ca6ef63858fe3b42d484da1fd31fbdd97','2026-02-25 19:09:38','2026-03-04 19:09:38'),(34,485,'aa@a','14318d49771971316d116551883ad1120efc0c97aef2f95ed0c5c6278fdd5ab7','2026-02-25 19:32:05','2026-03-04 19:32:05');
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `track_organizers`
--

DROP TABLE IF EXISTS `track_organizers`;
/*!50001 DROP VIEW IF EXISTS `track_organizers`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `track_organizers` AS SELECT 
 1 AS `organizer_name`,
 1 AS `track_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `track_types`
--

DROP TABLE IF EXISTS `track_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `track_types` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track_types`
--

LOCK TABLES `track_types` WRITE;
/*!40000 ALTER TABLE `track_types` DISABLE KEYS */;
INSERT INTO `track_types` VALUES (1,'full size'),(3,'indoor'),(2,'small');
/*!40000 ALTER TABLE `track_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `track_name` varchar(256) DEFAULT NULL,
  `city` varchar(54) NOT NULL,
  `country` varchar(54) NOT NULL,
  `type_id` int NOT NULL,
  `length_m` varchar(45) NOT NULL,
  PRIMARY KEY (`track_id`),
  UNIQUE KEY `id_UNIQUE` (`track_id`),
  UNIQUE KEY `name_UNIQUE` (`track_name`),
  KEY `fk.track_typs.id_idx` (`type_id`),
  CONSTRAINT `fk.track_typs.id` FOREIGN KEY (`type_id`) REFERENCES `track_types` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,'ODTJ Autodrom Pomorze \"Pszczółki\"','Pszczółki','Poland',2,'1047'),(2,'Tor Poznań','Poznań','Poland',1,'4085');
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tyres_front`
--

DROP TABLE IF EXISTS `tyres_front`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tyres_front` (
  `tf_id` int NOT NULL AUTO_INCREMENT,
  `tyre_front` varchar(256) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `token_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tf_id`),
  UNIQUE KEY `id_UNIQUE` (`tf_id`),
  UNIQUE KEY `tyre_front_UNIQUE` (`tyre_front`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tyres_front`
--

LOCK TABLES `tyres_front` WRITE;
/*!40000 ALTER TABLE `tyres_front` DISABLE KEYS */;
INSERT INTO `tyres_front` VALUES (2,'Pirelli Diablo Rosso Scooter',1,NULL),(4,'Dunlop Sportmax D 213 GP PRO',1,NULL),(5,'Dunlop Sportmax GPR-300',1,NULL),(6,'Dunlop KR 108',1,NULL),(7,'Dunlop KR 109',1,NULL),(9,'Dunlop Sportmax Roadsport 2',1,NULL),(10,'Dunlop SportSmart 3',1,NULL),(11,'Dunlop SportSmart TT',1,NULL),(13,'Metzeler Racetec RR K3',1,NULL),(14,'Bridgestone Battlax Racing V02 Medium',1,NULL),(15,'Bridgestone Battlax BT023 R',1,NULL),(29,'Continental ContiMotion',1,NULL),(31,'Dunlop Sportmax D 212 GP PRO',1,NULL),(32,'Dunlop GP Racer Slick D212',1,NULL),(33,'Metzeler Racetec RR K2 Slick',1,NULL),(34,'Metzeler Racetec SM',1,NULL),(36,'Metzeler Racetec TD',1,NULL),(37,'Metzeler Roadtec 01',1,NULL),(38,'Metzeler Sportec M5 Interact',1,NULL),(39,'Metzeler Sportec M9 RR',1,NULL),(40,'Metzeler Racetec TD Slick',1,NULL),(41,'Michelin Pilot Power 2CT',1,NULL),(42,'Michelin Pilot Street',1,NULL),(43,'Michelin Power Cup 2',1,NULL),(44,'Michelin Power Supermoto',1,NULL),(45,'Michelin Road 5',1,NULL),(46,'Mitas MC-35 S-RACER 2.0 Soft',1,NULL),(47,'Pirelli Angel ST',1,NULL),(48,'Pirelli Diablo Rosso 4 Corsa',1,NULL),(49,'Pirelli Diablo Rosso Corsa 2',1,NULL),(51,'Pirelli Diablo Rosso 4',1,NULL),(52,'Pirelli Diablo Rosso 2',1,NULL),(53,'Pirelli Diablo Supercorsa SP V3',1,NULL),(54,'Pirelli Diablo Supercorsa SP V4',1,NULL),(55,'Bridgestone Battlax RS10',1,NULL),(57,'Pirelli Diablo Supercorsa SP',1,NULL),(59,'Pirelli Diablo Supercorsa SC',1,NULL),(61,'Pirelli Diablo Supercorsa SC V3',1,NULL),(62,'Pirelli Diablo Superbike SC3',1,NULL),(63,'PMT Soft',1,NULL),(64,'PMT Super Soft',1,NULL),(65,'Bridgestone Battlax S21',1,NULL),(67,'Bridgestone Battlax S23',1,NULL),(68,'Bridgestone Battlax S22',1,NULL),(69,'Pirelli Diablo Supercorsa SP V2',1,NULL),(70,'Dunlop Sportmax GP Racer D211',1,NULL),(71,'N/A',1,NULL),(72,'Pirelli Diablo Supercorsa SC V2',1,NULL),(73,'Dunlop Sportmax GP Racer D211 Slick',1,NULL),(74,'Metzeler Racetec RR K3 Slick',1,NULL),(75,'Metzeler Racetec RR K2',1,NULL),(76,'Bridgestone Battlax Racing V02 Soft',1,NULL),(77,'Pirelli Diablo Superbike SC2',1,NULL),(78,'Mitas MC-35 S-RACER 2.0 Medium',1,NULL),(80,'Metzeler Sportec M7 RR',1,NULL),(89,'dddfgdfg',1,'c4c1ca0975f1c903001253603dfd6a862fad67a79ae9e08d30afd808a0f92340'),(90,'adsafdfffffffff',1,'0'),(91,'Moja super opona 1',1,NULL);
/*!40000 ALTER TABLE `tyres_front` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tyres_front_all`
--

DROP TABLE IF EXISTS `tyres_front_all`;
/*!50001 DROP VIEW IF EXISTS `tyres_front_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tyres_front_all` AS SELECT 
 1 AS `tyre_name`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tyres_rear`
--

DROP TABLE IF EXISTS `tyres_rear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tyres_rear` (
  `tr_id` int NOT NULL AUTO_INCREMENT,
  `tyre_rear` varchar(256) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `token_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tr_id`),
  UNIQUE KEY `tyre_rear_UNIQUE` (`tyre_rear`),
  UNIQUE KEY `tr_id_UNIQUE` (`tr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tyres_rear`
--

LOCK TABLES `tyres_rear` WRITE;
/*!40000 ALTER TABLE `tyres_rear` DISABLE KEYS */;
INSERT INTO `tyres_rear` VALUES (2,'Pirelli Diablo Rosso Scooter',1,NULL),(4,'Dunlop Sportmax D 213 GP PRO',1,NULL),(5,'Dunlop Sportmax GPR-300',1,NULL),(6,'Dunlop KR 108',1,NULL),(7,'Dunlop KR 109',1,NULL),(9,'Dunlop Sportmax Roadsport 2',1,NULL),(10,'Dunlop SportSmart 3',1,NULL),(11,'Dunlop SportSmart TT',1,NULL),(13,'Metzeler Racetec RR K3',1,NULL),(14,'Bridgestone Battlax Racing V02F Medium',1,NULL),(15,'Bridgestone Battlax BT023 R',1,NULL),(16,'Continental ContiMotion',1,NULL),(18,'Dunlop Sportmax D 212 GP PRO',1,NULL),(19,'Dunlop GP Racer Slick D212',1,NULL),(20,'Metzeler Racetec RR K2 Slick',1,NULL),(21,'Metzeler Racetec SM',1,NULL),(23,'Metzeler Racetec TD',1,NULL),(24,'Metzeler Roadtec 01',1,NULL),(25,'Metzeler Sportec M5 Interact',1,NULL),(26,'Metzeler Sportec M9 RR',1,NULL),(27,'Metzeler Racetec TD Slick',1,NULL),(28,'Michelin Pilot Power 2CT',1,NULL),(29,'Michelin Pilot Street',1,NULL),(30,'Michelin Power Cup 2',1,NULL),(31,'Michelin Power Supermoto',1,NULL),(32,'Michelin Road 5',1,NULL),(33,'Mitas MC-35 S-RACER 2.0 Soft',1,NULL),(34,'Pirelli Angel ST',1,NULL),(35,'Pirelli Diablo Rosso 4 Corsa',1,NULL),(36,'Pirelli Diablo Rosso Corsa 2',1,NULL),(38,'Pirelli Diablo Rosso 4',1,NULL),(39,'Pirelli Diablo Rosso 2',1,NULL),(40,'Pirelli Diablo Supercorsa SP V3',1,NULL),(41,'Pirelli Diablo Supercorsa SP V4',1,NULL),(42,'Bridgestone Battlax RS10',1,NULL),(44,'Pirelli Diablo Supercorsa SP',1,NULL),(47,'Pirelli Diablo Supercorsa SC',1,NULL),(48,'Pirelli Diablo Supercorsa SC V3',1,NULL),(49,'Pirelli Diablo Superbike SC3',1,NULL),(50,'PMT Soft',1,NULL),(51,'PMT Super Soft',1,NULL),(52,'Bridgestone Battlax S21',1,NULL),(54,'Bridgestone Battlax S23',1,NULL),(55,'Bridgestone Battlax S22',1,NULL),(56,'Pirelli Diablo Supercorsa SP V2',1,NULL),(57,'Dunlop Sportmax GP Racer D211',1,NULL),(58,'N/A',1,NULL),(64,'Metzeler Racetec RR K2',1,NULL),(65,'Pirelli Diablo Supercorsa SC V2',1,NULL),(66,'Dunlop Sportmax GP Racer D211 Slick',1,NULL),(67,'Metzeler Racetec RR K3 Slick',1,NULL),(68,'Pirelli Diablo Superbike SC2',1,NULL),(69,'Mitas MC-35 S-RACER 2.0 Medium',1,NULL),(71,'Metzeler Sportec M7 RR',1,NULL),(77,'TEST 3',1,NULL),(79,'adsd',1,'b7fc1c1a2c0dcb4462ba436a92ea035ca6ef63858fe3b42d484da1fd31fbdd97'),(80,'Moja super opona 2',1,NULL);
/*!40000 ALTER TABLE `tyres_rear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tyres_rear_all`
--

DROP TABLE IF EXISTS `tyres_rear_all`;
/*!50001 DROP VIEW IF EXISTS `tyres_rear_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tyres_rear_all` AS SELECT 
 1 AS `tyre_name`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'pszczolki-wof-local'
--
/*!50003 DROP PROCEDURE IF EXISTS `insert_new_lap` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insert_new_lap`(
	IN p_lap_time TIME(3),
    IN p_lap_date DATE,
    IN p_rider_name VARCHAR(512),
    IN p_device_name VARCHAR(100),
    IN p_validity VARCHAR(45),
    IN p_track_name VARCHAR(256),
    IN p_organizer_name VARCHAR(256),
    IN p_motorcycle VARCHAR(256),
    IN p_tyre_front VARCHAR(256),
    IN p_tyre_rear VARCHAR(256),
    IN p_proof_url VARCHAR(512),
    IN p_proof_picture_path VARCHAR(512),
    IN p_video_url VARCHAR(512),
    IN p_status VARCHAR(25),
    OUT p_new_lap_id INT
)
BEGIN
    DECLARE v_rider_id INT;
    DECLARE v_device_id INT;
    DECLARE v_validity_id INT;
    DECLARE v_track_id INT;
    DECLARE v_organizer_id INT;
    DECLARE v_motorcycle_id INT;
    DECLARE v_tf_id INT;
    DECLARE v_tr_id INT;
 
	-- Resolve rider_id
	SELECT rider_id INTO v_rider_id
	FROM `riders`
	WHERE rider_name = p_rider_name
	LIMIT 1;
    
    -- Resolve device_id
    SELECT device_id INTO v_device_id
	FROM `devices`
	WHERE device_name = p_device_name
	LIMIT 1;
    
    -- Resolve validity_id
    SELECT validity_id INTO v_validity_id
	FROM `laps_validity`
	WHERE validity = p_validity
	LIMIT 1;
    
    -- Resolve track_id
    SELECT track_id INTO v_track_id
	FROM `tracks`
	WHERE track_name = p_track_name
	LIMIT 1;
    
    -- Resolve organizer_id
    SELECT organizer_id INTO v_organizer_id
	FROM `organizers`
	WHERE organizer_name = p_organizer_name
	LIMIT 1;
    
    -- Resolve motorcycle_id
    SELECT motorcycle_id INTO v_motorcycle_id
	FROM `motorcycles`
	WHERE motorcycle = p_motorcycle
	LIMIT 1;
    
    -- Resolve tyre_front_id
    SELECT tf_id INTO v_tf_id
	FROM `tyres_front`
	WHERE tyre_front = p_tyre_front
	LIMIT 1;
    
    -- Resolve tyre_rear_id
    SELECT tr_id INTO v_tr_id
	FROM `tyres_rear`
	WHERE tyre_rear = p_tyre_rear
	LIMIT 1;

	INSERT INTO `laps`(lap_time, lap_date, rider_id, device_id, validity_id, track_id, organizer_id, motorcycle_id, tyre_front_id, tyre_rear_id, proof_url, proof_picture_path, video_url, status, created_date)
    VALUES (p_lap_time, p_lap_date, v_rider_id, v_device_id, v_validity_id, v_track_id, v_organizer_id, v_motorcycle_id, v_tf_id, v_tr_id, p_proof_url, p_proof_picture_path, p_video_url, COALESCE(p_status, 'pending'), CURDATE());

	SET p_new_lap_id = LAST_INSERT_ID();
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_new_rider` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insert_new_rider`(
	IN p_rider_name VARCHAR(512),
    IN p_group_name VARCHAR(128),
    IN p_sex VARCHAR(45),
    IN p_rider_level VARCHAR(45),
    IN p_socal_instagram VARCHAR(200),
    IN p_social_facebook VARCHAR(200)
)
BEGIN
    DECLARE v_group_id INT;
    DECLARE v_sex_id INT;
    DECLARE v_rider_level_id INT;
    DECLARE v_msg TEXT;

	-- Resolve group_id
	SELECT group_id INTO v_group_id
	FROM `groups`
	WHERE group_name = p_group_name
	LIMIT 1;

	-- Resolve sex_id
    SELECT sex_id INTO v_sex_id
    FROM `sex`
    WHERE sex = p_sex
    LIMIT 1;

    IF v_sex_id IS NULL THEN
        SET v_msg = COALESCE('Sex not found: ', p_sex);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
    END IF;
    
	-- Resolve rider_level
    SELECT level_id INTO v_rider_level_id
    FROM `riders_levels`
    WHERE rider_level = p_rider_level
    LIMIT 1;

    IF v_rider_level_id IS NULL THEN
		SET v_msg = COALESCE('Rider level not found: ', p_rider_level);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
    END IF;

	INSERT INTO `riders`(rider_name, group_id, sex_id, rider_level, social_instagram, social_facebook)
    VALUES (p_rider_name, v_group_id, v_sex_id, v_rider_level_id, p_socal_instagram, p_social_facebook);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_new_token` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insert_new_token`(
    IN p_lap_id INT,
    IN p_contact VARCHAR(255),
    IN p_token VARCHAR(255)
)
BEGIN
    INSERT INTO `submissions` (`lap_id`, `contact`, `token_hash`)
    VALUES (p_lap_id, p_contact, p_token);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_pending_motorcycle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insert_pending_motorcycle`(
	IN p_name VARCHAR(255),
    IN p_year INT,
    IN p_type VARCHAR(255),
    IN p_token_hash VARCHAR(255),
    OUT o_id INT
)
BEGIN
	
	 -- Declare local variables for finding existing IDs/statuses
    DECLARE existing_id INT;

    -- Initialize output parameters
    SET o_id = NULL;
    
    START TRANSACTION;

    -- Process Motorcycle
    IF p_name IS NOT NULL THEN
        -- Try to find existing entry
        SELECT motorcycle_id INTO existing_id FROM `motorcycles` WHERE motorcycle= p_name and year = p_year;

        IF existing_id IS NULL THEN
            -- If name is new, insert it as not_approved
            INSERT INTO `motorcycles` (`motorcycle`, `year`, `type`, `status`, `token_hash`) VALUES (p_name, p_year, p_type, 0, p_token_hash);
            SET o_id = LAST_INSERT_ID();
        END IF;
    END IF;


    COMMIT;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_pending_tyres` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insert_pending_tyres`(
    IN p_tyre_front VARCHAR(255),
    IN p_tyre_rear VARCHAR(255),
    IN p_token_hash VARCHAR(255),
    OUT o_tf_id    INT,
    OUT o_tr_id    INT
)
BEGIN
	
	 -- Declare local variables for finding existing IDs/statuses
    DECLARE existing_id INT;

    -- Initialize output parameters
    SET o_tf_id = NULL;
    SET o_tr_id = NULL;

    START TRANSACTION;

    -- Process Tyre Front
    IF p_tyre_front IS NOT NULL THEN
        SET existing_id = NULL; -- Reset for next table
        SELECT tf_id INTO existing_id FROM `tyres_front` WHERE tyre_front = p_tyre_front;

        IF existing_id IS NULL THEN
            INSERT INTO `tyres_front` (`tyre_front`, `status`, `token_hash`) VALUES (p_tyre_front, 0, p_token_hash);
            SET o_tf_id = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Process Tyre Rear
    IF p_tyre_rear IS NOT NULL THEN
        SET existing_id = NULL; -- Reset for next table
        SELECT tr_id INTO existing_id FROM `tyres_rear` WHERE tyre_rear = p_tyre_rear;

        IF existing_id IS NULL THEN
            INSERT INTO `tyres_rear` (`tyre_rear`, `status`, `token_hash`) VALUES (p_tyre_rear, 0, p_token_hash);
            SET o_tr_id = LAST_INSERT_ID();
        END IF;
    END IF;

    COMMIT;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `manage_pending_laps` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `manage_pending_laps`(
    IN p_lap_id INT,
    IN p_action ENUM('approved', 'rejected')   -- restrict allowed actions
)
BEGIN
    DECLARE v_rows INT DEFAULT 0;

    -- Roll back the transaction if any SQL error occurs and re-raise the error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF p_lap_id IS NULL THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Lap ID cannot be NULL.';
    END IF;

    IF p_action = 'approved' THEN
        -- Approve the lap
        UPDATE laps
           SET status = p_action           -- status becomes 'approved'
         WHERE lap_id = p_lap_id;

        SET v_rows = ROW_COUNT();

        IF v_rows = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Lap ID not found or could not be updated.';
        END IF;

        -- Remove any pending submission entry for this lap
        DELETE FROM submissions
         WHERE lap_id = p_lap_id;

    ELSEIF p_action = 'rejected' THEN
        -- Drop the submission first (prevents FK issues)
        DELETE FROM submissions
         WHERE lap_id = p_lap_id;

        -- Remove the lap itself
        DELETE FROM laps
         WHERE lap_id = p_lap_id;

        SET v_rows = ROW_COUNT();

        IF v_rows = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Lap ID not found or could not be deleted.';
        END IF;
    ELSE
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Unsupported action.';
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `manage_pending_motorcycle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `manage_pending_motorcycle`(
    IN p_motorcycle_id INT,               -- ID of the motorcycle to manage
    IN p_action ENUM('approve', 'delete'),    -- Action to perform
    IN p_new_name VARCHAR(255),            -- New name value (if approving and name changes)
    IN p_new_year INT,            -- New year value (if approving and year changes)
    IN p_new_type VARCHAR(255)             -- New type value (if approving and type changes)
)
BEGIN
    -- Declare an EXIT HANDLER for any SQLEXCEPTION (SQL errors)
    -- If an error occurs, it will ROLLBACK the transaction and then exit the procedure.
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL; -- Re-raise the error if caller needs it
    END;

    START TRANSACTION;

    IF p_motorcycle_id IS NOT NULL THEN
        IF p_action = 'delete' THEN
            DELETE FROM `motorcycles`
            WHERE `motorcycle_id` = p_motorcycle_id;
        ELSEIF p_action = 'approve' THEN
            -- Update the motorcycle entry
            UPDATE `motorcycles`
            SET
                `status` = 1, -- Set status to 'approved'
                `motorcycle` = COALESCE(p_new_name, `motorcycle`), -- Update name if p_new_name is NOT NULL
                `year` = COALESCE(p_new_year, `year`),           -- Update year if p_new_year is NOT NULL
                `type` = COALESCE(p_new_type, `type`),           -- Update type if p_new_type is NOT NULL
                `token_hash` = NULL           					 -- Set token_hash to NULL if motorcycle approved
            WHERE `motorcycle_id` = p_motorcycle_id AND `status` = 0; -- Only if currently 'pending'
        END IF;
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `manage_pending_tyres` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `manage_pending_tyres`(
    IN p_tf_id INT,
    IN p_tr_id INT,
    IN p_action_tf ENUM('approve', 'delete'),
    IN p_action_tr ENUM('approve', 'delete'),
    IN p_tf_name VARCHAR(255), -- If NULL, use existing name; if NOT NULL, update to this name
    IN p_tr_name VARCHAR(255)  -- If NULL, use existing name; if NOT NULL, update to this name
)
BEGIN

	    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL; -- Re-raise the error if caller needs it
    END;
	
START TRANSACTION;

    -- --- Process Tyre Front ---
    IF p_tf_id IS NOT NULL THEN
        IF p_action_tf = 'delete' THEN
            DELETE FROM `tyres_front`
            WHERE `tf_id` = p_tf_id;
        ELSEIF p_action_tf = 'approve' THEN
            UPDATE `tyres_front`
            SET
                `status` = 1, -- Set status to 'approved' (1)
                `tyre_front` = COALESCE(p_tf_name, `tyre_front`), -- Update if p_tf_name is NOT NULL, else use existing `tyre_front` value
                `token_hash` = NULL
            WHERE `tf_id` = p_tf_id AND `status` = 0; -- Only if currently 'not_approved' (0)
        END IF;
    END IF;

    -- --- Process Tyre Rear ---
    IF p_tr_id IS NOT NULL THEN
        IF p_action_tr = 'delete' THEN
            DELETE FROM `tyres_rear`
            WHERE `tr_id` = p_tr_id;
        ELSEIF p_action_tr = 'approve' THEN
            UPDATE `tyres_rear`
            SET
                `status` = 1, -- Set status to 'approved' (1)
                `tyre_rear` = COALESCE(p_tr_name, `tyre_rear`), -- Update if p_tr_name is NOT NULL, else use existing `tyre_rear` value
                `token_hash` = NULL
            WHERE `tr_id` = p_tr_id AND `status` = 0; -- Only if currently 'not_approved' (0)
        END IF;
    END IF;

COMMIT;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `leaderboard_all_track_laps_unique`
--

/*!50001 DROP VIEW IF EXISTS `leaderboard_all_track_laps_unique`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `leaderboard_all_track_laps_unique` AS select `t`.`lap_time` AS `lap_time`,`t`.`status` AS `status`,`t`.`rider_name` AS `rider_name`,`t`.`rider_level` AS `rider_level`,`t`.`validity` AS `validity`,`t`.`motorcycle` AS `motorcycle`,`t`.`tyre_front` AS `tyre_front`,`t`.`tyre_rear` AS `tyre_rear`,`t`.`lap_date` AS `lap_date`,`t`.`track_name` AS `track_name`,`t`.`sex_name` AS `sex_name`,`t`.`rn` AS `rn` from (select `laps`.`lap_time` AS `lap_time`,`laps`.`status` AS `status`,`riders`.`rider_name` AS `rider_name`,`riders_levels`.`rider_level` AS `rider_level`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name`,`sex`.`sex_name` AS `sex_name`,row_number() OVER (PARTITION BY `riders`.`rider_name`,`motorcycles`.`motorcycle`,`tracks`.`track_name` )  AS `rn` from ((((((((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `riders_levels` on((`riders`.`rider_level` = `riders_levels`.`level_id`))) left join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) left join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) left join `sex` on((`riders`.`sex_id` = `sex`.`sex_id`))) order by `laps`.`lap_time`) `t` where (`t`.`rn` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `motorcycles_all`
--

/*!50001 DROP VIEW IF EXISTS `motorcycles_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `motorcycles_all` AS select `motorcycles`.`motorcycle` AS `motorcycle_name`,`motorcycles`.`year` AS `year`,`motorcycles`.`status` AS `status` from `motorcycles` order by `motorcycles`.`motorcycle` */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `rider_lap_details` AS select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`sex`.`sex_name` AS `sex`,`riders_levels`.`rider_level` AS `rider_level`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`devices`.`device_name` AS `device`,`organizers`.`organizer_name` AS `organizer`,`laps`.`proof_url` AS `proof_url`,`laps`.`proof_picture_path` AS `proof_picture_path`,`laps`.`video_url` AS `video_url`,`riders`.`social_facebook` AS `rider_fb`,`riders`.`social_instagram` AS `rider_ig` from (((((((((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `riders_levels` on((`riders`.`rider_level` = `riders_levels`.`level_id`))) left join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) left join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) left join `devices` on((`laps`.`device_id` = `devices`.`device_id`))) left join `organizers` on((`laps`.`organizer_id` = `organizers`.`organizer_id`))) left join `sex` on((`riders`.`sex_id` = `sex`.`sex_id`))) order by `laps`.`lap_time` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rider_laptimes_all`
--

/*!50001 DROP VIEW IF EXISTS `rider_laptimes_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `rider_laptimes_all` AS select `laps`.`lap_time` AS `lap_time`,`laps`.`status` AS `status`,`riders`.`rider_name` AS `rider_name`,`motorcycles`.`motorcycle` AS `motorcycle`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name` from (((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) order by `riders`.`rider_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `riders_all`
--

/*!50001 DROP VIEW IF EXISTS `riders_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `riders_all` AS select `riders`.`rider_name` AS `rider_name` from `riders` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `riders_from_track`
--

/*!50001 DROP VIEW IF EXISTS `riders_from_track`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `riders_from_track` AS select distinct `riders`.`rider_name` AS `rider_name`,`tracks`.`track_name` AS `track_name` from ((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) order by `riders`.`rider_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `submission_validation`
--

/*!50001 DROP VIEW IF EXISTS `submission_validation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `submission_validation` AS select `submissions`.`id` AS `id`,`submissions`.`lap_id` AS `lap_id`,`submissions`.`contact` AS `contact`,`submissions`.`token_hash` AS `token_hash` from `submissions` order by `submissions`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `track_organizers`
--

/*!50001 DROP VIEW IF EXISTS `track_organizers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `track_organizers` AS select `organizers`.`organizer_name` AS `organizer_name`,`tracks`.`track_name` AS `track_name` from ((`bind_track_organizers` left join `organizers` on((`bind_track_organizers`.`organizer_id` = `organizers`.`organizer_id`))) left join `tracks` on((`bind_track_organizers`.`track_id` = `tracks`.`track_id`))) order by `organizers`.`organizer_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tyres_front_all`
--

/*!50001 DROP VIEW IF EXISTS `tyres_front_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tyres_front_all` AS select `tyres_front`.`tyre_front` AS `tyre_name`,`tyres_front`.`status` AS `status` from `tyres_front` order by `tyres_front`.`tyre_front` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tyres_rear_all`
--

/*!50001 DROP VIEW IF EXISTS `tyres_rear_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tyres_rear_all` AS select `tyres_rear`.`tyre_rear` AS `tyre_name`,`tyres_rear`.`status` AS `status` from `tyres_rear` order by `tyres_rear`.`tyre_rear` */;
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

-- Dump completed on 2026-02-25 22:54:56
