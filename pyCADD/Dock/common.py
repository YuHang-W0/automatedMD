import re
import os
import logging

from typing import List
from schrodinger import structure as struc
from schrodinger.structure import StructureReader, Structure
from schrodinger.job import jobcontrol as jc
from schrodinger.application.glide import poseviewconvert as pvc

logger = logging.getLogger(__name__)

def check_pdb(pdb: str):
    '''
    检查PDB ID合法性

    Return
    -------
    bool
        合法返回True 否则返回False
    '''

    if re.fullmatch(r'^\d[0-9a-zA-Z]{3,}$', pdb):
        return True
    else:
        return False

def get_input_pdbid() -> str:
    '''
    获取用户输入的PDBID并检查合法性

    Return
    ----------
    str
        PDB ID字符串
    '''

    pdbid = os.path.split(os.getcwd())[-1]

    if check_pdb(pdbid):        
        return pdbid
    else:
        while True:
            logger.info('To get PDB ID automatically, please change the name of crystal folder to PDBID.')
            pdbid = input('Input PDB ID:').strip().upper()
            logger.info('PDB ID: %s' % pdbid)
            if check_pdb(pdbid):
                return pdbid
            else:
                logger.warning('请输入正确的PDB ID!')

def launch(cmd:str, timeout:int=None):
    '''
    使用jobcontrol启动一项job并等待结束

    Parameters
    ----------
    cmd : str
        等待执行的命令字符串
    timeout : int
        超时时限(秒)
    '''

    cmd_list = cmd.split(' ')  # launch_job以列表形式提交参数
    job = jc.launch_job(cmd_list, timeout=timeout)
    logger.debug('Command: %s' % cmd)
    logger.debug('JobId: %s' % job.JobId)
    logger.debug('Job Name: %s' % job.Name)
    logger.debug('Job Status: %s' % job.Status)
    job.wait()  # 阻塞进程 等待Job结束

    # 如果任务失败
    if not job.StructureOutputFile:
        logger.debug('Job %s Failed' % job.Name)
        return
    else:
        logger.debug('File %s saved.' % job.StructureOutputFile)

class BaseFile:
    '''
    基本文件类型
    '''
    def __init__(self, path) -> None:

        if not os.path.exists(path):
            raise FileNotFoundError('File %s not found' % path)

        self.file_path = os.path.abspath(path)
        self.file_name = os.path.split(self.file_path)[-1]
        self.file_dir = os.path.split(self.file_path)[0]
        self.file_ext = os.path.splitext(self.file_name)[-1]
        self.file_prefix = os.path.splitext(self.file_name)[0]
        self.file_suffix = self.file_ext

class PDBFile(BaseFile):
    '''
    PDB文件类型
    '''
    def __init__(self, path, ligand_id=None) -> None:
        '''
        Parameter
        ----------
        path : str
            PDB文件路径
        ligand_id : str    
            配体小分子名称
        '''
        super().__init__(path)
        self.pdbid = self.file_prefix
        self.ligid = ligand_id
        self.lig_resnum = None
        self.structure = next(StructureReader(self.file_path))
        
    def _catch_lig(self) -> list:
        '''
        从PDB文件获取配体小分子信息
        按行分割并返回列表

        Return
        ----------
        list[dict]
            配体小分子信息列表
        '''
        result_list = []
        _items = ['id', 'chain', 'resid', 'atom_num']
        with open(self.file_path, 'r') as f:
            lines = f.read().splitlines()
        for line in lines:
            if line.startswith('HET '):
                match = ','.join(line.split()[1:])
                lig_dict = {k:v for k,v in zip(_items, match.split(','))}
                result_list.append(lig_dict)
        return result_list

    def _get_lig_info(self, lig_res) -> dict:
        return {
            'id': lig_res.pdbres.strip(), 
            'chain': lig_res.chain, 
            'resid': lig_res.resnum, 
            'atom_num': len(lig_res)
            }

    def _input_from_list(self, liglist:list) -> dict:
        '''
        获取索引的配体小分子信息(仅限于liglist内)

        Return
        ----------
        dict
            配体小分子信息
        '''
        while True:
            ligindex = int(input('Please specify ligand index:').strip())
            if ligindex < len(liglist):
                selected_lig = liglist[ligindex]
                self.lig_resnum = selected_lig.resnum
                return self._get_lig_info(selected_lig)
            else:
                logger.warning('Wrong index, please try agagin.')

    def get_lig(self, ligand_id:str=None, select_first:bool=False) -> dict:
        '''
        从PDB文件获取指定配体小分子信息:
            Name, Chain, Resid, Atom_num
        
        Parameters
        ----------
        ligand_id : str
            配体小分子名称
        select_first : bool
            存在多个配体时 是否自动选择第一个(默认为False)
        
        Return
        ----------
        dict
            配体小分子信息
        '''
        
        ligand_id = self.ligid if ligand_id is None else ligand_id
        assert ligand_id is not None, 'Ligand ID is not specified.'
        _all_match_lig = [res for res in self.structure.residue if res.pdbres.startswith(ligand_id)]

        if len(_all_match_lig) == 0:
            raise ValueError('No ligand found in PDB file.')
        elif len(_all_match_lig) == 1:
                self.lig_resnum = _all_match_lig[0].resnum
                return self._get_lig_info(_all_match_lig[0])
        else:
            fmt = '{0:<10}{1:<10}{2:<10}{3:<10}{4:<10}'
            logger.debug('Crystal %s has multiple ligands' % self.pdbid)
            print(fmt.format('Index', 'PDBID', 'Name', 'Chain', 'Resnum'))
            for index, lig in enumerate(_all_match_lig):
                print(fmt.format(index, self.pdbid, lig.pdbres, lig.chain, lig.resnum))

            if select_first:
                first_lig = _all_match_lig[0]
                self.lig_resnum = first_lig.resnum
                logger.debug(f'Selected the first ligand: {first_lig.pdbres}:Chain {first_lig.chain}:{first_lig.resnum}' )
                return self._get_lig_info(_all_match_lig[0])
                
            return self._input_from_list(_all_match_lig)
        
    def get_lig_name(self) -> str:
        '''
        从PDB文件获取配体小分子名称
        按行分割并返回列表

        Return
        ----------
        str
            配体小分子名称
        '''
        return self.ligid
    
    def keep_chain(self, chain_name:str=None, select_first_lig:bool=False) -> None:
        '''
        返回保留单链的结构
        
        Parameters
        ----------
        chain : str
            需要保留的链(默认为配体所在链)
        select_first_lig : bool
            存在多个配体时 是否自动选择第一个(默认为False, 仅chain_name为None时生效)

        '''
        chain_name = chain_name if chain_name is not None else self.get_lig(select_first=select_first_lig)['chain']
        singlechain_file = '%s-chain-%s.mae' % (self.pdbid, chain_name)
        st = MaestroFile.get_first_structure(self.file_path)  # 读取原始PDB结构
        st_chain_only = st.chain[chain_name].extractStructure()
        st_chain_only.write(singlechain_file)
        return MaestroFile(singlechain_file, self.ligid, self.lig_resnum)

class MaestroFile(BaseFile):
    '''
    Maestro文件类型
    '''
    def __init__(self, path:str, ligand:str=None, lig_resnum:int=None) -> None:
        super().__init__(path)
        _pdbid_from_file = self.file_prefix.split('_')[0]
        _pdbid_from_file = _pdbid_from_file if check_pdb(_pdbid_from_file) else _pdbid_from_file.split('-')[0]
        self.pdbid = _pdbid_from_file if check_pdb(_pdbid_from_file) else None
        self.ligid = ligand
        self.lig_resnum = lig_resnum

    @property
    def st_reader(self) -> StructureReader:
        return StructureReader(self.file_path)

    @property
    def structures(self) -> List[Structure]:
        return [st for st in self.st_reader]
    
    @staticmethod
    def get_first_structure(file_path: str) -> Structure:
        '''
        获取Maestro文件中的第一个结构

        Parameter
        ----------
        file_path : str
            Maestro文件路径
        '''
        return next(StructureReader(file_path))

    @staticmethod
    def convert_format(file_path, to_format: str) -> str:
        '''
        转换结构格式

        Parameter
        ----------
        file_path : str
            需要转换的文件路径
        to_format : str
            转换后的格式
        
        Return
        ----------
        str
            转换后的文件路径
        '''
        st = MaestroFile.get_first_structure(file_path)
        prefix, suffix = os.path.splitext(file_path)
        if to_format == 'pdb':
            converted_file = prefix + '.pdb'
        elif to_format == 'mae':
            converted_file = prefix + '.mae'
        elif to_format == 'maegz':
            converted_file = prefix + '.maegz'
        else:
            raise ValueError('Unsupported format: %s' % to_format)

        st.write(converted_file)
        return converted_file
    
    def minimize(self, side_chain:bool=True, missing_loop:bool=True, del_water:bool=True, overwrite:bool=False):
        '''
        优化结构并执行能量最小化
        '''
        pdbid = self.pdbid
        minimized_file = pdbid + '_minimized.mae'
        if not overwrite and os.path.exists(minimized_file):  # 如果已经进行过优化 为提高效率而跳过优化步骤
            logger.info('File %s is existed.' % minimized_file)
            return ComplexFile(minimized_file)

        _job_name = '%s-Minimize' % pdbid
        prepwizard_command = 'prepwizard -f 3 -r 0.3 -propka_pH 7.0 -disulfides -s -j %s' % _job_name
        if side_chain:
            prepwizard_command += ' -fillsidechains'
        if missing_loop:
            prepwizard_command += ' -fillloops'
        if del_water:
            prepwizard_command += ' -watdist 0.0'

        
        prepwizard_command += ' %s' % self.file_path    # 将pdb文件传入prepwizard
        prepwizard_command += ' %s' % minimized_file    # 将优化后的文件保存到minimized_file
        launch(prepwizard_command)

        if not os.path.exists(minimized_file):  
            raise RuntimeError('%s Crystal Minimization Process Failed.' % pdbid)
        else:
            return ComplexFile(minimized_file)

class ComplexFile(MaestroFile):
    '''
    Maestro单结构复合物文件类型
    仅包含一个Entry
    '''
    def __init__(self, path:str, ligand:str=None, lig_resnum:int=None) -> None:
        super().__init__(path, ligand, lig_resnum)
        self.structure = self.structures[0]

    def _get_mol_obj(self, ligname:str, lig_resnum:int=None) -> struc._Molecule:
        '''
        获取结构中的配体所在Molecule object

        Parameter
        ----------
        ligname : str
            配体名称
        lig_resnum : int
            配体编号
        '''
        for res in self.structure.residue:
            if res.resnum == lig_resnum:
                molnum = res.molecule_number
                logger.debug('Exact match found: %s %d' % (res.pdbres, res.resnum))
                return self.structure.molecule[molnum]
            elif res.pdbres.strip() == ligname:
                molnum = res.molecule_number
                logger.debug('Approximate match found: %s %d' % (res.pdbres, res.resnum))
                return self.structure.molecule[molnum]
            
        raise RuntimeError('No match found: %s' % (ligname))

    def _del_covalent_bond(self, ligname) -> None:
        '''
        删除共价键

        Parameter
        ----------
        ligname : str
            配体名称
        '''
        bonds = self.structure.bond

        for bond in bonds:
            resname1 = bond.atom1.getResidue().pdbres.strip()
            resname2 = bond.atom2.getResidue().pdbres.strip()
            if resname1 == '%s' % ligname or resname2 == '%s' % ligname:
                if resname1 != resname2:
                    bond_to_del = bond
                
        if not bond_to_del:
            raise RuntimeError('Can not delete covalent bonds automatically.')
                
        self.structure.deleteBond(bond_to_del.atom1, bond_to_del.atom2)
        
    def get_lig_molnum(self, ligname:str=None, lig_resnum:int=None) -> str:
        '''
        以ligname为KEY 查找Maestro文件中的Molecule Number
        
        Parameter
        ----------
        ligname : str
            配体小分子名称
        lig_resnum : int
            配体结构中的小分子编号

        Return
        ----------
        str
            Molecule Number
        '''
        ligname = ligname if ligname is not None else self.ligid
        lig_resnum = lig_resnum if lig_resnum is not None else self.lig_resnum

        print('ligname:',ligname, 'lig_resnum:',lig_resnum)

        assert ligname is not None, 'Ligand name is not specified.'
        mol = self._get_mol_obj(ligname, lig_resnum)

        # 判断该molecule是否仅包括小分子本身(是否存在共价连接) 自动移除共价连接
        if len(mol.residue) != 1:  
            logger.info('%s in %s : A covalent bond may exist between the ligand and residue.' % (ligname, self.file_name))
            logger.info('An attempt will be made to remove the covalent bond automatically.')
            self._del_covalent_bond(ligname)
            mol = self._get_mol_obj(ligname)

        return mol.number

    def split(self, ligname:str=None, protein_dir:str=None, ligand_dir:str=None, complex_dir:str=None) -> tuple:
        '''
        将Maestro文件分割为受体与配体

        Parameter
        ----------
        ligname : str
            配体小分子名称
        protein_dir : str
            受体文件保存路径
        ligand_dir : str
            配体文件保存路径
        complex_dir : str
            复合物文件保存路径

        Return
        ----------
        tuple
            分割后的文件名(recepfile_PATH, ligfile_PATH)
        '''
        st = self.structure
        pdbid = self.pdbid
        ligname = ligname if ligname is not None else self.ligid
        assert ligname is not None, 'Ligand name is not specified.'
        
        protein_save_dir = protein_dir if protein_dir is not None else os.getcwd()
        ligand_save_dir = ligand_dir if ligand_dir is not None else os.getcwd()
        complex_save_dir = complex_dir if complex_dir is not None else os.getcwd()

        _residue_list = [res for res in self.structure.residue if res.pdbres.strip() == ligname]
        _res_info = ' '.join([res.chain + ':' + res.pdbres.strip() for res in _residue_list])

        if len(_residue_list) != 1:
            logger.debug(f'There are {len(_residue_list)} "{ligname}" in {self.file_name}: {_res_info}')
            logger.debug('The First One is Selected.')
        _residue = _residue_list[0]

        complex_file = pvc.Complex(st, ligand_asl=_residue.getAsl(), ligand_properties=st.property.keys())

        _lig_file = os.path.join(ligand_save_dir, f'{pdbid}-lig-{ligname}.mae')
        _recep_file = os.path.join(protein_save_dir, f'{pdbid}-pro-{ligname}.mae')
        _complex_file = os.path.join(complex_save_dir, f'{pdbid}-com-{ligname}.mae')

        complex_file.writeLigand(_lig_file)
        complex_file.writeReceptor(_recep_file) 
        st.write(_complex_file)
    
        return ReceptorFile(_recep_file), LigandFile(_lig_file)

class ReceptorFile(MaestroFile):
    '''
    Maestro受体文件类型
    '''
    def __init__(self, path:str, ligand:str=None, lig_resnum:int=None) -> None:
        super().__init__(path, ligand, lig_resnum)
        self.pdbid = self.pdbid if self.pdbid else self.file_name.split('-')[0]

class LigandFile(MaestroFile):
    '''
    Maestro配体文件类型
    '''
    def __init__(self, path:str, ligand:str=None, lig_resnum:int=None) -> None:
        super().__init__(path, ligand, lig_resnum)
        self.pdbid = self.pdbid if self.pdbid else self.file_name.split('-')[0]
        self.ligand_name = ligand if ligand is not None else self.file_prefix
    
    def calc_admet(self, overwrite:bool=False):
        '''
        计算化合物/配体的ADMET特征描述符
        '''
        prefix = self.file_prefix + '_ADMET'
        admet_result_file = prefix + '.mae'

        if os.path.exists(admet_result_file) and not overwrite:
            logger.info('File %s is existed.' % admet_result_file)
            return LigandFile(admet_result_file)

        launch(f'qikprop -outname {prefix} {self.file_path}')
        try:
            os.rename(prefix + '-out.mae', admet_result_file)
        except Exception:
            logger.warning(f'{prefix} ADMET Calculating Failed')
            return None

        return LigandFile(admet_result_file)
        
        
class DockResultFile(MaestroFile):
    '''
    Maestro对接结果文件类型
    仅含有2个Entry
        structure[0]: receptor
        structure[1]: ligand
    '''
    def __init__(self, path:str, ligand:str=None, lig_resnum:int=None, docking_ligand:str=None, precision:str=None) -> None:
        super().__init__(path, ligand, lig_resnum)
        self.internal_ligand_name = ligand if ligand is not None else self.file_prefix.split('_')[1]
        self.internal_ligand_resnum = lig_resnum
        self.docking_ligand_name = docking_ligand if docking_ligand is not None else self.file_prefix.split('_')[3]
        self.precision = precision if precision is not None else self.file_prefix.split('_')[4]

    @property
    def merged_file(self) -> ComplexFile:
        '''
        合并对接结果的受体与配体为一个复合物文件
        '''
        st = self.structures
        _complex_file = f'{self.file_prefix}-complex.mae'
        _complex_st = st[0].merge(st[1], copy_props=True)    
        _complex_st.write(_complex_file)
        return ComplexFile(_complex_file)

    @property
    def docking_receptor_st(self) -> Structure:
        '''
        返回对接结果的受体结构
        '''
        return self.structures[0]

    @property
    def docking_ligand_st(self) -> Structure:
        '''
        返回对接结果的配体结构
        '''
        return self.structures[1]
    @property
    def property(self) -> dict:
        '''
        返回对接结果的数据
        '''
        return self.extract_docking_data()

    def get_receptor_file(self) -> ReceptorFile:
        '''
        获取对接结果中的受体文件
        '''
        docking_recep_st = self.docking_receptor_st
        output_lig_file = f'{self.file_prefix}_recep_posture.mae'
        docking_recep_st.write(output_lig_file)
        return ReceptorFile(output_lig_file)
        
    def get_ligand_file(self) -> LigandFile:
        '''
        获取对接结果中的配体姿势文件
        '''
        docking_lig_st = self.docking_ligand_st
        output_lig_file = f'{self.file_prefix}_lig_posture.mae'
        docking_lig_st.write(output_lig_file)
        return LigandFile(output_lig_file)
    
    def get_merged_file(self) -> ComplexFile:
        '''
        获取对接结果的合并文件
        '''
        return self.merged_file

    def extract_docking_data(self) -> dict:
        '''
        提取对接数据
        '''
        lig_st = self.docking_ligand_st
        self.prop_dic = {}
        for key in lig_st.property.keys():
            self.prop_dic[key] = lig_st.property[key]
        
        return self.prop_dic

    def calc_mmgbsa(self, overwrite:bool=False) -> ComplexFile:
        '''
        计算MM-GBSA结合能
        '''
        prefix = self.file_prefix
        mmgbsa_result_file = prefix + '_mmgbsa.maegz'
        job_name = f'{prefix}_mmgbsa'

        # 已计算则跳过计算过程
        if os.path.exists(mmgbsa_result_file) and not overwrite:
            logger.info('File %s is existed.' % mmgbsa_result_file)
            return ComplexFile(mmgbsa_result_file)

        launch(f'prime_mmgbsa -j {job_name} {self.file_path}')
        
        try:
            os.rename(f'{job_name}-out.maegz', mmgbsa_result_file)
        except Exception:
            logger.info(f'{prefix} Prime MM-GB/SA Calculating Failed')
            return None

        return ComplexFile(mmgbsa_result_file)

class GridFile(BaseFile):
    '''
    网格文件类型(.zip)
    '''
    def __init__(self, file_path: str, ligand:str=None, lig_resnum:int=None) -> None:
        super().__init__(file_path)
        self.ligand = ligand
        self.lig_resnum = lig_resnum
        _pdbid_from_file = self.file_prefix.split('_')[0]
        self.pdbid = _pdbid_from_file if check_pdb(_pdbid_from_file) else None
        # 共结晶配体名称
        # sample grid file name: 1FBY_glide-grid_9CR.mae
        self.internal_ligand = self.file_prefix.split('_')[2]

class MultiInputFile(BaseFile):
    '''
    pyCADD受体列表输入文件
    '''
    def __init__(self, path) -> None:
        '''
        Parameter
        ----------
        path : str
            受体列表输入文件路径
        '''
        super().__init__(path)
        self.pairs_list = None
        self.pdbid_list = None
        self.parse_file()

    def read(self, file_path:str) -> None:
        '''
        读取输入文件

        Parameter
        ----------
        file_path : str
            输入文件路径
        '''
        if not os.path.exists(file_path):
            raise FileNotFoundError(f'File {file_path} not found.')
        self.parse_file(file_path)

    def parse_file(self, file_path: str=None) -> None:
        '''
        解析受体输入文件
        文件中含有多行的 逗号分隔的PDBID与配体ID
        
            example:
                3A9E,REA
                3KMZ,EQO
                3KMR,EQN
                4DQM,LUF
                1DKF,BMS
                5K13,6Q7

        Parameter
        ----------
        file_path : str
            受体列表文件路径
        '''
        file_path = self.file_path if file_path is None else file_path
        with open(file_path, 'r') as f:
            raw_list = f.read().splitlines()
        
        self.pairs_list = [(pdbid, ligid) for pdbid, ligid in [line.split(',') for line in raw_list]]
        self.pdbid_list = [pdbid for pdbid, ligid in self.pairs_list]
        self.ligand_list = [ligid for pdbid, ligid in self.pairs_list]
    
    def get_pairs_list(self) -> list:
        '''
        获取受体信息列表
        '''
        if self.pairs_list is None:
            self.parse_file()
        return self.pairs_list
    
    def get_pdbid_list(self) -> list:
        '''
        获取受体信息列表中的PDBID列表
        '''
        if self.pdbid_list is None:
            self.parse_file()
        return self.pdbid_list

    def get_ligand_list(self) -> list:
        '''
        获取受体信息列表中的配体列表
        '''
        if self.ligand_list is None:
            self.parse_file()
        return self.ligand_list

    def get_pdbfile_path_list(self, pdb_dir: str) -> list:
        '''
        获取受体信息列表中的PDB文件路径列表

        Parameter
        ----------
        pdb_dir : str
            PDB文件所在目录
        '''
        return [os.path.join(pdb_dir, pdbid + '.pdb') for pdbid in self.get_pdbid_list()]
        
    def get_gridfile_path_list(self, grid_dir: str) -> list:
        '''
        获取受体信息列表中的Grid文件路径列表

        Parameter
        ----------
        grid_dir : str
            Grid文件所在目录
        '''
        return [os.path.join(grid_dir, '%s_glide_grid_%s.zip' % (pdbid, ligid)) for pdbid, ligid in self.get_pairs_list()]