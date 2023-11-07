-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: vikeshi_db
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.2

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
-- Table structure for table `affiliates`
--

DROP TABLE IF EXISTS `affiliates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affiliates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `affiliates_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliates`
--

LOCK TABLES `affiliates` WRITE;
/*!40000 ALTER TABLE `affiliates` DISABLE KEYS */;
INSERT INTO `affiliates` VALUES (1,'Amazon','/assets/images/affiliates/amazon.png','https://www.amazon.in','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(2,'Flipkart','/assets/images/affiliates/flipkart.jpg','https://www.flipkart.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(3,'Meesho','/assets/images/affiliates/meesho.png','https://www.meesho.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(4,'Myntra','/assets/images/affiliates/myntra.png','https://www.myntra.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(5,'Nykaa Fashion','/assets/images/affiliates/nykaa-fashion.png','https://www.nykaafashion.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(6,'Shoppers Stop','/assets/images/affiliates/shoppers-stop.svg','https://www.shoppersstop.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(7,'Snapdeal','/assets/images/affiliates/snapdeal.png','https://www.snapdeal.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(8,'Ajio','/assets/images/affiliates/ajio.png','https://www.ajio.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(9,'Urbanic','/assets/images/affiliates/urbanic.png','https://in.urbanic.com','mdi:currency-inr',1,'2023-01-12 19:11:51','2023-01-12 19:11:51');
/*!40000 ALTER TABLE `affiliates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Dresses','dresses',1,'2023-01-12 19:11:51','2023-01-12 19:11:51');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `colors_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Red','red','#FF0000',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(2,'Pink','pink','#FFC0CB',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(3,'Light Pink','light-pink','#FFB6C1',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(4,'Hot Pink','hot-pink','#FF69B4',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(5,'Orange Red','orange-red','#FF4500',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(6,'Orange','orange','#FFA500',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(7,'Gold','gold','#FFD700',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(8,'Yellow','yellow','#FFFF00',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(9,'Peach Puff','peach-puff','#FFDAB9',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(10,'Violet','violet','#EE82EE',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(11,'Purple','purple','#800080',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(12,'Indigo','indigo','#4B0082',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(13,'Green','green','#008000',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(14,'LightGreen','light-green','#90EE90',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(15,'DarkGreen','dark-green','#006400',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(16,'Olive','olive','#808000',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(17,'Blue','blue','#0000FF',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(18,'Navy','navy','#000080',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(19,'Aqua','aqua','#00FFFF',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(20,'RoyalBlue','royal-blue','#4169E1',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(21,'Brown','brown','#A52A2A',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(22,'Maroon','maroon','#800000',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(23,'Chocolate','chocolate','#D2691E',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(24,'White','white','#FFFFFF',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(25,'LightGray','light-gray','#D3D3D3',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(26,'Silver','silver','#C0C0C0',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(27,'DarkGray','dark-gray','#A9A9A9',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(28,'Gray','gray','#808080',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(29,'SlateGray','slate-gray','#708090',1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(30,'Black','black','#000000',1,'2023-01-12 19:11:51','2023-01-12 19:11:51');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_10_21_114253_create_roles_table',1),(6,'2022_10_21_114315_create_user_role_table',1),(7,'2022_12_23_135843_create_colors_table',1),(8,'2022_12_23_180010_create_categories_table',1),(9,'2022_12_24_150119_create_sub_categories_table',1),(10,'2022_12_24_184747_create_products_table',1),(11,'2022_12_27_073202_create_product_media_table',1),(12,'2022_12_28_061822_create_affiliates_table',1),(13,'2022_12_28_075353_create_product_affiliate_table',1),(14,'2023_01_06_171317_create_product_sub_category_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_affiliate`
--

DROP TABLE IF EXISTS `product_affiliate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_affiliate` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `affiliate_id` bigint unsigned NOT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_affiliate_product_id_foreign` (`product_id`),
  KEY `product_affiliate_affiliate_id_foreign` (`affiliate_id`),
  CONSTRAINT `product_affiliate_affiliate_id_foreign` FOREIGN KEY (`affiliate_id`) REFERENCES `affiliates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_affiliate_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_affiliate`
--

LOCK TABLES `product_affiliate` WRITE;
/*!40000 ALTER TABLE `product_affiliate` DISABLE KEYS */;
INSERT INTO `product_affiliate` VALUES (1,1,1,'1,099','https://www.amazon.in/ikichic-Ribbed-Bodycon-Ruched-Sleeves/dp/B09JW78YDC/ref=sr_1_1?crid=23H3ITGBMZJ2L&keywords=bodycon%2Bmini%2Bdress&qid=1673624219&refinements=p_n_feature_eight_browse-bin%3A28192488031%2Cp_n_feature_three_browse-bin%3A1974920031&rnid=1974917031&s=apparel&sprefix=bodycon%2Bmini%2Bdress%2Caps%2C377&sr=1-1&th=1','[\"#000000\",\"#EE82EE\"]',1,'2023-01-13 18:33:29','2023-01-13 18:33:29'),(2,1,2,'1,099','https://www.flipkart.com/ikichic-women-bodycon-purple-dress/p/itm50d6d14276d83?pid=DREG7YH8MXUZ3WBA&lid=LSTDREG7YH8MXUZ3WBANFPEYJ&marketplace=FLIPKART&sattr[]=color&st=color','[\"#000000\",\"#EE82EE\"]',1,'2023-01-13 18:33:29','2023-01-13 18:33:29'),(3,2,2,'342','https://www.flipkart.com/zeeshan-fasihonhub-women-bodycon-maroon-dress/p/itm84ba2b8beb890?pid=DREGJEYSHUZKHUSM&lid=LSTDREGJEYSHUZKHUSMN4RANC&marketplace=FLIPKART&sattr[]=color&st=color','[\"#000000\",\"#800000\"]',1,'2023-01-13 18:54:42','2023-01-13 18:54:42'),(4,2,1,'499','https://www.amazon.in/Elyraa-Womens-Bodycon-Western-Medium/dp/B09K6JDC5Q/ref=sr_1_7?crid=23H3ITGBMZJ2L&keywords=bodycon%2Bmini%2Bdress&qid=1673623896&rnid=28218195031&s=apparel&sprefix=bodycon%2Bmini%2Bdress%2Caps%2C377&sr=1-7&th=1','[\"#000000\",\"#FFFFFF\",\"#006400\",\"#800000\"]',1,'2023-01-13 18:54:42','2023-01-13 18:54:42'),(5,3,1,'586','https://www.amazon.in/GLARE-BLAIR-Sleeveless-Backless-Bodycon/dp/B0BC9FZVW9/ref=sr_1_14?crid=23H3ITGBMZJ2L&keywords=bodycon%2Bmini%2Bdress&qid=1673623896&rnid=28218195031&s=apparel&sprefix=bodycon%2Bmini%2Bdress%2Caps%2C377&sr=1-14&th=1','[\"#D2691E\",\"#800000\",\"#000000\",\"#00FFFF\"]',1,'2023-01-13 19:02:27','2023-01-13 19:02:27');
/*!40000 ALTER TABLE `product_affiliate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_media`
--

DROP TABLE IF EXISTS `product_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  `is_video` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_media_product_id_foreign` (`product_id`),
  CONSTRAINT `product_media_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_media`
--

LOCK TABLES `product_media` WRITE;
/*!40000 ALTER TABLE `product_media` DISABLE KEYS */;
INSERT INTO `product_media` VALUES (1,'upload/product/1/1673379040851-1673634835.jpg',1,0,0,1,'2023-01-13 18:33:55','2023-01-13 18:33:55'),(2,'upload/product/1/1673379041652-1673634836.jpg',1,0,0,1,'2023-01-13 18:33:56','2023-01-13 18:33:56'),(3,'upload/product/1/1673379041982-1673634836.jpg',1,0,0,1,'2023-01-13 18:33:56','2023-01-13 18:33:56'),(4,'upload/product/1/1673379041269-1673634836.jpg',1,0,0,1,'2023-01-13 18:33:56','2023-01-13 18:33:56'),(5,'upload/product/2/1673408002120-1673636107.jpg',2,0,0,1,'2023-01-13 18:55:07','2023-01-13 18:55:07'),(6,'upload/product/2/1673408002667-1673636107.jpg',2,0,0,1,'2023-01-13 18:55:07','2023-01-13 18:55:07'),(7,'upload/product/3/1673379693509-1673636602.jpg',3,0,0,1,'2023-01-13 19:03:22','2023-01-13 19:03:22'),(8,'upload/product/3/1673379692508-1673636602.jpg',3,0,0,1,'2023-01-13 19:03:22','2023-01-13 19:03:22'),(9,'upload/product/3/1673379693801-1673636602.jpg',3,0,0,1,'2023-01-13 19:03:22','2023-01-13 19:03:22'),(10,'upload/product/3/1673379693989-1673636602.jpg',3,0,0,1,'2023-01-13 19:03:22','2023-01-13 19:03:22');
/*!40000 ALTER TABLE `product_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sub_category`
--

DROP TABLE IF EXISTS `product_sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sub_category` (
  `product_id` bigint unsigned NOT NULL,
  `sub_category_id` bigint unsigned NOT NULL,
  KEY `product_sub_category_product_id_foreign` (`product_id`),
  KEY `product_sub_category_sub_category_id_foreign` (`sub_category_id`),
  CONSTRAINT `product_sub_category_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_sub_category_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sub_category`
--

LOCK TABLES `product_sub_category` WRITE;
/*!40000 ALTER TABLE `product_sub_category` DISABLE KEYS */;
INSERT INTO `product_sub_category` VALUES (1,4),(1,1),(2,4),(3,4),(3,1);
/*!40000 ALTER TABLE `product_sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sale_price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `map_id` bigint unsigned DEFAULT NULL,
  `group_id` bigint unsigned DEFAULT NULL,
  `is_publish` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `status_reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bodycon Ruched Fitted Sleeves Mini Dress for Women','bodycon-ruched-fitted-sleeves-mini-dress-for-women',NULL,'Perfect Evening Casual Wear, Perfect for your daily wear, outdoor, work and parties, any occasion is perfect in Spring, Fall and Winter & Perfect wear for a fantastic summer outfit, Perfect for all season !!',NULL,NULL,1,NULL,NULL,'1',NULL,1,'2023-01-13 18:33:29','2023-01-13 18:56:44'),(2,'Solid Bodycon Western Mini Dress for Women/Girls','solid-bodycon-western-mini-dress-for-womengirls',NULL,'Spruce up your wardrobe with this leg of mutton Sleeve Dress from Elyraa. available on Amazon. This Dress is perfect for a day out with friends or a night of get-together with family.',NULL,NULL,1,NULL,NULL,'1',NULL,1,'2023-01-13 18:54:42','2023-01-13 18:56:15'),(3,'Solid Halter Neck Sleeveless Backless Bodycon Ribbed Mini Dress for Women','solid-halter-neck-sleeveless-backless-bodycon-ribbed-mini-dress-for-women',NULL,'This solid halter neck sleeveless backless ribbed bodycon mini dress for women is perfect for party wear and casual occasion. You can pair this casual dress with sneakers for your daily basic fit and heels for a party.',NULL,NULL,1,NULL,NULL,'1',NULL,1,'2023-01-13 19:02:27','2023-01-13 19:03:29');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrator','administrator',1,NULL,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(2,'Developer','developer',1,NULL,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(3,'Vendor','vendor',1,NULL,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(4,'Manger','manager',1,NULL,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(5,'User','user',1,NULL,'2023-01-12 19:11:51','2023-01-12 19:11:51');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sub_categories_slug_unique` (`slug`),
  KEY `sub_categories_category_id_foreign` (`category_id`),
  CONSTRAINT `sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,'Party Dresses','party-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(2,'Club Dresses','club-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(3,'Cocktail Dresses','cocktail-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(4,'Mini Dresses','mini-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(5,'Midi Dresses','midi-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51'),(6,'Maxi Dresses','maxi-dresses',1,1,'2023-01-12 19:11:51','2023-01-12 19:11:51');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  KEY `user_role_user_id_foreign` (`user_id`),
  KEY `user_role_role_id_foreign` (`role_id`),
  CONSTRAINT `user_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'assets/image/demo-user.png',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Govind Singh Tomar','govindtomar01@gmail.com',NULL,NULL,NULL,'$2y$10$.ADVIRtM3.S7imjgtVr.OuJ674asjv9flUhWcYeUxo13KH8As.fTW','assets/image/demo-user.png',1,NULL,'2023-01-12 19:14:44','2023-01-12 19:14:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-16 12:41:34
