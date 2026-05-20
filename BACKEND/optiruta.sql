-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 20-05-2026 a las 17:58:18
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregas`
--

DROP TABLE IF EXISTS `entregas`;
CREATE TABLE IF NOT EXISTS `entregas` (
  `id_entrega` int NOT NULL,
  `cliente` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barrio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repartidor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehiculo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_paquete` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `peso_kg` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_entrega`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `entregas`
--

INSERT INTO `entregas` (`id_entrega`, `cliente`, `barrio`, `direccion`, `repartidor`, `vehiculo`, `tipo_paquete`, `peso_kg`) VALUES
(10, 'Kevin Sanchez', 'Jordan', 'Calle 60 #11-09', 'Felipe Gomez', 'Van', 'Electronica', 7.30),
(1, 'Carlos Perez', 'El Salado', 'Cra 5 #12-45', 'Juan Rojas', 'Moto', 'Electronica', 2.50),
(2, 'Ana Gomez', 'Jordan', 'Calle 42 #8-20', 'Felipe Gomez', 'Van', 'Ropa', 1.20),
(3, 'Laura Martinez', 'Piedrapintada', 'Cra 10 #55-11', 'Camilo Torres', 'Moto', 'Hogar', 4.80),
(4, 'Andres Lopez', 'Cadiz', 'Calle 30 #14-09', 'Sebastian Ruiz', 'Bicicleta', 'Documentos', 0.50),
(5, 'Sofia Herrera', 'Ambala', 'Cra 15 #90-17', 'Juan Rojas', 'Moto', 'Electronica', 3.00),
(6, 'Miguel Castro', 'La Pola', 'Calle 7 #3-44', 'Felipe Gomez', 'Van', 'Juguetes', 5.20),
(7, 'Daniela Vargas', 'Topacio', 'Cra 8 #65-22', 'Camilo Torres', 'Moto', 'Ropa', 0.90),
(11, 'Paula Diaz', 'El Salado', 'Cra 3 #22-19', 'Camilo Torres', 'Moto', 'Ropa', 2.00),
(8, 'Jose Ramirez', 'Boqueron', 'Calle 120 #20-15', 'Sebastian Ruiz', 'Moto', 'Hogar', 6.50),
(12, 'Sergio Molina', 'Cadiz', 'Calle 15 #7-12', 'Sebastian Ruiz', 'Van', 'Hogar', 8.10),
(13, 'Valentina Cruz', 'Ambala', 'Cra 20 #33-55', 'Juan Rojas', 'Moto', 'Juguetes', 3.40),
(14, 'Cristian Mejia', 'Topacio', 'Calle 70 #18-22', 'Felipe Gomez', 'Moto', 'Electronica', 1.70),
(9, 'Natalia Gomez', 'Varsovia', 'Cra 19 #40-10', 'Juan Rojas', 'Bicicleta', 'Accesorios', 1.10),
(15, 'Mariana Silva', 'Varsovia', 'Cra 11 #25-40', 'Camilo Torres', 'Bicicleta', 'Documentos', 0.70),
(16, 'Luis Torres', 'La Pola', 'Calle 9 #5-17', 'Sebastian Ruiz', 'Van', 'Hogar', 9.50),
(17, 'Camila Rojas', 'Boqueron', 'Cra 50 #44-20', 'Juan Rojas', 'Moto', 'Accesorios', 2.80),
(18, 'Diego Herrera', 'Jordan', 'Calle 12 #66-18', 'Felipe Gomez', 'Moto', 'Ropa', 1.30),
(19, 'Tatiana Lopez', 'Cadiz', 'Cra 16 #14-10', 'Camilo Torres', 'Van', 'Electronica', 6.00),
(20, 'Jhon Martinez', 'El Vergel', 'Calle 22 #31-05', 'Sebastian Ruiz', 'Moto', 'Juguetes', 4.20),
(21, 'Luisa Fernanda', 'El Salado', 'Cra 7 #48-30', 'Juan Rojas', 'Moto', 'Ropa', 0.80),
(22, 'Alberto Rios', 'Jordan', 'Calle 84 #9-12', 'Felipe Gomez', 'Van', 'Hogar', 5.70),
(23, 'Juliana Peña', 'Piedrapintada', 'Cra 25 #12-33', 'Camilo Torres', 'Bicicleta', 'Accesorios', 1.00),
(24, 'Fabian Castro', 'Cadiz', 'Calle 99 #8-41', 'Sebastian Ruiz', 'Moto', 'Electronica', 2.90),
(25, 'Diana Ortiz', 'Ambala', 'Cra 13 #70-08', 'Juan Rojas', 'Moto', 'Juguetes', 3.70),
(26, 'Manuel Gutierrez', 'La Pola', 'Calle 2 #9-33', 'Felipe Gomez', 'Van', 'Documentos', 0.40),
(27, 'Carolina Suarez', 'Topacio', 'Cra 42 #56-10', 'Camilo Torres', 'Moto', 'Ropa', 1.60),
(28, 'Hector Moreno', 'Boqueron', 'Calle 111 #5-77', 'Sebastian Ruiz', 'Moto', 'Electronica', 4.90),
(29, 'Lina Romero', 'Varsovia', 'Cra 22 #15-29', 'Juan Rojas', 'Bicicleta', 'Hogar', 2.20),
(30, 'Oscar Rueda', 'El Vergel', 'Calle 33 #44-11', 'Felipe Gomez', 'Van', 'Accesorios', 1.80),
(31, 'Monica Lozano', 'El Salado', 'Cra 18 #3-27', 'Camilo Torres', 'Moto', 'Juguetes', 3.90),
(32, 'Fernando Vega', 'Jordan', 'Calle 76 #2-18', 'Sebastian Ruiz', 'Moto', 'Ropa', 1.40),
(33, 'Gabriela Pinto', 'Piedrapintada', 'Cra 33 #9-55', 'Juan Rojas', 'Van', 'Electronica', 5.50),
(34, 'Pablo Acero', 'Cadiz', 'Calle 5 #12-09', 'Felipe Gomez', 'Moto', 'Hogar', 7.00),
(35, 'Isabel Bernal', 'Ambala', 'Cra 40 #20-44', 'Camilo Torres', 'Bicicleta', 'Documentos', 0.30),
(36, 'Ricardo Daza', 'La Pola', 'Calle 61 #17-03', 'Sebastian Ruiz', 'Van', 'Accesorios', 2.30),
(37, 'Adriana Fonseca', 'Topacio', 'Cra 21 #80-19', 'Juan Rojas', 'Moto', 'Juguetes', 4.30),
(38, 'Rafael Serrano', 'Boqueron', 'Calle 128 #3-66', 'Felipe Gomez', 'Moto', 'Electronica', 3.20),
(39, 'Sandra Jimenez', 'Varsovia', 'Cra 14 #35-17', 'Camilo Torres', 'Van', 'Ropa', 1.10),
(40, 'Mauricio Parra', 'El Vergel', 'Calle 45 #88-22', 'Sebastian Ruiz', 'Moto', 'Hogar', 6.80),
(41, 'Elena Cabrera', 'El Salado', 'Cra 2 #14-08', 'Juan Rojas', 'Bicicleta', 'Accesorios', 0.90),
(42, 'Javier Pardo', 'Jordan', 'Calle 53 #6-71', 'Felipe Gomez', 'Moto', 'Documentos', 0.60),
(43, 'Veronica Salazar', 'Piedrapintada', 'Cra 47 #22-06', 'Camilo Torres', 'Van', 'Electronica', 7.60),
(44, 'Arturo Bautista', 'Cadiz', 'Calle 19 #77-34', 'Sebastian Ruiz', 'Moto', 'Juguetes', 3.80),
(45, 'Claudia Tellez', 'Ambala', 'Cra 36 #50-12', 'Juan Rojas', 'Moto', 'Ropa', 2.10),
(46, 'German Niño', 'La Pola', 'Calle 8 #4-28', 'Felipe Gomez', 'Van', 'Hogar', 8.90),
(47, 'Paola Angarita', 'Topacio', 'Cra 27 #91-44', 'Camilo Torres', 'Moto', 'Accesorios', 1.50),
(48, 'Emilio Correa', 'Boqueron', 'Calle 115 #10-56', 'Sebastian Ruiz', 'Bicicleta', 'Electronica', 2.40),
(49, 'Rosa Maria Florez', 'Varsovia', 'Cra 29 #42-07', 'Juan Rojas', 'Van', 'Juguetes', 5.10),
(50, 'Wilson Salcedo', 'El Vergel', 'Calle 37 #28-15', 'Felipe Gomez', 'Moto', 'Ropa', 1.70),
(51, 'Nataly Estrada', 'El Salado', 'Cra 44 #33-16', 'Camilo Torres', 'Moto', 'Hogar', 5.90),
(52, 'Enrique Millan', 'Jordan', 'Calle 94 #21-09', 'Sebastian Ruiz', 'Van', 'Documentos', 0.80),
(53, 'Marcela Puentes', 'Piedrapintada', 'Cra 31 #11-50', 'Juan Rojas', 'Moto', 'Accesorios', 2.60),
(54, 'Mario Contreras', 'Cadiz', 'Calle 26 #45-33', 'Felipe Gomez', 'Moto', 'Juguetes', 4.40),
(55, 'Liliana Barbosa', 'Ambala', 'Cra 48 #59-21', 'Camilo Torres', 'Bicicleta', 'Ropa', 1.30),
(56, 'Alexander Prieto', 'La Pola', 'Calle 13 #22-47', 'Sebastian Ruiz', 'Van', 'Electronica', 6.20),
(57, 'Diana Carolina Mora', 'Topacio', 'Cra 12 #75-08', 'Juan Rojas', 'Moto', 'Hogar', 7.40),
(58, 'Hernando Quintero', 'Boqueron', 'Calle 103 #14-62', 'Felipe Gomez', 'Moto', 'Accesorios', 2.00),
(59, 'Gloria Amaya', 'Varsovia', 'Cra 5 #68-13', 'Camilo Torres', 'Van', 'Juguetes', 4.60),
(60, 'Armando Espitia', 'El Vergel', 'Calle 56 #17-40', 'Sebastian Ruiz', 'Moto', 'Documentos', 0.70),
(61, 'Luz Aida Fajardo', 'El Salado', 'Cra 39 #3-29', 'Juan Rojas', 'Moto', 'Ropa', 1.80),
(62, 'Cesar Augusto Rojas', 'Jordan', 'Calle 47 #11-25', 'Felipe Gomez', 'Van', 'Electronica', 3.50),
(63, 'Maritza Linares', 'Piedrapintada', 'Cra 50 #30-18', 'Camilo Torres', 'Bicicleta', 'Hogar', 6.10),
(64, 'Ramiro Castellanos', 'Cadiz', 'Calle 71 #9-44', 'Sebastian Ruiz', 'Moto', 'Accesorios', 1.40),
(65, 'Yolanda Umaña', 'Ambala', 'Cra 23 #45-07', 'Juan Rojas', 'Van', 'Juguetes', 5.50),
(66, 'Ivan Velasco', 'La Pola', 'Calle 20 #8-31', 'Felipe Gomez', 'Moto', 'Ropa', 1.90),
(67, 'Andrea Pinzon', 'Topacio', 'Cra 28 #62-19', 'Camilo Torres', 'Moto', 'Documentos', 0.50),
(68, 'Luis Alfredo Mora', 'Boqueron', 'Calle 132 #15-50', 'Sebastian Ruiz', 'Van', 'Electronica', 8.20),
(69, 'Sonia Beltran', 'Varsovia', 'Cra 17 #22-41', 'Juan Rojas', 'Moto', 'Hogar', 7.70),
(70, 'Alirio Suarez', 'El Vergel', 'Calle 48 #36-12', 'Felipe Gomez', 'Bicicleta', 'Accesorios', 1.20),
(71, 'Margarita Rosa Blanco', 'El Salado', 'Cra 52 #10-33', 'Camilo Torres', 'Van', 'Juguetes', 3.90),
(72, 'Rogelio Pineda', 'Jordan', 'Calle 29 #55-27', 'Sebastian Ruiz', 'Moto', 'Ropa', 2.20),
(73, 'Teresa Guerrero', 'Piedrapintada', 'Cra 9 #38-15', 'Juan Rojas', 'Moto', 'Electronica', 4.70),
(74, 'Elkin Patiño', 'Cadiz', 'Calle 64 #3-08', 'Felipe Gomez', 'Van', 'Hogar', 9.10),
(75, 'Nidia Zamora', 'Ambala', 'Cra 41 #80-22', 'Camilo Torres', 'Moto', 'Documentos', 0.40),
(76, 'Jesus Maria Vega', 'La Pola', 'Calle 11 #16-49', 'Sebastian Ruiz', 'Moto', 'Accesorios', 2.70),
(77, 'Martha Cecilia Ortiz', 'Topacio', 'Cra 34 #14-26', 'Juan Rojas', 'Bicicleta', 'Juguetes', 3.20),
(78, 'Gustavo Adolfo Lara', 'Boqueron', 'Calle 106 #8-73', 'Felipe Gomez', 'Van', 'Ropa', 1.60),
(79, 'Pilar Martinez', 'Varsovia', 'Cra 38 #60-11', 'Camilo Torres', 'Moto', 'Electronica', 5.80),
(80, 'David Alonso Rios', 'El Vergel', 'Calle 77 #19-35', 'Sebastian Ruiz', 'Moto', 'Hogar', 6.40),
(81, 'Ingrid Johanna Diaz', 'El Salado', 'Cra 49 #5-18', 'Juan Rojas', 'Van', 'Accesorios', 2.30),
(82, 'Jairo Enrique Ospina', 'Jordan', 'Calle 90 #12-66', 'Felipe Gomez', 'Moto', 'Documentos', 0.90),
(83, 'Amparo Cardenas', 'Piedrapintada', 'Cra 26 #44-20', 'Camilo Torres', 'Moto', 'Juguetes', 4.00),
(84, 'Jaime Andres Parra', 'Cadiz', 'Calle 18 #70-54', 'Sebastian Ruiz', 'Bicicleta', 'Ropa', 1.00),
(85, 'Catalina Villalobos', 'Ambala', 'Cra 30 #25-08', 'Juan Rojas', 'Van', 'Electronica', 7.10),
(86, 'Heriberto Fuentes', 'La Pola', 'Calle 4 #11-37', 'Felipe Gomez', 'Moto', 'Hogar', 5.30),
(87, 'Aura Milena Sanchez', 'Topacio', 'Cra 45 #30-44', 'Camilo Torres', 'Moto', 'Accesorios', 1.50),
(88, 'Jorge Eduardo Mejia', 'Boqueron', 'Calle 124 #17-29', 'Sebastian Ruiz', 'Van', 'Documentos', 0.60),
(89, 'Ruby Esther Mora', 'Varsovia', 'Cra 15 #75-16', 'Juan Rojas', 'Moto', 'Ropa', 2.40),
(90, 'Henry Lozano', 'El Vergel', 'Calle 40 #52-10', 'Felipe Gomez', 'Moto', 'Electronica', 3.60),
(91, 'Dora Luz Quintero', 'El Salado', 'Cra 46 #23-41', 'Camilo Torres', 'Bicicleta', 'Hogar', 6.90),
(92, 'Carlos Julio Avila', 'Jordan', 'Calle 81 #33-22', 'Sebastian Ruiz', 'Van', 'Accesorios', 2.10),
(93, 'Nohora Stella Gomez', 'Piedrapintada', 'Cra 22 #50-33', 'Juan Rojas', 'Moto', 'Juguetes', 4.50),
(94, 'Ciro Alfonso Prieto', 'Cadiz', 'Calle 74 #19-15', 'Felipe Gomez', 'Moto', 'Documentos', 0.80),
(95, 'Flor Maria Angarita', 'Ambala', 'Cra 37 #60-28', 'Camilo Torres', 'Van', 'Ropa', 1.70),
(96, 'Ramon Ortiz', 'Villa Rica', 'Cra 9 #23-01', 'Camilo Torres', 'Bicicleta', 'Documentos', 0.60),
(97, 'Eliana Paez', 'Los Alpes', 'Calle 71 #15-88', 'Sebastian Ruiz', 'Moto', 'Electronica', 3.30),
(98, 'Hugo Lora', 'El Salado', 'Cra 12 #55-09', 'Juan Rojas', 'Van', 'Hogar', 7.80),
(99, 'Claudia Uribe', 'Piedrapintada', 'Calle 44 #7-22', 'Felipe Gomez', 'Moto', 'Ropa', 1.90),
(100, 'Gabriel Parra', 'Topacio', 'Cra 6 #28-15', 'Camilo Torres', 'Moto', 'Juguetes', 4.10);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
