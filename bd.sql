-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.18-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bluepoint2bd
CREATE DATABASE IF NOT EXISTS `bluepoint2bd` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `bluepoint2bd`;

-- Volcando estructura para tabla bluepoint2bd.insurance
CREATE TABLE IF NOT EXISTS `insurance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `photo` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `position` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='crear campos para la estructura de extraccion de datos por la tarjeta, aqui se determina como se va extraer la informacion de la tarjeta cuando el usuario cargue la foto y seleccione el seguro \r\n';

-- Volcando datos para la tabla bluepoint2bd.insurance: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;
INSERT INTO `insurance` (`id`, `name`, `photo`, `position`) VALUES
	(1, 'Humana', NULL, '28'),
	(2, 'United Health', NULL, '28'),
	(3, 'Kaiser Foundation', NULL, '28'),
	(4, 'Anthem Inc', NULL, '28'),
	(5, 'Centene Corporation', NULL, '28'),
	(6, 'CVS', NULL, '28'),
	(7, 'Health Care Service Corporation (HCSC)', NULL, '28'),
	(8, 'CIGNA', NULL, '28'),
	(9, 'Molina Healthcare', NULL, '28'),
	(10, 'Independence Health Group', NULL, '28'),
	(11, 'Guidewell Mutual Holding', NULL, '28'),
	(12, 'California Physicians Service', NULL, '28'),
	(13, 'Highmark Group', NULL, '28'),
	(14, 'Blue Cross Blue Shield of Michigan', NULL, '28'),
	(15, 'Blue Cross of California', NULL, '28'),
	(16, 'Blue Cross Blue Shield of New Jersey', NULL, '28'),
	(17, 'Caresource', NULL, '28'),
	(18, 'UPMC Health System', NULL, '28'),
	(19, 'Health Net of California', NULL, '28'),
	(20, 'Carefirst Inc.', NULL, '28'),
	(21, 'Blue Cross Blue Shield of North Carolina', NULL, '28'),
	(22, 'Metropolitan', NULL, '28'),
	(23, 'Local Initiative Health Authority', NULL, '28'),
	(24, 'Blue Cross Blue Shield of Massachusetts', NULL, '28'),
	(25, 'Blue Cross Blue Shield of Tennessee', NULL, '28');
/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;

-- Volcando estructura para tabla bluepoint2bd.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `last` text COLLATE utf8_spanish2_ci NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `photo` text CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `state` int(11) NOT NULL DEFAULT 1 COMMENT 'activo = 1 o inactivo = 0 ',
  `last_login` datetime DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone` text CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `modo` text COLLATE utf8_spanish2_ci NOT NULL COMMENT 'directa, google, facebook',
  `email_encriptado` text COLLATE utf8_spanish2_ci NOT NULL,
  `profile` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT '0 = administrador, 1 = estandar',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla bluepoint2bd.users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `name`, `last`, `password`, `photo`, `state`, `last_login`, `date_creation`, `phone`, `modo`, `email_encriptado`, `profile`) VALUES
	(1, 'jdelgadilloz1905@gmail.com', 'Jorge Luis', 'Delgadillo', '$2a$07$asxx54ahjppf45sd87a5auP6B3tNcJoZA7LSAvd/JeANhDDO.7SKm', 'https://revistaitnow.com/wp-content/uploads/2020/07/pexels-sebastiaan-stam-1482476-770x467.jpg', 1, NULL, '2021-10-20 17:09:59', '23423423', 'directo', '8fb14cb673a4608b7efd4e5d35e84c84', '0'),
	(2, 'fabidyan92@gmail.com', 'Fabi ', 'Suarez', '$2a$07$asxx54ahjppf45sd87a5aub7LdtrTXnn.ZQdALsthndsluPeTbv.a', 'https://estudio57.net/apirestprujuladesarrollo/views/img/anuncios/Ucp8FeHtKLoJszrSyxED.jpg', 1, NULL, '2021-10-21 12:13:53', '234234234', 'directo', '35009f158c338c4cdd80367fa988d11c', '0'),
	(3, 'admin@admin.com', 'Super ', 'Admin', '$2a$07$asxx54ahjppf45sd87a5auHhDisdvuSxcDBsaoZYMwJrghJ3jkICW', 'https://estudio57.net/apirestprujuladesarrollo/views/img/anuncios/Ucp8FeHtKLoJszrSyxED.jpg', 0, '2021-10-21 10:09:32', '2021-10-21 11:46:04', '56161561', 'directo', '35009f158c338cdfgdf4cdd80367fa988d11c', '1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
