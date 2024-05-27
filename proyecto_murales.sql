-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2024 a las 01:19:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_murales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muros`
--

CREATE TABLE `muros` (
  `id` int(11) NOT NULL,
  `UUID` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `muros`
--

INSERT INTO `muros` (`id`, `UUID`) VALUES
(1, 'notitas664e8e88707d7'),
(2, 'notitas664e8f993b8c8'),
(3, 'notitas664e8faaec6a1'),
(4, 'notitas664f95846e568'),
(5, 'notitas66550d09d0d16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notitas`
--

CREATE TABLE `notitas` (
  `id` int(11) NOT NULL,
  `muro` text NOT NULL,
  `mensaje` text NOT NULL,
  `posX` float NOT NULL,
  `posY` float NOT NULL,
  `color` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notitas`
--

INSERT INTO `notitas` (`id`, `muro`, `mensaje`, `posX`, `posY`, `color`) VALUES
(1, 'notitas664e8e88707d7', 'hello', 0, 0, ''),
(2, 'notitas664f95846e568', 'Hello There', 0, 0, ''),
(3, 'notitas664f95846e568', 'hello', 0, 0, ''),
(4, 'notitas66550d09d0d16', 'a', 0, 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `muros`
--
ALTER TABLE `muros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notitas`
--
ALTER TABLE `notitas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `muros`
--
ALTER TABLE `muros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `notitas`
--
ALTER TABLE `notitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
