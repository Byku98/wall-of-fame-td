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
-- Temporary view structure for view `tyres_rear_all`
--

DROP TABLE IF EXISTS `tyres_rear_all`;
/*!50001 DROP VIEW IF EXISTS `tyres_rear_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tyres_rear_all` AS SELECT 
 1 AS `tyre_name`*/;
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
 1 AS `rider_name`,
 1 AS `motorcycle`,
 1 AS `lap_date`,
 1 AS `track_name`*/;
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
-- Temporary view structure for view `motorcycles_all`
--

DROP TABLE IF EXISTS `motorcycles_all`;
/*!50001 DROP VIEW IF EXISTS `motorcycles_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `motorcycles_all` AS SELECT 
 1 AS `motorcycle_name`*/;
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
-- Temporary view structure for view `tyres_front_all`
--

DROP TABLE IF EXISTS `tyres_front_all`;
/*!50001 DROP VIEW IF EXISTS `tyres_front_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tyres_front_all` AS SELECT 
 1 AS `tyre_name`*/;
SET character_set_client = @saved_cs_client;

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
/*!50001 VIEW `tyres_rear_all` AS select `tyres_rear`.`tyre_rear` AS `tyre_name` from `tyres_rear` order by `tyres_rear`.`tyre_rear` */;
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
/*!50001 VIEW `rider_laptimes_all` AS select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`motorcycles`.`motorcycle` AS `motorcycle`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name` from (((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) order by `riders`.`rider_name` */;
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
/*!50001 VIEW `leaderboard_all_track_laps_unique` AS select `t`.`lap_time` AS `lap_time`,`t`.`rider_name` AS `rider_name`,`t`.`rider_level` AS `rider_level`,`t`.`validity` AS `validity`,`t`.`motorcycle` AS `motorcycle`,`t`.`tyre_front` AS `tyre_front`,`t`.`tyre_rear` AS `tyre_rear`,`t`.`lap_date` AS `lap_date`,`t`.`track_name` AS `track_name`,`t`.`sex_name` AS `sex_name`,`t`.`rn` AS `rn` from (select `laps`.`lap_time` AS `lap_time`,`riders`.`rider_name` AS `rider_name`,`riders_levels`.`rider_level` AS `rider_level`,`laps_validity`.`validity` AS `validity`,`motorcycles`.`motorcycle` AS `motorcycle`,`tyres_front`.`tyre_front` AS `tyre_front`,`tyres_rear`.`tyre_rear` AS `tyre_rear`,`laps`.`lap_date` AS `lap_date`,`tracks`.`track_name` AS `track_name`,`sex`.`sex_name` AS `sex_name`,row_number() OVER (PARTITION BY `riders`.`rider_name`,`motorcycles`.`motorcycle`,`tracks`.`track_name` )  AS `rn` from ((((((((`laps` left join `riders` on((`laps`.`rider_id` = `riders`.`rider_id`))) left join `riders_levels` on((`riders`.`rider_level` = `riders_levels`.`level_id`))) left join `laps_validity` on((`laps`.`validity_id` = `laps_validity`.`validity_id`))) left join `motorcycles` on((`laps`.`motorcycle_id` = `motorcycles`.`motorcycle_id`))) left join `tyres_front` on((`laps`.`tyre_front_id` = `tyres_front`.`tf_id`))) left join `tyres_rear` on((`laps`.`tyre_rear_id` = `tyres_rear`.`tr_id`))) left join `tracks` on((`laps`.`track_id` = `tracks`.`track_id`))) left join `sex` on((`riders`.`sex_id` = `sex`.`sex_id`))) order by `laps`.`lap_time`) `t` where (`t`.`rn` = 1) */;
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
/*!50001 VIEW `motorcycles_all` AS select `motorcycles`.`motorcycle` AS `motorcycle_name` from `motorcycles` order by `motorcycles`.`motorcycle` */;
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
/*!50001 VIEW `tyres_front_all` AS select `tyres_front`.`tyre_front` AS `tyre_name` from `tyres_front` order by `tyres_front`.`tyre_front` */;
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

-- Dump completed on 2026-01-07 22:08:33
