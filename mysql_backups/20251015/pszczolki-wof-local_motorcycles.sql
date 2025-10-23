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
  `motorcycle` varchar(256) NOT NULL,
  `year` int DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `online_description` varchar(1024) DEFAULT NULL,
  `preview_path` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`motorcycle_id`),
  UNIQUE KEY `id_UNIQUE` (`motorcycle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2025-10-15 22:35:19
