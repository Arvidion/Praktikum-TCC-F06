-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2025 at 10:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jadwal`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `idJadwal` int(11) NOT NULL,
  `idStasiunAwal` int(11) NOT NULL,
  `idStasiunAkhir` int(11) NOT NULL,
  `idKereta` int(11) NOT NULL,
  `namaRute` varchar(255) NOT NULL,
  `waktuKeberangkatan` time NOT NULL,
  `waktuTiba` time NOT NULL,
  `Tanggal_dibuat` datetime NOT NULL,
  `Tanggal_diperbarui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`idJadwal`, `idStasiunAwal`, `idStasiunAkhir`, `idKereta`, `namaRute`, `waktuKeberangkatan`, `waktuTiba`, `Tanggal_dibuat`, `Tanggal_diperbarui`) VALUES
(1, 1, 2, 1, 'Yogyakarta - Palur', '05:05:00', '05:10:00', '2025-05-27 07:14:17', '2025-05-27 07:14:17'),
(2, 2, 3, 1, 'Yogyakarta - Palur', '05:10:00', '05:17:00', '2025-05-27 07:15:02', '2025-05-27 07:15:02'),
(3, 3, 4, 1, 'Yogyakarta - Palur', '05:17:00', '05:26:00', '2025-05-27 07:15:19', '2025-05-27 07:15:41'),
(4, 4, 5, 1, 'Yogyakarta - Palur', '05:26:00', '05:33:00', '2025-05-27 07:16:07', '2025-05-27 07:16:07'),
(5, 5, 6, 1, 'Yogyakarta - Palur', '05:33:00', '05:40:00', '2025-05-27 07:16:37', '2025-05-27 07:16:37'),
(6, 6, 7, 1, 'Yogyakarta - Palur', '05:40:00', '05:49:00', '2025-05-27 07:16:59', '2025-05-27 07:16:59'),
(7, 7, 8, 1, 'Yogyakarta - Palur', '05:49:00', '05:56:00', '2025-05-27 07:17:32', '2025-05-27 07:17:32'),
(8, 8, 9, 1, 'Yogyakarta - Palur', '05:56:00', '06:03:00', '2025-05-27 07:17:59', '2025-05-27 07:17:59'),
(9, 9, 10, 1, 'Yogyakarta - Palur', '06:03:00', '06:11:00', '2025-05-27 07:18:25', '2025-05-27 07:18:25'),
(10, 10, 11, 1, 'Yogyakarta - Palur', '06:11:00', '06:16:00', '2025-05-27 07:18:48', '2025-05-27 07:18:48'),
(11, 11, 12, 1, 'Yogyakarta - Palur', '06:16:00', '06:21:00', '2025-05-27 07:19:08', '2025-05-27 07:19:08'),
(12, 12, 13, 1, 'Yogyakarta - Palur', '06:21:00', '06:26:00', '2025-05-27 07:19:33', '2025-05-27 07:19:33'),
(13, 1, 14, 6, 'Yogyakarta - Kutoarjo', '06:40:00', '06:45:00', '2025-05-27 07:22:36', '2025-05-27 07:22:36'),
(14, 14, 15, 6, 'Yogyakarta - Kutoarjo', '06:45:00', '06:49:00', '2025-05-27 07:23:10', '2025-05-27 07:23:10'),
(15, 15, 16, 6, 'Yogyakarta - Kutoarjo', '06:49:00', '06:56:00', '2025-05-27 07:23:42', '2025-05-27 07:23:42'),
(16, 16, 17, 6, 'Yogyakarta - Kutoarjo', '06:56:00', '07:07:00', '2025-05-27 07:24:13', '2025-05-27 07:24:13'),
(17, 17, 18, 6, 'Yogyakarta - Kutoarjo', '07:07:00', '07:20:00', '2025-05-27 07:24:38', '2025-05-27 07:24:38'),
(18, 18, 19, 6, 'Yogyakarta - Kutoarjo', '07:20:00', '07:29:00', '2025-05-27 07:25:03', '2025-05-27 07:25:03'),
(19, 19, 20, 6, 'Yogyakarta - Kutoarjo', '07:29:00', '07:42:00', '2025-05-27 07:25:26', '2025-05-27 07:25:26');

-- --------------------------------------------------------

--
-- Table structure for table `kereta`
--

CREATE TABLE `kereta` (
  `idKereta` int(11) NOT NULL,
  `nomorKereta` varchar(255) NOT NULL,
  `jenisKereta` varchar(255) NOT NULL,
  `Tanggal_dibuat` datetime NOT NULL,
  `Tanggal_diperbarui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kereta`
--

INSERT INTO `kereta` (`idKereta`, `nomorKereta`, `jenisKereta`, `Tanggal_dibuat`, `Tanggal_diperbarui`) VALUES
(1, '720', 'KRL Yogyakarta', '2025-05-27 07:09:59', '2025-05-27 07:09:59'),
(2, '730F', 'KRL Yogyakarta', '2025-05-27 07:10:06', '2025-05-27 07:10:06'),
(3, '702', 'KRL Yogyakarta', '2025-05-27 07:10:20', '2025-05-27 07:10:20'),
(4, '712', 'KRL Yogyakarta', '2025-05-27 07:10:28', '2025-05-27 07:10:28'),
(5, '722', 'KRL Yogyakarta', '2025-05-27 07:10:34', '2025-05-27 07:10:34'),
(6, '501', 'Prameks', '2025-05-27 07:10:50', '2025-05-27 07:10:50'),
(7, '502', 'Prameks', '2025-05-27 07:11:13', '2025-05-27 07:11:13'),
(8, '503', 'Prameks', '2025-05-27 07:11:20', '2025-05-27 07:11:20'),
(9, '504', 'Prameks', '2025-05-27 07:11:30', '2025-05-27 07:11:30'),
(10, '505', 'Prameks', '2025-05-27 07:11:42', '2025-05-27 07:11:42');

-- --------------------------------------------------------

--
-- Table structure for table `stasiun`
--

CREATE TABLE `stasiun` (
  `idStasiun` int(11) NOT NULL,
  `namaStasiun` varchar(255) NOT NULL,
  `Tanggal_dibuat` datetime NOT NULL,
  `Tanggal_diperbarui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stasiun`
--

INSERT INTO `stasiun` (`idStasiun`, `namaStasiun`, `Tanggal_dibuat`, `Tanggal_diperbarui`) VALUES
(1, 'Yogyakarta', '2025-05-27 07:05:33', '2025-05-27 07:05:33'),
(2, 'Lempuyangan', '2025-05-27 07:05:38', '2025-05-27 07:05:38'),
(3, 'Maguwo', '2025-05-27 07:05:49', '2025-05-27 07:05:49'),
(4, 'Brambanan', '2025-05-27 07:06:26', '2025-05-27 07:06:26'),
(5, 'Srowot', '2025-05-27 07:07:15', '2025-05-27 07:07:15'),
(6, 'Klaten', '2025-05-27 07:07:28', '2025-05-27 07:07:28'),
(7, 'Ceper', '2025-05-27 07:08:08', '2025-05-27 07:08:08'),
(8, 'Delanggu', '2025-05-27 07:08:13', '2025-05-27 07:08:13'),
(9, 'Gawok', '2025-05-27 07:08:30', '2025-05-27 07:08:30'),
(10, 'Purwosari', '2025-05-27 07:08:40', '2025-05-27 07:08:40'),
(11, 'Solo Balapan', '2025-05-27 07:08:46', '2025-05-27 07:08:46'),
(12, 'Solo Jebres', '2025-05-27 07:08:52', '2025-05-27 07:08:52'),
(13, 'Palur', '2025-05-27 07:08:56', '2025-05-27 07:08:56'),
(14, 'Patukan', '2025-05-27 07:12:32', '2025-05-27 07:12:32'),
(15, 'Rewulu', '2025-05-27 07:12:42', '2025-05-27 07:12:42'),
(16, 'Sentolo', '2025-05-27 07:12:46', '2025-05-27 07:12:46'),
(17, 'Wates', '2025-05-27 07:12:50', '2025-05-27 07:12:50'),
(18, 'Wojo', '2025-05-27 07:12:59', '2025-05-27 07:12:59'),
(19, 'Jenar', '2025-05-27 07:13:06', '2025-05-27 07:13:06'),
(20, 'Kutoarjo', '2025-05-27 07:13:13', '2025-05-27 07:13:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$05$hYNgxDysliFk/FoNxe6LFeNcMQLJ9CAtmtFvLtaSenhd6qrLCJ7ym', NULL, '2025-05-27 08:04:36', '2025-05-27 08:04:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`idJadwal`),
  ADD KEY `idStasiunAwal` (`idStasiunAwal`),
  ADD KEY `idStasiunAkhir` (`idStasiunAkhir`),
  ADD KEY `idKereta` (`idKereta`);

--
-- Indexes for table `kereta`
--
ALTER TABLE `kereta`
  ADD PRIMARY KEY (`idKereta`);

--
-- Indexes for table `stasiun`
--
ALTER TABLE `stasiun`
  ADD PRIMARY KEY (`idStasiun`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `idJadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `kereta`
--
ALTER TABLE `kereta`
  MODIFY `idKereta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stasiun`
--
ALTER TABLE `stasiun`
  MODIFY `idStasiun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_55` FOREIGN KEY (`idStasiunAwal`) REFERENCES `stasiun` (`idStasiun`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_56` FOREIGN KEY (`idStasiunAkhir`) REFERENCES `stasiun` (`idStasiun`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_57` FOREIGN KEY (`idKereta`) REFERENCES `kereta` (`idKereta`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
