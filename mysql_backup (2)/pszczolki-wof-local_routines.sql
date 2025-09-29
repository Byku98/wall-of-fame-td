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
-- Temporary view structure for view `leaderboard_get_all_tack_laps`
--

DROP TABLE IF EXISTS `leaderboard_get_all_tack_laps`;
/*!50001 DROP VIEW IF EXISTS `leaderboard_get_all_tack_laps`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leaderboard_get_all_tack_laps` AS SELECT 
 1 AS `lap_time`,
 1 AS `rider_name`,
 1 AS `validity`,
 1 AS `motorcycle`,
 1 AS `tyre_front`,
 1 AS `tyre_rear`,
 1 AS `lap_date`,
 1 AS `track_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `leaderboard_get_all_tack_laps`
--

/*!50001 DROP VIEW IF EXISTS `leaderboard_get_all_tack_laps`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `leaderboard_get_all_tack_laps` AS select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`laps`.`track_id` AS `track_id` from (((((`laps` join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) order by `laps`.`lap_time` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'pszczolki-wof-local'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-28 22:32:27
