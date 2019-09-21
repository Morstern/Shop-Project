CREATE DATABASE `shop` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `clients` (
  `nickname` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `firstname` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `adress` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `postcode` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `gender` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `facebookfan` tinyint(4) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;


CREATE TABLE `orders` (
  `idorder` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `orderdate` date DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `clientNickname` varchar(75) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  KEY `clientNickname` (`clientNickname`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`clientNickname`) REFERENCES `clients` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
