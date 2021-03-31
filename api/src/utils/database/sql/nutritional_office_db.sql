--
-- Base de datos: ` nutritional_office_db`
--

DROP DATABASE IF EXISTS nutritional_office_db;
CREATE DATABASE nutritional_office_db;
USE nutritional_office_db;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expedients`
--

CREATE TABLE `expedients` (
  `id_expedient` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `marital_status` tinyint(4) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `occupation` varchar(50) NOT NULL,
  `register_date` date NOT NULL DEFAULT current_timestamp(),
  `inherited_antecedents` text NOT NULL,
  `not_pathological_antecedents` text NOT NULL,
  `perinatal_antecedents` text NOT NULL,
  `gynecology_obstetrics_antecedents` text NOT NULL,
  `pathological_antecedents` text NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `id_note` int(11) NOT NULL,
  `register_date` date NOT NULL DEFAULT current_timestamp(),
  `weight` float NOT NULL,
  `size` float NOT NULL,
  `waist` float NOT NULL,
  `hip` float NOT NULL,
  `blood_pressure` float NOT NULL,
  `bmi` float NOT NULL,
  `whr` float NOT NULL,
  `id_expedient` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` int(11) NOT NULL,
  `password` int(11) NOT NULL,
  `fullname` int(11) NOT NULL
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `expedients`
--
ALTER TABLE `expedients`
  ADD PRIMARY KEY (`id_expedient`);

--
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `id_expedient` (`id_expedient`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `expedients`
--
ALTER TABLE `expedients`
  MODIFY `id_expedient` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notes`
--
ALTER TABLE `notes`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id_expedient`) REFERENCES `expedients` (`id_expedient`);
COMMIT;
