<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class sistema extends CI_Controller {

	function __construct(){
		// Call the Model constructor
		parent::__construct();
		
		$this->load->helper('url');
		switch ($this->revisar_sesion()) {
			case "sesion":
				redirect(base_url());
				exit;
			break;
		}
		$this->load->model('sistemaModel');
	}
    
	public function index(){
			ob_start('ob_gzhandler');
			$this->load->view('sistema.html');
			ob_end_flush();
	}
        
    public function menu(){
		ob_start('ob_gzhandler');
		$result=$this->sistemaModel->menu();
		echo json_encode($result);
		ob_end_flush();
	}
        
	public function perfil(){
		ob_start('ob_gzhandler');
		$result=$this->sistemaModel->perfil();
		echo json_encode($result);
		ob_end_flush();
	}
        
	private function revisar_sesion(){
		if($this->session->userdata('usuario')){
			return "true";
		}else{
			return "sesion";
		}
	}
}
