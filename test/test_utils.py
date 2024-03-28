import logging
import os
import unittest
from tempfile import TemporaryDirectory
from time import sleep
from unittest.mock import patch

import rich
import signal

from pyCADD.utils.common import BaseFile, File, FixedConfig, FixedThread, TimeoutError
from pyCADD.utils.log import _init_log, get_logfile_name
from pyCADD.utils.tool import (_check_execu_help, _check_execu_version,
                               _find_execu, download_pdb, download_pdb_list,
                               is_amber_available, is_gaussian_available,
                               is_multiwfn_available, is_pmemd_cuda_available,
                               multiprocssing_run, timeit, func_timeout)


class TestBaseFile(unittest.TestCase):
    def test_init_existing_file(self):
        # Test initialization with an existing file
        file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'assets', '3OAP.pdb'))
        base_file = BaseFile(file_path)
        self.assertEqual(base_file.file_path, file_path)
        self.assertEqual(base_file.file_name, '3OAP.pdb')
        self.assertEqual(base_file.file_dir, os.path.dirname(file_path))
        self.assertEqual(base_file.file_ext, 'pdb')
        self.assertEqual(base_file.file_prefix, '3OAP')
        self.assertEqual(base_file.file_suffix, 'pdb')

    def test_init_non_existing_file(self):
        # Test initialization with a non-existing file
        file_path = 'non_existing_file.txt'
        with self.assertRaises(FileNotFoundError):
            BaseFile(file_path)

class TestFile(unittest.TestCase):
    def test_init(self):
        # Test initialization of File object
        file = File('Error occurred')
        self.assertEqual(str(file), 'Error occurred')

class TestLog(unittest.TestCase):
    def test_get_logfile_name(self):
        # Test the generation of log file name
        logfile_name = get_logfile_name()
        self.assertTrue(logfile_name.endswith('.log'))

    def test_init_log(self):
        # Test the initialization of log file
        logger = _init_log('test_logger')
        self.assertIsInstance(logger, logging.Logger)
        self.assertEqual(len(logger.handlers), 2)
        self.assertIsInstance(logger.handlers[0], logging.FileHandler)
        self.assertIsInstance(logger.handlers[1], rich.logging.RichHandler)
        
class TestFixedThread(unittest.TestCase):
    def test_run_without_exception(self):
        # Test running FixedThread without exception
        def target_func():
            pass

        thread = FixedThread(target=target_func)
        thread.start()
        thread.join()

    def test_run_with_exception(self):
        # Test running FixedThread with exception
        def target_func():
            raise ValueError('Test exception')

        thread = FixedThread(target=target_func)
        thread.start()
        with self.assertRaises(ValueError):
            thread.join()
            
class TestFixedConfig(unittest.TestCase):
    def test_optionxform(self):
        # Test optionxform method
        config = FixedConfig()
        option = 'Option'
        self.assertEqual(config.optionxform(option), option)

class TestTool(unittest.TestCase):
    def test__find_execu(self):
        # Test _find_execu function with an existing executable
        self.assertTrue(_find_execu('ls'))

        # Test _find_execu function with a non-existing executable
        self.assertFalse(_find_execu('non_existing_executable'))

    def test__check_execu_help(self):
        # Test _check_execu_help function with an existing executable
        self.assertTrue(_check_execu_help('ls'))

        # Test _check_execu_help function with a non-existing executable
        self.assertFalse(_check_execu_help('non_existing_executable'))

    def test__check_execu_version(self):
        # Test _check_execu_version function with an existing executable
        self.assertTrue(_check_execu_version('python'))

        # Test _check_execu_version function with a non-existing executable
        self.assertFalse(_check_execu_version('non_existing_executable'))

    def test_download_pdb(self):
        # Test download_pdb function with an existing pdbid
        with TemporaryDirectory(dir='.') as save_dir:
            pdbid = '3OAP'
            download_pdb(pdbid, save_dir)
            downloaded_file = os.path.join(save_dir, f'{pdbid}.pdb')
            self.assertTrue(os.path.exists(downloaded_file))
            os.remove(downloaded_file)

            # Test download_pdb function with a non-existing pdbid
            pdbid = 'non_existing_pdbid'
            self.assertRaises(RuntimeError, download_pdb, pdbid, save_dir)

    def test_download_pdb_list(self):
        # Test download_pdb_list function with a list of existing pdbids
        with TemporaryDirectory(dir='.') as save_dir:
            pdblist = ['3OAP', '4K6I']
            download_pdb_list(pdblist, save_dir)
            for pdbid in pdblist:
                downloaded_file = os.path.join(save_dir, f'{pdbid}.pdb')
                self.assertTrue(os.path.exists(downloaded_file))
                os.remove(downloaded_file)
            
            pdblist = ['non_existing_pdbid']
            self.assertRaises(RuntimeError, download_pdb_list, pdblist, save_dir)

    def test_is_amber_available(self):
        # Test is_amber_available function with all executables available
        with patch('pyCADD.utils.tool._check_execu_help', return_value=True), \
                patch('pyCADD.utils.tool._check_execu_version', return_value=True):
            self.assertTrue(is_amber_available())

        # Test is_amber_available function with some executables not available
        with patch('pyCADD.utils.tool._check_execu_help', side_effect=[True, False, True, True, True, True]):
            self.assertFalse(is_amber_available())

    def test_is_pmemd_cuda_available(self):
        # Test is_pmemd_cuda_available function with pmemd.cuda available
        with patch('pyCADD.utils.tool._check_execu_version', return_value=True):
            self.assertTrue(is_pmemd_cuda_available())

        # Test is_pmemd_cuda_available function with pmemd.cuda not available
        with patch('pyCADD.utils.tool._check_execu_version', return_value=False):
            self.assertFalse(is_pmemd_cuda_available())

    def test_is_gaussian_available(self):
        # Test is_gaussian_available function with Gaussian available
        with patch('pyCADD.utils.tool._find_execu', return_value=True):
            self.assertTrue(is_gaussian_available())

        # Test is_gaussian_available function with Gaussian not available
        with patch('pyCADD.utils.tool._find_execu', return_value=False):
            self.assertFalse(is_gaussian_available())

    def test_is_multiwfn_available(self):
        # Test is_multiwfn_available function with Multiwfn available
        with patch('pyCADD.utils.tool._find_execu', return_value=True):
            self.assertTrue(is_multiwfn_available())

        # Test is_multiwfn_available function with Multiwfn not available
        with patch('pyCADD.utils.tool._find_execu', return_value=False):
            self.assertFalse(is_multiwfn_available())

    def test_multiprocssing_run(self):
        # Test multiprocssing_run function with a function that returns a list
        iterable = [1, 2, 3, 4, 5]
        num_parallel = 2
        result = multiprocssing_run(square, iterable, 'Test', num_parallel)
        self.assertEqual(result, [1, 4, 9, 16, 25])
        
        iterable = [20, 30]
        num_parallel = 2
        result = multiprocssing_run(square, iterable, 'Test_timeout', num_parallel, timeout=1, args1=1, args2="test")
        self.assertEqual(result, [])
        

    def test_timeit(self):
        # Test timeit decorator
        @timeit
        def my_function():
            sleep(2)

        my_function()

        # No assertion is made as this is a timing test
        
class TestFuncTimeout(unittest.TestCase):
    def test_func_timeout(self):
        # Test func_timeout with a function that completes within the timeout
        def target_func():
            return "Success"

        result = func_timeout(target_func, timeout=1)
        self.assertEqual(result, "Success")

    def test_func_timeout_timeout_error(self):
        # Test func_timeout with a function that exceeds the timeout
        def target_func():
            import time
            time.sleep(2)

        with self.assertRaises(TimeoutError):
            func_timeout(target_func, timeout=1)

    def test_func_timeout_timeout_error_message(self):
        # Test the error message of func_timeout when a timeout occurs
        def target_func(arg1, arg2):
            import time
            time.sleep(2)

        with self.assertRaises(TimeoutError) as cm:
            func_timeout(target_func, "arg1", arg2="arg2", timeout=1)
        error_message = str(cm.exception)
        self.assertIn("Task timed out after 1 seconds", error_message)
        self.assertIn("target_func(arg1, arg2=arg2)", error_message)

    @patch('signal.signal')
    @patch('signal.alarm')
    def test_func_timeout_signal_calls(self, mock_alarm, mock_signal):
        # Test the calls to signal.alarm and signal.signal in func_timeout
        def target_func():
            return "Success"

        func_timeout(target_func, timeout=1)
        mock_signal.assert_called_once_with(signal.SIGALRM, unittest.mock.ANY)
        mock_alarm.assert_called_once_with(1)

    def test_func_timeout_no_timeout(self):
        # Test func_timeout with no timeout specified
        def target_func():
            return "Success"

        result = func_timeout(target_func)
        self.assertEqual(result, "Success")
        
def square(x, *args, **kwargs):
    sleep(x)
    return x**2

if __name__ == '__main__':
    unittest.main()
    