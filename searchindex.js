Search.setIndex({docnames:["README","index","source/dance","source/dock","source/dynamic","source/gauss","source/input_file_fmt","source/modules","source/pyCADD","source/pyCADD.Dance","source/pyCADD.Dance.algorithm","source/pyCADD.Dock","source/pyCADD.Dynamic","source/pyCADD.Gauss","source/pyCADD.VSW","source/pyCADD.query","source/pyCADD.utils"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":5,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":3,"sphinx.domains.rst":2,"sphinx.domains.std":2,"sphinx.ext.viewcode":1,sphinx:56},filenames:["README.md","index.rst","source/dance.md","source/dock.md","source/dynamic.md","source/gauss.md","source/input_file_fmt.md","source/modules.rst","source/pyCADD.rst","source/pyCADD.Dance.rst","source/pyCADD.Dance.algorithm.rst","source/pyCADD.Dock.rst","source/pyCADD.Dynamic.rst","source/pyCADD.Gauss.rst","source/pyCADD.VSW.rst","source/pyCADD.query.rst","source/pyCADD.utils.rst"],objects:{"":[[8,0,0,"-","pyCADD"]],"pyCADD.Dance":[[10,0,0,"-","algorithm"],[9,0,0,"-","common"],[9,0,0,"-","core"],[9,0,0,"-","metrics"]],"pyCADD.Dance.algorithm":[[10,0,0,"-","DL"],[10,0,0,"-","consensus"],[10,0,0,"-","default_params"]],"pyCADD.Dance.algorithm.DL":[[10,1,1,"","MLP"]],"pyCADD.Dance.algorithm.DL.MLP":[[10,2,1,"","forward"],[10,2,1,"","get_params"],[10,2,1,"","initialize"],[10,2,1,"","predict"],[10,2,1,"","predict_proba"],[10,3,1,"","training"]],"pyCADD.Dance.algorithm.consensus":[[10,1,1,"","Average"],[10,1,1,"","GeoMean"],[10,1,1,"","Geo_Average"],[10,1,1,"","Maximum"],[10,1,1,"","Mean"],[10,1,1,"","Minimum"],[10,4,1,"","average"],[10,4,1,"","maximum"],[10,4,1,"","minimum"],[10,4,1,"","std"]],"pyCADD.Dance.algorithm.consensus.Average":[[10,2,1,"","fit"]],"pyCADD.Dance.algorithm.consensus.Geo_Average":[[10,2,1,"","fit"]],"pyCADD.Dance.algorithm.consensus.Maximum":[[10,2,1,"","fit"]],"pyCADD.Dance.algorithm.consensus.Minimum":[[10,2,1,"","fit"]],"pyCADD.Dance.common":[[9,1,1,"","Dancer"],[9,1,1,"","Evaluator"],[9,1,1,"","Matrix"]],"pyCADD.Dance.common.Dancer":[[9,2,1,"","add_dataset"],[9,2,1,"","add_neg_dataset"],[9,2,1,"","add_pos_dataset"],[9,2,1,"","get_merged_data"],[9,2,1,"","prepare_data"],[9,2,1,"","save"],[9,2,1,"","save_csv"],[9,2,1,"","save_pickle"]],"pyCADD.Dance.common.Evaluator":[[9,2,1,"","add_clf"],[9,2,1,"","del_clf"],[9,5,1,"","gbt_default_params"],[9,2,1,"","get_clf"],[9,2,1,"","get_clfs_dict"],[9,2,1,"","get_gbt_default_params"],[9,2,1,"","get_lr_default_params"],[9,2,1,"","get_rf_default_params"],[9,2,1,"","get_weights"],[9,2,1,"","load_params"],[9,5,1,"","lr_default_params"],[9,2,1,"","print_classifier_info"],[9,2,1,"","print_cv_results"],[9,2,1,"","repeat_cv"],[9,5,1,"","rf_default_params"],[9,2,1,"","save_params"],[9,2,1,"","search_params"],[9,2,1,"","testset_eval"]],"pyCADD.Dance.common.Matrix":[[9,2,1,"","from_csv"],[9,2,1,"","from_pickle"],[9,2,1,"","from_splited_data"],[9,2,1,"","get_test_data"],[9,2,1,"","get_train_data"],[9,2,1,"","split_train_test_data"]],"pyCADD.Dance.core":[[9,4,1,"","calc_scp_score"],[9,4,1,"","hyperparam_tuning"]],"pyCADD.Dance.metrics":[[9,4,1,"","nef_score"]],"pyCADD.Dock":[[11,1,1,"","Docker"],[11,1,1,"","MultiDocker"],[11,0,0,"-","cli"],[11,0,0,"-","common"],[11,0,0,"-","config"],[11,0,0,"-","core"],[11,0,0,"-","data"],[11,0,0,"-","ensemble"],[11,0,0,"-","ui"]],"pyCADD.Dock.Docker":[[11,2,1,"","calc_admet"],[11,2,1,"","calc_mmgbsa"],[11,2,1,"","calc_volume"],[11,2,1,"","dock"],[11,2,1,"","download_pdb"],[11,2,1,"","extra_admet_data"],[11,2,1,"","extra_docking_data"],[11,2,1,"","grid_generate"],[11,2,1,"","keep_chain"],[11,5,1,"","lig_info"],[11,5,1,"","lig_name"],[11,2,1,"","minimize"],[11,5,1,"","pdb_file"],[11,5,1,"","pdb_file_path"],[11,5,1,"","pdbid"],[11,2,1,"","save_admet_data"],[11,2,1,"","save_docking_data"],[11,2,1,"","set_calc_rmsd"],[11,2,1,"","set_precision"],[11,2,1,"","split_complex"]],"pyCADD.Dock.common":[[11,1,1,"","ComplexFile"],[11,1,1,"","DockResultFile"],[11,1,1,"","GridFile"],[11,1,1,"","LigandFile"],[11,1,1,"","MaestroFile"],[11,1,1,"","MultiInputFile"],[11,1,1,"","PDBFile"],[11,1,1,"","ReceptorFile"],[11,4,1,"","check_pdb"],[11,4,1,"","get_input_pdbid"],[11,4,1,"","get_predict_structure"],[11,4,1,"","launch"]],"pyCADD.Dock.common.ComplexFile":[[11,2,1,"","get_lig_molnum"],[11,2,1,"","split"]],"pyCADD.Dock.common.DockResultFile":[[11,2,1,"","calc_mmgbsa"],[11,5,1,"","docking_ligand_st"],[11,5,1,"","docking_receptor_st"],[11,2,1,"","extract_docking_data"],[11,2,1,"","get_ligand_file"],[11,2,1,"","get_merged_file"],[11,2,1,"","get_receptor_file"],[11,5,1,"","merged_file"],[11,5,1,"","property"]],"pyCADD.Dock.common.LigandFile":[[11,2,1,"","calc_admet"]],"pyCADD.Dock.common.MaestroFile":[[11,2,1,"","convert_format"],[11,2,1,"","get_first_structure"],[11,2,1,"","minimize"],[11,5,1,"","st_reader"],[11,5,1,"","structures"]],"pyCADD.Dock.common.MultiInputFile":[[11,2,1,"","get_gridfile_path_list"],[11,2,1,"","get_ligand_list"],[11,2,1,"","get_pairs_list"],[11,2,1,"","get_pdbfile_path_list"],[11,2,1,"","get_pdbid_list"],[11,2,1,"","parse_file"],[11,2,1,"","read"],[11,2,1,"","read_from_config"]],"pyCADD.Dock.common.PDBFile":[[11,2,1,"","get_lig"],[11,2,1,"","get_lig_name"],[11,2,1,"","keep_chain"]],"pyCADD.Dock.config":[[11,1,1,"","BaseConfig"],[11,1,1,"","DataConfig"],[11,1,1,"","DefaultDataConfig"]],"pyCADD.Dock.core":[[11,4,1,"","calc_admet"],[11,4,1,"","calc_mmgbsa"],[11,4,1,"","calc_volume"],[11,4,1,"","dock"],[11,4,1,"","grid_generate"],[11,4,1,"","minimize"]],"pyCADD.Dock.data":[[11,1,1,"","Reporter"],[11,4,1,"","extra_admet_data"],[11,4,1,"","extra_docking_data"],[11,4,1,"","save_admet_data"],[11,4,1,"","save_docking_data"],[11,4,1,"","save_ensemble_docking_data"],[11,4,1,"","save_redocking_data"]],"pyCADD.Dock.data.Reporter":[[11,2,1,"","generate_report"]],"pyCADD.Dock.ensemble":[[11,4,1,"","split_ligand"]],"pyCADD.Dock.ui":[[11,1,1,"","UI_dock"]],"pyCADD.Dock.ui.UI_dock":[[11,2,1,"","run"]],"pyCADD.Dynamic":[[12,0,0,"-","cli"],[12,0,0,"-","common"],[12,0,0,"-","core"]],"pyCADD.Dynamic.common":[[12,1,1,"","Analyzer"],[12,1,1,"","Processor"],[12,1,1,"","Simulator"]],"pyCADD.Dynamic.common.Analyzer":[[12,2,1,"","calc_hbond"],[12,2,1,"","calc_rmsd"],[12,2,1,"","calc_rmsf"],[12,2,1,"","creat_energy_inputfile"],[12,2,1,"","extract_frame"],[12,2,1,"","extract_frames"],[12,2,1,"","extract_lowest_energy_st"],[12,2,1,"","load_mdout"],[12,2,1,"","load_topfile"],[12,2,1,"","load_traj"],[12,2,1,"","run_energy_calc"],[12,2,1,"","trace_angle"],[12,2,1,"","trace_distance"]],"pyCADD.Dynamic.common.Processor":[[12,2,1,"","cover_to_pdb"],[12,2,1,"","leap_prepare"],[12,2,1,"","molecule_prepare"],[12,2,1,"","protein_prepare"],[12,2,1,"","set_comsolvate_file"]],"pyCADD.Dynamic.common.Simulator":[[12,2,1,"","creat_input_file"],[12,2,1,"","run_simulation"],[12,2,1,"","set_cuda_device"],[12,2,1,"","shwo_cuda_device"]],"pyCADD.Dynamic.core":[[12,4,1,"","leap_prepare"],[12,4,1,"","molecule_prepare"],[12,4,1,"","protein_prepare"]],"pyCADD.Gauss":[[13,0,0,"-","base"],[13,0,0,"-","core"],[13,0,0,"-","ui"]],"pyCADD.Gauss.base":[[13,1,1,"","Gauss"]],"pyCADD.Gauss.base.Gauss":[[13,2,1,"","create_inputfile"],[13,2,1,"","extract_cube"],[13,5,1,"","gauss"],[13,2,1,"","get_mo_info"],[13,2,1,"","read_origin_st"],[13,2,1,"","run"],[13,2,1,"","set_DFT"],[13,2,1,"","set_basis_set"],[13,2,1,"","set_charge"],[13,2,1,"","set_multiplicity"],[13,2,1,"","set_solvent"],[13,2,1,"","set_system"],[13,5,1,"","system_info"]],"pyCADD.Gauss.core":[[13,1,1,"","Daemon"],[13,4,1,"","cube_file_generate"],[13,4,1,"","generate_energy"],[13,4,1,"","generate_fchk"],[13,4,1,"","generate_opt"],[13,4,1,"","get_gaussian"],[13,4,1,"","get_mo"],[13,4,1,"","system_default"]],"pyCADD.Gauss.core.Daemon":[[13,2,1,"","daemonize"],[13,2,1,"","restart"],[13,2,1,"","run"],[13,2,1,"","start"],[13,2,1,"","stop"]],"pyCADD.Gauss.ui":[[13,1,1,"","UI_Gauss"]],"pyCADD.Gauss.ui.UI_Gauss":[[13,5,1,"","cpu_count"],[13,5,1,"","mem"],[13,2,1,"","run"],[13,2,1,"","set_system"]],"pyCADD.VSW":[[14,0,0,"-","base"],[14,0,0,"-","core"],[14,0,0,"-","register"],[14,0,0,"-","ui"]],"pyCADD.VSW.base":[[14,1,1,"","VSW"]],"pyCADD.VSW.base.VSW":[[14,5,1,"","database_list"],[14,5,1,"","genelist"],[14,2,1,"","generate_input_file"],[14,2,1,"","get_gene"],[14,2,1,"","get_receptor_list"],[14,2,1,"","read_databse"],[14,2,1,"","read_gene"],[14,5,1,"","required_dir"],[14,2,1,"","run"],[14,2,1,"","select_database"],[14,5,1,"","vsw_dir"]],"pyCADD.VSW.core":[[14,4,1,"","gen_input_file"],[14,4,1,"","read_database_config"],[14,4,1,"","read_gene_config"]],"pyCADD.VSW.register":[[14,4,1,"","del_database"],[14,4,1,"","del_gene"],[14,4,1,"","reg_database"],[14,4,1,"","reg_gene"]],"pyCADD.VSW.ui":[[14,1,1,"","UI_VSW"]],"pyCADD.VSW.ui.UI_VSW":[[14,2,1,"","get_database"],[14,2,1,"","get_gene"],[14,2,1,"","run"]],"pyCADD.query":[[15,1,1,"","QueryClient"],[15,0,0,"-","cli"],[15,0,0,"-","config"],[15,0,0,"-","core"]],"pyCADD.query.QueryClient":[[15,2,1,"","clean_pdb_data"],[15,2,1,"","get_apo"],[15,2,1,"","get_mutation_pdb"],[15,2,1,"","get_mutations"],[15,2,1,"","save"]],"pyCADD.query.config":[[15,1,1,"","BaseQueryCfg"]],"pyCADD.query.config.BaseQueryCfg":[[15,2,1,"","get_query"]],"pyCADD.query.core":[[15,4,1,"","parse_uniport"],[15,4,1,"","query_pdb"],[15,4,1,"","query_uniprot"]],"pyCADD.utils":[[16,0,0,"-","cheminformatics"],[16,0,0,"-","common"],[16,0,0,"-","log"],[16,0,0,"-","tool"],[16,0,0,"-","ui"]],"pyCADD.utils.common":[[16,1,1,"","BaseFile"]],"pyCADD.utils.common.BaseFile":[[16,3,1,"","file_dir"],[16,3,1,"","file_ext"],[16,3,1,"","file_name"],[16,3,1,"","file_path"],[16,3,1,"","file_prefix"],[16,3,1,"","file_suffix"]],"pyCADD.utils.log":[[16,4,1,"","get_logfile_name"]],"pyCADD.utils.tool":[[16,1,1,"","Myconfig"],[16,4,1,"","check_file_update_progress"],[16,4,1,"","download_pdb"],[16,4,1,"","download_pdb_list"],[16,4,1,"","get_config"],[16,4,1,"","get_lib_dir"],[16,4,1,"","makedirs_from_list"],[16,4,1,"","timeit"]],"pyCADD.utils.tool.Myconfig":[[16,2,1,"","optionxform"]],"pyCADD.utils.ui":[[16,1,1,"","UI"]],"pyCADD.utils.ui.UI":[[16,5,1,"","basic_info"],[16,2,1,"","clear_info"],[16,2,1,"","create_panel"],[16,2,1,"","get_confirm"],[16,2,1,"","get_input"],[16,5,1,"","info_index"],[16,5,1,"","system_info"],[16,5,1,"","title"],[16,5,1,"","version_info"]],pyCADD:[[9,0,0,"-","Dance"],[11,0,0,"-","Dock"],[12,0,0,"-","Dynamic"],[13,0,0,"-","Gauss"],[14,0,0,"-","VSW"],[15,0,0,"-","query"],[16,0,0,"-","utils"]]},objnames:{"0":["py","module","Python \u6a21\u5757"],"1":["py","class","Python \u7c7b"],"2":["py","method","Python \u65b9\u6cd5"],"3":["py","attribute","Python \u5c5e\u6027"],"4":["py","function","Python \u51fd\u6570"],"5":["py","property","Python property"]},objtypes:{"0":"py:module","1":"py:class","2":"py:method","3":"py:attribute","4":"py:function","5":"py:property"},terms:{"002":[4,12],"002p":4,"01":0,"04":0,"05":0,"056":6,"06":0,"07":0,"10":12,"100000":4,"100n":[4,12],"12":[0,4],"135":12,"14":0,"16":[0,4],"18":0,"1dkf":11,"1fby":4,"1xj7":6,"1xq3":6,"20":11,"2020":0,"2022":0,"21":0,"25":[2,9],"2am9":6,"2ylp":6,"30":[2,9],"30x4":2,"31g":13,"3a9e":11,"3d":3,"3kmr":11,"3kmz":11,"3oap":3,"42":[2,9],"48":4,"4dqm":11,"4k6i":3,"50000000":[4,12],"5ji0":3,"5k13":11,"6q7":11,"75":3,"9cr":[3,4],"9ra":3,"class":[9,10,11,12,13,14,15,16],"default":16,"float":[9,12,15],"for":[9,12,14],"function":[1,9],"import":[2,4],"in":[4,6],"int":[9,10,11,12,13,16],"null":13,"return":[13,16],"static":[9,11,12],"true":[2,9,10,11,13,15,16],"with":4,__class__:9,__name__:9,_comsolv:[4,12],_consensu:10,_consol:11,_dock_final_result:3,_dry:4,_evalu:[],_fill_nan:9,_format:15,_io:11,_leap:4,_noh:4,_out:4,_structur:11,_tleap:4,a01:0,absolut:16,absorb:13,activ:[2,9],activity_data:[],add:[2,4],add_clf:[2,9],add_consensus_scor:[],add_dataset:[2,9],add_neg_dataset:[2,9],add_pos_dataset:[2,9],additional_info:16,admet:11,admet_fil:11,aid:9,algorithm:[2,8,9],amber:[0,12],ambertool:4,analysi:[7,8,16],analyz:[0,9,12],angl:12,ani:9,antechamb:4,api:[0,3,11],apo:15,arg:[9,11],arrai:[9,10],atom:4,atom_num:11,auc:9,ave:10,averag:10,avgout:12,axi:10,b3lyp:[4,13],base:[7,8],baseconfig:11,basefil:[11,12,16],basequerycfg:15,basic_info:16,basis_set:13,best:[],best_gbt_param:2,best_lr_param:2,best_rf_param:2,best_scp:2,best_scp_scor:[],bms:11,bool:[9,10,11,13,15,16],box:11,brl:3,bug:0,byre:12,ca:12,cadd:9,calc_admet:11,calc_hbond:12,calc_mmgbsa:11,calc_rmsd:[11,12],calc_rmsf:12,calc_scp_scor:9,calc_volum:11,calcul:13,callabl:9,cd:4,chain:11,chain_nam:11,charg:[4,12,13],check_file_update_progress:16,check_params_fil:[],check_pdb:11,cheminformat:[7,8],chk_file:13,choic:16,classmethod:[9,13],clean_pdb_data:15,clear_info:16,clf:9,clf_cv_result:[2,9],clf_name:9,cli:[0,1,3,7,8],click:0,cmd:[11,13],column:10,com:4,com_topfile_path:12,combin:[],common:[7,8],complex_dir:11,complex_fil:11,complexfil:11,comput:9,comsolvated_topfile_path:12,concurr:0,concurrentloghandl:0,config:[7,8],config_fil:[11,16],configpars:16,conform:[],consensu:[8,9],content:7,convert_format:11,core:[7,8,10],correct:13,correl:[],cover_to_pdb:12,cp:4,cpu:[12,13],cpu_count:13,cpu_num:12,crd:[4,12],creat:4,creat_energy_inputfil:12,creat_input_fil:12,create_input_fil:4,create_inputfil:13,create_panel:16,cross_valid:[],csv:[2,3,6,9,11],csv_path:9,cube:13,cube_file_gener:13,cuda:0,cuda_devic:[4,12],current:3,cutoff:[12,15],cv:9,cv_model_evalu:[],cv_result:2,daemon:13,danc:[0,1,7,8],dancer:[2,9],dancer_ml:[],data:[1,7,8,9,10],data_d:11,data_list:11,databas:14,database_config_path:14,database_list:14,dataconfig:11,datafram:[2,9,10],dataset:[2,9],decom_output_fil:12,decomp:12,def2svp:4,default_gbt_param:2,default_lr_param:2,default_param:[2,8,9],default_rf_param:2,defaultdataconfig:11,del_clf:9,del_databas:14,del_gen:14,del_ignore_lig:15,del_mut:15,del_wat:11,demo:4,design:9,dev:13,devic:10,df:[],dft:13,dht:6,dict:[2,9,11,13,14,16],directori:3,distanc:12,dl:[8,9],dm:2,dms:15,dock:[0,2,4,7,8,14],dock_datalist:11,dock_result_fil:11,docker:11,docking_ligand:11,docking_ligand_st:11,docking_receptor_st:11,docking_scor:[],dockresultfil:11,download_dir:16,download_pdb:[11,16],download_pdb_list:16,drug:9,dtt:6,dynam:[0,1,7,8],em:4,emiss:13,end:12,end_fram:12,energi:13,ensembl:[2,3,6,7,8],entri:11,entropi:12,env:3,eqn:11,eqo:11,evalu:[1,9],exampl:[3,11],extra_admet_data:11,extra_docking_data:11,extract_cub:13,extract_docking_data:11,extract_fram:12,extract_lowest_energy_st:12,fals:[2,10,11,13,16],famili:14,fchk:13,fchk_file:13,file:[3,4],file_dir:16,file_ext:16,file_nam:[9,16],file_path:[4,11,12,16],file_prefix:16,file_suffix:16,file_typ:[4,12],fill_na:2,fill_na_valu:2,fill_nan:9,fit:10,flag:[11,13,14,16],forward:10,frame:[9,10,12],frcmod:4,frcmod_fil:12,free:12,freq:13,from:[2,4],from_csv:9,from_pickl:[2,9],from_splited_data:9,func:16,gap:13,gauss:[0,1,7,8],gauss_path:13,gaussian:[0,4,13],gb:[11,13],gbsa:[11,12],gbt:[2,9],gbt_default_param:[2,9],gd3bj:4,gen_input_fil:14,gene:14,gene_config_path:14,genelist:14,generate_energi:13,generate_fchk:13,generate_input_fil:14,generate_opt:13,generate_report:11,geo:10,geo_averag:10,geomean:10,geometri:11,get_apo:15,get_best_scp:[],get_clf:9,get_clfs_dict:[2,9],get_config:16,get_confirm:16,get_databas:14,get_first_structur:11,get_gaussian:13,get_gbt_default_param:9,get_gen:14,get_gridfile_path_list:11,get_input:16,get_input_pdbid:11,get_lib_dir:16,get_lig:11,get_lig_molnum:11,get_lig_nam:11,get_ligand_fil:11,get_ligand_list:11,get_logfile_nam:16,get_lr_default_param:9,get_merged_data:[2,9],get_merged_fil:11,get_mo:13,get_mo_info:13,get_mut:15,get_mutation_pdb:15,get_pairs_list:11,get_param:10,get_pdbfile_path_list:11,get_pdbid_list:11,get_predict_structur:11,get_queri:15,get_receptor_fil:11,get_receptor_list:14,get_rf_default_param:9,get_roc:[],get_scatt:[],get_scor:[],get_scp_report:[],get_split:[],get_test_data:[2,9],get_train_data:[2,9],get_weight:9,glide:11,gpu:[4,12],grid:[9,11,13],grid_dir:11,grid_fil:11,grid_file_path:11,grid_gener:11,gridbox_s:11,gridfil:11,guid:0,handler:0,hbond:12,heatmap:[],help:[0,3,4],hidden_dim:10,higher:0,homo:13,homo_energi:13,homo_index:13,how:1,htv:11,hyperparam_tun:9,id:[0,3,6,11,14,16],ignore_nan:10,index:[11,13],info_index:16,ini:6,initi:10,inp:14,inpcrd:[4,12],input:[4,11],input_dim:10,input_fil:[11,12],input_file_path:5,inputfil:11,instal:[0,3],interfac:16,interv:12,issu:0,job:11,job_nam:13,job_typ:12,jobcontrol:11,jobnam:14,json:2,jupyt:0,k_fold:[2,9],kaim:10,kaiming_norm:10,kaiming_uniform:10,keep_chain:11,kei:[11,16],kendal:[],kwarg:[9,11,12],label:14,label_col:[2,9],launch:11,leap:12,leap_prepar:[4,12],learn:0,librari:3,library_fil:3,lig:4,lig_fil:[11,14],lig_info:11,lig_nam:11,lig_resnum:11,ligand:[4,11],ligand_dir:11,ligand_fil:[11,12],ligand_id:11,ligand_nam:11,ligand_onli:11,ligand_save_dir:11,ligand_topfile_path:12,ligandfil:11,ligfil:11,lignam:11,like:9,linear_model:2,linux:0,list:[11,14,16],liter:[10,12],load_mdout:12,load_param:9,load_topfil:12,load_traj:12,log:[0,7,8],logisticregress:2,loop:11,loos:[4,13],lower_is_bett:[9,10],lr:[2,9],lr_default_param:[2,9],luf:11,lumo:13,lumo_energi:13,lumo_index:13,machin:[],mae:[3,11,12],maegz:[3,11],maestro:[4,11],maestrofil:11,main:16,makedirs_from_list:16,mani:1,map:11,mask:12,matrix:[2,3,9],max:[],maximum:10,mb:13,md:[0,12],mdanalysi:0,mdout_file_path:12,mean:10,mean_scp:2,mem:13,memori:13,menu_nam:[11,13,14,16],merg:[],merged_fil:11,method:[9,10,12],metric:[2,7,8],min:[],minim:11,minimum:10,miss:4,missing_loop:11,mkdir:4,ml:[],mlp:[0,10],mm:[11,12],mmgbsa:[0,11],mmpbsa:[],mo:13,mode:[3,11,12],model:[1,9],model_nam:9,models_evaluation_report:[],modul:[3,7],mol2:[],molecul:[4,11],molecule_fil:4,molecule_file_path:12,molecule_prepar:[4,12],multidock:[11,14],multiinputfil:11,multipl:[4,12,13],multiwfn:[0,4],myconfig:16,mymlp:[],n_job:9,n_repeat:[2,9],n_split:[],name:[0,11],nan:[],ndarrai:[],nef:[0,9],nef_scor:9,new_processor:4,nn:10,nohup:[],nointramol:12,none:[9,10,11,12,13,14,15,16],normal:[10,12],note:1,notebook:0,num:3,number:11,numpi:[0,10],object:[9,11,12,13,15,16],of:[0,1],one:1,onli:12,openbabel:0,opt:13,option:[4,9,10,11,12,13,15,16],options_label:16,optionstr:16,optionxform:16,or:[0,2,4,9],origin:[],original_st:13,output_dim:10,output_fil:[11,12],outputfil:12,overwrit:[11,16],p10275:6,packag:[0,1,3,7],panda:[0,9,10],parallel:[3,4],param:[9,10,16],param_gird:9,param_grid:9,paramet:[12,13],params1:2,params2:2,params_grid:9,parmchk2:4,parse_:11,parse_fil:11,parse_uniport:15,path:[9,11,14,15,16],path_list:16,pb:12,pcm:13,pdb:[0,3,4,6,9,11,12,14,15,16],pdb_dir:11,pdb_file:11,pdb_file_path:11,pdb_list:15,pdbfile:11,pdbid:[4,11,12,14,16],pdblist:16,pearson:[],percent:9,perform:9,pharmaceut:0,pickl:[2,9],pid:13,pidfil:13,pip:[0,3],pkl:2,platform:1,plot:[],pmemd:[],pos_label:[],pos_lael:[],posit:[],precis:11,predict:10,predict_fil:11,predict_proba:10,prefix:[4,12],prepar:[1,4],prepare_data:[2,9],prepi:[],prepin:4,prepin_fil:[],preprocess:[],prepross:[],prepwizard:11,pretein_file_path:12,print_classifier_info:[2,9],print_cv_result:[2,9],printatomnum:12,prmtop:[4,12],pro:4,processor:[4,12],progress:16,properti:[9,11,13,14,16],protein:4,protein_dir:11,protein_fil:[4,12],protein_prepar:[4,12],ps:[4,12],py:[],pycadd:[2,3,4,5,6],pymdprepar:[],pynalysi:[],pypi:0,pypmemd:[],python3:3,python:[1,3,6,14],pytorch:10,pyyaml:0,queri:[0,7,8],quert_cfg:15,query_pdb:15,query_uniprot:15,querycli:15,quick:[1,6,11],r18:6,ra:9,rai:4,random:9,random_se:[2,9],random_st:[],randomforestclassifi:2,ratio:[],rcsb:16,rea:11,read:11,read_data:[],read_database_config:14,read_databs:14,read_from_config:11,read_gen:14,read_gene_config:14,read_matrix:[],read_origin_st:13,readm:[],recep_fil:11,recep_list:14,recepfil:11,receptor:11,receptor_topfile_path:12,receptorfil:11,redock:3,ref:12,refefence_datalist:11,reg_databas:14,reg_gen:14,regist:[7,8],repeat:[],repeat_cv:[2,9],report:[6,11],report_save_dir:11,requir:1,required_dir:14,resid:11,resp2:[4,12],resp:[0,12],restart:13,result:[2,3,11],reult:2,rf:[2,9],rf_default_param:[2,9],rich:[0,16],rmsd:[11,12],rmsf:12,roc:9,roc_auc:9,roc_auc_scor:[2,9],row:10,rtype:[13,16],rudec:12,run:[3,11,13,14],run_energy_calc:12,run_simul:[4,12],rxr:6,sa:11,save:[2,9,15],save_admet_data:11,save_csv:9,save_dir:[9,11,12],save_docking_data:11,save_ensemble_docking_data:11,save_fmt:11,save_param:9,save_path:15,save_pickl:9,save_redocking_data:11,scatter:[],school:0,schroding:[0,3,4,11],scienc:0,scikit:0,scipi:0,score:9,score_func:[2,9],score_nam:[],scp:9,scp_report:[],screen:14,script:14,seaborn:0,search_param:[2,9],section:6,select_databas:14,select_first:11,select_first_lig:11,self:[3,9],seri:[9,10],set_basis_set:13,set_calc_rmsd:11,set_charg:13,set_comsolvate_fil:[4,12],set_cuda_devic:[4,12],set_dft:13,set_method:[],set_multipl:13,set_param:2,set_precis:11,set_solv:13,set_system:13,setuptool:0,sh:[],show_choic:16,show_cuda_devic:4,show_default:16,show_panel:16,shwo_cuda_devic:[4,12],side_chain:11,simpl:4,simul:[4,12],singl:[],sitemap:11,size:4,sklearn:[2,9],solvent:[12,13],somewher:4,sp:11,spearman:[],spin_multi:13,split:11,split_complex:11,split_data:[],split_ligand:11,split_train_test_data:[2,9],st_path:13,st_reader:11,start:[1,12,13],start_fram:12,std:10,std_scp:2,stderr:13,stdin:13,stdout:13,step_length:[4,12],step_num:[4,12],stop:13,str:[4,9,10,11,12,13,14,15,16],structur:11,structureread:11,submodul:[7,8],subpackag:7,suit:[0,3],system_default:13,system_info:[13,16],task_id:16,td:13,tddft:0,tes:6,test_data:[2,9],test_siz:[2,9],testset_ev:[2,9],testset_eval_result:2,testset_result:9,text:16,time_sleep:16,timeit:16,timeout:11,tip3p:4,titl:16,tleap:[4,12],tmp:13,to:[1,11],to_format:11,tool:[7,8],top:[4,12],top_file_path:12,torch:10,total:9,trace_angl:12,trace_dist:12,train:10,train_data:[2,9],traj_file_path:12,tupl:[9,11,12],txt:3,type:[9,10,16],ui:[0,3,7,8],ui_danc:[],ui_dock:11,ui_gauss:13,ui_vsw:14,undefin:2,uniprot:0,uniprot_file_path:15,uniprot_id:15,univers:0,use:1,user:[0,16],util:[7,8,11,12,13,14],valu:[9,11,13],version_info:16,virtual:[3,14],vmax:[],vmin:[],vsw:[0,7,8],vsw_dir:14,water:[12,13],wheel:0,widetyp:15,work:3,workflow:14,worst_scp:2,x_i:10,x_test:[],x_train:[],xavier:10,xavier_norm:10,xavier_uniform:10,xgb:2,xgbclassifi:2,xgboost:2,xiamen:0,xlsx:11,xlsxwriter:0,xp:11,y_score:9,y_test:[],y_train:[],y_true:9,y_ture:[],yaml:6,yh:0,yml:6,your_datafram:2,your_file_nam:2,your_matrix_path:2,your_negative_matrix_path:2,your_params_dict:2,your_positive_matrix_path:2,z_score:[],z_score_combin:[],z_score_ligand:[],z_score_receptor:[],zip:11},titles:["pyCADD","pyCADD Documentation","Dance User Guide","Dock Quick Start","Dynamic Quick User Guide","Gauss Quick Start","\u6784\u5efaDock\u8f93\u5165\u6587\u4ef6\u65f6\u7684\u89c4\u8303","pyCADD","pyCADD package","pyCADD.Dance package","pyCADD.Dance.algorithm package","pyCADD.Dock package","pyCADD.Dynamic package","pyCADD.Gauss package","pyCADD.VSW package","pyCADD.query package","pyCADD.utils package"],titleterms:{"function":[0,3],algorithm:10,amber:4,analysi:12,and:[1,2],api:1,attent:0,base:[13,14],calcul:[],cheminformat:16,cli:[4,11,12,15],common:[9,11,12,16],config:[11,15],consensu:10,content:[8,9,10,11,12,13,14,15,16],core:[9,11,12,13,14,15],danc:[2,9,10],data:[2,11],default_param:10,dl:10,dock:[1,3,6,11],document:1,dynam:[4,12],ensembl:11,evalu:2,file:1,format:1,gauss:[5,13],gaussian:[],guid:[1,2,4],how:0,indic:1,input:1,leap:4,log:16,mani:3,metric:9,model:2,modul:[0,1,8,9,10,11,12,13,14,15,16],note:[0,6],of:3,one:3,packag:[8,9,10,11,12,13,14,15,16],platform:0,prepar:2,pycadd:[0,1,7,8,9,10,11,12,13,14,15,16],python:[0,4],queri:15,quick:[3,4,5],readm:1,refer:1,regist:14,requir:0,start:[3,5],submodul:[9,10,11,12,13,14,15,16],subpackag:[8,9],tabl:1,to:[0,3],tool:16,ui:[11,13,14,16],use:0,user:[1,2,4],util:16,version:0,vsw:14,welcom:[]}})