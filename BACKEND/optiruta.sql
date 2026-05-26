-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-05-2026 a las 02:47:54
-- Versión del servidor: 8.0.45
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `optiruta`
--
CREATE DATABASE IF NOT EXISTS `optiruta` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `optiruta`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregas`
--

DROP TABLE IF EXISTS `entregas`;
CREATE TABLE IF NOT EXISTS `entregas` (
  `id_entrega` int NOT NULL,
  `cliente` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barrio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repartidor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehiculo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_paquete` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `peso_kg` decimal(10,2) DEFAULT NULL,
  `lat` decimal(10,7) DEFAULT NULL,
  `lng` decimal(10,7) DEFAULT NULL,
  `volumen_m3` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_entrega`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `entregas`
--

INSERT INTO `entregas` (`id_entrega`, `cliente`, `barrio`, `direccion`, `repartidor`, `vehiculo`, `tipo_paquete`, `peso_kg`, `lat`, `lng`, `volumen_m3`) VALUES
(1, 'Carlos Perez', 'El Salado', 'Carrera 14 #142-25', 'Juan Rojas', 'Moto', 'Electronica', 2.50, 4.4645000, -75.1518000, 0.08),
(2, 'Ana Gomez', 'Jordan', 'Calle 42 #8-20', 'Felipe Gomez', 'Carro', 'Ropa', 1.20, 4.4412533, -75.1960645, 0.05),
(3, 'Laura Martinez', 'Piedrapintada', 'Carrera 5 #44-11', 'Camilo Torres', 'Camion', 'Hogar', 4.80, 4.4422168, -75.2101229, 0.30),
(4, 'Andres Lopez', 'Cadiz', 'Calle 30 #14-09', 'Sebastian Ruiz', 'Moto', 'Documentos', 0.50, 4.4374289, -75.2184787, 0.01),
(5, 'Sofia Herrera', 'Ambala', 'Carrera 22 #67-17', 'Juan Rojas', 'Carro', 'Electronica', 3.00, 4.4485000, -75.2014000, 0.08),
(6, 'Miguel Castro', 'La Pola', 'Calle 7 #3-44', 'Felipe Gomez', 'Camion', 'Juguetes', 5.20, 4.4460727, -75.2450234, 0.10),
(7, 'Daniela Vargas', 'Topacio', 'Carrera 18 #105-22', 'Camilo Torres', 'Moto', 'Ropa', 0.90, 4.4432867, -75.1692637, 0.05),
(8, 'Jose Ramirez', 'Boqueron', 'Calle 19 Sur #31-15', 'Sebastian Ruiz', 'Carro', 'Hogar', 6.50, 4.4257923, -75.2529442, 0.30),
(9, 'Natalia Gomez', 'Varsovia', 'Carrera 8 Sur #56-10', 'Juan Rojas', 'Moto', 'Accesorios', 1.10, 4.4262981, -75.1923345, 0.03),
(10, 'Kevin Sanchez', 'Jordan', 'Calle 60 #11-09', 'Felipe Gomez', 'Camion', 'Electronica', 7.30, 4.4430275, -75.2047384, 0.08),
(11, 'Paula Diaz', 'El Salado', 'Carrera 12 #135-19', 'Camilo Torres', 'Moto', 'Ropa', 2.00, 4.4645000, -75.1518000, 0.05),
(12, 'Sergio Molina', 'Cadiz', 'Calle 33 #7-12', 'Sebastian Ruiz', 'Carro', 'Hogar', 8.10, 4.4345744, -75.2223681, 0.30),
(13, 'Valentina Cruz', 'Ambala', 'Carrera 24A #69-55', 'Juan Rojas', 'Camion', 'Juguetes', 3.40, 4.4485000, -75.2014000, 0.10),
(14, 'Cristian Mejia', 'Topacio', 'Calle 108 #18-22', 'Felipe Gomez', 'Moto', 'Electronica', 1.70, 4.4416627, -75.1687800, 0.08),
(15, 'Mariana Silva', 'Varsovia', 'Carrera 9 Sur #58-40', 'Camilo Torres', 'Carro', 'Documentos', 0.70, 4.4310619, -75.2020949, 0.01),
(16, 'Luis Torres', 'La Pola', 'Calle 9 #5-17', 'Sebastian Ruiz', 'Camion', 'Hogar', 9.50, 4.4456944, -75.2428821, 0.30),
(17, 'Camila Rojas', 'Boqueron', 'Carrera 35 Sur #18-20', 'Juan Rojas', 'Moto', 'Accesorios', 2.80, 4.4151315, -75.2625624, 0.03),
(18, 'Diego Herrera', 'Jordan', 'Calle 66 #12-18', 'Felipe Gomez', 'Carro', 'Ropa', 1.30, 4.4414837, -75.1999242, 0.05),
(19, 'Tatiana Lopez', 'Cadiz', 'Carrera 4A #32-10', 'Camilo Torres', 'Camion', 'Electronica', 6.00, 4.4331289, -75.2225403, 0.08),
(20, 'Jhon Martinez', 'El Vergel', 'Calle 79 #21-05', 'Sebastian Ruiz', 'Moto', 'Juguetes', 4.20, 4.4426000, -75.1882000, 0.10),
(21, 'Luisa Fernanda', 'El Salado', 'Carrera 14 #139-30', 'Juan Rojas', 'Carro', 'Ropa', 0.80, 4.4645000, -75.1518000, 0.05),
(22, 'Alberto Rios', 'Jordan', 'Calle 64 #9-12', 'Felipe Gomez', 'Camion', 'Hogar', 5.70, 4.4446013, -75.2033872, 0.30),
(23, 'Juliana Peña', 'Piedrapintada', 'Carrera 4 #48-33', 'Camilo Torres', 'Moto', 'Accesorios', 1.00, 4.4321912, -75.2083903, 0.03),
(24, 'Fabian Castro', 'Cadiz', 'Calle 32 #8-41', 'Sebastian Ruiz', 'Carro', 'Electronica', 2.90, 4.4346931, -75.2229112, 0.08),
(25, 'Diana Ortiz', 'Ambala', 'Carrera 20 #64-08', 'Juan Rojas', 'Camion', 'Juguetes', 3.70, 4.4543269, -75.2030787, 0.10),
(26, 'Manuel Gutierrez', 'La Pola', 'Calle 2 #9-33', 'Felipe Gomez', 'Moto', 'Documentos', 0.40, 4.4502952, -75.2480028, 0.01),
(27, 'Carolina Suarez', 'Topacio', 'Carrera 19 #103-10', 'Camilo Torres', 'Carro', 'Ropa', 1.60, 4.4432867, -75.1692637, 0.05),
(28, 'Hector Moreno', 'Boqueron', 'Calle 18 Sur #28-77', 'Sebastian Ruiz', 'Camion', 'Electronica', 4.90, 4.4141429, -75.2645805, 0.08),
(29, 'Lina Romero', 'Varsovia', 'Carrera 10 Sur #60-29', 'Juan Rojas', 'Moto', 'Hogar', 2.20, 4.4310619, -75.2020949, 0.30),
(30, 'Oscar Rueda', 'El Vergel', 'Calle 81 #17-40', 'Felipe Gomez', 'Carro', 'Accesorios', 1.80, 4.4426000, -75.1882000, 0.03),
(31, 'Monica Lozano', 'El Salado', 'Carrera 11 #141-27', 'Camilo Torres', 'Camion', 'Juguetes', 3.90, 4.4645000, -75.1518000, 0.10),
(32, 'Fernando Vega', 'Jordan', 'Calle 62 #2-18', 'Sebastian Ruiz', 'Moto', 'Ropa', 1.40, 4.4443586, -75.2043772, 0.05),
(33, 'Gabriela Pinto', 'Piedrapintada', 'Carrera 6 #45-55', 'Juan Rojas', 'Carro', 'Electronica', 5.50, 4.4363151, -75.2074940, 0.08),
(34, 'Pablo Acero', 'Cadiz', 'Calle 34 #12-09', 'Felipe Gomez', 'Camion', 'Hogar', 7.00, 4.4341398, -75.2220190, 0.30),
(35, 'Isabel Bernal', 'Ambala', 'Carrera 21 #65-44', 'Camilo Torres', 'Moto', 'Documentos', 0.30, 4.4555898, -75.2022231, 0.01),
(36, 'Ricardo Daza', 'La Pola', 'Calle 4 #7-03', 'Sebastian Ruiz', 'Carro', 'Accesorios', 2.30, 4.4490355, -75.2468770, 0.03),
(37, 'Adriana Fonseca', 'Topacio', 'Carrera 17W #104-19', 'Juan Rojas', 'Camion', 'Juguetes', 4.30, 4.4432867, -75.1692637, 0.10),
(38, 'Rafael Serrano', 'Boqueron', 'Calle 17 Sur #25-66', 'Felipe Gomez', 'Moto', 'Electronica', 3.20, 4.4183691, -75.2598466, 0.08),
(39, 'Sandra Jimenez', 'Varsovia', 'Carrera 9 Sur #61-17', 'Camilo Torres', 'Carro', 'Ropa', 1.10, 4.4310619, -75.2020949, 0.05),
(40, 'Mauricio Parra', 'El Vergel', 'Calle 78 #20-22', 'Sebastian Ruiz', 'Camion', 'Hogar', 6.80, 4.4426000, -75.1882000, 0.30),
(41, 'Elena Cabrera', 'El Salado', 'Carrera 13 #140-08', 'Juan Rojas', 'Moto', 'Accesorios', 0.90, 4.4645000, -75.1518000, 0.03),
(42, 'Javier Pardo', 'Jordan', 'Calle 43 #6-71', 'Felipe Gomez', 'Carro', 'Documentos', 0.60, 4.4412533, -75.1960645, 0.01),
(43, 'Veronica Salazar', 'Piedrapintada', 'Carrera 5 #46-06', 'Camilo Torres', 'Camion', 'Electronica', 7.60, 4.4422168, -75.2101229, 0.08),
(44, 'Arturo Bautista', 'Cadiz', 'Calle 31 #13-34', 'Sebastian Ruiz', 'Moto', 'Juguetes', 3.80, 4.4372241, -75.2228702, 0.10),
(45, 'Claudia Tellez', 'Ambala', 'Carrera 23 #68-12', 'Juan Rojas', 'Carro', 'Ropa', 2.10, 4.4485000, -75.2014000, 0.05),
(46, 'German Niño', 'La Pola', 'Calle 8 #4-28', 'Felipe Gomez', 'Camion', 'Hogar', 8.90, 4.4467811, -75.2432792, 0.30),
(47, 'Paola Angarita', 'Topacio', 'Carrera 18W #106-44', 'Camilo Torres', 'Moto', 'Accesorios', 1.50, 4.4432867, -75.1692637, 0.03),
(48, 'Emilio Correa', 'Boqueron', 'Calle 19 Sur #29-56', 'Sebastian Ruiz', 'Carro', 'Electronica', 2.40, 4.4257923, -75.2529442, 0.08),
(49, 'Rosa Maria Florez', 'Varsovia', 'Carrera 11 Sur #59-07', 'Juan Rojas', 'Camion', 'Juguetes', 5.10, 4.4310619, -75.2020949, 0.10),
(50, 'Wilson Salcedo', 'El Vergel', 'Calle 80 #19-15', 'Felipe Gomez', 'Moto', 'Ropa', 1.70, 4.4442577, -75.1882361, 0.05),
(51, 'Nataly Estrada', 'El Salado', 'Carrera 14 #140-16', 'Camilo Torres', 'Carro', 'Hogar', 5.90, 4.4645000, -75.1518000, 0.30),
(52, 'Enrique Millan', 'Jordan', 'Calle 68 #11-09', 'Sebastian Ruiz', 'Camion', 'Documentos', 0.80, 4.4443362, -75.1993272, 0.01),
(53, 'Marcela Puentes', 'Piedrapintada', 'Carrera 6 #48-50', 'Juan Rojas', 'Moto', 'Accesorios', 2.60, 4.4376988, -75.2143556, 0.03),
(54, 'Mario Contreras', 'Cadiz', 'Calle 33 #13-33', 'Felipe Gomez', 'Carro', 'Juguetes', 4.40, 4.4345744, -75.2223681, 0.10),
(55, 'Liliana Barbosa', 'Ambala', 'Carrera 22 #65-21', 'Camilo Torres', 'Camion', 'Ropa', 1.30, 4.4485000, -75.2014000, 0.05),
(56, 'Alexander Prieto', 'La Pola', 'Calle 5 #8-47', 'Sebastian Ruiz', 'Moto', 'Electronica', 6.20, 4.4483672, -75.2457680, 0.08),
(57, 'Diana Carolina Mora', 'Topacio', 'Carrera 19 #104-08', 'Juan Rojas', 'Carro', 'Hogar', 7.40, 4.4432867, -75.1692637, 0.30),
(58, 'Hernando Quintero', 'Boqueron', 'Calle 17 Sur #28-62', 'Felipe Gomez', 'Camion', 'Accesorios', 2.00, 4.4183691, -75.2598466, 0.03),
(59, 'Gloria Amaya', 'Varsovia', 'Carrera 8 Sur #60-13', 'Camilo Torres', 'Moto', 'Juguetes', 4.60, 4.4278056, -75.2008691, 0.10),
(60, 'Armando Espitia', 'El Vergel', 'Calle 79 #18-40', 'Sebastian Ruiz', 'Carro', 'Documentos', 0.70, 4.4426000, -75.1882000, 0.01),
(61, 'Luz Aida Fajardo', 'El Salado', 'Carrera 12 #142-29', 'Juan Rojas', 'Camion', 'Ropa', 1.80, 4.4645000, -75.1518000, 0.05),
(62, 'Cesar Augusto Rojas', 'Jordan', 'Calle 44 #11-25', 'Felipe Gomez', 'Moto', 'Electronica', 3.50, 4.4412533, -75.1960645, 0.08),
(63, 'Maritza Linares', 'Piedrapintada', 'Carrera 4 #45-18', 'Camilo Torres', 'Carro', 'Hogar', 6.10, 4.4331031, -75.2063781, 0.30),
(64, 'Ramiro Castellanos', 'Cadiz', 'Calle 34 #8-44', 'Sebastian Ruiz', 'Camion', 'Accesorios', 1.40, 4.4341398, -75.2220190, 0.03),
(65, 'Yolanda Umaña', 'Ambala', 'Carrera 21A #67-07', 'Juan Rojas', 'Moto', 'Juguetes', 5.50, 4.4485000, -75.2014000, 0.10),
(66, 'Ivan Velasco', 'La Pola', 'Calle 6 #7-31', 'Felipe Gomez', 'Carro', 'Ropa', 1.90, 4.4479334, -75.2449341, 0.05),
(67, 'Andrea Pinzon', 'Topacio', 'Carrera 18W #103-19', 'Camilo Torres', 'Camion', 'Documentos', 0.50, 4.4432867, -75.1692637, 0.01),
(68, 'Luis Alfredo Mora', 'Boqueron', 'Calle 18 Sur #30-50', 'Sebastian Ruiz', 'Moto', 'Electronica', 8.20, 4.4124273, -75.2657412, 0.08),
(69, 'Sonia Beltran', 'Varsovia', 'Carrera 9 Sur #59-41', 'Juan Rojas', 'Carro', 'Hogar', 7.70, 4.4310619, -75.2020949, 0.30),
(70, 'Alirio Suarez', 'El Vergel', 'Calle 78 #19-12', 'Felipe Gomez', 'Camion', 'Accesorios', 1.20, 4.4426000, -75.1882000, 0.03),
(71, 'Margarita Rosa Blanco', 'El Salado', 'Carrera 13 #143-33', 'Camilo Torres', 'Moto', 'Juguetes', 3.90, 4.4645000, -75.1518000, 0.10),
(72, 'Rogelio Pineda', 'Jordan', 'Calle 43 #7-27', 'Sebastian Ruiz', 'Carro', 'Ropa', 2.20, 4.4412533, -75.1960645, 0.05),
(73, 'Teresa Guerrero', 'Piedrapintada', 'Carrera 4 #44-15', 'Juan Rojas', 'Camion', 'Electronica', 4.70, 4.4321912, -75.2083903, 0.08),
(74, 'Elkin Patiño', 'Cadiz', 'Calle 32 #14-08', 'Felipe Gomez', 'Moto', 'Hogar', 9.10, 4.4346931, -75.2229112, 0.30),
(75, 'Nidia Zamora', 'Ambala', 'Carrera 22 #64-22', 'Camilo Torres', 'Carro', 'Documentos', 0.40, 4.4485000, -75.2014000, 0.01),
(76, 'Jesus Maria Vega', 'La Pola', 'Calle 3 #11-49', 'Sebastian Ruiz', 'Camion', 'Accesorios', 2.70, 4.4498994, -75.2471878, 0.03),
(77, 'Martha Cecilia Ortiz', 'Topacio', 'Carrera 19 #105-26', 'Juan Rojas', 'Moto', 'Juguetes', 3.20, 4.4432867, -75.1692637, 0.10),
(78, 'Gustavo Adolfo Lara', 'Boqueron', 'Calle 19 Sur #27-73', 'Felipe Gomez', 'Carro', 'Ropa', 1.60, 4.4257923, -75.2529442, 0.05),
(79, 'Pilar Martinez', 'Varsovia', 'Carrera 10 Sur #58-11', 'Camilo Torres', 'Camion', 'Electronica', 5.80, 4.4310619, -75.2020949, 0.08),
(80, 'David Alonso Rios', 'El Vergel', 'Calle 77 #21-35', 'Sebastian Ruiz', 'Moto', 'Hogar', 6.40, 4.4426000, -75.1882000, 0.30),
(81, 'Ingrid Johanna Diaz', 'El Salado', 'Carrera 14 #141-18', 'Juan Rojas', 'Carro', 'Accesorios', 2.30, 4.4645000, -75.1518000, 0.03),
(82, 'Jairo Enrique Ospina', 'Jordan', 'Calle 61 #12-66', 'Felipe Gomez', 'Camion', 'Documentos', 0.90, 4.4423779, -75.2040014, 0.01),
(83, 'Amparo Cardenas', 'Piedrapintada', 'Carrera 5 #48-20', 'Camilo Torres', 'Moto', 'Juguetes', 4.00, 4.4343775, -75.2085346, 0.10),
(84, 'Jaime Andres Parra', 'Cadiz', 'Calle 33 #14-54', 'Sebastian Ruiz', 'Carro', 'Ropa', 1.00, 4.4357608, -75.2216735, 0.05),
(85, 'Catalina Villalobos', 'Ambala', 'Carrera 20 #68-08', 'Juan Rojas', 'Camion', 'Electronica', 7.10, 4.4543269, -75.2030787, 0.08),
(86, 'Heriberto Fuentes', 'La Pola', 'Calle 4 #10-37', 'Felipe Gomez', 'Moto', 'Hogar', 5.30, 4.4490355, -75.2468770, 0.30),
(87, 'Aura Milena Sanchez', 'Topacio', 'Carrera 18W #105-44', 'Camilo Torres', 'Carro', 'Accesorios', 1.50, 4.4432867, -75.1692637, 0.03),
(88, 'Jorge Eduardo Mejia', 'Boqueron', 'Calle 18 Sur #26-29', 'Sebastian Ruiz', 'Camion', 'Documentos', 0.60, 4.4141429, -75.2645805, 0.01),
(89, 'Ruby Esther Mora', 'Varsovia', 'Carrera 9 Sur #60-16', 'Juan Rojas', 'Moto', 'Ropa', 2.40, 4.4310619, -75.2020949, 0.05),
(90, 'Henry Lozano', 'El Vergel', 'Calle 80 #18-10', 'Felipe Gomez', 'Carro', 'Electronica', 3.60, 4.4442577, -75.1882361, 0.08),
(91, 'Dora Luz Quintero', 'El Salado', 'Carrera 12 #139-41', 'Camilo Torres', 'Camion', 'Hogar', 6.90, 4.4645000, -75.1518000, 0.30),
(92, 'Carlos Julio Avila', 'Jordan', 'Calle 62 #11-22', 'Sebastian Ruiz', 'Moto', 'Accesorios', 2.10, 4.4443586, -75.2043772, 0.03),
(93, 'Nohora Stella Gomez', 'Piedrapintada', 'Carrera 4 #47-33', 'Juan Rojas', 'Carro', 'Juguetes', 4.50, 4.4321912, -75.2083903, 0.10),
(94, 'Ciro Alfonso Prieto', 'Cadiz', 'Calle 32 #13-15', 'Felipe Gomez', 'Camion', 'Documentos', 0.80, 4.4346931, -75.2229112, 0.01),
(95, 'Flor Maria Angarita', 'Ambala', 'Carrera 22A #66-28', 'Camilo Torres', 'Moto', 'Ropa', 1.70, 4.4485000, -75.2014000, 0.05),
(96, 'Ramon Ortiz', 'El Carmen', 'Carrera 4A #21-35', 'Camilo Torres', 'Carro', 'Documentos', 0.60, 4.4445000, -75.2346000, 0.01),
(97, 'Eliana Paez', 'Los Alpes', 'Carrera 5 #14-88', 'Sebastian Ruiz', 'Camion', 'Electronica', 3.30, 4.4566748, -75.2029944, 0.08),
(98, 'Hugo Lora', 'El Salado', 'Carrera 13W #141-09', 'Juan Rojas', 'Moto', 'Hogar', 7.80, 4.4645000, -75.1518000, 0.30),
(99, 'Claudia Uribe', 'Piedrapintada', 'Carrera 6 #44-22', 'Felipe Gomez', 'Carro', 'Ropa', 1.90, 4.4363151, -75.2074940, 0.05),
(100, 'Gabriel Parra', 'Topacio', 'Carrera 18 #104-15', 'Camilo Torres', 'Camion', 'Juguetes', 4.10, 4.4432867, -75.1692637, 0.10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `placa` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacidad_kg` float NOT NULL,
  `capacidad_volumen_m3` float NOT NULL DEFAULT '1',
  `disponible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `tipo`, `placa`, `capacidad_kg`, `capacidad_volumen_m3`, `disponible`) VALUES
(1, 'Moto', 'MOT-101', 10, 0.1, 1),
(2, 'Moto', 'MOT-102', 10, 0.1, 1),
(3, 'Moto', 'MOT-103', 10, 0.1, 1),
(4, 'Carro', 'CAR-201', 50, 1.5, 1),
(5, 'Carro', 'CAR-202', 50, 1.5, 1),
(6, 'Camion', 'CAM-301', 200, 10, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
