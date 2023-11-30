DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(45) NOT NULL,
  `pw` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `account` VALUES ('admin','admin');

DROP TABLE IF EXISTS `system_a_files`;
CREATE TABLE `system_a_files` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `file_item1` varchar(45) DEFAULT NULL,
  `file_item2` varchar(45) DEFAULT NULL,
  `file_item3` varchar(45) DEFAULT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_content` varchar(100) NOT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
