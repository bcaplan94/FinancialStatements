-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: financial_statements
-- ------------------------------------------------------
-- Server version	8.0.36

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


USE `financial_statements`;

--
-- Table structure for table `financial_items`
--

DROP TABLE IF EXISTS `financial_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_items` (
  `id` varchar(64) NOT NULL,
  `as_of_date` date NOT NULL,
  `item` varchar(255) NOT NULL,
  `amount` float DEFAULT NULL,
  `treeHeight` int DEFAULT NULL,
  `parent` varchar(64) DEFAULT NULL,
  `itemOrder` int DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_items`
--

LOCK TABLES `financial_items` WRITE;
/*!40000 ALTER TABLE `financial_items` DISABLE KEYS */;
INSERT INTO `financial_items` VALUES ('08b2ce167ea747b294609e07f9ff781d','2024-05-01','Assets',697000,0,NULL,0,''),('166a7f662be04bcaa314604e799d678c','2024-06-01','Liabilites',199600,0,NULL,5,''),('22e85a6f2df1471a89da7dd13361297b','2024-05-01','Real Estate',255000,1,'08b2ce167ea747b294609e07f9ff781d',3,''),('2dd2b8385f7f4441a36dc106a5e3f1eb','2024-05-01','Citibank',2000,2,'44362d1786c948beb314dfb7b776ea36',7,''),('44362d1786c948beb314dfb7b776ea36','2024-05-01','Credit Card',10600,1,'46f28cdbb72f4e89acc9c7d8a4aedd9d',5,''),('46f28cdbb72f4e89acc9c7d8a4aedd9d','2024-05-01','Liabilites',199600,0,NULL,4,''),('4825e01d1052476e971b5a4a2d838563','2024-06-01','US Bank',600,2,'a77b969a637248d29e0c274b18bc03e0',7,''),('5afa06d9eb894ea7a4827feec44a78c5','2024-05-01','Bank Of America',8000,2,'44362d1786c948beb314dfb7b776ea36',8,''),('5d774e01e5f647ba8e695133d201c528','2024-05-01','US Bank',600,2,'44362d1786c948beb314dfb7b776ea36',6,''),('5e8e52c12ccc4197ace758fd7f7d9fbe','2024-06-01','Loan Receiveable',10000,1,'7377b8373cd84d918d5c9f8cb567451e',1,''),('600ad3e8584545afa803e26a68dce299','2024-05-01','Cash',212000,1,'08b2ce167ea747b294609e07f9ff781d',1,''),('61c5b849709e4f45a7b369c474599eb5','2024-06-01','Citibank',2000,2,'a77b969a637248d29e0c274b18bc03e0',8,''),('6e6be29c1db04aef8e28fff2cd21de1c','2024-05-01','Networth',497400,0,NULL,10,''),('71fc81f5d3904037afd2616528e273c9','2024-06-01','Networth',527400,0,NULL,11,''),('7377b8373cd84d918d5c9f8cb567451e','2024-06-01','Assets',727000,0,NULL,0,''),('77d410165f374fd8bc9559139a87aba5','2024-06-01','Stocks',250000,1,'7377b8373cd84d918d5c9f8cb567451e',3,''),('85648a12a0214c729a9532192ed6b91f','2024-06-01','Real Estate',255000,1,'7377b8373cd84d918d5c9f8cb567451e',4,''),('974c60b7c0a6425ba6dd8451d63f05aa','2024-06-01','Cash',212000,1,'7377b8373cd84d918d5c9f8cb567451e',2,''),('a77b969a637248d29e0c274b18bc03e0','2024-06-01','Credit Card',10600,1,'166a7f662be04bcaa314604e799d678c',6,''),('be5873f705a34d3f95b23e8840962688','2024-06-01','Bank Of America',8000,2,'a77b969a637248d29e0c274b18bc03e0',9,''),('c865273120e848d88a43e20ef4b47ed7','2024-06-01','Mortgage',189000,1,'166a7f662be04bcaa314604e799d678c',10,''),('d793c15fa9fe4ee5be842e012e95cfe1','2024-05-01','Stocks',230000,1,'08b2ce167ea747b294609e07f9ff781d',2,''),('e4ee112f8255413c9e93b5b41ec8f07d','2024-05-01','Mortgage',189000,1,'46f28cdbb72f4e89acc9c7d8a4aedd9d',9,'');
/*!40000 ALTER TABLE `financial_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-16 14:21:07
