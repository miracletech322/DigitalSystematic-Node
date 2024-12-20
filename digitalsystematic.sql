/*
 Navicat Premium Dump SQL

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : digitalsystematic

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 20/12/2024 06:05:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recommends
-- ----------------------------
DROP TABLE IF EXISTS `recommends`;
CREATE TABLE `recommends`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NULL DEFAULT NULL,
  `userId` int NULL DEFAULT NULL,
  `createdAt` datetime NULL DEFAULT current_timestamp,
  `updatedAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommends
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `level` int NULL DEFAULT 0,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `managerName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `managerNumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `parentLevel` int NULL DEFAULT 0,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` enum('User','Admin','Manager') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'User',
  `createdAt` datetime NULL DEFAULT current_timestamp,
  `updatedAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 0, '', 'Admin', '', 0, 'admin@admin.com', '$2a$10$kPMAPOa0zBCjAtewsuzRnOr5R3gRvTWuBBwb11ITEQ3zlE4QCAuIS', 'Admin', '2024-12-20 03:05:21', '2024-12-20 03:05:21');

SET FOREIGN_KEY_CHECKS = 1;
