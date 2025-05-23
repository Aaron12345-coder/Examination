-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 09:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cwsms`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `PlateNumber_id` int(11) NOT NULL,
  `CarType` varchar(255) NOT NULL,
  `CarSize` varchar(255) NOT NULL,
  `DriverName` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`PlateNumber_id`, `CarType`, `CarSize`, `DriverName`, `PhoneNumber`) VALUES
(2, 'RAV4', '5m', 'Aaron', '234567808765'),
(3, 'CoauSter', '10m', 'Aaron', '079316131');

-- --------------------------------------------------------

--
-- Table structure for table `night`
--

CREATE TABLE `night` (
  `night_id` int(11) NOT NULL,
  `Activite` varchar(255) NOT NULL,
  `Time` varchar(155) NOT NULL,
  `achieved` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `night`
--

INSERT INTO `night` (`night_id`, `Activite`, `Time`, `achieved`) VALUES
(1, '', '22:19', ''),
(3, 'Add neww data', '22:32', 'Insert Data in Table'),
(4, 'Add neww data', '22:32', 'Insert Data in Table');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `PackageNumber` int(11) NOT NULL,
  `PackageName` varchar(255) NOT NULL,
  `PackageDescription` varchar(255) NOT NULL,
  `PackagePrice` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`PackageNumber`, `PackageName`, `PackageDescription`, `PackagePrice`) VALUES
(1, 'Basic wash', 'Exterior hand wash', '5000.00'),
(2, 'Classic wash', 'Interior hand wash', '10000.00'),
(3, 'Premium wash', 'Exterior and interior hand wash', '20000.00');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentNumber` int(11) NOT NULL,
  `AmountPaid` varchar(255) NOT NULL,
  `PaymentDate` varchar(255) NOT NULL,
  `RecordNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`PaymentNumber`, `AmountPaid`, `PaymentDate`, `RecordNumber`) VALUES
(1, '99999999.99', '2025-05-21', '2'),
(2, '60000', '2025-05-22', '6');

-- --------------------------------------------------------

--
-- Table structure for table `servicepackage`
--

CREATE TABLE `servicepackage` (
  `RecordNumber_id` int(11) NOT NULL,
  `ServiceDate` varchar(255) NOT NULL,
  `PackageNumber` int(255) NOT NULL,
  `PlateNumber` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepackage`
--

INSERT INTO `servicepackage` (`RecordNumber_id`, `ServiceDate`, `PackageNumber`, `PlateNumber`) VALUES
(1, '2025-05-22', 134567890, 9876543),
(2, '2025-05-21', 1500, 0),
(4, '2025-05-23', 3098798, 500478),
(5, '2025-05-22', 50000, 0),
(6, '2025-05-22', 300, 0);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `carType` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service`, `carType`, `price`) VALUES
(2, 'Car frashing', 'Hammer', '3000.00'),
(3, 'Buy Working', 'Sedan', '10000'),
(4, 'Washing', 'SUVE', '8000'),
(5, 'Gukubura imbere ya doro', 'Fuso and Howo', '100000'),
(6, 'Koza Tapi Zimodoka', 'V8', '7000'),
(8, 'guhanagura ibirahure', 'Scania', '100000'),
(10, 'pins remove', 'Prado', '3000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`) VALUES
(1, 'Aaron', '$2b$10$ojAnrOPAEB/bsHAkclBjnujpc8OOttj7zF463HN6ovl/Q2Eu61x1a', 'manirakizaaron@gmail.com'),
(2, 'Aaron', '$2b$10$kkWG.259vNsmtrpbMIeYNO.xarFUGgHoMW834x51BuhCNw3t4PUkO', 'Aaron@gmail.com'),
(3, 'A', '$2b$10$W1fQ/QXTIdxPBGki/ZNvmeSoKuwT/PVVjx9lRqfcnl4ZXVtNB/oOu', 'Aaron@gmail.com'),
(4, 'Aaron', '$2b$10$EqtGf954OWUaIi0pZaaZFeiaMuBsgSzjBThLe3AyuMo0HQTjf7ZSm', 'ae@q');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`PlateNumber_id`);

--
-- Indexes for table `night`
--
ALTER TABLE `night`
  ADD PRIMARY KEY (`night_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`PackageNumber`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentNumber`);

--
-- Indexes for table `servicepackage`
--
ALTER TABLE `servicepackage`
  ADD PRIMARY KEY (`RecordNumber_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `PlateNumber_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `night`
--
ALTER TABLE `night`
  MODIFY `night_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `PackageNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `servicepackage`
--
ALTER TABLE `servicepackage`
  MODIFY `RecordNumber_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
