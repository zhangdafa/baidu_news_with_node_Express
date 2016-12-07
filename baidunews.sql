-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-11-15 14:07:57
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `newsid` int(11) NOT NULL,
  `newspath` varchar(100) NOT NULL,
  `newstitle` varchar(100) CHARACTER SET utf8 NOT NULL,
  `newssrc` varchar(100) CHARACTER SET utf8 NOT NULL,
  `newstype` varchar(100) CHARACTER SET utf8 NOT NULL,
  `newstime` datetime NOT NULL,
  `newsstatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`newsid`, `newspath`, `newstitle`, `newssrc`, `newstype`, `newstime`, `newsstatus`) VALUES
(1, '123', '123', '123', '1', '0000-00-00 00:00:00', 0),
(2, '123', '<script>alert (1)</script>', '123', '1', '0000-00-00 00:00:00', 1),
(3, '123', '啊实打实的', '123', '1', '0000-00-00 00:00:00', 1),
(4, '123', '啊实打实的', '123', '6', '0000-00-00 00:00:00', 0),
(5, 'asd', 'asd', 'asd', '1', '2016-12-12 12:00:00', 1),
(6, 'asd', 'asd', 'asdasd', '1', '2016-12-12 12:00:00', 1),
(7, '123', '123', '123', '1', '2016-12-12 12:12:12', 1),
(8, 'asd', '123aaa', 'asd', '1', '2016-12-12 12:12:12', 1),
(9, 'asd', '123aaa', 'asd', '1', '2016-12-12 05:12:12', 0),
(10, 'asd', '<script>alert (1)</script>', 'asd', '1', '2016-12-12 05:12:12', 1),
(11, 'asd', '<script>alert (1)</script>', 'asd', '1', '2016-12-12 05:12:12', 0),
(12, '123', '<script>alert (1)</script>', '123', '1', '2016-12-12 05:12:12', 1);

-- --------------------------------------------------------

--
-- 表的结构 `newstype`
--

CREATE TABLE `newstype` (
  `newsType_id` int(11) NOT NULL,
  `newsType_name` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `newstype`
--

INSERT INTO `newstype` (`newsType_id`, `newsType_name`) VALUES
(1, '推荐'),
(2, '百家'),
(3, '本地'),
(4, '图片'),
(5, '娱乐'),
(6, '社会'),
(7, '军事'),
(8, '互联网'),
(9, '科技'),
(10, '女人'),
(11, '更多');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`newsid`);

--
-- Indexes for table `newstype`
--
ALTER TABLE `newstype`
  ADD PRIMARY KEY (`newsType_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `newsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `newstype`
--
ALTER TABLE `newstype`
  MODIFY `newsType_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
