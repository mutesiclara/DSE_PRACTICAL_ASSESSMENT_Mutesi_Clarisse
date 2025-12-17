-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2025 at 01:01 PM
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
-- Database: `smart_complex`
--

-- --------------------------------------------------------

--
-- Table structure for table `parking_records`
--

CREATE TABLE `parking_records` (
  `recordid` int(11) NOT NULL,
  `vehicleid` int(11) DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `exit_time` datetime DEFAULT NULL,
  `total_hours` int(11) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `recordedby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_records`
--

INSERT INTO `parking_records` (`recordid`, `vehicleid`, `entry_time`, `exit_time`, `total_hours`, `total_amount`, `recordedby`) VALUES
(1, 1, '2025-12-17 12:35:40', '2025-12-17 12:46:41', 1, 1500, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('manager','driver') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fullname`, `phone`, `role`, `password`) VALUES
(1, 'Parking Manager', '0788000001', 'manager', '$2b$10$5VI0CQ75aT.QinDhaGjZ8uSOwY9zGOMwmHs/0DQZM21ItClikRogq'),
(2, 'devota Driver', '0788000002', 'driver', '$2b$10$fZmb7RZlgpjgW/FdY57D0uK0ZWmf8moq71Dlje6ohpVb964JACYbe');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicleid` int(11) NOT NULL,
  `platenumber` varchar(20) DEFAULT NULL,
  `vehicletype` varchar(50) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicleid`, `platenumber`, `vehicletype`, `userid`) VALUES
(1, 'RAB123C', NULL, 2),
(18, 'RAB123C', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `parking_records`
--
ALTER TABLE `parking_records`
  ADD PRIMARY KEY (`recordid`),
  ADD KEY `vehicleid` (`vehicleid`),
  ADD KEY `recordedby` (`recordedby`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicleid`),
  ADD KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parking_records`
--
ALTER TABLE `parking_records`
  MODIFY `recordid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicleid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parking_records`
--
ALTER TABLE `parking_records`
  ADD CONSTRAINT `parking_records_ibfk_1` FOREIGN KEY (`vehicleid`) REFERENCES `vehicles` (`vehicleid`),
  ADD CONSTRAINT `parking_records_ibfk_2` FOREIGN KEY (`recordedby`) REFERENCES `users` (`userid`);

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
